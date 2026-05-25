# Patch points

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to identify stable anchors for customization or research: endpoints, env vars, feature keys, prompt fragments, and distinctive templates.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `process.env.` | 1586 | ACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-05-23T01:22:49Z",GIT_SHA:"28d4819e0f0a51840356d175c2a710f0c83db5b4"}.VERSION}`}function KW(){switch(process.env.CLAUDE_CODE_ENTRYPOINT){case"claude-vscode":return"claude_code_vscode";case"remote":case"remote_baku":case"remote_cowork":case"remote_desktop":case"remote_mobile":return"claude_cod |
| `BASE_API_URL` | 45 | ocess.env.CLAUDE_LOCAL_OAUTH_APPS_BASE?.replace(/\/$/,"")??"http://localhost:4000",q=process.env.CLAUDE_LOCAL_OAUTH_CONSOLE_BASE?.replace(/\/$/,"")??"http://localhost:3000";return{BASE_API_URL:H,CONSOLE_AUTHORIZE_URL:`${q}/oauth/authorize`,CLAUDE_AI_AUTHORIZE_URL:`${$}/oauth/authorize`,CLAUDE_AI_ORIGIN:$,TOKEN_URL:`${H}/v1/oauth/token`,API_KEY_URL:`${H}/api/oauth/claude |
| `cachedGrowthBookFeatures` | 8 | has(H))return!0;if(!Oe())return!1;return(m$().cachedExperimentFeatures??[]).includes(H)}function Kf$(){return}function MbK(){if(gQ.size>0)return Object.fromEntries(gQ);return m$().cachedGrowthBookFeatures??{}}function jbK(){return Oe$}function Fs1(){return Kf$()??{}}function Qs1(H,$){return}function gs1(){return}function Me$(H){if(bz6.has(H))return;let $=MOH.get(H);if($)bz6.add(H), |
| `clientDataCache` | 8 | 6;if(G7H(H))return 1e6;let q=ta$(H);if(q!==null)return q;return n56}function ta$(H){if(T7H())return null;if(C2(H))return null;if(L7(H)!=="claude-sonnet-4-6")return null;let $=m$().clientDataCache?.kelp_forest_sonnet;if(typeof $!=="string")return null;let q=parseInt($,10);if(!Number.isFinite(q)\|\|q<=0)return null;return q}function ea$(H,$){if(!H)return{used:null,remaining:nu |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 7 | ar LWq,Ti9;var cxH=T(()=>{LWq=/<([a-z][\w-]*)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g;Ti9=/<(ide_opened_file\|ide_selection)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g});function WWq(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(uH(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"}function Z4(){return WWq()===" |
| `DISABLE_GROWTHBOOK` | 4 | achedGrowthBookFeatures,H)&&DM(q.cachedExperimentFeatures??[],$))return;Y8((K)=>({...K,cachedGrowthBookFeatures:H,cachedExperimentFeatures:$}))}function Oe(){return!uH(process.env.DISABLE_GROWTHBOOK)&&Xb()}function JbK(){let H=process.env.ANTHROPIC_BASE_URL;if(!H)return;try{let $=new URL(H).host;if($==="api.anthropic.com")return;return $}catch{return}}function Bz6(){let H=ETK |
| `tengu_heron_brook` | 2 | , determine if you can adjust your actions in response to the blocked message. If not, ask the user to check their hooks configuration."}function nAA(){let H=m$().clientDataCache?.tengu_heron_brook;if(typeof H==="string"&&H.trim()!=="")return H.trim();let $=v$("tengu_heron_brook","");if($.trim()!=="")return $.trim();return null}function iAA(H){if(!H)return null;return`# Lang |
| `/api/claude_cli/bootstrap` | 1 | N("[Bootstrap] Skipped: 3P provider"),null;let H=IJ();if(!(eq()?.accessToken&&JV())&&!H)return N("[Bootstrap] Skipped: no usable OAuth or API key"),null;let q=`${SK().BASE_API_URL}/api/claude_cli/bootstrap`;try{return await PG(async()=>{let K=eq()?.accessToken,_;if(K&&JV())_={Authorization:`Bearer ${K}`,"anthropic-beta":rZ};else if(H)_={"x-api-key":H};else return N("[Bootstrap] No a |
| `Rv("heron_brook"` | 1 | =>MzA()),Rv("scratchpad",()=>jzA()),Rv("context_management",()=>wzA),...[],Rv("brief",()=>DzA()),Rv(`focus_mode${A}`,()=>LzA($)),Rv("reproduce_verify_workflow",()=>_zA()?AzA:null),Rv("heron_brook",()=>nAA())],D=await q14(w);return[..._?[KzA(f)]:[oAA(f),aAA(),f===null\|\|f.keepCodingInstructions===!0?sAA():null,tAA($),eAA(M),qzA()],...K?.excludeDynamicSections?[kxK($)]:[],...$ |

## Developer takeaways

- Prefer stable strings over minified function names for version-to-version investigation.
- Good patch anchors are distinctive, rare, and semantically tied to the behavior you want to change.
- Patching a live installation is riskier than inspecting a downloaded package copy.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
