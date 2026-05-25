# Feature flags and experiments

Claude binary version: `2.1.150`
Source package: `@anthropic-ai/claude-code-linux-x64@2.1.150`
Extracted JavaScript: `artifacts/claude-code-2.1.150.js`
Prompt JSON: `artifacts/prompts-generated-2.1.150.json`

## Developer use

Use this bucket to identify remotely or locally gated behavior, cached feature values, rollout keys, and experiment instrumentation.

## Extracted marker hits

| Marker | Hits | Representative extracted context |
| --- | ---: | --- |
| `tengu_` | 1803 | _id=f;let O=Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS??"",10);if(Number.isFinite(O)&&jzq!==void 0)_.spawn_to_first_checkpoint_ms=Math.round(jzq-O);Object.assign(_,Zzq),c("tengu_startup_perf",_)}var Ex8,gR$,bK$,$v9=0.005,hx8,Sx8,Wzq,qv9,Kv9,jzq,Zzq,wzq,Jzq=!1,Xzq=!1,Lzq;var XC=T(()=>{w$();y$();dH();r$();lq();QR$();s$();Ex8=B(require("os")),gR$=require("pat |
| `GrowthBook` | 29 | ");if(!H.clientKey)throw Error("Missing clientKey");let $=!1;try{$=!!new URL(H.apiHost\|\|"").hostname.match(/growthbook\.io$/i)}catch(q){}if($)throw Error("Cannot use remoteEval on GrowthBook Cloud")}else if(H.cacheKeyAttributes)throw Error("cacheKeyAttributes are only used for remoteEval");if(H.stickyBucketService){let $=H.stickyBucketService;this._saveStickyBucketAss |
| `cachedGrowthBookFeatures` | 8 | has(H))return!0;if(!Oe())return!1;return(m$().cachedExperimentFeatures??[]).includes(H)}function Kf$(){return}function MbK(){if(gQ.size>0)return Object.fromEntries(gQ);return m$().cachedGrowthBookFeatures??{}}function jbK(){return Oe$}function Fs1(){return Kf$()??{}}function Qs1(H,$){return}function gs1(){return}function Me$(H){if(bz6.has(H))return;let $=MOH.get(H);if($)bz6.add(H), |
| `feature_name` | 6 | .toLowerCase()}),cu$=Pi9});function fWq(H){return`tool_${cu$(H)}`}function OWq(H){return`cmd_${cu$(H)}`}function I2H(H){return`hook_${cu$(H)}`}function xH(H){c("tengu_feature_ok",{feature_name:H})}function mH(H,$,q){c("tengu_feature_bad",{feature_name:H,error_code:$,...q})}function $8(H,$,q){c("tengu_feature_sad",{feature_name:H,error_code:$,...q})}async function Vg8(H) |
| `getFeatureValue` | 5 | ach((_)=>{try{_(H,$)}catch(A){console.error(A)}})}_recordChangedId(H){this._completedChangeIds.add(H)}isOn(H){return this.evalFeature(H).on}isOff(H){return this.evalFeature(H).off}getFeatureValue(H,$){let q=this.evalFeature(H).value;return q===null?$:q}feature(H){return this.evalFeature(H)}evalFeature(H){return rx$(H,this._getEvalContext())}log(H,$){if(!this.debug)return;i |
| `DISABLE_GROWTHBOOK` | 4 | achedGrowthBookFeatures,H)&&DM(q.cachedExperimentFeatures??[],$))return;Y8((K)=>({...K,cachedGrowthBookFeatures:H,cachedExperimentFeatures:$}))}function Oe(){return!uH(process.env.DISABLE_GROWTHBOOK)&&Xb()}function JbK(){let H=process.env.ANTHROPIC_BASE_URL;if(!H)return;try{let $=new URL(H).host;if($==="api.anthropic.com")return;return $}catch{return}}function Bz6(){let H=ETK |
| `cachedExperimentFeatures` | 3 | urn()=>{$=!1,q()}}function qf$(){if(!xz6)xz6=!0;return ObK}function ps1(H){let $=qf$();return $!==null&&H in $}function Us1(H){if(MOH.has(H))return!0;if(!Oe())return!1;return(m$().cachedExperimentFeatures??[]).includes(H)}function Kf$(){return}function MbK(){if(gQ.size>0)return Object.fromEntries(gQ);return m$().cachedGrowthBookFeatures??{}}function jbK(){return Oe$}function Fs1(){ |
| `tengu_heron_brook` | 2 | , determine if you can adjust your actions in response to the blocked message. If not, ask the user to check their hooks configuration."}function nAA(){let H=m$().clientDataCache?.tengu_heron_brook;if(typeof H==="string"&&H.trim()!=="")return H.trim();let $=v$("tengu_heron_brook","");if($.trim()!=="")return $.trim();return null}function iAA(H){if(!H)return null;return`# Lang |
| `isFeatureFromExperiment` | 1 | BookConfigOverride:()=>Qs1,resetGrowthBook:()=>zFH,refreshGrowthBookFeatures:()=>LbK,refreshGrowthBookAfterAuthChange:()=>HTH,onGrowthBookRefresh:()=>dQ,isGrowthBookEnabled:()=>Oe,isFeatureFromExperiment:()=>Us1,initializeGrowthBook:()=>ZG,hasGrowthBookEnvOverride:()=>ps1,getUserAttributes:()=>Bz6,getNonDefaultFeatureKeys:()=>jbK,getGrowthBookConfigOverrides:()=>Fs1,getFeatureValu |
| `refreshGrowthBookFeatures` | 1 | quire("crypto");FQ=[]});var WbK={};P$(WbK,{stopPeriodicGrowthBookRefresh:()=>Uz6,setupPeriodicGrowthBookRefresh:()=>PbK,setGrowthBookConfigOverride:()=>Qs1,resetGrowthBook:()=>zFH,refreshGrowthBookFeatures:()=>LbK,refreshGrowthBookAfterAuthChange:()=>HTH,onGrowthBookRefresh:()=>dQ,isGrowthBookEnabled:()=>Oe,isFeatureFromExperiment:()=>Us1,initializeGrowthBook:()=>ZG,hasGrowthBookEnv |

## Developer takeaways

- Feature flags explain why shipped code may not always be active behavior.
- Feature keys are usually better investigation anchors than minified local function names.
- This bucket is useful for product engineers studying rollout and experimentation systems.

## Caveat

These findings show strings and code paths shipped in the extracted JavaScript. They do not prove that every path is active in every runtime configuration.
