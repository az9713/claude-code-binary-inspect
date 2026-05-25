const fs = require('fs');
const path = require('path');

const root = process.cwd();
const artifactsDir = path.join(root, 'artifacts');

function findCurrentPackageJson() {
  const candidates = fs
    .readdirSync(artifactsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('unpacked-'))
    .map((entry) => path.join(artifactsDir, entry.name, 'package', 'package.json'))
    .filter((candidate) => fs.existsSync(candidate))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  if (candidates.length === 0) {
    throw new Error('No unpacked Claude package found under artifacts/unpacked-*');
  }
  return candidates[0];
}

const packageJsonPath = findCurrentPackageJson();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
}

const packageJson = readJson(packageJsonPath);
const version = packageJson.version;
const packageName = packageJson.name;
const jsPath = path.join(artifactsDir, `claude-code-${version}.js`);
const promptJsonPath = path.join(artifactsDir, `prompts-generated-${version}.json`);
assertFile(jsPath);
assertFile(promptJsonPath);

const js = fs.readFileSync(jsPath, 'utf8');
const promptJson = readJson(promptJsonPath);
const outputDir = path.join(root, 'bucket-reports');
fs.mkdirSync(outputDir, { recursive: true });

function normalizeSnippet(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '?')
    .trim()
    .slice(0, 420);
}

function countLiteral(haystack, needle) {
  if (!needle) return 0;
  let count = 0;
  let idx = 0;
  while ((idx = haystack.indexOf(needle, idx)) !== -1) {
    count += 1;
    idx += needle.length;
  }
  return count;
}

function firstSnippet(haystack, needle, radius = 180) {
  const idx = haystack.indexOf(needle);
  if (idx === -1) return '';
  const start = Math.max(0, idx - radius);
  const end = Math.min(haystack.length, idx + needle.length + radius);
  return normalizeSnippet(haystack.slice(start, end));
}

function markerTable(markers) {
  const rows = markers
    .map((marker) => {
      const count = countLiteral(js, marker);
      return {
        marker,
        count,
        snippet: count ? firstSnippet(js, marker) : '',
      };
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.marker.localeCompare(b.marker));

  if (rows.length === 0) {
    return 'No marker hits found in the extracted JavaScript for this bucket.\n';
  }

  const lines = ['| Marker | Hits | Representative extracted context |', '| --- | ---: | --- |'];
  for (const row of rows) {
    lines.push(`| \`${row.marker.replace(/\|/g, '\\|')}\` | ${row.count} | ${row.snippet.replace(/\|/g, '\\|')} |`);
  }
  return `${lines.join('\n')}\n`;
}

function promptBuckets() {
  const buckets = new Map();
  for (const prompt of promptJson.prompts || []) {
    const name = prompt.name || '(unnamed)';
    const bucket = name.includes(':') ? name.split(':')[0] : '(unnamed)';
    buckets.set(bucket, (buckets.get(bucket) || 0) + 1);
  }
  return [...buckets.entries()].sort((a, b) => b[1] - a[1]);
}

function namedPromptExamples(pattern, limit = 12) {
  const examples = [];
  for (const prompt of promptJson.prompts || []) {
    if (!prompt.name || !pattern.test(prompt.name)) continue;
    examples.push(`- ${prompt.name}: ${(prompt.description || 'No description').replace(/\s+/g, ' ')}`);
    if (examples.length >= limit) break;
  }
  return examples.length ? examples.join('\n') : '- No named prompt examples found in generated prompt JSON.';
}

function envVarTable() {
  const envVars = new Set();
  const patterns = [
    /process\.env\.([A-Z][A-Z0-9_]+)/g,
    /"([A-Z][A-Z0-9_]{4,})"/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(js)) !== null) {
      const value = match[1];
      if (
        value.includes('_') &&
        /^(ANTHROPIC|CLAUDE|DISABLE|ENABLE|AWS|GOOGLE|GCLOUD|VERTEX|BEDROCK|NODE|SSL|HTTPS|HTTP|BASH|SHELL|XDG|APPDATA|LOCALAPPDATA|DO_NOT_TRACK|REQUESTS|CURL)/.test(value)
      ) {
        envVars.add(value);
      }
    }
  }
  const sorted = [...envVars].sort();
  const lines = ['| Environment variable |', '| --- |'];
  for (const value of sorted.slice(0, 120)) {
    lines.push(`| \`${value}\` |`);
  }
  return `${lines.join('\n')}\n`;
}

function metadata() {
  return [
    `Claude binary version: \`${version}\``,
    `Source package: \`${packageName}@${version}\``,
    `Extracted JavaScript: \`artifacts/claude-code-${version}.js\``,
    `Prompt JSON: \`artifacts/prompts-generated-${version}.json\``,
    '',
  ].join('\n');
}

const buckets = [
  {
    file: '01-startup-and-network-behavior.md',
    title: 'Startup and network behavior',
    developerUse: 'Use this bucket to understand what the CLI may contact at startup, which network flows are gated, and which environment variables alter network behavior.',
    markers: [
      '/api/claude_cli/bootstrap',
      'Bootstrap',
      'BASE_API_URL',
      'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC',
      'DISABLE_TELEMETRY',
      'DISABLE_ERROR_REPORTING',
      'logEventTo1P',
      '1P event logging',
      'setupPeriodicGrowthBookRefresh',
      'refreshGrowthBookFeatures',
      'feedback',
    ],
    takeaway: [
      '- Stable endpoints and environment variables are better anchors than minified function names.',
      '- Treat extracted code as evidence of shipped implementation paths; verify runtime behavior separately.',
      '- This bucket is especially useful for enterprise, compliance, and network-control reviews.',
    ],
  },
  {
    file: '02-prompt-and-agent-architecture.md',
    title: 'Prompt and agent architecture',
    developerUse: 'Use this bucket to study how Claude Code organizes prompt fragments, tool descriptions, subagent prompts, slash-command prompts, and dynamic prompt sections.',
    markers: [
      'System Prompt:',
      'Agent Prompt:',
      'Tool Description:',
      'System Reminder:',
      'Rv("heron_brook"',
      'tool description',
      'subagent',
      'slash command',
      'system-reminder',
      'prompt',
    ],
    extra() {
      const bucketRows = promptBuckets()
        .map(([name, count]) => `| ${name} | ${count} |`)
        .join('\n');
      return [
        '## Generated prompt JSON buckets',
        '',
        '| Bucket | Records |',
        '| --- | ---: |',
        bucketRows,
        '',
        '## Named prompt examples',
        '',
        namedPromptExamples(/^(Agent Prompt|System Prompt|Tool Description|System Reminder):/),
        '',
      ].join('\n');
    },
    takeaway: [
      '- This is the highest-value bucket for agent application design.',
      '- Tool descriptions and subagent prompts are more reusable for app developers than raw minified code.',
      '- Prompt extraction is a specialized layer built on top of the broader binary-inspection workflow.',
    ],
  },
  {
    file: '03-feature-flags-and-experiments.md',
    title: 'Feature flags and experiments',
    developerUse: 'Use this bucket to identify remotely or locally gated behavior, cached feature values, rollout keys, and experiment instrumentation.',
    markers: [
      'GrowthBook',
      'DISABLE_GROWTHBOOK',
      'cachedGrowthBookFeatures',
      'cachedExperimentFeatures',
      'tengu_',
      'tengu_heron_brook',
      'isFeatureFromExperiment',
      'getFeatureValue',
      'refreshGrowthBookFeatures',
      'feature_name',
    ],
    takeaway: [
      '- Feature flags explain why shipped code may not always be active behavior.',
      '- Feature keys are usually better investigation anchors than minified local function names.',
      '- This bucket is useful for product engineers studying rollout and experimentation systems.',
    ],
  },
  {
    file: '04-environment-variables-and-configuration.md',
    title: 'Environment variables and configuration surface',
    developerUse: 'Use this bucket to discover supported environment variables, provider knobs, telemetry controls, config paths, and debug switches.',
    markers: [
      'process.env.',
      'CLAUDE_CODE_',
      'ANTHROPIC_',
      'DISABLE_',
      'ENABLE_',
      'AWS_',
      'GOOGLE_',
      'GCLOUD_',
      'XDG_',
      'APPDATA',
      'settings',
      'config',
    ],
    extra() {
      return ['## Extracted environment-variable candidates', '', envVarTable()].join('\n');
    },
    takeaway: [
      '- Environment variables are among the most stable and useful anchors for application and platform developers.',
      '- This bucket helps separate runtime configuration from hardcoded behavior.',
      '- Use this for deployment, enterprise policy, provider routing, and reproducibility investigations.',
    ],
  },
  {
    file: '05-tooling-and-permission-behavior.md',
    title: 'Tooling and permission behavior',
    developerUse: 'Use this bucket to understand how tool use is described, guarded, validated, and surfaced to users.',
    markers: [
      'Tool Description:',
      'permission',
      'permissions',
      'bypassPermissions',
      'sandbox',
      'command injection',
      'Bash',
      'ReadFile',
      'Edit',
      'TodoWrite',
      'WebSearch',
      'WebFetch',
      'Grep',
      'NotebookEdit',
      'git status',
    ],
    extra() {
      return ['## Tool-description examples from prompt JSON', '', namedPromptExamples(/^Tool Description:/, 20), ''].join('\n');
    },
    takeaway: [
      '- This is one of the most useful buckets for developers building agentic applications.',
      '- It shows patterns for describing tools, constraining tool use, and explaining permission boundaries.',
      '- Permission and sandbox strings are useful for understanding user trust and safety UX.',
    ],
  },
  {
    file: '06-provider-and-model-routing.md',
    title: 'Provider and model routing',
    developerUse: 'Use this bucket to inspect model/provider selection, first-party versus third-party routing, Bedrock/Vertex paths, aliases, and fallback behavior.',
    markers: [
      'firstParty',
      'gateway',
      'bedrock',
      'vertex',
      'ANTHROPIC_DEFAULT',
      'ANTHROPIC_BEDROCK',
      'ANTHROPIC_VERTEX',
      'AWS_BEARER_TOKEN_BEDROCK',
      'CLAUDE_CODE_USE_BEDROCK',
      'CLAUDE_CODE_USE_VERTEX',
      'model',
      'fallback',
      'probe',
    ],
    takeaway: [
      '- This bucket is valuable for apps that support multiple model providers or enterprise routing.',
      '- Model override and fallback markers help explain behavior that may differ by environment.',
      '- Provider-specific environment variables often reveal supported deployment modes.',
    ],
  },
  {
    file: '07-local-storage-and-cache-locations.md',
    title: 'Local storage and cache locations',
    developerUse: 'Use this bucket to locate state that may affect repeatability: caches, logs, sessions, client data, onboarding flags, and queued telemetry.',
    markers: [
      'cache',
      'cached',
      'clientDataCache',
      'cachedGrowthBookFeatures',
      'Application Support',
      'XDG_CACHE_HOME',
      'XDG_CONFIG_HOME',
      'APPDATA',
      'LOCALAPPDATA',
      '.config',
      '.cache',
      'session',
      'messages',
      'logs',
      'hasCompletedOnboarding',
    ],
    takeaway: [
      '- This bucket is useful when repeated runs behave differently because local state changed.',
      '- Cache and config paths help with clean-room reproduction and debugging.',
      '- Feature flag caches and onboarding flags can affect what code paths run.',
    ],
  },
  {
    file: '08-update-onboarding-and-ui-behavior.md',
    title: 'Update, onboarding, and UI behavior',
    developerUse: 'Use this bucket to inspect user-visible CLI behavior: onboarding gates, dialogs, feedback flows, update messaging, and terminal UI components.',
    markers: [
      'onboarding',
      'hasCompletedOnboarding',
      'TrustDialog',
      'GroveDialog',
      'ProTrial',
      'feedback',
      'update',
      'changelog',
      'Remote Control',
      'dialog',
      'terminal',
      'Restarting Claude Code',
    ],
    takeaway: [
      '- This bucket is useful for CLI UX and product engineers.',
      '- User-visible behavior often lives outside help text, so extracted strings can explain surprising prompts.',
      '- Onboarding and feedback gates can be conditional on settings, feature flags, or provider mode.',
    ],
  },
  {
    file: '09-patch-points.md',
    title: 'Patch points',
    developerUse: 'Use this bucket to identify stable anchors for customization or research: endpoints, env vars, feature keys, prompt fragments, and distinctive templates.',
    markers: [
      '/api/claude_cli/bootstrap',
      'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC',
      'DISABLE_GROWTHBOOK',
      'tengu_heron_brook',
      'Rv("heron_brook"',
      'System Prompt:',
      'Tool Description:',
      'Agent Prompt:',
      'process.env.',
      'BASE_API_URL',
      'clientDataCache',
      'cachedGrowthBookFeatures',
    ],
    takeaway: [
      '- Prefer stable strings over minified function names for version-to-version investigation.',
      '- Good patch anchors are distinctive, rare, and semantically tied to the behavior you want to change.',
      '- Patching a live installation is riskier than inspecting a downloaded package copy.',
    ],
  },
];

function renderBucket(bucket, index) {
  const parts = [
    `# ${bucket.title}`,
    '',
    metadata(),
    '## Developer use',
    '',
    bucket.developerUse,
    '',
    '## Extracted marker hits',
    '',
    markerTable(bucket.markers),
  ];
  if (bucket.extra) parts.push(bucket.extra());
  parts.push('## Developer takeaways', '', bucket.takeaway.join('\n'), '');
  parts.push('## Caveat', '', 'These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.', '');
  return parts.join('\n');
}

const indexLines = [
  '# Claude Code binary inspection bucket reports',
  '',
  metadata(),
  'These reports were generated from the current Claude Code native npm package and the extracted JavaScript artifact. Each bucket corresponds to one investigation category from `USEFUL_INFO_FROM_EXTRACTED_CLAUDE_JS.md`.',
  '',
  '## Reports',
  '',
];

buckets.forEach((bucket, index) => {
  const content = renderBucket(bucket, index);
  fs.writeFileSync(path.join(outputDir, bucket.file), content, 'utf8');
  indexLines.push(`- [${bucket.title}](./${bucket.file})`);
});

fs.writeFileSync(path.join(outputDir, 'README.md'), `${indexLines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${buckets.length + 1} markdown files to ${outputDir}`);
