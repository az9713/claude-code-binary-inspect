# Update, onboarding, and UI behavior

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to inspect user-visible CLI behavior: onboarding gates, dialogs, feedback flows, update messaging, and terminal UI components.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `update` | 1902 | turn H.sent.has($)&&!H.rejected.has($)}function rh$(H,$){H.sent.delete($),H.rejected.add($)}function H5q(H,$){return H.rejected.has($)}var WzH={};P$(WzH,{waitForScrollIdle:()=>$q$,updateLastInteractionTime:()=>pqH,switchSession:()=>b0,snapshotOutputTokensForTurn:()=>EG9,setUserMsgOptIn:()=>Ks,setUseCoworkPlugins:()=>LS,setTracerProvider:()=>fS$,setThinkingTypeOver |
| `terminal` | 406 | etTask($.params.taskId,q.sessionId);if(!K)throw new tK(_7.InvalidParams,`Task not found: ${$.params.taskId}`);if(lzH(K.status))throw new tK(_7.InvalidParams,`Cannot cancel task in terminal status: ${K.status}`);await this._taskStore.updateTaskStatus($.params.taskId,"cancelled","Client cancelled task execution.",q.sessionId),this._clearTaskQueue($.params.taskId);let |
| `feedback` | 350 | ewakeSummary:y.string().min(1).optional().describe('@internal One-line summary shown to the user in the terminal when an asyncRewake hook exits with code 2. Defaults to "Stop hook feedback".')}),$=y.object({type:y.literal("prompt").describe("LLM prompt hook type"),prompt:y.string().describe("Prompt to evaluate with LLM. Use $ARGUMENTS placeholder for hook input JSON |
| `dialog` | 210 | one or multiple files from the local filesystem to a file input element on the page. Do not click on file upload buttons or file inputs \u2014 clicking opens a native file picker dialog that you cannot see or interact with. Instead, use read_page or find to locate the file input element, then use this tool with its ref to upload files directly. The paths must be |
| `Remote Control` | 92 | ckground, the on-demand daemon). Typically set in managed settings. Equivalent to CLAUDE_CODE_DISABLE_AGENT_VIEW=1."),disableRemoteControl:y.boolean().optional().describe("Disable Remote Control (claude.ai/code, `claude remote-control`, `--remote-control`/`--rc`, auto-start, and the in-session toggle). Typically set in managed settings."),disableSkillShellExecution:y.bool |
| `onboarding` | 64 | nization?.seat_tier??null,hasExtraUsageEnabled:$?.organization?.has_extra_usage_enabled??null,billingType:$?.organization?.billing_type??null,ccOnboardingFlags:$?.organization?.cc_onboarding_flags??{},claudeCodeTrialEndsAt:$?.organization?.claude_code_trial_ends_at??null,claudeCodeTrialDurationDays:$?.organization?.claude_code_trial_duration_days??null};if($?.account? |
| `TrustDialog` | 15 | ";var XP=T(()=>{q6();r$();fk();E6();Pe$()});var Le={};P$(Le,{shouldSkipPluginAutoupdate:()=>LFH,setPathTrusted:()=>tz6,saveGlobalConfig:()=>Y8,saveCurrentProjectConfig:()=>vM,resetTrustDialogAcceptedCache:()=>sz6,recordFirstStartTime:()=>_Y6,isProjectConfigKey:()=>_t1,isPathTrusted:()=>JFH,isGlobalConfigKey:()=>qt1,isAutoUpdaterDisabled:()=>Xe,getUserClaudeRulesDir:()= |
| `hasCompletedOnboarding` | 9 | jFH,hasTrustDialogAccepted:!0}}}})}function _t1(H){return RbK.includes(H)}function ff$(H){let $=De.config;if(!$)return!1;let q=$.oauthAccount!==void 0&&H.oauthAccount===void 0,K=$.hasCompletedOnboarding===!0&&H.hasCompletedOnboarding!==!0;return q\|\|K}function Y8(H){let $=null;try{if($Y6(WG(),cn,(K)=>{let _=H(K);if(_===K)return K;return $=wFH({..._,projects:ybK(K.projects)}),$})&& |
| `changelog` | 7 | MCP server manifest"],["prompts","an MCP server manifest"],["resources","an MCP server manifest"],["logo","manifests across many tools"],["readme","manifests across many tools"],["changelog","manifests across many tools"],["support","manifests across many tools"],["privacy_policy","manifests across many tools"],["privacy_policies","manifests across many tools"],["ter |
| `ProTrial` | 7 | \u273B]")),Ic.createElement(k,{dimColor:!0},$)),width:48},footer:"/passes"}}var sS4,Ic;var $R4=T(()=>{vK();iH();NLH();Lq();sS4=require("os"),Ic=B(XH(),1)});var KR4={};P$(KR4,{startProTrial:()=>gi6,shouldAutoOpenProTrialExpired:()=>di6,getProTrialState:()=>wH$,getProTrialDurationDays:()=>Qi6,formatTrialBadge:()=>Tv$,PRO_TRIAL_FALLBACK_DAYS:()=>qR4});function Qi6(){re |
| `GroveDialog` | 2 | isHidden(){let{eligible:H,hasCache:$}=jH$();return!H\|\|!$},requires:{ink:!0},load:()=>Promise.resolve().then(() => (cu4(),du4))}});var nu4={};P$(nu4,{PrivacySettingsDialog:()=>Co6,GroveDialog:()=>Io6});function oe_(){let H=cv$.c(9),$;if(H[0]===Symbol.for("react.memo_cache_sentinel"))$=a7.default.createElement(k,null,"An update to our Consumer Terms and Privacy Policy w |
| `Restarting Claude Code` | 1 | tengu_bedrock_upgrade_relaunch",{}),await vf9(H)}async function vf9(H){let{Text:$}=await Promise.resolve().then(() => (iH(),Nb));H.render(GX.default.createElement($,{dimColor:!0},"Restarting Claude Code to apply the new model\u2026"));let{sleep:q}=await Promise.resolve().then(() => DA$);await q(250),H.unmount();let{execRelaunch:K}=await Promise.resolve().then(() => (yZ$(),EZ$));a |

## Developer takeaways

- This bucket is useful for CLI UX and product engineers.
- User-visible behavior often lives outside help text, so extracted strings can explain surprising prompts.
- Onboarding and feedback gates can be conditional on settings, feature flags, or provider mode.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
