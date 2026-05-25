# Local storage and cache locations

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to locate state that may affect repeatability: caches, logs, sessions, client data, onboarding flags, and queued telemetry.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `session` | 4222 | irosActive:!1,rendererMode:void 0,strictToolResultPairing:!1,memoryToggledOff:!1,teamMemoryServerStatus:void 0,sdkAgentProgressSummariesEnabled:!1,userMsgOptIn:!1,clientType:"cli",sessionSource:void 0,sessionStartType:"fresh",questionPreviewFormat:void 0,sessionIngressToken:void 0,oauthTokenFromFd:void 0,oauthScopesFromFd:void 0,apiKeyFromFd:void 0,gatewayAuth:null |
| `cache` | 2910 | /,cZ9=/^\w*$/;OCH=lZ9});function hR8(H,$){if(typeof H!="function"\|\|$!=null&&typeof $!="function")throw TypeError(nZ9);var q=function(){var K=arguments,_=$?$.apply(this,K):K[0],A=q.cache;if(A.has(_))return A.get(_);var z=H.apply(this,K);return q.cache=A.set(_,z)\|\|A,z};return q.cache=new(hR8.Cache\|\|AWH),q}var nZ9="Expected a function",v8;var W7=T(()=>{wh$();hR8.Cac |
| `messages` | 1394 | o body")}return new UCH(Iq$(H.body),$)}}});var rq$;var Tb8=T(()=>{YW();GJ();Gb8();rqH();QZ();rq$=class rq$ extends o5{create(H,$){let{betas:q,...K}=H;return this._client.post("/v1/messages/batches?beta=true",{body:K,...$,headers:bq([{"anthropic-beta":[...q??[],"message-batches-2024-09-24"].toString()},$?.headers])})}retrieve(H,$={},q){let{betas:K}=$??{};return this. |
| `.config` | 861 | );if(!f09.test(H))throw Error(`profile name "${H}" contains disallowed characters (allowed: letters, digits, '_', '.', '-')`)}var QS$="1.0",f09,xq$=async(H)=>{return(await sC8(H))?.config??null},sC8=async(H)=>{var $,q;let K=await tC8();if(K===null)return null;let _=H??await r5q();if(_===null)return null;n5q(_);let A=await import("fs"),Y=(await import("path")).join( |
| `.cache` | 783 | ]/,cZ9=/^\w*$/;OCH=lZ9});function hR8(H,$){if(typeof H!="function"\|\|$!=null&&typeof $!="function")throw TypeError(nZ9);var q=function(){var K=arguments,_=$?$.apply(this,K):K[0],A=q.cache;if(A.has(_))return A.get(_);var z=H.apply(this,K);return q.cache=A.set(_,z)\|\|A,z};return q.cache=new(hR8.Cache\|\|AWH),q}var nZ9="Expected a function",v8;var W7=T(()=>{wh$();hR8.Cac |
| `cached` | 326 | onCounter:null,activeTimeCounter:null,statsStore:null,sessionId:xqH.randomUUID(),parentSessionId:void 0,loggerProvider:null,eventLogger:null,meterProvider:null,tracerProvider:null,cachedTelemetryResource:null,agentColorMap:new Map,agentColorIndex:0,lastAPIRequest:null,lastCancelledAPIMessageId:null,lastAPIRequestMessages:null,lastClassifierRequests:null,cachedClau |
| `logs` | 245 | sages",description:"Read browser console messages (console.log, console.error, console.warn, etc.) from a specific tab. Useful for debugging JavaScript errors, viewing application logs, or understanding what's happening in the browser console. Returns console messages from the current domain only. If you don't have a valid tab ID, use tabs_context_mcp first to g |
| `Application Support` | 22 | eturn Wi9(H);if(ru$.default.platform==="win32")return Zi9(H);return Gi9(H)}var BX,Rg8,ru$,XYH,Ig8,QxH,Wi9=(H)=>{let $=BX.default.join(XYH,"Library");return{data:BX.default.join($,"Application Support",H),config:BX.default.join($,"Preferences",H),cache:BX.default.join($,"Caches",H),log:BX.default.join($,"Logs",H),temp:BX.default.join(Ig8,H)}},Zi9=(H)=>{let $=QxH.APPDATA\|\|BX.def |
| `APPDATA` | 16 | dentials",`${K}.json`)},tC8=async()=>{if(!O09())return null;let H=await import("path"),$=jM("ANTHROPIC_CONFIG_DIR");if($)return $;if(Rq$()["X-Stainless-OS"]==="Windows"){let A=jM("APPDATA");if(A)return H.join(A,"Anthropic");let z=jM("USERPROFILE");if(z)return H.join(z,"AppData","Roaming","Anthropic");return null}let K=jM("XDG_CONFIG_HOME");if(K)return H.join(K,"ant |
| `hasCompletedOnboarding` | 9 | jFH,hasTrustDialogAccepted:!0}}}})}function _t1(H){return RbK.includes(H)}function ff$(H){let $=De.config;if(!$)return!1;let q=$.oauthAccount!==void 0&&H.oauthAccount===void 0,K=$.hasCompletedOnboarding===!0&&H.hasCompletedOnboarding!==!0;return q\|\|K}function Y8(H){let $=null;try{if($Y6(WG(),cn,(K)=>{let _=H(K);if(_===K)return K;return $=wFH({..._,projects:ybK(K.projects)}),$})&& |
| `cachedGrowthBookFeatures` | 8 | has(H))return!0;if(!Oe())return!1;return(m$().cachedExperimentFeatures??[]).includes(H)}function Kf$(){return}function MbK(){if(gQ.size>0)return Object.fromEntries(gQ);return m$().cachedGrowthBookFeatures??{}}function jbK(){return Oe$}function Fs1(){return Kf$()??{}}function Qs1(H,$){return}function gs1(){return}function Me$(H){if(bz6.has(H))return;let $=MOH.get(H);if($)bz6.add(H), |
| `clientDataCache` | 8 | 6;if(G7H(H))return 1e6;let q=ta$(H);if(q!==null)return q;return n56}function ta$(H){if(T7H())return null;if(C2(H))return null;if(L7(H)!=="claude-sonnet-4-6")return null;let $=m$().clientDataCache?.kelp_forest_sonnet;if(typeof $!=="string")return null;let q=parseInt($,10);if(!Number.isFinite(q)\|\|q<=0)return null;return q}function ea$(H,$){if(!H)return{used:null,remaining:nu |
| `XDG_CONFIG_HOME` | 8 | ainless-OS"]==="Windows"){let A=jM("APPDATA");if(A)return H.join(A,"Anthropic");let z=jM("USERPROFILE");if(z)return H.join(z,"AppData","Roaming","Anthropic");return null}let K=jM("XDG_CONFIG_HOME");if(K)return H.join(K,"anthropic");let _=jM("HOME");if(_)return H.join(_,".config","anthropic");return null},O09=()=>{let H=Rq$()["X-Stainless-Runtime"];return H==="node"\|\|H==="d |
| `LOCALAPPDATA` | 6 | s",H),cache:BX.default.join($,"Caches",H),log:BX.default.join($,"Logs",H),temp:BX.default.join(Ig8,H)}},Zi9=(H)=>{let $=QxH.APPDATA\|\|BX.default.join(XYH,"AppData","Roaming"),q=QxH.LOCALAPPDATA\|\|BX.default.join(XYH,"AppData","Local");return{data:BX.default.join(q,H,"Data"),config:BX.default.join($,H,"Config"),cache:BX.default.join(q,H,"Cache"),log:BX.default.join(q,H,"Lo |
| `XDG_CACHE_HOME` | 2 | BX.default.join(QxH.XDG_DATA_HOME\|\|BX.default.join(XYH,".local","share"),H),config:BX.default.join(QxH.XDG_CONFIG_HOME\|\|BX.default.join(XYH,".config"),H),cache:BX.default.join(QxH.XDG_CACHE_HOME\|\|BX.default.join(XYH,".cache"),H),log:BX.default.join(QxH.XDG_STATE_HOME\|\|BX.default.join(XYH,".local","state"),H),temp:BX.default.join(Ig8,$,H)}};var jWq=T(()=>{BX=B(require("pat |

## Developer takeaways

- This bucket is useful when repeated runs behave differently because local state changed.
- Cache and config paths help with clean-room reproduction and debugging.
- Feature flag caches and onboarding flags can affect what code paths run.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
