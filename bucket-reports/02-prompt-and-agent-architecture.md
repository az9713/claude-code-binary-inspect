# Prompt and agent architecture

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to study how Claude Code organizes prompt fragments, tool descriptions, subagent prompts, slash-command prompts, and dynamic prompt sections.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `prompt` | 1672 | e:void 0,systemPromptSectionCache:new Map,lastEmittedDate:null,additionalDirectoriesForClaudeMd:[],allowedChannels:[],activeInputs:new Map,hasDevChannels:!1,sessionProjectDir:null,promptCache1hAllowlist:null,stickyBetas:xR8(),thinkingTypeOverrides:new Map,inferenceProfileBackingModels:new Map,promptId:null,promptIndex:0,lastMainRequestId:void 0,lastMainThreadCache |
| `subagent` | 315 | ate for PR links in the footer badge and inline messages. Placeholders: {host} {owner} {repo} {number} {url}. Example: "https://reviews.example.com/{owner}/{repo}/pull/{number}"'),subagentStatusLine:y.object({type:y.literal("command"),command:y.string()}).optional().describe("Custom per-subagent status line shown in the agent panel; receives row context as JSON on s |
| `system-reminder` | 60 | hook runs in background and wakes the model on exit code 2 (blocking error). Implies async."),rewakeMessage:y.string().min(1).optional().describe("@internal Custom prefix for the system-reminder shown to the model when an asyncRewake hook exits with code 2. The hook output is appended after this prefix."),rewakeSummary:y.string().min(1).optional().describe('@internal One- |
| `slash command` | 30 | et, the commands/ directory is not auto-loaded."),y.record(y.string(),Ks9()).describe('Object mapping of command names to their metadata and source files. Command name becomes the slash command name (e.g., "about" \u2192 "/plugin:about")')])})),As9=SH(()=>y.object({agents:y.union([uc8().describe("Path to an agent file, relative to the plugin root. When set, the agents/ d |
| `tool description` | 5 | bookkeeping, not surfaced to users")})),Ww6=SH(()=>J35().extend({when_to_use:hW().optional().describe("Guidance for when the model should reach for this skill. Becomes part of the tool description."),paths:ZgH().optional().describe("Glob patterns this skill applies to. The skill only loads when the model touches matching files."),hooks:y.unknown().optional().describe("Hooks |
| `Rv("heron_brook"` | 1 | =>MzA()),Rv("scratchpad",()=>jzA()),Rv("context_management",()=>wzA),...[],Rv("brief",()=>DzA()),Rv(`focus_mode${A}`,()=>LzA($)),Rv("reproduce_verify_workflow",()=>_zA()?AzA:null),Rv("heron_brook",()=>nAA())],D=await q14(w);return[..._?[KzA(f)]:[oAA(f),aAA(),f===null\|\|f.keepCodingInstructions===!0?sAA():null,tAA($),eAA(M),qzA()],...K?.excludeDynamicSections?[kxK($)]:[],...$ |

## Generated prompt JSON buckets

| Bucket | Records |
| --- | ---: |
| (unnamed) | 165 |
| System Prompt | 31 |
| Agent Prompt | 20 |
| Tool Description | 19 |
| System Reminder | 6 |
| Skill | 1 |
| Data | 1 |
| Tool Parameter | 1 |

## Named prompt examples

- Agent Prompt: /code-review part 8 GitHub comment posting: Optional /code-review instructions for posting findings as GitHub inline PR comments when --comment is passed
- System Prompt: Agent memory instructions: Instructions for including memory update guidance in agent system prompts
- Agent Prompt: /review-pr slash command: System prompt for reviewing GitHub pull requests with code analysis
- Tool Description: WebSearch: Tool description for web search functionality
- Tool Description: WebFetch: Tool description for web fetch functionality
- Tool Description: TeamDelete: Tool description for the TeamDelete tool
- Tool Description: TaskList (teammate workflow): Conditional section appended to TaskList tool description
- System Prompt: Option previewer: System prompt for previewing UI options in a side-by-side layout
- Agent Prompt: WebFetch summarizer: Prompt for agent that summarizes verbose output from WebFetch for the main model
- System Prompt: Memory description of user details: Describes the purpose and guidelines for per-user memory files that accumulate details about the user's role, goals, knowledge, and preferences across sessions
- System Prompt: Memory description of user details: Describes the purpose and guidelines for per-user memory files that accumulate details about the user's role, goals, knowledge, and preferences across sessions
- System Prompt: Description part of memory instructions: Field for describing _what_ the memory is. Part of a bigger effort to instruct Claude how to create memories.

## Developer takeaways

- This is the highest-value bucket for agent application design.
- Tool descriptions and subagent prompts are more reusable for app developers than raw minified code.
- Prompt extraction is a specialized layer built on top of the broader binary-inspection workflow.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
