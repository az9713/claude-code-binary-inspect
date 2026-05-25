# Startup and network behavior

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to understand what the CLI may contact at startup, which network flows are gated, and which environment variables alter network behavior.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `feedback` | 350 | ewakeSummary:y.string().min(1).optional().describe('@internal One-line summary shown to the user in the terminal when an asyncRewake hook exits with code 2. Defaults to "Stop hook feedback".')}),$=y.object({type:y.literal("prompt").describe("LLM prompt hook type"),prompt:y.string().describe("Prompt to evaluate with LLM. Use $ARGUMENTS placeholder for hook input JSON |
| `BASE_API_URL` | 45 | ocess.env.CLAUDE_LOCAL_OAUTH_APPS_BASE?.replace(/\/$/,"")??"http://localhost:4000",q=process.env.CLAUDE_LOCAL_OAUTH_CONSOLE_BASE?.replace(/\/$/,"")??"http://localhost:3000";return{BASE_API_URL:H,CONSOLE_AUTHORIZE_URL:`${q}/oauth/authorize`,CLAUDE_AI_AUTHORIZE_URL:`${$}/oauth/authorize`,CLAUDE_AI_ORIGIN:$,TOKEN_URL:`${H}/v1/oauth/token`,API_KEY_URL:`${H}/api/oauth/claude |
| `Bootstrap` | 17 | this session. Does NOT cover installing agent-chosen package names (e.g. \`pip install foo\`, \`npm install bar\`) \u2014 those carry typosquat and supply-chain risk. - Toolchain Bootstrap: Installing language toolchains (not packages) from their official one-line installers \u2014 \`sh.rustup.rs\`, \`bootstrap.pypa.io\`, \`astral.sh\`, \`bun.sh\`, \`deb.nodesource. |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 7 | ar LWq,Ti9;var cxH=T(()=>{LWq=/<([a-z][\w-]*)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g;Ti9=/<(ide_opened_file\|ide_selection)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g});function WWq(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(uH(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"}function Z4(){return WWq()===" |
| `1P event logging` | 3 | (H,$){try{if($.length===0)try{await UQ.unlink(H)}catch{}else{await UQ.mkdir(s3$(),{recursive:!0});let q=$.map((K)=>CH(K)).join(` `)+` `;await UQ.writeFile(H,q,"utf8")}}catch(q){N(`1P event logging: failed to persist failed-events batch to ${H}: ${TH(q)}`,{level:"error"})}}async appendEventsToFile(H,$){if($.length===0)return;try{await UQ.mkdir(s3$(),{recursive:!0});let q=$.m |
| `DISABLE_ERROR_REPORTING` | 3 | uH(process.env.CLAUDE_CODE_USE_VERTEX)\|\|uH(process.env.CLAUDE_CODE_USE_FOUNDRY)\|\|uH(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS)\|\|uH(process.env.CLAUDE_CODE_USE_MANTLE)\|\|process.env.DISABLE_ERROR_REPORTING\|\|Z4())return;let K={error:$.stack\|\|$.message,timestamp:new Date().toISOString()};if(vi9(K),gl===null){lxH.push({type:"error",error:$});return}gl.logError($)}catch{}}function B2H() |
| `DISABLE_TELEMETRY` | 3 | /<(ide_opened_file\|ide_selection)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g});function WWq(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(uH(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"}function Z4(){return WWq()==="essential-traffic"}function I9$(){return WWq()!=="default"} |
| `logEventTo1P` | 3 | hz6=T(()=>{q6()});var t0H={};P$(t0H,{shutdown1PEventLogging:()=>QQ,shouldSampleEvent:()=>Ye$,reinitialize1PEventLoggingIfConfigChanged:()=>Bs1,logGrowthBookExperimentTo1P:()=>Cz6,logEventTo1PAwaitable:()=>yy,logEventTo1PAsync:()=>Iz6,logEventTo1P:()=>KFH,is1PEventLoggingEnabled:()=>Xb,initialize1PEventLogging:()=>fe$,getEventSamplingConfig:()=>AbK,_reset1PStateForTesti |
| `/api/claude_cli/bootstrap` | 1 | N("[Bootstrap] Skipped: 3P provider"),null;let H=IJ();if(!(eq()?.accessToken&&JV())&&!H)return N("[Bootstrap] Skipped: no usable OAuth or API key"),null;let q=`${SK().BASE_API_URL}/api/claude_cli/bootstrap`;try{return await PG(async()=>{let K=eq()?.accessToken,_;if(K&&JV())_={Authorization:`Bearer ${K}`,"anthropic-beta":rZ};else if(H)_={"x-api-key":H};else return N("[Bootstrap] No a |
| `refreshGrowthBookFeatures` | 1 | quire("crypto");FQ=[]});var WbK={};P$(WbK,{stopPeriodicGrowthBookRefresh:()=>Uz6,setupPeriodicGrowthBookRefresh:()=>PbK,setGrowthBookConfigOverride:()=>Qs1,resetGrowthBook:()=>zFH,refreshGrowthBookFeatures:()=>LbK,refreshGrowthBookAfterAuthChange:()=>HTH,onGrowthBookRefresh:()=>dQ,isGrowthBookEnabled:()=>Oe,isFeatureFromExperiment:()=>Us1,initializeGrowthBook:()=>ZG,hasGrowthBookEnv |
| `setupPeriodicGrowthBookRefresh` | 1 | );dH();r$();P8();zK();s$();XC();pn();jb();KbK();q6();Wz();hz6();_bK=B(oUH(),1),ze$=B(Fn(),1),Sz6=require("crypto");FQ=[]});var WbK={};P$(WbK,{stopPeriodicGrowthBookRefresh:()=>Uz6,setupPeriodicGrowthBookRefresh:()=>PbK,setGrowthBookConfigOverride:()=>Qs1,resetGrowthBook:()=>zFH,refreshGrowthBookFeatures:()=>LbK,refreshGrowthBookAfterAuthChange:()=>HTH,onGrowthBookRefresh:()=>dQ,isGrowthB |

## Developer takeaways

- Stable endpoints and environment variables are better anchors than minified function names.
- Treat extracted code as evidence of shipped implementation paths; verify runtime behavior separately.
- This bucket is especially useful for enterprise, compliance, and network-control reviews.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
