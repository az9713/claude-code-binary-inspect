# Provider and model routing

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to inspect model/provider selection, first-party versus third-party routing, Bedrock/Vertex paths, aliases, and fallback behavior.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `model` | 2121 | ake, // and the associated conversations in context, constitute Feedback under Anthropic's Commercial Terms, // and may be used to improve Anthropic's products, including training models. // You are responsible for reviewing any code suggestions before use. // (c) Anthropic PBC. All rights reserved. Use is subject to the Legal Agreements outlined here: https://c |
| `bedrock` | 1020 | ()=>m5$});var OK=T(()=>{nQq();rQq();Xdq();Pdq();ba8();Gdq();ydq();Cdq();Oq($P,B(FC(),1),module.exports)});function rO1(H){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"bedrock",region:H.region},propertiesExtractor:($,q)=>({signingProperties:{config:$,context:q}})}}function oO1(H){return{schemeId:"smithy.api#httpBearerAuth",propertiesExtractor:({profile: |
| `fallback` | 402 | closed");this._transport=void 0,this.onclose?.();for(let q of H.values())q($)}_onerror(H){this.onerror?.(H)}_onnotification(H){let $=this._notificationHandlers.get(H.method)??this.fallbackNotificationHandler;if($===void 0)return;Promise.resolve().then(()=>$(H)).catch((q)=>this._onerror(Error(`Uncaught error in notification handler: ${q}`)))}_onrequest(H,$){let q=thi |
| `vertex` | 176 | ll}var Ue8,Fe8,Qe8,ge8,de8,ce8,le8,ne8,ie8,re8,zc$,Yc$,cY,tHK,eHK;var Yn=T(()=>{Ue8={firstParty:"claude-3-7-sonnet-20250219",bedrock:"us.anthropic.claude-3-7-sonnet-20250219-v1:0",vertex:"claude-3-7-sonnet@20250219",foundry:"claude-3-7-sonnet",anthropicAws:"claude-3-7-sonnet-20250219",mantle:null,gateway:"claude-3-7-sonnet-20250219"},Fe8={firstParty:"claude-3-5-so |
| `gateway` | 140 | pe:"cli",sessionSource:void 0,sessionStartType:"fresh",questionPreviewFormat:void 0,sessionIngressToken:void 0,oauthTokenFromFd:void 0,oauthScopesFromFd:void 0,apiKeyFromFd:void 0,gatewayAuth:null,gatewayRefreshInFlight:null,flagSettingsPath:void 0,flagSettingsInline:null,parentManagedSettings:null,allowedSettingSources:["userSettings","projectSettings","localSetti |
| `firstParty` | 109 | Y))for(let K of Object.values(q))if(typeof K==="string"&&K.toLowerCase()===$)return q;return null}var Ue8,Fe8,Qe8,ge8,de8,ce8,le8,ne8,ie8,re8,zc$,Yc$,cY,tHK,eHK;var Yn=T(()=>{Ue8={firstParty:"claude-3-7-sonnet-20250219",bedrock:"us.anthropic.claude-3-7-sonnet-20250219-v1:0",vertex:"claude-3-7-sonnet@20250219",foundry:"claude-3-7-sonnet",anthropicAws:"claude-3-7-sonnet |
| `ANTHROPIC_DEFAULT` | 77 | ction fP(){if(process.env.ANTHROPIC_SMALL_FAST_MODEL)return process.env.ANTHROPIC_SMALL_FAST_MODEL;let H=Iq(),$=H==="firstParty"&&(wA()\|\|G86())\|\|H==="anthropicAws";if(!process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL&&!$)return F7();return FBH()}function $GH(H){let $=L7(H);return $==="claude-opus-4-0"\|\|$==="claude-opus-4-1"\|\|$==="claude-opus-4-5"\|\|$==="claude-opus-4-6"\|\|$==="claude |
| `probe` | 37 | %1000===0?"s":"ms";Object.defineProperty($,u5K,{value:f}),q(null,Y.mtime,f)})})}function RE1(H){let $=Date.now();if(H==="s")$=Math.ceil($/1000)*1000;return new Date($)}g86.exports.probe=SE1;g86.exports.getMtime=RE1});var Q5K=i((HHY,OA$)=>{var IE1=require("path"),l86=GM(),CE1=C5K(),bE1=x5K(),B5K=m5K(),N7H={};function fA$(H,$){return $.lockfilePath\|\|`${H}.lock`}fun |
| `ANTHROPIC_BEDROCK` | 27 | )??null}async function aHK(){let{BedrockClient:H}=await Promise.resolve().then(() => (H_$(),e5$)),$=wk(),q=uH(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH),K={region:$,...process.env.ANTHROPIC_BEDROCK_BASE_URL&&{endpoint:process.env.ANTHROPIC_BEDROCK_BASE_URL},...await SmH({url:process.env.ANTHROPIC_BEDROCK_BASE_URL\|\|`https://bedrock.${$}.amazonaws.com`}),...q&&{requestHandler: |
| `CLAUDE_CODE_USE_BEDROCK` | 16 | ror);break;case"mcpError":gl.logMCPError(q.serverName,q.error);break;case"mcpDebug":gl.logMCPDebug(q.serverName,q.message);break}}}function IH(H){let $=c6(H);try{if(uH(process.env.CLAUDE_CODE_USE_BEDROCK)\|\|uH(process.env.CLAUDE_CODE_USE_VERTEX)\|\|uH(process.env.CLAUDE_CODE_USE_FOUNDRY)\|\|uH(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS)\|\|uH(process.env.CLAUDE_CODE_USE_MANTLE)\|\|process.e |
| `ANTHROPIC_VERTEX` | 15 | 0-16",oc1,F56;var Q56=T(()=>{PF();rCH();U56();u0K();PF();m0K=B(da$(),1),oc1=new Set(["/v1/messages","/v1/messages?beta=true"]);F56=class F56 extends gY{constructor({baseURL:H=ca$("ANTHROPIC_VERTEX_BASE_URL"),region:$=ca$("CLOUD_ML_REGION")??null,projectId:q=ca$("ANTHROPIC_VERTEX_PROJECT_ID")??null,...K}={}){if(!$)throw Error("No region was given. The client should be instan |
| `CLAUDE_CODE_USE_VERTEX` | 15 | q.serverName,q.error);break;case"mcpDebug":gl.logMCPDebug(q.serverName,q.message);break}}}function IH(H){let $=c6(H);try{if(uH(process.env.CLAUDE_CODE_USE_BEDROCK)\|\|uH(process.env.CLAUDE_CODE_USE_VERTEX)\|\|uH(process.env.CLAUDE_CODE_USE_FOUNDRY)\|\|uH(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS)\|\|uH(process.env.CLAUDE_CODE_USE_MANTLE)\|\|process.env.DISABLE_ERROR_REPORTING\|\|Z4())return; |
| `AWS_BEARER_TOKEN_BEDROCK` | 14 | ovider:()=>async()=>({}),signer:new(await Promise.resolve().then(() => B(r1(),1))).NoAuthSigner}],httpAuthSchemeProvider:()=>[{schemeId:"smithy.api#noAuth"}]}};if(!q&&!process.env.AWS_BEARER_TOKEN_BEDROCK){let _=await fQ();if(_)K.credentials={accessKeyId:_.accessKeyId,secretAccessKey:_.secretAccessKey,sessionToken:_.sessionToken}}return new H(K)}async function sHK(){let{BedrockRunt |

## Developer takeaways

- This bucket is valuable for apps that support multiple model providers or enterprise routing.
- Model override and fallback markers help explain behavior that may differ by environment.
- Provider-specific environment variables often reveal supported deployment modes.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
