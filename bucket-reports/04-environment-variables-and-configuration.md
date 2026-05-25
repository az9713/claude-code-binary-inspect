# Environment variables and configuration surface

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to discover supported environment variables, provider knobs, telemetry controls, config paths, and debug switches.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `config` | 2496 | q,i=(H,$)=>()=>($\|\|H(($={exports:{}}).exports,$),$.exports);var XP9=(H)=>H;function LP9(H,$){this[H]=XP9.bind(null,$)}var P$=(H,$)=>{for(var q in $)qWH(H,q,{get:$[q],enumerable:!0,configurable:!0,set:LP9.bind($,q)})};var T=(H,$)=>()=>(H&&($=H(H=0)),$);var J4q=i((myA,PP9)=>{PP9.exports=require("/$bunfs/root/image-processor.node")});var X4q=i((ByA,WP9)=>{WP9.exports |
| `process.env.` | 1586 | ACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-05-23T01:22:49Z",GIT_SHA:"28d4819e0f0a51840356d175c2a710f0c83db5b4"}.VERSION}`}function KW(){switch(process.env.CLAUDE_CODE_ENTRYPOINT){case"claude-vscode":return"claude_code_vscode";case"remote":case"remote_baku":case"remote_cowork":case"remote_desktop":case"remote_mobile":return"claude_cod |
| `settings` | 1037 | =require("/$bunfs/root/image-processor.node")});var X4q=i((ByA,WP9)=>{WP9.exports=require("/$bunfs/root/audio-capture.node")});function zh$(H){let $=!1,q,K={addDir:[],pluginDir:[],settings:void 0,mcpConfig:[],strictMcpConfig:!1},_=[],A={"--cwd":(z)=>{q=z},"--settings":(z)=>{K.settings=z},"--add-dir":(z)=>K.addDir.push(z),"--plugin-dir":(z)=>K.pluginDir.push(z),"--mc |
| `CLAUDE_CODE_` | 869 | "https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-05-23T01:22:49Z",GIT_SHA:"28d4819e0f0a51840356d175c2a710f0c83db5b4"}.VERSION}`}function KW(){switch(process.env.CLAUDE_CODE_ENTRYPOINT){case"claude-vscode":return"claude_code_vscode";case"remote":case"remote_baku":case"remote_cowork":case"remote_desktop":case"remote_mobile":return"claude_code_remote";ca |
| `ANTHROPIC_` | 455 | onfigs",`${_}.json`),f;try{f=await A.promises.readFile(Y,"utf-8")}catch(j){if(j?.code!=="ENOENT")throw Error(`failed to read config file ${Y}: ${j}`);f=null}if(f===null){let j=jM("ANTHROPIC_ORGANIZATION_ID"),w=jM("ANTHROPIC_IDENTITY_TOKEN_FILE"),D=jM("ANTHROPIC_FEDERATION_RULE_ID");if(D&&j)return{fromFile:!1,config:{organization_id:j,workspace_id:jM("ANTHROPIC_WORKSPA |
| `AWS_` | 261 | or(`Invalid environment variable format: ${q}, environment variables should be added as: -e KEY1=value1 -e KEY2=value2`);$[K]=_.join("=")}return $}function wk(){return process.env.AWS_REGION\|\|process.env.AWS_DEFAULT_REGION\|\|"us-east-1"}function hS$(){return process.env.CLOUD_ML_REGION\|\|"us-east5"}function CCH(H){switch(H){case"global":return"https://aiplatform.g |
| `DISABLE_` | 141 | ar cxH=T(()=>{LWq=/<([a-z][\w-]*)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g;Ti9=/<(ide_opened_file\|ide_selection)(?:\s[^>]*)?>[\s\S]*?<\/\1>\n?/g});function WWq(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(uH(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"}function Z |
| `ENABLE_` | 63 | "),policyHelper:ms9().optional().describe("Executable that computes managed settings at startup. Honored only from admin-controlled policy sources."),...uH(process.env.CLAUDE_CODE_ENABLE_XAA)&&{xaaIdp:y.object({issuer:y.string().url().describe("IdP issuer URL for OIDC discovery"),clientId:y.string().describe("Claude Code's client_id registered at the IdP"),callback |
| `GOOGLE_` | 28 | .stringify(Y);if(q)q(K,f);else console.log("%s",f)}}setFilters(){var H;(H=this.upstream)===null\|\|H===void 0\|\|H.setFilters()}}function UQ1(H){return new sZK(H)}lj.env={nodeEnables:"GOOGLE_SDK_NODE_LOGGING"};var R16=new Map,tm=void 0;function FQ1(H){tm=H,R16.clear()}function tZK(H,$){if(!tm){if(!gY$.env[lj.env.nodeEnables])return lj.placeholder}if(!H)return lj.placeh |
| `XDG_` | 20 | ainless-OS"]==="Windows"){let A=jM("APPDATA");if(A)return H.join(A,"Anthropic");let z=jM("USERPROFILE");if(z)return H.join(z,"AppData","Roaming","Anthropic");return null}let K=jM("XDG_CONFIG_HOME");if(K)return H.join(K,"anthropic");let _=jM("HOME");if(_)return H.join(_,".config","anthropic");return null},O09=()=>{let H=Rq$()["X-Stainless-Runtime"];return H==="no |
| `APPDATA` | 16 | dentials",`${K}.json`)},tC8=async()=>{if(!O09())return null;let H=await import("path"),$=jM("ANTHROPIC_CONFIG_DIR");if($)return $;if(Rq$()["X-Stainless-OS"]==="Windows"){let A=jM("APPDATA");if(A)return H.join(A,"Anthropic");let z=jM("USERPROFILE");if(z)return H.join(z,"AppData","Roaming","Anthropic");return null}let K=jM("XDG_CONFIG_HOME");if(K)return H.join(K,"ant |
| `GCLOUD_` | 4 | -helper --format json",($,q)=>{if(!$&&q)try{let K=JSON.parse(q).configuration.properties.core.project;H(K);return}catch(K){}H(null)})})}getProductionProjectId(){return process.env.GCLOUD_PROJECT\|\|process.env.GOOGLE_CLOUD_PROJECT\|\|process.env.gcloud_project\|\|process.env.google_cloud_project}async getFileProjectId(){if(this.cachedCredential)return this.cachedCredenti |

## Extracted environment-variable candidates

| Environment variable |
| --- |
| `ANTHROPIC_` |
| `ANTHROPIC_API_KEY` |
| `ANTHROPIC_AUTH_TOKEN` |
| `ANTHROPIC_AWS_API_KEY` |
| `ANTHROPIC_AWS_BASE_URL` |
| `ANTHROPIC_AWS_WORKSPACE_ID` |
| `ANTHROPIC_BASE_URL` |
| `ANTHROPIC_BEDROCK_BASE_URL` |
| `ANTHROPIC_BEDROCK_MANTLE_API_KEY` |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` |
| `ANTHROPIC_BETAS` |
| `ANTHROPIC_CONFIG_DIR` |
| `ANTHROPIC_CUSTOM_HEADERS` |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_NAME` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES` |
| `ANTHROPIC_ENVIRONMENT_ID` |
| `ANTHROPIC_ENVIRONMENT_KEY` |
| `ANTHROPIC_FEDERATION_RULE_ID` |
| `ANTHROPIC_FOUNDRY_API_KEY` |
| `ANTHROPIC_FOUNDRY_BASE_URL` |
| `ANTHROPIC_FOUNDRY_RESOURCE` |
| `ANTHROPIC_IDENTITY_TOKEN` |
| `ANTHROPIC_IDENTITY_TOKEN_FILE` |
| `ANTHROPIC_LOG` |
| `ANTHROPIC_MODEL` |
| `ANTHROPIC_ORGANIZATION_ID` |
| `ANTHROPIC_PROFILE` |
| `ANTHROPIC_SCOPE` |
| `ANTHROPIC_SERVICE_ACCOUNT_ID` |
| `ANTHROPIC_SMALL_FAST_MODEL` |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` |
| `ANTHROPIC_UNIX_SOCKET` |
| `ANTHROPIC_VERTEX_BASE_URL` |
| `ANTHROPIC_VERTEX_PROJECT_ID` |
| `ANTHROPIC_WORKSPACE_ID` |
| `AWS_ACCESS_KEY` |
| `AWS_ACCESS_KEY_ID` |
| `AWS_ACCOUNT_ID` |
| `AWS_AUTH_SCHEME_PREFERENCE` |
| `AWS_BEARER_TOKEN_BEDROCK` |
| `AWS_CA_BUNDLE` |
| `AWS_CONFIG_FILE` |
| `AWS_CONTAINER_AUTHORIZATION_TOKEN` |
| `AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE` |
| `AWS_CONTAINER_CREDENTIALS_FULL_URI` |
| `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` |
| `AWS_CREDENTIAL_EXPIRATION` |
| `AWS_CREDENTIAL_SCOPE` |
| `AWS_DEFAULTS_MODE` |
| `AWS_DEFAULT_REGION` |
| `AWS_EC2_METADATA_DISABLED` |
| `AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE` |
| `AWS_EC2_METADATA_V1_DISABLED` |
| `AWS_ECS_EC2` |
| `AWS_ECS_FARGATE` |
| `AWS_ENDPOINT_URL` |
| `AWS_EXECUTION_ENV` |
| `AWS_LAMBDA_BENCHMARK_MODE` |
| `AWS_LAMBDA_FUNCTION_NAME` |
| `AWS_LAMBDA_MAX_CONCURRENCY` |
| `AWS_LOGIN_CACHE_DIRECTORY` |
| `AWS_MAX_ATTEMPTS` |
| `AWS_PROFILE` |
| `AWS_REGION` |
| `AWS_RETRY_MODE` |
| `AWS_ROLE_ARN` |
| `AWS_ROLE_SESSION_NAME` |
| `AWS_SDK_UA_APP_ID` |
| `AWS_SECRET_ACCESS_KEY` |
| `AWS_SECRET_KEY` |
| `AWS_SESSION_TOKEN` |
| `AWS_SHARED_CREDENTIALS_FILE` |
| `AWS_USE_DUALSTACK_ENDPOINT` |
| `AWS_USE_FIPS_ENDPOINT` |
| `AWS_WEB_IDENTITY_TOKEN_FILE` |
| `BASH_COMMAND` |
| `BASH_DEFAULT_TIMEOUT_MS` |
| `BASH_MAX_OUTPUT_LENGTH` |
| `BASH_MAX_TIMEOUT_MS` |
| `BASH_REMATCH` |
| `BASH_VERSION` |
| `BEDROCK_RERANKING_MODEL` |
| `CLAUDE_` |
| `CLAUDE_AFTER_LAST_COMPACT` |
| `CLAUDE_AGENTS_AUTO_RELAUNCHED_AT` |
| `CLAUDE_AGENTS_SELECT` |
| `CLAUDE_AGENT_SDK_CLIENT_APP` |
| `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS` |
| `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` |
| `CLAUDE_AGENT_SDK_VERSION` |
| `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` |
| `CLAUDE_AUTO_BACKGROUND_TASKS` |
| `CLAUDE_BASE` |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` |
| `CLAUDE_BG_AUTH_SNAPSHOT_PATH` |
| `CLAUDE_BG_BACKEND` |
| `CLAUDE_BG_ISOLATION` |
| `CLAUDE_BG_MEMORY_TOGGLED_OFF` |
| `CLAUDE_BG_RENDEZVOUS_SOCK` |
| `CLAUDE_BG_SESSION_PERMISSION_RULES` |
| `CLAUDE_BG_SOURCE` |
| `CLAUDE_BG_STARTUP_WEDGE_MS` |
| `CLAUDE_BG_TCC_DISCLAIMED` |
| `CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY` |

## Developer takeaways

- Environment variables are among the most stable and useful anchors for application and platform developers.
- This bucket helps separate runtime configuration from hardcoded behavior.
- Use this for deployment, enterprise policy, provider routing, and reproducibility investigations.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
