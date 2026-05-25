# Useful information in extracted Claude Code JavaScript

Current extraction target for generated bucket reports:

- Claude binary version: `2.1.150`
- Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
- Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
- Bucket reports: `bucket-reports/*.md`

Extracted Claude Code JavaScript is useful for understanding what behavior is
shipped in a given Claude Code version. It is broader than system prompt
extraction: once the embedded JavaScript is available, normal code search can
surface endpoints, configuration switches, feature flags, prompt fragments,
tooling behavior, and patch points.

## 1. Startup and network behavior

Useful things to look for:

- API endpoints
- bootstrap calls
- update checks
- telemetry and event logging paths
- feature flag fetches
- retry and timeout behavior
- environment variables that disable or alter network flows

Example markers from the `2.1.150` inspection included:

- `/api/claude_cli/bootstrap`
- `GrowthBook`
- `DISABLE_GROWTHBOOK`
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`

## 2. Prompt and agent architecture

Useful things to look for:

- main system prompt fragments
- tool descriptions
- subagent prompts
- slash-command prompts
- system reminders
- prompt template literals and runtime variables
- code paths that compose prompt sections dynamically

This is where system-prompt extraction tools focus, but it is only one part of
the broader binary inspection workflow.

## 3. Feature flags and experiments

Useful things to look for:

- feature flag names
- default feature values
- cached feature/config keys
- conditional rollout gates
- remotely configurable behavior
- experiment logging

This helps distinguish whether a behavior appears hardcoded, locally configured,
or remotely gated.

## 4. Environment variables and configuration surface

Useful things to look for:

- supported environment variables
- config file paths
- settings keys
- provider modes
- model override knobs
- telemetry controls
- sandbox-related options
- hidden or debug flags

Environment variable names are often more stable investigation anchors than
minified function names.

## 5. Tooling and permission behavior

Useful things to look for:

- built-in tool descriptions
- argument validation logic
- permission prompts
- policy checks
- sandbox behavior
- command filtering
- git safeguards
- rules governing shell, file, network, and browser tool use

This bucket is useful for understanding what Claude Code may ask permission for
and how it frames tool use to the model.

## 6. Provider and model routing

Useful things to look for:

- Anthropic first-party routing
- gateway/provider modes
- Bedrock and Vertex references
- model aliases
- fallback logic
- default model keys
- provider-specific environment variables
- model availability probes

This can clarify how Claude Code chooses or overrides models under different
provider configurations.

## 7. Local storage and cache locations

Useful things to look for:

- cache directories
- config directories
- log locations
- session state
- prompt or client data caches
- onboarding flags
- telemetry queues
- feature flag caches

This helps locate state that may affect repeatability during inspection.

## 8. Update, onboarding, and UI behavior

Useful things to look for:

- update checks
- changelog or version messages
- onboarding gates
- dialogs and terminal UI components
- remote-control features
- feedback flows
- feature-specific user prompts

These strings and code paths can explain user-visible behavior that is not
obvious from CLI help text.

## 9. Patch points

Useful things to look for:

- stable string literals
- prompt fragments
- endpoint paths
- environment variable names
- feature flag keys
- distinctive template literal text

If the goal is customization, these are usually better anchors than minified
function names. Minified names such as `nAA` or `n0A` are version-specific and
may change between releases.

## Caveat: shipped code is not always active behavior

Extracted JavaScript shows code paths and strings shipped in a specific Claude
Code version. It does not prove that every path runs in every configuration.

Runtime behavior can depend on:

- authentication state
- provider mode
- settings
- feature flags
- environment variables
- startup path
- network availability
- operating system
- Claude Code version

Treat extracted JavaScript as evidence of available implementation paths, then
verify runtime behavior separately when the distinction matters.
