function Ir(){}function DA(n,e){for(const t in e)n[t]=e[t];return n}function Ld(n){return n()}function xd(){return Object.create(null)}function yi(n){n.forEach(Ld)}function OA(n){return typeof n=="function"}function LA(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}function xA(n){return Object.keys(n).length===0}function PA(n,...e){if(n==null)return Ir;const t=n.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function sD(n,e,t){n.$$.on_destroy.push(PA(e,t))}function oD(n,e,t,i){if(n){const o=Pd(n,e,t,i);return n[0](o)}}function Pd(n,e,t,i){return n[1]&&i?DA(t.ctx.slice(),n[1](i(e))):t.ctx}function aD(n,e,t,i){if(n[2]&&i){const o=n[2](i(t));if(e.dirty===void 0)return o;if(typeof o=="object"){const u=[],c=Math.max(e.dirty.length,o.length);for(let h=0;h<c;h+=1)u[h]=e.dirty[h]|o[h];return u}return e.dirty|o}return e.dirty}function uD(n,e,t,i,o,u){if(o){const c=Pd(e,t,i,u);n.p(c,o)}}function cD(n){if(n.ctx.length>32){const e=[],t=n.ctx.length/32;for(let i=0;i<t;i++)e[i]=-1;return e}return-1}let ao=!1;function MA(){ao=!0}function UA(){ao=!1}function FA(n,e,t,i){for(;n<e;){const o=n+(e-n>>1);t(o)<=i?n=o+1:e=o}return n}function VA(n){if(n.hydrate_init)return;n.hydrate_init=!0;let e=n.childNodes;if(n.nodeName==="HEAD"){const p=[];for(let m=0;m<e.length;m++){const _=e[m];_.claim_order!==void 0&&p.push(_)}e=p}const t=new Int32Array(e.length+1),i=new Int32Array(e.length);t[0]=-1;let o=0;for(let p=0;p<e.length;p++){const m=e[p].claim_order,_=(o>0&&e[t[o]].claim_order<=m?o+1:FA(1,o,C=>e[t[C]].claim_order,m))-1;i[p]=t[_]+1;const T=_+1;t[T]=p,o=Math.max(T,o)}const u=[],c=[];let h=e.length-1;for(let p=t[o]+1;p!=0;p=i[p-1]){for(u.push(e[p-1]);h>=p;h--)c.push(e[h]);h--}for(;h>=0;h--)c.push(e[h]);u.reverse(),c.sort((p,m)=>p.claim_order-m.claim_order);for(let p=0,m=0;p<c.length;p++){for(;m<u.length&&c[p].claim_order>=u[m].claim_order;)m++;const _=m<u.length?u[m]:null;n.insertBefore(c[p],_)}}function BA(n,e){if(ao){for(VA(n),(n.actual_end_child===void 0||n.actual_end_child!==null&&n.actual_end_child.parentElement!==n)&&(n.actual_end_child=n.firstChild);n.actual_end_child!==null&&n.actual_end_child.claim_order===void 0;)n.actual_end_child=n.actual_end_child.nextSibling;e!==n.actual_end_child?(e.claim_order!==void 0||e.parentNode!==n)&&n.insertBefore(e,n.actual_end_child):n.actual_end_child=e.nextSibling}else(e.parentNode!==n||e.nextSibling!==null)&&n.appendChild(e)}function lD(n,e,t){ao&&!t?BA(n,e):(e.parentNode!==n||e.nextSibling!=t)&&n.insertBefore(e,t||null)}function $A(n){n.parentNode.removeChild(n)}function hD(n,e){for(let t=0;t<n.length;t+=1)n[t]&&n[t].d(e)}function qA(n){return document.createElement(n)}function Ju(n){return document.createTextNode(n)}function fD(){return Ju(" ")}function dD(){return Ju("")}function pD(n,e,t,i){return n.addEventListener(e,t,i),()=>n.removeEventListener(e,t,i)}function gD(n){return function(e){e.target===this&&n.call(this,e)}}function mD(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function WA(n){return Array.from(n.childNodes)}function HA(n){n.claim_info===void 0&&(n.claim_info={last_index:0,total_claimed:0})}function Md(n,e,t,i,o=!1){HA(n);const u=(()=>{for(let c=n.claim_info.last_index;c<n.length;c++){const h=n[c];if(e(h)){const p=t(h);return p===void 0?n.splice(c,1):n[c]=p,o||(n.claim_info.last_index=c),h}}for(let c=n.claim_info.last_index-1;c>=0;c--){const h=n[c];if(e(h)){const p=t(h);return p===void 0?n.splice(c,1):n[c]=p,o?p===void 0&&n.claim_info.last_index--:n.claim_info.last_index=c,h}}return i()})();return u.claim_order=n.claim_info.total_claimed,n.claim_info.total_claimed+=1,u}function GA(n,e,t,i){return Md(n,o=>o.nodeName===e,o=>{const u=[];for(let c=0;c<o.attributes.length;c++){const h=o.attributes[c];t[h.name]||u.push(h.name)}u.forEach(c=>o.removeAttribute(c))},()=>i(e))}function yD(n,e,t){return GA(n,e,t,qA)}function KA(n,e){return Md(n,t=>t.nodeType===3,t=>{const i=""+e;if(t.data.startsWith(i)){if(t.data.length!==i.length)return t.splitText(i.length)}else t.data=i},()=>Ju(e),!0)}function vD(n){return KA(n," ")}function _D(n,e){e=""+e,n.wholeText!==e&&(n.data=e)}function wD(n,e){n.value=e==null?"":e}function ED(n,e,t,i){t===null?n.style.removeProperty(e):n.style.setProperty(e,t,i?"important":"")}function TD(n,e,t){n.classList[t?"add":"remove"](e)}function zA(n,e,t=!1){const i=document.createEvent("CustomEvent");return i.initCustomEvent(n,t,!1,e),i}let vi;function _i(n){vi=n}function uo(){if(!vi)throw new Error("Function called outside component initialization");return vi}function ID(n){uo().$$.on_mount.push(n)}function AD(n){uo().$$.after_update.push(n)}function SD(){const n=uo();return(e,t)=>{const i=n.$$.callbacks[e];if(i){const o=zA(e,t);i.slice().forEach(u=>{u.call(n,o)})}}}function bD(n,e){uo().$$.context.set(n,e)}function CD(n,e){const t=n.$$.callbacks[e.type];t&&t.slice().forEach(i=>i.call(this,e))}const wi=[],Ud=[],co=[],Fd=[],Vd=Promise.resolve();let Yu=!1;function Bd(){Yu||(Yu=!0,Vd.then($d))}function RD(){return Bd(),Vd}function Xu(n){co.push(n)}const Qu=new Set;let lo=0;function $d(){const n=vi;do{for(;lo<wi.length;){const e=wi[lo];lo++,_i(e),jA(e.$$)}for(_i(null),wi.length=0,lo=0;Ud.length;)Ud.pop()();for(let e=0;e<co.length;e+=1){const t=co[e];Qu.has(t)||(Qu.add(t),t())}co.length=0}while(wi.length);for(;Fd.length;)Fd.pop()();Yu=!1,Qu.clear(),_i(n)}function jA(n){if(n.fragment!==null){n.update(),yi(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(Xu)}}const ho=new Set;let $n;function ND(){$n={r:0,c:[],p:$n}}function kD(){$n.r||yi($n.c),$n=$n.p}function JA(n,e){n&&n.i&&(ho.delete(n),n.i(e))}function DD(n,e,t,i){if(n&&n.o){if(ho.has(n))return;ho.add(n),$n.c.push(()=>{ho.delete(n),i&&(t&&n.d(1),i())}),n.o(e)}}function OD(n,e){const t={},i={},o={$$scope:1};let u=n.length;for(;u--;){const c=n[u],h=e[u];if(h){for(const p in c)p in h||(i[p]=1);for(const p in h)o[p]||(t[p]=h[p],o[p]=1);n[u]=h}else for(const p in c)o[p]=1}for(const c in i)c in t||(t[c]=void 0);return t}function LD(n){return typeof n=="object"&&n!==null?n:{}}function xD(n){n&&n.c()}function PD(n,e){n&&n.l(e)}function YA(n,e,t,i){const{fragment:o,on_mount:u,on_destroy:c,after_update:h}=n.$$;o&&o.m(e,t),i||Xu(()=>{const p=u.map(Ld).filter(OA);c?c.push(...p):yi(p),n.$$.on_mount=[]}),h.forEach(Xu)}function XA(n,e){const t=n.$$;t.fragment!==null&&(yi(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function QA(n,e){n.$$.dirty[0]===-1&&(wi.push(n),Bd(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function MD(n,e,t,i,o,u,c,h=[-1]){const p=vi;_i(n);const m=n.$$={fragment:null,ctx:null,props:u,update:Ir,not_equal:o,bound:xd(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(p?p.$$.context:[])),callbacks:xd(),dirty:h,skip_bound:!1,root:e.target||p.$$.root};c&&c(m.root);let _=!1;if(m.ctx=t?t(n,e.props||{},(T,C,...k)=>{const x=k.length?k[0]:C;return m.ctx&&o(m.ctx[T],m.ctx[T]=x)&&(!m.skip_bound&&m.bound[T]&&m.bound[T](x),_&&QA(n,T)),C}):[],m.update(),_=!0,yi(m.before_update),m.fragment=i?i(m.ctx):!1,e.target){if(e.hydrate){MA();const T=WA(e.target);m.fragment&&m.fragment.l(T),T.forEach($A)}else m.fragment&&m.fragment.c();e.intro&&JA(n.$$.fragment),YA(n,e.target,e.anchor,e.customElement),UA(),$d()}_i(p)}class UD{$destroy(){XA(this,1),this.$destroy=Ir}$on(e,t){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(t),()=>{const o=i.indexOf(t);o!==-1&&i.splice(o,1)}}$set(e){this.$$set&&!xA(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Ar=[];function FD(n,e=Ir){let t;const i=new Set;function o(h){if(LA(n,h)&&(n=h,t)){const p=!Ar.length;for(const m of i)m[1](),Ar.push(m,n);if(p){for(let m=0;m<Ar.length;m+=2)Ar[m][0](Ar[m+1]);Ar.length=0}}}function u(h){o(h(n))}function c(h,p=Ir){const m=[h,p];return i.add(m),i.size===1&&(t=e(o)||Ir),h(n),()=>{i.delete(m),i.size===0&&(t(),t=null)}}return{set:o,update:u,subscribe:c}}/**
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
 */const ZA=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let o=n.charCodeAt(i);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)==55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)==56320?(o=65536+((o&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},e1=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const o=n[t++];if(o<128)e[i++]=String.fromCharCode(o);else if(o>191&&o<224){const u=n[t++];e[i++]=String.fromCharCode((o&31)<<6|u&63)}else if(o>239&&o<365){const u=n[t++],c=n[t++],h=n[t++],p=((o&7)<<18|(u&63)<<12|(c&63)<<6|h&63)-65536;e[i++]=String.fromCharCode(55296+(p>>10)),e[i++]=String.fromCharCode(56320+(p&1023))}else{const u=n[t++],c=n[t++];e[i++]=String.fromCharCode((o&15)<<12|(u&63)<<6|c&63)}}return e.join("")},t1={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let o=0;o<n.length;o+=3){const u=n[o],c=o+1<n.length,h=c?n[o+1]:0,p=o+2<n.length,m=p?n[o+2]:0,_=u>>2,T=(u&3)<<4|h>>4;let C=(h&15)<<2|m>>6,k=m&63;p||(k=64,c||(C=64)),i.push(t[_],t[T],t[C],t[k])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ZA(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):e1(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let o=0;o<n.length;){const u=t[n.charAt(o++)],h=o<n.length?t[n.charAt(o)]:0;++o;const m=o<n.length?t[n.charAt(o)]:64;++o;const T=o<n.length?t[n.charAt(o)]:64;if(++o,u==null||h==null||m==null||T==null)throw Error();const C=u<<2|h>>4;if(i.push(C),m!==64){const k=h<<4&240|m>>2;if(i.push(k),T!==64){const x=m<<6&192|T;i.push(x)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},n1=function(n){try{return t1.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */class r1{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function De(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function qd(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function Wd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Hd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function i1(){return De().indexOf("Electron/")>=0}function Gd(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function s1(){return De().indexOf("MSAppHost/")>=0}/**
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
 */const o1="FirebaseError";class qn extends Error{constructor(e,t,i){super(t);this.code=e,this.customData=i,this.name=o1,Object.setPrototypeOf(this,qn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ei.prototype.create)}}class Ei{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},o=`${this.service}/${e}`,u=this.errors[e],c=u?a1(u,i):"Error",h=`${this.serviceName}: ${c} (${o}).`;return new qn(o,h,i)}}function a1(n,e){return n.replace(u1,(t,i)=>{const o=e[i];return o!=null?String(o):`<${i}?>`})}const u1=/\{\$([^}]+)}/g;function c1(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function fo(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const o of t){if(!i.includes(o))return!1;const u=n[o],c=e[o];if(Kd(u)&&Kd(c)){if(!fo(u,c))return!1}else if(u!==c)return!1}for(const o of i)if(!t.includes(o))return!1;return!0}function Kd(n){return n!==null&&typeof n=="object"}/**
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
 */function Sr(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function l1(n,e){const t=new h1(n,e);return t.subscribe.bind(t)}class h1{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let o;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");f1(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:i},o.next===void 0&&(o.next=Zu),o.error===void 0&&(o.error=Zu),o.complete===void 0&&(o.complete=Zu);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),u}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console!="undefined"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function f1(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Zu(){}/**
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
 */function mt(n){return n&&n._delegate?n._delegate:n}class br{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Wn="[DEFAULT]";/**
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
 */class d1{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new r1;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&i.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),o=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(u){if(o)return null;throw u}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(g1(e))try{this.getOrInitializeService({instanceIdentifier:Wn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const u=this.getOrInitializeService({instanceIdentifier:o});i.resolve(u)}catch{}}}}clearInstance(e=Wn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Wn){return this.instances.has(e)}getOptions(e=Wn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[u,c]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(u);i===h&&c.resolve(o)}return o}onInit(e,t){var i;const o=this.normalizeInstanceIdentifier(t),u=(i=this.onInitCallbacks.get(o))!==null&&i!==void 0?i:new Set;u.add(e),this.onInitCallbacks.set(o,u);const c=this.instances.get(o);return c&&e(c,o),()=>{u.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(!!i)for(const o of i)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:p1(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Wn){return this.component?this.component.multipleInstances?e:Wn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function p1(n){return n===Wn?void 0:n}function g1(n){return n.instantiationMode==="EAGER"}/**
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
 */class m1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new d1(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var oe;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(oe||(oe={}));const y1={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},v1=oe.INFO,_1={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},w1=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),o=_1[e];if(o)console[o](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ec{constructor(e){this.name=e,this._logLevel=v1,this._logHandler=w1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?y1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}/**
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
 */class E1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(T1(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function T1(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const tc="@firebase/app",zd="0.7.15";/**
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
 */const nc=new ec("@firebase/app"),I1="@firebase/app-compat",A1="@firebase/analytics-compat",S1="@firebase/analytics",b1="@firebase/app-check-compat",C1="@firebase/app-check",R1="@firebase/auth",N1="@firebase/auth-compat",k1="@firebase/database",D1="@firebase/database-compat",O1="@firebase/functions",L1="@firebase/functions-compat",x1="@firebase/installations",P1="@firebase/installations-compat",M1="@firebase/messaging",U1="@firebase/messaging-compat",F1="@firebase/performance",V1="@firebase/performance-compat",B1="@firebase/remote-config",$1="@firebase/remote-config-compat",q1="@firebase/storage",W1="@firebase/storage-compat",H1="@firebase/firestore",G1="@firebase/firestore-compat",K1="firebase",z1="9.6.5";/**
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
 */const jd="[DEFAULT]",j1={[tc]:"fire-core",[I1]:"fire-core-compat",[S1]:"fire-analytics",[A1]:"fire-analytics-compat",[C1]:"fire-app-check",[b1]:"fire-app-check-compat",[R1]:"fire-auth",[N1]:"fire-auth-compat",[k1]:"fire-rtdb",[D1]:"fire-rtdb-compat",[O1]:"fire-fn",[L1]:"fire-fn-compat",[x1]:"fire-iid",[P1]:"fire-iid-compat",[M1]:"fire-fcm",[U1]:"fire-fcm-compat",[F1]:"fire-perf",[V1]:"fire-perf-compat",[B1]:"fire-rc",[$1]:"fire-rc-compat",[q1]:"fire-gcs",[W1]:"fire-gcs-compat",[H1]:"fire-fst",[G1]:"fire-fst-compat","fire-js":"fire-js",[K1]:"fire-js-all"};/**
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
 */const po=new Map,rc=new Map;function J1(n,e){try{n.container.addComponent(e)}catch(t){nc.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ti(n){const e=n.name;if(rc.has(e))return nc.debug(`There were multiple attempts to register component ${e}.`),!1;rc.set(e,n);for(const t of po.values())J1(t,n);return!0}function ic(n,e){return n.container.getProvider(e)}/**
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
 */const Y1={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function."},go=new Ei("app","Firebase",Y1);/**
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
 */class X1{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new br("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw go.create("app-deleted",{appName:this._name})}}/**
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
 */const Ii=z1;function VD(n,e={}){typeof e!="object"&&(e={name:e});const t=Object.assign({name:jd,automaticDataCollectionEnabled:!1},e),i=t.name;if(typeof i!="string"||!i)throw go.create("bad-app-name",{appName:String(i)});const o=po.get(i);if(o){if(fo(n,o.options)&&fo(t,o.config))return o;throw go.create("duplicate-app",{appName:i})}const u=new m1(i);for(const h of rc.values())u.addComponent(h);const c=new X1(n,t,u);return po.set(i,c),c}function Jd(n=jd){const e=po.get(n);if(!e)throw go.create("no-app",{appName:n});return e}function mn(n,e,t){var i;let o=(i=j1[n])!==null&&i!==void 0?i:n;t&&(o+=`-${t}`);const u=o.match(/\s|\//),c=e.match(/\s|\//);if(u||c){const h=[`Unable to register library "${o}" with version "${e}":`];u&&h.push(`library name "${o}" contains illegal characters (whitespace or "/")`),u&&c&&h.push("and"),c&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),nc.warn(h.join(" "));return}Ti(new br(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
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
 */function Q1(n){Ti(new br("platform-logger",e=>new E1(e),"PRIVATE")),mn(tc,zd,n),mn(tc,zd,"esm2017"),mn("fire-js","")}Q1("");var Z1="firebase",eS="9.6.5";/**
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
 */mn(Z1,eS,"app");var tS=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},P,sc=sc||{},W=tS||self;function mo(){}function oc(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function Ai(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function nS(n){return Object.prototype.hasOwnProperty.call(n,ac)&&n[ac]||(n[ac]=++rS)}var ac="closure_uid_"+(1e9*Math.random()>>>0),rS=0;function iS(n,e,t){return n.call.apply(n.bind,arguments)}function sS(n,e,t){if(!n)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var o=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(o,i),n.apply(e,o)}}return function(){return n.apply(e,arguments)}}function Me(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Me=iS:Me=sS,Me.apply(null,arguments)}function yo(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var i=t.slice();return i.push.apply(i,arguments),n.apply(this,i)}}function Ue(n,e){function t(){}t.prototype=e.prototype,n.Z=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.Vb=function(i,o,u){for(var c=Array(arguments.length-2),h=2;h<arguments.length;h++)c[h-2]=arguments[h];return e.prototype[o].apply(i,c)}}function yn(){this.s=this.s,this.o=this.o}var oS=0,aS={};yn.prototype.s=!1;yn.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),oS!=0)){var n=nS(this);delete aS[n]}};yn.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Yd=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1},Xd=Array.prototype.forEach?function(n,e,t){Array.prototype.forEach.call(n,e,t)}:function(n,e,t){const i=n.length,o=typeof n=="string"?n.split(""):n;for(let u=0;u<i;u++)u in o&&e.call(t,o[u],u,n)};function uS(n){e:{var e=ZS;const t=n.length,i=typeof n=="string"?n.split(""):n;for(let o=0;o<t;o++)if(o in i&&e.call(void 0,i[o],o,n)){e=o;break e}e=-1}return 0>e?null:typeof n=="string"?n.charAt(e):n[e]}function Qd(n){return Array.prototype.concat.apply([],arguments)}function uc(n){const e=n.length;if(0<e){const t=Array(e);for(let i=0;i<e;i++)t[i]=n[i];return t}return[]}function vo(n){return/^[\s\xa0]*$/.test(n)}var Zd=String.prototype.trim?function(n){return n.trim()}:function(n){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(n)[1]};function et(n,e){return n.indexOf(e)!=-1}function cc(n,e){return n<e?-1:n>e?1:0}var tt;e:{var ep=W.navigator;if(ep){var tp=ep.userAgent;if(tp){tt=tp;break e}}tt=""}function lc(n,e,t){for(const i in n)e.call(t,n[i],i,n)}function np(n){const e={};for(const t in n)e[t]=n[t];return e}var rp="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ip(n,e){let t,i;for(let o=1;o<arguments.length;o++){i=arguments[o];for(t in i)n[t]=i[t];for(let u=0;u<rp.length;u++)t=rp[u],Object.prototype.hasOwnProperty.call(i,t)&&(n[t]=i[t])}}function hc(n){return hc[" "](n),n}hc[" "]=mo;function cS(n){var e=fS;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=n(9)}var lS=et(tt,"Opera"),Cr=et(tt,"Trident")||et(tt,"MSIE"),sp=et(tt,"Edge"),fc=sp||Cr,op=et(tt,"Gecko")&&!(et(tt.toLowerCase(),"webkit")&&!et(tt,"Edge"))&&!(et(tt,"Trident")||et(tt,"MSIE"))&&!et(tt,"Edge"),hS=et(tt.toLowerCase(),"webkit")&&!et(tt,"Edge");function ap(){var n=W.document;return n?n.documentMode:void 0}var _o;e:{var dc="",pc=function(){var n=tt;if(op)return/rv:([^\);]+)(\)|;)/.exec(n);if(sp)return/Edge\/([\d\.]+)/.exec(n);if(Cr)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(hS)return/WebKit\/(\S+)/.exec(n);if(lS)return/(?:Version)[ \/]?(\S+)/.exec(n)}();if(pc&&(dc=pc?pc[1]:""),Cr){var gc=ap();if(gc!=null&&gc>parseFloat(dc)){_o=String(gc);break e}}_o=dc}var fS={};function dS(){return cS(function(){let n=0;const e=Zd(String(_o)).split("."),t=Zd("9").split("."),i=Math.max(e.length,t.length);for(let c=0;n==0&&c<i;c++){var o=e[c]||"",u=t[c]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],u=/(\d*)(\D*)(.*)/.exec(u)||["","","",""],o[0].length==0&&u[0].length==0)break;n=cc(o[1].length==0?0:parseInt(o[1],10),u[1].length==0?0:parseInt(u[1],10))||cc(o[2].length==0,u[2].length==0)||cc(o[2],u[2]),o=o[3],u=u[3]}while(n==0)}return 0<=n})}var mc;if(W.document&&Cr){var up=ap();mc=up||parseInt(_o,10)||void 0}else mc=void 0;var pS=mc,gS=function(){if(!W.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{W.addEventListener("test",mo,e),W.removeEventListener("test",mo,e)}catch{}return n}();function Ge(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}Ge.prototype.h=function(){this.defaultPrevented=!0};function Si(n,e){if(Ge.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,i=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(op){e:{try{hc(e.nodeName);var o=!0;break e}catch{}o=!1}o||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,i?(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:mS[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&Si.Z.h.call(this)}}Ue(Si,Ge);var mS={2:"touch",3:"pen",4:"mouse"};Si.prototype.h=function(){Si.Z.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var bi="closure_listenable_"+(1e6*Math.random()|0),yS=0;function vS(n,e,t,i,o){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!i,this.ia=o,this.key=++yS,this.ca=this.fa=!1}function wo(n){n.ca=!0,n.listener=null,n.proxy=null,n.src=null,n.ia=null}function Eo(n){this.src=n,this.g={},this.h=0}Eo.prototype.add=function(n,e,t,i,o){var u=n.toString();n=this.g[u],n||(n=this.g[u]=[],this.h++);var c=vc(n,e,i,o);return-1<c?(e=n[c],t||(e.fa=!1)):(e=new vS(e,this.src,u,!!i,o),e.fa=t,n.push(e)),e};function yc(n,e){var t=e.type;if(t in n.g){var i=n.g[t],o=Yd(i,e),u;(u=0<=o)&&Array.prototype.splice.call(i,o,1),u&&(wo(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function vc(n,e,t,i){for(var o=0;o<n.length;++o){var u=n[o];if(!u.ca&&u.listener==e&&u.capture==!!t&&u.ia==i)return o}return-1}var _c="closure_lm_"+(1e6*Math.random()|0),wc={};function cp(n,e,t,i,o){if(i&&i.once)return hp(n,e,t,i,o);if(Array.isArray(e)){for(var u=0;u<e.length;u++)cp(n,e[u],t,i,o);return null}return t=Ac(t),n&&n[bi]?n.N(e,t,Ai(i)?!!i.capture:!!i,o):lp(n,e,t,!1,i,o)}function lp(n,e,t,i,o,u){if(!e)throw Error("Invalid event type");var c=Ai(o)?!!o.capture:!!o,h=Tc(n);if(h||(n[_c]=h=new Eo(n)),t=h.add(e,t,i,c,u),t.proxy)return t;if(i=_S(),t.proxy=i,i.src=n,i.listener=t,n.addEventListener)gS||(o=c),o===void 0&&(o=!1),n.addEventListener(e.toString(),i,o);else if(n.attachEvent)n.attachEvent(dp(e.toString()),i);else if(n.addListener&&n.removeListener)n.addListener(i);else throw Error("addEventListener and attachEvent are unavailable.");return t}function _S(){function n(t){return e.call(n.src,n.listener,t)}var e=wS;return n}function hp(n,e,t,i,o){if(Array.isArray(e)){for(var u=0;u<e.length;u++)hp(n,e[u],t,i,o);return null}return t=Ac(t),n&&n[bi]?n.O(e,t,Ai(i)?!!i.capture:!!i,o):lp(n,e,t,!0,i,o)}function fp(n,e,t,i,o){if(Array.isArray(e))for(var u=0;u<e.length;u++)fp(n,e[u],t,i,o);else i=Ai(i)?!!i.capture:!!i,t=Ac(t),n&&n[bi]?(n=n.i,e=String(e).toString(),e in n.g&&(u=n.g[e],t=vc(u,t,i,o),-1<t&&(wo(u[t]),Array.prototype.splice.call(u,t,1),u.length==0&&(delete n.g[e],n.h--)))):n&&(n=Tc(n))&&(e=n.g[e.toString()],n=-1,e&&(n=vc(e,t,i,o)),(t=-1<n?e[n]:null)&&Ec(t))}function Ec(n){if(typeof n!="number"&&n&&!n.ca){var e=n.src;if(e&&e[bi])yc(e.i,n);else{var t=n.type,i=n.proxy;e.removeEventListener?e.removeEventListener(t,i,n.capture):e.detachEvent?e.detachEvent(dp(t),i):e.addListener&&e.removeListener&&e.removeListener(i),(t=Tc(e))?(yc(t,n),t.h==0&&(t.src=null,e[_c]=null)):wo(n)}}}function dp(n){return n in wc?wc[n]:wc[n]="on"+n}function wS(n,e){if(n.ca)n=!0;else{e=new Si(e,this);var t=n.listener,i=n.ia||n.src;n.fa&&Ec(n),n=t.call(i,e)}return n}function Tc(n){return n=n[_c],n instanceof Eo?n:null}var Ic="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ac(n){return typeof n=="function"?n:(n[Ic]||(n[Ic]=function(e){return n.handleEvent(e)}),n[Ic])}function Oe(){yn.call(this),this.i=new Eo(this),this.P=this,this.I=null}Ue(Oe,yn);Oe.prototype[bi]=!0;Oe.prototype.removeEventListener=function(n,e,t,i){fp(this,n,e,t,i)};function Fe(n,e){var t,i=n.I;if(i)for(t=[];i;i=i.I)t.push(i);if(n=n.P,i=e.type||e,typeof e=="string")e=new Ge(e,n);else if(e instanceof Ge)e.target=e.target||n;else{var o=e;e=new Ge(i,n),ip(e,o)}if(o=!0,t)for(var u=t.length-1;0<=u;u--){var c=e.g=t[u];o=To(c,i,!0,e)&&o}if(c=e.g=n,o=To(c,i,!0,e)&&o,o=To(c,i,!1,e)&&o,t)for(u=0;u<t.length;u++)c=e.g=t[u],o=To(c,i,!1,e)&&o}Oe.prototype.M=function(){if(Oe.Z.M.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],i=0;i<t.length;i++)wo(t[i]);delete n.g[e],n.h--}}this.I=null};Oe.prototype.N=function(n,e,t,i){return this.i.add(String(n),e,!1,t,i)};Oe.prototype.O=function(n,e,t,i){return this.i.add(String(n),e,!0,t,i)};function To(n,e,t,i){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var o=!0,u=0;u<e.length;++u){var c=e[u];if(c&&!c.ca&&c.capture==t){var h=c.listener,p=c.ia||c.src;c.fa&&yc(n.i,c),o=h.call(p,i)!==!1&&o}}return o&&!i.defaultPrevented}var Sc=W.JSON.stringify;function ES(){var n=gp;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}class TS{constructor(){this.h=this.g=null}add(e,t){const i=pp.get();i.set(e,t),this.h?this.h.next=i:this.g=i,this.h=i}}var pp=new class{constructor(n,e){this.i=n,this.j=e,this.h=0,this.g=null}get(){let n;return 0<this.h?(this.h--,n=this.g,this.g=n.next,n.next=null):n=this.i(),n}}(()=>new IS,n=>n.reset());class IS{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function AS(n){W.setTimeout(()=>{throw n},0)}function bc(n,e){Cc||SS(),Rc||(Cc(),Rc=!0),gp.add(n,e)}var Cc;function SS(){var n=W.Promise.resolve(void 0);Cc=function(){n.then(bS)}}var Rc=!1,gp=new TS;function bS(){for(var n;n=ES();){try{n.h.call(n.g)}catch(t){AS(t)}var e=pp;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}Rc=!1}function Io(n,e){Oe.call(this),this.h=n||1,this.g=e||W,this.j=Me(this.kb,this),this.l=Date.now()}Ue(Io,Oe);P=Io.prototype;P.da=!1;P.S=null;P.kb=function(){if(this.da){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-n):(this.S&&(this.g.clearTimeout(this.S),this.S=null),Fe(this,"tick"),this.da&&(Nc(this),this.start()))}};P.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Nc(n){n.da=!1,n.S&&(n.g.clearTimeout(n.S),n.S=null)}P.M=function(){Io.Z.M.call(this),Nc(this),delete this.g};function kc(n,e,t){if(typeof n=="function")t&&(n=Me(n,t));else if(n&&typeof n.handleEvent=="function")n=Me(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:W.setTimeout(n,e||0)}function mp(n){n.g=kc(()=>{n.g=null,n.i&&(n.i=!1,mp(n))},n.j);const e=n.h;n.h=null,n.m.apply(null,e)}class CS extends yn{constructor(e,t){super();this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:mp(this)}M(){super.M(),this.g&&(W.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ci(n){yn.call(this),this.h=n,this.g={}}Ue(Ci,yn);var yp=[];function vp(n,e,t,i){Array.isArray(t)||(t&&(yp[0]=t.toString()),t=yp);for(var o=0;o<t.length;o++){var u=cp(e,t[o],i||n.handleEvent,!1,n.h||n);if(!u)break;n.g[u.key]=u}}function _p(n){lc(n.g,function(e,t){this.g.hasOwnProperty(t)&&Ec(e)},n),n.g={}}Ci.prototype.M=function(){Ci.Z.M.call(this),_p(this)};Ci.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Ao(){this.g=!0}Ao.prototype.Aa=function(){this.g=!1};function RS(n,e,t,i,o,u){n.info(function(){if(n.g)if(u)for(var c="",h=u.split("&"),p=0;p<h.length;p++){var m=h[p].split("=");if(1<m.length){var _=m[0];m=m[1];var T=_.split("_");c=2<=T.length&&T[1]=="type"?c+(_+"="+m+"&"):c+(_+"=redacted&")}}else c=null;else c=u;return"XMLHTTP REQ ("+i+") [attempt "+o+"]: "+e+`
`+t+`
`+c})}function NS(n,e,t,i,o,u,c){n.info(function(){return"XMLHTTP RESP ("+i+") [ attempt "+o+"]: "+e+`
`+t+`
`+u+" "+c})}function Rr(n,e,t,i){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+DS(n,t)+(i?" "+i:"")})}function kS(n,e){n.info(function(){return"TIMEOUT: "+e})}Ao.prototype.info=function(){};function DS(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var i=t[n];if(!(2>i.length)){var o=i[1];if(Array.isArray(o)&&!(1>o.length)){var u=o[0];if(u!="noop"&&u!="stop"&&u!="close")for(var c=1;c<o.length;c++)o[c]=""}}}}return Sc(t)}catch{return e}}var Hn={},wp=null;function So(){return wp=wp||new Oe}Hn.Ma="serverreachability";function Ep(n){Ge.call(this,Hn.Ma,n)}Ue(Ep,Ge);function Ri(n){const e=So();Fe(e,new Ep(e,n))}Hn.STAT_EVENT="statevent";function Tp(n,e){Ge.call(this,Hn.STAT_EVENT,n),this.stat=e}Ue(Tp,Ge);function nt(n){const e=So();Fe(e,new Tp(e,n))}Hn.Na="timingevent";function Ip(n,e){Ge.call(this,Hn.Na,n),this.size=e}Ue(Ip,Ge);function Ni(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return W.setTimeout(function(){n()},e)}var bo={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Ap={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Dc(){}Dc.prototype.h=null;function Sp(n){return n.h||(n.h=n.i())}function bp(){}var ki={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function Oc(){Ge.call(this,"d")}Ue(Oc,Ge);function Lc(){Ge.call(this,"c")}Ue(Lc,Ge);var xc;function Co(){}Ue(Co,Dc);Co.prototype.g=function(){return new XMLHttpRequest};Co.prototype.i=function(){return{}};xc=new Co;function Di(n,e,t,i){this.l=n,this.j=e,this.m=t,this.X=i||1,this.V=new Ci(this),this.P=OS,n=fc?125:void 0,this.W=new Io(n),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Cp}function Cp(){this.i=null,this.g="",this.h=!1}var OS=45e3,Pc={},Ro={};P=Di.prototype;P.setTimeout=function(n){this.P=n};function Mc(n,e,t){n.K=1,n.v=Lo(Qt(e)),n.s=t,n.U=!0,Rp(n,null)}function Rp(n,e){n.F=Date.now(),Oi(n),n.A=Qt(n.v);var t=n.A,i=n.X;Array.isArray(i)||(i=[String(i)]),Up(t.h,"t",i),n.C=0,t=n.l.H,n.h=new Cp,n.g=og(n.l,t?e:null,!n.s),0<n.O&&(n.L=new CS(Me(n.Ia,n,n.g),n.O)),vp(n.V,n.g,"readystatechange",n.gb),e=n.H?np(n.H):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.ea(n.A,n.u,n.s,e)):(n.u="GET",n.g.ea(n.A,n.u,null,e)),Ri(1),RS(n.j,n.u,n.A,n.m,n.X,n.s)}P.gb=function(n){n=n.target;const e=this.L;e&&Zt(n)==3?e.l():this.Ia(n)};P.Ia=function(n){try{if(n==this.g)e:{const _=Zt(this.g);var e=this.g.Da();const T=this.g.ba();if(!(3>_)&&(_!=3||fc||this.g&&(this.h.h||this.g.ga()||Jp(this.g)))){this.I||_!=4||e==7||(e==8||0>=T?Ri(3):Ri(2)),No(this);var t=this.g.ba();this.N=t;t:if(Np(this)){var i=Jp(this.g);n="";var o=i.length,u=Zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Gn(this),Li(this);var c="";break t}this.h.i=new W.TextDecoder}for(e=0;e<o;e++)this.h.h=!0,n+=this.h.i.decode(i[e],{stream:u&&e==o-1});i.splice(0,o),this.h.g+=n,this.C=0,c=this.h.g}else c=this.g.ga();if(this.i=t==200,NS(this.j,this.u,this.A,this.m,this.X,_,t),this.i){if(this.$&&!this.J){t:{if(this.g){var h,p=this.g;if((h=p.g?p.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!vo(h)){var m=h;break t}}m=null}if(t=m)Rr(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Uc(this,t);else{this.i=!1,this.o=3,nt(12),Gn(this),Li(this);break e}}this.U?(kp(this,_,c),fc&&this.i&&_==3&&(vp(this.V,this.W,"tick",this.fb),this.W.start())):(Rr(this.j,this.m,c,null),Uc(this,c)),_==4&&Gn(this),this.i&&!this.I&&(_==4?ng(this.l,this):(this.i=!1,Oi(this)))}else t==400&&0<c.indexOf("Unknown SID")?(this.o=3,nt(12)):(this.o=0,nt(13)),Gn(this),Li(this)}}}catch{}finally{}};function Np(n){return n.g?n.u=="GET"&&n.K!=2&&n.l.Ba:!1}function kp(n,e,t){let i=!0,o;for(;!n.I&&n.C<t.length;)if(o=LS(n,t),o==Ro){e==4&&(n.o=4,nt(14),i=!1),Rr(n.j,n.m,null,"[Incomplete Response]");break}else if(o==Pc){n.o=4,nt(15),Rr(n.j,n.m,t,"[Invalid Chunk]"),i=!1;break}else Rr(n.j,n.m,o,null),Uc(n,o);Np(n)&&o!=Ro&&o!=Pc&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,nt(16),i=!1),n.i=n.i&&i,i?0<t.length&&!n.aa&&(n.aa=!0,e=n.l,e.g==n&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+t.length),jc(e),e.L=!0,nt(11))):(Rr(n.j,n.m,t,"[Invalid Chunked Response]"),Gn(n),Li(n))}P.fb=function(){if(this.g){var n=Zt(this.g),e=this.g.ga();this.C<e.length&&(No(this),kp(this,n,e),this.i&&n!=4&&Oi(this))}};function LS(n,e){var t=n.C,i=e.indexOf(`
`,t);return i==-1?Ro:(t=Number(e.substring(t,i)),isNaN(t)?Pc:(i+=1,i+t>e.length?Ro:(e=e.substr(i,t),n.C=i+t,e)))}P.cancel=function(){this.I=!0,Gn(this)};function Oi(n){n.Y=Date.now()+n.P,Dp(n,n.P)}function Dp(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=Ni(Me(n.eb,n),e)}function No(n){n.B&&(W.clearTimeout(n.B),n.B=null)}P.eb=function(){this.B=null;const n=Date.now();0<=n-this.Y?(kS(this.j,this.A),this.K!=2&&(Ri(3),nt(17)),Gn(this),this.o=2,Li(this)):Dp(this,this.Y-n)};function Li(n){n.l.G==0||n.I||ng(n.l,n)}function Gn(n){No(n);var e=n.L;e&&typeof e.na=="function"&&e.na(),n.L=null,Nc(n.W),_p(n.V),n.g&&(e=n.g,n.g=null,e.abort(),e.na())}function Uc(n,e){try{var t=n.l;if(t.G!=0&&(t.g==n||Bc(t.i,n))){if(t.I=n.N,!n.J&&Bc(t.i,n)&&t.G==3){try{var i=t.Ca.g.parse(e)}catch{i=null}if(Array.isArray(i)&&i.length==3){var o=i;if(o[0]==0)e:if(!t.u){if(t.g)if(t.g.F+3e3<n.F)Vo(t),Uo(t);else break e;zc(t),nt(18)}else t.ta=o[1],0<t.ta-t.U&&37500>o[2]&&t.N&&t.A==0&&!t.v&&(t.v=Ni(Me(t.ab,t),6e3));if(1>=Bp(t.i)&&t.ka){try{t.ka()}catch{}t.ka=void 0}}else jn(t,11)}else if((n.J||t.g==n)&&Vo(t),!vo(e))for(o=t.Ca.g.parse(e),e=0;e<o.length;e++){let m=o[e];if(t.U=m[0],m=m[1],t.G==2)if(m[0]=="c"){t.J=m[1],t.la=m[2];const _=m[3];_!=null&&(t.ma=_,t.h.info("VER="+t.ma));const T=m[4];T!=null&&(t.za=T,t.h.info("SVER="+t.za));const C=m[5];C!=null&&typeof C=="number"&&0<C&&(i=1.5*C,t.K=i,t.h.info("backChannelRequestTimeoutMs_="+i)),i=t;const k=n.g;if(k){const x=k.g?k.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(x){var u=i.i;!u.g&&(et(x,"spdy")||et(x,"quic")||et(x,"h2"))&&(u.j=u.l,u.g=new Set,u.h&&($c(u,u.h),u.h=null))}if(i.D){const ee=k.g?k.g.getResponseHeader("X-HTTP-Session-Id"):null;ee&&(i.sa=ee,me(i.F,i.D,ee))}}t.G=3,t.j&&t.j.xa(),t.$&&(t.O=Date.now()-n.F,t.h.info("Handshake RTT: "+t.O+"ms")),i=t;var c=n;if(i.oa=sg(i,i.H?i.la:null,i.W),c.J){$p(i.i,c);var h=c,p=i.K;p&&h.setTimeout(p),h.B&&(No(h),Oi(h)),i.g=c}else eg(i);0<t.l.length&&Fo(t)}else m[0]!="stop"&&m[0]!="close"||jn(t,7);else t.G==3&&(m[0]=="stop"||m[0]=="close"?m[0]=="stop"?jn(t,7):Gc(t):m[0]!="noop"&&t.j&&t.j.wa(m),t.A=0)}}Ri(4)}catch{}}function xS(n){if(n.R&&typeof n.R=="function")return n.R();if(typeof n=="string")return n.split("");if(oc(n)){for(var e=[],t=n.length,i=0;i<t;i++)e.push(n[i]);return e}e=[],t=0;for(i in n)e[t++]=n[i];return e}function Fc(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(oc(n)||typeof n=="string")Xd(n,e,void 0);else{if(n.T&&typeof n.T=="function")var t=n.T();else if(n.R&&typeof n.R=="function")t=void 0;else if(oc(n)||typeof n=="string"){t=[];for(var i=n.length,o=0;o<i;o++)t.push(o)}else for(o in t=[],i=0,n)t[i++]=o;i=xS(n),o=i.length;for(var u=0;u<o;u++)e.call(void 0,i[u],t&&t[u],n)}}function Nr(n,e){this.h={},this.g=[],this.i=0;var t=arguments.length;if(1<t){if(t%2)throw Error("Uneven number of arguments");for(var i=0;i<t;i+=2)this.set(arguments[i],arguments[i+1])}else if(n)if(n instanceof Nr)for(t=n.T(),i=0;i<t.length;i++)this.set(t[i],n.get(t[i]));else for(i in n)this.set(i,n[i])}P=Nr.prototype;P.R=function(){Vc(this);for(var n=[],e=0;e<this.g.length;e++)n.push(this.h[this.g[e]]);return n};P.T=function(){return Vc(this),this.g.concat()};function Vc(n){if(n.i!=n.g.length){for(var e=0,t=0;e<n.g.length;){var i=n.g[e];Kn(n.h,i)&&(n.g[t++]=i),e++}n.g.length=t}if(n.i!=n.g.length){var o={};for(t=e=0;e<n.g.length;)i=n.g[e],Kn(o,i)||(n.g[t++]=i,o[i]=1),e++;n.g.length=t}}P.get=function(n,e){return Kn(this.h,n)?this.h[n]:e};P.set=function(n,e){Kn(this.h,n)||(this.i++,this.g.push(n)),this.h[n]=e};P.forEach=function(n,e){for(var t=this.T(),i=0;i<t.length;i++){var o=t[i],u=this.get(o);n.call(e,u,o,this)}};function Kn(n,e){return Object.prototype.hasOwnProperty.call(n,e)}var Op=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function PS(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var i=n[t].indexOf("="),o=null;if(0<=i){var u=n[t].substring(0,i);o=n[t].substring(i+1)}else u=n[t];e(u,o?decodeURIComponent(o.replace(/\+/g," ")):"")}}}function zn(n,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,n instanceof zn){this.g=e!==void 0?e:n.g,ko(this,n.j),this.s=n.s,Do(this,n.i),Oo(this,n.m),this.l=n.l,e=n.h;var t=new Mi;t.i=e.i,e.g&&(t.g=new Nr(e.g),t.h=e.h),Lp(this,t),this.o=n.o}else n&&(t=String(n).match(Op))?(this.g=!!e,ko(this,t[1]||"",!0),this.s=xi(t[2]||""),Do(this,t[3]||"",!0),Oo(this,t[4]),this.l=xi(t[5]||"",!0),Lp(this,t[6]||"",!0),this.o=xi(t[7]||"")):(this.g=!!e,this.h=new Mi(null,this.g))}zn.prototype.toString=function(){var n=[],e=this.j;e&&n.push(Pi(e,xp,!0),":");var t=this.i;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(Pi(e,xp,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.i&&t.charAt(0)!="/"&&n.push("/"),n.push(Pi(t,t.charAt(0)=="/"?BS:VS,!0))),(t=this.h.toString())&&n.push("?",t),(t=this.o)&&n.push("#",Pi(t,qS)),n.join("")};function Qt(n){return new zn(n)}function ko(n,e,t){n.j=t?xi(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function Do(n,e,t){n.i=t?xi(e,!0):e}function Oo(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function Lp(n,e,t){e instanceof Mi?(n.h=e,WS(n.h,n.g)):(t||(e=Pi(e,$S)),n.h=new Mi(e,n.g))}function me(n,e,t){n.h.set(e,t)}function Lo(n){return me(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function MS(n){return n instanceof zn?Qt(n):new zn(n,void 0)}function US(n,e,t,i){var o=new zn(null,void 0);return n&&ko(o,n),e&&Do(o,e),t&&Oo(o,t),i&&(o.l=i),o}function xi(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Pi(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,FS),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function FS(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var xp=/[#\/\?@]/g,VS=/[#\?:]/g,BS=/[#\?]/g,$S=/[#\?@]/g,qS=/#/g;function Mi(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function vn(n){n.g||(n.g=new Nr,n.h=0,n.i&&PS(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}P=Mi.prototype;P.add=function(n,e){vn(this),this.i=null,n=kr(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function Pp(n,e){vn(n),e=kr(n,e),Kn(n.g.h,e)&&(n.i=null,n.h-=n.g.get(e).length,n=n.g,Kn(n.h,e)&&(delete n.h[e],n.i--,n.g.length>2*n.i&&Vc(n)))}function Mp(n,e){return vn(n),e=kr(n,e),Kn(n.g.h,e)}P.forEach=function(n,e){vn(this),this.g.forEach(function(t,i){Xd(t,function(o){n.call(e,o,i,this)},this)},this)};P.T=function(){vn(this);for(var n=this.g.R(),e=this.g.T(),t=[],i=0;i<e.length;i++)for(var o=n[i],u=0;u<o.length;u++)t.push(e[i]);return t};P.R=function(n){vn(this);var e=[];if(typeof n=="string")Mp(this,n)&&(e=Qd(e,this.g.get(kr(this,n))));else{n=this.g.R();for(var t=0;t<n.length;t++)e=Qd(e,n[t])}return e};P.set=function(n,e){return vn(this),this.i=null,n=kr(this,n),Mp(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};P.get=function(n,e){return n?(n=this.R(n),0<n.length?String(n[0]):e):e};function Up(n,e,t){Pp(n,e),0<t.length&&(n.i=null,n.g.set(kr(n,e),uc(t)),n.h+=t.length)}P.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var n=[],e=this.g.T(),t=0;t<e.length;t++){var i=e[t],o=encodeURIComponent(String(i));i=this.R(i);for(var u=0;u<i.length;u++){var c=o;i[u]!==""&&(c+="="+encodeURIComponent(String(i[u]))),n.push(c)}}return this.i=n.join("&")};function kr(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function WS(n,e){e&&!n.j&&(vn(n),n.i=null,n.g.forEach(function(t,i){var o=i.toLowerCase();i!=o&&(Pp(this,i),Up(this,o,t))},n)),n.j=e}var HS=class{constructor(n,e){this.h=n,this.g=e}};function Fp(n){this.l=n||GS,W.PerformanceNavigationTiming?(n=W.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(W.g&&W.g.Ea&&W.g.Ea()&&W.g.Ea().Zb),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var GS=10;function Vp(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function Bp(n){return n.h?1:n.g?n.g.size:0}function Bc(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function $c(n,e){n.g?n.g.add(e):n.h=e}function $p(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}Fp.prototype.cancel=function(){if(this.i=qp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function qp(n){if(n.h!=null)return n.i.concat(n.h.D);if(n.g!=null&&n.g.size!==0){let e=n.i;for(const t of n.g.values())e=e.concat(t.D);return e}return uc(n.i)}function qc(){}qc.prototype.stringify=function(n){return W.JSON.stringify(n,void 0)};qc.prototype.parse=function(n){return W.JSON.parse(n,void 0)};function KS(){this.g=new qc}function zS(n,e,t){const i=t||"";try{Fc(n,function(o,u){let c=o;Ai(o)&&(c=Sc(o)),e.push(i+u+"="+encodeURIComponent(c))})}catch(o){throw e.push(i+"type="+encodeURIComponent("_badmap")),o}}function jS(n,e){const t=new Ao;if(W.Image){const i=new Image;i.onload=yo(xo,t,i,"TestLoadImage: loaded",!0,e),i.onerror=yo(xo,t,i,"TestLoadImage: error",!1,e),i.onabort=yo(xo,t,i,"TestLoadImage: abort",!1,e),i.ontimeout=yo(xo,t,i,"TestLoadImage: timeout",!1,e),W.setTimeout(function(){i.ontimeout&&i.ontimeout()},1e4),i.src=n}else e(!1)}function xo(n,e,t,i,o){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,o(i)}catch{}}function Ui(n){this.l=n.$b||null,this.j=n.ib||!1}Ue(Ui,Dc);Ui.prototype.g=function(){return new Po(this.l,this.j)};Ui.prototype.i=function(n){return function(){return n}}({});function Po(n,e){Oe.call(this),this.D=n,this.u=e,this.m=void 0,this.readyState=Wc,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Ue(Po,Oe);var Wc=0;P=Po.prototype;P.open=function(n,e){if(this.readyState!=Wc)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,Vi(this)};P.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.D||W).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))};P.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fi(this)),this.readyState=Wc};P.Va=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,Vi(this)),this.g&&(this.readyState=3,Vi(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof W.ReadableStream!="undefined"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Wp(this)}else n.text().then(this.Ua.bind(this),this.ha.bind(this))};function Wp(n){n.j.read().then(n.Sa.bind(n)).catch(n.ha.bind(n))}P.Sa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?Fi(this):Vi(this),this.readyState==3&&Wp(this)}};P.Ua=function(n){this.g&&(this.response=this.responseText=n,Fi(this))};P.Ta=function(n){this.g&&(this.response=n,Fi(this))};P.ha=function(){this.g&&Fi(this)};function Fi(n){n.readyState=4,n.l=null,n.j=null,n.A=null,Vi(n)}P.setRequestHeader=function(n,e){this.v.append(n,e)};P.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};P.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function Vi(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(Po.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var JS=W.JSON.parse;function Ae(n){Oe.call(this),this.headers=new Nr,this.u=n||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Hp,this.K=this.L=!1}Ue(Ae,Oe);var Hp="",YS=/^https?$/i,XS=["POST","PUT"];P=Ae.prototype;P.ea=function(n,e,t,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+n);e=e?e.toUpperCase():"GET",this.H=n,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():xc.g(),this.C=this.u?Sp(this.u):Sp(xc),this.g.onreadystatechange=Me(this.Fa,this);try{this.F=!0,this.g.open(e,String(n),!0),this.F=!1}catch(u){Gp(this,u);return}n=t||"";const o=new Nr(this.headers);i&&Fc(i,function(u,c){o.set(c,u)}),i=uS(o.T()),t=W.FormData&&n instanceof W.FormData,!(0<=Yd(XS,e))||i||t||o.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),o.forEach(function(u,c){this.g.setRequestHeader(c,u)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{jp(this),0<this.B&&((this.K=QS(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Me(this.pa,this)):this.A=kc(this.pa,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(u){Gp(this,u)}};function QS(n){return Cr&&dS()&&typeof n.timeout=="number"&&n.ontimeout!==void 0}function ZS(n){return n.toLowerCase()=="content-type"}P.pa=function(){typeof sc!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Fe(this,"timeout"),this.abort(8))};function Gp(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,Kp(n),Mo(n)}function Kp(n){n.D||(n.D=!0,Fe(n,"complete"),Fe(n,"error"))}P.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,Fe(this,"complete"),Fe(this,"abort"),Mo(this))};P.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Mo(this,!0)),Ae.Z.M.call(this)};P.Fa=function(){this.s||(this.F||this.v||this.l?zp(this):this.cb())};P.cb=function(){zp(this)};function zp(n){if(n.h&&typeof sc!="undefined"&&(!n.C[1]||Zt(n)!=4||n.ba()!=2)){if(n.v&&Zt(n)==4)kc(n.Fa,0,n);else if(Fe(n,"readystatechange"),Zt(n)==4){n.h=!1;try{const h=n.ba();e:switch(h){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var i;if(i=h===0){var o=String(n.H).match(Op)[1]||null;if(!o&&W.self&&W.self.location){var u=W.self.location.protocol;o=u.substr(0,u.length-1)}i=!YS.test(o?o.toLowerCase():"")}t=i}if(t)Fe(n,"complete"),Fe(n,"success");else{n.m=6;try{var c=2<Zt(n)?n.g.statusText:""}catch{c=""}n.j=c+" ["+n.ba()+"]",Kp(n)}}finally{Mo(n)}}}}function Mo(n,e){if(n.g){jp(n);const t=n.g,i=n.C[0]?mo:null;n.g=null,n.C=null,e||Fe(n,"ready");try{t.onreadystatechange=i}catch{}}}function jp(n){n.g&&n.K&&(n.g.ontimeout=null),n.A&&(W.clearTimeout(n.A),n.A=null)}function Zt(n){return n.g?n.g.readyState:0}P.ba=function(){try{return 2<Zt(this)?this.g.status:-1}catch{return-1}};P.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};P.Qa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),JS(e)}};function Jp(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.J){case Hp:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}P.Da=function(){return this.m};P.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function eb(n){let e="";return lc(n,function(t,i){e+=i,e+=":",e+=t,e+=`\r
`}),e}function Hc(n,e,t){e:{for(i in t){var i=!1;break e}i=!0}i||(t=eb(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):me(n,e,t))}function Bi(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function Yp(n){this.za=0,this.l=[],this.h=new Ao,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=Bi("failFast",!1,n),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=Bi("baseRetryDelayMs",5e3,n),this.$a=Bi("retryDelaySeedMs",1e4,n),this.Ya=Bi("forwardChannelMaxRetries",2,n),this.ra=Bi("forwardChannelRequestTimeoutMs",2e4,n),this.qa=n&&n.xmlHttpFactory||void 0,this.Ba=n&&n.Yb||!1,this.K=void 0,this.H=n&&n.supportsCrossDomainXhr||!1,this.J="",this.i=new Fp(n&&n.concurrentRequestLimit),this.Ca=new KS,this.ja=n&&n.fastHandshake||!1,this.Ra=n&&n.Wb||!1,n&&n.Aa&&this.h.Aa(),n&&n.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&n&&n.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!n||n.Xb!==!1}P=Yp.prototype;P.ma=8;P.G=1;function Gc(n){if(Xp(n),n.G==3){var e=n.V++,t=Qt(n.F);me(t,"SID",n.J),me(t,"RID",e),me(t,"TYPE","terminate"),$i(n,t),e=new Di(n,n.h,e,void 0),e.K=2,e.v=Lo(Qt(t)),t=!1,W.navigator&&W.navigator.sendBeacon&&(t=W.navigator.sendBeacon(e.v.toString(),"")),!t&&W.Image&&(new Image().src=e.v,t=!0),t||(e.g=og(e.l,null),e.g.ea(e.v)),e.F=Date.now(),Oi(e)}ig(n)}P.hb=function(n){try{this.h.info("Origin Trials invoked: "+n)}catch{}};function Uo(n){n.g&&(jc(n),n.g.cancel(),n.g=null)}function Xp(n){Uo(n),n.u&&(W.clearTimeout(n.u),n.u=null),Vo(n),n.i.cancel(),n.m&&(typeof n.m=="number"&&W.clearTimeout(n.m),n.m=null)}function Kc(n,e){n.l.push(new HS(n.Za++,e)),n.G==3&&Fo(n)}function Fo(n){Vp(n.i)||n.m||(n.m=!0,bc(n.Ha,n),n.C=0)}function tb(n,e){return Bp(n.i)>=n.i.j-(n.m?1:0)?!1:n.m?(n.l=e.D.concat(n.l),!0):n.G==1||n.G==2||n.C>=(n.Xa?0:n.Ya)?!1:(n.m=Ni(Me(n.Ha,n,e),rg(n,n.C)),n.C++,!0)}P.Ha=function(n){if(this.m)if(this.m=null,this.G==1){if(!n){this.V=Math.floor(1e5*Math.random()),n=this.V++;const o=new Di(this,this.h,n,void 0);let u=this.s;if(this.P&&(u?(u=np(u),ip(u,this.P)):u=this.P),this.o===null&&(o.H=u),this.ja)e:{for(var e=0,t=0;t<this.l.length;t++){t:{var i=this.l[t];if("__data__"in i.g&&(i=i.g.__data__,typeof i=="string")){i=i.length;break t}i=void 0}if(i===void 0)break;if(e+=i,4096<e){e=t;break e}if(e===4096||t===this.l.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=Zp(this,o,e),t=Qt(this.F),me(t,"RID",n),me(t,"CVER",22),this.D&&me(t,"X-HTTP-Session-Id",this.D),$i(this,t),this.o&&u&&Hc(t,this.o,u),$c(this.i,o),this.Ra&&me(t,"TYPE","init"),this.ja?(me(t,"$req",e),me(t,"SID","null"),o.$=!0,Mc(o,t,null)):Mc(o,t,e),this.G=2}}else this.G==3&&(n?Qp(this,n):this.l.length==0||Vp(this.i)||Qp(this))};function Qp(n,e){var t;e?t=e.m:t=n.V++;const i=Qt(n.F);me(i,"SID",n.J),me(i,"RID",t),me(i,"AID",n.U),$i(n,i),n.o&&n.s&&Hc(i,n.o,n.s),t=new Di(n,n.h,t,n.C+1),n.o===null&&(t.H=n.s),e&&(n.l=e.D.concat(n.l)),e=Zp(n,t,1e3),t.setTimeout(Math.round(.5*n.ra)+Math.round(.5*n.ra*Math.random())),$c(n.i,t),Mc(t,i,e)}function $i(n,e){n.j&&Fc({},function(t,i){me(e,i,t)})}function Zp(n,e,t){t=Math.min(n.l.length,t);var i=n.j?Me(n.j.Oa,n.j,n):null;e:{var o=n.l;let u=-1;for(;;){const c=["count="+t];u==-1?0<t?(u=o[0].h,c.push("ofs="+u)):u=0:c.push("ofs="+u);let h=!0;for(let p=0;p<t;p++){let m=o[p].h;const _=o[p].g;if(m-=u,0>m)u=Math.max(0,o[p].h-100),h=!1;else try{zS(_,c,"req"+m+"_")}catch{i&&i(_)}}if(h){i=c.join("&");break e}}}return n=n.l.splice(0,t),e.D=n,i}function eg(n){n.g||n.u||(n.Y=1,bc(n.Ga,n),n.A=0)}function zc(n){return n.g||n.u||3<=n.A?!1:(n.Y++,n.u=Ni(Me(n.Ga,n),rg(n,n.A)),n.A++,!0)}P.Ga=function(){if(this.u=null,tg(this),this.$&&!(this.L||this.g==null||0>=this.O)){var n=2*this.O;this.h.info("BP detection timer enabled: "+n),this.B=Ni(Me(this.bb,this),n)}};P.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,nt(10),Uo(this),tg(this))};function jc(n){n.B!=null&&(W.clearTimeout(n.B),n.B=null)}function tg(n){n.g=new Di(n,n.h,"rpc",n.Y),n.o===null&&(n.g.H=n.s),n.g.O=0;var e=Qt(n.oa);me(e,"RID","rpc"),me(e,"SID",n.J),me(e,"CI",n.N?"0":"1"),me(e,"AID",n.U),$i(n,e),me(e,"TYPE","xmlhttp"),n.o&&n.s&&Hc(e,n.o,n.s),n.K&&n.g.setTimeout(n.K);var t=n.g;n=n.la,t.K=1,t.v=Lo(Qt(e)),t.s=null,t.U=!0,Rp(t,n)}P.ab=function(){this.v!=null&&(this.v=null,Uo(this),zc(this),nt(19))};function Vo(n){n.v!=null&&(W.clearTimeout(n.v),n.v=null)}function ng(n,e){var t=null;if(n.g==e){Vo(n),jc(n),n.g=null;var i=2}else if(Bc(n.i,e))t=e.D,$p(n.i,e),i=1;else return;if(n.I=e.N,n.G!=0){if(e.i)if(i==1){t=e.s?e.s.length:0,e=Date.now()-e.F;var o=n.C;i=So(),Fe(i,new Ip(i,t,e,o)),Fo(n)}else eg(n);else if(o=e.o,o==3||o==0&&0<n.I||!(i==1&&tb(n,e)||i==2&&zc(n)))switch(t&&0<t.length&&(e=n.i,e.i=e.i.concat(t)),o){case 1:jn(n,5);break;case 4:jn(n,10);break;case 3:jn(n,6);break;default:jn(n,2)}}}function rg(n,e){let t=n.Pa+Math.floor(Math.random()*n.$a);return n.j||(t*=2),t*e}function jn(n,e){if(n.h.info("Error code "+e),e==2){var t=null;n.j&&(t=null);var i=Me(n.jb,n);t||(t=new zn("//www.google.com/images/cleardot.gif"),W.location&&W.location.protocol=="http"||ko(t,"https"),Lo(t)),jS(t.toString(),i)}else nt(2);n.G=0,n.j&&n.j.va(e),ig(n),Xp(n)}P.jb=function(n){n?(this.h.info("Successfully pinged google.com"),nt(2)):(this.h.info("Failed to ping google.com"),nt(1))};function ig(n){n.G=0,n.I=-1,n.j&&((qp(n.i).length!=0||n.l.length!=0)&&(n.i.i.length=0,uc(n.l),n.l.length=0),n.j.ua())}function sg(n,e,t){let i=MS(t);if(i.i!="")e&&Do(i,e+"."+i.i),Oo(i,i.m);else{const o=W.location;i=US(o.protocol,e?e+"."+o.hostname:o.hostname,+o.port,t)}return n.aa&&lc(n.aa,function(o,u){me(i,u,o)}),e=n.D,t=n.sa,e&&t&&me(i,e,t),me(i,"VER",n.ma),$i(n,i),i}function og(n,e,t){if(e&&!n.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Ba&&!n.qa?new Ae(new Ui({ib:!0})):new Ae(n.qa),e.L=n.H,e}function ag(){}P=ag.prototype;P.xa=function(){};P.wa=function(){};P.va=function(){};P.ua=function(){};P.Oa=function(){};function Bo(){if(Cr&&!(10<=Number(pS)))throw Error("Environmental error: no available transport.")}Bo.prototype.g=function(n,e){return new yt(n,e)};function yt(n,e){Oe.call(this),this.g=new Yp(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(n?n["X-WebChannel-Client-Profile"]=e.ya:n={"X-WebChannel-Client-Profile":e.ya}),this.g.P=n,(n=e&&e.httpHeadersOverwriteParam)&&!vo(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!vo(e)&&(this.g.D=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new Dr(this)}Ue(yt,Oe);yt.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var n=this.g,e=this.l,t=this.h||void 0;n.Wa&&(n.h.info("Origin Trials enabled."),bc(Me(n.hb,n,e))),nt(0),n.W=e,n.aa=t||{},n.N=n.X,n.F=sg(n,null,n.W),Fo(n)};yt.prototype.close=function(){Gc(this.g)};yt.prototype.u=function(n){if(typeof n=="string"){var e={};e.__data__=n,Kc(this.g,e)}else this.v?(e={},e.__data__=Sc(n),Kc(this.g,e)):Kc(this.g,n)};yt.prototype.M=function(){this.g.j=null,delete this.j,Gc(this.g),delete this.g,yt.Z.M.call(this)};function ug(n){Oc.call(this);var e=n.__sm__;if(e){e:{for(const t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}Ue(ug,Oc);function cg(){Lc.call(this),this.status=1}Ue(cg,Lc);function Dr(n){this.g=n}Ue(Dr,ag);Dr.prototype.xa=function(){Fe(this.g,"a")};Dr.prototype.wa=function(n){Fe(this.g,new ug(n))};Dr.prototype.va=function(n){Fe(this.g,new cg(n))};Dr.prototype.ua=function(){Fe(this.g,"b")};Bo.prototype.createWebChannel=Bo.prototype.g;yt.prototype.send=yt.prototype.u;yt.prototype.open=yt.prototype.m;yt.prototype.close=yt.prototype.close;bo.NO_ERROR=0;bo.TIMEOUT=8;bo.HTTP_ERROR=6;Ap.COMPLETE="complete";bp.EventType=ki;ki.OPEN="a";ki.CLOSE="b";ki.ERROR="c";ki.MESSAGE="d";Oe.prototype.listen=Oe.prototype.N;Ae.prototype.listenOnce=Ae.prototype.O;Ae.prototype.getLastError=Ae.prototype.La;Ae.prototype.getLastErrorCode=Ae.prototype.Da;Ae.prototype.getStatus=Ae.prototype.ba;Ae.prototype.getResponseJson=Ae.prototype.Qa;Ae.prototype.getResponseText=Ae.prototype.ga;Ae.prototype.send=Ae.prototype.ea;var nb=function(){return new Bo},rb=function(){return So()},Jc=bo,ib=Ap,sb=Hn,lg={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},ob=Ui,$o=bp,ab=Ae;const hg="@firebase/firestore";/**
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
 */class at{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}at.UNAUTHENTICATED=new at(null),at.GOOGLE_CREDENTIALS=new at("google-credentials-uid"),at.FIRST_PARTY=new at("first-party-uid"),at.MOCK_USER=new at("mock-user");/**
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
 */let Or="9.6.5";/**
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
 */const Jn=new ec("@firebase/firestore");function fg(){return Jn.logLevel}function F(n,...e){if(Jn.logLevel<=oe.DEBUG){const t=e.map(Yc);Jn.debug(`Firestore (${Or}): ${n}`,...t)}}function _n(n,...e){if(Jn.logLevel<=oe.ERROR){const t=e.map(Yc);Jn.error(`Firestore (${Or}): ${n}`,...t)}}function dg(n,...e){if(Jn.logLevel<=oe.WARN){const t=e.map(Yc);Jn.warn(`Firestore (${Or}): ${n}`,...t)}}function Yc(n){if(typeof n=="string")return n;try{return e=n,JSON.stringify(e)}catch{return n}/**
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
*/var e}/**
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
 */function J(n="Unexpected state"){const e=`FIRESTORE (${Or}) INTERNAL ASSERTION FAILED: `+n;throw _n(e),new Error(e)}function fe(n,e){n||J()}function z(n,e){return n}/**
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
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends qn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class wn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class ub{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class cb{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(at.UNAUTHENTICATED))}shutdown(){}}class lb{constructor(e){this.t=e,this.currentUser=at.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let i=this.i;const o=p=>this.i!==i?(i=this.i,t(p)):Promise.resolve();let u=new wn;this.o=()=>{this.i++,this.currentUser=this.u(),u.resolve(),u=new wn,e.enqueueRetryable(()=>o(this.currentUser))};const c=()=>{const p=u;e.enqueueRetryable(async()=>{await p.promise,await o(this.currentUser)})},h=p=>{F("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=p,this.auth.addAuthTokenListener(this.o),c()};this.t.onInit(p=>h(p)),setTimeout(()=>{if(!this.auth){const p=this.t.getImmediate({optional:!0});p?h(p):(F("FirebaseAuthCredentialsProvider","Auth not yet detected"),u.resolve(),u=new wn)}},0),c()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(F("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(fe(typeof i.accessToken=="string"),new ub(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return fe(e===null||typeof e=="string"),new at(e)}}class hb{constructor(e,t,i){this.type="FirstParty",this.user=at.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",t);const o=e.auth.getAuthHeaderValueForFirstParty([]);o&&this.headers.set("Authorization",o),i&&this.headers.set("X-Goog-Iam-Authorization-Token",i)}}class fb{constructor(e,t,i){this.h=e,this.l=t,this.m=i}getToken(){return Promise.resolve(new hb(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(at.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class db{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pb{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null}start(e,t){this.o=o=>{e.enqueueRetryable(()=>(u=>(u.error!=null&&F("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${u.error.message}`),t(u.token)))(o))};const i=o=>{F("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.appCheck.addTokenListener(this.o)};this.g.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.g.getImmediate({optional:!0});o?i(o):F("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(fe(typeof t.token=="string"),new db(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */class Xc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.p(i),this.T=i=>t.writeSequenceNumber(i))}p(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.T&&this.T(e),e}}/**
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
 */function gb(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
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
 */Xc.I=-1;class pg{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const o=gb(40);for(let u=0;u<o.length;++u)i.length<20&&o[u]<t&&(i+=e.charAt(o[u]%e.length))}return i}}function ce(n,e){return n<e?-1:n>e?1:0}function Lr(n,e,t){return n.length===e.length&&n.every((i,o)=>t(i,e[o]))}/**
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
 */class vt{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new q(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new q(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new q(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return vt.fromMillis(Date.now())}static fromDate(e){return vt.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new vt(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ie{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ie(e)}static min(){return new ie(new vt(0,0))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */function gg(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Yn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function mg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class qi{constructor(e,t,i){t===void 0?t=0:t>e.length&&J(),i===void 0?i=e.length-t:i>e.length-t&&J(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return qi.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof qi?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let o=0;o<i;o++){const u=e.get(o),c=t.get(o);if(u<c)return-1;if(u>c)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ee extends qi{construct(e,t,i){return new Ee(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new q(N.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(o=>o.length>0))}return new Ee(t)}static emptyPath(){return new Ee([])}}const mb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ut extends qi{construct(e,t,i){return new ut(e,t,i)}static isValidIdentifier(e){return mb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ut.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ut(["__name__"])}static fromServerFormat(e){const t=[];let i="",o=0;const u=()=>{if(i.length===0)throw new q(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let c=!1;for(;o<e.length;){const h=e[o];if(h==="\\"){if(o+1===e.length)throw new q(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const p=e[o+1];if(p!=="\\"&&p!=="."&&p!=="`")throw new q(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=p,o+=2}else h==="`"?(c=!c,o++):h!=="."||c?(i+=h,o++):(u(),o++)}if(u(),c)throw new q(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ut(t)}static emptyPath(){return new ut([])}}/**
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
 */class Wi{constructor(e){this.fields=e,e.sort(ut.comparator)}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Lr(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
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
 */class Ve{constructor(e){this.binaryString=e}static fromBase64String(e){const t=atob(e);return new Ve(t)}static fromUint8Array(e){const t=function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o}(e);return new Ve(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ve.EMPTY_BYTE_STRING=new Ve("");const yb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function En(n){if(fe(!!n),typeof n=="string"){let e=0;const t=yb.exec(n);if(fe(!!t),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:Se(n.seconds),nanos:Se(n.nanos)}}function Se(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function xr(n){return typeof n=="string"?Ve.fromBase64String(n):Ve.fromUint8Array(n)}/**
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
 */function yg(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function vg(n){const e=n.mapValue.fields.__previous_value__;return yg(e)?vg(e):e}function Hi(n){const e=En(n.mapValue.fields.__local_write_time__.timestampValue);return new vt(e.seconds,e.nanos)}/**
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
 */function Pr(n){return n==null}function qo(n){return n===0&&1/n==-1/0}function vb(n){return typeof n=="number"&&Number.isInteger(n)&&!qo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(Ee.fromString(e))}static fromName(e){return new G(Ee.fromString(e).popFirst(5))}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new Ee(e.slice()))}}/**
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
 */function Xn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?yg(n)?4:10:J()}function $t(n,e){if(n===e)return!0;const t=Xn(n);if(t!==Xn(e))return!1;switch(t){case 0:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Hi(n).isEqual(Hi(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=En(i.timestampValue),c=En(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,o){return xr(i.bytesValue).isEqual(xr(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,o){return Se(i.geoPointValue.latitude)===Se(o.geoPointValue.latitude)&&Se(i.geoPointValue.longitude)===Se(o.geoPointValue.longitude)}(n,e);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return Se(i.integerValue)===Se(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=Se(i.doubleValue),c=Se(o.doubleValue);return u===c?qo(u)===qo(c):isNaN(u)&&isNaN(c)}return!1}(n,e);case 9:return Lr(n.arrayValue.values||[],e.arrayValue.values||[],$t);case 10:return function(i,o){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(gg(u)!==gg(c))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(c[h]===void 0||!$t(u[h],c[h])))return!1;return!0}(n,e);default:return J()}}function Gi(n,e){return(n.values||[]).find(t=>$t(t,e))!==void 0}function Mr(n,e){if(n===e)return 0;const t=Xn(n),i=Xn(e);if(t!==i)return ce(t,i);switch(t){case 0:return 0;case 1:return ce(n.booleanValue,e.booleanValue);case 2:return function(o,u){const c=Se(o.integerValue||o.doubleValue),h=Se(u.integerValue||u.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return _g(n.timestampValue,e.timestampValue);case 4:return _g(Hi(n),Hi(e));case 5:return ce(n.stringValue,e.stringValue);case 6:return function(o,u){const c=xr(o),h=xr(u);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,u){const c=o.split("/"),h=u.split("/");for(let p=0;p<c.length&&p<h.length;p++){const m=ce(c[p],h[p]);if(m!==0)return m}return ce(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,u){const c=ce(Se(o.latitude),Se(u.latitude));return c!==0?c:ce(Se(o.longitude),Se(u.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(o,u){const c=o.values||[],h=u.values||[];for(let p=0;p<c.length&&p<h.length;++p){const m=Mr(c[p],h[p]);if(m)return m}return ce(c.length,h.length)}(n.arrayValue,e.arrayValue);case 10:return function(o,u){const c=o.fields||{},h=Object.keys(c),p=u.fields||{},m=Object.keys(p);h.sort(),m.sort();for(let _=0;_<h.length&&_<m.length;++_){const T=ce(h[_],m[_]);if(T!==0)return T;const C=Mr(c[h[_]],p[m[_]]);if(C!==0)return C}return ce(h.length,m.length)}(n.mapValue,e.mapValue);default:throw J()}}function _g(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ce(n,e);const t=En(n),i=En(e),o=ce(t.seconds,i.seconds);return o!==0?o:ce(t.nanos,i.nanos)}function Qc(n){return Zc(n)}function Zc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(i){const o=En(i);return`time(${o.seconds},${o.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?xr(n.bytesValue).toBase64():"referenceValue"in n?(t=n.referenceValue,G.fromName(t).toString()):"geoPointValue"in n?`geo(${(e=n.geoPointValue).latitude},${e.longitude})`:"arrayValue"in n?function(i){let o="[",u=!0;for(const c of i.values||[])u?u=!1:o+=",",o+=Zc(c);return o+"]"}(n.arrayValue):"mapValue"in n?function(i){const o=Object.keys(i.fields||{}).sort();let u="{",c=!0;for(const h of o)c?c=!1:u+=",",u+=`${h}:${Zc(i.fields[h])}`;return u+"}"}(n.mapValue):J();var e,t}function el(n){return!!n&&"integerValue"in n}function tl(n){return!!n&&"arrayValue"in n}function wg(n){return!!n&&"nullValue"in n}function Eg(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Wo(n){return!!n&&"mapValue"in n}function Ki(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Yn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=Ki(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ki(n.arrayValue.values[t]);return e}return Object.assign({},n)}/**
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
 */class _t{constructor(e){this.value=e}static empty(){return new _t({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Wo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ki(t)}setAll(e){let t=ut.emptyPath(),i={},o=[];e.forEach((c,h)=>{if(!t.isImmediateParentOf(h)){const p=this.getFieldsMap(t);this.applyChanges(p,i,o),i={},o=[],t=h.popLast()}c?i[h.lastSegment()]=Ki(c):o.push(h.lastSegment())});const u=this.getFieldsMap(t);this.applyChanges(u,i,o)}delete(e){const t=this.field(e.popLast());Wo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $t(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let o=t.mapValue.fields[e.get(i)];Wo(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,i){Yn(t,(o,u)=>e[o]=u);for(const o of i)delete e[o]}clone(){return new _t(Ki(this.value))}}function Tg(n){const e=[];return Yn(n.fields,(t,i)=>{const o=new ut([t]);if(Wo(i)){const u=Tg(i.mapValue).fields;if(u.length===0)e.push(o);else for(const c of u)e.push(o.child(c))}else e.push(o)}),new Wi(e)}/**
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
 */class Ke{constructor(e,t,i,o,u){this.key=e,this.documentType=t,this.version=i,this.data=o,this.documentState=u}static newInvalidDocument(e){return new Ke(e,0,ie.min(),_t.empty(),0)}static newFoundDocument(e,t,i){return new Ke(e,1,t,i,0)}static newNoDocument(e,t){return new Ke(e,2,t,_t.empty(),0)}static newUnknownDocument(e,t){return new Ke(e,3,t,_t.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=_t.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=_t.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ke&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ke(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class _b{constructor(e,t=null,i=[],o=[],u=null,c=null,h=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=o,this.limit=u,this.startAt=c,this.endAt=h,this.R=null}}function Ig(n,e=null,t=[],i=[],o=null,u=null,c=null){return new _b(n,e,t,i,o,u,c)}function nl(n){const e=z(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>Eb(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(o){return o.field.canonicalString()+o.dir}(i)).join(","),Pr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=Ho(e.startAt)),e.endAt&&(t+="|ub:",t+=Ho(e.endAt)),e.R=t}return e.R}function wb(n){let e=n.path.canonicalString();return n.collectionGroup!==null&&(e+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(e+=`, filters: [${n.filters.map(t=>{return`${(i=t).field.canonicalString()} ${i.op} ${Qc(i.value)}`;var i}).join(", ")}]`),Pr(n.limit)||(e+=", limit: "+n.limit),n.orderBy.length>0&&(e+=`, orderBy: [${n.orderBy.map(t=>function(i){return`${i.field.canonicalString()} (${i.dir})`}(t)).join(", ")}]`),n.startAt&&(e+=", startAt: "+Ho(n.startAt)),n.endAt&&(e+=", endAt: "+Ho(n.endAt)),`Target(${e})`}function rl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let o=0;o<n.orderBy.length;o++)if(!Nb(n.orderBy[o],e.orderBy[o]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let o=0;o<n.filters.length;o++)if(t=n.filters[o],i=e.filters[o],t.op!==i.op||!t.field.isEqual(i.field)||!$t(t.value,i.value))return!1;var t,i;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!bg(n.startAt,e.startAt)&&bg(n.endAt,e.endAt)}function il(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}class ct extends class{}{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.P(e,t,i):new Tb(e,t,i):t==="array-contains"?new Sb(e,i):t==="in"?new bb(e,i):t==="not-in"?new Cb(e,i):t==="array-contains-any"?new Rb(e,i):new ct(e,t,i)}static P(e,t,i){return t==="in"?new Ib(e,i):new Ab(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.v(Mr(t,this.value)):t!==null&&Xn(this.value)===Xn(t)&&this.v(Mr(t,this.value))}v(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J()}}V(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}function Eb(n){return n.field.canonicalString()+n.op.toString()+Qc(n.value)}class Tb extends ct{constructor(e,t,i){super(e,t,i),this.key=G.fromName(i.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.v(t)}}class Ib extends ct{constructor(e,t){super(e,"in",t),this.keys=Ag("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Ab extends ct{constructor(e,t){super(e,"not-in",t),this.keys=Ag("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ag(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>G.fromName(i.referenceValue))}class Sb extends ct{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return tl(t)&&Gi(t.arrayValue,this.value)}}class bb extends ct{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Gi(this.value.arrayValue,t)}}class Cb extends ct{constructor(e,t){super(e,"not-in",t)}matches(e){if(Gi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Gi(this.value.arrayValue,t)}}class Rb extends ct{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!tl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>Gi(this.value.arrayValue,i))}}class sl{constructor(e,t){this.position=e,this.before=t}}function Ho(n){return`${n.before?"b":"a"}:${n.position.map(e=>Qc(e)).join(",")}`}class zi{constructor(e,t="asc"){this.field=e,this.dir=t}}function Nb(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}function Sg(n,e,t){let i=0;for(let o=0;o<n.position.length;o++){const u=e[o],c=n.position[o];if(u.field.isKeyField()?i=G.comparator(G.fromName(c.referenceValue),t.key):i=Mr(c,t.data.field(u.field)),u.dir==="desc"&&(i*=-1),i!==0)break}return n.before?i<=0:i<0}function bg(n,e){if(n===null)return e===null;if(e===null||n.before!==e.before||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!$t(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Go{constructor(e,t=null,i=[],o=[],u=null,c="F",h=null,p=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=o,this.limit=u,this.limitType=c,this.startAt=h,this.endAt=p,this.S=null,this.D=null,this.startAt,this.endAt}}function kb(n,e,t,i,o,u,c,h){return new Go(n,e,t,i,o,u,c,h)}function ol(n){return new Go(n)}function Ko(n){return!Pr(n.limit)&&n.limitType==="F"}function al(n){return!Pr(n.limit)&&n.limitType==="L"}function Db(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function Ob(n){for(const e of n.filters)if(e.V())return e.field;return null}function Lb(n){return n.collectionGroup!==null}function ji(n){const e=z(n);if(e.S===null){e.S=[];const t=Ob(e),i=Db(e);if(t!==null&&i===null)t.isKeyField()||e.S.push(new zi(t)),e.S.push(new zi(ut.keyField(),"asc"));else{let o=!1;for(const u of e.explicitOrderBy)e.S.push(u),u.field.isKeyField()&&(o=!0);if(!o){const u=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.S.push(new zi(ut.keyField(),u))}}}return e.S}function Qn(n){const e=z(n);if(!e.D)if(e.limitType==="F")e.D=Ig(e.path,e.collectionGroup,ji(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const u of ji(e)){const c=u.dir==="desc"?"asc":"desc";t.push(new zi(u.field,c))}const i=e.endAt?new sl(e.endAt.position,!e.endAt.before):null,o=e.startAt?new sl(e.startAt.position,!e.startAt.before):null;e.D=Ig(e.path,e.collectionGroup,t,e.filters,e.limit,i,o)}return e.D}function xb(n,e,t){return new Go(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function zo(n,e){return rl(Qn(n),Qn(e))&&n.limitType===e.limitType}function Cg(n){return`${nl(Qn(n))}|lt:${n.limitType}`}function ul(n){return`Query(target=${wb(Qn(n))}; limitType=${n.limitType})`}function jo(n,e){return e.isFoundDocument()&&function(t,i){const o=i.key.path;return t.collectionGroup!==null?i.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(o):G.isDocumentKey(t.path)?t.path.isEqual(o):t.path.isImmediateParentOf(o)}(n,e)&&function(t,i){for(const o of t.explicitOrderBy)if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,e)&&function(t,i){for(const o of t.filters)if(!o.matches(i))return!1;return!0}(n,e)&&function(t,i){return!(t.startAt&&!Sg(t.startAt,ji(t),i)||t.endAt&&Sg(t.endAt,ji(t),i))}(n,e)}function Rg(n){return(e,t)=>{let i=!1;for(const o of ji(n)){const u=Pb(o,e,t);if(u!==0)return u;i=i||o.field.isKeyField()}return 0}}function Pb(n,e,t){const i=n.field.isKeyField()?G.comparator(e.key,t.key):function(o,u,c){const h=u.data.field(o),p=c.data.field(o);return h!==null&&p!==null?Mr(h,p):J()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return J()}}/**
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
 */function Ng(n,e){if(n.C){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qo(e)?"-0":e}}function kg(n){return{integerValue:""+n}}function Mb(n,e){return vb(e)?kg(e):Ng(n,e)}/**
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
 */class Jo{constructor(){this._=void 0}}function Ub(n,e,t){return n instanceof Yo?function(i,o){const u={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&(u.fields.__previous_value__=o),{mapValue:u}}(t,e):n instanceof Ji?Og(n,e):n instanceof Yi?Lg(n,e):function(i,o){const u=Dg(i,o),c=xg(u)+xg(i.N);return el(u)&&el(i.N)?kg(c):Ng(i.k,c)}(n,e)}function Fb(n,e,t){return n instanceof Ji?Og(n,e):n instanceof Yi?Lg(n,e):t}function Dg(n,e){return n instanceof Xo?el(t=e)||function(i){return!!i&&"doubleValue"in i}(t)?e:{integerValue:0}:null;var t}class Yo extends Jo{}class Ji extends Jo{constructor(e){super(),this.elements=e}}function Og(n,e){const t=Pg(e);for(const i of n.elements)t.some(o=>$t(o,i))||t.push(i);return{arrayValue:{values:t}}}class Yi extends Jo{constructor(e){super(),this.elements=e}}function Lg(n,e){let t=Pg(e);for(const i of n.elements)t=t.filter(o=>!$t(o,i));return{arrayValue:{values:t}}}class Xo extends Jo{constructor(e,t){super(),this.k=e,this.N=t}}function xg(n){return Se(n.integerValue||n.doubleValue)}function Pg(n){return tl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Vb(n,e){return n.field.isEqual(e.field)&&function(t,i){return t instanceof Ji&&i instanceof Ji||t instanceof Yi&&i instanceof Yi?Lr(t.elements,i.elements,$t):t instanceof Xo&&i instanceof Xo?$t(t.N,i.N):t instanceof Yo&&i instanceof Yo}(n.transform,e.transform)}class Bb{constructor(e,t){this.version=e,this.transformResults=t}}class Zn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Zn}static exists(e){return new Zn(void 0,e)}static updateTime(e){return new Zn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Qo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Zo{}function $b(n,e,t){n instanceof ea?function(i,o,u){const c=i.value.clone(),h=Vg(i.fieldTransforms,o,u.transformResults);c.setAll(h),o.convertToFoundDocument(u.version,c).setHasCommittedMutations()}(n,e,t):n instanceof er?function(i,o,u){if(!Qo(i.precondition,o))return void o.convertToUnknownDocument(u.version);const c=Vg(i.fieldTransforms,o,u.transformResults),h=o.data;h.setAll(Fg(i)),h.setAll(c),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()}(n,e,t):function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,e,t)}function cl(n,e,t){n instanceof ea?function(i,o,u){if(!Qo(i.precondition,o))return;const c=i.value.clone(),h=Bg(i.fieldTransforms,u,o);c.setAll(h),o.convertToFoundDocument(Ug(o),c).setHasLocalMutations()}(n,e,t):n instanceof er?function(i,o,u){if(!Qo(i.precondition,o))return;const c=Bg(i.fieldTransforms,u,o),h=o.data;h.setAll(Fg(i)),h.setAll(c),o.convertToFoundDocument(Ug(o),h).setHasLocalMutations()}(n,e,t):function(i,o){Qo(i.precondition,o)&&o.convertToNoDocument(ie.min())}(n,e)}function qb(n,e){let t=null;for(const i of n.fieldTransforms){const o=e.data.field(i.field),u=Dg(i.transform,o||null);u!=null&&(t==null&&(t=_t.empty()),t.set(i.field,u))}return t||null}function Mg(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(t,i){return t===void 0&&i===void 0||!(!t||!i)&&Lr(t,i,(o,u)=>Vb(o,u))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}function Ug(n){return n.isFoundDocument()?n.version:ie.min()}class ea extends Zo{constructor(e,t,i,o=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=o,this.type=0}}class er extends Zo{constructor(e,t,i,o,u=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=o,this.fieldTransforms=u,this.type=1}}function Fg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Vg(n,e,t){const i=new Map;fe(n.length===t.length);for(let o=0;o<t.length;o++){const u=n[o],c=u.transform,h=e.data.field(u.field);i.set(u.field,Fb(c,h,t[o]))}return i}function Bg(n,e,t){const i=new Map;for(const o of n){const u=o.transform,c=t.data.field(o.field);i.set(o.field,Ub(u,c,e))}return i}class Wb extends Zo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}}class Hb extends Zo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}}/**
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
 */class Gb{constructor(e){this.count=e}}/**
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
 */var be,re;function Kb(n){switch(n){default:return J();case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0}}function $g(n){if(n===void 0)return _n("GRPC error has no .code"),N.UNKNOWN;switch(n){case be.OK:return N.OK;case be.CANCELLED:return N.CANCELLED;case be.UNKNOWN:return N.UNKNOWN;case be.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case be.INTERNAL:return N.INTERNAL;case be.UNAVAILABLE:return N.UNAVAILABLE;case be.UNAUTHENTICATED:return N.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case be.NOT_FOUND:return N.NOT_FOUND;case be.ALREADY_EXISTS:return N.ALREADY_EXISTS;case be.PERMISSION_DENIED:return N.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case be.ABORTED:return N.ABORTED;case be.OUT_OF_RANGE:return N.OUT_OF_RANGE;case be.UNIMPLEMENTED:return N.UNIMPLEMENTED;case be.DATA_LOSS:return N.DATA_LOSS;default:return J()}}(re=be||(be={}))[re.OK=0]="OK",re[re.CANCELLED=1]="CANCELLED",re[re.UNKNOWN=2]="UNKNOWN",re[re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",re[re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",re[re.NOT_FOUND=5]="NOT_FOUND",re[re.ALREADY_EXISTS=6]="ALREADY_EXISTS",re[re.PERMISSION_DENIED=7]="PERMISSION_DENIED",re[re.UNAUTHENTICATED=16]="UNAUTHENTICATED",re[re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",re[re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",re[re.ABORTED=10]="ABORTED",re[re.OUT_OF_RANGE=11]="OUT_OF_RANGE",re[re.UNIMPLEMENTED=12]="UNIMPLEMENTED",re[re.INTERNAL=13]="INTERNAL",re[re.UNAVAILABLE=14]="UNAVAILABLE",re[re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class ze{constructor(e,t){this.comparator=e,this.root=t||Be.EMPTY}insert(e,t){return new ze(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Be.BLACK,null,null))}remove(e){return new ze(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const o=this.comparator(e,i.key);if(o===0)return t+i.left.size;o<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ta(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ta(this.root,e,this.comparator,!1)}getReverseIterator(){return new ta(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ta(this.root,e,this.comparator,!0)}}class ta{constructor(e,t,i,o){this.isReverse=o,this.nodeStack=[];let u=1;for(;!e.isEmpty();)if(u=t?i(e.key,t):1,o&&(u*=-1),u<0)e=this.isReverse?e.left:e.right;else{if(u===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Be{constructor(e,t,i,o,u){this.key=e,this.value=t,this.color=i!=null?i:Be.RED,this.left=o!=null?o:Be.EMPTY,this.right=u!=null?u:Be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,o,u){return new Be(e!=null?e:this.key,t!=null?t:this.value,i!=null?i:this.color,o!=null?o:this.left,u!=null?u:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let o=this;const u=i(e,o.key);return o=u<0?o.copy(null,null,null,o.left.insert(e,t,i),null):u===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,i)),o.fixUp()}removeMin(){if(this.left.isEmpty())return Be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return Be.EMPTY;i=o.right.min(),o=o.copy(i.key,i.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw J();const e=this.left.check();if(e!==this.right.check())throw J();return e+(this.isRed()?0:1)}}Be.EMPTY=null,Be.RED=!0,Be.BLACK=!1;Be.EMPTY=new class{constructor(){this.size=0}get key(){throw J()}get value(){throw J()}get color(){throw J()}get left(){throw J()}get right(){throw J()}copy(n,e,t,i,o){return this}insert(n,e,t){return new Be(n,e)}remove(n,e){return this}isEmpty(){return!0}inorderTraversal(n){return!1}reverseTraversal(n){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class $e{constructor(e){this.comparator=e,this.data=new ze(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const o=i.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new qg(this.data.getIterator())}getIteratorFrom(e){return new qg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof $e)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,u=i.getNext().key;if(this.comparator(o,u)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new $e(this.comparator);return t.data=e,t}}class qg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */const zb=new ze(G.comparator);function tr(){return zb}const jb=new ze(G.comparator);function ll(){return jb}const Jb=new ze(G.comparator);function Yb(){return Jb}const Xb=new $e(G.comparator);function pe(...n){let e=Xb;for(const t of n)e=e.add(t);return e}const Qb=new $e(ce);function Wg(){return Qb}/**
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
 */class na{constructor(e,t,i,o,u){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=o,this.resolvedLimboDocuments=u}static createSynthesizedRemoteEventForCurrentChange(e,t){const i=new Map;return i.set(e,Xi.createSynthesizedTargetChangeForCurrentChange(e,t)),new na(ie.min(),i,Wg(),tr(),pe())}}class Xi{constructor(e,t,i,o,u){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=o,this.removedDocuments=u}static createSynthesizedTargetChangeForCurrentChange(e,t){return new Xi(Ve.EMPTY_BYTE_STRING,t,pe(),pe(),pe())}}/**
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
 */class ra{constructor(e,t,i,o){this.$=e,this.removedTargetIds=t,this.key=i,this.O=o}}class Hg{constructor(e,t){this.targetId=e,this.M=t}}class Gg{constructor(e,t,i=Ve.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=o}}class Kg{constructor(){this.F=0,this.L=jg(),this.B=Ve.EMPTY_BYTE_STRING,this.U=!1,this.q=!0}get current(){return this.U}get resumeToken(){return this.B}get K(){return this.F!==0}get j(){return this.q}W(e){e.approximateByteSize()>0&&(this.q=!0,this.B=e)}G(){let e=pe(),t=pe(),i=pe();return this.L.forEach((o,u)=>{switch(u){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:i=i.add(o);break;default:J()}}),new Xi(this.B,this.U,e,t,i)}H(){this.q=!1,this.L=jg()}J(e,t){this.q=!0,this.L=this.L.insert(e,t)}Y(e){this.q=!0,this.L=this.L.remove(e)}X(){this.F+=1}Z(){this.F-=1}tt(){this.q=!0,this.U=!0}}class Zb{constructor(e){this.et=e,this.nt=new Map,this.st=tr(),this.it=zg(),this.rt=new $e(ce)}ot(e){for(const t of e.$)e.O&&e.O.isFoundDocument()?this.ct(t,e.O):this.at(t,e.key,e.O);for(const t of e.removedTargetIds)this.at(t,e.key,e.O)}ut(e){this.forEachTarget(e,t=>{const i=this.ht(t);switch(e.state){case 0:this.lt(t)&&i.W(e.resumeToken);break;case 1:i.Z(),i.K||i.H(),i.W(e.resumeToken);break;case 2:i.Z(),i.K||this.removeTarget(t);break;case 3:this.lt(t)&&(i.tt(),i.W(e.resumeToken));break;case 4:this.lt(t)&&(this.ft(t),i.W(e.resumeToken));break;default:J()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.nt.forEach((i,o)=>{this.lt(o)&&t(o)})}dt(e){const t=e.targetId,i=e.M.count,o=this.wt(t);if(o){const u=o.target;if(il(u))if(i===0){const c=new G(u.path);this.at(t,c,Ke.newNoDocument(c,ie.min()))}else fe(i===1);else this._t(t)!==i&&(this.ft(t),this.rt=this.rt.add(t))}}gt(e){const t=new Map;this.nt.forEach((u,c)=>{const h=this.wt(c);if(h){if(u.current&&il(h.target)){const p=new G(h.target.path);this.st.get(p)!==null||this.yt(c,p)||this.at(c,p,Ke.newNoDocument(p,e))}u.j&&(t.set(c,u.G()),u.H())}});let i=pe();this.it.forEach((u,c)=>{let h=!0;c.forEachWhile(p=>{const m=this.wt(p);return!m||m.purpose===2||(h=!1,!1)}),h&&(i=i.add(u))});const o=new na(e,t,this.rt,this.st,i);return this.st=tr(),this.it=zg(),this.rt=new $e(ce),o}ct(e,t){if(!this.lt(e))return;const i=this.yt(e,t.key)?2:0;this.ht(e).J(t.key,i),this.st=this.st.insert(t.key,t),this.it=this.it.insert(t.key,this.Tt(t.key).add(e))}at(e,t,i){if(!this.lt(e))return;const o=this.ht(e);this.yt(e,t)?o.J(t,1):o.Y(t),this.it=this.it.insert(t,this.Tt(t).delete(e)),i&&(this.st=this.st.insert(t,i))}removeTarget(e){this.nt.delete(e)}_t(e){const t=this.ht(e).G();return this.et.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}X(e){this.ht(e).X()}ht(e){let t=this.nt.get(e);return t||(t=new Kg,this.nt.set(e,t)),t}Tt(e){let t=this.it.get(e);return t||(t=new $e(ce),this.it=this.it.insert(e,t)),t}lt(e){const t=this.wt(e)!==null;return t||F("WatchChangeAggregator","Detected inactive target",e),t}wt(e){const t=this.nt.get(e);return t&&t.K?null:this.et.Et(e)}ft(e){this.nt.set(e,new Kg),this.et.getRemoteKeysForTarget(e).forEach(t=>{this.at(e,t,null)})}yt(e,t){return this.et.getRemoteKeysForTarget(e).has(t)}}function zg(){return new ze(G.comparator)}function jg(){return new ze(G.comparator)}/**
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
 */const eC=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),tC=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))();class nC{constructor(e,t){this.databaseId=e,this.C=t}}function ia(n,e){return n.C?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Jg(n,e){return n.C?e.toBase64():e.toUint8Array()}function rC(n,e){return ia(n,e.toTimestamp())}function en(n){return fe(!!n),ie.fromTimestamp(function(e){const t=En(e);return new vt(t.seconds,t.nanos)}(n))}function hl(n,e){return function(t){return new Ee(["projects",t.projectId,"databases",t.database])}(n).child("documents").child(e).canonicalString()}function Yg(n){const e=Ee.fromString(n);return fe(nm(e)),e}function fl(n,e){return hl(n.databaseId,e.path)}function dl(n,e){const t=Yg(e);if(t.get(1)!==n.databaseId.projectId)throw new q(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new q(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(Xg(t))}function pl(n,e){return hl(n.databaseId,e)}function iC(n){const e=Yg(n);return e.length===4?Ee.emptyPath():Xg(e)}function gl(n){return new Ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Xg(n){return fe(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Qg(n,e,t){return{name:fl(n,e),fields:t.value.mapValue.fields}}function sC(n,e){let t;if("targetChange"in e){e.targetChange;const i=function(p){return p==="NO_CHANGE"?0:p==="ADD"?1:p==="REMOVE"?2:p==="CURRENT"?3:p==="RESET"?4:J()}(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],u=function(p,m){return p.C?(fe(m===void 0||typeof m=="string"),Ve.fromBase64String(m||"")):(fe(m===void 0||m instanceof Uint8Array),Ve.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),c=e.targetChange.cause,h=c&&function(p){const m=p.code===void 0?N.UNKNOWN:$g(p.code);return new q(m,p.message||"")}(c);t=new Gg(i,o,u,h||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const o=dl(n,i.document.name),u=en(i.document.updateTime),c=new _t({mapValue:{fields:i.document.fields}}),h=Ke.newFoundDocument(o,u,c),p=i.targetIds||[],m=i.removedTargetIds||[];t=new ra(p,m,h.key,h)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const o=dl(n,i.document),u=i.readTime?en(i.readTime):ie.min(),c=Ke.newNoDocument(o,u),h=i.removedTargetIds||[];t=new ra([],h,c.key,c)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const o=dl(n,i.document),u=i.removedTargetIds||[];t=new ra([],u,o,null)}else{if(!("filter"in e))return J();{e.filter;const i=e.filter;i.targetId;const o=i.count||0,u=new Gb(o),c=i.targetId;t=new Hg(c,u)}}return t}function oC(n,e){let t;if(e instanceof ea)t={update:Qg(n,e.key,e.value)};else if(e instanceof Wb)t={delete:fl(n,e.key)};else if(e instanceof er)t={update:Qg(n,e.key,e.data),updateMask:mC(e.fieldMask)};else{if(!(e instanceof Hb))return J();t={verify:fl(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(o,u){const c=u.transform;if(c instanceof Yo)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ji)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Yi)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Xo)return{fieldPath:u.field.canonicalString(),increment:c.N};throw J()}(0,i))),e.precondition.isNone||(t.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:rC(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:J()}(n,e.precondition)),t}function aC(n,e){return n&&n.length>0?(fe(e!==void 0),n.map(t=>function(i,o){let u=i.updateTime?en(i.updateTime):en(o);return u.isEqual(ie.min())&&(u=en(o)),new Bb(u,i.transformResults||[])}(t,e))):[]}function uC(n,e){return{documents:[pl(n,e.path)]}}function cC(n,e){const t={structuredQuery:{}},i=e.path;e.collectionGroup!==null?(t.parent=pl(n,i),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=pl(n,i.popLast()),t.structuredQuery.from=[{collectionId:i.lastSegment()}]);const o=function(h){if(h.length===0)return;const p=h.map(m=>function(_){if(_.op==="=="){if(Eg(_.value))return{unaryFilter:{field:Ur(_.field),op:"IS_NAN"}};if(wg(_.value))return{unaryFilter:{field:Ur(_.field),op:"IS_NULL"}}}else if(_.op==="!="){if(Eg(_.value))return{unaryFilter:{field:Ur(_.field),op:"IS_NOT_NAN"}};if(wg(_.value))return{unaryFilter:{field:Ur(_.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ur(_.field),op:dC(_.op),value:_.value}}}(m));return p.length===1?p[0]:{compositeFilter:{op:"AND",filters:p}}}(e.filters);o&&(t.structuredQuery.where=o);const u=function(h){if(h.length!==0)return h.map(p=>function(m){return{field:Ur(m.field),direction:fC(m.dir)}}(p))}(e.orderBy);u&&(t.structuredQuery.orderBy=u);const c=function(h,p){return h.C||Pr(p)?p:{value:p}}(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=em(e.startAt)),e.endAt&&(t.structuredQuery.endAt=em(e.endAt)),t}function lC(n){let e=iC(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let o=null;if(i>0){fe(i===1);const _=t.from[0];_.allDescendants?o=_.collectionId:e=e.child(_.collectionId)}let u=[];t.where&&(u=Zg(t.where));let c=[];t.orderBy&&(c=t.orderBy.map(_=>function(T){return new zi(Fr(T.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(T.direction))}(_)));let h=null;t.limit&&(h=function(_){let T;return T=typeof _=="object"?_.value:_,Pr(T)?null:T}(t.limit));let p=null;t.startAt&&(p=tm(t.startAt));let m=null;return t.endAt&&(m=tm(t.endAt)),kb(e,o,c,u,h,"F",p,m)}function hC(n,e){const t=function(i,o){switch(o){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return J()}}(0,e.purpose);return t==null?null:{"goog-listen-tags":t}}function Zg(n){return n?n.unaryFilter!==void 0?[gC(n)]:n.fieldFilter!==void 0?[pC(n)]:n.compositeFilter!==void 0?n.compositeFilter.filters.map(e=>Zg(e)).reduce((e,t)=>e.concat(t)):J():[]}function em(n){return{before:n.before,values:n.position}}function tm(n){const e=!!n.before,t=n.values||[];return new sl(t,e)}function fC(n){return eC[n]}function dC(n){return tC[n]}function Ur(n){return{fieldPath:n.canonicalString()}}function Fr(n){return ut.fromServerFormat(n.fieldPath)}function pC(n){return ct.create(Fr(n.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return J()}}(n.fieldFilter.op),n.fieldFilter.value)}function gC(n){switch(n.unaryFilter.op){case"IS_NAN":const e=Fr(n.unaryFilter.field);return ct.create(e,"==",{doubleValue:NaN});case"IS_NULL":const t=Fr(n.unaryFilter.field);return ct.create(t,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Fr(n.unaryFilter.field);return ct.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Fr(n.unaryFilter.field);return ct.create(o,"!=",{nullValue:"NULL_VALUE"});default:return J()}}function mC(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function nm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}const yC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class vC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */class O{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&J(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new O((i,o)=>{this.nextCallback=u=>{this.wrapSuccess(e,u).next(i,o)},this.catchCallback=u=>{this.wrapFailure(t,u).next(i,o)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof O?t:O.resolve(t)}catch(t){return O.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):O.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):O.reject(t)}static resolve(e){return new O((t,i)=>{t(e)})}static reject(e){return new O((t,i)=>{i(e)})}static waitFor(e){return new O((t,i)=>{let o=0,u=0,c=!1;e.forEach(h=>{++o,h.next(()=>{++u,c&&u===o&&t()},p=>i(p))}),c=!0,u===o&&t()})}static or(e){let t=O.resolve(!1);for(const i of e)t=t.next(o=>o?O.resolve(o):i());return t}static forEach(e,t){const i=[];return e.forEach((o,u)=>{i.push(t.call(this,o,u))}),this.waitFor(i)}}function Qi(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class _C{constructor(e,t,i,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=o}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const u=this.mutations[o];u.key.isEqual(e.key)&&$b(u,e,i[o])}}applyToLocalView(e){for(const t of this.baseMutations)t.key.isEqual(e.key)&&cl(t,e,this.localWriteTime);for(const t of this.mutations)t.key.isEqual(e.key)&&cl(t,e,this.localWriteTime)}applyToLocalDocumentSet(e){this.mutations.forEach(t=>{const i=e.get(t.key),o=i;this.applyToLocalView(o),i.isValidDocument()||o.convertToNoDocument(ie.min())})}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),pe())}isEqual(e){return this.batchId===e.batchId&&Lr(this.mutations,e.mutations,(t,i)=>Mg(t,i))&&Lr(this.baseMutations,e.baseMutations,(t,i)=>Mg(t,i))}}class ml{constructor(e,t,i,o){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=o}static from(e,t,i){fe(e.mutations.length===i.length);let o=Yb();const u=e.mutations;for(let c=0;c<u.length;c++)o=o.insert(u[c].key,i[c].version);return new ml(e,t,i,o)}}/**
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
 */class nr{constructor(e,t,i,o,u=ie.min(),c=ie.min(),h=Ve.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=o,this.snapshotVersion=u,this.lastLimboFreeSnapshotVersion=c,this.resumeToken=h}withSequenceNumber(e){return new nr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new nr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new nr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
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
 */class wC{constructor(e){this.Gt=e}}function EC(n){const e=lC({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?xb(e,e.limit,"L"):e}/**
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
 */class TC{constructor(){this.zt=new IC}addToCollectionParentIndex(e,t){return this.zt.add(t),O.resolve()}getCollectionParents(e,t){return O.resolve(this.zt.getEntries(t))}}class IC{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),o=this.index[t]||new $e(Ee.comparator),u=!o.has(i);return this.index[t]=o.add(i),u}has(e){const t=e.lastSegment(),i=e.popLast(),o=this.index[t];return o&&o.has(i)}getEntries(e){return(this.index[e]||new $e(Ee.comparator)).toArray()}}/**
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
 */class Vr{constructor(e){this.se=e}next(){return this.se+=2,this.se}static ie(){return new Vr(0)}static re(){return new Vr(-1)}}/**
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
 */async function Zi(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==yC)throw n;F("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class es{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={}}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[o,u]of i)if(this.equalsFn(o,e))return u}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),o=this.inner[i];if(o!==void 0){for(let u=0;u<o.length;u++)if(this.equalsFn(o[u][0],e))return void(o[u]=[e,t]);o.push([e,t])}else this.inner[i]=[[e,t]]}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return i.length===1?delete this.inner[t]:i.splice(o,1),!0;return!1}forEach(e){Yn(this.inner,(t,i)=>{for(const[o,u]of i)e(o,u)})}isEmpty(){return mg(this.inner)}}/**
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
 */class AC{constructor(){this.changes=new es(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}getReadTime(e){const t=this.changes.get(e);return t?t.readTime:ie.min()}addEntry(e,t){this.assertNotApplied(),this.changes.set(e.key,{document:e,readTime:t})}removeEntry(e,t=null){this.assertNotApplied(),this.changes.set(e,{document:Ke.newInvalidDocument(e),readTime:t})}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?O.resolve(i.document):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class rm{constructor(e,t,i){this.Je=e,this.An=t,this.Jt=i}Rn(e,t){return this.An.getAllMutationBatchesAffectingDocumentKey(e,t).next(i=>this.bn(e,t,i))}bn(e,t,i){return this.Je.getEntry(e,t).next(o=>{for(const u of i)u.applyToLocalView(o);return o})}Pn(e,t){e.forEach((i,o)=>{for(const u of t)u.applyToLocalView(o)})}vn(e,t){return this.Je.getEntries(e,t).next(i=>this.Vn(e,i).next(()=>i))}Vn(e,t){return this.An.getAllMutationBatchesAffectingDocumentKeys(e,t).next(i=>this.Pn(t,i))}getDocumentsMatchingQuery(e,t,i){return function(o){return G.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.Sn(e,t.path):Lb(t)?this.Dn(e,t,i):this.Cn(e,t,i)}Sn(e,t){return this.Rn(e,new G(t)).next(i=>{let o=ll();return i.isFoundDocument()&&(o=o.insert(i.key,i)),o})}Dn(e,t,i){const o=t.collectionGroup;let u=ll();return this.Jt.getCollectionParents(e,o).next(c=>O.forEach(c,h=>{const p=function(m,_){return new Go(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,h.child(o));return this.Cn(e,p,i).next(m=>{m.forEach((_,T)=>{u=u.insert(_,T)})})}).next(()=>u))}Cn(e,t,i){let o,u;return this.Je.getDocumentsMatchingQuery(e,t,i).next(c=>(o=c,this.An.getAllMutationBatchesAffectingQuery(e,t))).next(c=>(u=c,this.Nn(e,u,o).next(h=>{o=h;for(const p of u)for(const m of p.mutations){const _=m.key;let T=o.get(_);T==null&&(T=Ke.newInvalidDocument(_),o=o.insert(_,T)),cl(m,T,p.localWriteTime),T.isFoundDocument()||(o=o.remove(_))}}))).next(()=>(o.forEach((c,h)=>{jo(t,h)||(o=o.remove(c))}),o))}Nn(e,t,i){let o=pe();for(const c of t)for(const h of c.mutations)h instanceof er&&i.get(h.key)===null&&(o=o.add(h.key));let u=i;return this.Je.getEntries(e,o).next(c=>(c.forEach((h,p)=>{p.isFoundDocument()&&(u=u.insert(h,p))}),u))}}/**
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
 */class yl{constructor(e,t,i,o){this.targetId=e,this.fromCache=t,this.kn=i,this.xn=o}static $n(e,t){let i=pe(),o=pe();for(const u of t.docChanges)switch(u.type){case 0:i=i.add(u.doc.key);break;case 1:o=o.add(u.doc.key)}return new yl(e,t.fromCache,i,o)}}/**
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
 */class SC{On(e){this.Mn=e}getDocumentsMatchingQuery(e,t,i,o){return function(u){return u.filters.length===0&&u.limit===null&&u.startAt==null&&u.endAt==null&&(u.explicitOrderBy.length===0||u.explicitOrderBy.length===1&&u.explicitOrderBy[0].field.isKeyField())}(t)||i.isEqual(ie.min())?this.Fn(e,t):this.Mn.vn(e,o).next(u=>{const c=this.Ln(t,u);return(Ko(t)||al(t))&&this.Bn(t.limitType,c,o,i)?this.Fn(e,t):(fg()<=oe.DEBUG&&F("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),ul(t)),this.Mn.getDocumentsMatchingQuery(e,t,i).next(h=>(c.forEach(p=>{h=h.insert(p.key,p)}),h)))})}Ln(e,t){let i=new $e(Rg(e));return t.forEach((o,u)=>{jo(e,u)&&(i=i.add(u))}),i}Bn(e,t,i,o){if(i.size!==t.size)return!0;const u=e==="F"?t.last():t.first();return!!u&&(u.hasPendingWrites||u.version.compareTo(o)>0)}Fn(e,t){return fg()<=oe.DEBUG&&F("QueryEngine","Using full collection scan to execute query:",ul(t)),this.Mn.getDocumentsMatchingQuery(e,t,ie.min())}}/**
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
 */class bC{constructor(e,t,i,o){this.persistence=e,this.Un=t,this.k=o,this.qn=new ze(ce),this.Kn=new es(u=>nl(u),rl),this.jn=ie.min(),this.An=e.getMutationQueue(i),this.Qn=e.getRemoteDocumentCache(),this.He=e.getTargetCache(),this.Wn=new rm(this.Qn,this.An,this.persistence.getIndexManager()),this.Ye=e.getBundleCache(),this.Un.On(this.Wn)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.qn))}}function CC(n,e,t,i){return new bC(n,e,t,i)}async function im(n,e){const t=z(n);let i=t.An,o=t.Wn;const u=await t.persistence.runTransaction("Handle user change","readonly",c=>{let h;return t.An.getAllMutationBatches(c).next(p=>(h=p,i=t.persistence.getMutationQueue(e),o=new rm(t.Qn,i,t.persistence.getIndexManager()),i.getAllMutationBatches(c))).next(p=>{const m=[],_=[];let T=pe();for(const C of h){m.push(C.batchId);for(const k of C.mutations)T=T.add(k.key)}for(const C of p){_.push(C.batchId);for(const k of C.mutations)T=T.add(k.key)}return o.vn(c,T).next(C=>({Gn:C,removedBatchIds:m,addedBatchIds:_}))})});return t.An=i,t.Wn=o,t.Un.On(t.Wn),u}function RC(n,e){const t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const o=e.batch.keys(),u=t.Qn.newChangeBuffer({trackRemovals:!0});return function(c,h,p,m){const _=p.batch,T=_.keys();let C=O.resolve();return T.forEach(k=>{C=C.next(()=>m.getEntry(h,k)).next(x=>{const ee=p.docVersions.get(k);fe(ee!==null),x.version.compareTo(ee)<0&&(_.applyToRemoteDocument(x,p),x.isValidDocument()&&m.addEntry(x,p.commitVersion))})}),C.next(()=>c.An.removeMutationBatch(h,_))}(t,i,e,u).next(()=>u.apply(i)).next(()=>t.An.performConsistencyCheck(i)).next(()=>t.Wn.vn(i,o))})}function sm(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.He.getLastRemoteSnapshotVersion(t))}function NC(n,e){const t=z(n),i=e.snapshotVersion;let o=t.qn;return t.persistence.runTransaction("Apply remote event","readwrite-primary",u=>{const c=t.Qn.newChangeBuffer({trackRemovals:!0});o=t.qn;const h=[];e.targetChanges.forEach((m,_)=>{const T=o.get(_);if(!T)return;h.push(t.He.removeMatchingKeys(u,m.removedDocuments,_).next(()=>t.He.addMatchingKeys(u,m.addedDocuments,_)));let C=T.withSequenceNumber(u.currentSequenceNumber);e.targetMismatches.has(_)?C=C.withResumeToken(Ve.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):m.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(m.resumeToken,i)),o=o.insert(_,C),function(k,x,ee){return k.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=3e8?!0:ee.addedDocuments.size+ee.modifiedDocuments.size+ee.removedDocuments.size>0}(T,C,m)&&h.push(t.He.updateTargetData(u,C))});let p=tr();if(e.documentUpdates.forEach((m,_)=>{e.resolvedLimboDocuments.has(m)&&h.push(t.persistence.referenceDelegate.updateLimboDocument(u,m))}),h.push(kC(u,c,e.documentUpdates,i,void 0).next(m=>{p=m})),!i.isEqual(ie.min())){const m=t.He.getLastRemoteSnapshotVersion(u).next(_=>t.He.setTargetsMetadata(u,u.currentSequenceNumber,i));h.push(m)}return O.waitFor(h).next(()=>c.apply(u)).next(()=>t.Wn.Vn(u,p)).next(()=>p)}).then(u=>(t.qn=o,u))}function kC(n,e,t,i,o){let u=pe();return t.forEach(c=>u=u.add(c)),e.getEntries(n,u).next(c=>{let h=tr();return t.forEach((p,m)=>{const _=c.get(p),T=(o==null?void 0:o.get(p))||i;m.isNoDocument()&&m.version.isEqual(ie.min())?(e.removeEntry(p,T),h=h.insert(p,m)):!_.isValidDocument()||m.version.compareTo(_.version)>0||m.version.compareTo(_.version)===0&&_.hasPendingWrites?(e.addEntry(m,T),h=h.insert(p,m)):F("LocalStore","Ignoring outdated watch update for ",p,". Current version:",_.version," Watch version:",m.version)}),h})}function DC(n,e){const t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.An.getNextMutationBatchAfterBatchId(i,e)))}function OC(n,e){const t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let o;return t.He.getTargetData(i,e).next(u=>u?(o=u,O.resolve(o)):t.He.allocateTargetId(i).next(c=>(o=new nr(e,c,0,i.currentSequenceNumber),t.He.addTargetData(i,o).next(()=>o))))}).then(i=>{const o=t.qn.get(i.targetId);return(o===null||i.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.qn=t.qn.insert(i.targetId,i),t.Kn.set(e,i.targetId)),i})}async function vl(n,e,t){const i=z(n),o=i.qn.get(e),u=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",u,c=>i.persistence.referenceDelegate.removeTarget(c,o))}catch(c){if(!Qi(c))throw c;F("LocalStore",`Failed to update sequence numbers for target ${e}: ${c}`)}i.qn=i.qn.remove(e),i.Kn.delete(o.target)}function om(n,e,t){const i=z(n);let o=ie.min(),u=pe();return i.persistence.runTransaction("Execute query","readonly",c=>function(h,p,m){const _=z(h),T=_.Kn.get(m);return T!==void 0?O.resolve(_.qn.get(T)):_.He.getTargetData(p,m)}(i,c,Qn(e)).next(h=>{if(h)return o=h.lastLimboFreeSnapshotVersion,i.He.getMatchingKeysForTargetId(c,h.targetId).next(p=>{u=p})}).next(()=>i.Un.getDocumentsMatchingQuery(c,e,t?o:ie.min(),t?u:pe())).next(h=>({documents:h,zn:u})))}/**
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
 */class LC{constructor(e){this.k=e,this.Xn=new Map,this.Zn=new Map}getBundleMetadata(e,t){return O.resolve(this.Xn.get(t))}saveBundleMetadata(e,t){var i;return this.Xn.set(t.id,{id:(i=t).id,version:i.version,createTime:en(i.createTime)}),O.resolve()}getNamedQuery(e,t){return O.resolve(this.Zn.get(t))}saveNamedQuery(e,t){return this.Zn.set(t.name,function(i){return{name:i.name,query:EC(i.bundledQuery),readTime:en(i.readTime)}}(t)),O.resolve()}}/**
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
 */class _l{constructor(){this.ts=new $e(Le.es),this.ns=new $e(Le.ss)}isEmpty(){return this.ts.isEmpty()}addReference(e,t){const i=new Le(e,t);this.ts=this.ts.add(i),this.ns=this.ns.add(i)}rs(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.os(new Le(e,t))}cs(e,t){e.forEach(i=>this.removeReference(i,t))}us(e){const t=new G(new Ee([])),i=new Le(t,e),o=new Le(t,e+1),u=[];return this.ns.forEachInRange([i,o],c=>{this.os(c),u.push(c.key)}),u}hs(){this.ts.forEach(e=>this.os(e))}os(e){this.ts=this.ts.delete(e),this.ns=this.ns.delete(e)}ls(e){const t=new G(new Ee([])),i=new Le(t,e),o=new Le(t,e+1);let u=pe();return this.ns.forEachInRange([i,o],c=>{u=u.add(c.key)}),u}containsKey(e){const t=new Le(e,0),i=this.ts.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class Le{constructor(e,t){this.key=e,this.fs=t}static es(e,t){return G.comparator(e.key,t.key)||ce(e.fs,t.fs)}static ss(e,t){return ce(e.fs,t.fs)||G.comparator(e.key,t.key)}}/**
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
 */class xC{constructor(e,t){this.Jt=e,this.referenceDelegate=t,this.An=[],this.ds=1,this.ws=new $e(Le.es)}checkEmpty(e){return O.resolve(this.An.length===0)}addMutationBatch(e,t,i,o){const u=this.ds;this.ds++,this.An.length>0&&this.An[this.An.length-1];const c=new _C(u,t,i,o);this.An.push(c);for(const h of o)this.ws=this.ws.add(new Le(h.key,u)),this.Jt.addToCollectionParentIndex(e,h.key.path.popLast());return O.resolve(c)}lookupMutationBatch(e,t){return O.resolve(this._s(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,o=this.gs(i),u=o<0?0:o;return O.resolve(this.An.length>u?this.An[u]:null)}getHighestUnacknowledgedBatchId(){return O.resolve(this.An.length===0?-1:this.ds-1)}getAllMutationBatches(e){return O.resolve(this.An.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new Le(t,0),o=new Le(t,Number.POSITIVE_INFINITY),u=[];return this.ws.forEachInRange([i,o],c=>{const h=this._s(c.fs);u.push(h)}),O.resolve(u)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new $e(ce);return t.forEach(o=>{const u=new Le(o,0),c=new Le(o,Number.POSITIVE_INFINITY);this.ws.forEachInRange([u,c],h=>{i=i.add(h.fs)})}),O.resolve(this.ys(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,o=i.length+1;let u=i;G.isDocumentKey(u)||(u=u.child(""));const c=new Le(new G(u),0);let h=new $e(ce);return this.ws.forEachWhile(p=>{const m=p.key.path;return!!i.isPrefixOf(m)&&(m.length===o&&(h=h.add(p.fs)),!0)},c),O.resolve(this.ys(h))}ys(e){const t=[];return e.forEach(i=>{const o=this._s(i);o!==null&&t.push(o)}),t}removeMutationBatch(e,t){fe(this.ps(t.batchId,"removed")===0),this.An.shift();let i=this.ws;return O.forEach(t.mutations,o=>{const u=new Le(o.key,t.batchId);return i=i.delete(u),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)}).next(()=>{this.ws=i})}ee(e){}containsKey(e,t){const i=new Le(t,0),o=this.ws.firstAfterOrEqual(i);return O.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.An.length,O.resolve()}ps(e,t){return this.gs(e)}gs(e){return this.An.length===0?0:e-this.An[0].batchId}_s(e){const t=this.gs(e);return t<0||t>=this.An.length?null:this.An[t]}}/**
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
 */class PC{constructor(e,t){this.Jt=e,this.Ts=t,this.docs=new ze(G.comparator),this.size=0}addEntry(e,t,i){const o=t.key,u=this.docs.get(o),c=u?u.size:0,h=this.Ts(t);return this.docs=this.docs.insert(o,{document:t.mutableCopy(),size:h,readTime:i}),this.size+=h-c,this.Jt.addToCollectionParentIndex(e,o.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return O.resolve(i?i.document.mutableCopy():Ke.newInvalidDocument(t))}getEntries(e,t){let i=tr();return t.forEach(o=>{const u=this.docs.get(o);i=i.insert(o,u?u.document.mutableCopy():Ke.newInvalidDocument(o))}),O.resolve(i)}getDocumentsMatchingQuery(e,t,i){let o=tr();const u=new G(t.path.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:p,readTime:m}}=c.getNext();if(!t.path.isPrefixOf(h.path))break;m.compareTo(i)<=0||jo(t,p)&&(o=o.insert(p.key,p.mutableCopy()))}return O.resolve(o)}Es(e,t){return O.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new MC(this)}getSize(e){return O.resolve(this.size)}}class MC extends AC{constructor(e){super(),this.De=e}applyChanges(e){const t=[];return this.changes.forEach((i,o)=>{o.document.isValidDocument()?t.push(this.De.addEntry(e,o.document,this.getReadTime(i))):this.De.removeEntry(i)}),O.waitFor(t)}getFromCache(e,t){return this.De.getEntry(e,t)}getAllFromCache(e,t){return this.De.getEntries(e,t)}}/**
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
 */class UC{constructor(e){this.persistence=e,this.Is=new es(t=>nl(t),rl),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.As=0,this.Rs=new _l,this.targetCount=0,this.bs=Vr.ie()}forEachTarget(e,t){return this.Is.forEach((i,o)=>t(o)),O.resolve()}getLastRemoteSnapshotVersion(e){return O.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return O.resolve(this.As)}allocateTargetId(e){return this.highestTargetId=this.bs.next(),O.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.As&&(this.As=t),O.resolve()}ae(e){this.Is.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.bs=new Vr(t),this.highestTargetId=t),e.sequenceNumber>this.As&&(this.As=e.sequenceNumber)}addTargetData(e,t){return this.ae(t),this.targetCount+=1,O.resolve()}updateTargetData(e,t){return this.ae(t),O.resolve()}removeTargetData(e,t){return this.Is.delete(t.target),this.Rs.us(t.targetId),this.targetCount-=1,O.resolve()}removeTargets(e,t,i){let o=0;const u=[];return this.Is.forEach((c,h)=>{h.sequenceNumber<=t&&i.get(h.targetId)===null&&(this.Is.delete(c),u.push(this.removeMatchingKeysForTargetId(e,h.targetId)),o++)}),O.waitFor(u).next(()=>o)}getTargetCount(e){return O.resolve(this.targetCount)}getTargetData(e,t){const i=this.Is.get(t)||null;return O.resolve(i)}addMatchingKeys(e,t,i){return this.Rs.rs(t,i),O.resolve()}removeMatchingKeys(e,t,i){this.Rs.cs(t,i);const o=this.persistence.referenceDelegate,u=[];return o&&t.forEach(c=>{u.push(o.markPotentiallyOrphaned(e,c))}),O.waitFor(u)}removeMatchingKeysForTargetId(e,t){return this.Rs.us(t),O.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Rs.ls(t);return O.resolve(i)}containsKey(e,t){return O.resolve(this.Rs.containsKey(t))}}/**
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
 */class FC{constructor(e,t){this.Ps={},this.Be=new Xc(0),this.Ue=!1,this.Ue=!0,this.referenceDelegate=e(this),this.He=new UC(this),this.Jt=new TC,this.Je=function(i,o){return new PC(i,o)}(this.Jt,i=>this.referenceDelegate.vs(i)),this.k=new wC(t),this.Ye=new LC(this.k)}start(){return Promise.resolve()}shutdown(){return this.Ue=!1,Promise.resolve()}get started(){return this.Ue}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Jt}getMutationQueue(e){let t=this.Ps[e.toKey()];return t||(t=new xC(this.Jt,this.referenceDelegate),this.Ps[e.toKey()]=t),t}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getBundleCache(){return this.Ye}runTransaction(e,t,i){F("MemoryPersistence","Starting transaction:",e);const o=new VC(this.Be.next());return this.referenceDelegate.Vs(),i(o).next(u=>this.referenceDelegate.Ss(o).next(()=>u)).toPromise().then(u=>(o.raiseOnCommittedEvent(),u))}Ds(e,t){return O.or(Object.values(this.Ps).map(i=>()=>i.containsKey(e,t)))}}class VC extends vC{constructor(e){super(),this.currentSequenceNumber=e}}class wl{constructor(e){this.persistence=e,this.Cs=new _l,this.Ns=null}static ks(e){return new wl(e)}get xs(){if(this.Ns)return this.Ns;throw J()}addReference(e,t,i){return this.Cs.addReference(i,t),this.xs.delete(i.toString()),O.resolve()}removeReference(e,t,i){return this.Cs.removeReference(i,t),this.xs.add(i.toString()),O.resolve()}markPotentiallyOrphaned(e,t){return this.xs.add(t.toString()),O.resolve()}removeTarget(e,t){this.Cs.us(t.targetId).forEach(o=>this.xs.add(o.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(o=>{o.forEach(u=>this.xs.add(u.toString()))}).next(()=>i.removeTargetData(e,t))}Vs(){this.Ns=new Set}Ss(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return O.forEach(this.xs,i=>{const o=G.fromPath(i);return this.$s(e,o).next(u=>{u||t.removeEntry(o)})}).next(()=>(this.Ns=null,t.apply(e)))}updateLimboDocument(e,t){return this.$s(e,t).next(i=>{i?this.xs.delete(t.toString()):this.xs.add(t.toString())})}vs(e){return 0}$s(e,t){return O.or([()=>O.resolve(this.Cs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ds(e,t)])}}class am{constructor(){this.activeTargetIds=Wg()}Fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ls(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ms(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class BC{constructor(){this.pi=new am,this.Ti={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e){return this.pi.Fs(e),this.Ti[e]||"not-current"}updateQueryState(e,t,i){this.Ti[e]=t}removeLocalQueryTarget(e){this.pi.Ls(e)}isLocalQueryTarget(e){return this.pi.activeTargetIds.has(e)}clearQueryState(e){delete this.Ti[e]}getAllActiveQueryTargets(){return this.pi.activeTargetIds}isActiveQueryTarget(e){return this.pi.activeTargetIds.has(e)}start(){return this.pi=new am,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(){}}/**
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
 */class $C{Ei(e){}shutdown(){}}/**
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
 */class um{constructor(){this.Ii=()=>this.Ai(),this.Ri=()=>this.bi(),this.Pi=[],this.vi()}Ei(e){this.Pi.push(e)}shutdown(){window.removeEventListener("online",this.Ii),window.removeEventListener("offline",this.Ri)}vi(){window.addEventListener("online",this.Ii),window.addEventListener("offline",this.Ri)}Ai(){F("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Pi)e(0)}bi(){F("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Pi)e(1)}static Pt(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */const qC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
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
 */class WC{constructor(e){this.Vi=e.Vi,this.Si=e.Si}Di(e){this.Ci=e}Ni(e){this.ki=e}onMessage(e){this.xi=e}close(){this.Si()}send(e){this.Vi(e)}$i(){this.Ci()}Oi(e){this.ki(e)}Mi(e){this.xi(e)}}/**
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
 */class HC extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.Fi=t+"://"+e.host,this.Li="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Bi(e,t,i,o,u){const c=this.Ui(e,t);F("RestConnection","Sending: ",c,i);const h={};return this.qi(h,o,u),this.Ki(e,c,h,i).then(p=>(F("RestConnection","Received: ",p),p),p=>{throw dg("RestConnection",`${e} failed with error: `,p,"url: ",c,"request:",i),p})}ji(e,t,i,o,u){return this.Bi(e,t,i,o,u)}qi(e,t,i){e["X-Goog-Api-Client"]="gl-js/ fire/"+Or,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((o,u)=>e[u]=o),i&&i.headers.forEach((o,u)=>e[u]=o)}Ui(e,t){const i=qC[e];return`${this.Fi}/v1/${t}:${i}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}Ki(e,t,i,o){return new Promise((u,c)=>{const h=new ab;h.listenOnce(ib.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Jc.NO_ERROR:const m=h.getResponseJson();F("Connection","XHR received:",JSON.stringify(m)),u(m);break;case Jc.TIMEOUT:F("Connection",'RPC "'+e+'" timed out'),c(new q(N.DEADLINE_EXCEEDED,"Request time out"));break;case Jc.HTTP_ERROR:const _=h.getStatus();if(F("Connection",'RPC "'+e+'" failed with status:',_,"response text:",h.getResponseText()),_>0){const T=h.getResponseJson().error;if(T&&T.status&&T.message){const C=function(k){const x=k.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(x)>=0?x:N.UNKNOWN}(T.status);c(new q(C,T.message))}else c(new q(N.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new q(N.UNAVAILABLE,"Connection failed."));break;default:J()}}finally{F("Connection",'RPC "'+e+'" completed.')}});const p=JSON.stringify(o);h.send(t,"POST",p,i,15)})}Qi(e,t,i){const o=[this.Fi,"/","google.firestore.v1.Firestore","/",e,"/channel"],u=nb(),c=rb(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(h.xmlHttpFactory=new ob({})),this.qi(h.initMessageHeaders,t,i),qd()||Hd()||i1()||Gd()||s1()||Wd()||(h.httpHeadersOverwriteParam="$httpHeaders");const p=o.join("");F("Connection","Creating WebChannel: "+p,h);const m=u.createWebChannel(p,h);let _=!1,T=!1;const C=new WC({Vi:x=>{T?F("Connection","Not sending because WebChannel is closed:",x):(_||(F("Connection","Opening WebChannel transport."),m.open(),_=!0),F("Connection","WebChannel sending:",x),m.send(x))},Si:()=>m.close()}),k=(x,ee,te)=>{x.listen(ee,Te=>{try{te(Te)}catch(je){setTimeout(()=>{throw je},0)}})};return k(m,$o.EventType.OPEN,()=>{T||F("Connection","WebChannel transport opened.")}),k(m,$o.EventType.CLOSE,()=>{T||(T=!0,F("Connection","WebChannel transport closed"),C.Oi())}),k(m,$o.EventType.ERROR,x=>{T||(T=!0,dg("Connection","WebChannel transport errored:",x),C.Oi(new q(N.UNAVAILABLE,"The operation could not be completed")))}),k(m,$o.EventType.MESSAGE,x=>{var ee;if(!T){const te=x.data[0];fe(!!te);const Te=te,je=Te.error||((ee=Te[0])===null||ee===void 0?void 0:ee.error);if(je){F("Connection","WebChannel received error:",je);const Ie=je.status;let Je=function(Tt){const Ye=be[Tt];if(Ye!==void 0)return $g(Ye)}(Ie),qe=je.message;Je===void 0&&(Je=N.INTERNAL,qe="Unknown error status: "+Ie+" with message "+je.message),T=!0,C.Oi(new q(Je,qe)),m.close()}else F("Connection","WebChannel received:",te),C.Mi(te)}}),k(c,sb.STAT_EVENT,x=>{x.stat===lg.PROXY?F("Connection","Detected buffering proxy"):x.stat===lg.NOPROXY&&F("Connection","Detected no buffering proxy")}),setTimeout(()=>{C.$i()},0),C}}function El(){return typeof document!="undefined"?document:null}/**
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
 */function sa(n){return new nC(n,!0)}class cm{constructor(e,t,i=1e3,o=1.5,u=6e4){this.Me=e,this.timerId=t,this.Wi=i,this.Gi=o,this.zi=u,this.Hi=0,this.Ji=null,this.Yi=Date.now(),this.reset()}reset(){this.Hi=0}Xi(){this.Hi=this.zi}Zi(e){this.cancel();const t=Math.floor(this.Hi+this.tr()),i=Math.max(0,Date.now()-this.Yi),o=Math.max(0,t-i);o>0&&F("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.Hi} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.Ji=this.Me.enqueueAfterDelay(this.timerId,o,()=>(this.Yi=Date.now(),e())),this.Hi*=this.Gi,this.Hi<this.Wi&&(this.Hi=this.Wi),this.Hi>this.zi&&(this.Hi=this.zi)}er(){this.Ji!==null&&(this.Ji.skipDelay(),this.Ji=null)}cancel(){this.Ji!==null&&(this.Ji.cancel(),this.Ji=null)}tr(){return(Math.random()-.5)*this.Hi}}/**
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
 */class lm{constructor(e,t,i,o,u,c,h,p){this.Me=e,this.nr=i,this.sr=o,this.ir=u,this.authCredentialsProvider=c,this.appCheckCredentialsProvider=h,this.listener=p,this.state=0,this.rr=0,this.cr=null,this.ar=null,this.stream=null,this.ur=new cm(e,t)}hr(){return this.state===1||this.state===5||this.lr()}lr(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.dr()}async stop(){this.hr()&&await this.close(0)}wr(){this.state=0,this.ur.reset()}_r(){this.lr()&&this.cr===null&&(this.cr=this.Me.enqueueAfterDelay(this.nr,6e4,()=>this.mr()))}gr(e){this.yr(),this.stream.send(e)}async mr(){if(this.lr())return this.close(0)}yr(){this.cr&&(this.cr.cancel(),this.cr=null)}pr(){this.ar&&(this.ar.cancel(),this.ar=null)}async close(e,t){this.yr(),this.pr(),this.ur.cancel(),this.rr++,e!==4?this.ur.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(_n(t.toString()),_n("Using maximum backoff delay to prevent overloading the backend."),this.ur.Xi()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Tr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ni(t)}Tr(){}auth(){this.state=1;const e=this.Er(this.rr),t=this.rr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,o])=>{this.rr===t&&this.Ir(i,o)},i=>{e(()=>{const o=new q(N.UNKNOWN,"Fetching auth token failed: "+i.message);return this.Ar(o)})})}Ir(e,t){const i=this.Er(this.rr);this.stream=this.Rr(e,t),this.stream.Di(()=>{i(()=>(this.state=2,this.ar=this.Me.enqueueAfterDelay(this.sr,1e4,()=>(this.lr()&&(this.state=3),Promise.resolve())),this.listener.Di()))}),this.stream.Ni(o=>{i(()=>this.Ar(o))}),this.stream.onMessage(o=>{i(()=>this.onMessage(o))})}dr(){this.state=5,this.ur.Zi(async()=>{this.state=0,this.start()})}Ar(e){return F("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Er(e){return t=>{this.Me.enqueueAndForget(()=>this.rr===e?t():(F("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class GC extends lm{constructor(e,t,i,o,u,c){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,o,c),this.k=u}Rr(e,t){return this.ir.Qi("Listen",e,t)}onMessage(e){this.ur.reset();const t=sC(this.k,e),i=function(o){if(!("targetChange"in o))return ie.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?ie.min():u.readTime?en(u.readTime):ie.min()}(e);return this.listener.br(t,i)}Pr(e){const t={};t.database=gl(this.k),t.addTarget=function(o,u){let c;const h=u.target;return c=il(h)?{documents:uC(o,h)}:{query:cC(o,h)},c.targetId=u.targetId,u.resumeToken.approximateByteSize()>0?c.resumeToken=Jg(o,u.resumeToken):u.snapshotVersion.compareTo(ie.min())>0&&(c.readTime=ia(o,u.snapshotVersion.toTimestamp())),c}(this.k,e);const i=hC(this.k,e);i&&(t.labels=i),this.gr(t)}vr(e){const t={};t.database=gl(this.k),t.removeTarget=e,this.gr(t)}}class KC extends lm{constructor(e,t,i,o,u,c){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,o,c),this.k=u,this.Vr=!1}get Sr(){return this.Vr}start(){this.Vr=!1,this.lastStreamToken=void 0,super.start()}Tr(){this.Vr&&this.Dr([])}Rr(e,t){return this.ir.Qi("Write",e,t)}onMessage(e){if(fe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Vr){this.ur.reset();const t=aC(e.writeResults,e.commitTime),i=en(e.commitTime);return this.listener.Cr(i,t)}return fe(!e.writeResults||e.writeResults.length===0),this.Vr=!0,this.listener.Nr()}kr(){const e={};e.database=gl(this.k),this.gr(e)}Dr(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>oC(this.k,i))};this.gr(t)}}/**
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
 */class zC extends class{}{constructor(e,t,i,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.ir=i,this.k=o,this.$r=!1}Or(){if(this.$r)throw new q(N.FAILED_PRECONDITION,"The client has already been terminated.")}Bi(e,t,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.ir.Bi(e,t,i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(N.UNKNOWN,o.toString())})}ji(e,t,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.ir.ji(e,t,i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(N.UNKNOWN,o.toString())})}terminate(){this.$r=!0}}class jC{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Mr=0,this.Fr=null,this.Lr=!0}Br(){this.Mr===0&&(this.Ur("Unknown"),this.Fr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Fr=null,this.qr("Backend didn't respond within 10 seconds."),this.Ur("Offline"),Promise.resolve())))}Kr(e){this.state==="Online"?this.Ur("Unknown"):(this.Mr++,this.Mr>=1&&(this.jr(),this.qr(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Ur("Offline")))}set(e){this.jr(),this.Mr=0,e==="Online"&&(this.Lr=!1),this.Ur(e)}Ur(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}qr(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Lr?(_n(t),this.Lr=!1):F("OnlineStateTracker",t)}jr(){this.Fr!==null&&(this.Fr.cancel(),this.Fr=null)}}/**
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
 */class JC{constructor(e,t,i,o,u){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Qr=[],this.Wr=new Map,this.Gr=new Set,this.zr=[],this.Hr=u,this.Hr.Ei(c=>{i.enqueueAndForget(async()=>{rr(this)&&(F("RemoteStore","Restarting streams for network reachability change."),await async function(h){const p=z(h);p.Gr.add(4),await ts(p),p.Jr.set("Unknown"),p.Gr.delete(4),await oa(p)}(this))})}),this.Jr=new jC(i,o)}}async function oa(n){if(rr(n))for(const e of n.zr)await e(!0)}async function ts(n){for(const e of n.zr)await e(!1)}function hm(n,e){const t=z(n);t.Wr.has(e.targetId)||(t.Wr.set(e.targetId,e),Al(t)?Il(t):Br(t).lr()&&Tl(t,e))}function fm(n,e){const t=z(n),i=Br(t);t.Wr.delete(e),i.lr()&&dm(t,e),t.Wr.size===0&&(i.lr()?i._r():rr(t)&&t.Jr.set("Unknown"))}function Tl(n,e){n.Yr.X(e.targetId),Br(n).Pr(e)}function dm(n,e){n.Yr.X(e),Br(n).vr(e)}function Il(n){n.Yr=new Zb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Wr.get(e)||null}),Br(n).start(),n.Jr.Br()}function Al(n){return rr(n)&&!Br(n).hr()&&n.Wr.size>0}function rr(n){return z(n).Gr.size===0}function pm(n){n.Yr=void 0}async function YC(n){n.Wr.forEach((e,t)=>{Tl(n,e)})}async function XC(n,e){pm(n),Al(n)?(n.Jr.Kr(e),Il(n)):n.Jr.set("Unknown")}async function QC(n,e,t){if(n.Jr.set("Online"),e instanceof Gg&&e.state===2&&e.cause)try{await async function(i,o){const u=o.cause;for(const c of o.targetIds)i.Wr.has(c)&&(await i.remoteSyncer.rejectListen(c,u),i.Wr.delete(c),i.Yr.removeTarget(c))}(n,e)}catch(i){F("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),i),await aa(n,i)}else if(e instanceof ra?n.Yr.ot(e):e instanceof Hg?n.Yr.dt(e):n.Yr.ut(e),!t.isEqual(ie.min()))try{const i=await sm(n.localStore);t.compareTo(i)>=0&&await function(o,u){const c=o.Yr.gt(u);return c.targetChanges.forEach((h,p)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Wr.get(p);m&&o.Wr.set(p,m.withResumeToken(h.resumeToken,u))}}),c.targetMismatches.forEach(h=>{const p=o.Wr.get(h);if(!p)return;o.Wr.set(h,p.withResumeToken(Ve.EMPTY_BYTE_STRING,p.snapshotVersion)),dm(o,h);const m=new nr(p.target,h,1,p.sequenceNumber);Tl(o,m)}),o.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(i){F("RemoteStore","Failed to raise snapshot:",i),await aa(n,i)}}async function aa(n,e,t){if(!Qi(e))throw e;n.Gr.add(1),await ts(n),n.Jr.set("Offline"),t||(t=()=>sm(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{F("RemoteStore","Retrying IndexedDB access"),await t(),n.Gr.delete(1),await oa(n)})}function gm(n,e){return e().catch(t=>aa(n,t,e))}async function ua(n){const e=z(n),t=Tn(e);let i=e.Qr.length>0?e.Qr[e.Qr.length-1].batchId:-1;for(;ZC(e);)try{const o=await DC(e.localStore,i);if(o===null){e.Qr.length===0&&t._r();break}i=o.batchId,eR(e,o)}catch(o){await aa(e,o)}mm(e)&&ym(e)}function ZC(n){return rr(n)&&n.Qr.length<10}function eR(n,e){n.Qr.push(e);const t=Tn(n);t.lr()&&t.Sr&&t.Dr(e.mutations)}function mm(n){return rr(n)&&!Tn(n).hr()&&n.Qr.length>0}function ym(n){Tn(n).start()}async function tR(n){Tn(n).kr()}async function nR(n){const e=Tn(n);for(const t of n.Qr)e.Dr(t.mutations)}async function rR(n,e,t){const i=n.Qr.shift(),o=ml.from(i,e,t);await gm(n,()=>n.remoteSyncer.applySuccessfulWrite(o)),await ua(n)}async function iR(n,e){e&&Tn(n).Sr&&await async function(t,i){if(o=i.code,Kb(o)&&o!==N.ABORTED){const u=t.Qr.shift();Tn(t).wr(),await gm(t,()=>t.remoteSyncer.rejectFailedWrite(u.batchId,i)),await ua(t)}var o}(n,e),mm(n)&&ym(n)}async function vm(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),F("RemoteStore","RemoteStore received new credentials");const i=rr(t);t.Gr.add(3),await ts(t),i&&t.Jr.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Gr.delete(3),await oa(t)}async function sR(n,e){const t=z(n);e?(t.Gr.delete(2),await oa(t)):e||(t.Gr.add(2),await ts(t),t.Jr.set("Unknown"))}function Br(n){return n.Xr||(n.Xr=function(e,t,i){const o=z(e);return o.Or(),new GC(t,o.ir,o.authCredentials,o.appCheckCredentials,o.k,i)}(n.datastore,n.asyncQueue,{Di:YC.bind(null,n),Ni:XC.bind(null,n),br:QC.bind(null,n)}),n.zr.push(async e=>{e?(n.Xr.wr(),Al(n)?Il(n):n.Jr.set("Unknown")):(await n.Xr.stop(),pm(n))})),n.Xr}function Tn(n){return n.Zr||(n.Zr=function(e,t,i){const o=z(e);return o.Or(),new KC(t,o.ir,o.authCredentials,o.appCheckCredentials,o.k,i)}(n.datastore,n.asyncQueue,{Di:tR.bind(null,n),Ni:iR.bind(null,n),Nr:nR.bind(null,n),Cr:rR.bind(null,n)}),n.zr.push(async e=>{e?(n.Zr.wr(),await ua(n)):(await n.Zr.stop(),n.Qr.length>0&&(F("RemoteStore",`Stopping write stream with ${n.Qr.length} pending writes`),n.Qr=[]))})),n.Zr}/**
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
 */class Sl{constructor(e,t,i,o,u){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=o,this.removalCallback=u,this.deferred=new wn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}static createAndSchedule(e,t,i,o,u){const c=Date.now()+i,h=new Sl(e,t,c,o,u);return h.start(i),h}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bl(n,e){if(_n("AsyncQueue",`${e}: ${n}`),Qi(n))return new q(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class $r{constructor(e){this.comparator=e?(t,i)=>e(t,i)||G.comparator(t.key,i.key):(t,i)=>G.comparator(t.key,i.key),this.keyedMap=ll(),this.sortedSet=new ze(this.comparator)}static emptySet(e){return new $r(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $r)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,u=i.getNext().key;if(!o.isEqual(u))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new $r;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
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
 */class _m{constructor(){this.eo=new ze(G.comparator)}track(e){const t=e.doc.key,i=this.eo.get(t);i?e.type!==0&&i.type===3?this.eo=this.eo.insert(t,e):e.type===3&&i.type!==1?this.eo=this.eo.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.eo=this.eo.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.eo=this.eo.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.eo=this.eo.remove(t):e.type===1&&i.type===2?this.eo=this.eo.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.eo=this.eo.insert(t,{type:2,doc:e.doc}):J():this.eo=this.eo.insert(t,e)}no(){const e=[];return this.eo.inorderTraversal((t,i)=>{e.push(i)}),e}}class qr{constructor(e,t,i,o,u,c,h,p){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=o,this.mutatedKeys=u,this.fromCache=c,this.syncStateChanged=h,this.excludesMetadataChanges=p}static fromInitialDocuments(e,t,i,o){const u=[];return t.forEach(c=>{u.push({type:0,doc:c})}),new qr(e,t,$r.emptySet(t),u,i,o,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==i[o].type||!t[o].doc.isEqual(i[o].doc))return!1;return!0}}/**
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
 */class oR{constructor(){this.so=void 0,this.listeners=[]}}class aR{constructor(){this.queries=new es(e=>Cg(e),zo),this.onlineState="Unknown",this.io=new Set}}async function uR(n,e){const t=z(n),i=e.query;let o=!1,u=t.queries.get(i);if(u||(o=!0,u=new oR),o)try{u.so=await t.onListen(i)}catch(c){const h=bl(c,`Initialization of query '${ul(e.query)}' failed`);return void e.onError(h)}t.queries.set(i,u),u.listeners.push(e),e.ro(t.onlineState),u.so&&e.oo(u.so)&&Cl(t)}async function cR(n,e){const t=z(n),i=e.query;let o=!1;const u=t.queries.get(i);if(u){const c=u.listeners.indexOf(e);c>=0&&(u.listeners.splice(c,1),o=u.listeners.length===0)}if(o)return t.queries.delete(i),t.onUnlisten(i)}function lR(n,e){const t=z(n);let i=!1;for(const o of e){const u=o.query,c=t.queries.get(u);if(c){for(const h of c.listeners)h.oo(o)&&(i=!0);c.so=o}}i&&Cl(t)}function hR(n,e,t){const i=z(n),o=i.queries.get(e);if(o)for(const u of o.listeners)u.onError(t);i.queries.delete(e)}function Cl(n){n.io.forEach(e=>{e.next()})}class fR{constructor(e,t,i){this.query=e,this.co=t,this.ao=!1,this.uo=null,this.onlineState="Unknown",this.options=i||{}}oo(e){if(!this.options.includeMetadataChanges){const i=[];for(const o of e.docChanges)o.type!==3&&i.push(o);e=new qr(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let t=!1;return this.ao?this.ho(e)&&(this.co.next(e),t=!0):this.lo(e,this.onlineState)&&(this.fo(e),t=!0),this.uo=e,t}onError(e){this.co.error(e)}ro(e){this.onlineState=e;let t=!1;return this.uo&&!this.ao&&this.lo(this.uo,e)&&(this.fo(this.uo),t=!0),t}lo(e,t){if(!e.fromCache)return!0;const i=t!=="Offline";return(!this.options.wo||!i)&&(!e.docs.isEmpty()||t==="Offline")}ho(e){if(e.docChanges.length>0)return!0;const t=this.uo&&this.uo.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}fo(e){e=qr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.ao=!0,this.co.next(e)}}/**
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
 */class wm{constructor(e){this.key=e}}class Em{constructor(e){this.key=e}}class dR{constructor(e,t){this.query=e,this.To=t,this.Eo=null,this.current=!1,this.Io=pe(),this.mutatedKeys=pe(),this.Ao=Rg(e),this.Ro=new $r(this.Ao)}get bo(){return this.To}Po(e,t){const i=t?t.vo:new _m,o=t?t.Ro:this.Ro;let u=t?t.mutatedKeys:this.mutatedKeys,c=o,h=!1;const p=Ko(this.query)&&o.size===this.query.limit?o.last():null,m=al(this.query)&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal((_,T)=>{const C=o.get(_),k=jo(this.query,T)?T:null,x=!!C&&this.mutatedKeys.has(C.key),ee=!!k&&(k.hasLocalMutations||this.mutatedKeys.has(k.key)&&k.hasCommittedMutations);let te=!1;C&&k?C.data.isEqual(k.data)?x!==ee&&(i.track({type:3,doc:k}),te=!0):this.Vo(C,k)||(i.track({type:2,doc:k}),te=!0,(p&&this.Ao(k,p)>0||m&&this.Ao(k,m)<0)&&(h=!0)):!C&&k?(i.track({type:0,doc:k}),te=!0):C&&!k&&(i.track({type:1,doc:C}),te=!0,(p||m)&&(h=!0)),te&&(k?(c=c.add(k),u=ee?u.add(_):u.delete(_)):(c=c.delete(_),u=u.delete(_)))}),Ko(this.query)||al(this.query))for(;c.size>this.query.limit;){const _=Ko(this.query)?c.last():c.first();c=c.delete(_.key),u=u.delete(_.key),i.track({type:1,doc:_})}return{Ro:c,vo:i,Bn:h,mutatedKeys:u}}Vo(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i){const o=this.Ro;this.Ro=e.Ro,this.mutatedKeys=e.mutatedKeys;const u=e.vo.no();u.sort((m,_)=>function(T,C){const k=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J()}};return k(T)-k(C)}(m.type,_.type)||this.Ao(m.doc,_.doc)),this.So(i);const c=t?this.Do():[],h=this.Io.size===0&&this.current?1:0,p=h!==this.Eo;return this.Eo=h,u.length!==0||p?{snapshot:new qr(this.query,e.Ro,o,u,e.mutatedKeys,h===0,p,!1),Co:c}:{Co:c}}ro(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ro:this.Ro,vo:new _m,mutatedKeys:this.mutatedKeys,Bn:!1},!1)):{Co:[]}}No(e){return!this.To.has(e)&&!!this.Ro.has(e)&&!this.Ro.get(e).hasLocalMutations}So(e){e&&(e.addedDocuments.forEach(t=>this.To=this.To.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.To=this.To.delete(t)),this.current=e.current)}Do(){if(!this.current)return[];const e=this.Io;this.Io=pe(),this.Ro.forEach(i=>{this.No(i.key)&&(this.Io=this.Io.add(i.key))});const t=[];return e.forEach(i=>{this.Io.has(i)||t.push(new Em(i))}),this.Io.forEach(i=>{e.has(i)||t.push(new wm(i))}),t}ko(e){this.To=e.zn,this.Io=pe();const t=this.Po(e.documents);return this.applyChanges(t,!0)}xo(){return qr.fromInitialDocuments(this.query,this.Ro,this.mutatedKeys,this.Eo===0)}}class pR{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class gR{constructor(e){this.key=e,this.$o=!1}}class mR{constructor(e,t,i,o,u,c){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=o,this.currentUser=u,this.maxConcurrentLimboResolutions=c,this.Oo={},this.Mo=new es(h=>Cg(h),zo),this.Fo=new Map,this.Lo=new Set,this.Bo=new ze(G.comparator),this.Uo=new Map,this.qo=new _l,this.Ko={},this.jo=new Map,this.Qo=Vr.re(),this.onlineState="Unknown",this.Wo=void 0}get isPrimaryClient(){return this.Wo===!0}}async function yR(n,e){const t=CR(n);let i,o;const u=t.Mo.get(e);if(u)i=u.targetId,t.sharedClientState.addLocalQueryTarget(i),o=u.view.xo();else{const c=await OC(t.localStore,Qn(e)),h=t.sharedClientState.addLocalQueryTarget(c.targetId);i=c.targetId,o=await vR(t,e,i,h==="current"),t.isPrimaryClient&&hm(t.remoteStore,c)}return o}async function vR(n,e,t,i){n.Go=(_,T,C)=>async function(k,x,ee,te){let Te=x.view.Po(ee);Te.Bn&&(Te=await om(k.localStore,x.query,!1).then(({documents:Je})=>x.view.Po(Je,Te)));const je=te&&te.targetChanges.get(x.targetId),Ie=x.view.applyChanges(Te,k.isPrimaryClient,je);return Cm(k,x.targetId,Ie.Co),Ie.snapshot}(n,_,T,C);const o=await om(n.localStore,e,!0),u=new dR(e,o.zn),c=u.Po(o.documents),h=Xi.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline"),p=u.applyChanges(c,n.isPrimaryClient,h);Cm(n,t,p.Co);const m=new pR(e,t,u);return n.Mo.set(e,m),n.Fo.has(t)?n.Fo.get(t).push(e):n.Fo.set(t,[e]),p.snapshot}async function _R(n,e){const t=z(n),i=t.Mo.get(e),o=t.Fo.get(i.targetId);if(o.length>1)return t.Fo.set(i.targetId,o.filter(u=>!zo(u,e))),void t.Mo.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(i.targetId),t.sharedClientState.isActiveQueryTarget(i.targetId)||await vl(t.localStore,i.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(i.targetId),fm(t.remoteStore,i.targetId),Rl(t,i.targetId)}).catch(Zi)):(Rl(t,i.targetId),await vl(t.localStore,i.targetId,!0))}async function wR(n,e,t){const i=RR(n);try{const o=await function(u,c){const h=z(u),p=vt.now(),m=c.reduce((T,C)=>T.add(C.key),pe());let _;return h.persistence.runTransaction("Locally write mutations","readwrite",T=>h.Wn.vn(T,m).next(C=>{_=C;const k=[];for(const x of c){const ee=qb(x,_.get(x.key));ee!=null&&k.push(new er(x.key,ee,Tg(ee.value.mapValue),Zn.exists(!0)))}return h.An.addMutationBatch(T,p,k,c)})).then(T=>(T.applyToLocalDocumentSet(_),{batchId:T.batchId,changes:_}))}(i.localStore,e);i.sharedClientState.addPendingMutation(o.batchId),function(u,c,h){let p=u.Ko[u.currentUser.toKey()];p||(p=new ze(ce)),p=p.insert(c,h),u.Ko[u.currentUser.toKey()]=p}(i,o.batchId,t),await ns(i,o.changes),await ua(i.remoteStore)}catch(o){const u=bl(o,"Failed to persist write");t.reject(u)}}async function Tm(n,e){const t=z(n);try{const i=await NC(t.localStore,e);e.targetChanges.forEach((o,u)=>{const c=t.Uo.get(u);c&&(fe(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1),o.addedDocuments.size>0?c.$o=!0:o.modifiedDocuments.size>0?fe(c.$o):o.removedDocuments.size>0&&(fe(c.$o),c.$o=!1))}),await ns(t,i,e)}catch(i){await Zi(i)}}function Im(n,e,t){const i=z(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const o=[];i.Mo.forEach((u,c)=>{const h=c.view.ro(e);h.snapshot&&o.push(h.snapshot)}),function(u,c){const h=z(u);h.onlineState=c;let p=!1;h.queries.forEach((m,_)=>{for(const T of _.listeners)T.ro(c)&&(p=!0)}),p&&Cl(h)}(i.eventManager,e),o.length&&i.Oo.br(o),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function ER(n,e,t){const i=z(n);i.sharedClientState.updateQueryState(e,"rejected",t);const o=i.Uo.get(e),u=o&&o.key;if(u){let c=new ze(G.comparator);c=c.insert(u,Ke.newNoDocument(u,ie.min()));const h=pe().add(u),p=new na(ie.min(),new Map,new $e(ce),c,h);await Tm(i,p),i.Bo=i.Bo.remove(u),i.Uo.delete(e),Nl(i)}else await vl(i.localStore,e,!1).then(()=>Rl(i,e,t)).catch(Zi)}async function TR(n,e){const t=z(n),i=e.batch.batchId;try{const o=await RC(t.localStore,e);Sm(t,i,null),Am(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await ns(t,o)}catch(o){await Zi(o)}}async function IR(n,e,t){const i=z(n);try{const o=await function(u,c){const h=z(u);return h.persistence.runTransaction("Reject batch","readwrite-primary",p=>{let m;return h.An.lookupMutationBatch(p,c).next(_=>(fe(_!==null),m=_.keys(),h.An.removeMutationBatch(p,_))).next(()=>h.An.performConsistencyCheck(p)).next(()=>h.Wn.vn(p,m))})}(i.localStore,e);Sm(i,e,t),Am(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await ns(i,o)}catch(o){await Zi(o)}}function Am(n,e){(n.jo.get(e)||[]).forEach(t=>{t.resolve()}),n.jo.delete(e)}function Sm(n,e,t){const i=z(n);let o=i.Ko[i.currentUser.toKey()];if(o){const u=o.get(e);u&&(t?u.reject(t):u.resolve(),o=o.remove(e)),i.Ko[i.currentUser.toKey()]=o}}function Rl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Fo.get(e))n.Mo.delete(i),t&&n.Oo.zo(i,t);n.Fo.delete(e),n.isPrimaryClient&&n.qo.us(e).forEach(i=>{n.qo.containsKey(i)||bm(n,i)})}function bm(n,e){n.Lo.delete(e.path.canonicalString());const t=n.Bo.get(e);t!==null&&(fm(n.remoteStore,t),n.Bo=n.Bo.remove(e),n.Uo.delete(t),Nl(n))}function Cm(n,e,t){for(const i of t)i instanceof wm?(n.qo.addReference(i.key,e),AR(n,i)):i instanceof Em?(F("SyncEngine","Document no longer in limbo: "+i.key),n.qo.removeReference(i.key,e),n.qo.containsKey(i.key)||bm(n,i.key)):J()}function AR(n,e){const t=e.key,i=t.path.canonicalString();n.Bo.get(t)||n.Lo.has(i)||(F("SyncEngine","New document in limbo: "+t),n.Lo.add(i),Nl(n))}function Nl(n){for(;n.Lo.size>0&&n.Bo.size<n.maxConcurrentLimboResolutions;){const e=n.Lo.values().next().value;n.Lo.delete(e);const t=new G(Ee.fromString(e)),i=n.Qo.next();n.Uo.set(i,new gR(t)),n.Bo=n.Bo.insert(t,i),hm(n.remoteStore,new nr(Qn(ol(t.path)),i,2,Xc.I))}}async function ns(n,e,t){const i=z(n),o=[],u=[],c=[];i.Mo.isEmpty()||(i.Mo.forEach((h,p)=>{c.push(i.Go(p,e,t).then(m=>{if(m){i.isPrimaryClient&&i.sharedClientState.updateQueryState(p.targetId,m.fromCache?"not-current":"current"),o.push(m);const _=yl.$n(p.targetId,m);u.push(_)}}))}),await Promise.all(c),i.Oo.br(o),await async function(h,p){const m=z(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>O.forEach(p,T=>O.forEach(T.kn,C=>m.persistence.referenceDelegate.addReference(_,T.targetId,C)).next(()=>O.forEach(T.xn,C=>m.persistence.referenceDelegate.removeReference(_,T.targetId,C)))))}catch(_){if(!Qi(_))throw _;F("LocalStore","Failed to update sequence numbers: "+_)}for(const _ of p){const T=_.targetId;if(!_.fromCache){const C=m.qn.get(T),k=C.snapshotVersion,x=C.withLastLimboFreeSnapshotVersion(k);m.qn=m.qn.insert(T,x)}}}(i.localStore,u))}async function SR(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){F("SyncEngine","User change. New user:",e.toKey());const i=await im(t.localStore,e);t.currentUser=e,function(o,u){o.jo.forEach(c=>{c.forEach(h=>{h.reject(new q(N.CANCELLED,u))})}),o.jo.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await ns(t,i.Gn)}}function bR(n,e){const t=z(n),i=t.Uo.get(e);if(i&&i.$o)return pe().add(i.key);{let o=pe();const u=t.Fo.get(e);if(!u)return o;for(const c of u){const h=t.Mo.get(c);o=o.unionWith(h.view.bo)}return o}}function CR(n){const e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Tm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=bR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ER.bind(null,e),e.Oo.br=lR.bind(null,e.eventManager),e.Oo.zo=hR.bind(null,e.eventManager),e}function RR(n){const e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=TR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=IR.bind(null,e),e}class NR{constructor(){this.synchronizeTabs=!1}async initialize(e){this.k=sa(e.databaseInfo.databaseId),this.sharedClientState=this.Jo(e),this.persistence=this.Yo(e),await this.persistence.start(),this.gcScheduler=this.Xo(e),this.localStore=this.Zo(e)}Xo(e){return null}Zo(e){return CC(this.persistence,new SC,e.initialUser,this.k)}Yo(e){return new FC(wl.ks,this.k)}Jo(e){return new BC}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class kR{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Im(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=SR.bind(null,this.syncEngine),await sR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new aR}createDatastore(e){const t=sa(e.databaseInfo.databaseId),i=(o=e.databaseInfo,new HC(o));var o;return function(u,c,h,p){return new zC(u,c,h,p)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return t=this.localStore,i=this.datastore,o=e.asyncQueue,u=h=>Im(this.syncEngine,h,0),c=um.Pt()?new um:new $C,new JC(t,i,o,u,c);var t,i,o,u,c}createSyncEngine(e,t){return function(i,o,u,c,h,p,m){const _=new mR(i,o,u,c,h,p);return m&&(_.Wo=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=z(e);F("RemoteStore","RemoteStore shutting down."),t.Gr.add(5),await ts(t),t.Hr.shutdown(),t.Jr.set("Unknown")}(this.remoteStore)}}/**
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
 */class DR{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.ec(this.observer.next,e)}error(e){this.observer.error?this.ec(this.observer.error,e):console.error("Uncaught Error in snapshot listener:",e)}nc(){this.muted=!0}ec(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class OR{constructor(e,t,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=o,this.user=at.UNAUTHENTICATED,this.clientId=pg.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(i,async u=>{F("FirestoreClient","Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(i,u=>(F("FirestoreClient","Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new q(N.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=bl(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function LR(n,e){n.asyncQueue.verifyOperationInProgress(),F("FirestoreClient","Initializing OfflineComponentProvider");const t=await n.getConfiguration();await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async o=>{i.isEqual(o)||(await im(e.localStore,o),i=o)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n.offlineComponents=e}async function xR(n,e){n.asyncQueue.verifyOperationInProgress();const t=await PR(n);F("FirestoreClient","Initializing OnlineComponentProvider");const i=await n.getConfiguration();await e.initialize(t,i),n.setCredentialChangeListener(o=>vm(e.remoteStore,o)),n.setAppCheckTokenChangeListener((o,u)=>vm(e.remoteStore,u)),n.onlineComponents=e}async function PR(n){return n.offlineComponents||(F("FirestoreClient","Using default OfflineComponentProvider"),await LR(n,new NR)),n.offlineComponents}async function Rm(n){return n.onlineComponents||(F("FirestoreClient","Using default OnlineComponentProvider"),await xR(n,new kR)),n.onlineComponents}function MR(n){return Rm(n).then(e=>e.syncEngine)}async function UR(n){const e=await Rm(n),t=e.eventManager;return t.onListen=yR.bind(null,e.syncEngine),t.onUnlisten=_R.bind(null,e.syncEngine),t}function FR(n,e,t={}){const i=new wn;return n.asyncQueue.enqueueAndForget(async()=>function(o,u,c,h,p){const m=new DR({next:T=>{u.enqueueAndForget(()=>cR(o,_));const C=T.docs.has(c);!C&&T.fromCache?p.reject(new q(N.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&T.fromCache&&h&&h.source==="server"?p.reject(new q(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):p.resolve(T)},error:T=>p.reject(T)}),_=new fR(ol(c.path),m,{includeMetadataChanges:!0,wo:!0});return uR(o,_)}(await UR(n),n.asyncQueue,e,t,i)),i.promise}class VR{constructor(e,t,i,o,u,c,h,p){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=o,this.ssl=u,this.forceLongPolling=c,this.autoDetectLongPolling=h,this.useFetchStreams=p}}class rs{constructor(e,t){this.projectId=e,this.database=t||"(default)"}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof rs&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Nm=new Map;/**
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
 */function BR(n,e,t){if(!t)throw new q(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function $R(n,e,t,i){if(e===!0&&i===!0)throw new q(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function km(n){if(!G.isDocumentKey(n))throw new q(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kl(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(t){return t.constructor?t.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":J()}function Wr(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new q(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=kl(n);throw new q(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class Dm{constructor(e){var t;if(e.host===void 0){if(e.ssl!==void 0)throw new q(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new q(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,$R("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
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
 */class Om{constructor(e,t,i){this._authCredentials=t,this._appCheckCredentials=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dm({}),this._settingsFrozen=!1,e instanceof rs?this._databaseId=e:(this._app=e,this._databaseId=function(o){if(!Object.prototype.hasOwnProperty.apply(o.options,["projectId"]))throw new q(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rs(o.options.projectId)}(e))}get app(){if(!this._app)throw new q(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new q(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dm(e),e.credentials!==void 0&&(this._authCredentials=function(t){if(!t)return new cb;switch(t.type){case"gapi":const i=t.client;return fe(!(typeof i!="object"||i===null||!i.auth||!i.auth.getAuthHeaderValueForFirstParty)),new fb(i,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new q(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Nm.get(e);t&&(F("ComponentProvider","Removing Datastore"),Nm.delete(e),t.terminate())}(this),Promise.resolve()}}/**
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
 */class wt{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new is(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new wt(this.firestore,e,this._key)}}class Dl{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Dl(this.firestore,e,this._query)}}class is extends Dl{constructor(e,t,i){super(e,t,ol(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new wt(this.firestore,null,new G(e))}withConverter(e){return new is(this.firestore,e,this._path)}}function BD(n,e,...t){if(n=mt(n),arguments.length===1&&(e=pg.A()),BR("doc","path",e),n instanceof Om){const i=Ee.fromString(e,...t);return km(i),new wt(n,null,new G(i))}{if(!(n instanceof wt||n instanceof is))throw new q(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Ee.fromString(e,...t));return km(i),new wt(n.firestore,n instanceof is?n.converter:null,new G(i))}}/**
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
 */class qR{constructor(){this.mc=Promise.resolve(),this.gc=[],this.yc=!1,this.Tc=[],this.Ec=null,this.Ic=!1,this.Ac=!1,this.Rc=[],this.ur=new cm(this,"async_queue_retry"),this.bc=()=>{const t=El();t&&F("AsyncQueue","Visibility state changed to "+t.visibilityState),this.ur.er()};const e=El();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.bc)}get isShuttingDown(){return this.yc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pc(),this.vc(e)}enterRestrictedMode(e){if(!this.yc){this.yc=!0,this.Ac=e||!1;const t=El();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.bc)}}enqueue(e){if(this.Pc(),this.yc)return new Promise(()=>{});const t=new wn;return this.vc(()=>this.yc&&this.Ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.gc.push(e),this.Vc()))}async Vc(){if(this.gc.length!==0){try{await this.gc[0](),this.gc.shift(),this.ur.reset()}catch(e){if(!Qi(e))throw e;F("AsyncQueue","Operation failed with retryable error: "+e)}this.gc.length>0&&this.ur.Zi(()=>this.Vc())}}vc(e){const t=this.mc.then(()=>(this.Ic=!0,e().catch(i=>{this.Ec=i,this.Ic=!1;const o=function(u){let c=u.message||"";return u.stack&&(c=u.stack.includes(u.message)?u.stack:u.message+`
`+u.stack),c}(i);throw _n("INTERNAL UNHANDLED ERROR: ",o),i}).then(i=>(this.Ic=!1,i))));return this.mc=t,t}enqueueAfterDelay(e,t,i){this.Pc(),this.Rc.indexOf(e)>-1&&(t=0);const o=Sl.createAndSchedule(this,e,t,i,u=>this.Sc(u));return this.Tc.push(o),o}Pc(){this.Ec&&J()}verifyOperationInProgress(){}async Dc(){let e;do e=this.mc,await e;while(e!==this.mc)}Cc(e){for(const t of this.Tc)if(t.timerId===e)return!0;return!1}Nc(e){return this.Dc().then(()=>{this.Tc.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Dc()})}kc(e){this.Rc.push(e)}Sc(e){const t=this.Tc.indexOf(e);this.Tc.splice(t,1)}}class ca extends Om{constructor(e,t,i){super(e,t,i),this.type="firestore",this._queue=new qR,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||xm(this),this._firestoreClient.terminate()}}function $D(n=Jd()){return ic(n,"firestore").getImmediate()}function Lm(n){return n._firestoreClient||xm(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function xm(n){var e;const t=n._freezeSettings(),i=function(o,u,c,h){return new VR(o,u,c,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,h.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,t);n._firestoreClient=new OR(n._authCredentials,n._appCheckCredentials,n._queue,i)}/**
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
 */class la{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new q(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ut(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Hr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Hr(Ve.fromBase64String(e))}catch(t){throw new q(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Hr(Ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ol{constructor(e){this._methodName=e}}/**
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
 */class Ll{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}}/**
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
 */const WR=/^__.*__$/;class HR{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new er(e,this.data,this.fieldMask,t,this.fieldTransforms):new ea(e,this.data,t,this.fieldTransforms)}}class Pm{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new er(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Mm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J()}}class xl{constructor(e,t,i,o,u,c){this.settings=e,this.databaseId=t,this.k=i,this.ignoreUndefinedProperties=o,u===void 0&&this.xc(),this.fieldTransforms=u||[],this.fieldMask=c||[]}get path(){return this.settings.path}get $c(){return this.settings.$c}Oc(e){return new xl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.k,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mc(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),o=this.Oc({path:i,Fc:!1});return o.Lc(e),o}Bc(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),o=this.Oc({path:i,Fc:!1});return o.xc(),o}Uc(e){return this.Oc({path:void 0,Fc:!0})}qc(e){return da(e,this.settings.methodName,this.settings.Kc||!1,this.path,this.settings.jc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}xc(){if(this.path)for(let e=0;e<this.path.length;e++)this.Lc(this.path.get(e))}Lc(e){if(e.length===0)throw this.qc("Document fields must not be empty");if(Mm(this.$c)&&WR.test(e))throw this.qc('Document fields cannot begin and end with "__"')}}class GR{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.k=i||sa(e)}Qc(e,t,i,o=!1){return new xl({$c:e,methodName:t,jc:i,path:ut.emptyPath(),Fc:!1,Kc:o},this.databaseId,this.k,this.ignoreUndefinedProperties)}}function Um(n){const e=n._freezeSettings(),t=sa(n._databaseId);return new GR(n._databaseId,!!e.ignoreUndefinedProperties,t)}function KR(n,e,t,i,o,u={}){const c=n.Qc(u.merge||u.mergeFields?2:0,e,t,o);Pl("Data must be an object, but it was:",c,i);const h=Fm(i,c);let p,m;if(u.merge)p=new Wi(c.fieldMask),m=c.fieldTransforms;else if(u.mergeFields){const _=[];for(const T of u.mergeFields){const C=Ml(e,T,t);if(!c.contains(C))throw new q(N.INVALID_ARGUMENT,`Field '${C}' is specified in your field mask but missing from your input data.`);Bm(_,C)||_.push(C)}p=new Wi(_),m=c.fieldTransforms.filter(T=>p.covers(T.field))}else p=null,m=c.fieldTransforms;return new HR(new _t(h),p,m)}class ha extends Ol{_toFieldTransform(e){if(e.$c!==2)throw e.$c===1?e.qc(`${this._methodName}() can only appear at the top level of your update data`):e.qc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ha}}function zR(n,e,t,i){const o=n.Qc(1,e,t);Pl("Data must be an object, but it was:",o,i);const u=[],c=_t.empty();Yn(i,(p,m)=>{const _=Ul(e,p,t);m=mt(m);const T=o.Bc(_);if(m instanceof ha)u.push(_);else{const C=fa(m,T);C!=null&&(u.push(_),c.set(_,C))}});const h=new Wi(u);return new Pm(c,h,o.fieldTransforms)}function jR(n,e,t,i,o,u){const c=n.Qc(1,e,t),h=[Ml(e,i,t)],p=[o];if(u.length%2!=0)throw new q(N.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let C=0;C<u.length;C+=2)h.push(Ml(e,u[C])),p.push(u[C+1]);const m=[],_=_t.empty();for(let C=h.length-1;C>=0;--C)if(!Bm(m,h[C])){const k=h[C];let x=p[C];x=mt(x);const ee=c.Bc(k);if(x instanceof ha)m.push(k);else{const te=fa(x,ee);te!=null&&(m.push(k),_.set(k,te))}}const T=new Wi(m);return new Pm(_,T,c.fieldTransforms)}function fa(n,e){if(Vm(n=mt(n)))return Pl("Unsupported field value:",e,n),Fm(n,e);if(n instanceof Ol)return function(t,i){if(!Mm(i.$c))throw i.qc(`${t._methodName}() can only be used with update() and set()`);if(!i.path)throw i.qc(`${t._methodName}() is not currently supported inside arrays`);const o=t._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Fc&&e.$c!==4)throw e.qc("Nested arrays are not supported");return function(t,i){const o=[];let u=0;for(const c of t){let h=fa(c,i.Uc(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}}(n,e)}return function(t,i){if((t=mt(t))===null)return{nullValue:"NULL_VALUE"};if(typeof t=="number")return Mb(i.k,t);if(typeof t=="boolean")return{booleanValue:t};if(typeof t=="string")return{stringValue:t};if(t instanceof Date){const o=vt.fromDate(t);return{timestampValue:ia(i.k,o)}}if(t instanceof vt){const o=new vt(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:ia(i.k,o)}}if(t instanceof Ll)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Hr)return{bytesValue:Jg(i.k,t._byteString)};if(t instanceof wt){const o=i.databaseId,u=t.firestore._databaseId;if(!u.isEqual(o))throw i.qc(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:hl(t.firestore._databaseId||i.databaseId,t._key.path)}}throw i.qc(`Unsupported field value: ${kl(t)}`)}(n,e)}function Fm(n,e){const t={};return mg(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Yn(n,(i,o)=>{const u=fa(o,e.Mc(i));u!=null&&(t[i]=u)}),{mapValue:{fields:t}}}function Vm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof vt||n instanceof Ll||n instanceof Hr||n instanceof wt||n instanceof Ol)}function Pl(n,e,t){if(!Vm(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const i=kl(t);throw i==="an object"?e.qc(n+" a custom object"):e.qc(n+" "+i)}}function Ml(n,e,t){if((e=mt(e))instanceof la)return e._internalPath;if(typeof e=="string")return Ul(n,e);throw da("Field path arguments must be of type string or ",n,!1,void 0,t)}const JR=new RegExp("[~\\*/\\[\\]]");function Ul(n,e,t){if(e.search(JR)>=0)throw da(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new la(...e.split("."))._internalPath}catch{throw da(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function da(n,e,t,i,o){const u=i&&!i.isEmpty(),c=o!==void 0;let h=`Function ${e}() called with invalid data`;t&&(h+=" (via `toFirestore()`)"),h+=". ";let p="";return(u||c)&&(p+=" (found",u&&(p+=` in field ${i}`),c&&(p+=` in document ${o}`),p+=")"),new q(N.INVALID_ARGUMENT,h+n+p)}function Bm(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class $m{constructor(e,t,i,o,u){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=o,this._converter=u}get id(){return this._key.path.lastSegment()}get ref(){return new wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new YR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(qm("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class YR extends $m{data(){return super.data()}}function qm(n,e){return typeof e=="string"?Ul(n,e):e instanceof la?e._internalPath:e._delegate._internalPath}/**
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
 */class XR{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Wm extends $m{constructor(e,t,i,o,u,c){super(e,t,i,o,c),this._firestore=e,this._firestoreImpl=e,this.metadata=u}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new QR(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(qm("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}}class QR extends Wm{data(e={}){return super.data(e)}}/**
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
 */class ZR{convertValue(e,t="none"){switch(Xn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw J()}}convertObject(e,t){const i={};return Yn(e.fields,(o,u)=>{i[o]=this.convertValue(u,t)}),i}convertGeoPoint(e){return new Ll(Se(e.latitude),Se(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":const i=vg(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Hi(e));default:return null}}convertTimestamp(e){const t=En(e);return new vt(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=Ee.fromString(e);fe(nm(i));const o=new rs(i.get(1),i.get(3)),u=new G(i.popFirst(5));return o.isEqual(t)||_n(`Document ${u} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),u}}/**
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
 */function eN(n,e,t){let i;return i=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,i}/**
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
 */function qD(n){n=Wr(n,wt);const e=Wr(n.firestore,ca);return FR(Lm(e),n._key).then(t=>nN(e,n,t))}class tN extends ZR{constructor(e){super(),this.firestore=e}convertBytes(e){return new Hr(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new wt(this.firestore,null,t)}}function WD(n,e,t){n=Wr(n,wt);const i=Wr(n.firestore,ca),o=eN(n.converter,e,t);return Hm(i,[KR(Um(i),"setDoc",n._key,o,n.converter!==null,t).toMutation(n._key,Zn.none())])}function HD(n,e,t,...i){n=Wr(n,wt);const o=Wr(n.firestore,ca),u=Um(o);let c;return c=typeof(e=mt(e))=="string"||e instanceof la?jR(u,"updateDoc",n._key,e,t,i):zR(u,"updateDoc",n._key,e),Hm(o,[c.toMutation(n._key,Zn.exists(!0))])}function Hm(n,e){return function(t,i){const o=new wn;return t.asyncQueue.enqueueAndForget(async()=>wR(await MR(t),i,o)),o.promise}(Lm(n),e)}function nN(n,e,t){const i=t.docs.get(e._key),o=new tN(n);return new Wm(n,o,e._key,i,new XR(t.hasPendingWrites,t.fromCache),e.converter)}(function(n,e=!0){(function(t){Or=t})(Ii),Ti(new br("firestore",(t,{options:i})=>{const o=t.getProvider("app").getImmediate(),u=new ca(o,new lb(t.getProvider("auth-internal")),new pb(t.getProvider("app-check-internal")));return i=Object.assign({useFetchStreams:e},i),u._setSettings(i),u},"PUBLIC")),mn(hg,"3.4.4",n),mn(hg,"3.4.4","esm2017")})();/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function Fl(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,i=Object.getOwnPropertySymbols(n);o<i.length;o++)e.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(n,i[o])&&(t[i[o]]=n[i[o]]);return t}function Gm(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const rN=Gm,Km=new Ei("auth","Firebase",Gm());/**
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
 */const zm=new ec("@firebase/auth");function pa(n,...e){zm.logLevel<=oe.ERROR&&zm.error(`Auth (${Ii}): ${n}`,...e)}/**
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
 */function tn(n,...e){throw Vl(n,...e)}function Et(n,...e){return Vl(n,...e)}function iN(n,e,t){const i=Object.assign(Object.assign({},rN()),{[e]:t});return new Ei("auth","Firebase",i).create(e,{appName:n.name})}function Vl(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Km.create(n,...e)}function U(n,e,...t){if(!n)throw Vl(e,...t)}function nn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw pa(e),new Error(e)}function rn(n,e){n||nn(e)}/**
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
 */const jm=new Map;function sn(n){rn(n instanceof Function,"Expected a class definition");let e=jm.get(n);return e?(rn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,jm.set(n,e),e)}/**
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
 */function sN(n,e){const t=ic(n,"auth");if(t.isInitialized()){const o=t.getImmediate(),u=t.getOptions();if(fo(u,e!=null?e:{}))return o;tn(o,"already-initialized")}return t.initialize({options:e})}function oN(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(sn);(e==null?void 0:e.errorMap)&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}/**
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
 */function Bl(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Jm(){return Ym()==="http:"||Ym()==="https:"}function Ym(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function aN(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Jm()||Wd()||"connection"in navigator)?navigator.onLine:!0}function uN(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ss{constructor(e,t){this.shortDelay=e,this.longDelay=t,rn(t>e,"Short delay should be less than long delay!"),this.isMobile=qd()||Hd()}get(){return aN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function $l(n,e){rn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Xm{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;nn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;nn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;nn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const cN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
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
 */const lN=new ss(3e4,6e4);function ir(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function In(n,e,t,i,o={}){return Qm(n,o,async()=>{let u={},c={};i&&(e==="GET"?c=i:u={body:JSON.stringify(i)});const h=Sr(Object.assign({key:n.config.apiKey},c)).slice(1),p=await n._getAdditionalHeaders();return p["Content-Type"]="application/json",n.languageCode&&(p["X-Firebase-Locale"]=n.languageCode),Xm.fetch()(Zm(n,n.config.apiHost,t,h),Object.assign({method:e,headers:p,referrerPolicy:"no-referrer"},u))})}async function Qm(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},cN),e);try{const o=new hN(n),u=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const c=await u.json();if("needConfirmation"in c)throw ma(n,"account-exists-with-different-credential",c);if(u.ok&&!("errorMessage"in c))return c;{const h=u.ok?c.errorMessage:c.error.message,[p,m]=h.split(" : ");if(p==="FEDERATED_USER_ID_ALREADY_LINKED")throw ma(n,"credential-already-in-use",c);if(p==="EMAIL_EXISTS")throw ma(n,"email-already-in-use",c);const _=i[p]||p.toLowerCase().replace(/[_\s]+/g,"-");if(m)throw iN(n,_,m);tn(n,_)}}catch(o){if(o instanceof qn)throw o;tn(n,"network-request-failed")}}async function ga(n,e,t,i,o={}){const u=await In(n,e,t,i,o);return"mfaPendingCredential"in u&&tn(n,"multi-factor-auth-required",{_serverResponse:u}),u}function Zm(n,e,t,i){const o=`${e}${t}?${i}`;return n.config.emulator?$l(n.config,o):`${n.config.apiScheme}://${o}`}class hN{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Et(this.auth,"network-request-failed")),lN.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ma(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const o=Et(n,e,i);return o.customData._tokenResponse=t,o}/**
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
 */async function fN(n,e){return In(n,"POST","/v1/accounts:delete",e)}async function dN(n,e){return In(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function os(n){if(!!n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function pN(n,e=!1){const t=mt(n),i=await t.getIdToken(e),o=Wl(i);U(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const u=typeof o.firebase=="object"?o.firebase:void 0,c=u==null?void 0:u.sign_in_provider;return{claims:o,token:i,authTime:os(ql(o.auth_time)),issuedAtTime:os(ql(o.iat)),expirationTime:os(ql(o.exp)),signInProvider:c||null,signInSecondFactor:(u==null?void 0:u.sign_in_second_factor)||null}}function ql(n){return Number(n)*1e3}function Wl(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return pa("JWT malformed, contained fewer than 3 sections"),null;try{const o=n1(t);return o?JSON.parse(o):(pa("Failed to decode base64 JWT payload"),null)}catch(o){return pa("Caught error parsing JWT payload as JSON",o),null}}function gN(n){const e=Wl(n);return U(e,"internal-error"),U(typeof e.exp!="undefined","internal-error"),U(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function as(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof qn&&mN(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function mN({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class yN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const o=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ey{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=os(this.lastLoginAt),this.creationTime=os(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ya(n){var e;const t=n.auth,i=await n.getIdToken(),o=await as(n,dN(t,{idToken:i}));U(o==null?void 0:o.users.length,t,"internal-error");const u=o.users[0];n._notifyReloadListener(u);const c=((e=u.providerUserInfo)===null||e===void 0?void 0:e.length)?wN(u.providerUserInfo):[],h=_N(n.providerData,c),p=n.isAnonymous,m=!(n.email&&u.passwordHash)&&!(h==null?void 0:h.length),_=p?m:!1,T={uid:u.localId,displayName:u.displayName||null,photoURL:u.photoUrl||null,email:u.email||null,emailVerified:u.emailVerified||!1,phoneNumber:u.phoneNumber||null,tenantId:u.tenantId||null,providerData:h,metadata:new ey(u.createdAt,u.lastLoginAt),isAnonymous:_};Object.assign(n,T)}async function vN(n){const e=mt(n);await ya(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _N(n,e){return[...n.filter(i=>!e.some(o=>o.providerId===i.providerId)),...e]}function wN(n){return n.map(e=>{var{providerId:t}=e,i=Fl(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function EN(n,e){const t=await Qm(n,{},async()=>{const i=Sr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:u}=n.config,c=Zm(n,o,"/v1/token",`key=${u}`),h=await n._getAdditionalHeaders();return h["Content-Type"]="application/x-www-form-urlencoded",Xm.fetch()(c,{method:"POST",headers:h,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}/**
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
 */class us{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken!="undefined","internal-error"),U(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):gN(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return U(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:o,expiresIn:u}=await EN(e,t);this.updateTokensAndExpiration(i,o,Number(u))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:o,expirationTime:u}=t,c=new us;return i&&(U(typeof i=="string","internal-error",{appName:e}),c.refreshToken=i),o&&(U(typeof o=="string","internal-error",{appName:e}),c.accessToken=o),u&&(U(typeof u=="number","internal-error",{appName:e}),c.expirationTime=u),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new us,this.toJSON())}_performRefresh(){return nn("not implemented")}}/**
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
 */function An(n,e){U(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class sr{constructor(e){var{uid:t,auth:i,stsTokenManager:o}=e,u=Fl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new yN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=u.displayName||null,this.email=u.email||null,this.emailVerified=u.emailVerified||!1,this.phoneNumber=u.phoneNumber||null,this.photoURL=u.photoURL||null,this.isAnonymous=u.isAnonymous||!1,this.tenantId=u.tenantId||null,this.metadata=new ey(u.createdAt||void 0,u.lastLoginAt||void 0)}async getIdToken(e){const t=await as(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return pN(this,e)}reload(){return vN(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new sr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await ya(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await as(this,fN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,o,u,c,h,p,m,_;const T=(i=t.displayName)!==null&&i!==void 0?i:void 0,C=(o=t.email)!==null&&o!==void 0?o:void 0,k=(u=t.phoneNumber)!==null&&u!==void 0?u:void 0,x=(c=t.photoURL)!==null&&c!==void 0?c:void 0,ee=(h=t.tenantId)!==null&&h!==void 0?h:void 0,te=(p=t._redirectEventId)!==null&&p!==void 0?p:void 0,Te=(m=t.createdAt)!==null&&m!==void 0?m:void 0,je=(_=t.lastLoginAt)!==null&&_!==void 0?_:void 0,{uid:Ie,emailVerified:Je,isAnonymous:qe,providerData:Tt,stsTokenManager:Ye}=t;U(Ie&&Ye,e,"internal-error");const Nn=us.fromJSON(this.name,Ye);U(typeof Ie=="string",e,"internal-error"),An(T,e.name),An(C,e.name),U(typeof Je=="boolean",e,"internal-error"),U(typeof qe=="boolean",e,"internal-error"),An(k,e.name),An(x,e.name),An(ee,e.name),An(te,e.name),An(Te,e.name),An(je,e.name);const kn=new sr({uid:Ie,auth:e,email:C,emailVerified:Je,displayName:T,isAnonymous:qe,photoURL:x,phoneNumber:k,tenantId:ee,stsTokenManager:Nn,createdAt:Te,lastLoginAt:je});return Tt&&Array.isArray(Tt)&&(kn.providerData=Tt.map(Ca=>Object.assign({},Ca))),te&&(kn._redirectEventId=te),kn}static async _fromIdTokenResponse(e,t,i=!1){const o=new us;o.updateFromServerResponse(t);const u=new sr({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:i});return await ya(u),u}}/**
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
 */class ty{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ty.type="NONE";const ny=ty;/**
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
 */function va(n,e,t){return`firebase:${n}:${e}:${t}`}class Gr{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:o,name:u}=this.auth;this.fullUserKey=va(this.userKey,o.apiKey,u),this.fullPersistenceKey=va("persistence",o.apiKey,u),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?sr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Gr(sn(ny),e,i);const o=(await Promise.all(t.map(async m=>{if(await m._isAvailable())return m}))).filter(m=>m);let u=o[0]||sn(ny);const c=va(i,e.config.apiKey,e.name);let h=null;for(const m of t)try{const _=await m._get(c);if(_){const T=sr._fromJSON(e,_);m!==u&&(h=T),u=m;break}}catch{}const p=o.filter(m=>m._shouldAllowMigration);return!u._shouldAllowMigration||!p.length?new Gr(u,e,i):(u=p[0],h&&await u._set(c,h.toJSON()),await Promise.all(t.map(async m=>{if(m!==u)try{await m._remove(c)}catch{}})),new Gr(u,e,i))}}/**
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
 */function ry(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(oy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(iy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(uy(e))return"Blackberry";if(cy(e))return"Webos";if(Hl(e))return"Safari";if((e.includes("chrome/")||sy(e))&&!e.includes("edge/"))return"Chrome";if(ay(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function iy(n=De()){return/firefox\//i.test(n)}function Hl(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sy(n=De()){return/crios\//i.test(n)}function oy(n=De()){return/iemobile/i.test(n)}function ay(n=De()){return/android/i.test(n)}function uy(n=De()){return/blackberry/i.test(n)}function cy(n=De()){return/webos/i.test(n)}function _a(n=De()){return/iphone|ipad|ipod/i.test(n)}function TN(n=De()){var e;return _a(n)&&!!((e=window.navigator)===null||e===void 0?void 0:e.standalone)}function IN(){return Gd()&&document.documentMode===10}function ly(n=De()){return _a(n)||ay(n)||cy(n)||uy(n)||/windows phone/i.test(n)||oy(n)}function AN(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function hy(n,e=[]){let t;switch(n){case"Browser":t=ry(De());break;case"Worker":t=`${ry(De())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ii}/${i}`}/**
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
 */class SN{constructor(e,t){this.app=e,this.config=t,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fy(this),this.idTokenSubscription=new fy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Km,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=t.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=sn(t)),this._initializationPromise=this.queue(async()=>{var i,o;if(!this._deleted&&(this.persistenceManager=await Gr.create(this,e),!this._deleted)){if((i=this._popupRedirectResolver)===null||i===void 0?void 0:i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e)}}async initializeCurrentUser(e){var t;let i=await this.assertedPersistence.getCurrentUser();if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===u)&&(c==null?void 0:c.user)&&(i=c.user)}return i?i._redirectEventId?(U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)):this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ya(e)}catch(t){if(t.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=uN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?mt(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(sn(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ei("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&sn(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await Gr.create(this,[sn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,o){if(this._deleted)return()=>{};const u=typeof t=="function"?t:t.next.bind(t),c=this._isInitialized?Promise.resolve():this._initializationPromise;return U(c,this,"internal-error"),c.then(()=>u(this.currentUser)),typeof t=="function"?e.addObserver(t,i,o):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=hy(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};return this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId),e}}function cs(n){return mt(n)}class fy{constructor(e){this.auth=e,this.observer=null,this.addObserver=l1(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */class Gl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return nn("not implemented")}_getIdTokenResponse(e){return nn("not implemented")}_linkToIdToken(e,t){return nn("not implemented")}_getReauthenticationResolver(e){return nn("not implemented")}}/**
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
 */async function Kr(n,e){return ga(n,"POST","/v1/accounts:signInWithIdp",ir(n,e))}/**
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
 */const bN="http://localhost";class or extends Gl{constructor(){super(...arguments);this.pendingToken=null}static _fromParams(e){const t=new or(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):tn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:o}=t,u=Fl(t,["providerId","signInMethod"]);if(!i||!o)return null;const c=new or(i,o);return c.idToken=u.idToken||void 0,c.accessToken=u.accessToken||void 0,c.secret=u.secret,c.nonce=u.nonce,c.pendingToken=u.pendingToken||null,c}_getIdTokenResponse(e){const t=this.buildRequest();return Kr(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Kr(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Kr(e,t)}buildRequest(){const e={requestUri:bN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Sr(t)}return e}}/**
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
 */async function CN(n,e){return In(n,"POST","/v1/accounts:sendVerificationCode",ir(n,e))}async function RN(n,e){return ga(n,"POST","/v1/accounts:signInWithPhoneNumber",ir(n,e))}async function NN(n,e){const t=await ga(n,"POST","/v1/accounts:signInWithPhoneNumber",ir(n,e));if(t.temporaryProof)throw ma(n,"account-exists-with-different-credential",t);return t}const kN={USER_NOT_FOUND:"user-not-found"};async function DN(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return ga(n,"POST","/v1/accounts:signInWithPhoneNumber",ir(n,t),kN)}/**
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
 */class ls extends Gl{constructor(e){super("phone","phone");this.params=e}static _fromVerification(e,t){return new ls({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ls({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return RN(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return NN(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return DN(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:i,verificationCode:o}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:i,code:o}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:i,phoneNumber:o,temporaryProof:u}=e;return!i&&!t&&!o&&!u?null:new ls({verificationId:t,verificationCode:i,phoneNumber:o,temporaryProof:u})}}/**
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
 */class dy{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class hs extends dy{constructor(){super(...arguments);this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Sn extends hs{constructor(){super("facebook.com")}static credential(e){return or._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Sn.credential(e.oauthAccessToken)}catch{return null}}}Sn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Sn.PROVIDER_ID="facebook.com";/**
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
 */class bn extends hs{constructor(){super("google.com");this.addScope("profile")}static credential(e,t){return or._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return bn.credential(t,i)}catch{return null}}}bn.GOOGLE_SIGN_IN_METHOD="google.com";bn.PROVIDER_ID="google.com";/**
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
 */class Cn extends hs{constructor(){super("github.com")}static credential(e){return or._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Cn.credential(e.oauthAccessToken)}catch{return null}}}Cn.GITHUB_SIGN_IN_METHOD="github.com";Cn.PROVIDER_ID="github.com";/**
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
 */class Rn extends hs{constructor(){super("twitter.com")}static credential(e,t){return or._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Rn.credential(t,i)}catch{return null}}}Rn.TWITTER_SIGN_IN_METHOD="twitter.com";Rn.PROVIDER_ID="twitter.com";/**
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
 */class zr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,o=!1){const u=await sr._fromIdTokenResponse(e,i,o),c=py(i);return new zr({user:u,providerId:c,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const o=py(i);return new zr({user:e,providerId:o,_tokenResponse:i,operationType:t})}}function py(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class wa extends qn{constructor(e,t,i,o){var u;super(t.code,t.message);this.operationType=i,this.user=o,Object.setPrototypeOf(this,wa.prototype),this.customData={appName:e.name,tenantId:(u=e.tenantId)!==null&&u!==void 0?u:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,o){return new wa(e,t,i,o)}}function gy(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(u=>{throw u.code==="auth/multi-factor-auth-required"?wa._fromErrorAndOperation(n,u,e,i):u})}async function ON(n,e,t=!1){const i=await as(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return zr._forOperation(n,"link",i)}/**
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
 */async function LN(n,e,t=!1){const{auth:i}=n,o="reauthenticate";try{const u=await as(n,gy(i,o,e,n),t);U(u.idToken,i,"internal-error");const c=Wl(u.idToken);U(c,i,"internal-error");const{sub:h}=c;return U(n.uid===h,i,"user-mismatch"),zr._forOperation(n,o,u)}catch(u){throw(u==null?void 0:u.code)==="auth/user-not-found"&&tn(i,"user-mismatch"),u}}/**
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
 */async function my(n,e,t=!1){const i="signIn",o=await gy(n,i,e),u=await zr._fromIdTokenResponse(n,i,o);return t||await n._updateCurrentUser(u.user),u}async function xN(n,e){return my(cs(n),e)}function GD(n,e,t,i){return mt(n).onAuthStateChanged(e,t,i)}/**
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
 */function PN(n,e){return In(n,"POST","/v2/accounts/mfaEnrollment:start",ir(n,e))}const Ea="__sak";/**
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
 */class yy{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ea,"1"),this.storage.removeItem(Ea),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function MN(){const n=De();return Hl(n)||_a(n)}const UN=1e3,FN=10;class vy extends yy{constructor(){super(()=>window.localStorage,"LOCAL");this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=MN()&&AN(),this.fallbackToPolling=ly(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),o=this.localCache[t];i!==o&&e(t,o,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((c,h,p)=>{this.notifyListeners(c,p)});return}const i=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const c=this.storage.getItem(i);if(e.newValue!==c)e.newValue!==null?this.storage.setItem(i,e.newValue):this.storage.removeItem(i);else if(this.localCache[i]===e.newValue&&!t)return}const o=()=>{const c=this.storage.getItem(i);!t&&this.localCache[i]===c||this.notifyListeners(i,c)},u=this.storage.getItem(i);IN()&&u!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,FN):o()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const o of Array.from(i))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},UN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}vy.type="LOCAL";const VN=vy;/**
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
 */class _y extends yy{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}_y.type="SESSION";const wy=_y;/**
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
 */function BN(n){return Promise.all(n.map(async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ta{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const i=new Ta(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:o,data:u}=t.data,c=this.handlersMap[o];if(!(c==null?void 0:c.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:o});const h=Array.from(c).map(async m=>m(t.origin,u)),p=await BN(h);t.ports[0].postMessage({status:"done",eventId:i,eventType:o,response:p})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ta.receivers=[];/**
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
 */function Kl(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class $N{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const o=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let u,c;return new Promise((h,p)=>{const m=Kl("",20);o.port1.start();const _=setTimeout(()=>{p(new Error("unsupported_event"))},i);c={messageChannel:o,onMessage(T){const C=T;if(C.data.eventId===m)switch(C.data.status){case"ack":clearTimeout(_),u=setTimeout(()=>{p(new Error("timeout"))},3e3);break;case"done":clearTimeout(u),h(C.data.response);break;default:clearTimeout(_),clearTimeout(u),p(new Error("invalid_response"));break}}},this.handlers.add(c),o.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:m,data:t},[o.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
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
 */function Ne(){return window}function qN(n){Ne().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function zl(){return typeof Ne().WorkerGlobalScope!="undefined"&&typeof Ne().importScripts=="function"}async function WN(){if(!(navigator==null?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function HN(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function GN(){return zl()?self:null}/**
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
 */const Ey="firebaseLocalStorageDb",KN=1,Ia="firebaseLocalStorage",Ty="fbase_key";class fs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Aa(n,e){return n.transaction([Ia],e?"readwrite":"readonly").objectStore(Ia)}function zN(){const n=indexedDB.deleteDatabase(Ey);return new fs(n).toPromise()}function jl(){const n=indexedDB.open(Ey,KN);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ia,{keyPath:Ty})}catch(o){t(o)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ia)?e(i):(i.close(),await zN(),e(await jl()))})})}async function Iy(n,e,t){const i=Aa(n,!0).put({[Ty]:e,value:t});return new fs(i).toPromise()}async function jN(n,e){const t=Aa(n,!1).get(e),i=await new fs(t).toPromise();return i===void 0?null:i.value}function Ay(n,e){const t=Aa(n,!0).delete(e);return new fs(t).toPromise()}const JN=800,YN=3;class Sy{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await jl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>YN)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ta._getInstance(GN()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await WN(),!this.activeServiceWorker)return;this.sender=new $N(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);!i||((e=i[0])===null||e===void 0?void 0:e.fulfilled)&&((t=i[0])===null||t===void 0?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||HN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await jl();return await Iy(e,Ea,"1"),await Ay(e,Ea),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Iy(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>jN(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ay(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const u=Aa(o,!1).getAll();return new fs(u).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;for(const{fbase_key:o,value:u}of e)i.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(u)&&(this.notifyListeners(o,u),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!i.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const o of Array.from(i))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),JN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Sy.type="LOCAL";const XN=Sy;/**
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
 */function QN(n,e){return In(n,"POST","/v2/accounts/mfaSignIn:start",ir(n,e))}/**
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
 */async function ZN(n){return(await In(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}/**
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
 */function ek(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function by(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=o=>{const u=Et("internal-error");u.customData=o,t(u)},i.type="text/javascript",i.charset="UTF-8",ek().appendChild(i)})}function Cy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const tk=500,nk=6e4,Sa=1e12;class rk{constructor(e){this.auth=e,this.counter=Sa,this._widgets=new Map}render(e,t){const i=this.counter;return this._widgets.set(i,new ik(e,this.auth.name,t||{})),this.counter++,i}reset(e){var t;const i=e||Sa;(t=this._widgets.get(i))===null||t===void 0||t.delete(),this._widgets.delete(i)}getResponse(e){var t;const i=e||Sa;return((t=this._widgets.get(i))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const i=e||Sa;return(t=this._widgets.get(i))===null||t===void 0||t.execute(),""}}class ik{constructor(e,t,i){this.params=i,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const o=typeof e=="string"?document.getElementById(e):e;U(o,"argument-error",{appName:t}),this.container=o,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=sk(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},nk)},tk))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function sk(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let i=0;i<n;i++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
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
 */const Jl=Cy("rcb"),ok=new ss(3e4,6e4),ak="https://www.google.com/recaptcha/api.js?";class uk{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!Ne().grecaptcha}load(e,t=""){return U(ck(t),e,"argument-error"),this.shouldResolveImmediately(t)?Promise.resolve(Ne().grecaptcha):new Promise((i,o)=>{const u=Ne().setTimeout(()=>{o(Et(e,"network-request-failed"))},ok.get());Ne()[Jl]=()=>{Ne().clearTimeout(u),delete Ne()[Jl];const h=Ne().grecaptcha;if(!h){o(Et(e,"internal-error"));return}const p=h.render;h.render=(m,_)=>{const T=p(m,_);return this.counter++,T},this.hostLanguage=t,i(h)};const c=`${ak}?${Sr({onload:Jl,render:"explicit",hl:t})}`;by(c).catch(()=>{clearTimeout(u),o(Et(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!Ne().grecaptcha&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function ck(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class lk{async load(e){return new rk(e)}clearedOneInstance(){}}/**
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
 */const Ry="recaptcha",hk={theme:"light",type:"image"};class KD{constructor(e,t=Object.assign({},hk),i){this.parameters=t,this.type=Ry,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=cs(i),this.isInvisible=this.parameters.size==="invisible",U(typeof document!="undefined",this.auth,"operation-not-supported-in-this-environment");const o=typeof e=="string"?document.getElementById(e):e;U(o,this.auth,"argument-error"),this.container=o,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new lk:new uk,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),i=t.getResponse(e);return i||new Promise(o=>{const u=c=>{!c||(this.tokenChangeListeners.delete(u),o(c))};this.tokenChangeListeners.add(u),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){U(!this.parameters.sitekey,this.auth,"argument-error"),U(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),U(typeof document!="undefined",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(i=>i(t)),typeof e=="function")e(t);else if(typeof e=="string"){const i=Ne()[e];typeof i=="function"&&i(t)}}}assertNotDestroyed(){U(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){U(Jm()&&!zl(),this.auth,"internal-error"),await fk(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await ZN(this.auth);U(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return U(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function fk(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class dk{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=ls._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function zD(n,e,t){const i=cs(n),o=await pk(i,e,mt(t));return new dk(o,u=>xN(i,u))}async function pk(n,e,t){var i;const o=await t.verify();try{U(typeof o=="string",n,"argument-error"),U(t.type===Ry,n,"argument-error");let u;if(typeof e=="string"?u={phoneNumber:e}:u=e,"session"in u){const c=u.session;if("phoneNumber"in u)return U(c.type==="enroll",n,"internal-error"),(await PN(n,{idToken:c.credential,phoneEnrollmentInfo:{phoneNumber:u.phoneNumber,recaptchaToken:o}})).phoneSessionInfo.sessionInfo;{U(c.type==="signin",n,"internal-error");const h=((i=u.multiFactorHint)===null||i===void 0?void 0:i.uid)||u.multiFactorUid;return U(h,n,"missing-multi-factor-info"),(await QN(n,{mfaPendingCredential:c.credential,mfaEnrollmentId:h,phoneSignInInfo:{recaptchaToken:o}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:c}=await CN(n,{phoneNumber:u.phoneNumber,recaptchaToken:o});return c}}finally{t._reset()}}/**
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
 */function gk(n,e){return e?sn(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Yl extends Gl{constructor(e){super("custom","custom");this.params=e}_getIdTokenResponse(e){return Kr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Kr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Kr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function mk(n){return my(n.auth,new Yl(n),n.bypassAuthState)}function yk(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),LN(t,new Yl(n),n.bypassAuthState)}async function vk(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),ON(t,new Yl(n),n.bypassAuthState)}/**
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
 */class Ny{constructor(e,t,i,o,u=!1){this.auth=e,this.resolver=i,this.user=o,this.bypassAuthState=u,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:o,tenantId:u,error:c,type:h}=e;if(c){this.reject(c);return}const p={auth:this.auth,requestUri:t,sessionId:i,tenantId:u||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(p))}catch(m){this.reject(m)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mk;case"linkViaPopup":case"linkViaRedirect":return vk;case"reauthViaPopup":case"reauthViaRedirect":return yk;default:tn(this.auth,"internal-error")}}resolve(e){rn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){rn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const _k=new ss(2e3,1e4);class jr extends Ny{constructor(e,t,i,o,u){super(e,t,o,u);this.provider=i,this.authWindow=null,this.pollId=null,jr.currentPopupAction&&jr.currentPopupAction.cancel(),jr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){rn(this.filter.length===1,"Popup operations only handle one event");const e=Kl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Et(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Et(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,jr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0?void 0:i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Et(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,_k.get())};e()}}jr.currentPopupAction=null;/**
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
 */const wk="pendingRedirect",Xl=new Map;class Ek extends Ny{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i);this.eventId=null}async execute(){let e=Xl.get(this.auth._key());if(!e){try{const i=await Tk(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Xl.set(this.auth._key(),e)}return this.bypassAuthState||Xl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Tk(n,e){const t=Ak(e),i=Ik(n);if(!await i._isAvailable())return!1;const o=await i._get(t)==="true";return await i._remove(t),o}function Ik(n){return sn(n._redirectPersistence)}function Ak(n){return va(wk,n.config.apiKey,n.name)}async function Sk(n,e,t=!1){const i=cs(n),o=gk(i,e),c=await new Ek(i,o,t).execute();return c&&!t&&(delete c.user._redirectEventId,await i._persistUserIfCurrent(c.user),await i._setRedirectUser(null,e)),c}/**
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
 */const bk=10*60*1e3;class Ck{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Rk(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Dy(e)){const o=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Et(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bk&&this.cachedEventUids.clear(),this.cachedEventUids.has(ky(e))}saveEventToCache(e){this.cachedEventUids.add(ky(e)),this.lastProcessedEventTime=Date.now()}}function ky(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Dy({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Rk(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Dy(n);default:return!1}}/**
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
 */async function Nk(n,e={}){return In(n,"GET","/v1/projects",e)}/**
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
 */const kk=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dk=/^https?/;async function Ok(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Nk(n);for(const t of e)try{if(Lk(t))return}catch{}tn(n,"unauthorized-domain")}function Lk(n){const e=Bl(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const c=new URL(n);return c.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&c.hostname===i}if(!Dk.test(t))return!1;if(kk.test(n))return i===n;const o=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const xk=new ss(3e4,6e4);function Oy(){const n=Ne().___jsl;if(n==null?void 0:n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Pk(n){return new Promise((e,t)=>{var i,o,u;function c(){Oy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Oy(),t(Et(n,"network-request-failed"))},timeout:xk.get()})}if((o=(i=Ne().gapi)===null||i===void 0?void 0:i.iframes)===null||o===void 0?void 0:o.Iframe)e(gapi.iframes.getContext());else if((u=Ne().gapi)===null||u===void 0?void 0:u.load)c();else{const h=Cy("iframefcb");return Ne()[h]=()=>{gapi.load?c():t(Et(n,"network-request-failed"))},by(`https://apis.google.com/js/api.js?onload=${h}`).catch(p=>t(p))}}).catch(e=>{throw ba=null,e})}let ba=null;function Mk(n){return ba=ba||Pk(n),ba}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Uk=new ss(5e3,15e3),Fk="__/auth/iframe",Vk="emulator/auth/iframe",Bk={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$k=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function qk(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?$l(e,Vk):`https://${n.config.authDomain}/${Fk}`,i={apiKey:e.apiKey,appName:n.name,v:Ii},o=$k.get(n.config.apiHost);o&&(i.eid=o);const u=n._getFrameworks();return u.length&&(i.fw=u.join(",")),`${t}?${Sr(i).slice(1)}`}async function Wk(n){const e=await Mk(n),t=Ne().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:qk(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Bk,dontclear:!0},i=>new Promise(async(o,u)=>{await i.restyle({setHideOnLeave:!1});const c=Et(n,"network-request-failed"),h=Ne().setTimeout(()=>{u(c)},Uk.get());function p(){Ne().clearTimeout(h),o(i)}i.ping(p).then(p,()=>{u(c)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Hk={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Gk=500,Kk=600,zk="_blank",jk="http://localhost";class Ly{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jk(n,e,t,i=Gk,o=Kk){const u=Math.max((window.screen.availHeight-o)/2,0).toString(),c=Math.max((window.screen.availWidth-i)/2,0).toString();let h="";const p=Object.assign(Object.assign({},Hk),{width:i.toString(),height:o.toString(),top:u,left:c}),m=De().toLowerCase();t&&(h=sy(m)?zk:t),iy(m)&&(e=e||jk,p.scrollbars="yes");const _=Object.entries(p).reduce((C,[k,x])=>`${C}${k}=${x},`,"");if(TN(m)&&h!=="_self")return Yk(e||"",h),new Ly(null);const T=window.open(e||"",h,_);U(T,n,"popup-blocked");try{T.focus()}catch{}return new Ly(T)}function Yk(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const Xk="__/auth/handler",Qk="emulator/auth/handler";function xy(n,e,t,i,o,u){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const c={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Ii,eventId:o};if(e instanceof dy){e.setDefaultLanguage(n.languageCode),c.providerId=e.providerId||"",c1(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries(u||{}))c[p]=m}if(e instanceof hs){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(c.scopes=p.join(","))}n.tenantId&&(c.tid=n.tenantId);const h=c;for(const p of Object.keys(h))h[p]===void 0&&delete h[p];return`${Zk(n)}?${Sr(h).slice(1)}`}function Zk({config:n}){return n.emulator?$l(n,Qk):`https://${n.authDomain}/${Xk}`}/**
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
 */const Ql="webStorageSupport";class eD{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=wy,this._completeRedirectFn=Sk}async _openPopup(e,t,i,o){var u;rn((u=this.eventManagers[e._key()])===null||u===void 0?void 0:u.manager,"_initialize() not called before _openPopup()");const c=xy(e,t,i,Bl(),o);return Jk(e,c,Kl())}async _openRedirect(e,t,i,o){return await this._originValidation(e),qN(xy(e,t,i,Bl(),o)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:u}=this.eventManagers[t];return o?Promise.resolve(o):(rn(u,"If manager is not set, promise should be"),u)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Wk(e),i=new Ck(e);return t.register("authEvent",o=>(U(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:i.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ql,{type:Ql},o=>{var u;const c=(u=o==null?void 0:o[0])===null||u===void 0?void 0:u[Ql];c!==void 0&&t(!!c),tn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ok(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ly()||Hl()||_a()}}const tD=eD;var Py="@firebase/auth",My="0.19.7";/**
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
 */class nD{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{var o;e(((o=i)===null||o===void 0?void 0:o.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);!t||(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function rD(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function iD(n){Ti(new br("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),{apiKey:o,authDomain:u}=i.options;return(c=>{U(o&&!o.includes(":"),"invalid-api-key",{appName:c.name}),U(!(u==null?void 0:u.includes(":")),"argument-error",{appName:c.name});const h={apiKey:o,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:hy(n)},p=new SN(c,h);return oN(p,t),p})(i)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Ti(new br("auth-internal",e=>{const t=cs(e.getProvider("auth").getImmediate());return(i=>new nD(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),mn(Py,My,rD(n)),mn(Py,My,"esm2017")}/**
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
 */function jD(n=Jd()){const e=ic(n,"auth");return e.isInitialized()?e.getImmediate():sN(n,{popupRedirectResolver:tD,persistence:[XN,VN,wy]})}iD("Browser");var ds=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Zl={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */(function(n,e){(function(){var t,i="4.17.21",o=200,u="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",c="Expected a function",h="Invalid `variable` option passed into `_.template`",p="__lodash_hash_undefined__",m=500,_="__lodash_placeholder__",T=1,C=2,k=4,x=1,ee=2,te=1,Te=2,je=4,Ie=8,Je=16,qe=32,Tt=64,Ye=128,Nn=256,kn=512,Ca=30,Uy="...",Fy=800,Vy=16,eh=1,By=2,$y=3,Dn=1/0,on=9007199254740991,qy=17976931348623157e292,ps=0/0,Ut=4294967295,Wy=Ut-1,Hy=Ut>>>1,Gy=[["ary",Ye],["bind",te],["bindKey",Te],["curry",Ie],["curryRight",Je],["flip",kn],["partial",qe],["partialRight",Tt],["rearg",Nn]],ar="[object Arguments]",gs="[object Array]",Ky="[object AsyncFunction]",Jr="[object Boolean]",Yr="[object Date]",zy="[object DOMException]",ms="[object Error]",ys="[object Function]",th="[object GeneratorFunction]",Dt="[object Map]",Xr="[object Number]",jy="[object Null]",qt="[object Object]",nh="[object Promise]",Jy="[object Proxy]",Qr="[object RegExp]",Ot="[object Set]",Zr="[object String]",vs="[object Symbol]",Yy="[object Undefined]",ei="[object WeakMap]",Xy="[object WeakSet]",ti="[object ArrayBuffer]",ur="[object DataView]",Ra="[object Float32Array]",Na="[object Float64Array]",ka="[object Int8Array]",Da="[object Int16Array]",Oa="[object Int32Array]",La="[object Uint8Array]",xa="[object Uint8ClampedArray]",Pa="[object Uint16Array]",Ma="[object Uint32Array]",Qy=/\b__p \+= '';/g,Zy=/\b(__p \+=) '' \+/g,ev=/(__e\(.*?\)|\b__t\)) \+\n'';/g,rh=/&(?:amp|lt|gt|quot|#39);/g,ih=/[&<>"']/g,tv=RegExp(rh.source),nv=RegExp(ih.source),rv=/<%-([\s\S]+?)%>/g,iv=/<%([\s\S]+?)%>/g,sh=/<%=([\s\S]+?)%>/g,sv=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ov=/^\w*$/,av=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ua=/[\\^$.*+?()[\]{}|]/g,uv=RegExp(Ua.source),Fa=/^\s+/,cv=/\s/,lv=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,hv=/\{\n\/\* \[wrapped with (.+)\] \*/,fv=/,? & /,dv=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,pv=/[()=,{}\[\]\/\s]/,gv=/\\(\\)?/g,mv=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,oh=/\w*$/,yv=/^[-+]0x[0-9a-f]+$/i,vv=/^0b[01]+$/i,_v=/^\[object .+?Constructor\]$/,wv=/^0o[0-7]+$/i,Ev=/^(?:0|[1-9]\d*)$/,Tv=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,_s=/($^)/,Iv=/['\n\r\u2028\u2029\\]/g,ws="\\ud800-\\udfff",Av="\\u0300-\\u036f",Sv="\\ufe20-\\ufe2f",bv="\\u20d0-\\u20ff",ah=Av+Sv+bv,uh="\\u2700-\\u27bf",ch="a-z\\xdf-\\xf6\\xf8-\\xff",Cv="\\xac\\xb1\\xd7\\xf7",Rv="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",Nv="\\u2000-\\u206f",kv=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",lh="A-Z\\xc0-\\xd6\\xd8-\\xde",hh="\\ufe0e\\ufe0f",fh=Cv+Rv+Nv+kv,Va="['\u2019]",Dv="["+ws+"]",dh="["+fh+"]",Es="["+ah+"]",ph="\\d+",Ov="["+uh+"]",gh="["+ch+"]",mh="[^"+ws+fh+ph+uh+ch+lh+"]",Ba="\\ud83c[\\udffb-\\udfff]",Lv="(?:"+Es+"|"+Ba+")",yh="[^"+ws+"]",$a="(?:\\ud83c[\\udde6-\\uddff]){2}",qa="[\\ud800-\\udbff][\\udc00-\\udfff]",cr="["+lh+"]",vh="\\u200d",_h="(?:"+gh+"|"+mh+")",xv="(?:"+cr+"|"+mh+")",wh="(?:"+Va+"(?:d|ll|m|re|s|t|ve))?",Eh="(?:"+Va+"(?:D|LL|M|RE|S|T|VE))?",Th=Lv+"?",Ih="["+hh+"]?",Pv="(?:"+vh+"(?:"+[yh,$a,qa].join("|")+")"+Ih+Th+")*",Mv="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Uv="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Ah=Ih+Th+Pv,Fv="(?:"+[Ov,$a,qa].join("|")+")"+Ah,Vv="(?:"+[yh+Es+"?",Es,$a,qa,Dv].join("|")+")",Bv=RegExp(Va,"g"),$v=RegExp(Es,"g"),Wa=RegExp(Ba+"(?="+Ba+")|"+Vv+Ah,"g"),qv=RegExp([cr+"?"+gh+"+"+wh+"(?="+[dh,cr,"$"].join("|")+")",xv+"+"+Eh+"(?="+[dh,cr+_h,"$"].join("|")+")",cr+"?"+_h+"+"+wh,cr+"+"+Eh,Uv,Mv,ph,Fv].join("|"),"g"),Wv=RegExp("["+vh+ws+ah+hh+"]"),Hv=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Gv=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Kv=-1,de={};de[Ra]=de[Na]=de[ka]=de[Da]=de[Oa]=de[La]=de[xa]=de[Pa]=de[Ma]=!0,de[ar]=de[gs]=de[ti]=de[Jr]=de[ur]=de[Yr]=de[ms]=de[ys]=de[Dt]=de[Xr]=de[qt]=de[Qr]=de[Ot]=de[Zr]=de[ei]=!1;var he={};he[ar]=he[gs]=he[ti]=he[ur]=he[Jr]=he[Yr]=he[Ra]=he[Na]=he[ka]=he[Da]=he[Oa]=he[Dt]=he[Xr]=he[qt]=he[Qr]=he[Ot]=he[Zr]=he[vs]=he[La]=he[xa]=he[Pa]=he[Ma]=!0,he[ms]=he[ys]=he[ei]=!1;var zv={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},jv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jv={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Yv={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Xv=parseFloat,Qv=parseInt,Sh=typeof ds=="object"&&ds&&ds.Object===Object&&ds,Zv=typeof self=="object"&&self&&self.Object===Object&&self,xe=Sh||Zv||Function("return this")(),Ha=e&&!e.nodeType&&e,On=Ha&&!0&&n&&!n.nodeType&&n,bh=On&&On.exports===Ha,Ga=bh&&Sh.process,It=function(){try{var w=On&&On.require&&On.require("util").types;return w||Ga&&Ga.binding&&Ga.binding("util")}catch{}}(),Ch=It&&It.isArrayBuffer,Rh=It&&It.isDate,Nh=It&&It.isMap,kh=It&&It.isRegExp,Dh=It&&It.isSet,Oh=It&&It.isTypedArray;function lt(w,A,I){switch(I.length){case 0:return w.call(A);case 1:return w.call(A,I[0]);case 2:return w.call(A,I[0],I[1]);case 3:return w.call(A,I[0],I[1],I[2])}return w.apply(A,I)}function e_(w,A,I,L){for(var H=-1,se=w==null?0:w.length;++H<se;){var Ce=w[H];A(L,Ce,I(Ce),w)}return L}function At(w,A){for(var I=-1,L=w==null?0:w.length;++I<L&&A(w[I],I,w)!==!1;);return w}function t_(w,A){for(var I=w==null?0:w.length;I--&&A(w[I],I,w)!==!1;);return w}function Lh(w,A){for(var I=-1,L=w==null?0:w.length;++I<L;)if(!A(w[I],I,w))return!1;return!0}function an(w,A){for(var I=-1,L=w==null?0:w.length,H=0,se=[];++I<L;){var Ce=w[I];A(Ce,I,w)&&(se[H++]=Ce)}return se}function Ts(w,A){var I=w==null?0:w.length;return!!I&&lr(w,A,0)>-1}function Ka(w,A,I){for(var L=-1,H=w==null?0:w.length;++L<H;)if(I(A,w[L]))return!0;return!1}function ge(w,A){for(var I=-1,L=w==null?0:w.length,H=Array(L);++I<L;)H[I]=A(w[I],I,w);return H}function un(w,A){for(var I=-1,L=A.length,H=w.length;++I<L;)w[H+I]=A[I];return w}function za(w,A,I,L){var H=-1,se=w==null?0:w.length;for(L&&se&&(I=w[++H]);++H<se;)I=A(I,w[H],H,w);return I}function n_(w,A,I,L){var H=w==null?0:w.length;for(L&&H&&(I=w[--H]);H--;)I=A(I,w[H],H,w);return I}function ja(w,A){for(var I=-1,L=w==null?0:w.length;++I<L;)if(A(w[I],I,w))return!0;return!1}var r_=Ja("length");function i_(w){return w.split("")}function s_(w){return w.match(dv)||[]}function xh(w,A,I){var L;return I(w,function(H,se,Ce){if(A(H,se,Ce))return L=se,!1}),L}function Is(w,A,I,L){for(var H=w.length,se=I+(L?1:-1);L?se--:++se<H;)if(A(w[se],se,w))return se;return-1}function lr(w,A,I){return A===A?y_(w,A,I):Is(w,Ph,I)}function o_(w,A,I,L){for(var H=I-1,se=w.length;++H<se;)if(L(w[H],A))return H;return-1}function Ph(w){return w!==w}function Mh(w,A){var I=w==null?0:w.length;return I?Xa(w,A)/I:ps}function Ja(w){return function(A){return A==null?t:A[w]}}function Ya(w){return function(A){return w==null?t:w[A]}}function Uh(w,A,I,L,H){return H(w,function(se,Ce,le){I=L?(L=!1,se):A(I,se,Ce,le)}),I}function a_(w,A){var I=w.length;for(w.sort(A);I--;)w[I]=w[I].value;return w}function Xa(w,A){for(var I,L=-1,H=w.length;++L<H;){var se=A(w[L]);se!==t&&(I=I===t?se:I+se)}return I}function Qa(w,A){for(var I=-1,L=Array(w);++I<w;)L[I]=A(I);return L}function u_(w,A){return ge(A,function(I){return[I,w[I]]})}function Fh(w){return w&&w.slice(0,qh(w)+1).replace(Fa,"")}function ht(w){return function(A){return w(A)}}function Za(w,A){return ge(A,function(I){return w[I]})}function ni(w,A){return w.has(A)}function Vh(w,A){for(var I=-1,L=w.length;++I<L&&lr(A,w[I],0)>-1;);return I}function Bh(w,A){for(var I=w.length;I--&&lr(A,w[I],0)>-1;);return I}function c_(w,A){for(var I=w.length,L=0;I--;)w[I]===A&&++L;return L}var l_=Ya(zv),h_=Ya(jv);function f_(w){return"\\"+Yv[w]}function d_(w,A){return w==null?t:w[A]}function hr(w){return Wv.test(w)}function p_(w){return Hv.test(w)}function g_(w){for(var A,I=[];!(A=w.next()).done;)I.push(A.value);return I}function eu(w){var A=-1,I=Array(w.size);return w.forEach(function(L,H){I[++A]=[H,L]}),I}function $h(w,A){return function(I){return w(A(I))}}function cn(w,A){for(var I=-1,L=w.length,H=0,se=[];++I<L;){var Ce=w[I];(Ce===A||Ce===_)&&(w[I]=_,se[H++]=I)}return se}function As(w){var A=-1,I=Array(w.size);return w.forEach(function(L){I[++A]=L}),I}function m_(w){var A=-1,I=Array(w.size);return w.forEach(function(L){I[++A]=[L,L]}),I}function y_(w,A,I){for(var L=I-1,H=w.length;++L<H;)if(w[L]===A)return L;return-1}function v_(w,A,I){for(var L=I+1;L--;)if(w[L]===A)return L;return L}function fr(w){return hr(w)?w_(w):r_(w)}function Lt(w){return hr(w)?E_(w):i_(w)}function qh(w){for(var A=w.length;A--&&cv.test(w.charAt(A)););return A}var __=Ya(Jv);function w_(w){for(var A=Wa.lastIndex=0;Wa.test(w);)++A;return A}function E_(w){return w.match(Wa)||[]}function T_(w){return w.match(qv)||[]}var I_=function w(A){A=A==null?xe:dr.defaults(xe.Object(),A,dr.pick(xe,Gv));var I=A.Array,L=A.Date,H=A.Error,se=A.Function,Ce=A.Math,le=A.Object,tu=A.RegExp,A_=A.String,St=A.TypeError,Ss=I.prototype,S_=se.prototype,pr=le.prototype,bs=A["__core-js_shared__"],Cs=S_.toString,ue=pr.hasOwnProperty,b_=0,Wh=function(){var r=/[^.]+$/.exec(bs&&bs.keys&&bs.keys.IE_PROTO||"");return r?"Symbol(src)_1."+r:""}(),Rs=pr.toString,C_=Cs.call(le),R_=xe._,N_=tu("^"+Cs.call(ue).replace(Ua,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Ns=bh?A.Buffer:t,ln=A.Symbol,ks=A.Uint8Array,Hh=Ns?Ns.allocUnsafe:t,Ds=$h(le.getPrototypeOf,le),Gh=le.create,Kh=pr.propertyIsEnumerable,Os=Ss.splice,zh=ln?ln.isConcatSpreadable:t,ri=ln?ln.iterator:t,Ln=ln?ln.toStringTag:t,Ls=function(){try{var r=Fn(le,"defineProperty");return r({},"",{}),r}catch{}}(),k_=A.clearTimeout!==xe.clearTimeout&&A.clearTimeout,D_=L&&L.now!==xe.Date.now&&L.now,O_=A.setTimeout!==xe.setTimeout&&A.setTimeout,xs=Ce.ceil,Ps=Ce.floor,nu=le.getOwnPropertySymbols,L_=Ns?Ns.isBuffer:t,jh=A.isFinite,x_=Ss.join,P_=$h(le.keys,le),Re=Ce.max,We=Ce.min,M_=L.now,U_=A.parseInt,Jh=Ce.random,F_=Ss.reverse,ru=Fn(A,"DataView"),ii=Fn(A,"Map"),iu=Fn(A,"Promise"),gr=Fn(A,"Set"),si=Fn(A,"WeakMap"),oi=Fn(le,"create"),Ms=si&&new si,mr={},V_=Vn(ru),B_=Vn(ii),$_=Vn(iu),q_=Vn(gr),W_=Vn(si),Us=ln?ln.prototype:t,ai=Us?Us.valueOf:t,Yh=Us?Us.toString:t;function d(r){if(ve(r)&&!K(r)&&!(r instanceof Z)){if(r instanceof bt)return r;if(ue.call(r,"__wrapped__"))return Qf(r)}return new bt(r)}var yr=function(){function r(){}return function(s){if(!ye(s))return{};if(Gh)return Gh(s);r.prototype=s;var a=new r;return r.prototype=t,a}}();function Fs(){}function bt(r,s){this.__wrapped__=r,this.__actions__=[],this.__chain__=!!s,this.__index__=0,this.__values__=t}d.templateSettings={escape:rv,evaluate:iv,interpolate:sh,variable:"",imports:{_:d}},d.prototype=Fs.prototype,d.prototype.constructor=d,bt.prototype=yr(Fs.prototype),bt.prototype.constructor=bt;function Z(r){this.__wrapped__=r,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Ut,this.__views__=[]}function H_(){var r=new Z(this.__wrapped__);return r.__actions__=rt(this.__actions__),r.__dir__=this.__dir__,r.__filtered__=this.__filtered__,r.__iteratees__=rt(this.__iteratees__),r.__takeCount__=this.__takeCount__,r.__views__=rt(this.__views__),r}function G_(){if(this.__filtered__){var r=new Z(this);r.__dir__=-1,r.__filtered__=!0}else r=this.clone(),r.__dir__*=-1;return r}function K_(){var r=this.__wrapped__.value(),s=this.__dir__,a=K(r),l=s<0,f=a?r.length:0,g=iw(0,f,this.__views__),y=g.start,v=g.end,E=v-y,S=l?v:y-1,b=this.__iteratees__,R=b.length,D=0,M=We(E,this.__takeCount__);if(!a||!l&&f==E&&M==E)return Ef(r,this.__actions__);var B=[];e:for(;E--&&D<M;){S+=s;for(var Y=-1,$=r[S];++Y<R;){var Q=b[Y],ne=Q.iteratee,pt=Q.type,Ze=ne($);if(pt==By)$=Ze;else if(!Ze){if(pt==eh)continue e;break e}}B[D++]=$}return B}Z.prototype=yr(Fs.prototype),Z.prototype.constructor=Z;function xn(r){var s=-1,a=r==null?0:r.length;for(this.clear();++s<a;){var l=r[s];this.set(l[0],l[1])}}function z_(){this.__data__=oi?oi(null):{},this.size=0}function j_(r){var s=this.has(r)&&delete this.__data__[r];return this.size-=s?1:0,s}function J_(r){var s=this.__data__;if(oi){var a=s[r];return a===p?t:a}return ue.call(s,r)?s[r]:t}function Y_(r){var s=this.__data__;return oi?s[r]!==t:ue.call(s,r)}function X_(r,s){var a=this.__data__;return this.size+=this.has(r)?0:1,a[r]=oi&&s===t?p:s,this}xn.prototype.clear=z_,xn.prototype.delete=j_,xn.prototype.get=J_,xn.prototype.has=Y_,xn.prototype.set=X_;function Wt(r){var s=-1,a=r==null?0:r.length;for(this.clear();++s<a;){var l=r[s];this.set(l[0],l[1])}}function Q_(){this.__data__=[],this.size=0}function Z_(r){var s=this.__data__,a=Vs(s,r);if(a<0)return!1;var l=s.length-1;return a==l?s.pop():Os.call(s,a,1),--this.size,!0}function e0(r){var s=this.__data__,a=Vs(s,r);return a<0?t:s[a][1]}function t0(r){return Vs(this.__data__,r)>-1}function n0(r,s){var a=this.__data__,l=Vs(a,r);return l<0?(++this.size,a.push([r,s])):a[l][1]=s,this}Wt.prototype.clear=Q_,Wt.prototype.delete=Z_,Wt.prototype.get=e0,Wt.prototype.has=t0,Wt.prototype.set=n0;function Ht(r){var s=-1,a=r==null?0:r.length;for(this.clear();++s<a;){var l=r[s];this.set(l[0],l[1])}}function r0(){this.size=0,this.__data__={hash:new xn,map:new(ii||Wt),string:new xn}}function i0(r){var s=Xs(this,r).delete(r);return this.size-=s?1:0,s}function s0(r){return Xs(this,r).get(r)}function o0(r){return Xs(this,r).has(r)}function a0(r,s){var a=Xs(this,r),l=a.size;return a.set(r,s),this.size+=a.size==l?0:1,this}Ht.prototype.clear=r0,Ht.prototype.delete=i0,Ht.prototype.get=s0,Ht.prototype.has=o0,Ht.prototype.set=a0;function Pn(r){var s=-1,a=r==null?0:r.length;for(this.__data__=new Ht;++s<a;)this.add(r[s])}function u0(r){return this.__data__.set(r,p),this}function c0(r){return this.__data__.has(r)}Pn.prototype.add=Pn.prototype.push=u0,Pn.prototype.has=c0;function xt(r){var s=this.__data__=new Wt(r);this.size=s.size}function l0(){this.__data__=new Wt,this.size=0}function h0(r){var s=this.__data__,a=s.delete(r);return this.size=s.size,a}function f0(r){return this.__data__.get(r)}function d0(r){return this.__data__.has(r)}function p0(r,s){var a=this.__data__;if(a instanceof Wt){var l=a.__data__;if(!ii||l.length<o-1)return l.push([r,s]),this.size=++a.size,this;a=this.__data__=new Ht(l)}return a.set(r,s),this.size=a.size,this}xt.prototype.clear=l0,xt.prototype.delete=h0,xt.prototype.get=f0,xt.prototype.has=d0,xt.prototype.set=p0;function Xh(r,s){var a=K(r),l=!a&&Bn(r),f=!a&&!l&&gn(r),g=!a&&!l&&!f&&Er(r),y=a||l||f||g,v=y?Qa(r.length,A_):[],E=v.length;for(var S in r)(s||ue.call(r,S))&&!(y&&(S=="length"||f&&(S=="offset"||S=="parent")||g&&(S=="buffer"||S=="byteLength"||S=="byteOffset")||jt(S,E)))&&v.push(S);return v}function Qh(r){var s=r.length;return s?r[gu(0,s-1)]:t}function g0(r,s){return Qs(rt(r),Mn(s,0,r.length))}function m0(r){return Qs(rt(r))}function su(r,s,a){(a!==t&&!Pt(r[s],a)||a===t&&!(s in r))&&Gt(r,s,a)}function ui(r,s,a){var l=r[s];(!(ue.call(r,s)&&Pt(l,a))||a===t&&!(s in r))&&Gt(r,s,a)}function Vs(r,s){for(var a=r.length;a--;)if(Pt(r[a][0],s))return a;return-1}function y0(r,s,a,l){return hn(r,function(f,g,y){s(l,f,a(f),y)}),l}function Zh(r,s){return r&&Vt(s,ke(s),r)}function v0(r,s){return r&&Vt(s,st(s),r)}function Gt(r,s,a){s=="__proto__"&&Ls?Ls(r,s,{configurable:!0,enumerable:!0,value:a,writable:!0}):r[s]=a}function ou(r,s){for(var a=-1,l=s.length,f=I(l),g=r==null;++a<l;)f[a]=g?t:Bu(r,s[a]);return f}function Mn(r,s,a){return r===r&&(a!==t&&(r=r<=a?r:a),s!==t&&(r=r>=s?r:s)),r}function Ct(r,s,a,l,f,g){var y,v=s&T,E=s&C,S=s&k;if(a&&(y=f?a(r,l,f,g):a(r)),y!==t)return y;if(!ye(r))return r;var b=K(r);if(b){if(y=ow(r),!v)return rt(r,y)}else{var R=He(r),D=R==ys||R==th;if(gn(r))return Af(r,v);if(R==qt||R==ar||D&&!f){if(y=E||D?{}:Wf(r),!v)return E?J0(r,v0(y,r)):j0(r,Zh(y,r))}else{if(!he[R])return f?r:{};y=aw(r,R,v)}}g||(g=new xt);var M=g.get(r);if(M)return M;g.set(r,y),vd(r)?r.forEach(function($){y.add(Ct($,s,a,$,r,g))}):md(r)&&r.forEach(function($,Q){y.set(Q,Ct($,s,a,Q,r,g))});var B=S?E?bu:Su:E?st:ke,Y=b?t:B(r);return At(Y||r,function($,Q){Y&&(Q=$,$=r[Q]),ui(y,Q,Ct($,s,a,Q,r,g))}),y}function _0(r){var s=ke(r);return function(a){return ef(a,r,s)}}function ef(r,s,a){var l=a.length;if(r==null)return!l;for(r=le(r);l--;){var f=a[l],g=s[f],y=r[f];if(y===t&&!(f in r)||!g(y))return!1}return!0}function tf(r,s,a){if(typeof r!="function")throw new St(c);return gi(function(){r.apply(t,a)},s)}function ci(r,s,a,l){var f=-1,g=Ts,y=!0,v=r.length,E=[],S=s.length;if(!v)return E;a&&(s=ge(s,ht(a))),l?(g=Ka,y=!1):s.length>=o&&(g=ni,y=!1,s=new Pn(s));e:for(;++f<v;){var b=r[f],R=a==null?b:a(b);if(b=l||b!==0?b:0,y&&R===R){for(var D=S;D--;)if(s[D]===R)continue e;E.push(b)}else g(s,R,l)||E.push(b)}return E}var hn=Nf(Ft),nf=Nf(uu,!0);function w0(r,s){var a=!0;return hn(r,function(l,f,g){return a=!!s(l,f,g),a}),a}function Bs(r,s,a){for(var l=-1,f=r.length;++l<f;){var g=r[l],y=s(g);if(y!=null&&(v===t?y===y&&!dt(y):a(y,v)))var v=y,E=g}return E}function E0(r,s,a,l){var f=r.length;for(a=j(a),a<0&&(a=-a>f?0:f+a),l=l===t||l>f?f:j(l),l<0&&(l+=f),l=a>l?0:wd(l);a<l;)r[a++]=s;return r}function rf(r,s){var a=[];return hn(r,function(l,f,g){s(l,f,g)&&a.push(l)}),a}function Pe(r,s,a,l,f){var g=-1,y=r.length;for(a||(a=cw),f||(f=[]);++g<y;){var v=r[g];s>0&&a(v)?s>1?Pe(v,s-1,a,l,f):un(f,v):l||(f[f.length]=v)}return f}var au=kf(),sf=kf(!0);function Ft(r,s){return r&&au(r,s,ke)}function uu(r,s){return r&&sf(r,s,ke)}function $s(r,s){return an(s,function(a){return Jt(r[a])})}function Un(r,s){s=dn(s,r);for(var a=0,l=s.length;r!=null&&a<l;)r=r[Bt(s[a++])];return a&&a==l?r:t}function of(r,s,a){var l=s(r);return K(r)?l:un(l,a(r))}function Xe(r){return r==null?r===t?Yy:jy:Ln&&Ln in le(r)?rw(r):mw(r)}function cu(r,s){return r>s}function T0(r,s){return r!=null&&ue.call(r,s)}function I0(r,s){return r!=null&&s in le(r)}function A0(r,s,a){return r>=We(s,a)&&r<Re(s,a)}function lu(r,s,a){for(var l=a?Ka:Ts,f=r[0].length,g=r.length,y=g,v=I(g),E=1/0,S=[];y--;){var b=r[y];y&&s&&(b=ge(b,ht(s))),E=We(b.length,E),v[y]=!a&&(s||f>=120&&b.length>=120)?new Pn(y&&b):t}b=r[0];var R=-1,D=v[0];e:for(;++R<f&&S.length<E;){var M=b[R],B=s?s(M):M;if(M=a||M!==0?M:0,!(D?ni(D,B):l(S,B,a))){for(y=g;--y;){var Y=v[y];if(!(Y?ni(Y,B):l(r[y],B,a)))continue e}D&&D.push(B),S.push(M)}}return S}function S0(r,s,a,l){return Ft(r,function(f,g,y){s(l,a(f),g,y)}),l}function li(r,s,a){s=dn(s,r),r=zf(r,s);var l=r==null?r:r[Bt(Nt(s))];return l==null?t:lt(l,r,a)}function af(r){return ve(r)&&Xe(r)==ar}function b0(r){return ve(r)&&Xe(r)==ti}function C0(r){return ve(r)&&Xe(r)==Yr}function hi(r,s,a,l,f){return r===s?!0:r==null||s==null||!ve(r)&&!ve(s)?r!==r&&s!==s:R0(r,s,a,l,hi,f)}function R0(r,s,a,l,f,g){var y=K(r),v=K(s),E=y?gs:He(r),S=v?gs:He(s);E=E==ar?qt:E,S=S==ar?qt:S;var b=E==qt,R=S==qt,D=E==S;if(D&&gn(r)){if(!gn(s))return!1;y=!0,b=!1}if(D&&!b)return g||(g=new xt),y||Er(r)?Bf(r,s,a,l,f,g):tw(r,s,E,a,l,f,g);if(!(a&x)){var M=b&&ue.call(r,"__wrapped__"),B=R&&ue.call(s,"__wrapped__");if(M||B){var Y=M?r.value():r,$=B?s.value():s;return g||(g=new xt),f(Y,$,a,l,g)}}return D?(g||(g=new xt),nw(r,s,a,l,f,g)):!1}function N0(r){return ve(r)&&He(r)==Dt}function hu(r,s,a,l){var f=a.length,g=f,y=!l;if(r==null)return!g;for(r=le(r);f--;){var v=a[f];if(y&&v[2]?v[1]!==r[v[0]]:!(v[0]in r))return!1}for(;++f<g;){v=a[f];var E=v[0],S=r[E],b=v[1];if(y&&v[2]){if(S===t&&!(E in r))return!1}else{var R=new xt;if(l)var D=l(S,b,E,r,s,R);if(!(D===t?hi(b,S,x|ee,l,R):D))return!1}}return!0}function uf(r){if(!ye(r)||hw(r))return!1;var s=Jt(r)?N_:_v;return s.test(Vn(r))}function k0(r){return ve(r)&&Xe(r)==Qr}function D0(r){return ve(r)&&He(r)==Ot}function O0(r){return ve(r)&&io(r.length)&&!!de[Xe(r)]}function cf(r){return typeof r=="function"?r:r==null?ot:typeof r=="object"?K(r)?ff(r[0],r[1]):hf(r):Dd(r)}function fu(r){if(!pi(r))return P_(r);var s=[];for(var a in le(r))ue.call(r,a)&&a!="constructor"&&s.push(a);return s}function L0(r){if(!ye(r))return gw(r);var s=pi(r),a=[];for(var l in r)l=="constructor"&&(s||!ue.call(r,l))||a.push(l);return a}function du(r,s){return r<s}function lf(r,s){var a=-1,l=it(r)?I(r.length):[];return hn(r,function(f,g,y){l[++a]=s(f,g,y)}),l}function hf(r){var s=Ru(r);return s.length==1&&s[0][2]?Gf(s[0][0],s[0][1]):function(a){return a===r||hu(a,r,s)}}function ff(r,s){return ku(r)&&Hf(s)?Gf(Bt(r),s):function(a){var l=Bu(a,r);return l===t&&l===s?$u(a,r):hi(s,l,x|ee)}}function qs(r,s,a,l,f){r!==s&&au(s,function(g,y){if(f||(f=new xt),ye(g))x0(r,s,y,a,qs,l,f);else{var v=l?l(Ou(r,y),g,y+"",r,s,f):t;v===t&&(v=g),su(r,y,v)}},st)}function x0(r,s,a,l,f,g,y){var v=Ou(r,a),E=Ou(s,a),S=y.get(E);if(S){su(r,a,S);return}var b=g?g(v,E,a+"",r,s,y):t,R=b===t;if(R){var D=K(E),M=!D&&gn(E),B=!D&&!M&&Er(E);b=E,D||M||B?K(v)?b=v:_e(v)?b=rt(v):M?(R=!1,b=Af(E,!0)):B?(R=!1,b=Sf(E,!0)):b=[]:mi(E)||Bn(E)?(b=v,Bn(v)?b=Ed(v):(!ye(v)||Jt(v))&&(b=Wf(E))):R=!1}R&&(y.set(E,b),f(b,E,l,g,y),y.delete(E)),su(r,a,b)}function df(r,s){var a=r.length;if(!!a)return s+=s<0?a:0,jt(s,a)?r[s]:t}function pf(r,s,a){s.length?s=ge(s,function(g){return K(g)?function(y){return Un(y,g.length===1?g[0]:g)}:g}):s=[ot];var l=-1;s=ge(s,ht(V()));var f=lf(r,function(g,y,v){var E=ge(s,function(S){return S(g)});return{criteria:E,index:++l,value:g}});return a_(f,function(g,y){return z0(g,y,a)})}function P0(r,s){return gf(r,s,function(a,l){return $u(r,l)})}function gf(r,s,a){for(var l=-1,f=s.length,g={};++l<f;){var y=s[l],v=Un(r,y);a(v,y)&&fi(g,dn(y,r),v)}return g}function M0(r){return function(s){return Un(s,r)}}function pu(r,s,a,l){var f=l?o_:lr,g=-1,y=s.length,v=r;for(r===s&&(s=rt(s)),a&&(v=ge(r,ht(a)));++g<y;)for(var E=0,S=s[g],b=a?a(S):S;(E=f(v,b,E,l))>-1;)v!==r&&Os.call(v,E,1),Os.call(r,E,1);return r}function mf(r,s){for(var a=r?s.length:0,l=a-1;a--;){var f=s[a];if(a==l||f!==g){var g=f;jt(f)?Os.call(r,f,1):vu(r,f)}}return r}function gu(r,s){return r+Ps(Jh()*(s-r+1))}function U0(r,s,a,l){for(var f=-1,g=Re(xs((s-r)/(a||1)),0),y=I(g);g--;)y[l?g:++f]=r,r+=a;return y}function mu(r,s){var a="";if(!r||s<1||s>on)return a;do s%2&&(a+=r),s=Ps(s/2),s&&(r+=r);while(s);return a}function X(r,s){return Lu(Kf(r,s,ot),r+"")}function F0(r){return Qh(Tr(r))}function V0(r,s){var a=Tr(r);return Qs(a,Mn(s,0,a.length))}function fi(r,s,a,l){if(!ye(r))return r;s=dn(s,r);for(var f=-1,g=s.length,y=g-1,v=r;v!=null&&++f<g;){var E=Bt(s[f]),S=a;if(E==="__proto__"||E==="constructor"||E==="prototype")return r;if(f!=y){var b=v[E];S=l?l(b,E,v):t,S===t&&(S=ye(b)?b:jt(s[f+1])?[]:{})}ui(v,E,S),v=v[E]}return r}var yf=Ms?function(r,s){return Ms.set(r,s),r}:ot,B0=Ls?function(r,s){return Ls(r,"toString",{configurable:!0,enumerable:!1,value:Wu(s),writable:!0})}:ot;function $0(r){return Qs(Tr(r))}function Rt(r,s,a){var l=-1,f=r.length;s<0&&(s=-s>f?0:f+s),a=a>f?f:a,a<0&&(a+=f),f=s>a?0:a-s>>>0,s>>>=0;for(var g=I(f);++l<f;)g[l]=r[l+s];return g}function q0(r,s){var a;return hn(r,function(l,f,g){return a=s(l,f,g),!a}),!!a}function Ws(r,s,a){var l=0,f=r==null?l:r.length;if(typeof s=="number"&&s===s&&f<=Hy){for(;l<f;){var g=l+f>>>1,y=r[g];y!==null&&!dt(y)&&(a?y<=s:y<s)?l=g+1:f=g}return f}return yu(r,s,ot,a)}function yu(r,s,a,l){var f=0,g=r==null?0:r.length;if(g===0)return 0;s=a(s);for(var y=s!==s,v=s===null,E=dt(s),S=s===t;f<g;){var b=Ps((f+g)/2),R=a(r[b]),D=R!==t,M=R===null,B=R===R,Y=dt(R);if(y)var $=l||B;else S?$=B&&(l||D):v?$=B&&D&&(l||!M):E?$=B&&D&&!M&&(l||!Y):M||Y?$=!1:$=l?R<=s:R<s;$?f=b+1:g=b}return We(g,Wy)}function vf(r,s){for(var a=-1,l=r.length,f=0,g=[];++a<l;){var y=r[a],v=s?s(y):y;if(!a||!Pt(v,E)){var E=v;g[f++]=y===0?0:y}}return g}function _f(r){return typeof r=="number"?r:dt(r)?ps:+r}function ft(r){if(typeof r=="string")return r;if(K(r))return ge(r,ft)+"";if(dt(r))return Yh?Yh.call(r):"";var s=r+"";return s=="0"&&1/r==-Dn?"-0":s}function fn(r,s,a){var l=-1,f=Ts,g=r.length,y=!0,v=[],E=v;if(a)y=!1,f=Ka;else if(g>=o){var S=s?null:Z0(r);if(S)return As(S);y=!1,f=ni,E=new Pn}else E=s?[]:v;e:for(;++l<g;){var b=r[l],R=s?s(b):b;if(b=a||b!==0?b:0,y&&R===R){for(var D=E.length;D--;)if(E[D]===R)continue e;s&&E.push(R),v.push(b)}else f(E,R,a)||(E!==v&&E.push(R),v.push(b))}return v}function vu(r,s){return s=dn(s,r),r=zf(r,s),r==null||delete r[Bt(Nt(s))]}function wf(r,s,a,l){return fi(r,s,a(Un(r,s)),l)}function Hs(r,s,a,l){for(var f=r.length,g=l?f:-1;(l?g--:++g<f)&&s(r[g],g,r););return a?Rt(r,l?0:g,l?g+1:f):Rt(r,l?g+1:0,l?f:g)}function Ef(r,s){var a=r;return a instanceof Z&&(a=a.value()),za(s,function(l,f){return f.func.apply(f.thisArg,un([l],f.args))},a)}function _u(r,s,a){var l=r.length;if(l<2)return l?fn(r[0]):[];for(var f=-1,g=I(l);++f<l;)for(var y=r[f],v=-1;++v<l;)v!=f&&(g[f]=ci(g[f]||y,r[v],s,a));return fn(Pe(g,1),s,a)}function Tf(r,s,a){for(var l=-1,f=r.length,g=s.length,y={};++l<f;){var v=l<g?s[l]:t;a(y,r[l],v)}return y}function wu(r){return _e(r)?r:[]}function Eu(r){return typeof r=="function"?r:ot}function dn(r,s){return K(r)?r:ku(r,s)?[r]:Xf(ae(r))}var W0=X;function pn(r,s,a){var l=r.length;return a=a===t?l:a,!s&&a>=l?r:Rt(r,s,a)}var If=k_||function(r){return xe.clearTimeout(r)};function Af(r,s){if(s)return r.slice();var a=r.length,l=Hh?Hh(a):new r.constructor(a);return r.copy(l),l}function Tu(r){var s=new r.constructor(r.byteLength);return new ks(s).set(new ks(r)),s}function H0(r,s){var a=s?Tu(r.buffer):r.buffer;return new r.constructor(a,r.byteOffset,r.byteLength)}function G0(r){var s=new r.constructor(r.source,oh.exec(r));return s.lastIndex=r.lastIndex,s}function K0(r){return ai?le(ai.call(r)):{}}function Sf(r,s){var a=s?Tu(r.buffer):r.buffer;return new r.constructor(a,r.byteOffset,r.length)}function bf(r,s){if(r!==s){var a=r!==t,l=r===null,f=r===r,g=dt(r),y=s!==t,v=s===null,E=s===s,S=dt(s);if(!v&&!S&&!g&&r>s||g&&y&&E&&!v&&!S||l&&y&&E||!a&&E||!f)return 1;if(!l&&!g&&!S&&r<s||S&&a&&f&&!l&&!g||v&&a&&f||!y&&f||!E)return-1}return 0}function z0(r,s,a){for(var l=-1,f=r.criteria,g=s.criteria,y=f.length,v=a.length;++l<y;){var E=bf(f[l],g[l]);if(E){if(l>=v)return E;var S=a[l];return E*(S=="desc"?-1:1)}}return r.index-s.index}function Cf(r,s,a,l){for(var f=-1,g=r.length,y=a.length,v=-1,E=s.length,S=Re(g-y,0),b=I(E+S),R=!l;++v<E;)b[v]=s[v];for(;++f<y;)(R||f<g)&&(b[a[f]]=r[f]);for(;S--;)b[v++]=r[f++];return b}function Rf(r,s,a,l){for(var f=-1,g=r.length,y=-1,v=a.length,E=-1,S=s.length,b=Re(g-v,0),R=I(b+S),D=!l;++f<b;)R[f]=r[f];for(var M=f;++E<S;)R[M+E]=s[E];for(;++y<v;)(D||f<g)&&(R[M+a[y]]=r[f++]);return R}function rt(r,s){var a=-1,l=r.length;for(s||(s=I(l));++a<l;)s[a]=r[a];return s}function Vt(r,s,a,l){var f=!a;a||(a={});for(var g=-1,y=s.length;++g<y;){var v=s[g],E=l?l(a[v],r[v],v,a,r):t;E===t&&(E=r[v]),f?Gt(a,v,E):ui(a,v,E)}return a}function j0(r,s){return Vt(r,Nu(r),s)}function J0(r,s){return Vt(r,$f(r),s)}function Gs(r,s){return function(a,l){var f=K(a)?e_:y0,g=s?s():{};return f(a,r,V(l,2),g)}}function vr(r){return X(function(s,a){var l=-1,f=a.length,g=f>1?a[f-1]:t,y=f>2?a[2]:t;for(g=r.length>3&&typeof g=="function"?(f--,g):t,y&&Qe(a[0],a[1],y)&&(g=f<3?t:g,f=1),s=le(s);++l<f;){var v=a[l];v&&r(s,v,l,g)}return s})}function Nf(r,s){return function(a,l){if(a==null)return a;if(!it(a))return r(a,l);for(var f=a.length,g=s?f:-1,y=le(a);(s?g--:++g<f)&&l(y[g],g,y)!==!1;);return a}}function kf(r){return function(s,a,l){for(var f=-1,g=le(s),y=l(s),v=y.length;v--;){var E=y[r?v:++f];if(a(g[E],E,g)===!1)break}return s}}function Y0(r,s,a){var l=s&te,f=di(r);function g(){var y=this&&this!==xe&&this instanceof g?f:r;return y.apply(l?a:this,arguments)}return g}function Df(r){return function(s){s=ae(s);var a=hr(s)?Lt(s):t,l=a?a[0]:s.charAt(0),f=a?pn(a,1).join(""):s.slice(1);return l[r]()+f}}function _r(r){return function(s){return za(Nd(Rd(s).replace(Bv,"")),r,"")}}function di(r){return function(){var s=arguments;switch(s.length){case 0:return new r;case 1:return new r(s[0]);case 2:return new r(s[0],s[1]);case 3:return new r(s[0],s[1],s[2]);case 4:return new r(s[0],s[1],s[2],s[3]);case 5:return new r(s[0],s[1],s[2],s[3],s[4]);case 6:return new r(s[0],s[1],s[2],s[3],s[4],s[5]);case 7:return new r(s[0],s[1],s[2],s[3],s[4],s[5],s[6])}var a=yr(r.prototype),l=r.apply(a,s);return ye(l)?l:a}}function X0(r,s,a){var l=di(r);function f(){for(var g=arguments.length,y=I(g),v=g,E=wr(f);v--;)y[v]=arguments[v];var S=g<3&&y[0]!==E&&y[g-1]!==E?[]:cn(y,E);if(g-=S.length,g<a)return Mf(r,s,Ks,f.placeholder,t,y,S,t,t,a-g);var b=this&&this!==xe&&this instanceof f?l:r;return lt(b,this,y)}return f}function Of(r){return function(s,a,l){var f=le(s);if(!it(s)){var g=V(a,3);s=ke(s),a=function(v){return g(f[v],v,f)}}var y=r(s,a,l);return y>-1?f[g?s[y]:y]:t}}function Lf(r){return zt(function(s){var a=s.length,l=a,f=bt.prototype.thru;for(r&&s.reverse();l--;){var g=s[l];if(typeof g!="function")throw new St(c);if(f&&!y&&Ys(g)=="wrapper")var y=new bt([],!0)}for(l=y?l:a;++l<a;){g=s[l];var v=Ys(g),E=v=="wrapper"?Cu(g):t;E&&Du(E[0])&&E[1]==(Ye|Ie|qe|Nn)&&!E[4].length&&E[9]==1?y=y[Ys(E[0])].apply(y,E[3]):y=g.length==1&&Du(g)?y[v]():y.thru(g)}return function(){var S=arguments,b=S[0];if(y&&S.length==1&&K(b))return y.plant(b).value();for(var R=0,D=a?s[R].apply(this,S):b;++R<a;)D=s[R].call(this,D);return D}})}function Ks(r,s,a,l,f,g,y,v,E,S){var b=s&Ye,R=s&te,D=s&Te,M=s&(Ie|Je),B=s&kn,Y=D?t:di(r);function $(){for(var Q=arguments.length,ne=I(Q),pt=Q;pt--;)ne[pt]=arguments[pt];if(M)var Ze=wr($),gt=c_(ne,Ze);if(l&&(ne=Cf(ne,l,f,M)),g&&(ne=Rf(ne,g,y,M)),Q-=gt,M&&Q<S){var we=cn(ne,Ze);return Mf(r,s,Ks,$.placeholder,a,ne,we,v,E,S-Q)}var Mt=R?a:this,Xt=D?Mt[r]:r;return Q=ne.length,v?ne=yw(ne,v):B&&Q>1&&ne.reverse(),b&&E<Q&&(ne.length=E),this&&this!==xe&&this instanceof $&&(Xt=Y||di(Xt)),Xt.apply(Mt,ne)}return $}function xf(r,s){return function(a,l){return S0(a,r,s(l),{})}}function zs(r,s){return function(a,l){var f;if(a===t&&l===t)return s;if(a!==t&&(f=a),l!==t){if(f===t)return l;typeof a=="string"||typeof l=="string"?(a=ft(a),l=ft(l)):(a=_f(a),l=_f(l)),f=r(a,l)}return f}}function Iu(r){return zt(function(s){return s=ge(s,ht(V())),X(function(a){var l=this;return r(s,function(f){return lt(f,l,a)})})})}function js(r,s){s=s===t?" ":ft(s);var a=s.length;if(a<2)return a?mu(s,r):s;var l=mu(s,xs(r/fr(s)));return hr(s)?pn(Lt(l),0,r).join(""):l.slice(0,r)}function Q0(r,s,a,l){var f=s&te,g=di(r);function y(){for(var v=-1,E=arguments.length,S=-1,b=l.length,R=I(b+E),D=this&&this!==xe&&this instanceof y?g:r;++S<b;)R[S]=l[S];for(;E--;)R[S++]=arguments[++v];return lt(D,f?a:this,R)}return y}function Pf(r){return function(s,a,l){return l&&typeof l!="number"&&Qe(s,a,l)&&(a=l=t),s=Yt(s),a===t?(a=s,s=0):a=Yt(a),l=l===t?s<a?1:-1:Yt(l),U0(s,a,l,r)}}function Js(r){return function(s,a){return typeof s=="string"&&typeof a=="string"||(s=kt(s),a=kt(a)),r(s,a)}}function Mf(r,s,a,l,f,g,y,v,E,S){var b=s&Ie,R=b?y:t,D=b?t:y,M=b?g:t,B=b?t:g;s|=b?qe:Tt,s&=~(b?Tt:qe),s&je||(s&=~(te|Te));var Y=[r,s,f,M,R,B,D,v,E,S],$=a.apply(t,Y);return Du(r)&&jf($,Y),$.placeholder=l,Jf($,r,s)}function Au(r){var s=Ce[r];return function(a,l){if(a=kt(a),l=l==null?0:We(j(l),292),l&&jh(a)){var f=(ae(a)+"e").split("e"),g=s(f[0]+"e"+(+f[1]+l));return f=(ae(g)+"e").split("e"),+(f[0]+"e"+(+f[1]-l))}return s(a)}}var Z0=gr&&1/As(new gr([,-0]))[1]==Dn?function(r){return new gr(r)}:Ku;function Uf(r){return function(s){var a=He(s);return a==Dt?eu(s):a==Ot?m_(s):u_(s,r(s))}}function Kt(r,s,a,l,f,g,y,v){var E=s&Te;if(!E&&typeof r!="function")throw new St(c);var S=l?l.length:0;if(S||(s&=~(qe|Tt),l=f=t),y=y===t?y:Re(j(y),0),v=v===t?v:j(v),S-=f?f.length:0,s&Tt){var b=l,R=f;l=f=t}var D=E?t:Cu(r),M=[r,s,a,l,f,b,R,g,y,v];if(D&&pw(M,D),r=M[0],s=M[1],a=M[2],l=M[3],f=M[4],v=M[9]=M[9]===t?E?0:r.length:Re(M[9]-S,0),!v&&s&(Ie|Je)&&(s&=~(Ie|Je)),!s||s==te)var B=Y0(r,s,a);else s==Ie||s==Je?B=X0(r,s,v):(s==qe||s==(te|qe))&&!f.length?B=Q0(r,s,a,l):B=Ks.apply(t,M);var Y=D?yf:jf;return Jf(Y(B,M),r,s)}function Ff(r,s,a,l){return r===t||Pt(r,pr[a])&&!ue.call(l,a)?s:r}function Vf(r,s,a,l,f,g){return ye(r)&&ye(s)&&(g.set(s,r),qs(r,s,t,Vf,g),g.delete(s)),r}function ew(r){return mi(r)?t:r}function Bf(r,s,a,l,f,g){var y=a&x,v=r.length,E=s.length;if(v!=E&&!(y&&E>v))return!1;var S=g.get(r),b=g.get(s);if(S&&b)return S==s&&b==r;var R=-1,D=!0,M=a&ee?new Pn:t;for(g.set(r,s),g.set(s,r);++R<v;){var B=r[R],Y=s[R];if(l)var $=y?l(Y,B,R,s,r,g):l(B,Y,R,r,s,g);if($!==t){if($)continue;D=!1;break}if(M){if(!ja(s,function(Q,ne){if(!ni(M,ne)&&(B===Q||f(B,Q,a,l,g)))return M.push(ne)})){D=!1;break}}else if(!(B===Y||f(B,Y,a,l,g))){D=!1;break}}return g.delete(r),g.delete(s),D}function tw(r,s,a,l,f,g,y){switch(a){case ur:if(r.byteLength!=s.byteLength||r.byteOffset!=s.byteOffset)return!1;r=r.buffer,s=s.buffer;case ti:return!(r.byteLength!=s.byteLength||!g(new ks(r),new ks(s)));case Jr:case Yr:case Xr:return Pt(+r,+s);case ms:return r.name==s.name&&r.message==s.message;case Qr:case Zr:return r==s+"";case Dt:var v=eu;case Ot:var E=l&x;if(v||(v=As),r.size!=s.size&&!E)return!1;var S=y.get(r);if(S)return S==s;l|=ee,y.set(r,s);var b=Bf(v(r),v(s),l,f,g,y);return y.delete(r),b;case vs:if(ai)return ai.call(r)==ai.call(s)}return!1}function nw(r,s,a,l,f,g){var y=a&x,v=Su(r),E=v.length,S=Su(s),b=S.length;if(E!=b&&!y)return!1;for(var R=E;R--;){var D=v[R];if(!(y?D in s:ue.call(s,D)))return!1}var M=g.get(r),B=g.get(s);if(M&&B)return M==s&&B==r;var Y=!0;g.set(r,s),g.set(s,r);for(var $=y;++R<E;){D=v[R];var Q=r[D],ne=s[D];if(l)var pt=y?l(ne,Q,D,s,r,g):l(Q,ne,D,r,s,g);if(!(pt===t?Q===ne||f(Q,ne,a,l,g):pt)){Y=!1;break}$||($=D=="constructor")}if(Y&&!$){var Ze=r.constructor,gt=s.constructor;Ze!=gt&&"constructor"in r&&"constructor"in s&&!(typeof Ze=="function"&&Ze instanceof Ze&&typeof gt=="function"&&gt instanceof gt)&&(Y=!1)}return g.delete(r),g.delete(s),Y}function zt(r){return Lu(Kf(r,t,td),r+"")}function Su(r){return of(r,ke,Nu)}function bu(r){return of(r,st,$f)}var Cu=Ms?function(r){return Ms.get(r)}:Ku;function Ys(r){for(var s=r.name+"",a=mr[s],l=ue.call(mr,s)?a.length:0;l--;){var f=a[l],g=f.func;if(g==null||g==r)return f.name}return s}function wr(r){var s=ue.call(d,"placeholder")?d:r;return s.placeholder}function V(){var r=d.iteratee||Hu;return r=r===Hu?cf:r,arguments.length?r(arguments[0],arguments[1]):r}function Xs(r,s){var a=r.__data__;return lw(s)?a[typeof s=="string"?"string":"hash"]:a.map}function Ru(r){for(var s=ke(r),a=s.length;a--;){var l=s[a],f=r[l];s[a]=[l,f,Hf(f)]}return s}function Fn(r,s){var a=d_(r,s);return uf(a)?a:t}function rw(r){var s=ue.call(r,Ln),a=r[Ln];try{r[Ln]=t;var l=!0}catch{}var f=Rs.call(r);return l&&(s?r[Ln]=a:delete r[Ln]),f}var Nu=nu?function(r){return r==null?[]:(r=le(r),an(nu(r),function(s){return Kh.call(r,s)}))}:zu,$f=nu?function(r){for(var s=[];r;)un(s,Nu(r)),r=Ds(r);return s}:zu,He=Xe;(ru&&He(new ru(new ArrayBuffer(1)))!=ur||ii&&He(new ii)!=Dt||iu&&He(iu.resolve())!=nh||gr&&He(new gr)!=Ot||si&&He(new si)!=ei)&&(He=function(r){var s=Xe(r),a=s==qt?r.constructor:t,l=a?Vn(a):"";if(l)switch(l){case V_:return ur;case B_:return Dt;case $_:return nh;case q_:return Ot;case W_:return ei}return s});function iw(r,s,a){for(var l=-1,f=a.length;++l<f;){var g=a[l],y=g.size;switch(g.type){case"drop":r+=y;break;case"dropRight":s-=y;break;case"take":s=We(s,r+y);break;case"takeRight":r=Re(r,s-y);break}}return{start:r,end:s}}function sw(r){var s=r.match(hv);return s?s[1].split(fv):[]}function qf(r,s,a){s=dn(s,r);for(var l=-1,f=s.length,g=!1;++l<f;){var y=Bt(s[l]);if(!(g=r!=null&&a(r,y)))break;r=r[y]}return g||++l!=f?g:(f=r==null?0:r.length,!!f&&io(f)&&jt(y,f)&&(K(r)||Bn(r)))}function ow(r){var s=r.length,a=new r.constructor(s);return s&&typeof r[0]=="string"&&ue.call(r,"index")&&(a.index=r.index,a.input=r.input),a}function Wf(r){return typeof r.constructor=="function"&&!pi(r)?yr(Ds(r)):{}}function aw(r,s,a){var l=r.constructor;switch(s){case ti:return Tu(r);case Jr:case Yr:return new l(+r);case ur:return H0(r,a);case Ra:case Na:case ka:case Da:case Oa:case La:case xa:case Pa:case Ma:return Sf(r,a);case Dt:return new l;case Xr:case Zr:return new l(r);case Qr:return G0(r);case Ot:return new l;case vs:return K0(r)}}function uw(r,s){var a=s.length;if(!a)return r;var l=a-1;return s[l]=(a>1?"& ":"")+s[l],s=s.join(a>2?", ":" "),r.replace(lv,`{
/* [wrapped with `+s+`] */
`)}function cw(r){return K(r)||Bn(r)||!!(zh&&r&&r[zh])}function jt(r,s){var a=typeof r;return s=s==null?on:s,!!s&&(a=="number"||a!="symbol"&&Ev.test(r))&&r>-1&&r%1==0&&r<s}function Qe(r,s,a){if(!ye(a))return!1;var l=typeof s;return(l=="number"?it(a)&&jt(s,a.length):l=="string"&&s in a)?Pt(a[s],r):!1}function ku(r,s){if(K(r))return!1;var a=typeof r;return a=="number"||a=="symbol"||a=="boolean"||r==null||dt(r)?!0:ov.test(r)||!sv.test(r)||s!=null&&r in le(s)}function lw(r){var s=typeof r;return s=="string"||s=="number"||s=="symbol"||s=="boolean"?r!=="__proto__":r===null}function Du(r){var s=Ys(r),a=d[s];if(typeof a!="function"||!(s in Z.prototype))return!1;if(r===a)return!0;var l=Cu(a);return!!l&&r===l[0]}function hw(r){return!!Wh&&Wh in r}var fw=bs?Jt:ju;function pi(r){var s=r&&r.constructor,a=typeof s=="function"&&s.prototype||pr;return r===a}function Hf(r){return r===r&&!ye(r)}function Gf(r,s){return function(a){return a==null?!1:a[r]===s&&(s!==t||r in le(a))}}function dw(r){var s=no(r,function(l){return a.size===m&&a.clear(),l}),a=s.cache;return s}function pw(r,s){var a=r[1],l=s[1],f=a|l,g=f<(te|Te|Ye),y=l==Ye&&a==Ie||l==Ye&&a==Nn&&r[7].length<=s[8]||l==(Ye|Nn)&&s[7].length<=s[8]&&a==Ie;if(!(g||y))return r;l&te&&(r[2]=s[2],f|=a&te?0:je);var v=s[3];if(v){var E=r[3];r[3]=E?Cf(E,v,s[4]):v,r[4]=E?cn(r[3],_):s[4]}return v=s[5],v&&(E=r[5],r[5]=E?Rf(E,v,s[6]):v,r[6]=E?cn(r[5],_):s[6]),v=s[7],v&&(r[7]=v),l&Ye&&(r[8]=r[8]==null?s[8]:We(r[8],s[8])),r[9]==null&&(r[9]=s[9]),r[0]=s[0],r[1]=f,r}function gw(r){var s=[];if(r!=null)for(var a in le(r))s.push(a);return s}function mw(r){return Rs.call(r)}function Kf(r,s,a){return s=Re(s===t?r.length-1:s,0),function(){for(var l=arguments,f=-1,g=Re(l.length-s,0),y=I(g);++f<g;)y[f]=l[s+f];f=-1;for(var v=I(s+1);++f<s;)v[f]=l[f];return v[s]=a(y),lt(r,this,v)}}function zf(r,s){return s.length<2?r:Un(r,Rt(s,0,-1))}function yw(r,s){for(var a=r.length,l=We(s.length,a),f=rt(r);l--;){var g=s[l];r[l]=jt(g,a)?f[g]:t}return r}function Ou(r,s){if(!(s==="constructor"&&typeof r[s]=="function")&&s!="__proto__")return r[s]}var jf=Yf(yf),gi=O_||function(r,s){return xe.setTimeout(r,s)},Lu=Yf(B0);function Jf(r,s,a){var l=s+"";return Lu(r,uw(l,vw(sw(l),a)))}function Yf(r){var s=0,a=0;return function(){var l=M_(),f=Vy-(l-a);if(a=l,f>0){if(++s>=Fy)return arguments[0]}else s=0;return r.apply(t,arguments)}}function Qs(r,s){var a=-1,l=r.length,f=l-1;for(s=s===t?l:s;++a<s;){var g=gu(a,f),y=r[g];r[g]=r[a],r[a]=y}return r.length=s,r}var Xf=dw(function(r){var s=[];return r.charCodeAt(0)===46&&s.push(""),r.replace(av,function(a,l,f,g){s.push(f?g.replace(gv,"$1"):l||a)}),s});function Bt(r){if(typeof r=="string"||dt(r))return r;var s=r+"";return s=="0"&&1/r==-Dn?"-0":s}function Vn(r){if(r!=null){try{return Cs.call(r)}catch{}try{return r+""}catch{}}return""}function vw(r,s){return At(Gy,function(a){var l="_."+a[0];s&a[1]&&!Ts(r,l)&&r.push(l)}),r.sort()}function Qf(r){if(r instanceof Z)return r.clone();var s=new bt(r.__wrapped__,r.__chain__);return s.__actions__=rt(r.__actions__),s.__index__=r.__index__,s.__values__=r.__values__,s}function _w(r,s,a){(a?Qe(r,s,a):s===t)?s=1:s=Re(j(s),0);var l=r==null?0:r.length;if(!l||s<1)return[];for(var f=0,g=0,y=I(xs(l/s));f<l;)y[g++]=Rt(r,f,f+=s);return y}function ww(r){for(var s=-1,a=r==null?0:r.length,l=0,f=[];++s<a;){var g=r[s];g&&(f[l++]=g)}return f}function Ew(){var r=arguments.length;if(!r)return[];for(var s=I(r-1),a=arguments[0],l=r;l--;)s[l-1]=arguments[l];return un(K(a)?rt(a):[a],Pe(s,1))}var Tw=X(function(r,s){return _e(r)?ci(r,Pe(s,1,_e,!0)):[]}),Iw=X(function(r,s){var a=Nt(s);return _e(a)&&(a=t),_e(r)?ci(r,Pe(s,1,_e,!0),V(a,2)):[]}),Aw=X(function(r,s){var a=Nt(s);return _e(a)&&(a=t),_e(r)?ci(r,Pe(s,1,_e,!0),t,a):[]});function Sw(r,s,a){var l=r==null?0:r.length;return l?(s=a||s===t?1:j(s),Rt(r,s<0?0:s,l)):[]}function bw(r,s,a){var l=r==null?0:r.length;return l?(s=a||s===t?1:j(s),s=l-s,Rt(r,0,s<0?0:s)):[]}function Cw(r,s){return r&&r.length?Hs(r,V(s,3),!0,!0):[]}function Rw(r,s){return r&&r.length?Hs(r,V(s,3),!0):[]}function Nw(r,s,a,l){var f=r==null?0:r.length;return f?(a&&typeof a!="number"&&Qe(r,s,a)&&(a=0,l=f),E0(r,s,a,l)):[]}function Zf(r,s,a){var l=r==null?0:r.length;if(!l)return-1;var f=a==null?0:j(a);return f<0&&(f=Re(l+f,0)),Is(r,V(s,3),f)}function ed(r,s,a){var l=r==null?0:r.length;if(!l)return-1;var f=l-1;return a!==t&&(f=j(a),f=a<0?Re(l+f,0):We(f,l-1)),Is(r,V(s,3),f,!0)}function td(r){var s=r==null?0:r.length;return s?Pe(r,1):[]}function kw(r){var s=r==null?0:r.length;return s?Pe(r,Dn):[]}function Dw(r,s){var a=r==null?0:r.length;return a?(s=s===t?1:j(s),Pe(r,s)):[]}function Ow(r){for(var s=-1,a=r==null?0:r.length,l={};++s<a;){var f=r[s];l[f[0]]=f[1]}return l}function nd(r){return r&&r.length?r[0]:t}function Lw(r,s,a){var l=r==null?0:r.length;if(!l)return-1;var f=a==null?0:j(a);return f<0&&(f=Re(l+f,0)),lr(r,s,f)}function xw(r){var s=r==null?0:r.length;return s?Rt(r,0,-1):[]}var Pw=X(function(r){var s=ge(r,wu);return s.length&&s[0]===r[0]?lu(s):[]}),Mw=X(function(r){var s=Nt(r),a=ge(r,wu);return s===Nt(a)?s=t:a.pop(),a.length&&a[0]===r[0]?lu(a,V(s,2)):[]}),Uw=X(function(r){var s=Nt(r),a=ge(r,wu);return s=typeof s=="function"?s:t,s&&a.pop(),a.length&&a[0]===r[0]?lu(a,t,s):[]});function Fw(r,s){return r==null?"":x_.call(r,s)}function Nt(r){var s=r==null?0:r.length;return s?r[s-1]:t}function Vw(r,s,a){var l=r==null?0:r.length;if(!l)return-1;var f=l;return a!==t&&(f=j(a),f=f<0?Re(l+f,0):We(f,l-1)),s===s?v_(r,s,f):Is(r,Ph,f,!0)}function Bw(r,s){return r&&r.length?df(r,j(s)):t}var $w=X(rd);function rd(r,s){return r&&r.length&&s&&s.length?pu(r,s):r}function qw(r,s,a){return r&&r.length&&s&&s.length?pu(r,s,V(a,2)):r}function Ww(r,s,a){return r&&r.length&&s&&s.length?pu(r,s,t,a):r}var Hw=zt(function(r,s){var a=r==null?0:r.length,l=ou(r,s);return mf(r,ge(s,function(f){return jt(f,a)?+f:f}).sort(bf)),l});function Gw(r,s){var a=[];if(!(r&&r.length))return a;var l=-1,f=[],g=r.length;for(s=V(s,3);++l<g;){var y=r[l];s(y,l,r)&&(a.push(y),f.push(l))}return mf(r,f),a}function xu(r){return r==null?r:F_.call(r)}function Kw(r,s,a){var l=r==null?0:r.length;return l?(a&&typeof a!="number"&&Qe(r,s,a)?(s=0,a=l):(s=s==null?0:j(s),a=a===t?l:j(a)),Rt(r,s,a)):[]}function zw(r,s){return Ws(r,s)}function jw(r,s,a){return yu(r,s,V(a,2))}function Jw(r,s){var a=r==null?0:r.length;if(a){var l=Ws(r,s);if(l<a&&Pt(r[l],s))return l}return-1}function Yw(r,s){return Ws(r,s,!0)}function Xw(r,s,a){return yu(r,s,V(a,2),!0)}function Qw(r,s){var a=r==null?0:r.length;if(a){var l=Ws(r,s,!0)-1;if(Pt(r[l],s))return l}return-1}function Zw(r){return r&&r.length?vf(r):[]}function eE(r,s){return r&&r.length?vf(r,V(s,2)):[]}function tE(r){var s=r==null?0:r.length;return s?Rt(r,1,s):[]}function nE(r,s,a){return r&&r.length?(s=a||s===t?1:j(s),Rt(r,0,s<0?0:s)):[]}function rE(r,s,a){var l=r==null?0:r.length;return l?(s=a||s===t?1:j(s),s=l-s,Rt(r,s<0?0:s,l)):[]}function iE(r,s){return r&&r.length?Hs(r,V(s,3),!1,!0):[]}function sE(r,s){return r&&r.length?Hs(r,V(s,3)):[]}var oE=X(function(r){return fn(Pe(r,1,_e,!0))}),aE=X(function(r){var s=Nt(r);return _e(s)&&(s=t),fn(Pe(r,1,_e,!0),V(s,2))}),uE=X(function(r){var s=Nt(r);return s=typeof s=="function"?s:t,fn(Pe(r,1,_e,!0),t,s)});function cE(r){return r&&r.length?fn(r):[]}function lE(r,s){return r&&r.length?fn(r,V(s,2)):[]}function hE(r,s){return s=typeof s=="function"?s:t,r&&r.length?fn(r,t,s):[]}function Pu(r){if(!(r&&r.length))return[];var s=0;return r=an(r,function(a){if(_e(a))return s=Re(a.length,s),!0}),Qa(s,function(a){return ge(r,Ja(a))})}function id(r,s){if(!(r&&r.length))return[];var a=Pu(r);return s==null?a:ge(a,function(l){return lt(s,t,l)})}var fE=X(function(r,s){return _e(r)?ci(r,s):[]}),dE=X(function(r){return _u(an(r,_e))}),pE=X(function(r){var s=Nt(r);return _e(s)&&(s=t),_u(an(r,_e),V(s,2))}),gE=X(function(r){var s=Nt(r);return s=typeof s=="function"?s:t,_u(an(r,_e),t,s)}),mE=X(Pu);function yE(r,s){return Tf(r||[],s||[],ui)}function vE(r,s){return Tf(r||[],s||[],fi)}var _E=X(function(r){var s=r.length,a=s>1?r[s-1]:t;return a=typeof a=="function"?(r.pop(),a):t,id(r,a)});function sd(r){var s=d(r);return s.__chain__=!0,s}function wE(r,s){return s(r),r}function Zs(r,s){return s(r)}var EE=zt(function(r){var s=r.length,a=s?r[0]:0,l=this.__wrapped__,f=function(g){return ou(g,r)};return s>1||this.__actions__.length||!(l instanceof Z)||!jt(a)?this.thru(f):(l=l.slice(a,+a+(s?1:0)),l.__actions__.push({func:Zs,args:[f],thisArg:t}),new bt(l,this.__chain__).thru(function(g){return s&&!g.length&&g.push(t),g}))});function TE(){return sd(this)}function IE(){return new bt(this.value(),this.__chain__)}function AE(){this.__values__===t&&(this.__values__=_d(this.value()));var r=this.__index__>=this.__values__.length,s=r?t:this.__values__[this.__index__++];return{done:r,value:s}}function SE(){return this}function bE(r){for(var s,a=this;a instanceof Fs;){var l=Qf(a);l.__index__=0,l.__values__=t,s?f.__wrapped__=l:s=l;var f=l;a=a.__wrapped__}return f.__wrapped__=r,s}function CE(){var r=this.__wrapped__;if(r instanceof Z){var s=r;return this.__actions__.length&&(s=new Z(this)),s=s.reverse(),s.__actions__.push({func:Zs,args:[xu],thisArg:t}),new bt(s,this.__chain__)}return this.thru(xu)}function RE(){return Ef(this.__wrapped__,this.__actions__)}var NE=Gs(function(r,s,a){ue.call(r,a)?++r[a]:Gt(r,a,1)});function kE(r,s,a){var l=K(r)?Lh:w0;return a&&Qe(r,s,a)&&(s=t),l(r,V(s,3))}function DE(r,s){var a=K(r)?an:rf;return a(r,V(s,3))}var OE=Of(Zf),LE=Of(ed);function xE(r,s){return Pe(eo(r,s),1)}function PE(r,s){return Pe(eo(r,s),Dn)}function ME(r,s,a){return a=a===t?1:j(a),Pe(eo(r,s),a)}function od(r,s){var a=K(r)?At:hn;return a(r,V(s,3))}function ad(r,s){var a=K(r)?t_:nf;return a(r,V(s,3))}var UE=Gs(function(r,s,a){ue.call(r,a)?r[a].push(s):Gt(r,a,[s])});function FE(r,s,a,l){r=it(r)?r:Tr(r),a=a&&!l?j(a):0;var f=r.length;return a<0&&(a=Re(f+a,0)),so(r)?a<=f&&r.indexOf(s,a)>-1:!!f&&lr(r,s,a)>-1}var VE=X(function(r,s,a){var l=-1,f=typeof s=="function",g=it(r)?I(r.length):[];return hn(r,function(y){g[++l]=f?lt(s,y,a):li(y,s,a)}),g}),BE=Gs(function(r,s,a){Gt(r,a,s)});function eo(r,s){var a=K(r)?ge:lf;return a(r,V(s,3))}function $E(r,s,a,l){return r==null?[]:(K(s)||(s=s==null?[]:[s]),a=l?t:a,K(a)||(a=a==null?[]:[a]),pf(r,s,a))}var qE=Gs(function(r,s,a){r[a?0:1].push(s)},function(){return[[],[]]});function WE(r,s,a){var l=K(r)?za:Uh,f=arguments.length<3;return l(r,V(s,4),a,f,hn)}function HE(r,s,a){var l=K(r)?n_:Uh,f=arguments.length<3;return l(r,V(s,4),a,f,nf)}function GE(r,s){var a=K(r)?an:rf;return a(r,ro(V(s,3)))}function KE(r){var s=K(r)?Qh:F0;return s(r)}function zE(r,s,a){(a?Qe(r,s,a):s===t)?s=1:s=j(s);var l=K(r)?g0:V0;return l(r,s)}function jE(r){var s=K(r)?m0:$0;return s(r)}function JE(r){if(r==null)return 0;if(it(r))return so(r)?fr(r):r.length;var s=He(r);return s==Dt||s==Ot?r.size:fu(r).length}function YE(r,s,a){var l=K(r)?ja:q0;return a&&Qe(r,s,a)&&(s=t),l(r,V(s,3))}var XE=X(function(r,s){if(r==null)return[];var a=s.length;return a>1&&Qe(r,s[0],s[1])?s=[]:a>2&&Qe(s[0],s[1],s[2])&&(s=[s[0]]),pf(r,Pe(s,1),[])}),to=D_||function(){return xe.Date.now()};function QE(r,s){if(typeof s!="function")throw new St(c);return r=j(r),function(){if(--r<1)return s.apply(this,arguments)}}function ud(r,s,a){return s=a?t:s,s=r&&s==null?r.length:s,Kt(r,Ye,t,t,t,t,s)}function cd(r,s){var a;if(typeof s!="function")throw new St(c);return r=j(r),function(){return--r>0&&(a=s.apply(this,arguments)),r<=1&&(s=t),a}}var Mu=X(function(r,s,a){var l=te;if(a.length){var f=cn(a,wr(Mu));l|=qe}return Kt(r,l,s,a,f)}),ld=X(function(r,s,a){var l=te|Te;if(a.length){var f=cn(a,wr(ld));l|=qe}return Kt(s,l,r,a,f)});function hd(r,s,a){s=a?t:s;var l=Kt(r,Ie,t,t,t,t,t,s);return l.placeholder=hd.placeholder,l}function fd(r,s,a){s=a?t:s;var l=Kt(r,Je,t,t,t,t,t,s);return l.placeholder=fd.placeholder,l}function dd(r,s,a){var l,f,g,y,v,E,S=0,b=!1,R=!1,D=!0;if(typeof r!="function")throw new St(c);s=kt(s)||0,ye(a)&&(b=!!a.leading,R="maxWait"in a,g=R?Re(kt(a.maxWait)||0,s):g,D="trailing"in a?!!a.trailing:D);function M(we){var Mt=l,Xt=f;return l=f=t,S=we,y=r.apply(Xt,Mt),y}function B(we){return S=we,v=gi(Q,s),b?M(we):y}function Y(we){var Mt=we-E,Xt=we-S,Od=s-Mt;return R?We(Od,g-Xt):Od}function $(we){var Mt=we-E,Xt=we-S;return E===t||Mt>=s||Mt<0||R&&Xt>=g}function Q(){var we=to();if($(we))return ne(we);v=gi(Q,Y(we))}function ne(we){return v=t,D&&l?M(we):(l=f=t,y)}function pt(){v!==t&&If(v),S=0,l=E=f=v=t}function Ze(){return v===t?y:ne(to())}function gt(){var we=to(),Mt=$(we);if(l=arguments,f=this,E=we,Mt){if(v===t)return B(E);if(R)return If(v),v=gi(Q,s),M(E)}return v===t&&(v=gi(Q,s)),y}return gt.cancel=pt,gt.flush=Ze,gt}var ZE=X(function(r,s){return tf(r,1,s)}),eT=X(function(r,s,a){return tf(r,kt(s)||0,a)});function tT(r){return Kt(r,kn)}function no(r,s){if(typeof r!="function"||s!=null&&typeof s!="function")throw new St(c);var a=function(){var l=arguments,f=s?s.apply(this,l):l[0],g=a.cache;if(g.has(f))return g.get(f);var y=r.apply(this,l);return a.cache=g.set(f,y)||g,y};return a.cache=new(no.Cache||Ht),a}no.Cache=Ht;function ro(r){if(typeof r!="function")throw new St(c);return function(){var s=arguments;switch(s.length){case 0:return!r.call(this);case 1:return!r.call(this,s[0]);case 2:return!r.call(this,s[0],s[1]);case 3:return!r.call(this,s[0],s[1],s[2])}return!r.apply(this,s)}}function nT(r){return cd(2,r)}var rT=W0(function(r,s){s=s.length==1&&K(s[0])?ge(s[0],ht(V())):ge(Pe(s,1),ht(V()));var a=s.length;return X(function(l){for(var f=-1,g=We(l.length,a);++f<g;)l[f]=s[f].call(this,l[f]);return lt(r,this,l)})}),Uu=X(function(r,s){var a=cn(s,wr(Uu));return Kt(r,qe,t,s,a)}),pd=X(function(r,s){var a=cn(s,wr(pd));return Kt(r,Tt,t,s,a)}),iT=zt(function(r,s){return Kt(r,Nn,t,t,t,s)});function sT(r,s){if(typeof r!="function")throw new St(c);return s=s===t?s:j(s),X(r,s)}function oT(r,s){if(typeof r!="function")throw new St(c);return s=s==null?0:Re(j(s),0),X(function(a){var l=a[s],f=pn(a,0,s);return l&&un(f,l),lt(r,this,f)})}function aT(r,s,a){var l=!0,f=!0;if(typeof r!="function")throw new St(c);return ye(a)&&(l="leading"in a?!!a.leading:l,f="trailing"in a?!!a.trailing:f),dd(r,s,{leading:l,maxWait:s,trailing:f})}function uT(r){return ud(r,1)}function cT(r,s){return Uu(Eu(s),r)}function lT(){if(!arguments.length)return[];var r=arguments[0];return K(r)?r:[r]}function hT(r){return Ct(r,k)}function fT(r,s){return s=typeof s=="function"?s:t,Ct(r,k,s)}function dT(r){return Ct(r,T|k)}function pT(r,s){return s=typeof s=="function"?s:t,Ct(r,T|k,s)}function gT(r,s){return s==null||ef(r,s,ke(s))}function Pt(r,s){return r===s||r!==r&&s!==s}var mT=Js(cu),yT=Js(function(r,s){return r>=s}),Bn=af(function(){return arguments}())?af:function(r){return ve(r)&&ue.call(r,"callee")&&!Kh.call(r,"callee")},K=I.isArray,vT=Ch?ht(Ch):b0;function it(r){return r!=null&&io(r.length)&&!Jt(r)}function _e(r){return ve(r)&&it(r)}function _T(r){return r===!0||r===!1||ve(r)&&Xe(r)==Jr}var gn=L_||ju,wT=Rh?ht(Rh):C0;function ET(r){return ve(r)&&r.nodeType===1&&!mi(r)}function TT(r){if(r==null)return!0;if(it(r)&&(K(r)||typeof r=="string"||typeof r.splice=="function"||gn(r)||Er(r)||Bn(r)))return!r.length;var s=He(r);if(s==Dt||s==Ot)return!r.size;if(pi(r))return!fu(r).length;for(var a in r)if(ue.call(r,a))return!1;return!0}function IT(r,s){return hi(r,s)}function AT(r,s,a){a=typeof a=="function"?a:t;var l=a?a(r,s):t;return l===t?hi(r,s,t,a):!!l}function Fu(r){if(!ve(r))return!1;var s=Xe(r);return s==ms||s==zy||typeof r.message=="string"&&typeof r.name=="string"&&!mi(r)}function ST(r){return typeof r=="number"&&jh(r)}function Jt(r){if(!ye(r))return!1;var s=Xe(r);return s==ys||s==th||s==Ky||s==Jy}function gd(r){return typeof r=="number"&&r==j(r)}function io(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=on}function ye(r){var s=typeof r;return r!=null&&(s=="object"||s=="function")}function ve(r){return r!=null&&typeof r=="object"}var md=Nh?ht(Nh):N0;function bT(r,s){return r===s||hu(r,s,Ru(s))}function CT(r,s,a){return a=typeof a=="function"?a:t,hu(r,s,Ru(s),a)}function RT(r){return yd(r)&&r!=+r}function NT(r){if(fw(r))throw new H(u);return uf(r)}function kT(r){return r===null}function DT(r){return r==null}function yd(r){return typeof r=="number"||ve(r)&&Xe(r)==Xr}function mi(r){if(!ve(r)||Xe(r)!=qt)return!1;var s=Ds(r);if(s===null)return!0;var a=ue.call(s,"constructor")&&s.constructor;return typeof a=="function"&&a instanceof a&&Cs.call(a)==C_}var Vu=kh?ht(kh):k0;function OT(r){return gd(r)&&r>=-on&&r<=on}var vd=Dh?ht(Dh):D0;function so(r){return typeof r=="string"||!K(r)&&ve(r)&&Xe(r)==Zr}function dt(r){return typeof r=="symbol"||ve(r)&&Xe(r)==vs}var Er=Oh?ht(Oh):O0;function LT(r){return r===t}function xT(r){return ve(r)&&He(r)==ei}function PT(r){return ve(r)&&Xe(r)==Xy}var MT=Js(du),UT=Js(function(r,s){return r<=s});function _d(r){if(!r)return[];if(it(r))return so(r)?Lt(r):rt(r);if(ri&&r[ri])return g_(r[ri]());var s=He(r),a=s==Dt?eu:s==Ot?As:Tr;return a(r)}function Yt(r){if(!r)return r===0?r:0;if(r=kt(r),r===Dn||r===-Dn){var s=r<0?-1:1;return s*qy}return r===r?r:0}function j(r){var s=Yt(r),a=s%1;return s===s?a?s-a:s:0}function wd(r){return r?Mn(j(r),0,Ut):0}function kt(r){if(typeof r=="number")return r;if(dt(r))return ps;if(ye(r)){var s=typeof r.valueOf=="function"?r.valueOf():r;r=ye(s)?s+"":s}if(typeof r!="string")return r===0?r:+r;r=Fh(r);var a=vv.test(r);return a||wv.test(r)?Qv(r.slice(2),a?2:8):yv.test(r)?ps:+r}function Ed(r){return Vt(r,st(r))}function FT(r){return r?Mn(j(r),-on,on):r===0?r:0}function ae(r){return r==null?"":ft(r)}var VT=vr(function(r,s){if(pi(s)||it(s)){Vt(s,ke(s),r);return}for(var a in s)ue.call(s,a)&&ui(r,a,s[a])}),Td=vr(function(r,s){Vt(s,st(s),r)}),oo=vr(function(r,s,a,l){Vt(s,st(s),r,l)}),BT=vr(function(r,s,a,l){Vt(s,ke(s),r,l)}),$T=zt(ou);function qT(r,s){var a=yr(r);return s==null?a:Zh(a,s)}var WT=X(function(r,s){r=le(r);var a=-1,l=s.length,f=l>2?s[2]:t;for(f&&Qe(s[0],s[1],f)&&(l=1);++a<l;)for(var g=s[a],y=st(g),v=-1,E=y.length;++v<E;){var S=y[v],b=r[S];(b===t||Pt(b,pr[S])&&!ue.call(r,S))&&(r[S]=g[S])}return r}),HT=X(function(r){return r.push(t,Vf),lt(Id,t,r)});function GT(r,s){return xh(r,V(s,3),Ft)}function KT(r,s){return xh(r,V(s,3),uu)}function zT(r,s){return r==null?r:au(r,V(s,3),st)}function jT(r,s){return r==null?r:sf(r,V(s,3),st)}function JT(r,s){return r&&Ft(r,V(s,3))}function YT(r,s){return r&&uu(r,V(s,3))}function XT(r){return r==null?[]:$s(r,ke(r))}function QT(r){return r==null?[]:$s(r,st(r))}function Bu(r,s,a){var l=r==null?t:Un(r,s);return l===t?a:l}function ZT(r,s){return r!=null&&qf(r,s,T0)}function $u(r,s){return r!=null&&qf(r,s,I0)}var eI=xf(function(r,s,a){s!=null&&typeof s.toString!="function"&&(s=Rs.call(s)),r[s]=a},Wu(ot)),tI=xf(function(r,s,a){s!=null&&typeof s.toString!="function"&&(s=Rs.call(s)),ue.call(r,s)?r[s].push(a):r[s]=[a]},V),nI=X(li);function ke(r){return it(r)?Xh(r):fu(r)}function st(r){return it(r)?Xh(r,!0):L0(r)}function rI(r,s){var a={};return s=V(s,3),Ft(r,function(l,f,g){Gt(a,s(l,f,g),l)}),a}function iI(r,s){var a={};return s=V(s,3),Ft(r,function(l,f,g){Gt(a,f,s(l,f,g))}),a}var sI=vr(function(r,s,a){qs(r,s,a)}),Id=vr(function(r,s,a,l){qs(r,s,a,l)}),oI=zt(function(r,s){var a={};if(r==null)return a;var l=!1;s=ge(s,function(g){return g=dn(g,r),l||(l=g.length>1),g}),Vt(r,bu(r),a),l&&(a=Ct(a,T|C|k,ew));for(var f=s.length;f--;)vu(a,s[f]);return a});function aI(r,s){return Ad(r,ro(V(s)))}var uI=zt(function(r,s){return r==null?{}:P0(r,s)});function Ad(r,s){if(r==null)return{};var a=ge(bu(r),function(l){return[l]});return s=V(s),gf(r,a,function(l,f){return s(l,f[0])})}function cI(r,s,a){s=dn(s,r);var l=-1,f=s.length;for(f||(f=1,r=t);++l<f;){var g=r==null?t:r[Bt(s[l])];g===t&&(l=f,g=a),r=Jt(g)?g.call(r):g}return r}function lI(r,s,a){return r==null?r:fi(r,s,a)}function hI(r,s,a,l){return l=typeof l=="function"?l:t,r==null?r:fi(r,s,a,l)}var Sd=Uf(ke),bd=Uf(st);function fI(r,s,a){var l=K(r),f=l||gn(r)||Er(r);if(s=V(s,4),a==null){var g=r&&r.constructor;f?a=l?new g:[]:ye(r)?a=Jt(g)?yr(Ds(r)):{}:a={}}return(f?At:Ft)(r,function(y,v,E){return s(a,y,v,E)}),a}function dI(r,s){return r==null?!0:vu(r,s)}function pI(r,s,a){return r==null?r:wf(r,s,Eu(a))}function gI(r,s,a,l){return l=typeof l=="function"?l:t,r==null?r:wf(r,s,Eu(a),l)}function Tr(r){return r==null?[]:Za(r,ke(r))}function mI(r){return r==null?[]:Za(r,st(r))}function yI(r,s,a){return a===t&&(a=s,s=t),a!==t&&(a=kt(a),a=a===a?a:0),s!==t&&(s=kt(s),s=s===s?s:0),Mn(kt(r),s,a)}function vI(r,s,a){return s=Yt(s),a===t?(a=s,s=0):a=Yt(a),r=kt(r),A0(r,s,a)}function _I(r,s,a){if(a&&typeof a!="boolean"&&Qe(r,s,a)&&(s=a=t),a===t&&(typeof s=="boolean"?(a=s,s=t):typeof r=="boolean"&&(a=r,r=t)),r===t&&s===t?(r=0,s=1):(r=Yt(r),s===t?(s=r,r=0):s=Yt(s)),r>s){var l=r;r=s,s=l}if(a||r%1||s%1){var f=Jh();return We(r+f*(s-r+Xv("1e-"+((f+"").length-1))),s)}return gu(r,s)}var wI=_r(function(r,s,a){return s=s.toLowerCase(),r+(a?Cd(s):s)});function Cd(r){return qu(ae(r).toLowerCase())}function Rd(r){return r=ae(r),r&&r.replace(Tv,l_).replace($v,"")}function EI(r,s,a){r=ae(r),s=ft(s);var l=r.length;a=a===t?l:Mn(j(a),0,l);var f=a;return a-=s.length,a>=0&&r.slice(a,f)==s}function TI(r){return r=ae(r),r&&nv.test(r)?r.replace(ih,h_):r}function II(r){return r=ae(r),r&&uv.test(r)?r.replace(Ua,"\\$&"):r}var AI=_r(function(r,s,a){return r+(a?"-":"")+s.toLowerCase()}),SI=_r(function(r,s,a){return r+(a?" ":"")+s.toLowerCase()}),bI=Df("toLowerCase");function CI(r,s,a){r=ae(r),s=j(s);var l=s?fr(r):0;if(!s||l>=s)return r;var f=(s-l)/2;return js(Ps(f),a)+r+js(xs(f),a)}function RI(r,s,a){r=ae(r),s=j(s);var l=s?fr(r):0;return s&&l<s?r+js(s-l,a):r}function NI(r,s,a){r=ae(r),s=j(s);var l=s?fr(r):0;return s&&l<s?js(s-l,a)+r:r}function kI(r,s,a){return a||s==null?s=0:s&&(s=+s),U_(ae(r).replace(Fa,""),s||0)}function DI(r,s,a){return(a?Qe(r,s,a):s===t)?s=1:s=j(s),mu(ae(r),s)}function OI(){var r=arguments,s=ae(r[0]);return r.length<3?s:s.replace(r[1],r[2])}var LI=_r(function(r,s,a){return r+(a?"_":"")+s.toLowerCase()});function xI(r,s,a){return a&&typeof a!="number"&&Qe(r,s,a)&&(s=a=t),a=a===t?Ut:a>>>0,a?(r=ae(r),r&&(typeof s=="string"||s!=null&&!Vu(s))&&(s=ft(s),!s&&hr(r))?pn(Lt(r),0,a):r.split(s,a)):[]}var PI=_r(function(r,s,a){return r+(a?" ":"")+qu(s)});function MI(r,s,a){return r=ae(r),a=a==null?0:Mn(j(a),0,r.length),s=ft(s),r.slice(a,a+s.length)==s}function UI(r,s,a){var l=d.templateSettings;a&&Qe(r,s,a)&&(s=t),r=ae(r),s=oo({},s,l,Ff);var f=oo({},s.imports,l.imports,Ff),g=ke(f),y=Za(f,g),v,E,S=0,b=s.interpolate||_s,R="__p += '",D=tu((s.escape||_s).source+"|"+b.source+"|"+(b===sh?mv:_s).source+"|"+(s.evaluate||_s).source+"|$","g"),M="//# sourceURL="+(ue.call(s,"sourceURL")?(s.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Kv+"]")+`
`;r.replace(D,function($,Q,ne,pt,Ze,gt){return ne||(ne=pt),R+=r.slice(S,gt).replace(Iv,f_),Q&&(v=!0,R+=`' +
__e(`+Q+`) +
'`),Ze&&(E=!0,R+=`';
`+Ze+`;
__p += '`),ne&&(R+=`' +
((__t = (`+ne+`)) == null ? '' : __t) +
'`),S=gt+$.length,$}),R+=`';
`;var B=ue.call(s,"variable")&&s.variable;if(!B)R=`with (obj) {
`+R+`
}
`;else if(pv.test(B))throw new H(h);R=(E?R.replace(Qy,""):R).replace(Zy,"$1").replace(ev,"$1;"),R="function("+(B||"obj")+`) {
`+(B?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(v?", __e = _.escape":"")+(E?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+R+`return __p
}`;var Y=kd(function(){return se(g,M+"return "+R).apply(t,y)});if(Y.source=R,Fu(Y))throw Y;return Y}function FI(r){return ae(r).toLowerCase()}function VI(r){return ae(r).toUpperCase()}function BI(r,s,a){if(r=ae(r),r&&(a||s===t))return Fh(r);if(!r||!(s=ft(s)))return r;var l=Lt(r),f=Lt(s),g=Vh(l,f),y=Bh(l,f)+1;return pn(l,g,y).join("")}function $I(r,s,a){if(r=ae(r),r&&(a||s===t))return r.slice(0,qh(r)+1);if(!r||!(s=ft(s)))return r;var l=Lt(r),f=Bh(l,Lt(s))+1;return pn(l,0,f).join("")}function qI(r,s,a){if(r=ae(r),r&&(a||s===t))return r.replace(Fa,"");if(!r||!(s=ft(s)))return r;var l=Lt(r),f=Vh(l,Lt(s));return pn(l,f).join("")}function WI(r,s){var a=Ca,l=Uy;if(ye(s)){var f="separator"in s?s.separator:f;a="length"in s?j(s.length):a,l="omission"in s?ft(s.omission):l}r=ae(r);var g=r.length;if(hr(r)){var y=Lt(r);g=y.length}if(a>=g)return r;var v=a-fr(l);if(v<1)return l;var E=y?pn(y,0,v).join(""):r.slice(0,v);if(f===t)return E+l;if(y&&(v+=E.length-v),Vu(f)){if(r.slice(v).search(f)){var S,b=E;for(f.global||(f=tu(f.source,ae(oh.exec(f))+"g")),f.lastIndex=0;S=f.exec(b);)var R=S.index;E=E.slice(0,R===t?v:R)}}else if(r.indexOf(ft(f),v)!=v){var D=E.lastIndexOf(f);D>-1&&(E=E.slice(0,D))}return E+l}function HI(r){return r=ae(r),r&&tv.test(r)?r.replace(rh,__):r}var GI=_r(function(r,s,a){return r+(a?" ":"")+s.toUpperCase()}),qu=Df("toUpperCase");function Nd(r,s,a){return r=ae(r),s=a?t:s,s===t?p_(r)?T_(r):s_(r):r.match(s)||[]}var kd=X(function(r,s){try{return lt(r,t,s)}catch(a){return Fu(a)?a:new H(a)}}),KI=zt(function(r,s){return At(s,function(a){a=Bt(a),Gt(r,a,Mu(r[a],r))}),r});function zI(r){var s=r==null?0:r.length,a=V();return r=s?ge(r,function(l){if(typeof l[1]!="function")throw new St(c);return[a(l[0]),l[1]]}):[],X(function(l){for(var f=-1;++f<s;){var g=r[f];if(lt(g[0],this,l))return lt(g[1],this,l)}})}function jI(r){return _0(Ct(r,T))}function Wu(r){return function(){return r}}function JI(r,s){return r==null||r!==r?s:r}var YI=Lf(),XI=Lf(!0);function ot(r){return r}function Hu(r){return cf(typeof r=="function"?r:Ct(r,T))}function QI(r){return hf(Ct(r,T))}function ZI(r,s){return ff(r,Ct(s,T))}var eA=X(function(r,s){return function(a){return li(a,r,s)}}),tA=X(function(r,s){return function(a){return li(r,a,s)}});function Gu(r,s,a){var l=ke(s),f=$s(s,l);a==null&&!(ye(s)&&(f.length||!l.length))&&(a=s,s=r,r=this,f=$s(s,ke(s)));var g=!(ye(a)&&"chain"in a)||!!a.chain,y=Jt(r);return At(f,function(v){var E=s[v];r[v]=E,y&&(r.prototype[v]=function(){var S=this.__chain__;if(g||S){var b=r(this.__wrapped__),R=b.__actions__=rt(this.__actions__);return R.push({func:E,args:arguments,thisArg:r}),b.__chain__=S,b}return E.apply(r,un([this.value()],arguments))})}),r}function nA(){return xe._===this&&(xe._=R_),this}function Ku(){}function rA(r){return r=j(r),X(function(s){return df(s,r)})}var iA=Iu(ge),sA=Iu(Lh),oA=Iu(ja);function Dd(r){return ku(r)?Ja(Bt(r)):M0(r)}function aA(r){return function(s){return r==null?t:Un(r,s)}}var uA=Pf(),cA=Pf(!0);function zu(){return[]}function ju(){return!1}function lA(){return{}}function hA(){return""}function fA(){return!0}function dA(r,s){if(r=j(r),r<1||r>on)return[];var a=Ut,l=We(r,Ut);s=V(s),r-=Ut;for(var f=Qa(l,s);++a<r;)s(a);return f}function pA(r){return K(r)?ge(r,Bt):dt(r)?[r]:rt(Xf(ae(r)))}function gA(r){var s=++b_;return ae(r)+s}var mA=zs(function(r,s){return r+s},0),yA=Au("ceil"),vA=zs(function(r,s){return r/s},1),_A=Au("floor");function wA(r){return r&&r.length?Bs(r,ot,cu):t}function EA(r,s){return r&&r.length?Bs(r,V(s,2),cu):t}function TA(r){return Mh(r,ot)}function IA(r,s){return Mh(r,V(s,2))}function AA(r){return r&&r.length?Bs(r,ot,du):t}function SA(r,s){return r&&r.length?Bs(r,V(s,2),du):t}var bA=zs(function(r,s){return r*s},1),CA=Au("round"),RA=zs(function(r,s){return r-s},0);function NA(r){return r&&r.length?Xa(r,ot):0}function kA(r,s){return r&&r.length?Xa(r,V(s,2)):0}return d.after=QE,d.ary=ud,d.assign=VT,d.assignIn=Td,d.assignInWith=oo,d.assignWith=BT,d.at=$T,d.before=cd,d.bind=Mu,d.bindAll=KI,d.bindKey=ld,d.castArray=lT,d.chain=sd,d.chunk=_w,d.compact=ww,d.concat=Ew,d.cond=zI,d.conforms=jI,d.constant=Wu,d.countBy=NE,d.create=qT,d.curry=hd,d.curryRight=fd,d.debounce=dd,d.defaults=WT,d.defaultsDeep=HT,d.defer=ZE,d.delay=eT,d.difference=Tw,d.differenceBy=Iw,d.differenceWith=Aw,d.drop=Sw,d.dropRight=bw,d.dropRightWhile=Cw,d.dropWhile=Rw,d.fill=Nw,d.filter=DE,d.flatMap=xE,d.flatMapDeep=PE,d.flatMapDepth=ME,d.flatten=td,d.flattenDeep=kw,d.flattenDepth=Dw,d.flip=tT,d.flow=YI,d.flowRight=XI,d.fromPairs=Ow,d.functions=XT,d.functionsIn=QT,d.groupBy=UE,d.initial=xw,d.intersection=Pw,d.intersectionBy=Mw,d.intersectionWith=Uw,d.invert=eI,d.invertBy=tI,d.invokeMap=VE,d.iteratee=Hu,d.keyBy=BE,d.keys=ke,d.keysIn=st,d.map=eo,d.mapKeys=rI,d.mapValues=iI,d.matches=QI,d.matchesProperty=ZI,d.memoize=no,d.merge=sI,d.mergeWith=Id,d.method=eA,d.methodOf=tA,d.mixin=Gu,d.negate=ro,d.nthArg=rA,d.omit=oI,d.omitBy=aI,d.once=nT,d.orderBy=$E,d.over=iA,d.overArgs=rT,d.overEvery=sA,d.overSome=oA,d.partial=Uu,d.partialRight=pd,d.partition=qE,d.pick=uI,d.pickBy=Ad,d.property=Dd,d.propertyOf=aA,d.pull=$w,d.pullAll=rd,d.pullAllBy=qw,d.pullAllWith=Ww,d.pullAt=Hw,d.range=uA,d.rangeRight=cA,d.rearg=iT,d.reject=GE,d.remove=Gw,d.rest=sT,d.reverse=xu,d.sampleSize=zE,d.set=lI,d.setWith=hI,d.shuffle=jE,d.slice=Kw,d.sortBy=XE,d.sortedUniq=Zw,d.sortedUniqBy=eE,d.split=xI,d.spread=oT,d.tail=tE,d.take=nE,d.takeRight=rE,d.takeRightWhile=iE,d.takeWhile=sE,d.tap=wE,d.throttle=aT,d.thru=Zs,d.toArray=_d,d.toPairs=Sd,d.toPairsIn=bd,d.toPath=pA,d.toPlainObject=Ed,d.transform=fI,d.unary=uT,d.union=oE,d.unionBy=aE,d.unionWith=uE,d.uniq=cE,d.uniqBy=lE,d.uniqWith=hE,d.unset=dI,d.unzip=Pu,d.unzipWith=id,d.update=pI,d.updateWith=gI,d.values=Tr,d.valuesIn=mI,d.without=fE,d.words=Nd,d.wrap=cT,d.xor=dE,d.xorBy=pE,d.xorWith=gE,d.zip=mE,d.zipObject=yE,d.zipObjectDeep=vE,d.zipWith=_E,d.entries=Sd,d.entriesIn=bd,d.extend=Td,d.extendWith=oo,Gu(d,d),d.add=mA,d.attempt=kd,d.camelCase=wI,d.capitalize=Cd,d.ceil=yA,d.clamp=yI,d.clone=hT,d.cloneDeep=dT,d.cloneDeepWith=pT,d.cloneWith=fT,d.conformsTo=gT,d.deburr=Rd,d.defaultTo=JI,d.divide=vA,d.endsWith=EI,d.eq=Pt,d.escape=TI,d.escapeRegExp=II,d.every=kE,d.find=OE,d.findIndex=Zf,d.findKey=GT,d.findLast=LE,d.findLastIndex=ed,d.findLastKey=KT,d.floor=_A,d.forEach=od,d.forEachRight=ad,d.forIn=zT,d.forInRight=jT,d.forOwn=JT,d.forOwnRight=YT,d.get=Bu,d.gt=mT,d.gte=yT,d.has=ZT,d.hasIn=$u,d.head=nd,d.identity=ot,d.includes=FE,d.indexOf=Lw,d.inRange=vI,d.invoke=nI,d.isArguments=Bn,d.isArray=K,d.isArrayBuffer=vT,d.isArrayLike=it,d.isArrayLikeObject=_e,d.isBoolean=_T,d.isBuffer=gn,d.isDate=wT,d.isElement=ET,d.isEmpty=TT,d.isEqual=IT,d.isEqualWith=AT,d.isError=Fu,d.isFinite=ST,d.isFunction=Jt,d.isInteger=gd,d.isLength=io,d.isMap=md,d.isMatch=bT,d.isMatchWith=CT,d.isNaN=RT,d.isNative=NT,d.isNil=DT,d.isNull=kT,d.isNumber=yd,d.isObject=ye,d.isObjectLike=ve,d.isPlainObject=mi,d.isRegExp=Vu,d.isSafeInteger=OT,d.isSet=vd,d.isString=so,d.isSymbol=dt,d.isTypedArray=Er,d.isUndefined=LT,d.isWeakMap=xT,d.isWeakSet=PT,d.join=Fw,d.kebabCase=AI,d.last=Nt,d.lastIndexOf=Vw,d.lowerCase=SI,d.lowerFirst=bI,d.lt=MT,d.lte=UT,d.max=wA,d.maxBy=EA,d.mean=TA,d.meanBy=IA,d.min=AA,d.minBy=SA,d.stubArray=zu,d.stubFalse=ju,d.stubObject=lA,d.stubString=hA,d.stubTrue=fA,d.multiply=bA,d.nth=Bw,d.noConflict=nA,d.noop=Ku,d.now=to,d.pad=CI,d.padEnd=RI,d.padStart=NI,d.parseInt=kI,d.random=_I,d.reduce=WE,d.reduceRight=HE,d.repeat=DI,d.replace=OI,d.result=cI,d.round=CA,d.runInContext=w,d.sample=KE,d.size=JE,d.snakeCase=LI,d.some=YE,d.sortedIndex=zw,d.sortedIndexBy=jw,d.sortedIndexOf=Jw,d.sortedLastIndex=Yw,d.sortedLastIndexBy=Xw,d.sortedLastIndexOf=Qw,d.startCase=PI,d.startsWith=MI,d.subtract=RA,d.sum=NA,d.sumBy=kA,d.template=UI,d.times=dA,d.toFinite=Yt,d.toInteger=j,d.toLength=wd,d.toLower=FI,d.toNumber=kt,d.toSafeInteger=FT,d.toString=ae,d.toUpper=VI,d.trim=BI,d.trimEnd=$I,d.trimStart=qI,d.truncate=WI,d.unescape=HI,d.uniqueId=gA,d.upperCase=GI,d.upperFirst=qu,d.each=od,d.eachRight=ad,d.first=nd,Gu(d,function(){var r={};return Ft(d,function(s,a){ue.call(d.prototype,a)||(r[a]=s)}),r}(),{chain:!1}),d.VERSION=i,At(["bind","bindKey","curry","curryRight","partial","partialRight"],function(r){d[r].placeholder=d}),At(["drop","take"],function(r,s){Z.prototype[r]=function(a){a=a===t?1:Re(j(a),0);var l=this.__filtered__&&!s?new Z(this):this.clone();return l.__filtered__?l.__takeCount__=We(a,l.__takeCount__):l.__views__.push({size:We(a,Ut),type:r+(l.__dir__<0?"Right":"")}),l},Z.prototype[r+"Right"]=function(a){return this.reverse()[r](a).reverse()}}),At(["filter","map","takeWhile"],function(r,s){var a=s+1,l=a==eh||a==$y;Z.prototype[r]=function(f){var g=this.clone();return g.__iteratees__.push({iteratee:V(f,3),type:a}),g.__filtered__=g.__filtered__||l,g}}),At(["head","last"],function(r,s){var a="take"+(s?"Right":"");Z.prototype[r]=function(){return this[a](1).value()[0]}}),At(["initial","tail"],function(r,s){var a="drop"+(s?"":"Right");Z.prototype[r]=function(){return this.__filtered__?new Z(this):this[a](1)}}),Z.prototype.compact=function(){return this.filter(ot)},Z.prototype.find=function(r){return this.filter(r).head()},Z.prototype.findLast=function(r){return this.reverse().find(r)},Z.prototype.invokeMap=X(function(r,s){return typeof r=="function"?new Z(this):this.map(function(a){return li(a,r,s)})}),Z.prototype.reject=function(r){return this.filter(ro(V(r)))},Z.prototype.slice=function(r,s){r=j(r);var a=this;return a.__filtered__&&(r>0||s<0)?new Z(a):(r<0?a=a.takeRight(-r):r&&(a=a.drop(r)),s!==t&&(s=j(s),a=s<0?a.dropRight(-s):a.take(s-r)),a)},Z.prototype.takeRightWhile=function(r){return this.reverse().takeWhile(r).reverse()},Z.prototype.toArray=function(){return this.take(Ut)},Ft(Z.prototype,function(r,s){var a=/^(?:filter|find|map|reject)|While$/.test(s),l=/^(?:head|last)$/.test(s),f=d[l?"take"+(s=="last"?"Right":""):s],g=l||/^find/.test(s);!f||(d.prototype[s]=function(){var y=this.__wrapped__,v=l?[1]:arguments,E=y instanceof Z,S=v[0],b=E||K(y),R=function(Q){var ne=f.apply(d,un([Q],v));return l&&D?ne[0]:ne};b&&a&&typeof S=="function"&&S.length!=1&&(E=b=!1);var D=this.__chain__,M=!!this.__actions__.length,B=g&&!D,Y=E&&!M;if(!g&&b){y=Y?y:new Z(this);var $=r.apply(y,v);return $.__actions__.push({func:Zs,args:[R],thisArg:t}),new bt($,D)}return B&&Y?r.apply(this,v):($=this.thru(R),B?l?$.value()[0]:$.value():$)})}),At(["pop","push","shift","sort","splice","unshift"],function(r){var s=Ss[r],a=/^(?:push|sort|unshift)$/.test(r)?"tap":"thru",l=/^(?:pop|shift)$/.test(r);d.prototype[r]=function(){var f=arguments;if(l&&!this.__chain__){var g=this.value();return s.apply(K(g)?g:[],f)}return this[a](function(y){return s.apply(K(y)?y:[],f)})}}),Ft(Z.prototype,function(r,s){var a=d[s];if(a){var l=a.name+"";ue.call(mr,l)||(mr[l]=[]),mr[l].push({name:s,func:a})}}),mr[Ks(t,Te).name]=[{name:"wrapper",func:t}],Z.prototype.clone=H_,Z.prototype.reverse=G_,Z.prototype.value=K_,d.prototype.at=EE,d.prototype.chain=TE,d.prototype.commit=IE,d.prototype.next=AE,d.prototype.plant=bE,d.prototype.reverse=CE,d.prototype.toJSON=d.prototype.valueOf=d.prototype.value=RE,d.prototype.first=d.prototype.head,ri&&(d.prototype[ri]=SE),d},dr=I_();On?((On.exports=dr)._=dr,Ha._=dr):xe._=dr}).call(ds)})(Zl,Zl.exports);var JD=Zl.exports;export{hD as $,LD as A,XA as B,DA as C,FD as D,RD as E,oD as F,uD as G,cD as H,aD as I,sD as J,GD as K,jD as L,qD as M,BD as N,WD as O,VD as P,BA as Q,Ir as R,UD as S,KD as T,$D as U,zD as V,Ud as W,wD as X,pD as Y,yi as Z,TD as _,WA as a,SD as a0,JD as a1,gD as a2,CD as a3,HD as a4,mD as b,yD as c,$A as d,qA as e,ED as f,lD as g,KA as h,MD as i,_D as j,fD as k,dD as l,vD as m,ND as n,DD as o,kD as p,JA as q,bD as r,LA as s,Ju as t,AD as u,ID as v,xD as w,PD as x,YA as y,OD as z};
