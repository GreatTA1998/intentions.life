function te(){}function za(e,t){for(const n in t)e[n]=t[n];return e}function Fi(e){return e()}function Ui(){return Object.create(null)}function ee(e){e.forEach(Fi)}function Wa(e){return typeof e=="function"}function Qa(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Xa(e){return Object.keys(e).length===0}function wd(e,t,n,s){if(e){const i=$i(e,t,n,s);return e[0](i)}}function $i(e,t,n,s){return e[1]&&s?za(n.ctx.slice(),e[1](s(t))):n.ctx}function Ed(e,t,n,s){if(e[2]&&s){const i=e[2](s(n));if(t.dirty===void 0)return i;if(typeof i=="object"){const r=[],o=Math.max(t.dirty.length,i.length);for(let a=0;a<o;a+=1)r[a]=t.dirty[a]|i[a];return r}return t.dirty|i}return t.dirty}function Td(e,t,n,s,i,r){if(i){const o=$i(t,n,s,r);e.p(o,i)}}function Id(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let s=0;s<n;s++)t[s]=-1;return t}return-1}let Ue=!1;function Ya(){Ue=!0}function Ja(){Ue=!1}function Za(e,t,n,s){for(;e<t;){const i=e+(t-e>>1);n(i)<=s?e=i+1:t=i}return e}function tc(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const c=[];for(let u=0;u<t.length;u++){const h=t[u];h.claim_order!==void 0&&c.push(h)}t=c}const n=new Int32Array(t.length+1),s=new Int32Array(t.length);n[0]=-1;let i=0;for(let c=0;c<t.length;c++){const u=t[c].claim_order,h=(i>0&&t[n[i]].claim_order<=u?i+1:Za(1,i,d=>t[n[d]].claim_order,u))-1;s[c]=n[h]+1;const l=h+1;n[l]=c,i=Math.max(l,i)}const r=[],o=[];let a=t.length-1;for(let c=n[i]+1;c!=0;c=s[c-1]){for(r.push(t[c-1]);a>=c;a--)o.push(t[a]);a--}for(;a>=0;a--)o.push(t[a]);r.reverse(),o.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<o.length;c++){for(;u<r.length&&o[c].claim_order>=r[u].claim_order;)u++;const h=u<r.length?r[u]:null;e.insertBefore(o[c],h)}}function ec(e,t){if(Ue){for(tc(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function Sd(e,t,n){Ue&&!n?ec(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function nc(e){e.parentNode.removeChild(e)}function Ad(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function sc(e){return document.createElement(e)}function zn(e){return document.createTextNode(e)}function Cd(){return zn(" ")}function bd(){return zn("")}function _d(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function Nd(e){return function(t){t.target===this&&e.call(this,t)}}function kd(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ic(e){return Array.from(e.childNodes)}function rc(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function qi(e,t,n,s,i=!1){rc(e);const r=(()=>{for(let o=e.claim_info.last_index;o<e.length;o++){const a=e[o];if(t(a)){const c=n(a);return c===void 0?e.splice(o,1):e[o]=c,i||(e.claim_info.last_index=o),a}}for(let o=e.claim_info.last_index-1;o>=0;o--){const a=e[o];if(t(a)){const c=n(a);return c===void 0?e.splice(o,1):e[o]=c,i?c===void 0&&e.claim_info.last_index--:e.claim_info.last_index=o,a}}return s()})();return r.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,r}function oc(e,t,n,s){return qi(e,i=>i.nodeName===t,i=>{const r=[];for(let o=0;o<i.attributes.length;o++){const a=i.attributes[o];n[a.name]||r.push(a.name)}r.forEach(o=>i.removeAttribute(o))},()=>s(t))}function Dd(e,t,n){return oc(e,t,n,sc)}function ac(e,t){return qi(e,n=>n.nodeType===3,n=>{const s=""+t;if(n.data.startsWith(s)){if(n.data.length!==s.length)return n.splitText(s.length)}else n.data=s},()=>zn(t),!0)}function Rd(e){return ac(e," ")}function Ld(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function xd(e,t){e.value=t==null?"":t}function Od(e,t,n,s){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,s?"important":"")}function Md(e,t,n){e.classList[n?"add":"remove"](t)}function cc(e,t,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(e,n,!1,t),s}let ne;function se(e){ne=e}function $e(){if(!ne)throw new Error("Function called outside component initialization");return ne}function Pd(e){$e().$$.on_mount.push(e)}function Vd(e){$e().$$.after_update.push(e)}function Fd(){const e=$e();return(t,n)=>{const s=e.$$.callbacks[t];if(s){const i=cc(t,n);s.slice().forEach(r=>{r.call(e,i)})}}}function Ud(e,t){$e().$$.context.set(e,t)}function $d(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(s=>s.call(this,t))}const ie=[],ji=[],qe=[],Bi=[],Hi=Promise.resolve();let Wn=!1;function Ki(){Wn||(Wn=!0,Hi.then(Gi))}function qd(){return Ki(),Hi}function Qn(e){qe.push(e)}const Xn=new Set;let je=0;function Gi(){const e=ne;do{for(;je<ie.length;){const t=ie[je];je++,se(t),uc(t.$$)}for(se(null),ie.length=0,je=0;ji.length;)ji.pop()();for(let t=0;t<qe.length;t+=1){const n=qe[t];Xn.has(n)||(Xn.add(n),n())}qe.length=0}while(ie.length);for(;Bi.length;)Bi.pop()();Wn=!1,Xn.clear(),se(e)}function uc(e){if(e.fragment!==null){e.update(),ee(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Qn)}}const Be=new Set;let mt;function jd(){mt={r:0,c:[],p:mt}}function Bd(){mt.r||ee(mt.c),mt=mt.p}function hc(e,t){e&&e.i&&(Be.delete(e),e.i(t))}function Hd(e,t,n,s){if(e&&e.o){if(Be.has(e))return;Be.add(e),mt.c.push(()=>{Be.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}}function Kd(e,t){const n={},s={},i={$$scope:1};let r=e.length;for(;r--;){const o=e[r],a=t[r];if(a){for(const c in o)c in a||(s[c]=1);for(const c in a)i[c]||(n[c]=a[c],i[c]=1);e[r]=a}else for(const c in o)i[c]=1}for(const o in s)o in n||(n[o]=void 0);return n}function Gd(e){return typeof e=="object"&&e!==null?e:{}}function zd(e){e&&e.c()}function Wd(e,t){e&&e.l(t)}function lc(e,t,n,s){const{fragment:i,on_mount:r,on_destroy:o,after_update:a}=e.$$;i&&i.m(t,n),s||Qn(()=>{const c=r.map(Fi).filter(Wa);o?o.push(...c):ee(c),e.$$.on_mount=[]}),a.forEach(Qn)}function fc(e,t){const n=e.$$;n.fragment!==null&&(ee(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function dc(e,t){e.$$.dirty[0]===-1&&(ie.push(e),Ki(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Qd(e,t,n,s,i,r,o,a=[-1]){const c=ne;se(e);const u=e.$$={fragment:null,ctx:null,props:r,update:te,not_equal:i,bound:Ui(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:Ui(),dirty:a,skip_bound:!1,root:t.target||c.$$.root};o&&o(u.root);let h=!1;if(u.ctx=n?n(e,t.props||{},(l,d,...m)=>{const v=m.length?m[0]:d;return u.ctx&&i(u.ctx[l],u.ctx[l]=v)&&(!u.skip_bound&&u.bound[l]&&u.bound[l](v),h&&dc(e,l)),d}):[],u.update(),h=!0,ee(u.before_update),u.fragment=s?s(u.ctx):!1,t.target){if(t.hydrate){Ya();const l=ic(t.target);u.fragment&&u.fragment.l(l),l.forEach(nc)}else u.fragment&&u.fragment.c();t.intro&&hc(e.$$.fragment),lc(e,t.target,t.anchor,t.customElement),Ja(),Gi()}se(c)}class Xd{$destroy(){fc(this,1),this.$destroy=te}$on(t,n){const s=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(t){this.$$set&&!Xa(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Rt=[];function Yd(e,t=te){let n;const s=new Set;function i(a){if(Qa(e,a)&&(e=a,n)){const c=!Rt.length;for(const u of s)u[1](),Rt.push(u,e);if(c){for(let u=0;u<Rt.length;u+=2)Rt[u][0](Rt[u+1]);Rt.length=0}}}function r(a){i(a(e))}function o(a,c=te){const u=[a,c];return s.add(u),s.size===1&&(n=t(i)||te),a(e),()=>{s.delete(u),s.size===0&&(n(),n=null)}}return{set:i,update:r,subscribe:o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,s))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gc(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function mc(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function yc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vc(){return He().indexOf("Electron/")>=0}function wc(){const e=He();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function Ec(){return He().indexOf("MSAppHost/")>=0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc="FirebaseError";class Ke extends Error{constructor(t,n,s){super(n);this.code=t,this.customData=s,this.name=Tc,Object.setPrototypeOf(this,Ke.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,zi.prototype.create)}}class zi{constructor(t,n,s){this.service=t,this.serviceName=n,this.errors=s}create(t,...n){const s=n[0]||{},i=`${this.service}/${t}`,r=this.errors[t],o=r?Ic(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Ke(i,a,s)}}function Ic(e,t){return e.replace(Sc,(n,s)=>{const i=t[s];return i!=null?String(i):`<${s}?>`})}const Sc=/\{\$([^}]+)}/g;function Yn(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const i of n){if(!s.includes(i))return!1;const r=e[i],o=t[i];if(Wi(r)&&Wi(o)){if(!Yn(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Wi(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(e){return e&&e._delegate?e._delegate:e}class Ge{constructor(t,n,s){this.name=t,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const s=new pc;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const s=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(bc(t))try{this.getOrInitializeService({instanceIdentifier:vt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(t=vt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=vt){return this.instances.has(t)}getOptions(t=vt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(t,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(t),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&t(o,i),()=>{r.delete(t)}}invokeOnInitCallbacks(t,n){const s=this.onInitCallbacks.get(n);if(!!s)for(const i of s)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let s=this.instances.get(t);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Cc(t),options:n}),this.instances.set(t,s),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(s,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,s)}catch{}return s||null}normalizeInstanceIdentifier(t=vt){return this.component?this.component.multipleInstances?t:vt:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Cc(e){return e===vt?void 0:e}function bc(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Ac(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var b;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(b||(b={}));const Nc={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},kc=b.INFO,Dc={[b.DEBUG]:"log",[b.VERBOSE]:"log",[b.INFO]:"info",[b.WARN]:"warn",[b.ERROR]:"error"},Rc=(e,t,...n)=>{if(t<e.logLevel)return;const s=new Date().toISOString(),i=Dc[t];if(i)console[i](`[${s}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Qi{constructor(t){this.name=t,this._logLevel=kc,this._logHandler=Rc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in b))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Nc[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...t),this._logHandler(this,b.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...t),this._logHandler(this,b.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,b.INFO,...t),this._logHandler(this,b.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,b.WARN,...t),this._logHandler(this,b.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...t),this._logHandler(this,b.ERROR,...t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(xc(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function xc(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Jn="@firebase/app",Xi="0.7.15";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=new Qi("@firebase/app"),Oc="@firebase/app-compat",Mc="@firebase/analytics-compat",Pc="@firebase/analytics",Vc="@firebase/app-check-compat",Fc="@firebase/app-check",Uc="@firebase/auth",$c="@firebase/auth-compat",qc="@firebase/database",jc="@firebase/database-compat",Bc="@firebase/functions",Hc="@firebase/functions-compat",Kc="@firebase/installations",Gc="@firebase/installations-compat",zc="@firebase/messaging",Wc="@firebase/messaging-compat",Qc="@firebase/performance",Xc="@firebase/performance-compat",Yc="@firebase/remote-config",Jc="@firebase/remote-config-compat",Zc="@firebase/storage",tu="@firebase/storage-compat",eu="@firebase/firestore",nu="@firebase/firestore-compat",su="firebase",iu="9.6.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi="[DEFAULT]",ru={[Jn]:"fire-core",[Oc]:"fire-core-compat",[Pc]:"fire-analytics",[Mc]:"fire-analytics-compat",[Fc]:"fire-app-check",[Vc]:"fire-app-check-compat",[Uc]:"fire-auth",[$c]:"fire-auth-compat",[qc]:"fire-rtdb",[jc]:"fire-rtdb-compat",[Bc]:"fire-fn",[Hc]:"fire-fn-compat",[Kc]:"fire-iid",[Gc]:"fire-iid-compat",[zc]:"fire-fcm",[Wc]:"fire-fcm-compat",[Qc]:"fire-perf",[Xc]:"fire-perf-compat",[Yc]:"fire-rc",[Jc]:"fire-rc-compat",[Zc]:"fire-gcs",[tu]:"fire-gcs-compat",[eu]:"fire-fst",[nu]:"fire-fst-compat","fire-js":"fire-js",[su]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze=new Map,ts=new Map;function ou(e,t){try{e.container.addComponent(t)}catch(n){Zn.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function es(e){const t=e.name;if(ts.has(t))return Zn.debug(`There were multiple attempts to register component ${t}.`),!1;ts.set(t,e);for(const n of ze.values())ou(n,e);return!0}function au(e,t){return e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function."},We=new zi("app","Firebase",cu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(t,n,s){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ge("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw We.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu=iu;function Jd(e,t={}){typeof t!="object"&&(t={name:t});const n=Object.assign({name:Yi,automaticDataCollectionEnabled:!1},t),s=n.name;if(typeof s!="string"||!s)throw We.create("bad-app-name",{appName:String(s)});const i=ze.get(s);if(i){if(Yn(e,i.options)&&Yn(n,i.config))return i;throw We.create("duplicate-app",{appName:s})}const r=new _c(s);for(const a of ts.values())r.addComponent(a);const o=new uu(e,n,r);return ze.set(s,o),o}function lu(e=Yi){const t=ze.get(e);if(!t)throw We.create("no-app",{appName:e});return t}function Lt(e,t,n){var s;let i=(s=ru[e])!==null&&s!==void 0?s:e;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${t}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Zn.warn(a.join(" "));return}es(new Ge(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(e){es(new Ge("platform-logger",t=>new Lc(t),"PRIVATE")),Lt(Jn,Xi,e),Lt(Jn,Xi,"esm2017"),Lt("fire-js","")}fu("");var du="firebase",pu="9.6.5";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Lt(du,pu,"app");var gu=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},g,ns=ns||{},E=gu||self;function Qe(){}function ss(e){var t=typeof e;return t=t!="object"?t:e?Array.isArray(e)?"array":t:"null",t=="array"||t=="object"&&typeof e.length=="number"}function re(e){var t=typeof e;return t=="object"&&e!=null||t=="function"}function mu(e){return Object.prototype.hasOwnProperty.call(e,is)&&e[is]||(e[is]=++yu)}var is="closure_uid_"+(1e9*Math.random()>>>0),yu=0;function vu(e,t,n){return e.call.apply(e.bind,arguments)}function wu(e,t,n){if(!e)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,s),e.apply(t,i)}}return function(){return e.apply(t,arguments)}}function U(e,t,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?U=vu:U=wu,U.apply(null,arguments)}function Xe(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),e.apply(this,s)}}function $(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Vb=function(s,i,r){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return t.prototype[i].apply(s,o)}}function ht(){this.s=this.s,this.o=this.o}var Eu=0,Tu={};ht.prototype.s=!1;ht.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),Eu!=0)){var e=mu(this);delete Tu[e]}};ht.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Ji=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if(typeof e=="string")return typeof t!="string"||t.length!=1?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1},Zi=Array.prototype.forEach?function(e,t,n){Array.prototype.forEach.call(e,t,n)}:function(e,t,n){const s=e.length,i=typeof e=="string"?e.split(""):e;for(let r=0;r<s;r++)r in i&&t.call(n,i[r],r,e)};function Iu(e){t:{var t=dh;const n=e.length,s=typeof e=="string"?e.split(""):e;for(let i=0;i<n;i++)if(i in s&&t.call(void 0,s[i],i,e)){t=i;break t}t=-1}return 0>t?null:typeof e=="string"?e.charAt(t):e[t]}function tr(e){return Array.prototype.concat.apply([],arguments)}function rs(e){const t=e.length;if(0<t){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function Ye(e){return/^[\s\xa0]*$/.test(e)}var er=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function W(e,t){return e.indexOf(t)!=-1}function os(e,t){return e<t?-1:e>t?1:0}var Q;t:{var nr=E.navigator;if(nr){var sr=nr.userAgent;if(sr){Q=sr;break t}}Q=""}function as(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function ir(e){const t={};for(const n in e)t[n]=e[n];return t}var rr="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function or(e,t){let n,s;for(let i=1;i<arguments.length;i++){s=arguments[i];for(n in s)e[n]=s[n];for(let r=0;r<rr.length;r++)n=rr[r],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function cs(e){return cs[" "](e),e}cs[" "]=Qe;function Su(e){var t=bu;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}var Au=W(Q,"Opera"),xt=W(Q,"Trident")||W(Q,"MSIE"),ar=W(Q,"Edge"),us=ar||xt,cr=W(Q,"Gecko")&&!(W(Q.toLowerCase(),"webkit")&&!W(Q,"Edge"))&&!(W(Q,"Trident")||W(Q,"MSIE"))&&!W(Q,"Edge"),Cu=W(Q.toLowerCase(),"webkit")&&!W(Q,"Edge");function ur(){var e=E.document;return e?e.documentMode:void 0}var Je;t:{var hs="",ls=function(){var e=Q;if(cr)return/rv:([^\);]+)(\)|;)/.exec(e);if(ar)return/Edge\/([\d\.]+)/.exec(e);if(xt)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e);if(Cu)return/WebKit\/(\S+)/.exec(e);if(Au)return/(?:Version)[ \/]?(\S+)/.exec(e)}();if(ls&&(hs=ls?ls[1]:""),xt){var fs=ur();if(fs!=null&&fs>parseFloat(hs)){Je=String(fs);break t}}Je=hs}var bu={};function _u(){return Su(function(){let e=0;const t=er(String(Je)).split("."),n=er("9").split("."),s=Math.max(t.length,n.length);for(let o=0;e==0&&o<s;o++){var i=t[o]||"",r=n[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],i[0].length==0&&r[0].length==0)break;e=os(i[1].length==0?0:parseInt(i[1],10),r[1].length==0?0:parseInt(r[1],10))||os(i[2].length==0,r[2].length==0)||os(i[2],r[2]),i=i[3],r=r[3]}while(e==0)}return 0<=e})}var ds;if(E.document&&xt){var hr=ur();ds=hr||parseInt(Je,10)||void 0}else ds=void 0;var Nu=ds,ku=function(){if(!E.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{E.addEventListener("test",Qe,t),E.removeEventListener("test",Qe,t)}catch{}return e}();function K(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}K.prototype.h=function(){this.defaultPrevented=!0};function oe(e,t){if(K.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(cr){t:{try{cs(t.nodeName);var i=!0;break t}catch{}i=!1}i||(t=null)}}else n=="mouseover"?t=e.fromElement:n=="mouseout"&&(t=e.toElement);this.relatedTarget=t,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=e.clientX!==void 0?e.clientX:e.pageX,this.clientY=e.clientY!==void 0?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=typeof e.pointerType=="string"?e.pointerType:Du[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&oe.Z.h.call(this)}}$(oe,K);var Du={2:"touch",3:"pen",4:"mouse"};oe.prototype.h=function(){oe.Z.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var ae="closure_listenable_"+(1e6*Math.random()|0),Ru=0;function Lu(e,t,n,s,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.ia=i,this.key=++Ru,this.ca=this.fa=!1}function Ze(e){e.ca=!0,e.listener=null,e.proxy=null,e.src=null,e.ia=null}function tn(e){this.src=e,this.g={},this.h=0}tn.prototype.add=function(e,t,n,s,i){var r=e.toString();e=this.g[r],e||(e=this.g[r]=[],this.h++);var o=gs(e,t,s,i);return-1<o?(t=e[o],n||(t.fa=!1)):(t=new Lu(t,this.src,r,!!s,i),t.fa=n,e.push(t)),t};function ps(e,t){var n=t.type;if(n in e.g){var s=e.g[n],i=Ji(s,t),r;(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(Ze(t),e.g[n].length==0&&(delete e.g[n],e.h--))}}function gs(e,t,n,s){for(var i=0;i<e.length;++i){var r=e[i];if(!r.ca&&r.listener==t&&r.capture==!!n&&r.ia==s)return i}return-1}var ms="closure_lm_"+(1e6*Math.random()|0),ys={};function lr(e,t,n,s,i){if(s&&s.once)return dr(e,t,n,s,i);if(Array.isArray(t)){for(var r=0;r<t.length;r++)lr(e,t[r],n,s,i);return null}return n=Ts(n),e&&e[ae]?e.N(t,n,re(s)?!!s.capture:!!s,i):fr(e,t,n,!1,s,i)}function fr(e,t,n,s,i,r){if(!t)throw Error("Invalid event type");var o=re(i)?!!i.capture:!!i,a=ws(e);if(a||(e[ms]=a=new tn(e)),n=a.add(t,n,s,o,r),n.proxy)return n;if(s=xu(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)ku||(i=o),i===void 0&&(i=!1),e.addEventListener(t.toString(),s,i);else if(e.attachEvent)e.attachEvent(gr(t.toString()),s);else if(e.addListener&&e.removeListener)e.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function xu(){function e(n){return t.call(e.src,e.listener,n)}var t=Ou;return e}function dr(e,t,n,s,i){if(Array.isArray(t)){for(var r=0;r<t.length;r++)dr(e,t[r],n,s,i);return null}return n=Ts(n),e&&e[ae]?e.O(t,n,re(s)?!!s.capture:!!s,i):fr(e,t,n,!0,s,i)}function pr(e,t,n,s,i){if(Array.isArray(t))for(var r=0;r<t.length;r++)pr(e,t[r],n,s,i);else s=re(s)?!!s.capture:!!s,n=Ts(n),e&&e[ae]?(e=e.i,t=String(t).toString(),t in e.g&&(r=e.g[t],n=gs(r,n,s,i),-1<n&&(Ze(r[n]),Array.prototype.splice.call(r,n,1),r.length==0&&(delete e.g[t],e.h--)))):e&&(e=ws(e))&&(t=e.g[t.toString()],e=-1,t&&(e=gs(t,n,s,i)),(n=-1<e?t[e]:null)&&vs(n))}function vs(e){if(typeof e!="number"&&e&&!e.ca){var t=e.src;if(t&&t[ae])ps(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent(gr(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=ws(t))?(ps(n,e),n.h==0&&(n.src=null,t[ms]=null)):Ze(e)}}}function gr(e){return e in ys?ys[e]:ys[e]="on"+e}function Ou(e,t){if(e.ca)e=!0;else{t=new oe(t,this);var n=e.listener,s=e.ia||e.src;e.fa&&vs(e),e=n.call(s,t)}return e}function ws(e){return e=e[ms],e instanceof tn?e:null}var Es="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ts(e){return typeof e=="function"?e:(e[Es]||(e[Es]=function(t){return e.handleEvent(t)}),e[Es])}function V(){ht.call(this),this.i=new tn(this),this.P=this,this.I=null}$(V,ht);V.prototype[ae]=!0;V.prototype.removeEventListener=function(e,t,n,s){pr(this,e,t,n,s)};function q(e,t){var n,s=e.I;if(s)for(n=[];s;s=s.I)n.push(s);if(e=e.P,s=t.type||t,typeof t=="string")t=new K(t,e);else if(t instanceof K)t.target=t.target||e;else{var i=t;t=new K(s,e),or(t,i)}if(i=!0,n)for(var r=n.length-1;0<=r;r--){var o=t.g=n[r];i=en(o,s,!0,t)&&i}if(o=t.g=e,i=en(o,s,!0,t)&&i,i=en(o,s,!1,t)&&i,n)for(r=0;r<n.length;r++)o=t.g=n[r],i=en(o,s,!1,t)&&i}V.prototype.M=function(){if(V.Z.M.call(this),this.i){var e=this.i,t;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)Ze(n[s]);delete e.g[t],e.h--}}this.I=null};V.prototype.N=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)};V.prototype.O=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};function en(e,t,n,s){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var i=!0,r=0;r<t.length;++r){var o=t[r];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&ps(e.i,o),i=a.call(c,s)!==!1&&i}}return i&&!s.defaultPrevented}var Is=E.JSON.stringify;function Mu(){var e=yr;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class Pu{constructor(){this.h=this.g=null}add(t,n){const s=mr.get();s.set(t,n),this.h?this.h.next=s:this.g=s,this.h=s}}var mr=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new Vu,e=>e.reset());class Vu{constructor(){this.next=this.g=this.h=null}set(t,n){this.h=t,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function Fu(e){E.setTimeout(()=>{throw e},0)}function Ss(e,t){As||Uu(),Cs||(As(),Cs=!0),yr.add(e,t)}var As;function Uu(){var e=E.Promise.resolve(void 0);As=function(){e.then($u)}}var Cs=!1,yr=new Pu;function $u(){for(var e;e=Mu();){try{e.h.call(e.g)}catch(n){Fu(n)}var t=mr;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}Cs=!1}function nn(e,t){V.call(this),this.h=e||1,this.g=t||E,this.j=U(this.kb,this),this.l=Date.now()}$(nn,V);g=nn.prototype;g.da=!1;g.S=null;g.kb=function(){if(this.da){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-e):(this.S&&(this.g.clearTimeout(this.S),this.S=null),q(this,"tick"),this.da&&(bs(this),this.start()))}};g.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function bs(e){e.da=!1,e.S&&(e.g.clearTimeout(e.S),e.S=null)}g.M=function(){nn.Z.M.call(this),bs(this),delete this.g};function _s(e,t,n){if(typeof e=="function")n&&(e=U(e,n));else if(e&&typeof e.handleEvent=="function")e=U(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:E.setTimeout(e,t||0)}function vr(e){e.g=_s(()=>{e.g=null,e.i&&(e.i=!1,vr(e))},e.j);const t=e.h;e.h=null,e.m.apply(null,t)}class qu extends ht{constructor(t,n){super();this.m=t,this.j=n,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:vr(this)}M(){super.M(),this.g&&(E.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ce(e){ht.call(this),this.h=e,this.g={}}$(ce,ht);var wr=[];function Er(e,t,n,s){Array.isArray(n)||(n&&(wr[0]=n.toString()),n=wr);for(var i=0;i<n.length;i++){var r=lr(t,n[i],s||e.handleEvent,!1,e.h||e);if(!r)break;e.g[r.key]=r}}function Tr(e){as(e.g,function(t,n){this.g.hasOwnProperty(n)&&vs(t)},e),e.g={}}ce.prototype.M=function(){ce.Z.M.call(this),Tr(this)};ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function sn(){this.g=!0}sn.prototype.Aa=function(){this.g=!1};function ju(e,t,n,s,i,r){e.info(function(){if(e.g)if(r)for(var o="",a=r.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&l[1]=="type"?o+(h+"="+u+"&"):o+(h+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+t+`
`+n+`
`+o})}function Bu(e,t,n,s,i,r,o){e.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+t+`
`+n+`
`+r+" "+o})}function Ot(e,t,n,s){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+Ku(e,n)+(s?" "+s:"")})}function Hu(e,t){e.info(function(){return"TIMEOUT: "+t})}sn.prototype.info=function(){};function Ku(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var s=n[e];if(!(2>s.length)){var i=s[1];if(Array.isArray(i)&&!(1>i.length)){var r=i[0];if(r!="noop"&&r!="stop"&&r!="close")for(var o=1;o<i.length;o++)i[o]=""}}}}return Is(n)}catch{return t}}var wt={},Ir=null;function rn(){return Ir=Ir||new V}wt.Ma="serverreachability";function Sr(e){K.call(this,wt.Ma,e)}$(Sr,K);function ue(e){const t=rn();q(t,new Sr(t,e))}wt.STAT_EVENT="statevent";function Ar(e,t){K.call(this,wt.STAT_EVENT,e),this.stat=t}$(Ar,K);function X(e){const t=rn();q(t,new Ar(t,e))}wt.Na="timingevent";function Cr(e,t){K.call(this,wt.Na,e),this.size=t}$(Cr,K);function he(e,t){if(typeof e!="function")throw Error("Fn must not be null and must be a function");return E.setTimeout(function(){e()},t)}var on={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},br={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Ns(){}Ns.prototype.h=null;function _r(e){return e.h||(e.h=e.i())}function Nr(){}var le={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function ks(){K.call(this,"d")}$(ks,K);function Ds(){K.call(this,"c")}$(Ds,K);var Rs;function an(){}$(an,Ns);an.prototype.g=function(){return new XMLHttpRequest};an.prototype.i=function(){return{}};Rs=new an;function fe(e,t,n,s){this.l=e,this.j=t,this.m=n,this.X=s||1,this.V=new ce(this),this.P=Gu,e=us?125:void 0,this.W=new nn(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new kr}function kr(){this.i=null,this.g="",this.h=!1}var Gu=45e3,Ls={},cn={};g=fe.prototype;g.setTimeout=function(e){this.P=e};function xs(e,t,n){e.K=1,e.v=dn(at(t)),e.s=n,e.U=!0,Dr(e,null)}function Dr(e,t){e.F=Date.now(),de(e),e.A=at(e.v);var n=e.A,s=e.X;Array.isArray(s)||(s=[String(s)]),Ur(n.h,"t",s),e.C=0,n=e.l.H,e.h=new kr,e.g=co(e.l,n?t:null,!e.s),0<e.O&&(e.L=new qu(U(e.Ia,e,e.g),e.O)),Er(e.V,e.g,"readystatechange",e.gb),t=e.H?ir(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.s,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),ue(1),ju(e.j,e.u,e.A,e.m,e.X,e.s)}g.gb=function(e){e=e.target;const t=this.L;t&&ct(e)==3?t.l():this.Ia(e)};g.Ia=function(e){try{if(e==this.g)t:{const h=ct(this.g);var t=this.g.Da();const l=this.g.ba();if(!(3>h)&&(h!=3||us||this.g&&(this.h.h||this.g.ga()||Yr(this.g)))){this.I||h!=4||t==7||(t==8||0>=l?ue(3):ue(2)),un(this);var n=this.g.ba();this.N=n;e:if(Rr(this)){var s=Yr(this.g);e="";var i=s.length,r=ct(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Et(this),pe(this);var o="";break e}this.h.i=new E.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(s[t],{stream:r&&t==i-1});s.splice(0,i),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=n==200,Bu(this.j,this.u,this.A,this.m,this.X,h,n),this.i){if(this.$&&!this.J){e:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ye(a)){var u=a;break e}}u=null}if(n=u)Ot(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Os(this,n);else{this.i=!1,this.o=3,X(12),Et(this),pe(this);break t}}this.U?(Lr(this,h,o),us&&this.i&&h==3&&(Er(this.V,this.W,"tick",this.fb),this.W.start())):(Ot(this.j,this.m,o,null),Os(this,o)),h==4&&Et(this),this.i&&!this.I&&(h==4?io(this.l,this):(this.i=!1,de(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,X(12)):(this.o=0,X(13)),Et(this),pe(this)}}}catch{}finally{}};function Rr(e){return e.g?e.u=="GET"&&e.K!=2&&e.l.Ba:!1}function Lr(e,t,n){let s=!0,i;for(;!e.I&&e.C<n.length;)if(i=zu(e,n),i==cn){t==4&&(e.o=4,X(14),s=!1),Ot(e.j,e.m,null,"[Incomplete Response]");break}else if(i==Ls){e.o=4,X(15),Ot(e.j,e.m,n,"[Invalid Chunk]"),s=!1;break}else Ot(e.j,e.m,i,null),Os(e,i);Rr(e)&&i!=cn&&i!=Ls&&(e.h.g="",e.C=0),t!=4||n.length!=0||e.h.h||(e.o=1,X(16),s=!1),e.i=e.i&&s,s?0<n.length&&!e.aa&&(e.aa=!0,t=e.l,t.g==e&&t.$&&!t.L&&(t.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),Ks(t),t.L=!0,X(11))):(Ot(e.j,e.m,n,"[Invalid Chunked Response]"),Et(e),pe(e))}g.fb=function(){if(this.g){var e=ct(this.g),t=this.g.ga();this.C<t.length&&(un(this),Lr(this,e,t),this.i&&e!=4&&de(this))}};function zu(e,t){var n=e.C,s=t.indexOf(`
`,n);return s==-1?cn:(n=Number(t.substring(n,s)),isNaN(n)?Ls:(s+=1,s+n>t.length?cn:(t=t.substr(s,n),e.C=s+n,t)))}g.cancel=function(){this.I=!0,Et(this)};function de(e){e.Y=Date.now()+e.P,xr(e,e.P)}function xr(e,t){if(e.B!=null)throw Error("WatchDog timer not null");e.B=he(U(e.eb,e),t)}function un(e){e.B&&(E.clearTimeout(e.B),e.B=null)}g.eb=function(){this.B=null;const e=Date.now();0<=e-this.Y?(Hu(this.j,this.A),this.K!=2&&(ue(3),X(17)),Et(this),this.o=2,pe(this)):xr(this,this.Y-e)};function pe(e){e.l.G==0||e.I||io(e.l,e)}function Et(e){un(e);var t=e.L;t&&typeof t.na=="function"&&t.na(),e.L=null,bs(e.W),Tr(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function Os(e,t){try{var n=e.l;if(n.G!=0&&(n.g==e||Vs(n.i,e))){if(n.I=e.N,!e.J&&Vs(n.i,e)&&n.G==3){try{var s=n.Ca.g.parse(t)}catch{s=null}if(Array.isArray(s)&&s.length==3){var i=s;if(i[0]==0)t:if(!n.u){if(n.g)if(n.g.F+3e3<e.F)wn(n),yn(n);else break t;Hs(n),X(18)}else n.ta=i[1],0<n.ta-n.U&&37500>i[2]&&n.N&&n.A==0&&!n.v&&(n.v=he(U(n.ab,n),6e3));if(1>=jr(n.i)&&n.ka){try{n.ka()}catch{}n.ka=void 0}}else St(n,11)}else if((e.J||n.g==e)&&wn(n),!Ye(t))for(i=n.Ca.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.U=u[0],u=u[1],n.G==2)if(u[0]=="c"){n.J=u[1],n.la=u[2];const h=u[3];h!=null&&(n.ma=h,n.h.info("VER="+n.ma));const l=u[4];l!=null&&(n.za=l,n.h.info("SVER="+n.za));const d=u[5];d!=null&&typeof d=="number"&&0<d&&(s=1.5*d,n.K=s,n.h.info("backChannelRequestTimeoutMs_="+s)),s=n;const m=e.g;if(m){const v=m.g?m.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(v){var r=s.i;!r.g&&(W(v,"spdy")||W(v,"quic")||W(v,"h2"))&&(r.j=r.l,r.g=new Set,r.h&&(Fs(r,r.h),r.h=null))}if(s.D){const N=m.g?m.g.getResponseHeader("X-HTTP-Session-Id"):null;N&&(s.sa=N,R(s.F,s.D,N))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-e.F,n.h.info("Handshake RTT: "+n.O+"ms")),s=n;var o=e;if(s.oa=ao(s,s.H?s.la:null,s.W),o.J){Br(s.i,o);var a=o,c=s.K;c&&a.setTimeout(c),a.B&&(un(a),de(a)),s.g=o}else no(s);0<n.l.length&&vn(n)}else u[0]!="stop"&&u[0]!="close"||St(n,7);else n.G==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?St(n,7):js(n):u[0]!="noop"&&n.j&&n.j.wa(u),n.A=0)}}ue(4)}catch{}}function Wu(e){if(e.R&&typeof e.R=="function")return e.R();if(typeof e=="string")return e.split("");if(ss(e)){for(var t=[],n=e.length,s=0;s<n;s++)t.push(e[s]);return t}t=[],n=0;for(s in e)t[n++]=e[s];return t}function Ms(e,t){if(e.forEach&&typeof e.forEach=="function")e.forEach(t,void 0);else if(ss(e)||typeof e=="string")Zi(e,t,void 0);else{if(e.T&&typeof e.T=="function")var n=e.T();else if(e.R&&typeof e.R=="function")n=void 0;else if(ss(e)||typeof e=="string"){n=[];for(var s=e.length,i=0;i<s;i++)n.push(i)}else for(i in n=[],s=0,e)n[s++]=i;s=Wu(e),i=s.length;for(var r=0;r<i;r++)t.call(void 0,s[r],n&&n[r],e)}}function Mt(e,t){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var s=0;s<n;s+=2)this.set(arguments[s],arguments[s+1])}else if(e)if(e instanceof Mt)for(n=e.T(),s=0;s<n.length;s++)this.set(n[s],e.get(n[s]));else for(s in e)this.set(s,e[s])}g=Mt.prototype;g.R=function(){Ps(this);for(var e=[],t=0;t<this.g.length;t++)e.push(this.h[this.g[t]]);return e};g.T=function(){return Ps(this),this.g.concat()};function Ps(e){if(e.i!=e.g.length){for(var t=0,n=0;t<e.g.length;){var s=e.g[t];Tt(e.h,s)&&(e.g[n++]=s),t++}e.g.length=n}if(e.i!=e.g.length){var i={};for(n=t=0;t<e.g.length;)s=e.g[t],Tt(i,s)||(e.g[n++]=s,i[s]=1),t++;e.g.length=n}}g.get=function(e,t){return Tt(this.h,e)?this.h[e]:t};g.set=function(e,t){Tt(this.h,e)||(this.i++,this.g.push(e)),this.h[e]=t};g.forEach=function(e,t){for(var n=this.T(),s=0;s<n.length;s++){var i=n[s],r=this.get(i);e.call(t,r,i,this)}};function Tt(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Or=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Qu(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var s=e[n].indexOf("="),i=null;if(0<=s){var r=e[n].substring(0,s);i=e[n].substring(s+1)}else r=e[n];t(r,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function It(e,t){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,e instanceof It){this.g=t!==void 0?t:e.g,hn(this,e.j),this.s=e.s,ln(this,e.i),fn(this,e.m),this.l=e.l,t=e.h;var n=new ye;n.i=t.i,t.g&&(n.g=new Mt(t.g),n.h=t.h),Mr(this,n),this.o=e.o}else e&&(n=String(e).match(Or))?(this.g=!!t,hn(this,n[1]||"",!0),this.s=ge(n[2]||""),ln(this,n[3]||"",!0),fn(this,n[4]),this.l=ge(n[5]||"",!0),Mr(this,n[6]||"",!0),this.o=ge(n[7]||"")):(this.g=!!t,this.h=new ye(null,this.g))}It.prototype.toString=function(){var e=[],t=this.j;t&&e.push(me(t,Pr,!0),":");var n=this.i;return(n||t=="file")&&(e.push("//"),(t=this.s)&&e.push(me(t,Pr,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&e.push(":",String(n))),(n=this.l)&&(this.i&&n.charAt(0)!="/"&&e.push("/"),e.push(me(n,n.charAt(0)=="/"?th:Zu,!0))),(n=this.h.toString())&&e.push("?",n),(n=this.o)&&e.push("#",me(n,nh)),e.join("")};function at(e){return new It(e)}function hn(e,t,n){e.j=n?ge(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function ln(e,t,n){e.i=n?ge(t,!0):t}function fn(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function Mr(e,t,n){t instanceof ye?(e.h=t,sh(e.h,e.g)):(n||(t=me(t,eh)),e.h=new ye(t,e.g))}function R(e,t,n){e.h.set(t,n)}function dn(e){return R(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Xu(e){return e instanceof It?at(e):new It(e,void 0)}function Yu(e,t,n,s){var i=new It(null,void 0);return e&&hn(i,e),t&&ln(i,t),n&&fn(i,n),s&&(i.l=s),i}function ge(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function me(e,t,n){return typeof e=="string"?(e=encodeURI(e).replace(t,Ju),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Ju(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(e&15).toString(16)}var Pr=/[#\/\?@]/g,Zu=/[#\?:]/g,th=/[#\?]/g,eh=/[#\?@]/g,nh=/#/g;function ye(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function lt(e){e.g||(e.g=new Mt,e.h=0,e.i&&Qu(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}g=ye.prototype;g.add=function(e,t){lt(this),this.i=null,e=Pt(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this};function Vr(e,t){lt(e),t=Pt(e,t),Tt(e.g.h,t)&&(e.i=null,e.h-=e.g.get(t).length,e=e.g,Tt(e.h,t)&&(delete e.h[t],e.i--,e.g.length>2*e.i&&Ps(e)))}function Fr(e,t){return lt(e),t=Pt(e,t),Tt(e.g.h,t)}g.forEach=function(e,t){lt(this),this.g.forEach(function(n,s){Zi(n,function(i){e.call(t,i,s,this)},this)},this)};g.T=function(){lt(this);for(var e=this.g.R(),t=this.g.T(),n=[],s=0;s<t.length;s++)for(var i=e[s],r=0;r<i.length;r++)n.push(t[s]);return n};g.R=function(e){lt(this);var t=[];if(typeof e=="string")Fr(this,e)&&(t=tr(t,this.g.get(Pt(this,e))));else{e=this.g.R();for(var n=0;n<e.length;n++)t=tr(t,e[n])}return t};g.set=function(e,t){return lt(this),this.i=null,e=Pt(this,e),Fr(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this};g.get=function(e,t){return e?(e=this.R(e),0<e.length?String(e[0]):t):t};function Ur(e,t,n){Vr(e,t),0<n.length&&(e.i=null,e.g.set(Pt(e,t),rs(n)),e.h+=n.length)}g.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var e=[],t=this.g.T(),n=0;n<t.length;n++){var s=t[n],i=encodeURIComponent(String(s));s=this.R(s);for(var r=0;r<s.length;r++){var o=i;s[r]!==""&&(o+="="+encodeURIComponent(String(s[r]))),e.push(o)}}return this.i=e.join("&")};function Pt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function sh(e,t){t&&!e.j&&(lt(e),e.i=null,e.g.forEach(function(n,s){var i=s.toLowerCase();s!=i&&(Vr(this,s),Ur(this,i,n))},e)),e.j=t}var ih=class{constructor(e,t){this.h=e,this.g=t}};function $r(e){this.l=e||rh,E.PerformanceNavigationTiming?(e=E.performance.getEntriesByType("navigation"),e=0<e.length&&(e[0].nextHopProtocol=="hq"||e[0].nextHopProtocol=="h2")):e=!!(E.g&&E.g.Ea&&E.g.Ea()&&E.g.Ea().Zb),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var rh=10;function qr(e){return e.h?!0:e.g?e.g.size>=e.j:!1}function jr(e){return e.h?1:e.g?e.g.size:0}function Vs(e,t){return e.h?e.h==t:e.g?e.g.has(t):!1}function Fs(e,t){e.g?e.g.add(t):e.h=t}function Br(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}$r.prototype.cancel=function(){if(this.i=Hr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const e of this.g.values())e.cancel();this.g.clear()}};function Hr(e){if(e.h!=null)return e.i.concat(e.h.D);if(e.g!=null&&e.g.size!==0){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return rs(e.i)}function Us(){}Us.prototype.stringify=function(e){return E.JSON.stringify(e,void 0)};Us.prototype.parse=function(e){return E.JSON.parse(e,void 0)};function oh(){this.g=new Us}function ah(e,t,n){const s=n||"";try{Ms(e,function(i,r){let o=i;re(i)&&(o=Is(i)),t.push(s+r+"="+encodeURIComponent(o))})}catch(i){throw t.push(s+"type="+encodeURIComponent("_badmap")),i}}function ch(e,t){const n=new sn;if(E.Image){const s=new Image;s.onload=Xe(pn,n,s,"TestLoadImage: loaded",!0,t),s.onerror=Xe(pn,n,s,"TestLoadImage: error",!1,t),s.onabort=Xe(pn,n,s,"TestLoadImage: abort",!1,t),s.ontimeout=Xe(pn,n,s,"TestLoadImage: timeout",!1,t),E.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=e}else t(!1)}function pn(e,t,n,s,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(s)}catch{}}function ve(e){this.l=e.$b||null,this.j=e.ib||!1}$(ve,Ns);ve.prototype.g=function(){return new gn(this.l,this.j)};ve.prototype.i=function(e){return function(){return e}}({});function gn(e,t){V.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=$s,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}$(gn,V);var $s=0;g=gn.prototype;g.open=function(e,t){if(this.readyState!=$s)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,Ee(this)};g.send=function(e){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||E).fetch(new Request(this.B,t)).then(this.Va.bind(this),this.ha.bind(this))};g.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,we(this)),this.readyState=$s};g.Va=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Ee(this)),this.g&&(this.readyState=3,Ee(this),this.g)))if(this.responseType==="arraybuffer")e.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof E.ReadableStream!="undefined"&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Kr(this)}else e.text().then(this.Ua.bind(this),this.ha.bind(this))};function Kr(e){e.j.read().then(e.Sa.bind(e)).catch(e.ha.bind(e))}g.Sa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?we(this):Ee(this),this.readyState==3&&Kr(this)}};g.Ua=function(e){this.g&&(this.response=this.responseText=e,we(this))};g.Ta=function(e){this.g&&(this.response=e,we(this))};g.ha=function(){this.g&&we(this)};function we(e){e.readyState=4,e.l=null,e.j=null,e.A=null,Ee(e)}g.setRequestHeader=function(e,t){this.v.append(e,t)};g.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""};g.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join(`\r
`)};function Ee(e){e.onreadystatechange&&e.onreadystatechange.call(e)}Object.defineProperty(gn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(e){this.m=e?"include":"same-origin"}});var uh=E.JSON.parse;function x(e){V.call(this),this.headers=new Mt,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Gr,this.K=this.L=!1}$(x,V);var Gr="",hh=/^https?$/i,lh=["POST","PUT"];g=x.prototype;g.ea=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Rs.g(),this.C=this.u?_r(this.u):_r(Rs),this.g.onreadystatechange=U(this.Fa,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(r){zr(this,r);return}e=n||"";const i=new Mt(this.headers);s&&Ms(s,function(r,o){i.set(o,r)}),s=Iu(i.T()),n=E.FormData&&e instanceof E.FormData,!(0<=Ji(lh,t))||s||n||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),i.forEach(function(r,o){this.g.setRequestHeader(o,r)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Xr(this),0<this.B&&((this.K=fh(this.g))?(this.g.timeout=this.B,this.g.ontimeout=U(this.pa,this)):this.A=_s(this.pa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(r){zr(this,r)}};function fh(e){return xt&&_u()&&typeof e.timeout=="number"&&e.ontimeout!==void 0}function dh(e){return e.toLowerCase()=="content-type"}g.pa=function(){typeof ns!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,q(this,"timeout"),this.abort(8))};function zr(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,Wr(e),mn(e)}function Wr(e){e.D||(e.D=!0,q(e,"complete"),q(e,"error"))}g.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,q(this,"complete"),q(this,"abort"),mn(this))};g.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),mn(this,!0)),x.Z.M.call(this)};g.Fa=function(){this.s||(this.F||this.v||this.l?Qr(this):this.cb())};g.cb=function(){Qr(this)};function Qr(e){if(e.h&&typeof ns!="undefined"&&(!e.C[1]||ct(e)!=4||e.ba()!=2)){if(e.v&&ct(e)==4)_s(e.Fa,0,e);else if(q(e,"readystatechange"),ct(e)==4){e.h=!1;try{const a=e.ba();t:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break t;default:t=!1}var n;if(!(n=t)){var s;if(s=a===0){var i=String(e.H).match(Or)[1]||null;if(!i&&E.self&&E.self.location){var r=E.self.location.protocol;i=r.substr(0,r.length-1)}s=!hh.test(i?i.toLowerCase():"")}n=s}if(n)q(e,"complete"),q(e,"success");else{e.m=6;try{var o=2<ct(e)?e.g.statusText:""}catch{o=""}e.j=o+" ["+e.ba()+"]",Wr(e)}}finally{mn(e)}}}}function mn(e,t){if(e.g){Xr(e);const n=e.g,s=e.C[0]?Qe:null;e.g=null,e.C=null,t||q(e,"ready");try{n.onreadystatechange=s}catch{}}}function Xr(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(E.clearTimeout(e.A),e.A=null)}function ct(e){return e.g?e.g.readyState:0}g.ba=function(){try{return 2<ct(this)?this.g.status:-1}catch{return-1}};g.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};g.Qa=function(e){if(this.g){var t=this.g.responseText;return e&&t.indexOf(e)==0&&(t=t.substring(e.length)),uh(t)}};function Yr(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case Gr:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch{return null}}g.Da=function(){return this.m};g.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function ph(e){let t="";return as(e,function(n,s){t+=s,t+=":",t+=n,t+=`\r
`}),t}function qs(e,t,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=ph(n),typeof e=="string"?n!=null&&encodeURIComponent(String(n)):R(e,t,n))}function Te(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Jr(e){this.za=0,this.l=[],this.h=new sn,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=Te("failFast",!1,e),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=Te("baseRetryDelayMs",5e3,e),this.$a=Te("retryDelaySeedMs",1e4,e),this.Ya=Te("forwardChannelMaxRetries",2,e),this.ra=Te("forwardChannelRequestTimeoutMs",2e4,e),this.qa=e&&e.xmlHttpFactory||void 0,this.Ba=e&&e.Yb||!1,this.K=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.J="",this.i=new $r(e&&e.concurrentRequestLimit),this.Ca=new oh,this.ja=e&&e.fastHandshake||!1,this.Ra=e&&e.Wb||!1,e&&e.Aa&&this.h.Aa(),e&&e.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&e&&e.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!e||e.Xb!==!1}g=Jr.prototype;g.ma=8;g.G=1;function js(e){if(Zr(e),e.G==3){var t=e.V++,n=at(e.F);R(n,"SID",e.J),R(n,"RID",t),R(n,"TYPE","terminate"),Ie(e,n),t=new fe(e,e.h,t,void 0),t.K=2,t.v=dn(at(n)),n=!1,E.navigator&&E.navigator.sendBeacon&&(n=E.navigator.sendBeacon(t.v.toString(),"")),!n&&E.Image&&(new Image().src=t.v,n=!0),n||(t.g=co(t.l,null),t.g.ea(t.v)),t.F=Date.now(),de(t)}oo(e)}g.hb=function(e){try{this.h.info("Origin Trials invoked: "+e)}catch{}};function yn(e){e.g&&(Ks(e),e.g.cancel(),e.g=null)}function Zr(e){yn(e),e.u&&(E.clearTimeout(e.u),e.u=null),wn(e),e.i.cancel(),e.m&&(typeof e.m=="number"&&E.clearTimeout(e.m),e.m=null)}function Bs(e,t){e.l.push(new ih(e.Za++,t)),e.G==3&&vn(e)}function vn(e){qr(e.i)||e.m||(e.m=!0,Ss(e.Ha,e),e.C=0)}function gh(e,t){return jr(e.i)>=e.i.j-(e.m?1:0)?!1:e.m?(e.l=t.D.concat(e.l),!0):e.G==1||e.G==2||e.C>=(e.Xa?0:e.Ya)?!1:(e.m=he(U(e.Ha,e,t),ro(e,e.C)),e.C++,!0)}g.Ha=function(e){if(this.m)if(this.m=null,this.G==1){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new fe(this,this.h,e,void 0);let r=this.s;if(this.P&&(r?(r=ir(r),or(r,this.P)):r=this.P),this.o===null&&(i.H=r),this.ja)t:{for(var t=0,n=0;n<this.l.length;n++){e:{var s=this.l[n];if("__data__"in s.g&&(s=s.g.__data__,typeof s=="string")){s=s.length;break e}s=void 0}if(s===void 0)break;if(t+=s,4096<t){t=n;break t}if(t===4096||n===this.l.length-1){t=n+1;break t}}t=1e3}else t=1e3;t=eo(this,i,t),n=at(this.F),R(n,"RID",e),R(n,"CVER",22),this.D&&R(n,"X-HTTP-Session-Id",this.D),Ie(this,n),this.o&&r&&qs(n,this.o,r),Fs(this.i,i),this.Ra&&R(n,"TYPE","init"),this.ja?(R(n,"$req",t),R(n,"SID","null"),i.$=!0,xs(i,n,null)):xs(i,n,t),this.G=2}}else this.G==3&&(e?to(this,e):this.l.length==0||qr(this.i)||to(this))};function to(e,t){var n;t?n=t.m:n=e.V++;const s=at(e.F);R(s,"SID",e.J),R(s,"RID",n),R(s,"AID",e.U),Ie(e,s),e.o&&e.s&&qs(s,e.o,e.s),n=new fe(e,e.h,n,e.C+1),e.o===null&&(n.H=e.s),t&&(e.l=t.D.concat(e.l)),t=eo(e,n,1e3),n.setTimeout(Math.round(.5*e.ra)+Math.round(.5*e.ra*Math.random())),Fs(e.i,n),xs(n,s,t)}function Ie(e,t){e.j&&Ms({},function(n,s){R(t,s,n)})}function eo(e,t,n){n=Math.min(e.l.length,n);var s=e.j?U(e.j.Oa,e.j,e):null;t:{var i=e.l;let r=-1;for(;;){const o=["count="+n];r==-1?0<n?(r=i[0].h,o.push("ofs="+r)):r=0:o.push("ofs="+r);let a=!0;for(let c=0;c<n;c++){let u=i[c].h;const h=i[c].g;if(u-=r,0>u)r=Math.max(0,i[c].h-100),a=!1;else try{ah(h,o,"req"+u+"_")}catch{s&&s(h)}}if(a){s=o.join("&");break t}}}return e=e.l.splice(0,n),t.D=e,s}function no(e){e.g||e.u||(e.Y=1,Ss(e.Ga,e),e.A=0)}function Hs(e){return e.g||e.u||3<=e.A?!1:(e.Y++,e.u=he(U(e.Ga,e),ro(e,e.A)),e.A++,!0)}g.Ga=function(){if(this.u=null,so(this),this.$&&!(this.L||this.g==null||0>=this.O)){var e=2*this.O;this.h.info("BP detection timer enabled: "+e),this.B=he(U(this.bb,this),e)}};g.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,X(10),yn(this),so(this))};function Ks(e){e.B!=null&&(E.clearTimeout(e.B),e.B=null)}function so(e){e.g=new fe(e,e.h,"rpc",e.Y),e.o===null&&(e.g.H=e.s),e.g.O=0;var t=at(e.oa);R(t,"RID","rpc"),R(t,"SID",e.J),R(t,"CI",e.N?"0":"1"),R(t,"AID",e.U),Ie(e,t),R(t,"TYPE","xmlhttp"),e.o&&e.s&&qs(t,e.o,e.s),e.K&&e.g.setTimeout(e.K);var n=e.g;e=e.la,n.K=1,n.v=dn(at(t)),n.s=null,n.U=!0,Dr(n,e)}g.ab=function(){this.v!=null&&(this.v=null,yn(this),Hs(this),X(19))};function wn(e){e.v!=null&&(E.clearTimeout(e.v),e.v=null)}function io(e,t){var n=null;if(e.g==t){wn(e),Ks(e),e.g=null;var s=2}else if(Vs(e.i,t))n=t.D,Br(e.i,t),s=1;else return;if(e.I=t.N,e.G!=0){if(t.i)if(s==1){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;s=rn(),q(s,new Cr(s,n,t,i)),vn(e)}else no(e);else if(i=t.o,i==3||i==0&&0<e.I||!(s==1&&gh(e,t)||s==2&&Hs(e)))switch(n&&0<n.length&&(t=e.i,t.i=t.i.concat(n)),i){case 1:St(e,5);break;case 4:St(e,10);break;case 3:St(e,6);break;default:St(e,2)}}}function ro(e,t){let n=e.Pa+Math.floor(Math.random()*e.$a);return e.j||(n*=2),n*t}function St(e,t){if(e.h.info("Error code "+t),t==2){var n=null;e.j&&(n=null);var s=U(e.jb,e);n||(n=new It("//www.google.com/images/cleardot.gif"),E.location&&E.location.protocol=="http"||hn(n,"https"),dn(n)),ch(n.toString(),s)}else X(2);e.G=0,e.j&&e.j.va(t),oo(e),Zr(e)}g.jb=function(e){e?(this.h.info("Successfully pinged google.com"),X(2)):(this.h.info("Failed to ping google.com"),X(1))};function oo(e){e.G=0,e.I=-1,e.j&&((Hr(e.i).length!=0||e.l.length!=0)&&(e.i.i.length=0,rs(e.l),e.l.length=0),e.j.ua())}function ao(e,t,n){let s=Xu(n);if(s.i!="")t&&ln(s,t+"."+s.i),fn(s,s.m);else{const i=E.location;s=Yu(i.protocol,t?t+"."+i.hostname:i.hostname,+i.port,n)}return e.aa&&as(e.aa,function(i,r){R(s,r,i)}),t=e.D,n=e.sa,t&&n&&R(s,t,n),R(s,"VER",e.ma),Ie(e,s),s}function co(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return t=n&&e.Ba&&!e.qa?new x(new ve({ib:!0})):new x(e.qa),t.L=e.H,t}function uo(){}g=uo.prototype;g.xa=function(){};g.wa=function(){};g.va=function(){};g.ua=function(){};g.Oa=function(){};function En(){if(xt&&!(10<=Number(Nu)))throw Error("Environmental error: no available transport.")}En.prototype.g=function(e,t){return new tt(e,t)};function tt(e,t){V.call(this),this.g=new Jr(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.P=e,(e=t&&t.httpHeadersOverwriteParam)&&!Ye(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!Ye(t)&&(this.g.D=t,e=this.h,e!==null&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new Vt(this)}$(tt,V);tt.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;e.Wa&&(e.h.info("Origin Trials enabled."),Ss(U(e.hb,e,t))),X(0),e.W=t,e.aa=n||{},e.N=e.X,e.F=ao(e,null,e.W),vn(e)};tt.prototype.close=function(){js(this.g)};tt.prototype.u=function(e){if(typeof e=="string"){var t={};t.__data__=e,Bs(this.g,t)}else this.v?(t={},t.__data__=Is(e),Bs(this.g,t)):Bs(this.g,e)};tt.prototype.M=function(){this.g.j=null,delete this.j,js(this.g),delete this.g,tt.Z.M.call(this)};function ho(e){ks.call(this);var t=e.__sm__;if(t){t:{for(const n in t){e=n;break t}e=void 0}(this.i=e)&&(e=this.i,t=t!==null&&e in t?t[e]:void 0),this.data=t}else this.data=e}$(ho,ks);function lo(){Ds.call(this),this.status=1}$(lo,Ds);function Vt(e){this.g=e}$(Vt,uo);Vt.prototype.xa=function(){q(this.g,"a")};Vt.prototype.wa=function(e){q(this.g,new ho(e))};Vt.prototype.va=function(e){q(this.g,new lo(e))};Vt.prototype.ua=function(){q(this.g,"b")};En.prototype.createWebChannel=En.prototype.g;tt.prototype.send=tt.prototype.u;tt.prototype.open=tt.prototype.m;tt.prototype.close=tt.prototype.close;on.NO_ERROR=0;on.TIMEOUT=8;on.HTTP_ERROR=6;br.COMPLETE="complete";Nr.EventType=le;le.OPEN="a";le.CLOSE="b";le.ERROR="c";le.MESSAGE="d";V.prototype.listen=V.prototype.N;x.prototype.listenOnce=x.prototype.O;x.prototype.getLastError=x.prototype.La;x.prototype.getLastErrorCode=x.prototype.Da;x.prototype.getStatus=x.prototype.ba;x.prototype.getResponseJson=x.prototype.Qa;x.prototype.getResponseText=x.prototype.ga;x.prototype.send=x.prototype.ea;var mh=function(){return new En},yh=function(){return rn()},Gs=on,vh=br,wh=wt,fo={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Eh=ve,Tn=Nr,Th=x;const po="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Y.UNAUTHENTICATED=new Y(null),Y.GOOGLE_CREDENTIALS=new Y("google-credentials-uid"),Y.FIRST_PARTY=new Y("first-party-uid"),Y.MOCK_USER=new Y("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ft="9.6.5";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new Qi("@firebase/firestore");function go(){return At.logLevel}function y(e,...t){if(At.logLevel<=b.DEBUG){const n=t.map(zs);At.debug(`Firestore (${Ft}): ${e}`,...n)}}function ft(e,...t){if(At.logLevel<=b.ERROR){const n=t.map(zs);At.error(`Firestore (${Ft}): ${e}`,...n)}}function mo(e,...t){if(At.logLevel<=b.WARN){const n=t.map(zs);At.warn(`Firestore (${Ft}): ${e}`,...n)}}function zs(e){if(typeof e=="string")return e;try{return t=e,JSON.stringify(t)}catch{return e}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e="Unexpected state"){const t=`FIRESTORE (${Ft}) INTERNAL ASSERTION FAILED: `+e;throw ft(t),new Error(t)}function k(e,t){e||S()}function I(e,t){return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class w extends Ke{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(){this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Sh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable(()=>n(Y.UNAUTHENTICATED))}shutdown(){}}class Ah{constructor(t){this.t=t,this.currentUser=Y.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){let s=this.i;const i=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let r=new dt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new dt,t.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=r;t.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},a=c=>{y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(y("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new dt)}},0),o()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==t?(y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(k(typeof s.accessToken=="string"),new Ih(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return k(t===null||typeof t=="string"),new Y(t)}}class Ch{constructor(t,n,s){this.type="FirstParty",this.user=Y.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",n);const i=t.auth.getAuthHeaderValueForFirstParty([]);i&&this.headers.set("Authorization",i),s&&this.headers.set("X-Goog-Iam-Authorization-Token",s)}}class bh{constructor(t,n,s){this.h=t,this.l=n,this.m=s}getToken(){return Promise.resolve(new Ch(this.h,this.l,this.m))}start(t,n){t.enqueueRetryable(()=>n(Y.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class _h{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Nh{constructor(t){this.g=t,this.forceRefresh=!1,this.appCheck=null}start(t,n){this.o=i=>{t.enqueueRetryable(()=>(r=>(r.error!=null&&y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`),n(r.token)))(i))};const s=i=>{y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.g.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.g.getImmediate({optional:!0});i?s(i):y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(n=>n?(k(typeof n.token=="string"),new _h(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=s=>this.p(s),this.T=s=>n.writeSequenceNumber(s))}p(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.T&&this.T(t),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(e){const t=typeof self!="undefined"&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(n);else for(let s=0;s<e;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ws.I=-1;class yo{static A(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let s="";for(;s.length<20;){const i=kh(40);for(let r=0;r<i.length;++r)s.length<20&&i[r]<n&&(s+=t.charAt(i[r]%t.length))}return s}}function _(e,t){return e<t?-1:e>t?1:0}function Ut(e,t,n){return e.length===t.length&&e.every((s,i)=>n(s,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new w(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new w(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new w(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new w(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return et.fromMillis(Date.now())}static fromDate(t){return et.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),s=Math.floor(1e6*(t-1e3*n));return new et(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?_(this.nanoseconds,t.nanoseconds):_(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(t){this.timestamp=t}static fromTimestamp(t){return new C(t)}static min(){return new C(new et(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vo(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Ct(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function wo(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(t,n,s){n===void 0?n=0:n>t.length&&S(),s===void 0?s=t.length-n:s>t.length-n&&S(),this.segments=t,this.offset=n,this.len=s}get length(){return this.len}isEqual(t){return Se.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof Se?t.forEach(s=>{n.push(s)}):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,s=this.limit();n<s;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const s=Math.min(t.length,n.length);for(let i=0;i<s;i++){const r=t.get(i),o=n.get(i);if(r<o)return-1;if(r>o)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class L extends Se{construct(t,n,s){return new L(t,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const n=[];for(const s of t){if(s.indexOf("//")>=0)throw new w(f.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(i=>i.length>0))}return new L(n)}static emptyPath(){return new L([])}}const Dh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class J extends Se{construct(t,n,s){return new J(t,n,s)}static isValidIdentifier(t){return Dh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),J.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new J(["__name__"])}static fromServerFormat(t){const n=[];let s="",i=0;const r=()=>{if(s.length===0)throw new w(f.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;i<t.length;){const a=t[i];if(a==="\\"){if(i+1===t.length)throw new w(f.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new w(f.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);s+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(s+=a,i++):(r(),i++)}if(r(),o)throw new w(f.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new J(n)}static emptyPath(){return new J([])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(t){this.fields=t,t.sort(J.comparator)}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return Ut(this.fields,t.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(t){this.binaryString=t}static fromBase64String(t){const n=atob(t);return new j(n)}static fromUint8Array(t){const n=function(s){let i="";for(let r=0;r<s.length;++r)i+=String.fromCharCode(s[r]);return i}(t);return new j(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return _(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}j.EMPTY_BYTE_STRING=new j("");const Rh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function pt(e){if(k(!!e),typeof e=="string"){let t=0;const n=Rh.exec(e);if(k(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),t=Number(i)}const s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:O(e.seconds),nanos:O(e.nanos)}}function O(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function $t(e){return typeof e=="string"?j.fromBase64String(e):j.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function To(e){const t=e.mapValue.fields.__previous_value__;return Eo(t)?To(t):t}function Ae(e){const t=pt(e.mapValue.fields.__local_write_time__.timestampValue);return new et(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(e){return e==null}function In(e){return e===0&&1/e==-1/0}function Lh(e){return typeof e=="number"&&Number.isInteger(e)&&!In(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(t){this.path=t}static fromPath(t){return new T(L.fromString(t))}static fromName(t){return new T(L.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return t!==null&&L.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return L.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new T(new L(t.slice()))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Eo(e)?4:10:S()}function it(e,t){if(e===t)return!0;const n=bt(e);if(n!==bt(t))return!1;switch(n){case 0:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ae(e).isEqual(Ae(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const r=pt(s.timestampValue),o=pt(i.timestampValue);return r.seconds===o.seconds&&r.nanos===o.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(s,i){return $t(s.bytesValue).isEqual($t(i.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(s,i){return O(s.geoPointValue.latitude)===O(i.geoPointValue.latitude)&&O(s.geoPointValue.longitude)===O(i.geoPointValue.longitude)}(e,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return O(s.integerValue)===O(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const r=O(s.doubleValue),o=O(i.doubleValue);return r===o?In(r)===In(o):isNaN(r)&&isNaN(o)}return!1}(e,t);case 9:return Ut(e.arrayValue.values||[],t.arrayValue.values||[],it);case 10:return function(s,i){const r=s.mapValue.fields||{},o=i.mapValue.fields||{};if(vo(r)!==vo(o))return!1;for(const a in r)if(r.hasOwnProperty(a)&&(o[a]===void 0||!it(r[a],o[a])))return!1;return!0}(e,t);default:return S()}}function Ce(e,t){return(e.values||[]).find(n=>it(n,t))!==void 0}function jt(e,t){if(e===t)return 0;const n=bt(e),s=bt(t);if(n!==s)return _(n,s);switch(n){case 0:return 0;case 1:return _(e.booleanValue,t.booleanValue);case 2:return function(i,r){const o=O(i.integerValue||i.doubleValue),a=O(r.integerValue||r.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(e,t);case 3:return Io(e.timestampValue,t.timestampValue);case 4:return Io(Ae(e),Ae(t));case 5:return _(e.stringValue,t.stringValue);case 6:return function(i,r){const o=$t(i),a=$t(r);return o.compareTo(a)}(e.bytesValue,t.bytesValue);case 7:return function(i,r){const o=i.split("/"),a=r.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=_(o[c],a[c]);if(u!==0)return u}return _(o.length,a.length)}(e.referenceValue,t.referenceValue);case 8:return function(i,r){const o=_(O(i.latitude),O(r.latitude));return o!==0?o:_(O(i.longitude),O(r.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(i,r){const o=i.values||[],a=r.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=jt(o[c],a[c]);if(u)return u}return _(o.length,a.length)}(e.arrayValue,t.arrayValue);case 10:return function(i,r){const o=i.fields||{},a=Object.keys(o),c=r.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let h=0;h<a.length&&h<u.length;++h){const l=_(a[h],u[h]);if(l!==0)return l;const d=jt(o[a[h]],c[u[h]]);if(d!==0)return d}return _(a.length,u.length)}(e.mapValue,t.mapValue);default:throw S()}}function Io(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return _(e,t);const n=pt(e),s=pt(t),i=_(n.seconds,s.seconds);return i!==0?i:_(n.nanos,s.nanos)}function Xs(e){return Ys(e)}function Ys(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(s){const i=pt(s);return`time(${i.seconds},${i.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?$t(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,T.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(s){let i="[",r=!0;for(const o of s.values||[])r?r=!1:i+=",",i+=Ys(o);return i+"]"}(e.arrayValue):"mapValue"in e?function(s){const i=Object.keys(s.fields||{}).sort();let r="{",o=!0;for(const a of i)o?o=!1:r+=",",r+=`${a}:${Ys(s.fields[a])}`;return r+"}"}(e.mapValue):S();var t,n}function Js(e){return!!e&&"integerValue"in e}function Zs(e){return!!e&&"arrayValue"in e}function So(e){return!!e&&"nullValue"in e}function Ao(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Sn(e){return!!e&&"mapValue"in e}function be(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Ct(e.mapValue.fields,(n,s)=>t.mapValue.fields[n]=be(s)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=be(e.arrayValue.values[n]);return t}return Object.assign({},e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(t){this.value=t}static empty(){return new nt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let s=0;s<t.length-1;++s)if(n=(n.mapValue.fields||{})[t.get(s)],!Sn(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=be(n)}setAll(t){let n=J.emptyPath(),s={},i=[];t.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,s,i),s={},i=[],n=a.popLast()}o?s[a.lastSegment()]=be(o):i.push(a.lastSegment())});const r=this.getFieldsMap(n);this.applyChanges(r,s,i)}delete(t){const n=this.field(t.popLast());Sn(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return it(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<t.length;++s){let i=n.mapValue.fields[t.get(s)];Sn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[t.get(s)]=i),n=i}return n.mapValue.fields}applyChanges(t,n,s){Ct(n,(i,r)=>t[i]=r);for(const i of s)delete t[i]}clone(){return new nt(be(this.value))}}function Co(e){const t=[];return Ct(e.fields,(n,s)=>{const i=new J([n]);if(Sn(s)){const r=Co(s.mapValue).fields;if(r.length===0)t.push(i);else for(const o of r)t.push(i.child(o))}else t.push(i)}),new Qs(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(t,n,s,i,r){this.key=t,this.documentType=n,this.version=s,this.data=i,this.documentState=r}static newInvalidDocument(t){return new G(t,0,C.min(),nt.empty(),0)}static newFoundDocument(t,n,s){return new G(t,1,n,s,0)}static newNoDocument(t,n){return new G(t,2,n,nt.empty(),0)}static newUnknownDocument(t,n){return new G(t,3,n,nt.empty(),2)}convertToFoundDocument(t,n){return this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=nt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof G&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new G(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(t,n=null,s=[],i=[],r=null,o=null,a=null){this.path=t,this.collectionGroup=n,this.orderBy=s,this.filters=i,this.limit=r,this.startAt=o,this.endAt=a,this.R=null}}function bo(e,t=null,n=[],s=[],i=null,r=null,o=null){return new xh(e,t,n,s,i,r,o)}function ti(e){const t=I(e);if(t.R===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map(s=>Mh(s)).join(","),n+="|ob:",n+=t.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),qt(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=An(t.startAt)),t.endAt&&(n+="|ub:",n+=An(t.endAt)),t.R=n}return t.R}function Oh(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(n=>{return`${(s=n).field.canonicalString()} ${s.op} ${Xs(s.value)}`;var s}).join(", ")}]`),qt(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(n=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(n)).join(", ")}]`),e.startAt&&(t+=", startAt: "+An(e.startAt)),e.endAt&&(t+=", endAt: "+An(e.endAt)),`Target(${t})`}function ei(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++)if(!Bh(e.orderBy[i],t.orderBy[i]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let i=0;i<e.filters.length;i++)if(n=e.filters[i],s=t.filters[i],n.op!==s.op||!n.field.isEqual(s.field)||!it(n.value,s.value))return!1;var n,s;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!ko(e.startAt,t.startAt)&&ko(e.endAt,t.endAt)}function ni(e){return T.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}class Z extends class{}{constructor(t,n,s){super(),this.field=t,this.op=n,this.value=s}static create(t,n,s){return t.isKeyField()?n==="in"||n==="not-in"?this.P(t,n,s):new Ph(t,n,s):n==="array-contains"?new Uh(t,s):n==="in"?new $h(t,s):n==="not-in"?new qh(t,s):n==="array-contains-any"?new jh(t,s):new Z(t,n,s)}static P(t,n,s){return n==="in"?new Vh(t,s):new Fh(t,s)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.v(jt(n,this.value)):n!==null&&bt(this.value)===bt(n)&&this.v(jt(n,this.value))}v(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return S()}}V(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}function Mh(e){return e.field.canonicalString()+e.op.toString()+Xs(e.value)}class Ph extends Z{constructor(t,n,s){super(t,n,s),this.key=T.fromName(s.referenceValue)}matches(t){const n=T.comparator(t.key,this.key);return this.v(n)}}class Vh extends Z{constructor(t,n){super(t,"in",n),this.keys=_o("in",n)}matches(t){return this.keys.some(n=>n.isEqual(t.key))}}class Fh extends Z{constructor(t,n){super(t,"not-in",n),this.keys=_o("not-in",n)}matches(t){return!this.keys.some(n=>n.isEqual(t.key))}}function _o(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>T.fromName(s.referenceValue))}class Uh extends Z{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return Zs(n)&&Ce(n.arrayValue,this.value)}}class $h extends Z{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&Ce(this.value.arrayValue,n)}}class qh extends Z{constructor(t,n){super(t,"not-in",n)}matches(t){if(Ce(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!Ce(this.value.arrayValue,n)}}class jh extends Z{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!Zs(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Ce(this.value.arrayValue,s))}}class si{constructor(t,n){this.position=t,this.before=n}}function An(e){return`${e.before?"b":"a"}:${e.position.map(t=>Xs(t)).join(",")}`}class _e{constructor(t,n="asc"){this.field=t,this.dir=n}}function Bh(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}function No(e,t,n){let s=0;for(let i=0;i<e.position.length;i++){const r=t[i],o=e.position[i];if(r.field.isKeyField()?s=T.comparator(T.fromName(o.referenceValue),n.key):s=jt(o,n.data.field(r.field)),r.dir==="desc"&&(s*=-1),s!==0)break}return e.before?s<=0:s<0}function ko(e,t){if(e===null)return t===null;if(t===null||e.before!==t.before||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!it(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t,n=null,s=[],i=[],r=null,o="F",a=null,c=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=c,this.S=null,this.D=null,this.startAt,this.endAt}}function Hh(e,t,n,s,i,r,o,a){return new Cn(e,t,n,s,i,r,o,a)}function ii(e){return new Cn(e)}function bn(e){return!qt(e.limit)&&e.limitType==="F"}function ri(e){return!qt(e.limit)&&e.limitType==="L"}function Kh(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function Gh(e){for(const t of e.filters)if(t.V())return t.field;return null}function zh(e){return e.collectionGroup!==null}function Ne(e){const t=I(e);if(t.S===null){t.S=[];const n=Gh(t),s=Kh(t);if(n!==null&&s===null)n.isKeyField()||t.S.push(new _e(n)),t.S.push(new _e(J.keyField(),"asc"));else{let i=!1;for(const r of t.explicitOrderBy)t.S.push(r),r.field.isKeyField()&&(i=!0);if(!i){const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.S.push(new _e(J.keyField(),r))}}}return t.S}function _t(e){const t=I(e);if(!t.D)if(t.limitType==="F")t.D=bo(t.path,t.collectionGroup,Ne(t),t.filters,t.limit,t.startAt,t.endAt);else{const n=[];for(const r of Ne(t)){const o=r.dir==="desc"?"asc":"desc";n.push(new _e(r.field,o))}const s=t.endAt?new si(t.endAt.position,!t.endAt.before):null,i=t.startAt?new si(t.startAt.position,!t.startAt.before):null;t.D=bo(t.path,t.collectionGroup,n,t.filters,t.limit,s,i)}return t.D}function Wh(e,t,n){return new Cn(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function _n(e,t){return ei(_t(e),_t(t))&&e.limitType===t.limitType}function Do(e){return`${ti(_t(e))}|lt:${e.limitType}`}function oi(e){return`Query(target=${Oh(_t(e))}; limitType=${e.limitType})`}function Nn(e,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):T.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(e,t)&&function(n,s){for(const i of n.explicitOrderBy)if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(e,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(e,t)&&function(n,s){return!(n.startAt&&!No(n.startAt,Ne(n),s)||n.endAt&&No(n.endAt,Ne(n),s))}(e,t)}function Ro(e){return(t,n)=>{let s=!1;for(const i of Ne(e)){const r=Qh(i,t,n);if(r!==0)return r;s=s||i.field.isKeyField()}return 0}}function Qh(e,t,n){const s=e.field.isKeyField()?T.comparator(t.key,n.key):function(i,r,o){const a=r.data.field(i),c=o.data.field(i);return a!==null&&c!==null?jt(a,c):S()}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return-1*s;default:return S()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(e,t){if(e.C){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:In(t)?"-0":t}}function xo(e){return{integerValue:""+e}}function Xh(e,t){return Lh(t)?xo(t):Lo(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(){this._=void 0}}function Yh(e,t,n){return e instanceof Dn?function(s,i){const r={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&(r.fields.__previous_value__=i),{mapValue:r}}(n,t):e instanceof ke?Mo(e,t):e instanceof De?Po(e,t):function(s,i){const r=Oo(s,i),o=Vo(r)+Vo(s.N);return Js(r)&&Js(s.N)?xo(o):Lo(s.k,o)}(e,t)}function Jh(e,t,n){return e instanceof ke?Mo(e,t):e instanceof De?Po(e,t):n}function Oo(e,t){return e instanceof Rn?Js(n=t)||function(s){return!!s&&"doubleValue"in s}(n)?t:{integerValue:0}:null;var n}class Dn extends kn{}class ke extends kn{constructor(t){super(),this.elements=t}}function Mo(e,t){const n=Fo(t);for(const s of e.elements)n.some(i=>it(i,s))||n.push(s);return{arrayValue:{values:n}}}class De extends kn{constructor(t){super(),this.elements=t}}function Po(e,t){let n=Fo(t);for(const s of e.elements)n=n.filter(i=>!it(i,s));return{arrayValue:{values:n}}}class Rn extends kn{constructor(t,n){super(),this.k=t,this.N=n}}function Vo(e){return O(e.integerValue||e.doubleValue)}function Fo(e){return Zs(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function Zh(e,t){return e.field.isEqual(t.field)&&function(n,s){return n instanceof ke&&s instanceof ke||n instanceof De&&s instanceof De?Ut(n.elements,s.elements,it):n instanceof Rn&&s instanceof Rn?it(n.N,s.N):n instanceof Dn&&s instanceof Dn}(e.transform,t.transform)}class tl{constructor(t,n){this.version=t,this.transformResults=n}}class Bt{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new Bt}static exists(t){return new Bt(void 0,t)}static updateTime(t){return new Bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ln(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class xn{}function el(e,t,n){e instanceof ci?function(s,i,r){const o=s.value.clone(),a=jo(s.fieldTransforms,i,r.transformResults);o.setAll(a),i.convertToFoundDocument(r.version,o).setHasCommittedMutations()}(e,t,n):e instanceof Ht?function(s,i,r){if(!Ln(s.precondition,i))return void i.convertToUnknownDocument(r.version);const o=jo(s.fieldTransforms,i,r.transformResults),a=i.data;a.setAll(qo(s)),a.setAll(o),i.convertToFoundDocument(r.version,a).setHasCommittedMutations()}(e,t,n):function(s,i,r){i.convertToNoDocument(r.version).setHasCommittedMutations()}(0,t,n)}function ai(e,t,n){e instanceof ci?function(s,i,r){if(!Ln(s.precondition,i))return;const o=s.value.clone(),a=Bo(s.fieldTransforms,r,i);o.setAll(a),i.convertToFoundDocument($o(i),o).setHasLocalMutations()}(e,t,n):e instanceof Ht?function(s,i,r){if(!Ln(s.precondition,i))return;const o=Bo(s.fieldTransforms,r,i),a=i.data;a.setAll(qo(s)),a.setAll(o),i.convertToFoundDocument($o(i),a).setHasLocalMutations()}(e,t,n):function(s,i){Ln(s.precondition,i)&&i.convertToNoDocument(C.min())}(e,t)}function nl(e,t){let n=null;for(const s of e.fieldTransforms){const i=t.data.field(s.field),r=Oo(s.transform,i||null);r!=null&&(n==null&&(n=nt.empty()),n.set(s.field,r))}return n||null}function Uo(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Ut(n,s,(i,r)=>Zh(i,r))}(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}function $o(e){return e.isFoundDocument()?e.version:C.min()}class ci extends xn{constructor(t,n,s,i=[]){super(),this.key=t,this.value=n,this.precondition=s,this.fieldTransforms=i,this.type=0}}class Ht extends xn{constructor(t,n,s,i,r=[]){super(),this.key=t,this.data=n,this.fieldMask=s,this.precondition=i,this.fieldTransforms=r,this.type=1}}function qo(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=e.data.field(n);t.set(n,s)}}),t}function jo(e,t,n){const s=new Map;k(e.length===n.length);for(let i=0;i<n.length;i++){const r=e[i],o=r.transform,a=t.data.field(r.field);s.set(r.field,Jh(o,a,n[i]))}return s}function Bo(e,t,n){const s=new Map;for(const i of e){const r=i.transform,o=n.data.field(i.field);s.set(i.field,Yh(r,o,t))}return s}class sl extends xn{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}}class il extends xn{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(t){this.count=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var M,A;function ol(e){switch(e){default:return S();case f.CANCELLED:case f.UNKNOWN:case f.DEADLINE_EXCEEDED:case f.RESOURCE_EXHAUSTED:case f.INTERNAL:case f.UNAVAILABLE:case f.UNAUTHENTICATED:return!1;case f.INVALID_ARGUMENT:case f.NOT_FOUND:case f.ALREADY_EXISTS:case f.PERMISSION_DENIED:case f.FAILED_PRECONDITION:case f.ABORTED:case f.OUT_OF_RANGE:case f.UNIMPLEMENTED:case f.DATA_LOSS:return!0}}function Ho(e){if(e===void 0)return ft("GRPC error has no .code"),f.UNKNOWN;switch(e){case M.OK:return f.OK;case M.CANCELLED:return f.CANCELLED;case M.UNKNOWN:return f.UNKNOWN;case M.DEADLINE_EXCEEDED:return f.DEADLINE_EXCEEDED;case M.RESOURCE_EXHAUSTED:return f.RESOURCE_EXHAUSTED;case M.INTERNAL:return f.INTERNAL;case M.UNAVAILABLE:return f.UNAVAILABLE;case M.UNAUTHENTICATED:return f.UNAUTHENTICATED;case M.INVALID_ARGUMENT:return f.INVALID_ARGUMENT;case M.NOT_FOUND:return f.NOT_FOUND;case M.ALREADY_EXISTS:return f.ALREADY_EXISTS;case M.PERMISSION_DENIED:return f.PERMISSION_DENIED;case M.FAILED_PRECONDITION:return f.FAILED_PRECONDITION;case M.ABORTED:return f.ABORTED;case M.OUT_OF_RANGE:return f.OUT_OF_RANGE;case M.UNIMPLEMENTED:return f.UNIMPLEMENTED;case M.DATA_LOSS:return f.DATA_LOSS;default:return S()}}(A=M||(M={}))[A.OK=0]="OK",A[A.CANCELLED=1]="CANCELLED",A[A.UNKNOWN=2]="UNKNOWN",A[A.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",A[A.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",A[A.NOT_FOUND=5]="NOT_FOUND",A[A.ALREADY_EXISTS=6]="ALREADY_EXISTS",A[A.PERMISSION_DENIED=7]="PERMISSION_DENIED",A[A.UNAUTHENTICATED=16]="UNAUTHENTICATED",A[A.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",A[A.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",A[A.ABORTED=10]="ABORTED",A[A.OUT_OF_RANGE=11]="OUT_OF_RANGE",A[A.UNIMPLEMENTED=12]="UNIMPLEMENTED",A[A.INTERNAL=13]="INTERNAL",A[A.UNAVAILABLE=14]="UNAVAILABLE",A[A.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(t,n){this.comparator=t,this.root=n||B.EMPTY}insert(t,n){return new z(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,B.BLACK,null,null))}remove(t){return new z(this.comparator,this.root.remove(t,this.comparator).copy(null,null,B.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(t){let n=0,s=this.root;for(;!s.isEmpty();){const i=this.comparator(t,s.key);if(i===0)return n+s.left.size;i<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((n,s)=>(t(n,s),!1))}toString(){const t=[];return this.inorderTraversal((n,s)=>(t.push(`${n}:${s}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new On(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new On(this.root,t,this.comparator,!1)}getReverseIterator(){return new On(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new On(this.root,t,this.comparator,!0)}}class On{constructor(t,n,s,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=n?s(t.key,n):1,i&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(r===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class B{constructor(t,n,s,i,r){this.key=t,this.value=n,this.color=s!=null?s:B.RED,this.left=i!=null?i:B.EMPTY,this.right=r!=null?r:B.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,s,i,r){return new B(t!=null?t:this.key,n!=null?n:this.value,s!=null?s:this.color,i!=null?i:this.left,r!=null?r:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,s){let i=this;const r=s(t,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(t,n,s),null):r===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(t,n,s)),i.fixUp()}removeMin(){if(this.left.isEmpty())return B.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let s,i=this;if(n(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(t,i.key)===0){if(i.right.isEmpty())return B.EMPTY;s=i.right.min(),i=i.copy(s.key,s.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,B.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,B.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw S();const t=this.left.check();if(t!==this.right.check())throw S();return t+(this.isRed()?0:1)}}B.EMPTY=null,B.RED=!0,B.BLACK=!1;B.EMPTY=new class{constructor(){this.size=0}get key(){throw S()}get value(){throw S()}get color(){throw S()}get left(){throw S()}get right(){throw S()}copy(e,t,n,s,i){return this}insert(e,t,n){return new B(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(t){this.comparator=t,this.data=new z(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((n,s)=>(t(n),!1))}forEachInRange(t,n){const s=this.data.getIteratorFrom(t[0]);for(;s.hasNext();){const i=s.getNext();if(this.comparator(i.key,t[1])>=0)return;n(i.key)}}forEachWhile(t,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!t(s.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new Ko(this.data.getIterator())}getIteratorFrom(t){return new Ko(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach(s=>{n=n.add(s)}),n}isEqual(t){if(!(t instanceof H)||this.size!==t.size)return!1;const n=this.data.getIterator(),s=t.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,r=s.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(n=>{t.push(n)}),t}toString(){const t=[];return this.forEach(n=>t.push(n)),"SortedSet("+t.toString()+")"}copy(t){const n=new H(this.comparator);return n.data=t,n}}class Ko{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al=new z(T.comparator);function Nt(){return al}const cl=new z(T.comparator);function ui(){return cl}const ul=new z(T.comparator);function hl(){return ul}const ll=new H(T.comparator);function D(...e){let t=ll;for(const n of e)t=t.add(n);return t}const fl=new H(_);function Go(){return fl}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(t,n,s,i,r){this.snapshotVersion=t,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,n){const s=new Map;return s.set(t,Re.createSynthesizedTargetChangeForCurrentChange(t,n)),new Mn(C.min(),s,Go(),Nt(),D())}}class Re{constructor(t,n,s,i,r){this.resumeToken=t,this.current=n,this.addedDocuments=s,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,n){return new Re(j.EMPTY_BYTE_STRING,n,D(),D(),D())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(t,n,s,i){this.$=t,this.removedTargetIds=n,this.key=s,this.O=i}}class zo{constructor(t,n){this.targetId=t,this.M=n}}class Wo{constructor(t,n,s=j.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=n,this.resumeToken=s,this.cause=i}}class Qo{constructor(){this.F=0,this.L=Yo(),this.B=j.EMPTY_BYTE_STRING,this.U=!1,this.q=!0}get current(){return this.U}get resumeToken(){return this.B}get K(){return this.F!==0}get j(){return this.q}W(t){t.approximateByteSize()>0&&(this.q=!0,this.B=t)}G(){let t=D(),n=D(),s=D();return this.L.forEach((i,r)=>{switch(r){case 0:t=t.add(i);break;case 2:n=n.add(i);break;case 1:s=s.add(i);break;default:S()}}),new Re(this.B,this.U,t,n,s)}H(){this.q=!1,this.L=Yo()}J(t,n){this.q=!0,this.L=this.L.insert(t,n)}Y(t){this.q=!0,this.L=this.L.remove(t)}X(){this.F+=1}Z(){this.F-=1}tt(){this.q=!0,this.U=!0}}class dl{constructor(t){this.et=t,this.nt=new Map,this.st=Nt(),this.it=Xo(),this.rt=new H(_)}ot(t){for(const n of t.$)t.O&&t.O.isFoundDocument()?this.ct(n,t.O):this.at(n,t.key,t.O);for(const n of t.removedTargetIds)this.at(n,t.key,t.O)}ut(t){this.forEachTarget(t,n=>{const s=this.ht(n);switch(t.state){case 0:this.lt(n)&&s.W(t.resumeToken);break;case 1:s.Z(),s.K||s.H(),s.W(t.resumeToken);break;case 2:s.Z(),s.K||this.removeTarget(n);break;case 3:this.lt(n)&&(s.tt(),s.W(t.resumeToken));break;case 4:this.lt(n)&&(this.ft(n),s.W(t.resumeToken));break;default:S()}})}forEachTarget(t,n){t.targetIds.length>0?t.targetIds.forEach(n):this.nt.forEach((s,i)=>{this.lt(i)&&n(i)})}dt(t){const n=t.targetId,s=t.M.count,i=this.wt(n);if(i){const r=i.target;if(ni(r))if(s===0){const o=new T(r.path);this.at(n,o,G.newNoDocument(o,C.min()))}else k(s===1);else this._t(n)!==s&&(this.ft(n),this.rt=this.rt.add(n))}}gt(t){const n=new Map;this.nt.forEach((r,o)=>{const a=this.wt(o);if(a){if(r.current&&ni(a.target)){const c=new T(a.target.path);this.st.get(c)!==null||this.yt(o,c)||this.at(o,c,G.newNoDocument(c,t))}r.j&&(n.set(o,r.G()),r.H())}});let s=D();this.it.forEach((r,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.wt(c);return!u||u.purpose===2||(a=!1,!1)}),a&&(s=s.add(r))});const i=new Mn(t,n,this.rt,this.st,s);return this.st=Nt(),this.it=Xo(),this.rt=new H(_),i}ct(t,n){if(!this.lt(t))return;const s=this.yt(t,n.key)?2:0;this.ht(t).J(n.key,s),this.st=this.st.insert(n.key,n),this.it=this.it.insert(n.key,this.Tt(n.key).add(t))}at(t,n,s){if(!this.lt(t))return;const i=this.ht(t);this.yt(t,n)?i.J(n,1):i.Y(n),this.it=this.it.insert(n,this.Tt(n).delete(t)),s&&(this.st=this.st.insert(n,s))}removeTarget(t){this.nt.delete(t)}_t(t){const n=this.ht(t).G();return this.et.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}X(t){this.ht(t).X()}ht(t){let n=this.nt.get(t);return n||(n=new Qo,this.nt.set(t,n)),n}Tt(t){let n=this.it.get(t);return n||(n=new H(_),this.it=this.it.insert(t,n)),n}lt(t){const n=this.wt(t)!==null;return n||y("WatchChangeAggregator","Detected inactive target",t),n}wt(t){const n=this.nt.get(t);return n&&n.K?null:this.et.Et(t)}ft(t){this.nt.set(t,new Qo),this.et.getRemoteKeysForTarget(t).forEach(n=>{this.at(t,n,null)})}yt(t,n){return this.et.getRemoteKeysForTarget(t).has(n)}}function Xo(){return new z(T.comparator)}function Yo(){return new z(T.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),gl=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))();class ml{constructor(t,n){this.databaseId=t,this.C=n}}function Vn(e,t){return e.C?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Jo(e,t){return e.C?t.toBase64():t.toUint8Array()}function yl(e,t){return Vn(e,t.toTimestamp())}function ut(e){return k(!!e),C.fromTimestamp(function(t){const n=pt(t);return new et(n.seconds,n.nanos)}(e))}function hi(e,t){return function(n){return new L(["projects",n.projectId,"databases",n.database])}(e).child("documents").child(t).canonicalString()}function Zo(e){const t=L.fromString(e);return k(ra(t)),t}function li(e,t){return hi(e.databaseId,t.path)}function fi(e,t){const n=Zo(t);if(n.get(1)!==e.databaseId.projectId)throw new w(f.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new w(f.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new T(ta(n))}function di(e,t){return hi(e.databaseId,t)}function vl(e){const t=Zo(e);return t.length===4?L.emptyPath():ta(t)}function pi(e){return new L(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function ta(e){return k(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function ea(e,t,n){return{name:li(e,t),fields:n.value.mapValue.fields}}function wl(e,t){let n;if("targetChange"in t){t.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:S()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],r=function(c,u){return c.C?(k(u===void 0||typeof u=="string"),j.fromBase64String(u||"")):(k(u===void 0||u instanceof Uint8Array),j.fromUint8Array(u||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(c){const u=c.code===void 0?f.UNKNOWN:Ho(c.code);return new w(u,c.message||"")}(o);n=new Wo(s,i,r,a||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const i=fi(e,s.document.name),r=ut(s.document.updateTime),o=new nt({mapValue:{fields:s.document.fields}}),a=G.newFoundDocument(i,r,o),c=s.targetIds||[],u=s.removedTargetIds||[];n=new Pn(c,u,a.key,a)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const i=fi(e,s.document),r=s.readTime?ut(s.readTime):C.min(),o=G.newNoDocument(i,r),a=s.removedTargetIds||[];n=new Pn([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const i=fi(e,s.document),r=s.removedTargetIds||[];n=new Pn([],r,i,null)}else{if(!("filter"in t))return S();{t.filter;const s=t.filter;s.targetId;const i=s.count||0,r=new rl(i),o=s.targetId;n=new zo(o,r)}}return n}function El(e,t){let n;if(t instanceof ci)n={update:ea(e,t.key,t.value)};else if(t instanceof sl)n={delete:li(e,t.key)};else if(t instanceof Ht)n={update:ea(e,t.key,t.data),updateMask:Dl(t.fieldMask)};else{if(!(t instanceof il))return S();n={verify:li(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(s=>function(i,r){const o=r.transform;if(o instanceof Dn)return{fieldPath:r.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof ke)return{fieldPath:r.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof De)return{fieldPath:r.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Rn)return{fieldPath:r.field.canonicalString(),increment:o.N};throw S()}(0,s))),t.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:yl(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:S()}(e,t.precondition)),n}function Tl(e,t){return e&&e.length>0?(k(t!==void 0),e.map(n=>function(s,i){let r=s.updateTime?ut(s.updateTime):ut(i);return r.isEqual(C.min())&&(r=ut(i)),new tl(r,s.transformResults||[])}(n,t))):[]}function Il(e,t){return{documents:[di(e,t.path)]}}function Sl(e,t){const n={structuredQuery:{}},s=t.path;t.collectionGroup!==null?(n.parent=di(e,s),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=di(e,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const i=function(a){if(a.length===0)return;const c=a.map(u=>function(h){if(h.op==="=="){if(Ao(h.value))return{unaryFilter:{field:Kt(h.field),op:"IS_NAN"}};if(So(h.value))return{unaryFilter:{field:Kt(h.field),op:"IS_NULL"}}}else if(h.op==="!="){if(Ao(h.value))return{unaryFilter:{field:Kt(h.field),op:"IS_NOT_NAN"}};if(So(h.value))return{unaryFilter:{field:Kt(h.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kt(h.field),op:_l(h.op),value:h.value}}}(u));return c.length===1?c[0]:{compositeFilter:{op:"AND",filters:c}}}(t.filters);i&&(n.structuredQuery.where=i);const r=function(a){if(a.length!==0)return a.map(c=>function(u){return{field:Kt(u.field),direction:bl(u.dir)}}(c))}(t.orderBy);r&&(n.structuredQuery.orderBy=r);const o=function(a,c){return a.C||qt(c)?c:{value:c}}(e,t.limit);return o!==null&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt=sa(t.startAt)),t.endAt&&(n.structuredQuery.endAt=sa(t.endAt)),n}function Al(e){let t=vl(e.parent);const n=e.structuredQuery,s=n.from?n.from.length:0;let i=null;if(s>0){k(s===1);const h=n.from[0];h.allDescendants?i=h.collectionId:t=t.child(h.collectionId)}let r=[];n.where&&(r=na(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(h=>function(l){return new _e(Gt(l.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(l.direction))}(h)));let a=null;n.limit&&(a=function(h){let l;return l=typeof h=="object"?h.value:h,qt(l)?null:l}(n.limit));let c=null;n.startAt&&(c=ia(n.startAt));let u=null;return n.endAt&&(u=ia(n.endAt)),Hh(t,i,o,r,a,"F",c,u)}function Cl(e,t){const n=function(s,i){switch(i){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return S()}}(0,t.purpose);return n==null?null:{"goog-listen-tags":n}}function na(e){return e?e.unaryFilter!==void 0?[kl(e)]:e.fieldFilter!==void 0?[Nl(e)]:e.compositeFilter!==void 0?e.compositeFilter.filters.map(t=>na(t)).reduce((t,n)=>t.concat(n)):S():[]}function sa(e){return{before:e.before,values:e.position}}function ia(e){const t=!!e.before,n=e.values||[];return new si(n,t)}function bl(e){return pl[e]}function _l(e){return gl[e]}function Kt(e){return{fieldPath:e.canonicalString()}}function Gt(e){return J.fromServerFormat(e.fieldPath)}function Nl(e){return Z.create(Gt(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return S()}}(e.fieldFilter.op),e.fieldFilter.value)}function kl(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Gt(e.unaryFilter.field);return Z.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Gt(e.unaryFilter.field);return Z.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Gt(e.unaryFilter.field);return Z.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Gt(e.unaryFilter.field);return Z.create(i,"!=",{nullValue:"NULL_VALUE"});default:return S()}}function Dl(e){const t=[];return e.fields.forEach(n=>t.push(n.canonicalString())),{fieldPaths:t}}function ra(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}const Rl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ll{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&S(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new p((s,i)=>{this.nextCallback=r=>{this.wrapSuccess(t,r).next(s,i)},this.catchCallback=r=>{this.wrapFailure(n,r).next(s,i)}})}toPromise(){return new Promise((t,n)=>{this.next(t,n)})}wrapUserFunction(t){try{const n=t();return n instanceof p?n:p.resolve(n)}catch(n){return p.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction(()=>t(n)):p.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction(()=>t(n)):p.reject(n)}static resolve(t){return new p((n,s)=>{n(t)})}static reject(t){return new p((n,s)=>{s(t)})}static waitFor(t){return new p((n,s)=>{let i=0,r=0,o=!1;t.forEach(a=>{++i,a.next(()=>{++r,o&&r===i&&n()},c=>s(c))}),o=!0,r===i&&n()})}static or(t){let n=p.resolve(!1);for(const s of t)n=n.next(i=>i?p.resolve(i):s());return n}static forEach(t,n){const s=[];return t.forEach((i,r)=>{s.push(n.call(this,i,r))}),this.waitFor(s)}}function Le(e){return e.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(t,n,s,i){this.batchId=t,this.localWriteTime=n,this.baseMutations=s,this.mutations=i}applyToRemoteDocument(t,n){const s=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(t.key)&&el(r,t,s[i])}}applyToLocalView(t){for(const n of this.baseMutations)n.key.isEqual(t.key)&&ai(n,t,this.localWriteTime);for(const n of this.mutations)n.key.isEqual(t.key)&&ai(n,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach(n=>{const s=t.get(n.key),i=s;this.applyToLocalView(i),s.isValidDocument()||i.convertToNoDocument(C.min())})}keys(){return this.mutations.reduce((t,n)=>t.add(n.key),D())}isEqual(t){return this.batchId===t.batchId&&Ut(this.mutations,t.mutations,(n,s)=>Uo(n,s))&&Ut(this.baseMutations,t.baseMutations,(n,s)=>Uo(n,s))}}class gi{constructor(t,n,s,i){this.batch=t,this.commitVersion=n,this.mutationResults=s,this.docVersions=i}static from(t,n,s){k(t.mutations.length===s.length);let i=hl();const r=t.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,s[o].version);return new gi(t,n,s,i)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,n,s,i,r=C.min(),o=C.min(),a=j.EMPTY_BYTE_STRING){this.target=t,this.targetId=n,this.purpose=s,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(t){return new kt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,n){return new kt(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(t){this.Gt=t}}function Ml(e){const t=Al({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?Wh(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(){this.zt=new Vl}addToCollectionParentIndex(t,n){return this.zt.add(n),p.resolve()}getCollectionParents(t,n){return p.resolve(this.zt.getEntries(n))}}class Vl{constructor(){this.index={}}add(t){const n=t.lastSegment(),s=t.popLast(),i=this.index[n]||new H(L.comparator),r=!i.has(s);return this.index[n]=i.add(s),r}has(t){const n=t.lastSegment(),s=t.popLast(),i=this.index[n];return i&&i.has(s)}getEntries(t){return(this.index[t]||new H(L.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t){this.se=t}next(){return this.se+=2,this.se}static ie(){return new zt(0)}static re(){return new zt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xe(e){if(e.code!==f.FAILED_PRECONDITION||e.message!==Rl)throw e;y("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={}}get(t){const n=this.mapKeyFn(t),s=this.inner[n];if(s!==void 0){for(const[i,r]of s)if(this.equalsFn(i,t))return r}}has(t){return this.get(t)!==void 0}set(t,n){const s=this.mapKeyFn(t),i=this.inner[s];if(i!==void 0){for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],t))return void(i[r]=[t,n]);i.push([t,n])}else this.inner[s]=[[t,n]]}delete(t){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return!1;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return s.length===1?delete this.inner[n]:s.splice(i,1),!0;return!1}forEach(t){Ct(this.inner,(n,s)=>{for(const[i,r]of s)t(i,r)})}isEmpty(){return wo(this.inner)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(){this.changes=new Oe(t=>t.toString(),(t,n)=>t.isEqual(n)),this.changesApplied=!1}getReadTime(t){const n=this.changes.get(t);return n?n.readTime:C.min()}addEntry(t,n){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:n})}removeEntry(t,n=null){this.assertNotApplied(),this.changes.set(t,{document:G.newInvalidDocument(t),readTime:n})}getEntry(t,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?p.resolve(s.document):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(t,n,s){this.Je=t,this.An=n,this.Jt=s}Rn(t,n){return this.An.getAllMutationBatchesAffectingDocumentKey(t,n).next(s=>this.bn(t,n,s))}bn(t,n,s){return this.Je.getEntry(t,n).next(i=>{for(const r of s)r.applyToLocalView(i);return i})}Pn(t,n){t.forEach((s,i)=>{for(const r of n)r.applyToLocalView(i)})}vn(t,n){return this.Je.getEntries(t,n).next(s=>this.Vn(t,s).next(()=>s))}Vn(t,n){return this.An.getAllMutationBatchesAffectingDocumentKeys(t,n).next(s=>this.Pn(n,s))}getDocumentsMatchingQuery(t,n,s){return function(i){return T.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}(n)?this.Sn(t,n.path):zh(n)?this.Dn(t,n,s):this.Cn(t,n,s)}Sn(t,n){return this.Rn(t,new T(n)).next(s=>{let i=ui();return s.isFoundDocument()&&(i=i.insert(s.key,s)),i})}Dn(t,n,s){const i=n.collectionGroup;let r=ui();return this.Jt.getCollectionParents(t,i).next(o=>p.forEach(o,a=>{const c=function(u,h){return new Cn(h,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(i));return this.Cn(t,c,s).next(u=>{u.forEach((h,l)=>{r=r.insert(h,l)})})}).next(()=>r))}Cn(t,n,s){let i,r;return this.Je.getDocumentsMatchingQuery(t,n,s).next(o=>(i=o,this.An.getAllMutationBatchesAffectingQuery(t,n))).next(o=>(r=o,this.Nn(t,r,i).next(a=>{i=a;for(const c of r)for(const u of c.mutations){const h=u.key;let l=i.get(h);l==null&&(l=G.newInvalidDocument(h),i=i.insert(h,l)),ai(u,l,c.localWriteTime),l.isFoundDocument()||(i=i.remove(h))}}))).next(()=>(i.forEach((o,a)=>{Nn(n,a)||(i=i.remove(o))}),i))}Nn(t,n,s){let i=D();for(const o of n)for(const a of o.mutations)a instanceof Ht&&s.get(a.key)===null&&(i=i.add(a.key));let r=s;return this.Je.getEntries(t,i).next(o=>(o.forEach((a,c)=>{c.isFoundDocument()&&(r=r.insert(a,c))}),r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(t,n,s,i){this.targetId=t,this.fromCache=n,this.kn=s,this.xn=i}static $n(t,n){let s=D(),i=D();for(const r of n.docChanges)switch(r.type){case 0:s=s.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new mi(t,n.fromCache,s,i)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{On(t){this.Mn=t}getDocumentsMatchingQuery(t,n,s,i){return function(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}(n)||s.isEqual(C.min())?this.Fn(t,n):this.Mn.vn(t,i).next(r=>{const o=this.Ln(n,r);return(bn(n)||ri(n))&&this.Bn(n.limitType,o,i,s)?this.Fn(t,n):(go()<=b.DEBUG&&y("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),oi(n)),this.Mn.getDocumentsMatchingQuery(t,n,s).next(a=>(o.forEach(c=>{a=a.insert(c.key,c)}),a)))})}Ln(t,n){let s=new H(Ro(t));return n.forEach((i,r)=>{Nn(t,r)&&(s=s.add(r))}),s}Bn(t,n,s,i){if(s.size!==n.size)return!0;const r=t==="F"?n.last():n.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}Fn(t,n){return go()<=b.DEBUG&&y("QueryEngine","Using full collection scan to execute query:",oi(n)),this.Mn.getDocumentsMatchingQuery(t,n,C.min())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(t,n,s,i){this.persistence=t,this.Un=n,this.k=i,this.qn=new z(_),this.Kn=new Oe(r=>ti(r),ei),this.jn=C.min(),this.An=t.getMutationQueue(s),this.Qn=t.getRemoteDocumentCache(),this.He=t.getTargetCache(),this.Wn=new oa(this.Qn,this.An,this.persistence.getIndexManager()),this.Ye=t.getBundleCache(),this.Un.On(this.Wn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>t.collect(n,this.qn))}}function ql(e,t,n,s){return new $l(e,t,n,s)}async function aa(e,t){const n=I(e);let s=n.An,i=n.Wn;const r=await n.persistence.runTransaction("Handle user change","readonly",o=>{let a;return n.An.getAllMutationBatches(o).next(c=>(a=c,s=n.persistence.getMutationQueue(t),i=new oa(n.Qn,s,n.persistence.getIndexManager()),s.getAllMutationBatches(o))).next(c=>{const u=[],h=[];let l=D();for(const d of a){u.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}for(const d of c){h.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}return i.vn(o,l).next(d=>({Gn:d,removedBatchIds:u,addedBatchIds:h}))})});return n.An=s,n.Wn=i,n.Un.On(n.Wn),r}function jl(e,t){const n=I(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const i=t.batch.keys(),r=n.Qn.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const h=c.batch,l=h.keys();let d=p.resolve();return l.forEach(m=>{d=d.next(()=>u.getEntry(a,m)).next(v=>{const N=c.docVersions.get(m);k(N!==null),v.version.compareTo(N)<0&&(h.applyToRemoteDocument(v,c),v.isValidDocument()&&u.addEntry(v,c.commitVersion))})}),d.next(()=>o.An.removeMutationBatch(a,h))}(n,s,t,r).next(()=>r.apply(s)).next(()=>n.An.performConsistencyCheck(s)).next(()=>n.Wn.vn(s,i))})}function ca(e){const t=I(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",n=>t.He.getLastRemoteSnapshotVersion(n))}function Bl(e,t){const n=I(e),s=t.snapshotVersion;let i=n.qn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=n.Qn.newChangeBuffer({trackRemovals:!0});i=n.qn;const a=[];t.targetChanges.forEach((u,h)=>{const l=i.get(h);if(!l)return;a.push(n.He.removeMatchingKeys(r,u.removedDocuments,h).next(()=>n.He.addMatchingKeys(r,u.addedDocuments,h)));let d=l.withSequenceNumber(r.currentSequenceNumber);t.targetMismatches.has(h)?d=d.withResumeToken(j.EMPTY_BYTE_STRING,C.min()).withLastLimboFreeSnapshotVersion(C.min()):u.resumeToken.approximateByteSize()>0&&(d=d.withResumeToken(u.resumeToken,s)),i=i.insert(h,d),function(m,v,N){return m.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-m.snapshotVersion.toMicroseconds()>=3e8?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(l,d,u)&&a.push(n.He.updateTargetData(r,d))});let c=Nt();if(t.documentUpdates.forEach((u,h)=>{t.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(r,u))}),a.push(Hl(r,o,t.documentUpdates,s,void 0).next(u=>{c=u})),!s.isEqual(C.min())){const u=n.He.getLastRemoteSnapshotVersion(r).next(h=>n.He.setTargetsMetadata(r,r.currentSequenceNumber,s));a.push(u)}return p.waitFor(a).next(()=>o.apply(r)).next(()=>n.Wn.Vn(r,c)).next(()=>c)}).then(r=>(n.qn=i,r))}function Hl(e,t,n,s,i){let r=D();return n.forEach(o=>r=r.add(o)),t.getEntries(e,r).next(o=>{let a=Nt();return n.forEach((c,u)=>{const h=o.get(c),l=(i==null?void 0:i.get(c))||s;u.isNoDocument()&&u.version.isEqual(C.min())?(t.removeEntry(c,l),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(u,l),a=a.insert(c,u)):y("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),a})}function Kl(e,t){const n=I(e);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(t===void 0&&(t=-1),n.An.getNextMutationBatchAfterBatchId(s,t)))}function Gl(e,t){const n=I(e);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let i;return n.He.getTargetData(s,t).next(r=>r?(i=r,p.resolve(i)):n.He.allocateTargetId(s).next(o=>(i=new kt(t,o,0,s.currentSequenceNumber),n.He.addTargetData(s,i).next(()=>i))))}).then(s=>{const i=n.qn.get(s.targetId);return(i===null||s.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.qn=n.qn.insert(s.targetId,s),n.Kn.set(t,s.targetId)),s})}async function yi(e,t,n){const s=I(e),i=s.qn.get(t),r=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",r,o=>s.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Le(o))throw o;y("LocalStore",`Failed to update sequence numbers for target ${t}: ${o}`)}s.qn=s.qn.remove(t),s.Kn.delete(i.target)}function ua(e,t,n){const s=I(e);let i=C.min(),r=D();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const h=I(a),l=h.Kn.get(u);return l!==void 0?p.resolve(h.qn.get(l)):h.He.getTargetData(c,u)}(s,o,_t(t)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,s.He.getMatchingKeysForTargetId(o,a.targetId).next(c=>{r=c})}).next(()=>s.Un.getDocumentsMatchingQuery(o,t,n?i:C.min(),n?r:D())).next(a=>({documents:a,zn:r})))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(t){this.k=t,this.Xn=new Map,this.Zn=new Map}getBundleMetadata(t,n){return p.resolve(this.Xn.get(n))}saveBundleMetadata(t,n){var s;return this.Xn.set(n.id,{id:(s=n).id,version:s.version,createTime:ut(s.createTime)}),p.resolve()}getNamedQuery(t,n){return p.resolve(this.Zn.get(n))}saveNamedQuery(t,n){return this.Zn.set(n.name,function(s){return{name:s.name,query:Ml(s.bundledQuery),readTime:ut(s.readTime)}}(n)),p.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(){this.ts=new H(F.es),this.ns=new H(F.ss)}isEmpty(){return this.ts.isEmpty()}addReference(t,n){const s=new F(t,n);this.ts=this.ts.add(s),this.ns=this.ns.add(s)}rs(t,n){t.forEach(s=>this.addReference(s,n))}removeReference(t,n){this.os(new F(t,n))}cs(t,n){t.forEach(s=>this.removeReference(s,n))}us(t){const n=new T(new L([])),s=new F(n,t),i=new F(n,t+1),r=[];return this.ns.forEachInRange([s,i],o=>{this.os(o),r.push(o.key)}),r}hs(){this.ts.forEach(t=>this.os(t))}os(t){this.ts=this.ts.delete(t),this.ns=this.ns.delete(t)}ls(t){const n=new T(new L([])),s=new F(n,t),i=new F(n,t+1);let r=D();return this.ns.forEachInRange([s,i],o=>{r=r.add(o.key)}),r}containsKey(t){const n=new F(t,0),s=this.ts.firstAfterOrEqual(n);return s!==null&&t.isEqual(s.key)}}class F{constructor(t,n){this.key=t,this.fs=n}static es(t,n){return T.comparator(t.key,n.key)||_(t.fs,n.fs)}static ss(t,n){return _(t.fs,n.fs)||T.comparator(t.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(t,n){this.Jt=t,this.referenceDelegate=n,this.An=[],this.ds=1,this.ws=new H(F.es)}checkEmpty(t){return p.resolve(this.An.length===0)}addMutationBatch(t,n,s,i){const r=this.ds;this.ds++,this.An.length>0&&this.An[this.An.length-1];const o=new xl(r,n,s,i);this.An.push(o);for(const a of i)this.ws=this.ws.add(new F(a.key,r)),this.Jt.addToCollectionParentIndex(t,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(t,n){return p.resolve(this._s(n))}getNextMutationBatchAfterBatchId(t,n){const s=n+1,i=this.gs(s),r=i<0?0:i;return p.resolve(this.An.length>r?this.An[r]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.An.length===0?-1:this.ds-1)}getAllMutationBatches(t){return p.resolve(this.An.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const s=new F(n,0),i=new F(n,Number.POSITIVE_INFINITY),r=[];return this.ws.forEachInRange([s,i],o=>{const a=this._s(o.fs);r.push(a)}),p.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,n){let s=new H(_);return n.forEach(i=>{const r=new F(i,0),o=new F(i,Number.POSITIVE_INFINITY);this.ws.forEachInRange([r,o],a=>{s=s.add(a.fs)})}),p.resolve(this.ys(s))}getAllMutationBatchesAffectingQuery(t,n){const s=n.path,i=s.length+1;let r=s;T.isDocumentKey(r)||(r=r.child(""));const o=new F(new T(r),0);let a=new H(_);return this.ws.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===i&&(a=a.add(c.fs)),!0)},o),p.resolve(this.ys(a))}ys(t){const n=[];return t.forEach(s=>{const i=this._s(s);i!==null&&n.push(i)}),n}removeMutationBatch(t,n){k(this.ps(n.batchId,"removed")===0),this.An.shift();let s=this.ws;return p.forEach(n.mutations,i=>{const r=new F(i.key,n.batchId);return s=s.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.ws=s})}ee(t){}containsKey(t,n){const s=new F(n,0),i=this.ws.firstAfterOrEqual(s);return p.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(t){return this.An.length,p.resolve()}ps(t,n){return this.gs(t)}gs(t){return this.An.length===0?0:t-this.An[0].batchId}_s(t){const n=this.gs(t);return n<0||n>=this.An.length?null:this.An[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(t,n){this.Jt=t,this.Ts=n,this.docs=new z(T.comparator),this.size=0}addEntry(t,n,s){const i=n.key,r=this.docs.get(i),o=r?r.size:0,a=this.Ts(n);return this.docs=this.docs.insert(i,{document:n.mutableCopy(),size:a,readTime:s}),this.size+=a-o,this.Jt.addToCollectionParentIndex(t,i.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const s=this.docs.get(n);return p.resolve(s?s.document.mutableCopy():G.newInvalidDocument(n))}getEntries(t,n){let s=Nt();return n.forEach(i=>{const r=this.docs.get(i);s=s.insert(i,r?r.document.mutableCopy():G.newInvalidDocument(i))}),p.resolve(s)}getDocumentsMatchingQuery(t,n,s){let i=Nt();const r=new T(n.path.child("")),o=this.docs.getIteratorFrom(r);for(;o.hasNext();){const{key:a,value:{document:c,readTime:u}}=o.getNext();if(!n.path.isPrefixOf(a.path))break;u.compareTo(s)<=0||Nn(n,c)&&(i=i.insert(c.key,c.mutableCopy()))}return p.resolve(i)}Es(t,n){return p.forEach(this.docs,s=>n(s))}newChangeBuffer(t){return new Xl(this)}getSize(t){return p.resolve(this.size)}}class Xl extends Fl{constructor(t){super(),this.De=t}applyChanges(t){const n=[];return this.changes.forEach((s,i)=>{i.document.isValidDocument()?n.push(this.De.addEntry(t,i.document,this.getReadTime(s))):this.De.removeEntry(s)}),p.waitFor(n)}getFromCache(t,n){return this.De.getEntry(t,n)}getAllFromCache(t,n){return this.De.getEntries(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(t){this.persistence=t,this.Is=new Oe(n=>ti(n),ei),this.lastRemoteSnapshotVersion=C.min(),this.highestTargetId=0,this.As=0,this.Rs=new vi,this.targetCount=0,this.bs=zt.ie()}forEachTarget(t,n){return this.Is.forEach((s,i)=>n(i)),p.resolve()}getLastRemoteSnapshotVersion(t){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return p.resolve(this.As)}allocateTargetId(t){return this.highestTargetId=this.bs.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(t,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.As&&(this.As=n),p.resolve()}ae(t){this.Is.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.bs=new zt(n),this.highestTargetId=n),t.sequenceNumber>this.As&&(this.As=t.sequenceNumber)}addTargetData(t,n){return this.ae(n),this.targetCount+=1,p.resolve()}updateTargetData(t,n){return this.ae(n),p.resolve()}removeTargetData(t,n){return this.Is.delete(n.target),this.Rs.us(n.targetId),this.targetCount-=1,p.resolve()}removeTargets(t,n,s){let i=0;const r=[];return this.Is.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.Is.delete(o),r.push(this.removeMatchingKeysForTargetId(t,a.targetId)),i++)}),p.waitFor(r).next(()=>i)}getTargetCount(t){return p.resolve(this.targetCount)}getTargetData(t,n){const s=this.Is.get(n)||null;return p.resolve(s)}addMatchingKeys(t,n,s){return this.Rs.rs(n,s),p.resolve()}removeMatchingKeys(t,n,s){this.Rs.cs(n,s);const i=this.persistence.referenceDelegate,r=[];return i&&n.forEach(o=>{r.push(i.markPotentiallyOrphaned(t,o))}),p.waitFor(r)}removeMatchingKeysForTargetId(t,n){return this.Rs.us(n),p.resolve()}getMatchingKeysForTargetId(t,n){const s=this.Rs.ls(n);return p.resolve(s)}containsKey(t,n){return p.resolve(this.Rs.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(t,n){this.Ps={},this.Be=new Ws(0),this.Ue=!1,this.Ue=!0,this.referenceDelegate=t(this),this.He=new Yl(this),this.Jt=new Pl,this.Je=function(s,i){return new Ql(s,i)}(this.Jt,s=>this.referenceDelegate.vs(s)),this.k=new Ol(n),this.Ye=new zl(this.k)}start(){return Promise.resolve()}shutdown(){return this.Ue=!1,Promise.resolve()}get started(){return this.Ue}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Jt}getMutationQueue(t){let n=this.Ps[t.toKey()];return n||(n=new Wl(this.Jt,this.referenceDelegate),this.Ps[t.toKey()]=n),n}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getBundleCache(){return this.Ye}runTransaction(t,n,s){y("MemoryPersistence","Starting transaction:",t);const i=new Zl(this.Be.next());return this.referenceDelegate.Vs(),s(i).next(r=>this.referenceDelegate.Ss(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Ds(t,n){return p.or(Object.values(this.Ps).map(s=>()=>s.containsKey(t,n)))}}class Zl extends Ll{constructor(t){super(),this.currentSequenceNumber=t}}class wi{constructor(t){this.persistence=t,this.Cs=new vi,this.Ns=null}static ks(t){return new wi(t)}get xs(){if(this.Ns)return this.Ns;throw S()}addReference(t,n,s){return this.Cs.addReference(s,n),this.xs.delete(s.toString()),p.resolve()}removeReference(t,n,s){return this.Cs.removeReference(s,n),this.xs.add(s.toString()),p.resolve()}markPotentiallyOrphaned(t,n){return this.xs.add(n.toString()),p.resolve()}removeTarget(t,n){this.Cs.us(n.targetId).forEach(i=>this.xs.add(i.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(t,n.targetId).next(i=>{i.forEach(r=>this.xs.add(r.toString()))}).next(()=>s.removeTargetData(t,n))}Vs(){this.Ns=new Set}Ss(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.xs,s=>{const i=T.fromPath(s);return this.$s(t,i).next(r=>{r||n.removeEntry(i)})}).next(()=>(this.Ns=null,n.apply(t)))}updateLimboDocument(t,n){return this.$s(t,n).next(s=>{s?this.xs.delete(n.toString()):this.xs.add(n.toString())})}vs(t){return 0}$s(t,n){return p.or([()=>p.resolve(this.Cs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Ds(t,n)])}}class ha{constructor(){this.activeTargetIds=Go()}Fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Ls(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ms(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class tf{constructor(){this.pi=new ha,this.Ti={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,s){}addLocalQueryTarget(t){return this.pi.Fs(t),this.Ti[t]||"not-current"}updateQueryState(t,n,s){this.Ti[t]=n}removeLocalQueryTarget(t){this.pi.Ls(t)}isLocalQueryTarget(t){return this.pi.activeTargetIds.has(t)}clearQueryState(t){delete this.Ti[t]}getAllActiveQueryTargets(){return this.pi.activeTargetIds}isActiveQueryTarget(t){return this.pi.activeTargetIds.has(t)}start(){return this.pi=new ha,Promise.resolve()}handleUserChange(t,n,s){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{Ei(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(){this.Ii=()=>this.Ai(),this.Ri=()=>this.bi(),this.Pi=[],this.vi()}Ei(t){this.Pi.push(t)}shutdown(){window.removeEventListener("online",this.Ii),window.removeEventListener("offline",this.Ri)}vi(){window.addEventListener("online",this.Ii),window.addEventListener("offline",this.Ri)}Ai(){y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.Pi)t(0)}bi(){y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.Pi)t(1)}static Pt(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(t){this.Vi=t.Vi,this.Si=t.Si}Di(t){this.Ci=t}Ni(t){this.ki=t}onMessage(t){this.xi=t}close(){this.Si()}send(t){this.Vi(t)}$i(){this.Ci()}Oi(t){this.ki(t)}Mi(t){this.xi(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http";this.Fi=n+"://"+t.host,this.Li="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Bi(t,n,s,i,r){const o=this.Ui(t,n);y("RestConnection","Sending: ",o,s);const a={};return this.qi(a,i,r),this.Ki(t,o,a,s).then(c=>(y("RestConnection","Received: ",c),c),c=>{throw mo("RestConnection",`${t} failed with error: `,c,"url: ",o,"request:",s),c})}ji(t,n,s,i,r){return this.Bi(t,n,s,i,r)}qi(t,n,s){t["X-Goog-Api-Client"]="gl-js/ fire/"+Ft,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,r)=>t[r]=i),s&&s.headers.forEach((i,r)=>t[r]=i)}Ui(t,n){const s=nf[t];return`${this.Fi}/v1/${n}:${s}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}Ki(t,n,s,i){return new Promise((r,o)=>{const a=new Th;a.listenOnce(vh.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Gs.NO_ERROR:const u=a.getResponseJson();y("Connection","XHR received:",JSON.stringify(u)),r(u);break;case Gs.TIMEOUT:y("Connection",'RPC "'+t+'" timed out'),o(new w(f.DEADLINE_EXCEEDED,"Request time out"));break;case Gs.HTTP_ERROR:const h=a.getStatus();if(y("Connection",'RPC "'+t+'" failed with status:',h,"response text:",a.getResponseText()),h>0){const l=a.getResponseJson().error;if(l&&l.status&&l.message){const d=function(m){const v=m.toLowerCase().replace(/_/g,"-");return Object.values(f).indexOf(v)>=0?v:f.UNKNOWN}(l.status);o(new w(d,l.message))}else o(new w(f.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new w(f.UNAVAILABLE,"Connection failed."));break;default:S()}}finally{y("Connection",'RPC "'+t+'" completed.')}});const c=JSON.stringify(i);a.send(n,"POST",c,s,15)})}Qi(t,n,s){const i=[this.Fi,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=mh(),o=yh(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new Eh({})),this.qi(a.initMessageHeaders,n,s),gc()||yc()||vc()||wc()||Ec()||mc()||(a.httpHeadersOverwriteParam="$httpHeaders");const c=i.join("");y("Connection","Creating WebChannel: "+c,a);const u=r.createWebChannel(c,a);let h=!1,l=!1;const d=new sf({Vi:v=>{l?y("Connection","Not sending because WebChannel is closed:",v):(h||(y("Connection","Opening WebChannel transport."),u.open(),h=!0),y("Connection","WebChannel sending:",v),u.send(v))},Si:()=>u.close()}),m=(v,N,P)=>{v.listen(N,rt=>{try{P(rt)}catch(ot){setTimeout(()=>{throw ot},0)}})};return m(u,Tn.EventType.OPEN,()=>{l||y("Connection","WebChannel transport opened.")}),m(u,Tn.EventType.CLOSE,()=>{l||(l=!0,y("Connection","WebChannel transport closed"),d.Oi())}),m(u,Tn.EventType.ERROR,v=>{l||(l=!0,mo("Connection","WebChannel transport errored:",v),d.Oi(new w(f.UNAVAILABLE,"The operation could not be completed")))}),m(u,Tn.EventType.MESSAGE,v=>{var N;if(!l){const P=v.data[0];k(!!P);const rt=P,ot=rt.error||((N=rt[0])===null||N===void 0?void 0:N.error);if(ot){y("Connection","WebChannel received error:",ot);const Jt=ot.status;let Zt=function(Ga){const Vi=M[Ga];if(Vi!==void 0)return Ho(Vi)}(Jt),Pi=ot.message;Zt===void 0&&(Zt=f.INTERNAL,Pi="Unknown error status: "+Jt+" with message "+ot.message),l=!0,d.Oi(new w(Zt,Pi)),u.close()}else y("Connection","WebChannel received:",P),d.Mi(P)}}),m(o,wh.STAT_EVENT,v=>{v.stat===fo.PROXY?y("Connection","Detected buffering proxy"):v.stat===fo.NOPROXY&&y("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.$i()},0),d}}function Ei(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(e){return new ml(e,!0)}class fa{constructor(t,n,s=1e3,i=1.5,r=6e4){this.Me=t,this.timerId=n,this.Wi=s,this.Gi=i,this.zi=r,this.Hi=0,this.Ji=null,this.Yi=Date.now(),this.reset()}reset(){this.Hi=0}Xi(){this.Hi=this.zi}Zi(t){this.cancel();const n=Math.floor(this.Hi+this.tr()),s=Math.max(0,Date.now()-this.Yi),i=Math.max(0,n-s);i>0&&y("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Hi} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.Ji=this.Me.enqueueAfterDelay(this.timerId,i,()=>(this.Yi=Date.now(),t())),this.Hi*=this.Gi,this.Hi<this.Wi&&(this.Hi=this.Wi),this.Hi>this.zi&&(this.Hi=this.zi)}er(){this.Ji!==null&&(this.Ji.skipDelay(),this.Ji=null)}cancel(){this.Ji!==null&&(this.Ji.cancel(),this.Ji=null)}tr(){return(Math.random()-.5)*this.Hi}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(t,n,s,i,r,o,a,c){this.Me=t,this.nr=s,this.sr=i,this.ir=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.rr=0,this.cr=null,this.ar=null,this.stream=null,this.ur=new fa(t,n)}hr(){return this.state===1||this.state===5||this.lr()}lr(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.dr()}async stop(){this.hr()&&await this.close(0)}wr(){this.state=0,this.ur.reset()}_r(){this.lr()&&this.cr===null&&(this.cr=this.Me.enqueueAfterDelay(this.nr,6e4,()=>this.mr()))}gr(t){this.yr(),this.stream.send(t)}async mr(){if(this.lr())return this.close(0)}yr(){this.cr&&(this.cr.cancel(),this.cr=null)}pr(){this.ar&&(this.ar.cancel(),this.ar=null)}async close(t,n){this.yr(),this.pr(),this.ur.cancel(),this.rr++,t!==4?this.ur.reset():n&&n.code===f.RESOURCE_EXHAUSTED?(ft(n.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.ur.Xi()):n&&n.code===f.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Tr(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ni(n)}Tr(){}auth(){this.state=1;const t=this.Er(this.rr),n=this.rr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,i])=>{this.rr===n&&this.Ir(s,i)},s=>{t(()=>{const i=new w(f.UNKNOWN,"Fetching auth token failed: "+s.message);return this.Ar(i)})})}Ir(t,n){const s=this.Er(this.rr);this.stream=this.Rr(t,n),this.stream.Di(()=>{s(()=>(this.state=2,this.ar=this.Me.enqueueAfterDelay(this.sr,1e4,()=>(this.lr()&&(this.state=3),Promise.resolve())),this.listener.Di()))}),this.stream.Ni(i=>{s(()=>this.Ar(i))}),this.stream.onMessage(i=>{s(()=>this.onMessage(i))})}dr(){this.state=5,this.ur.Zi(async()=>{this.state=0,this.start()})}Ar(t){return y("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}Er(t){return n=>{this.Me.enqueueAndForget(()=>this.rr===t?n():(y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class of extends da{constructor(t,n,s,i,r,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,i,o),this.k=r}Rr(t,n){return this.ir.Qi("Listen",t,n)}onMessage(t){this.ur.reset();const n=wl(this.k,t),s=function(i){if(!("targetChange"in i))return C.min();const r=i.targetChange;return r.targetIds&&r.targetIds.length?C.min():r.readTime?ut(r.readTime):C.min()}(t);return this.listener.br(n,s)}Pr(t){const n={};n.database=pi(this.k),n.addTarget=function(i,r){let o;const a=r.target;return o=ni(a)?{documents:Il(i,a)}:{query:Sl(i,a)},o.targetId=r.targetId,r.resumeToken.approximateByteSize()>0?o.resumeToken=Jo(i,r.resumeToken):r.snapshotVersion.compareTo(C.min())>0&&(o.readTime=Vn(i,r.snapshotVersion.toTimestamp())),o}(this.k,t);const s=Cl(this.k,t);s&&(n.labels=s),this.gr(n)}vr(t){const n={};n.database=pi(this.k),n.removeTarget=t,this.gr(n)}}class af extends da{constructor(t,n,s,i,r,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,i,o),this.k=r,this.Vr=!1}get Sr(){return this.Vr}start(){this.Vr=!1,this.lastStreamToken=void 0,super.start()}Tr(){this.Vr&&this.Dr([])}Rr(t,n){return this.ir.Qi("Write",t,n)}onMessage(t){if(k(!!t.streamToken),this.lastStreamToken=t.streamToken,this.Vr){this.ur.reset();const n=Tl(t.writeResults,t.commitTime),s=ut(t.commitTime);return this.listener.Cr(s,n)}return k(!t.writeResults||t.writeResults.length===0),this.Vr=!0,this.listener.Nr()}kr(){const t={};t.database=pi(this.k),this.gr(t)}Dr(t){const n={streamToken:this.lastStreamToken,writes:t.map(s=>El(this.k,s))};this.gr(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf extends class{}{constructor(t,n,s,i){super(),this.authCredentials=t,this.appCheckCredentials=n,this.ir=s,this.k=i,this.$r=!1}Or(){if(this.$r)throw new w(f.FAILED_PRECONDITION,"The client has already been terminated.")}Bi(t,n,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.ir.Bi(t,n,s,i,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new w(f.UNKNOWN,i.toString())})}ji(t,n,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.ir.ji(t,n,s,i,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new w(f.UNKNOWN,i.toString())})}terminate(){this.$r=!0}}class uf{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.Mr=0,this.Fr=null,this.Lr=!0}Br(){this.Mr===0&&(this.Ur("Unknown"),this.Fr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Fr=null,this.qr("Backend didn't respond within 10 seconds."),this.Ur("Offline"),Promise.resolve())))}Kr(t){this.state==="Online"?this.Ur("Unknown"):(this.Mr++,this.Mr>=1&&(this.jr(),this.qr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Ur("Offline")))}set(t){this.jr(),this.Mr=0,t==="Online"&&(this.Lr=!1),this.Ur(t)}Ur(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}qr(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Lr?(ft(n),this.Lr=!1):y("OnlineStateTracker",n)}jr(){this.Fr!==null&&(this.Fr.cancel(),this.Fr=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(t,n,s,i,r){this.localStore=t,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Qr=[],this.Wr=new Map,this.Gr=new Set,this.zr=[],this.Hr=r,this.Hr.Ei(o=>{s.enqueueAndForget(async()=>{Dt(this)&&(y("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=I(a);c.Gr.add(4),await Me(c),c.Jr.set("Unknown"),c.Gr.delete(4),await Un(c)}(this))})}),this.Jr=new uf(s,i)}}async function Un(e){if(Dt(e))for(const t of e.zr)await t(!0)}async function Me(e){for(const t of e.zr)await t(!1)}function pa(e,t){const n=I(e);n.Wr.has(t.targetId)||(n.Wr.set(t.targetId,t),Si(n)?Ii(n):Wt(n).lr()&&Ti(n,t))}function ga(e,t){const n=I(e),s=Wt(n);n.Wr.delete(t),s.lr()&&ma(n,t),n.Wr.size===0&&(s.lr()?s._r():Dt(n)&&n.Jr.set("Unknown"))}function Ti(e,t){e.Yr.X(t.targetId),Wt(e).Pr(t)}function ma(e,t){e.Yr.X(t),Wt(e).vr(t)}function Ii(e){e.Yr=new dl({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>e.Wr.get(t)||null}),Wt(e).start(),e.Jr.Br()}function Si(e){return Dt(e)&&!Wt(e).hr()&&e.Wr.size>0}function Dt(e){return I(e).Gr.size===0}function ya(e){e.Yr=void 0}async function lf(e){e.Wr.forEach((t,n)=>{Ti(e,t)})}async function ff(e,t){ya(e),Si(e)?(e.Jr.Kr(t),Ii(e)):e.Jr.set("Unknown")}async function df(e,t,n){if(e.Jr.set("Online"),t instanceof Wo&&t.state===2&&t.cause)try{await async function(s,i){const r=i.cause;for(const o of i.targetIds)s.Wr.has(o)&&(await s.remoteSyncer.rejectListen(o,r),s.Wr.delete(o),s.Yr.removeTarget(o))}(e,t)}catch(s){y("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),s),await $n(e,s)}else if(t instanceof Pn?e.Yr.ot(t):t instanceof zo?e.Yr.dt(t):e.Yr.ut(t),!n.isEqual(C.min()))try{const s=await ca(e.localStore);n.compareTo(s)>=0&&await function(i,r){const o=i.Yr.gt(r);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=i.Wr.get(c);u&&i.Wr.set(c,u.withResumeToken(a.resumeToken,r))}}),o.targetMismatches.forEach(a=>{const c=i.Wr.get(a);if(!c)return;i.Wr.set(a,c.withResumeToken(j.EMPTY_BYTE_STRING,c.snapshotVersion)),ma(i,a);const u=new kt(c.target,a,1,c.sequenceNumber);Ti(i,u)}),i.remoteSyncer.applyRemoteEvent(o)}(e,n)}catch(s){y("RemoteStore","Failed to raise snapshot:",s),await $n(e,s)}}async function $n(e,t,n){if(!Le(t))throw t;e.Gr.add(1),await Me(e),e.Jr.set("Offline"),n||(n=()=>ca(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{y("RemoteStore","Retrying IndexedDB access"),await n(),e.Gr.delete(1),await Un(e)})}function va(e,t){return t().catch(n=>$n(e,n,t))}async function qn(e){const t=I(e),n=gt(t);let s=t.Qr.length>0?t.Qr[t.Qr.length-1].batchId:-1;for(;pf(t);)try{const i=await Kl(t.localStore,s);if(i===null){t.Qr.length===0&&n._r();break}s=i.batchId,gf(t,i)}catch(i){await $n(t,i)}wa(t)&&Ea(t)}function pf(e){return Dt(e)&&e.Qr.length<10}function gf(e,t){e.Qr.push(t);const n=gt(e);n.lr()&&n.Sr&&n.Dr(t.mutations)}function wa(e){return Dt(e)&&!gt(e).hr()&&e.Qr.length>0}function Ea(e){gt(e).start()}async function mf(e){gt(e).kr()}async function yf(e){const t=gt(e);for(const n of e.Qr)t.Dr(n.mutations)}async function vf(e,t,n){const s=e.Qr.shift(),i=gi.from(s,t,n);await va(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await qn(e)}async function wf(e,t){t&&gt(e).Sr&&await async function(n,s){if(i=s.code,ol(i)&&i!==f.ABORTED){const r=n.Qr.shift();gt(n).wr(),await va(n,()=>n.remoteSyncer.rejectFailedWrite(r.batchId,s)),await qn(n)}var i}(e,t),wa(e)&&Ea(e)}async function Ta(e,t){const n=I(e);n.asyncQueue.verifyOperationInProgress(),y("RemoteStore","RemoteStore received new credentials");const s=Dt(n);n.Gr.add(3),await Me(n),s&&n.Jr.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Gr.delete(3),await Un(n)}async function Ef(e,t){const n=I(e);t?(n.Gr.delete(2),await Un(n)):t||(n.Gr.add(2),await Me(n),n.Jr.set("Unknown"))}function Wt(e){return e.Xr||(e.Xr=function(t,n,s){const i=I(t);return i.Or(),new of(n,i.ir,i.authCredentials,i.appCheckCredentials,i.k,s)}(e.datastore,e.asyncQueue,{Di:lf.bind(null,e),Ni:ff.bind(null,e),br:df.bind(null,e)}),e.zr.push(async t=>{t?(e.Xr.wr(),Si(e)?Ii(e):e.Jr.set("Unknown")):(await e.Xr.stop(),ya(e))})),e.Xr}function gt(e){return e.Zr||(e.Zr=function(t,n,s){const i=I(t);return i.Or(),new af(n,i.ir,i.authCredentials,i.appCheckCredentials,i.k,s)}(e.datastore,e.asyncQueue,{Di:mf.bind(null,e),Ni:wf.bind(null,e),Nr:yf.bind(null,e),Cr:vf.bind(null,e)}),e.zr.push(async t=>{t?(e.Zr.wr(),await qn(e)):(await e.Zr.stop(),e.Qr.length>0&&(y("RemoteStore",`Stopping write stream with ${e.Qr.length} pending writes`),e.Qr=[]))})),e.Zr}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t,n,s,i,r){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=s,this.op=i,this.removalCallback=r,this.deferred=new dt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(t,n,s,i,r){const o=Date.now()+s,a=new Ai(t,n,o,i,r);return a.start(s),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new w(f.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ci(e,t){if(ft("AsyncQueue",`${t}: ${e}`),Le(e))return new w(f.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(t){this.comparator=t?(n,s)=>t(n,s)||T.comparator(n.key,s.key):(n,s)=>T.comparator(n.key,s.key),this.keyedMap=ui(),this.sortedSet=new z(this.comparator)}static emptySet(t){return new Qt(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const n=this.keyedMap.get(t);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((n,s)=>(t(n),!1))}add(t){const n=this.delete(t.key);return n.copy(n.keyedMap.insert(t.key,t),n.sortedSet.insert(t,null))}delete(t){const n=this.get(t);return n?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(n)):this}isEqual(t){if(!(t instanceof Qt)||this.size!==t.size)return!1;const n=this.sortedSet.getIterator(),s=t.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,r=s.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(n=>{t.push(n.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,n){const s=new Qt;return s.comparator=this.comparator,s.keyedMap=t,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(){this.eo=new z(T.comparator)}track(t){const n=t.doc.key,s=this.eo.get(n);s?t.type!==0&&s.type===3?this.eo=this.eo.insert(n,t):t.type===3&&s.type!==1?this.eo=this.eo.insert(n,{type:s.type,doc:t.doc}):t.type===2&&s.type===2?this.eo=this.eo.insert(n,{type:2,doc:t.doc}):t.type===2&&s.type===0?this.eo=this.eo.insert(n,{type:0,doc:t.doc}):t.type===1&&s.type===0?this.eo=this.eo.remove(n):t.type===1&&s.type===2?this.eo=this.eo.insert(n,{type:1,doc:s.doc}):t.type===0&&s.type===1?this.eo=this.eo.insert(n,{type:2,doc:t.doc}):S():this.eo=this.eo.insert(n,t)}no(){const t=[];return this.eo.inorderTraversal((n,s)=>{t.push(s)}),t}}class Xt{constructor(t,n,s,i,r,o,a,c){this.query=t,this.docs=n,this.oldDocs=s,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c}static fromInitialDocuments(t,n,s,i){const r=[];return n.forEach(o=>{r.push({type:0,doc:o})}),new Xt(t,n,Qt.emptySet(n),r,s,i,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&_n(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const n=this.docChanges,s=t.docChanges;if(n.length!==s.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==s[i].type||!n[i].doc.isEqual(s[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(){this.so=void 0,this.listeners=[]}}class If{constructor(){this.queries=new Oe(t=>Do(t),_n),this.onlineState="Unknown",this.io=new Set}}async function Sf(e,t){const n=I(e),s=t.query;let i=!1,r=n.queries.get(s);if(r||(i=!0,r=new Tf),i)try{r.so=await n.onListen(s)}catch(o){const a=Ci(o,`Initialization of query '${oi(t.query)}' failed`);return void t.onError(a)}n.queries.set(s,r),r.listeners.push(t),t.ro(n.onlineState),r.so&&t.oo(r.so)&&bi(n)}async function Af(e,t){const n=I(e),s=t.query;let i=!1;const r=n.queries.get(s);if(r){const o=r.listeners.indexOf(t);o>=0&&(r.listeners.splice(o,1),i=r.listeners.length===0)}if(i)return n.queries.delete(s),n.onUnlisten(s)}function Cf(e,t){const n=I(e);let s=!1;for(const i of t){const r=i.query,o=n.queries.get(r);if(o){for(const a of o.listeners)a.oo(i)&&(s=!0);o.so=i}}s&&bi(n)}function bf(e,t,n){const s=I(e),i=s.queries.get(t);if(i)for(const r of i.listeners)r.onError(n);s.queries.delete(t)}function bi(e){e.io.forEach(t=>{t.next()})}class _f{constructor(t,n,s){this.query=t,this.co=n,this.ao=!1,this.uo=null,this.onlineState="Unknown",this.options=s||{}}oo(t){if(!this.options.includeMetadataChanges){const s=[];for(const i of t.docChanges)i.type!==3&&s.push(i);t=new Xt(t.query,t.docs,t.oldDocs,s,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let n=!1;return this.ao?this.ho(t)&&(this.co.next(t),n=!0):this.lo(t,this.onlineState)&&(this.fo(t),n=!0),this.uo=t,n}onError(t){this.co.error(t)}ro(t){this.onlineState=t;let n=!1;return this.uo&&!this.ao&&this.lo(this.uo,t)&&(this.fo(this.uo),n=!0),n}lo(t,n){if(!t.fromCache)return!0;const s=n!=="Offline";return(!this.options.wo||!s)&&(!t.docs.isEmpty()||n==="Offline")}ho(t){if(t.docChanges.length>0)return!0;const n=this.uo&&this.uo.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}fo(t){t=Xt.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.ao=!0,this.co.next(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(t){this.key=t}}class Aa{constructor(t){this.key=t}}class Nf{constructor(t,n){this.query=t,this.To=n,this.Eo=null,this.current=!1,this.Io=D(),this.mutatedKeys=D(),this.Ao=Ro(t),this.Ro=new Qt(this.Ao)}get bo(){return this.To}Po(t,n){const s=n?n.vo:new Ia,i=n?n.Ro:this.Ro;let r=n?n.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=bn(this.query)&&i.size===this.query.limit?i.last():null,u=ri(this.query)&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((h,l)=>{const d=i.get(h),m=Nn(this.query,l)?l:null,v=!!d&&this.mutatedKeys.has(d.key),N=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let P=!1;d&&m?d.data.isEqual(m.data)?v!==N&&(s.track({type:3,doc:m}),P=!0):this.Vo(d,m)||(s.track({type:2,doc:m}),P=!0,(c&&this.Ao(m,c)>0||u&&this.Ao(m,u)<0)&&(a=!0)):!d&&m?(s.track({type:0,doc:m}),P=!0):d&&!m&&(s.track({type:1,doc:d}),P=!0,(c||u)&&(a=!0)),P&&(m?(o=o.add(m),r=N?r.add(h):r.delete(h)):(o=o.delete(h),r=r.delete(h)))}),bn(this.query)||ri(this.query))for(;o.size>this.query.limit;){const h=bn(this.query)?o.last():o.first();o=o.delete(h.key),r=r.delete(h.key),s.track({type:1,doc:h})}return{Ro:o,vo:s,Bn:a,mutatedKeys:r}}Vo(t,n){return t.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(t,n,s){const i=this.Ro;this.Ro=t.Ro,this.mutatedKeys=t.mutatedKeys;const r=t.vo.no();r.sort((u,h)=>function(l,d){const m=v=>{switch(v){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return S()}};return m(l)-m(d)}(u.type,h.type)||this.Ao(u.doc,h.doc)),this.So(s);const o=n?this.Do():[],a=this.Io.size===0&&this.current?1:0,c=a!==this.Eo;return this.Eo=a,r.length!==0||c?{snapshot:new Xt(this.query,t.Ro,i,r,t.mutatedKeys,a===0,c,!1),Co:o}:{Co:o}}ro(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ro:this.Ro,vo:new Ia,mutatedKeys:this.mutatedKeys,Bn:!1},!1)):{Co:[]}}No(t){return!this.To.has(t)&&!!this.Ro.has(t)&&!this.Ro.get(t).hasLocalMutations}So(t){t&&(t.addedDocuments.forEach(n=>this.To=this.To.add(n)),t.modifiedDocuments.forEach(n=>{}),t.removedDocuments.forEach(n=>this.To=this.To.delete(n)),this.current=t.current)}Do(){if(!this.current)return[];const t=this.Io;this.Io=D(),this.Ro.forEach(s=>{this.No(s.key)&&(this.Io=this.Io.add(s.key))});const n=[];return t.forEach(s=>{this.Io.has(s)||n.push(new Aa(s))}),this.Io.forEach(s=>{t.has(s)||n.push(new Sa(s))}),n}ko(t){this.To=t.zn,this.Io=D();const n=this.Po(t.documents);return this.applyChanges(n,!0)}xo(){return Xt.fromInitialDocuments(this.query,this.Ro,this.mutatedKeys,this.Eo===0)}}class kf{constructor(t,n,s){this.query=t,this.targetId=n,this.view=s}}class Df{constructor(t){this.key=t,this.$o=!1}}class Rf{constructor(t,n,s,i,r,o){this.localStore=t,this.remoteStore=n,this.eventManager=s,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Oo={},this.Mo=new Oe(a=>Do(a),_n),this.Fo=new Map,this.Lo=new Set,this.Bo=new z(T.comparator),this.Uo=new Map,this.qo=new vi,this.Ko={},this.jo=new Map,this.Qo=zt.re(),this.onlineState="Unknown",this.Wo=void 0}get isPrimaryClient(){return this.Wo===!0}}async function Lf(e,t){const n=jf(e);let s,i;const r=n.Mo.get(t);if(r)s=r.targetId,n.sharedClientState.addLocalQueryTarget(s),i=r.view.xo();else{const o=await Gl(n.localStore,_t(t)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,i=await xf(n,t,s,a==="current"),n.isPrimaryClient&&pa(n.remoteStore,o)}return i}async function xf(e,t,n,s){e.Go=(h,l,d)=>async function(m,v,N,P){let rt=v.view.Po(N);rt.Bn&&(rt=await ua(m.localStore,v.query,!1).then(({documents:Zt})=>v.view.Po(Zt,rt)));const ot=P&&P.targetChanges.get(v.targetId),Jt=v.view.applyChanges(rt,m.isPrimaryClient,ot);return Da(m,v.targetId,Jt.Co),Jt.snapshot}(e,h,l,d);const i=await ua(e.localStore,t,!0),r=new Nf(t,i.zn),o=r.Po(i.documents),a=Re.createSynthesizedTargetChangeForCurrentChange(n,s&&e.onlineState!=="Offline"),c=r.applyChanges(o,e.isPrimaryClient,a);Da(e,n,c.Co);const u=new kf(t,n,r);return e.Mo.set(t,u),e.Fo.has(n)?e.Fo.get(n).push(t):e.Fo.set(n,[t]),c.snapshot}async function Of(e,t){const n=I(e),s=n.Mo.get(t),i=n.Fo.get(s.targetId);if(i.length>1)return n.Fo.set(s.targetId,i.filter(r=>!_n(r,t))),void n.Mo.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await yi(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),ga(n.remoteStore,s.targetId),_i(n,s.targetId)}).catch(xe)):(_i(n,s.targetId),await yi(n.localStore,s.targetId,!0))}async function Mf(e,t,n){const s=Bf(e);try{const i=await function(r,o){const a=I(r),c=et.now(),u=o.reduce((l,d)=>l.add(d.key),D());let h;return a.persistence.runTransaction("Locally write mutations","readwrite",l=>a.Wn.vn(l,u).next(d=>{h=d;const m=[];for(const v of o){const N=nl(v,h.get(v.key));N!=null&&m.push(new Ht(v.key,N,Co(N.value.mapValue),Bt.exists(!0)))}return a.An.addMutationBatch(l,c,m,o)})).then(l=>(l.applyToLocalDocumentSet(h),{batchId:l.batchId,changes:h}))}(s.localStore,t);s.sharedClientState.addPendingMutation(i.batchId),function(r,o,a){let c=r.Ko[r.currentUser.toKey()];c||(c=new z(_)),c=c.insert(o,a),r.Ko[r.currentUser.toKey()]=c}(s,i.batchId,n),await Pe(s,i.changes),await qn(s.remoteStore)}catch(i){const r=Ci(i,"Failed to persist write");n.reject(r)}}async function Ca(e,t){const n=I(e);try{const s=await Bl(n.localStore,t);t.targetChanges.forEach((i,r)=>{const o=n.Uo.get(r);o&&(k(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.$o=!0:i.modifiedDocuments.size>0?k(o.$o):i.removedDocuments.size>0&&(k(o.$o),o.$o=!1))}),await Pe(n,s,t)}catch(s){await xe(s)}}function ba(e,t,n){const s=I(e);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const i=[];s.Mo.forEach((r,o)=>{const a=o.view.ro(t);a.snapshot&&i.push(a.snapshot)}),function(r,o){const a=I(r);a.onlineState=o;let c=!1;a.queries.forEach((u,h)=>{for(const l of h.listeners)l.ro(o)&&(c=!0)}),c&&bi(a)}(s.eventManager,t),i.length&&s.Oo.br(i),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function Pf(e,t,n){const s=I(e);s.sharedClientState.updateQueryState(t,"rejected",n);const i=s.Uo.get(t),r=i&&i.key;if(r){let o=new z(T.comparator);o=o.insert(r,G.newNoDocument(r,C.min()));const a=D().add(r),c=new Mn(C.min(),new Map,new H(_),o,a);await Ca(s,c),s.Bo=s.Bo.remove(r),s.Uo.delete(t),Ni(s)}else await yi(s.localStore,t,!1).then(()=>_i(s,t,n)).catch(xe)}async function Vf(e,t){const n=I(e),s=t.batch.batchId;try{const i=await jl(n.localStore,t);Na(n,s,null),_a(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Pe(n,i)}catch(i){await xe(i)}}async function Ff(e,t,n){const s=I(e);try{const i=await function(r,o){const a=I(r);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.An.lookupMutationBatch(c,o).next(h=>(k(h!==null),u=h.keys(),a.An.removeMutationBatch(c,h))).next(()=>a.An.performConsistencyCheck(c)).next(()=>a.Wn.vn(c,u))})}(s.localStore,t);Na(s,t,n),_a(s,t),s.sharedClientState.updateMutationState(t,"rejected",n),await Pe(s,i)}catch(i){await xe(i)}}function _a(e,t){(e.jo.get(t)||[]).forEach(n=>{n.resolve()}),e.jo.delete(t)}function Na(e,t,n){const s=I(e);let i=s.Ko[s.currentUser.toKey()];if(i){const r=i.get(t);r&&(n?r.reject(n):r.resolve(),i=i.remove(t)),s.Ko[s.currentUser.toKey()]=i}}function _i(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const s of e.Fo.get(t))e.Mo.delete(s),n&&e.Oo.zo(s,n);e.Fo.delete(t),e.isPrimaryClient&&e.qo.us(t).forEach(s=>{e.qo.containsKey(s)||ka(e,s)})}function ka(e,t){e.Lo.delete(t.path.canonicalString());const n=e.Bo.get(t);n!==null&&(ga(e.remoteStore,n),e.Bo=e.Bo.remove(t),e.Uo.delete(n),Ni(e))}function Da(e,t,n){for(const s of n)s instanceof Sa?(e.qo.addReference(s.key,t),Uf(e,s)):s instanceof Aa?(y("SyncEngine","Document no longer in limbo: "+s.key),e.qo.removeReference(s.key,t),e.qo.containsKey(s.key)||ka(e,s.key)):S()}function Uf(e,t){const n=t.key,s=n.path.canonicalString();e.Bo.get(n)||e.Lo.has(s)||(y("SyncEngine","New document in limbo: "+n),e.Lo.add(s),Ni(e))}function Ni(e){for(;e.Lo.size>0&&e.Bo.size<e.maxConcurrentLimboResolutions;){const t=e.Lo.values().next().value;e.Lo.delete(t);const n=new T(L.fromString(t)),s=e.Qo.next();e.Uo.set(s,new Df(n)),e.Bo=e.Bo.insert(n,s),pa(e.remoteStore,new kt(_t(ii(n.path)),s,2,Ws.I))}}async function Pe(e,t,n){const s=I(e),i=[],r=[],o=[];s.Mo.isEmpty()||(s.Mo.forEach((a,c)=>{o.push(s.Go(c,t,n).then(u=>{if(u){s.isPrimaryClient&&s.sharedClientState.updateQueryState(c.targetId,u.fromCache?"not-current":"current"),i.push(u);const h=mi.$n(c.targetId,u);r.push(h)}}))}),await Promise.all(o),s.Oo.br(i),await async function(a,c){const u=I(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>p.forEach(c,l=>p.forEach(l.kn,d=>u.persistence.referenceDelegate.addReference(h,l.targetId,d)).next(()=>p.forEach(l.xn,d=>u.persistence.referenceDelegate.removeReference(h,l.targetId,d)))))}catch(h){if(!Le(h))throw h;y("LocalStore","Failed to update sequence numbers: "+h)}for(const h of c){const l=h.targetId;if(!h.fromCache){const d=u.qn.get(l),m=d.snapshotVersion,v=d.withLastLimboFreeSnapshotVersion(m);u.qn=u.qn.insert(l,v)}}}(s.localStore,r))}async function $f(e,t){const n=I(e);if(!n.currentUser.isEqual(t)){y("SyncEngine","User change. New user:",t.toKey());const s=await aa(n.localStore,t);n.currentUser=t,function(i,r){i.jo.forEach(o=>{o.forEach(a=>{a.reject(new w(f.CANCELLED,r))})}),i.jo.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,s.removedBatchIds,s.addedBatchIds),await Pe(n,s.Gn)}}function qf(e,t){const n=I(e),s=n.Uo.get(t);if(s&&s.$o)return D().add(s.key);{let i=D();const r=n.Fo.get(t);if(!r)return i;for(const o of r){const a=n.Mo.get(o);i=i.unionWith(a.view.bo)}return i}}function jf(e){const t=I(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ca.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=qf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Pf.bind(null,t),t.Oo.br=Cf.bind(null,t.eventManager),t.Oo.zo=bf.bind(null,t.eventManager),t}function Bf(e){const t=I(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Vf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Ff.bind(null,t),t}class Hf{constructor(){this.synchronizeTabs=!1}async initialize(t){this.k=Fn(t.databaseInfo.databaseId),this.sharedClientState=this.Jo(t),this.persistence=this.Yo(t),await this.persistence.start(),this.gcScheduler=this.Xo(t),this.localStore=this.Zo(t)}Xo(t){return null}Zo(t){return ql(this.persistence,new Ul,t.initialUser,this.k)}Yo(t){return new Jl(wi.ks,this.k)}Jo(t){return new tf}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Kf{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>ba(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=$f.bind(null,this.syncEngine),await Ef(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new If}createDatastore(t){const n=Fn(t.databaseInfo.databaseId),s=(i=t.databaseInfo,new rf(i));var i;return function(r,o,a,c){return new cf(r,o,a,c)}(t.authCredentials,t.appCheckCredentials,s,n)}createRemoteStore(t){return n=this.localStore,s=this.datastore,i=t.asyncQueue,r=a=>ba(this.syncEngine,a,0),o=la.Pt()?new la:new ef,new hf(n,s,i,r,o);var n,s,i,r,o}createSyncEngine(t,n){return function(s,i,r,o,a,c,u){const h=new Rf(s,i,r,o,a,c);return u&&(h.Wo=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}terminate(){return async function(t){const n=I(t);y("RemoteStore","RemoteStore shutting down."),n.Gr.add(5),await Me(n),n.Hr.shutdown(),n.Jr.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.ec(this.observer.next,t)}error(t){this.observer.error?this.ec(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}nc(){this.muted=!0}ec(t,n){this.muted||setTimeout(()=>{this.muted||t(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(t,n,s,i){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=i,this.user=Y.UNAUTHENTICATED,this.clientId=yo.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async r=>{y("FirestoreClient","Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(s,r=>(y("FirestoreClient","Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new w(f.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new dt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const s=Ci(n,"Failed to shutdown persistence");t.reject(s)}}),t.promise}}async function Wf(e,t){e.asyncQueue.verifyOperationInProgress(),y("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener(async i=>{s.isEqual(i)||(await aa(t.localStore,i),s=i)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function Qf(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Xf(e);y("FirestoreClient","Initializing OnlineComponentProvider");const s=await e.getConfiguration();await t.initialize(n,s),e.setCredentialChangeListener(i=>Ta(t.remoteStore,i)),e.setAppCheckTokenChangeListener((i,r)=>Ta(t.remoteStore,r)),e.onlineComponents=t}async function Xf(e){return e.offlineComponents||(y("FirestoreClient","Using default OfflineComponentProvider"),await Wf(e,new Hf)),e.offlineComponents}async function Ra(e){return e.onlineComponents||(y("FirestoreClient","Using default OnlineComponentProvider"),await Qf(e,new Kf)),e.onlineComponents}function Yf(e){return Ra(e).then(t=>t.syncEngine)}async function Jf(e){const t=await Ra(e),n=t.eventManager;return n.onListen=Lf.bind(null,t.syncEngine),n.onUnlisten=Of.bind(null,t.syncEngine),n}function Zf(e,t,n={}){const s=new dt;return e.asyncQueue.enqueueAndForget(async()=>function(i,r,o,a,c){const u=new Gf({next:l=>{r.enqueueAndForget(()=>Af(i,h));const d=l.docs.has(o);!d&&l.fromCache?c.reject(new w(f.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&l.fromCache&&a&&a.source==="server"?c.reject(new w(f.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(l)},error:l=>c.reject(l)}),h=new _f(ii(o.path),u,{includeMetadataChanges:!0,wo:!0});return Sf(i,h)}(await Jf(e),e.asyncQueue,t,n,s)),s.promise}class td{constructor(t,n,s,i,r,o,a,c){this.databaseId=t,this.appId=n,this.persistenceKey=s,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class Ve{constructor(t,n){this.projectId=t,this.database=n||"(default)"}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Ve&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(e,t,n){if(!n)throw new w(f.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function nd(e,t,n,s){if(t===!0&&s===!0)throw new w(f.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function xa(e){if(!T.isDocumentKey(e))throw new w(f.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ki(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":S()}function jn(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new w(f.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ki(e);throw new w(f.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(t){var n;if(t.host===void 0){if(t.ssl!==void 0)throw new w(f.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new w(f.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,nd("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(t,n,s){this._authCredentials=n,this._appCheckCredentials=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oa({}),this._settingsFrozen=!1,t instanceof Ve?this._databaseId=t:(this._app=t,this._databaseId=function(i){if(!Object.prototype.hasOwnProperty.apply(i.options,["projectId"]))throw new w(f.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ve(i.options.projectId)}(t))}get app(){if(!this._app)throw new w(f.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(t){if(this._settingsFrozen)throw new w(f.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oa(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Sh;switch(n.type){case"gapi":const s=n.client;return k(!(typeof s!="object"||s===null||!s.auth||!s.auth.getAuthHeaderValueForFirstParty)),new bh(s,n.sessionIndex||"0",n.iamToken||null);case"provider":return n.client;default:throw new w(f.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=La.get(t);n&&(y("ComponentProvider","Removing Datastore"),La.delete(t),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(t,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Fe(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new st(this.firestore,t,this._key)}}class Di{constructor(t,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=t}withConverter(t){return new Di(this.firestore,t,this._query)}}class Fe extends Di{constructor(t,n,s){super(t,n,ii(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new st(this.firestore,null,new T(t))}withConverter(t){return new Fe(this.firestore,t,this._path)}}function Zd(e,t,...n){if(e=yt(e),arguments.length===1&&(t=yo.A()),ed("doc","path",t),e instanceof Ma){const s=L.fromString(t,...n);return xa(s),new st(e,null,new T(s))}{if(!(e instanceof st||e instanceof Fe))throw new w(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(L.fromString(t,...n));return xa(s),new st(e.firestore,e instanceof Fe?e.converter:null,new T(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(){this.mc=Promise.resolve(),this.gc=[],this.yc=!1,this.Tc=[],this.Ec=null,this.Ic=!1,this.Ac=!1,this.Rc=[],this.ur=new fa(this,"async_queue_retry"),this.bc=()=>{const n=Ei();n&&y("AsyncQueue","Visibility state changed to "+n.visibilityState),this.ur.er()};const t=Ei();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.bc)}get isShuttingDown(){return this.yc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Pc(),this.vc(t)}enterRestrictedMode(t){if(!this.yc){this.yc=!0,this.Ac=t||!1;const n=Ei();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.bc)}}enqueue(t){if(this.Pc(),this.yc)return new Promise(()=>{});const n=new dt;return this.vc(()=>this.yc&&this.Ac?Promise.resolve():(t().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.gc.push(t),this.Vc()))}async Vc(){if(this.gc.length!==0){try{await this.gc[0](),this.gc.shift(),this.ur.reset()}catch(t){if(!Le(t))throw t;y("AsyncQueue","Operation failed with retryable error: "+t)}this.gc.length>0&&this.ur.Zi(()=>this.Vc())}}vc(t){const n=this.mc.then(()=>(this.Ic=!0,t().catch(s=>{this.Ec=s,this.Ic=!1;const i=function(r){let o=r.message||"";return r.stack&&(o=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),o}(s);throw ft("INTERNAL UNHANDLED ERROR: ",i),s}).then(s=>(this.Ic=!1,s))));return this.mc=n,n}enqueueAfterDelay(t,n,s){this.Pc(),this.Rc.indexOf(t)>-1&&(n=0);const i=Ai.createAndSchedule(this,t,n,s,r=>this.Sc(r));return this.Tc.push(i),i}Pc(){this.Ec&&S()}verifyOperationInProgress(){}async Dc(){let t;do t=this.mc,await t;while(t!==this.mc)}Cc(t){for(const n of this.Tc)if(n.timerId===t)return!0;return!1}Nc(t){return this.Dc().then(()=>{this.Tc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.Tc)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.Dc()})}kc(t){this.Rc.push(t)}Sc(t){const n=this.Tc.indexOf(t);this.Tc.splice(n,1)}}class Ri extends Ma{constructor(t,n,s){super(t,n,s),this.type="firestore",this._queue=new sd,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Va(this),this._firestoreClient.terminate()}}function tp(e=lu()){return au(e,"firestore").getImmediate()}function Pa(e){return e._firestoreClient||Va(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function Va(e){var t;const n=e._freezeSettings(),s=function(i,r,o,a){return new td(i,r,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new zf(e._authCredentials,e._appCheckCredentials,e._queue,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new w(f.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new J(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Yt(j.fromBase64String(t))}catch(n){throw new w(f.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new Yt(j.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new w(f.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new w(f.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return _(this._lat,t._lat)||_(this._long,t._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id=/^__.*__$/;class Fa{constructor(t,n,s){this.data=t,this.fieldMask=n,this.fieldTransforms=s}toMutation(t,n){return new Ht(t,this.data,this.fieldMask,n,this.fieldTransforms)}}function Ua(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw S()}}class Oi{constructor(t,n,s,i,r,o){this.settings=t,this.databaseId=n,this.k=s,this.ignoreUndefinedProperties=i,r===void 0&&this.xc(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get $c(){return this.settings.$c}Oc(t){return new Oi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.k,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mc(t){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(t),i=this.Oc({path:s,Fc:!1});return i.Lc(t),i}Bc(t){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(t),i=this.Oc({path:s,Fc:!1});return i.xc(),i}Uc(t){return this.Oc({path:void 0,Fc:!0})}qc(t){return Gn(t,this.settings.methodName,this.settings.Kc||!1,this.path,this.settings.jc)}contains(t){return this.fieldMask.find(n=>t.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>t.isPrefixOf(n.field))!==void 0}xc(){if(this.path)for(let t=0;t<this.path.length;t++)this.Lc(this.path.get(t))}Lc(t){if(t.length===0)throw this.qc("Document fields must not be empty");if(Ua(this.$c)&&id.test(t))throw this.qc('Document fields cannot begin and end with "__"')}}class rd{constructor(t,n,s){this.databaseId=t,this.ignoreUndefinedProperties=n,this.k=s||Fn(t)}Qc(t,n,s,i=!1){return new Oi({$c:t,methodName:n,jc:s,path:J.emptyPath(),Fc:!1,Kc:i},this.databaseId,this.k,this.ignoreUndefinedProperties)}}function od(e){const t=e._freezeSettings(),n=Fn(e._databaseId);return new rd(e._databaseId,!!t.ignoreUndefinedProperties,n)}class Hn extends Li{_toFieldTransform(t){if(t.$c!==2)throw t.$c===1?t.qc(`${this._methodName}() can only appear at the top level of your update data`):t.qc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Hn}}function ad(e,t,n,s){const i=e.Qc(1,t,n);qa("Data must be an object, but it was:",i,s);const r=[],o=nt.empty();Ct(s,(c,u)=>{const h=Mi(t,c,n);u=yt(u);const l=i.Bc(h);if(u instanceof Hn)r.push(h);else{const d=Kn(u,l);d!=null&&(r.push(h),o.set(h,d))}});const a=new Qs(r);return new Fa(o,a,i.fieldTransforms)}function cd(e,t,n,s,i,r){const o=e.Qc(1,t,n),a=[ja(t,s,n)],c=[i];if(r.length%2!=0)throw new w(f.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<r.length;d+=2)a.push(ja(t,r[d])),c.push(r[d+1]);const u=[],h=nt.empty();for(let d=a.length-1;d>=0;--d)if(!ld(u,a[d])){const m=a[d];let v=c[d];v=yt(v);const N=o.Bc(m);if(v instanceof Hn)u.push(m);else{const P=Kn(v,N);P!=null&&(u.push(m),h.set(m,P))}}const l=new Qs(u);return new Fa(h,l,o.fieldTransforms)}function Kn(e,t){if($a(e=yt(e)))return qa("Unsupported field value:",t,e),ud(e,t);if(e instanceof Li)return function(n,s){if(!Ua(s.$c))throw s.qc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.qc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.Fc&&t.$c!==4)throw t.qc("Nested arrays are not supported");return function(n,s){const i=[];let r=0;for(const o of n){let a=Kn(o,s.Uc(r));a==null&&(a={nullValue:"NULL_VALUE"}),i.push(a),r++}return{arrayValue:{values:i}}}(e,t)}return function(n,s){if((n=yt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Xh(s.k,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=et.fromDate(n);return{timestampValue:Vn(s.k,i)}}if(n instanceof et){const i=new et(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Vn(s.k,i)}}if(n instanceof xi)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Yt)return{bytesValue:Jo(s.k,n._byteString)};if(n instanceof st){const i=s.databaseId,r=n.firestore._databaseId;if(!r.isEqual(i))throw s.qc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:hi(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s.qc(`Unsupported field value: ${ki(n)}`)}(e,t)}function ud(e,t){const n={};return wo(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ct(e,(s,i)=>{const r=Kn(i,t.Mc(s));r!=null&&(n[s]=r)}),{mapValue:{fields:n}}}function $a(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof et||e instanceof xi||e instanceof Yt||e instanceof st||e instanceof Li)}function qa(e,t,n){if(!$a(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=ki(n);throw s==="an object"?t.qc(e+" a custom object"):t.qc(e+" "+s)}}function ja(e,t,n){if((t=yt(t))instanceof Bn)return t._internalPath;if(typeof t=="string")return Mi(e,t);throw Gn("Field path arguments must be of type string or ",e,!1,void 0,n)}const hd=new RegExp("[~\\*/\\[\\]]");function Mi(e,t,n){if(t.search(hd)>=0)throw Gn(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Bn(...t.split("."))._internalPath}catch{throw Gn(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Gn(e,t,n,s,i){const r=s&&!s.isEmpty(),o=i!==void 0;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${s}`),o&&(c+=` in document ${i}`),c+=")"),new w(f.INVALID_ARGUMENT,a+e+c)}function ld(e,t){return e.some(n=>n.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(t,n,s,i,r){this._firestore=t,this._userDataWriter=n,this._key=s,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new st(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new fd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const n=this._document.data.field(Ha("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n)}}}class fd extends Ba{data(){return super.data()}}function Ha(e,t){return typeof t=="string"?Mi(e,t):t instanceof Bn?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(t,n){this.hasPendingWrites=t,this.fromCache=n}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ka extends Ba{constructor(t,n,s,i,r,o){super(t,n,s,i,o),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const n=new pd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,n={}){if(this._document){const s=this._document.data.field(Ha("DocumentSnapshot.get",t));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class pd extends Ka{data(t={}){return super.data(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{convertValue(t,n="none"){switch(bt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return O(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,n);case 5:return t.stringValue;case 6:return this.convertBytes($t(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,n);case 10:return this.convertObject(t.mapValue,n);default:throw S()}}convertObject(t,n){const s={};return Ct(t.fields,(i,r)=>{s[i]=this.convertValue(r,n)}),s}convertGeoPoint(t){return new xi(O(t.latitude),O(t.longitude))}convertArray(t,n){return(t.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(t,n){switch(n){case"previous":const s=To(t);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(Ae(t));default:return null}}convertTimestamp(t){const n=pt(t);return new et(n.seconds,n.nanos)}convertDocumentKey(t,n){const s=L.fromString(t);k(ra(s));const i=new Ve(s.get(1),s.get(3)),r=new T(s.popFirst(5));return i.isEqual(n)||ft(`Document ${r} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ep(e){e=jn(e,st);const t=jn(e.firestore,Ri);return Zf(Pa(t),e._key).then(n=>vd(t,e,n))}class md extends gd{constructor(t){super(),this.firestore=t}convertBytes(t){return new Yt(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new st(this.firestore,null,n)}}function np(e,t,n,...s){e=jn(e,st);const i=jn(e.firestore,Ri),r=od(i);let o;return o=typeof(t=yt(t))=="string"||t instanceof Bn?cd(r,"updateDoc",e._key,t,n,s):ad(r,"updateDoc",e._key,t),yd(i,[o.toMutation(e._key,Bt.exists(!0))])}function yd(e,t){return function(n,s){const i=new dt;return n.asyncQueue.enqueueAndForget(async()=>Mf(await Yf(n),s,i)),i.promise}(Pa(e),t)}function vd(e,t,n){const s=n.docs.get(t._key),i=new md(e);return new Ka(e,i,t._key,s,new dd(n.hasPendingWrites,n.fromCache),t.converter)}(function(e,t=!0){(function(n){Ft=n})(hu),es(new Ge("firestore",(n,{options:s})=>{const i=n.getProvider("app").getImmediate(),r=new Ri(i,new Ah(n.getProvider("auth-internal")),new Nh(n.getProvider("app-check-internal")));return s=Object.assign({useFetchStreams:t},s),r._setSettings(s),r},"PUBLIC")),Lt(po,"3.4.4",e),Lt(po,"3.4.4","esm2017")})();export{Gd as A,fc as B,za as C,Yd as D,qd as E,wd as F,Td as G,Id as H,Ed as I,ec as J,te as K,_d as L,ee as M,Fd as N,xd as O,Md as P,Nd as Q,Ad as R,Xd as S,$d as T,Jd as U,tp as V,np as W,Zd as X,ep as Y,ic as a,kd as b,Dd as c,nc as d,sc as e,Od as f,Sd as g,ac as h,Qd as i,Ld as j,Cd as k,bd as l,Rd as m,jd as n,Hd as o,Bd as p,hc as q,Ud as r,Qa as s,zn as t,Vd as u,Pd as v,zd as w,Wd as x,lc as y,Kd as z};
