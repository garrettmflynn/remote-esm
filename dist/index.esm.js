var ve=Object.defineProperty;var U=(t,e)=>{for(var s in e)ve(t,s,{get:e[s],enumerable:!0})};var g={};U(g,{absolute:()=>w,base:()=>X,extension:()=>m,get:()=>p,noBase:()=>x,pathId:()=>R,url:()=>B});var b="application/javascript",Q=t=>!t||t==="application/javascript",D={js:b,mjs:b,cjs:b,ts:"text/typescript",json:"application/json",html:"text/html",css:"text/css",txt:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",mp3:"audio/mpeg",mp4:"video/mp4",webm:"video/webm",ogg:"application/ogg",wav:"audio/wav"},k=t=>D[t];var M={nodeModules:{nodeModules:"node_modules",relativeTo:"./"}};var $="://",p=(t,e="",s=!1,o=!1)=>{if(B(t))return t;let i="",n=c=>(i=c.includes($)?c.split($).splice(0,1):void 0,i?c.replace(`${i}${$}`,""):c);t.includes($)&&(t=n(t)),e.includes($)&&(e=n(e)),s||(e=e.split("/").filter(c=>c!="..").join("/")),e[e.length-1]==="/"&&(e=e.slice(0,-1));let r=e.split("/");if(r.length===1&&r[0]===""&&(r=[]),!o){let c=r.pop();if(c){let f=c.split(".");(f.length==1||f.length>1&&f.includes(""))&&r.push(c)}}let d=t.split("/").filter((c,f)=>!!c).filter((c,f)=>c===".."?(r.pop(),!1):c!=="."),u=[...r,...d].join("/");return i?i+"://"+u:u};function w(t,e){let s=t[0]!==".",o=B(t);return s&&(e||!o)}function B(t){try{return new URL(t),!0}catch{return!1}}var m=t=>{let e=t.split("/").slice(-1)[0].split(".").slice(-1)[0];if(D[e])return e},X=t=>t.substring(0,t.lastIndexOf("/")),x=(t,e,s)=>{t=globalThis.location?t.replace(`${X(globalThis.location.href)}/`,"./"):t;let o=w(t,!0),i=e.relativeTo??M.nodeModules.relativeTo,n=e.nodeModules??M.nodeModules.nodeModules;if(o)return t;{let r=t;return s&&(r=r.replace(`${n}/`,"")),r=r.replace(`${i.split("/").slice(0,-1).join("/")}/`,""),r[0]!=="."&&(r=`./${r}`),r}},R=(t,e)=>p(x(t,e));var A={};U(A,{getMainPath:()=>te,path:()=>O,resolve:()=>Z,transformation:()=>E});var Se=(t,e)=>fetch(t).then(s=>s[e?.assert?.type==="text"]),j=Se;var O=t=>{let e=t.nodeModules??M.nodeModules.nodeModules,s=t.relativeTo??M.nodeModules.relativeTo;return p(e,s)},Z=async(t,e)=>{let s=O(e),o=t.split("/"),i=p(t,s);if(o.length>1){if(m(i))return i;i+="/package.json"}return await te(t,i,e).catch(n=>{console.warn(`${i} does not exist or is not at the root of the project.`)})},ee=(t,e,s)=>p(t,s,!1,e.split("/").length===1),$e=(t,e=t)=>ee("package.json",t,e),te=async(t,e=t,s={})=>{let o=await Be(t,e,s);if(!o)return e;let i=o.module||o.main||"index.js";return ee(i,t,e)},Be=async(t,e=t,s)=>{let o=$e(t,e),n=B(o)?o:new URL(o,window.location.href).href;return(await j(n,{assert:{type:"json"}})).default},E={name:"node_modules",handler:Z};var J={};U(J,{get:()=>F});var ie=["ts","js"],se=[null,...ie,E],oe=t=>{let e=m(t),s=w(t),o=s?t.split("/").length===1:!1,i=!e;if(!o&&s&&i){let n=ie.map(r=>({extension:r,name:`${E.name} + ${r}`,handler:E.handler}));return t.split("/").length===1?[E,t,...n]:[t,...n,E]}else return s?[...se].reverse():i?[...se]:[]};var Re="was not resolved locally. You can provide a direct reference to use in",_=(t,e=t)=>new Error(`${t} ${Re} options.filesystem._fallbacks['${e}'].`);var re=(t,e="js")=>{let s=w(t),o=t.split("/"),i=m(t);return(!s||s&&o.length>1)&&!i?`${t}.${e}`:t},ae=async(t,e,s,o)=>{if(!e)return t;let i=typeof e;if(i==="string"&&(!o||o==="string"))return re(t,e);if(i==="object"&&(!o||o==="object"))return e.extension&&(t=re(t,e.extension)),await e.handler(t,s).catch(n=>{throw _(t,x(t,s))})};var _e=t=>{let e;try{e=new URL(t).href}catch{e=p(t,globalThis.location.href)}return e},le=async(t,e={})=>{e.fetch||(e.fetch={}),e.fetch.mode||(e.fetch.mode="cors");let s=_e(t),o=e?.callbacks?.progress?.fetch,i=await Ie(s,e,{path:t,progress:o});if(!i.buffer)throw new Error("No response received.");let n=i.type.split(";")[0];return{...i,url:s,type:n}},Ie=async(t,e={},s)=>{let o=s.path??t,i=p(x(o,e)),n=await globalThis.fetch(t,e.fetch),r=0,a=[],l=0,d=typeof s.progress=="function",u=await new Promise(async f=>{if(n){l=parseInt(n.headers.get("Content-Length"),10);let h=n.headers.get("Content-Type");if(globalThis.REMOTEESM_NODE){let v=await n.arrayBuffer();f({buffer:v,type:h})}else{let v=n.body.getReader(),y=async({done:N,value:S})=>{if(N){let H={};typeof h=="string"&&(H.type=h);let je=await new Blob(a,H).arrayBuffer();f({buffer:new Uint8Array(je),type:h});return}r+=S.length;let Me=S;return a.push(Me),d&&s.progress(i,r,l,null,null,n.headers.get("Range")),v.read().then(y)};v.read().then(y)}}else console.warn("Response not received!",e.headers),f(void 0)}),c={response:n,...u};if(d){let f=[null,null];n.ok?f[0]=c:f[1]=c,s.progress(i,r,l,...f,n.headers.get("Range"))}return c};var ce=new TextDecoder("utf-8"),I=async(t,e,s)=>{let o={uri:t,text:{original:"",updated:""},buffer:null};if(globalThis.REMOTEESM_NODE){let i=t.replace("file://","");o.buffer=globalThis.fs.readFileSync(i),o.text.original=o.text.updated=ce.decode(o.buffer)}else{let i=await le(t,e),n=i.response;if(o.response=n,n.ok){if(s){let r=n.headers.get("Content-Type");if(!r.includes(s))throw new Error(`Expected Content Type ${s} but received ${r} for  ${t}`)}o.buffer=i.buffer,o.text.original=o.text.updated=ce.decode(o.buffer)}else throw new Error(n.statusText)}return o},de=async(t,e,s)=>{let o=oe(t),i;if(o.length>0){do{let n=o.shift(),r=n?.name??n,a=c=>{e.debug&&console.error(`Import using ${r??n} transformation failed for ${t}`)},l=await ae(t,n,e),d=p(l,e.relativeTo);i=await s(d,e,n?null:"application/javascript").then(c=>(e.debug&&console.warn(`Import using ${r??n} transformation succeeded for ${t}`),c)).catch(a)}while(!i&&o.length>0);if(!i)throw new Error(`No valid transformation found for ${t}`)}else i=await s(p(t,e.relativeTo),e);return i},fe=async(t,e)=>{let o=m(t)==="json",i={};return await de(t,e,async n=>{i.uri=n,i.result=await(o?j(n,{assert:{type:"json"}}):import(n))}),i},pe=async(t,e)=>await de(t,e,I);var Pe=/\/\/# sourceMappingURL=(.*\.map)/,F=async(t,e,s,o=!0)=>{if(s||(s=(await I(t,e)).text.original),s){let i=s.match(Pe);if(i){let n=async()=>{let r=p(i[1],t),l=(await I(r,e)).text.original;l.slice(0,3)===")]}"&&(console.warn("Removing source map invalidation characters"),l=l.substring(l.indexOf(`
`)));let d={result:JSON.parse(l)};return d.text={original:l,updated:null},d};return o?n():n}}};var V={};U(V,{script:()=>K});var K=async(t,e=[])=>await new Promise((s,o)=>{let i=document.createElement("script"),n=!1;i.onload=i.onreadystatechange=function(){if(!n&&(!this.readyState||this.readyState=="complete")){n=!0;let r=e.find(a=>window[a]);s(r?window[r]:window)}},i.onerror=o,i.src=t,document.body.insertAdjacentElement("beforeend",i)});var Ue={};U(Ue,{default:()=>T,get:()=>L});var Y={};U(Y,{datauri:()=>Ce,objecturl:()=>Ae});function Le(t){let e="",s=new Uint8Array(t),o=s.byteLength;for(let i=0;i<o;i++)e+=String.fromCharCode(s[i]);return window.btoa(e)}var he=(t,e=b,s=!1)=>{let i=(typeof t=="string"?"text":"buffer")==="buffer"?Le(t):btoa(s?unescape(encodeURIComponent(t)):t);return`data:${e};base64,`+i};function me(t,e=b){typeof t=="string"&&(t=new TextEncoder().encode(t));let s=new Blob([t],{type:e});return URL.createObjectURL(s)}var Ce=async(...t)=>await W(he,...t),Ae=async(...t)=>await W(me,...t),Fe=async(t,e)=>await(e?j(t,{assert:{type:"json"}}):import(t)).catch(s=>{throw s}),ge=t=>{let e=new Set,s=t.split("/node_modules/")[1].split("/")[0];s&&e.add(s);let o=t.split("/").slice(-1)[0].split(".")[0];return o&&e.add(o),Array.from(e)};async function W(t,e,s,o,i){let n,r;if(!o){let l=m(s);o=k(l)}let a=o==="application/json";try{n=t(e,o),r=await Fe(n,a);let l=Object.keys(r);if(l.length===0||l.length===1&&l.includes("__esmpileSourceBundle")){i||(i=ge(s));let d=i.find(u=>globalThis[u]);d?(r={default:globalThis[d]},n=W(t,`export default globalThis['${d}']`,s,o,i)):console.warn(`Could not get global reference for ${s} after failing to import using ESM import syntax.`)}}catch(l){n=t(e,o,!0),Q(o)?(i||(i=ge(s)),r=n=await Je(n,l,i).catch(d=>{throw d})):r=n}return{encoded:n,module:r}}async function Je(t,e,s){if(e===!0||e.message.includes("The string to be encoded contains characters outside of the Latin1 range.")||e.message.includes("Cannot set properties of undefined"))return await K(t,s);throw e}var Ke={compilerOptions:{target:"ES2015",module:"ES2020",strict:!1,esModuleInterop:!0}},be=(t,e="text")=>{if(window.ts){let s=e!=="buffer"?t[e].updated:new TextDecoder().decode(t[e]);return t.text.updated=window.ts.transpile(s,Ke.compilerOptions),e==="buffer"?(t.buffer=new TextEncoder().encode(t.text.updated),t.buffer):t.text.updated}else throw new Error("Must load TypeScript extension to compile TypeScript files using remoteESM.load.script(...);")};var G,we,ye,We=new Promise(async(t,e)=>{try{if(typeof process=="object"){if(G||(globalThis.REMOTEESM_NODE=!0,G=globalThis.fetch=(await import("node-fetch/src/index.js")).default,typeof globalThis.fetch!="function"&&(globalThis.fetch=G)),we||(we=globalThis.fs=(await import("fs")).default),!ye){let s=(await import("node:buffer")).default;ye=globalThis.Blob=s.Blob}t(!0)}else t(!0)}catch(s){e(s)}}),q=We;var xe="__esmpileSourceBundle";globalThis.REMOTEESM_BUNDLES||(globalThis.REMOTEESM_BUNDLES={global:{}});var P=globalThis.REMOTEESM_BUNDLES.global,z="No buffer or text to bundle for",Te=1e4,Ge=(Te/1e3).toFixed(1),qe=t=>`
export const ${xe} = () => globalThis.REMOTEESM_BUNDLES["${t.collection}"]["${t.name}"];
`,ze=/([^\n]*)(import)\s+([ \t]*(?:(?:\* (?:as .+))|(?:[^ \t\{\}]+[ \t]*,?)|(?:[ \t]*\{(?:[ \t]*[^ \t"'\{\}]+[ \t]*,?)+\}))[ \t]*)from[ \t]*(['"])([^'"\n]+)(?:['"])([ \t]*assert[ \t]*{[ \n\t]*type:[ \n\t]*(['"])([^'"\n]+)(?:['"])[\n\t]*})?;?/gm;function L(t,e=this.options){let s=t?R(t,e):void 0,o=globalThis.REMOTEESM_BUNDLES[e.collection];o||(o=globalThis.REMOTEESM_BUNDLES[e.collection]={});let i=o[s];return i?e&&(i.options=e):i=new T(t,e),i}var Ee={resolve:void 0,reject:void 0,promise:void 0},T=class{filename="bundle.esmpile.js";promises={encoded:Object.assign({},Ee),result:Object.assign({},Ee)};uri;#t;get url(){return this.#t}set url(e){let s=this.options._esmpile;s.entrypoint||(s.entrypoint=this),this.uri||(this.uri=e),!w(e,!0)&&!e.includes(this.#e.relativeTo)&&(e=p(e,this.#e.relativeTo)),this.#t=e;let i=R(this.url,this.options);this.name!==i&&(this.name=i),this.updateCollection(this.options.collection)}status=null;#e;get options(){return this.#e}set options(e={}){e._esmpile||(e._esmpile=this.#e?._esmpile??{circular:new Set}),e.collection||(e.collection=this.#e?.collection),this.#e=e,e.output||(e.output={}),this.bundler=e.bundler,this.updateCollection(this.options.collection),typeof e?.callbacks?.progress?.file=="function"&&(this.callbacks.file=e.callbacks.progress.file),e.fetch||(e.fetch={}),e.fetch=Object.assign({},e.fetch),e.fetch.signal=this.controller.signal}controller=new AbortController;#s;get bundler(){return this.#s}set bundler(e){this.setBundleInfo(e),this.setBundler(e,!1)}setBundleInfo=e=>{this.#e._esmpile.lastBundler=this.#s,this.#s=this.#e.bundler=e;let s=this.#e.output;e&&(s[e]=!0,s.text=!0),this.derived.compile=!this.#e.forceNativeImport&&(s.text||s.datauri||s.objecturl)};setBundler=async(e,s=!0)=>{s&&this.setBundleInfo(e);let o=this.#e._esmpile,i=o.lastBundle,n=o.lastBundle===e;if(!n||o.lastBundle&&n&&!i){let r=o.entrypoint;if(e){let l=Array.from(this.dependencies.entries());l.length&&await Promise.all(l.map(async([d,u])=>{u.bundler=e,await u.result}))}["success","failed"].includes(r?.status)&&(e?i?this.encoded=await this.bundle(i):this.result=await this.resolve():this.result=await this.resolve())}};#i;get name(){return this.#i}set name(e){if(e!==this.#i){let s=globalThis.REMOTEESM_BUNDLES[this.collection];s&&(P[this.name]===s[this.name]&&delete P[this.name],delete s[this.name]),this.#i=e;let i=e.split("/").pop().split(".");this.filename=[...i.slice(0,-1),"esmpile","js"].join("."),P[this.name]?this.options.collection!="global"&&console.warn(`Duplicating global bundle (${this.name})`,this.name):P[this.name]=this}}#n;get collection(){return this.#n}set collection(e){this.#n=e;let s=globalThis.REMOTEESM_BUNDLES[e];s||(s=globalThis.REMOTEESM_BUNDLES[e]={}),this.name&&(s[this.name]?s[this.name]!==this&&console.warn(`Trying to duplicate bundle in bundle ${e} (${this.name})`,this.name):s[this.name]=this)}#r;#o;get text(){return this.#r??this.info.text.original}set text(e){this.#r=e,this.encoded=this.bundle("text").catch(s=>{if(!s.message.includes(z))throw s})}set buffer(e){this.#o=e,this.encoded=this.bundle("buffer").catch(s=>{if(!s.message.includes(z))throw s})}dependencies=new Map;dependents=new Map;get entries(){let e=[],s=o=>{o.dependencies.forEach(i=>{!e.includes(i)&&i!==this&&(e.push(i),s(i))})};return s(this),e}encodings={};info={};imports=[];link=void 0;result=void 0;callbacks={file:void 0};derived={compile:!1,dependencies:{n:0,resolved:0}};constructor(e,s={}){this.options=s,this.url=e}import=async()=>{this.status="importing";let e=await fe(this.url,this.options);if(e?.result)return e.result;this.status="fallback"};get=L;compile=async()=>{this.status="compiling",await q;try{let e=await pe(this.url,this.options).catch(s=>{throw s});try{e&&(this.info=e,this.url=this.info.uri,this.buffer=this.info.buffer,await this.encoded)}catch{this.imports={};let o=[];Array.from(this.info.text.updated.matchAll(ze)).forEach(([r,a,l,d,u,c])=>{if(!a.includes("//")&&c){let f=!!d.match(/\*\s+as/),h=d.replace(/\*\s+as/,"").trim(),y=w(c)?c:p(c,this.url),N=O(this.options);y=y.replace(`${N}/`,"");let S={name:y,path:c,prefix:l,variables:h,wildcard:f,current:{line:r,path:c},original:r,counter:0,bundle:null};this.imports[y]||(this.imports[y]=[]),this.imports[y].push(S),o.push(S)}}),this.derived.dependencies.resolved=0,this.derived.dependencies.n=this.imports.length;let n=o.map(async(r,a)=>{await this.setImport(r,a),this.derived.dependencies.resolved++});await Promise.all(n),this.text=this.info.text.updated}}catch(e){throw e}return await this.encoded,this.result};updateImport=(e,s)=>{if(s===e.current.path)return;let{prefix:o,variables:i,wildcard:n,bundle:r}=e,a="";if(typeof s=="string")a=`${o} ${n?"* as ":""}${i} from "${s}"; // Imported from ${r.name}

`;else{let d=i.replace("{","").replace("}","")===i,u=i.replace("{","").replace("}","").split(",").map(f=>f.trim()),c=f=>{let h="";n||(d?h=".default":h=`.${f}`),a+=`${o==="import"?"":"export "}const ${f} = (await globalThis.REMOTEESM_BUNDLES["${r.collection}"]["${r.name}"].result)${h};

`};u.forEach(c)}this.info.text.updated=this.info.text.updated.replace(e.current.line,a),e.current.line=a,e.current.path=s};setImport=async e=>{let s=e.path,o=e.name,i=this.get(o);if(e.bundle=i,this.addDependency(i),i.status){let r=!1;setTimeout(()=>{r||(console.error(`Took too long (${Ge}s)...`,i.uri),i.promises.result.reject(),i.promises.encoded.reject())},Te),await i.result,r=!0}else{let r={output:{},...this.options};r.output.text=!0,await(await this.get(o,r)).resolve(s)}let n=await i.encoded;return this.updateImport(e,n),i};notify=(e,s)=>{let o=e!==void 0,i=s!==void 0;this.callbacks.file&&this.callbacks.file(this.name,this.derived.dependencies.resolved,this.derived.dependencies.n,o?this:void 0,i?s:void 0)};get buffer(){return this.#o}bundle=(e="buffer")=>{let s=e==="text";return this.options._esmpile.lastBundle=e,this.promises.encoded.promise=new Promise(async(o,i)=>{this.promises.encoded.resolve=o,this.promises.encoded.reject=i;try{let n=s?this.info.text.updated:this.buffer;n||(this.info.fallback?this.encoded=this.info.fallback:i(new Error(`${z} ${this.name}`)));let r=m(this.url),a=k(r);switch(a){case"text/typescript":n=be(this.info,e),a=b;break}if(a===b){let c=qe(this),f=n;s||(f=new TextDecoder().decode(n)),!f.includes(c)&&(f+=c,this.info.text.updated=f),s||(this.#o=n=new TextEncoder().encode(f))}let l=[],d=this.options.output;d?.datauri&&l.push("datauri"),d?.objecturl&&l.push("objecturl");for(let c in l){let f=l[c],h=await Y[f](n,this.url,a);h&&(this.result=h.module,this.encodings[f]=await h.encoded)}let u=this.bundler==="objecturl"?this.encodings.objecturl:this.encodings.datauri;o(u)}catch(n){i(n)}}),this.promises.encoded.promise};delete=()=>{this.objecturl&&window.URL.revokeObjectURL(this.objecturl)};addDependency=e=>{let s=!1;this.dependents.has(e.url)&&(s=!0),this.dependencies.set(e.url,e),e.dependencies.has(this.url)&&(s=!0),e.dependents.set(this.url,this),s&&(this.circular(e),e.circular(this))};removeDependency=e=>{this.dependencies.delete(e.name),e.dependents.delete(this.name)};updateDependency=async(e,s)=>{this.imports[e.url].forEach(i=>this.updateImport(i,s))};updateCollection=e=>{e?this.collection=e:this.collection=this.options.collection=Object.keys(globalThis.REMOTEESM_BUNDLES).length};download=async(e=this.filename)=>{this.bundler!="datauri"&&await this.setBundler("datauri");let s=this.encodings.datauri.split(",")[0].split(":")[1].split(";")[0],o=atob(this.encodings.datauri.split(",")[1]),i=[];for(var n=0;n<o.length;n++)i.push(o.charCodeAt(n));let r=new Uint8Array(i),a=new Blob([r],{type:s}),l=URL.createObjectURL(a);if(globalThis.REMOTEESM_NODE)await q,globalThis.fs.writeFileSync(e,r),console.log(`Wrote bundle contents to ${e}`);else{var d=document.createElement("a");document.body.appendChild(d),d.style="display: none",d.href=l,d.download=e,d.click()}};circular=async e=>{this.options._esmpile.circular.add(this.url);let s=await this.resolve().catch(o=>{console.warn(`Circular dependency detected: Fallback to direct import for ${this.url} failed...`,o);let i=`Circular dependency cannot be resolved: ${this.uri} <-> ${e.uri}.`;throw new Error(i)});console.warn(`Circular dependency detected: Fallback to direct import for ${this.url} was successful!`,s)};resolve=async(e=this.uri)=>(this.status="resolving",this.result=void 0,this.encoded=void 0,this.result=this.promises.result.promise=new Promise(async(s,o)=>{this.promises.result.reject=o,this.promises.result.resolve=s;let i,n=this.options._esmpile.circular.has(this.url),r=n||!this.derived.compile;try{i=r?await this.import().catch(async a=>{if(this.#e.fallback===!1)throw a;await this.setBundler("objecturl")}):void 0;try{if(!i){if(n)throw new Error(`Failed to import ${this.url} natively.`);i=await this.compile()}}catch(a){if(a){if(this.options.fetch?.signal?.aborted)throw a;{let l=w(e)?x(e,this.options,!0):x(this.url,this.options,!0);console.warn(`Failed to fetch ${e}. Checking filesystem references...`);let d=this.options.filesystem?._fallbacks?.[l];if(d)throw console.warn(`Got fallback reference (module only) for ${e}.`),i=d,new Error("Fallbacks are broken...");{let u="was not resolved locally. You can provide a direct reference to use in";throw a.message.includes(u)?a:_(e,l)}}}}await this.encoded,this.status="success",this.notify(this),s(i)}catch(a){this.status="failed",this.notify(null,a),o(a)}}),this.result);sources=async()=>await F(this.#t,this.#e,this.info.text.original)};var ut=p,ht=g,mt=T,He=async(t,e={})=>{e=Object.assign({},e);let s=L(t,e);return await s.resolve(),s.result},gt=He;export{mt as Bundle,Ue as bundle,He as compile,gt as default,V as load,A as nodeModules,ht as path,ut as resolve,J as sourceMap};
//# sourceMappingURL=index.esm.js.map
