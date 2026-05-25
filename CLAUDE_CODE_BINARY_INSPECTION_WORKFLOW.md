# Claude Code binary inspection onboarding

This document explains how to inspect the Claude Code executable, extract the
embedded JavaScript, find prompt-related code paths, and understand how projects
like `Piebald-AI/claude-code-system-prompts` and `tweakcc` fit together.

It assumes you are technically comfortable with terminals, packages, source
files, JSON, and basic scripting, but have no prior knowledge of Claude Code's
packaging, Bun binaries, binary inspection, prompt extraction, or local patching
workflow.

The workflow in this folder was verified on Windows PowerShell against Claude
Code `2.1.150`.

## What you are trying to do

Claude Code is Anthropic's command-line coding agent. Users normally interact
with it by running a command named `claude`. Behind that simple command there is
a packaged application containing a large amount of JavaScript logic:

- terminal UI logic
- model selection and API request logic
- tool descriptions
- agent and subagent prompts
- system prompt fragments
- telemetry, update, and feature flag code
- startup and authentication code

The practical goal of this workflow is to answer questions like:

- What prompt strings are shipped in this version of Claude Code?
- Where does a specific feature flag or endpoint appear in the executable?
- How are prompt fragments composed at runtime?
- What does a third-party prompt corpus appear to have extracted?
- How could local prompt patching tools find and replace the same strings?

System prompts are one important investigation target, but the workflow is more
general: after extracting the embedded JavaScript, you can inspect endpoints,
feature flags, environment variables, startup behavior, telemetry gates,
runtime configuration, and patch points.

This document separates three activities that are often conflated:

1. Inspection: read or search the packaged code without modifying it.
2. Extraction: turn embedded prompt strings into structured files.
3. Patching: modify a local Claude Code installation.

Inspection and extraction are low-risk when performed on a downloaded copy of a
package. Patching is higher-risk because it changes a tool you may rely on for
development work.

## Vocabulary

### Claude Code

Claude Code is Anthropic's agentic coding CLI. It runs locally, talks to
Anthropic services or configured providers, and can operate on your filesystem,
shell, git repository, and development tools depending on permissions and
configuration.

### npm package

An npm package is a distributable JavaScript package published to the npm
registry. You can inspect package metadata with commands such as:

```powershell
npm view @anthropic-ai/claude-code version
```

You can download the exact tarball for a package version with:

```powershell
npm pack @anthropic-ai/claude-code-linux-x64@2.1.150
```

`npm pack` does not install the package globally. It downloads a `.tgz` archive
into your current folder or the folder you specify.

### Native or binary package

The platform-specific Claude Code package, such as
`@anthropic-ai/claude-code-linux-x64`, contains a large executable named
`claude`. In the run captured here, that file was about 238 MB.

That executable is what people are informally calling the "Claude Code binary."
It is not just a small launcher script. It contains packaged application code,
including minified JavaScript.

### Bun-packed executable

`tweakcc` describes Claude Code's native installation as a large
platform-specific native executable containing the same minified/compiled
JavaScript code from npm, packaged in a Bun binary.

The important practical consequence is this:

- you cannot open the native executable like a normal `.js` file
- you can still extract the embedded JavaScript with a tool that understands the
  binary layout
- once extracted, the JavaScript is minified but searchable text

### Minified JavaScript

Minified JavaScript is normal JavaScript that has been transformed to reduce
size and obscure structure. Function and variable names are often short and
unstable, such as `nAA`, `n0A`, `Rv`, or `H`.

This matters because a Reddit post or script may say "function `nAA`" for one
Claude Code version, but that name may change in another version. Do not treat
minified names as stable public APIs.

### System prompt

In an LLM application, a system prompt is instruction text supplied to the model
outside the user's direct message. Claude Code does not appear to have only one
single giant prompt string. It has many prompt fragments:

- main system prompt sections
- tool descriptions
- system reminders
- subagent prompts
- slash command prompts
- prompt fragments conditionally included by environment or settings
- template strings with runtime variables

That is why Piebald's prompt corpus has many markdown files rather than one
file named `system_prompt.txt`.

### Prompt fragment

A prompt fragment is one piece of text that may be inserted into a larger prompt
at runtime. A tool description, a system reminder, or a subagent instruction can
all be prompt fragments.

### Template literal and variables

Claude Code's source includes strings and JavaScript template literals. A
template literal can include dynamic expressions:

```javascript
`Hello ${name}`
```

Prompt extraction tools preserve those dynamic holes as variables. That is why
Piebald/tweakcc JSON records contain fields such as `pieces`, `identifiers`,
and `identifierMap`.

### `strings`

`strings` is a common Unix utility that extracts printable text from binary
files. It is useful for a first-pass inspection:

```bash
strings package/claude | grep heron_brook
```

On Windows, you can get similar practical results with `rg -a`, which searches
binary files as text:

```powershell
rg -a -n "heron_brook" .\unpacked\linux-x64\package\claude
```

This does not reconstruct source structure. It just finds readable text inside
a binary.

### `tweakcc`

`tweakcc` is a third-party tool from Piebald AI for customizing Claude Code. For
this workflow, the important commands are:

- `tweakcc unpack`: extract embedded JavaScript from a native Claude Code binary
- `tweakcc repack`: write modified JavaScript back into a native binary
- `tweakcc --apply`: apply configured prompt/theme/toolset changes
- `tweakcc adhoc-patch`: run a direct custom patch against an installation

This document uses `tweakcc unpack` for inspection. It does not require
modifying your installed `claude`.

### `Piebald-AI/claude-code-system-prompts`

This repository is a published prompt corpus. It contains markdown files for
Claude Code prompt fragments and token counts. Its public `tools/updatePrompts.js`
script takes structured prompt JSON and turns it into markdown files.

Important distinction: in the public repo, `updatePrompts.js` is a formatter and
README updater. The lower-level prompt extraction script is in `tweakcc` under
`tools/promptExtractor.js`.

## Big picture architecture

The workflow has four layers:

```text
npm registry
  -> platform package tarball
    -> native Claude Code executable
      -> embedded minified JavaScript
        -> extracted prompt JSON
          -> readable markdown prompt files
```

The local scripts in this folder cover the first four layers:

```text
npm registry
  -> .tgz package
    -> package/claude executable
      -> claude-code-<version>.js
```

The Piebald/tweakcc prompt workflow covers the next two:

```text
claude-code-<version>.js
  -> prompts-<version>.json
    -> system-prompts/*.md
```

## Local files in this folder

This folder now contains:

```text
reddit_text.txt
CLAUDE_CODE_BINARY_INSPECTION_WORKFLOW.md
scripts/
  extract-claude-code-js.ps1
  scan-claude-code-js.ps1
artifacts/
  anthropic-ai-claude-code-linux-x64-2.1.150.tgz
  unpacked-2.1.150/
  claude-code-2.1.150.js
  prompts-generated-2.1.150.json
piebald_repo/
  local clone of Piebald-AI/claude-code-system-prompts
tweakcc_repo/
  local clone of Piebald-AI/tweakcc
```

`artifacts/` is generated output. You can delete it and recreate it by running
the extraction script again.

## Prerequisites

You need these tools available in PowerShell:

- Node.js and npm
- PowerShell
- `tar`, available on modern Windows
- internet access to the npm registry
- optional but useful: `rg` from ripgrep

Check the basics:

```powershell
node --version
npm --version
tar --version
```

If `rg` is installed:

```powershell
rg --version
```

`rg` is not required for the PowerShell scripts in this folder, but it is useful
for ad hoc searches across large extracted files.

## Safe workflow principle

When learning this workflow, inspect a downloaded package copy first. Do not
start by patching your actual Claude Code installation.

The extraction script in this folder downloads and unpacks a package into
`artifacts/`. It passes the downloaded binary path explicitly to `tweakcc
unpack`. That means it is reading the package copy, not your default local
Claude Code installation.

Only move to patching after you can answer:

- Which file am I modifying?
- Do I have a clean backup?
- Can I reinstall or restore if this breaks?
- Is this change compatible with my organization's security and software policy?

## Workflow 1: extract the embedded JavaScript

Run:

```powershell
.\scripts\extract-claude-code-js.ps1 -Version 2.1.150 -OutDir .\artifacts
```

For the newest npm version:

```powershell
.\scripts\extract-claude-code-js.ps1 -Version latest -OutDir .\artifacts
```

Expected output includes lines like:

```text
Packing @anthropic-ai/claude-code-linux-x64@2.1.150
Extracting embedded JavaScript to .\artifacts\claude-code-2.1.150.js
Extracting JS from native binary: ...\artifacts\unpacked-2.1.150\package\claude
Extracted JS written to .\artifacts\claude-code-2.1.150.js
```

The important result is:

```text
.\artifacts\claude-code-2.1.150.js
```

That file is minified JavaScript extracted from the native executable.

## What `extract-claude-code-js.ps1` does

The script is intentionally small:

```powershell
param(
  [string]$Version = "latest",
  [string]$Package = "@anthropic-ai/claude-code-linux-x64",
  [string]$OutDir = ".\artifacts"
)
```

These parameters mean:

- `Version`: the Claude Code version to inspect, or `latest`
- `Package`: the npm package to download
- `OutDir`: where generated files should go

The script resolves the version:

```powershell
$resolvedVersion = if ($Version -eq "latest") {
  npm view $Package version
} else {
  $Version
}
```

If you pass `latest`, it asks npm what version is current. If you pass
`2.1.150`, it uses that exact version.

The script downloads the package:

```powershell
$tgzName = npm pack "$Package@$resolvedVersion" --pack-destination $OutDir
```

This writes a `.tgz` file into `artifacts/`.

The script unpacks the tarball:

```powershell
tar -xzf $tgzPath -C $unpackDir
```

The expected native executable path is:

```text
artifacts\unpacked-<version>\package\claude
```

Finally, the script extracts embedded JavaScript:

```powershell
npx --yes tweakcc@latest unpack $jsPath $binaryPath
```

This is the key step. `tweakcc unpack` reads the native binary and writes the
embedded JavaScript into a standalone `.js` file.

## Workflow 2: scan for specific indicators

After extraction, scan the JS:

```powershell
.\scripts\scan-claude-code-js.ps1 -JsPath .\artifacts\claude-code-2.1.150.js
```

The script searches for the indicators mentioned in `reddit_text.txt`:

- `function nAA`
- `function n0A`
- `tengu_heron_brook`
- `Rv("heron_brook", ...`
- `/api/claude_cli/bootstrap`
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`
- `DISABLE_GROWTHBOOK`
- `GrowthBook`

On the verified run, these indicators were found in the extracted JS.

## What `scan-claude-code-js.ps1` does

The scan script reads the entire extracted JavaScript file:

```powershell
$js = Get-Content -Raw -LiteralPath $JsPath
```

It defines a list of literal patterns:

```powershell
$patterns = @(
  "function nAA",
  "function n0A",
  "tengu_heron_brook",
  "Rv(`"heron_brook`"",
  "/api/claude_cli/bootstrap",
  "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC",
  "DISABLE_GROWTHBOOK",
  "GrowthBook"
)
```

For each pattern, it finds the first location:

```powershell
$idx = $js.IndexOf($pattern, [StringComparison]::Ordinal)
```

Then it prints a small context window around the match:

```powershell
$start = [Math]::Max(0, $idx - $ContextChars)
$length = [Math]::Min($js.Length - $start, $pattern.Length + (2 * $ContextChars))
$snippet = $js.Substring($start, $length)
```

This is not a parser. It is a direct search tool for quickly confirming that a
string or function name appears in the extracted code.

## Interpreting the Reddit post

The Reddit post in `reddit_text.txt` makes several concrete claims about Claude
Code `2.1.150`:

- startup calls `/api/claude_cli/bootstrap`
- GrowthBook feature flag data includes `tengu_heron_brook`
- a function named `nAA` reads cached data
- a function named `n0A` performs the network fetch
- `Rv("heron_brook", () => nAA())` registers a dynamic prompt section
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` blocks the bootstrap path
- `DISABLE_GROWTHBOOK=1` disables GrowthBook behavior

The local extraction and scan verified that the named strings and function names
exist in the extracted JavaScript for `2.1.150`.

Be careful about wording. Finding these code paths confirms the code contains
those mechanisms. It does not, by itself, prove every runtime behavior in every
configuration. Runtime behavior depends on authentication state, provider mode,
environment variables, settings, startup path, and network availability.

## Why minified names are fragile

The scan found `function nAA` and `function n0A` in `2.1.150`. Those names are
artifacts of minification. In another release, the same logical behavior might
be assigned different names.

Prefer stable anchors when possible:

- endpoint paths, such as `/api/claude_cli/bootstrap`
- environment variable names, such as `DISABLE_GROWTHBOOK`
- feature flag keys, such as `tengu_heron_brook`
- distinctive string literals

Use minified function names only as version-specific breadcrumbs.

## Workflow 3: search the extracted JavaScript manually

Once you have:

```text
.\artifacts\claude-code-2.1.150.js
```

you can search it directly:

```powershell
rg -n "tengu_heron_brook" .\artifacts\claude-code-2.1.150.js
rg -n "/api/claude_cli/bootstrap" .\artifacts\claude-code-2.1.150.js
rg -n "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC" .\artifacts\claude-code-2.1.150.js
```

Because the file is minified, many matches may appear on very long lines. Use
small context scripts, editor search, or formatting tools if needed.

Do not blindly run arbitrary extracted code. Treat it as source material to
read and search.

## Workflow 4: extract structured prompt JSON

`tweakcc` includes a lower-level extractor:

```text
tweakcc_repo\tools\promptExtractor.js
```

That script parses extracted JavaScript with Babel and looks for large strings
or template literals that look like prompts. It emits JSON records with fields
like:

```json
{
  "name": "Agent Prompt: Example",
  "description": "Prompt description",
  "pieces": ["text before ${", "} text after"],
  "identifiers": [0],
  "identifierMap": {
    "0": "VARIABLE_NAME"
  },
  "version": "2.1.150"
}
```

Run the extractor like this:

```powershell
cd .\tweakcc_repo\tools
npm install
cd ..\..
Copy-Item .\artifacts\unpacked-2.1.150\package\package.json .\artifacts\package.json -Force
Copy-Item .\tweakcc_repo\data\prompts\prompts-2.1.150.json .\artifacts\prompts-generated-2.1.150.json -Force
node .\tweakcc_repo\tools\promptExtractor.js .\artifacts\claude-code-2.1.150.js .\artifacts\prompts-generated-2.1.150.json
```

Why copy `package.json` into `artifacts/` first?

The extractor looks for a `package.json` next to the input JS file so it can
infer the Claude Code version. The extracted JS file lives in `artifacts/`, so
placing the package metadata there lets the extractor stamp the output with the
right version.

Why copy an existing prompt JSON first?

The extractor can merge newly found strings with existing metadata. Existing
prompt JSON contains human-friendly names, descriptions, and identifier maps.
Without that existing file, the extractor can still find candidate strings, but
many records will lack polished names and descriptions.

On the verified run:

```text
.\artifacts\prompts-generated-2.1.150.json
```

was written with 244 extracted strings. The public
`tweakcc\data\prompts\prompts-2.1.150.json` currently has 313 prompt records.
Treat the raw extractor as the extraction primitive, not as a fully polished
clone of Piebald's complete release automation.

## Workflow 5: convert structured JSON into markdown prompt files

The public `Piebald-AI/claude-code-system-prompts` repo contains:

```text
piebald_repo\tools\updatePrompts.js
```

That script consumes a prompt JSON file and updates markdown files under:

```text
piebald_repo\system-prompts\
```

Conceptually:

```text
prompts-2.1.150.json
  -> updatePrompts.js
    -> system-prompts/*.md
    -> README.md prompt index and token counts
```

`updatePrompts.js` also calls Anthropic's token counting API, so it expects an
`ANTHROPIC_API_KEY` environment variable. If you only want to inspect or compare
prompt text, you do not need to run this step.

## How Piebald's two repositories relate

There are two related public repositories:

```text
Piebald-AI/tweakcc
Piebald-AI/claude-code-system-prompts
```

Their roles are different:

- `tweakcc` provides patching, unpack/repack, config management, prompt JSON,
  and the lower-level prompt extractor.
- `claude-code-system-prompts` publishes readable markdown prompt files and a
  changelog across versions.

A simplified release flow looks like:

```text
download Claude Code package
extract embedded JS
run promptExtractor.js
curate or merge prompt metadata
produce prompts-<version>.json
run updatePrompts.js
publish markdown prompt files and changelog
```

The local workflow in this folder lets you reproduce the technical core:

- download package
- unpack binary
- extract JS
- search JS
- run raw prompt extraction

It does not claim to reproduce every internal curation, naming, changelog, or
token-counting step Piebald may use before publishing.

## Patching model

There are three levels of modification.

### Level 1: inspect only

Use:

```powershell
npx tweakcc unpack .\claude-code.js <path-to-binary>
```

Then read or search `claude-code.js`.

This does not modify the binary.

### Level 2: prompt customization through `tweakcc`

Run:

```powershell
npx tweakcc
```

Then edit prompt markdown files in the `tweakcc` configuration directory and
apply:

```powershell
npx tweakcc --apply
```

This is the intended prompt customization path. `tweakcc` tracks prompt files,
compares versions, manages conflicts, and applies changes.

### Level 3: ad hoc code patching

Use:

```powershell
npx tweakcc adhoc-patch ...
```

or:

```powershell
npx tweakcc unpack .\claude-code.js
# edit claude-code.js
npx tweakcc repack .\claude-code.js
```

This is more direct and riskier. It can break your local Claude Code
installation if the replacement is wrong.

## Backup and restore considerations

Before patching:

- know whether your installation is npm-based or native
- know the exact file path being modified
- create or verify a backup
- know how to reinstall Claude Code
- test with a non-critical workflow first

`tweakcc --apply` is designed to work with backups for normal customizations.
`adhoc-patch` is more direct. Treat it like editing a compiled application.

## Environment variables from the Reddit post

To disable nonessential traffic before launching Claude Code in the current
PowerShell session:

```powershell
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"
$env:DISABLE_GROWTHBOOK = "1"
claude
```

To persist these for future PowerShell sessions:

```powershell
setx CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC 1
setx DISABLE_GROWTHBOOK 1
```

`setx` affects future sessions, not the already-open shell. Open a new terminal
after running it.

To inspect current values:

```powershell
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
$env:DISABLE_GROWTHBOOK
```

To remove them for the current PowerShell session:

```powershell
Remove-Item Env:\CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
Remove-Item Env:\DISABLE_GROWTHBOOK
```

Persistent removal uses Windows environment variable settings or another
`setx` invocation with an empty value, depending on your preferred environment
management approach.

## Common failure modes

### `npm` is not recognized

Node.js is not installed or not on `PATH`. Install Node.js, then reopen
PowerShell.

### `tweakcc unpack` tries to use the default installation

Pass the binary path explicitly:

```powershell
npx --yes tweakcc@latest unpack .\artifacts\claude-code-2.1.150.js .\artifacts\unpacked-2.1.150\package\claude
```

The second path is the binary to read.

### The scan misses `function nAA`

You may be looking at a different Claude Code version. Minified function names
can change. Search for more stable strings:

```powershell
rg -n "tengu_heron_brook" .\artifacts\claude-code-<version>.js
rg -n "/api/claude_cli/bootstrap" .\artifacts\claude-code-<version>.js
```

### The extracted JS is one huge line

That is normal for minified JavaScript. Use search tools, snippets, or a
formatter if you need to read nearby control flow.

### The prompt extractor produces fewer records than the public corpus

That is expected in this local reproduction. The raw extractor finds candidate
large strings and merges with existing metadata. The public corpus appears to
include additional curated prompt records and metadata.

### `updatePrompts.js` asks for `ANTHROPIC_API_KEY`

That script counts tokens through Anthropic's API while updating the README.
You do not need it for basic extraction or inspection.

## Practical investigation checklist

When investigating a new Claude Code version:

1. Download and extract the JS:

   ```powershell
   .\scripts\extract-claude-code-js.ps1 -Version latest -OutDir .\artifacts
   ```

2. Note the resolved version printed by the script.

3. Search stable indicators:

   ```powershell
   .\scripts\scan-claude-code-js.ps1 -JsPath .\artifacts\claude-code-<version>.js
   ```

4. Search manually for new terms:

   ```powershell
   rg -n "some_feature_or_endpoint" .\artifacts\claude-code-<version>.js
   ```

5. If investigating prompts, run `promptExtractor.js` and compare output to
   the public `tweakcc\data\prompts\prompts-<version>.json`.

6. Record exact version numbers and file hashes if the finding matters.

7. Avoid relying on minified function names across versions.

## Security and policy notes

This workflow can reveal implementation details of a local development tool.
It should be used for legitimate inspection, compatibility research, auditing,
and personal configuration.

Do not use this workflow to:

- bypass organizational security controls
- redistribute patched proprietary binaries
- hide behavior from users or administrators
- run untrusted patch scripts against your development tools

If you work in a managed environment, check policy before modifying developer
tools that have filesystem, shell, or repository access.

## Summary mental model

Think of Claude Code's native executable as a packaged application that contains
minified JavaScript. `tweakcc unpack` extracts that JavaScript. Once extracted,
normal code search techniques work. That binary-inspection layer is broader
than prompt extraction: you can inspect endpoints, environment variables,
feature flags, prompt registration, and other runtime behavior. Prompt
extraction is a specialized next step that scans the JavaScript for large
prompt-like strings and template literals, producing structured JSON. Piebald's
system prompt repository converts that structured JSON into readable markdown
files.

The safest learning path is:

```text
download package copy
extract JS
search JS
extract prompt JSON
compare public prompt corpus
only then consider local patching
```
