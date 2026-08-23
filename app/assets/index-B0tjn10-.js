(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();const Qt=globalThis,Kr=Qt.ShadowRoot&&(Qt.ShadyCSS===void 0||Qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Vr=Symbol(),as=new WeakMap;let ai=class{constructor(e,r,s){if(this._$cssResult$=!0,s!==Vr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(Kr&&e===void 0){const s=r!==void 0&&r.length===1;s&&(e=as.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&as.set(r,e))}return e}toString(){return this.cssText}};const Zi=t=>new ai(typeof t=="string"?t:t+"",void 0,Vr),O=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((s,i,n)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new ai(r,t,Vr)},Qi=(t,e)=>{if(Kr)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const s=document.createElement("style"),i=Qt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=r.cssText,t.appendChild(s)}},os=Kr?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const s of e.cssRules)r+=s.cssText;return Zi(r)})(t):t;const{is:en,defineProperty:tn,getOwnPropertyDescriptor:rn,getOwnPropertyNames:sn,getOwnPropertySymbols:nn,getPrototypeOf:an}=Object,br=globalThis,ls=br.trustedTypes,on=ls?ls.emptyScript:"",ln=br.reactiveElementPolyfillSupport,gt=(t,e)=>t,sr={toAttribute(t,e){switch(e){case Boolean:t=t?on:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Wr=(t,e)=>!en(t,e),cs={attribute:!0,type:String,converter:sr,reflect:!1,useDefault:!1,hasChanged:Wr};Symbol.metadata??=Symbol("metadata"),br.litPropertyMetadata??=new WeakMap;let Je=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=cs){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,r);i!==void 0&&tn(this.prototype,e,i)}}static getPropertyDescriptor(e,r,s){const{get:i,set:n}=rn(this.prototype,e)??{get(){return this[r]},set(a){this[r]=a}};return{get:i,set(a){const o=i?.call(this);n?.call(this,a),this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??cs}static _$Ei(){if(this.hasOwnProperty(gt("elementProperties")))return;const e=an(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gt("properties"))){const r=this.properties,s=[...sn(r),...nn(r)];for(const i of s)this.createProperty(i,r[i])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[s,i]of r)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[r,s]of this.elementProperties){const i=this._$Eu(r,s);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)r.unshift(os(i))}else e!==void 0&&r.push(os(e));return r}static _$Eu(e,r){const s=r.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const s of r.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qi(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,s){this._$AK(e,s)}_$ET(e,r){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:sr).toAttribute(r,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,r){const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:sr;this._$Em=i;const o=a.fromAttribute(r,n.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,r,s,i=!1,n){if(e!==void 0){const a=this.constructor;if(i===!1&&(n=this[e]),s??=a.getPropertyOptions(e),!((s.hasChanged??Wr)(n,r)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,r,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:s,reflect:i,wrapped:n},a){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??r??this[e]),n!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(r=void 0),this._$AL.set(e,r)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s){const{wrapped:a}=n,o=this[i];a!==!0||this._$AL.has(i)||o===void 0||this.C(i,void 0,n,o)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(r)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}};Je.elementStyles=[],Je.shadowRootOptions={mode:"open"},Je[gt("elementProperties")]=new Map,Je[gt("finalized")]=new Map,ln?.({ReactiveElement:Je}),(br.reactiveElementVersions??=[]).push("2.1.2");const Gr=globalThis,us=t=>t,ir=Gr.trustedTypes,hs=ir?ir.createPolicy("lit-html",{createHTML:t=>t}):void 0,oi="$lit$",_e=`lit$${Math.random().toFixed(9).slice(2)}$`,li="?"+_e,cn=`<${li}>`,Ne=document,vt=()=>Ne.createComment(""),yt=t=>t===null||typeof t!="object"&&typeof t!="function",Jr=Array.isArray,un=t=>Jr(t)||typeof t?.[Symbol.iterator]=="function",xr=`[ 	
\f\r]`,ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ds=/-->/g,fs=/>/g,Ce=RegExp(`>|${xr}(?:([^\\s"'>=/]+)(${xr}*=${xr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ps=/'/g,ms=/"/g,ci=/^(?:script|style|textarea|title)$/i,hn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),f=hn(1),tt=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),gs=new WeakMap,Ie=Ne.createTreeWalker(Ne,129);function ui(t,e){if(!Jr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return hs!==void 0?hs.createHTML(e):e}const dn=(t,e)=>{const r=t.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",a=ut;for(let o=0;o<r;o++){const l=t[o];let c,h,u=-1,p=0;for(;p<l.length&&(a.lastIndex=p,h=a.exec(l),h!==null);)p=a.lastIndex,a===ut?h[1]==="!--"?a=ds:h[1]!==void 0?a=fs:h[2]!==void 0?(ci.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=Ce):h[3]!==void 0&&(a=Ce):a===Ce?h[0]===">"?(a=i??ut,u=-1):h[1]===void 0?u=-2:(u=a.lastIndex-h[2].length,c=h[1],a=h[3]===void 0?Ce:h[3]==='"'?ms:ps):a===ms||a===ps?a=Ce:a===ds||a===fs?a=ut:(a=Ce,i=void 0);const d=a===Ce&&t[o+1].startsWith("/>")?" ":"";n+=a===ut?l+cn:u>=0?(s.push(c),l.slice(0,u)+oi+l.slice(u)+_e+d):l+_e+(u===-2?o:d)}return[ui(t,n+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class wt{constructor({strings:e,_$litType$:r},s){let i;this.parts=[];let n=0,a=0;const o=e.length-1,l=this.parts,[c,h]=dn(e,r);if(this.el=wt.createElement(c,s),Ie.currentNode=this.el.content,r===2||r===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=Ie.nextNode())!==null&&l.length<o;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(oi)){const p=h[a++],d=i.getAttribute(u).split(_e),g=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:g[2],strings:d,ctor:g[1]==="."?pn:g[1]==="?"?mn:g[1]==="@"?gn:vr}),i.removeAttribute(u)}else u.startsWith(_e)&&(l.push({type:6,index:n}),i.removeAttribute(u));if(ci.test(i.tagName)){const u=i.textContent.split(_e),p=u.length-1;if(p>0){i.textContent=ir?ir.emptyScript:"";for(let d=0;d<p;d++)i.append(u[d],vt()),Ie.nextNode(),l.push({type:2,index:++n});i.append(u[p],vt())}}}else if(i.nodeType===8)if(i.data===li)l.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(_e,u+1))!==-1;)l.push({type:7,index:n}),u+=_e.length-1}n++}}static createElement(e,r){const s=Ne.createElement("template");return s.innerHTML=e,s}}function rt(t,e,r=t,s){if(e===tt)return e;let i=s!==void 0?r._$Co?.[s]:r._$Cl;const n=yt(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(t),i._$AT(t,r,s)),s!==void 0?(r._$Co??=[])[s]=i:r._$Cl=i),i!==void 0&&(e=rt(t,i._$AS(t,e.values),i,s)),e}class fn{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:s}=this._$AD,i=(e?.creationScope??Ne).importNode(r,!0);Ie.currentNode=i;let n=Ie.nextNode(),a=0,o=0,l=s[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new jt(n,n.nextSibling,this,e):l.type===1?c=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(c=new bn(n,this,e)),this._$AV.push(c),l=s[++o]}a!==l?.index&&(n=Ie.nextNode(),a++)}return Ie.currentNode=Ne,i}p(e){let r=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}}class jt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,i){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=rt(this,e,r),yt(e)?e===M||e==null||e===""?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==tt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):un(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==M&&yt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ne.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=wt.createElement(ui(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(r);else{const n=new fn(i,this),a=n.u(this.options);n.p(r),this.T(a),this._$AH=n}}_$AC(e){let r=gs.get(e.strings);return r===void 0&&gs.set(e.strings,r=new wt(e)),r}k(e){Jr(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let s,i=0;for(const n of e)i===r.length?r.push(s=new jt(this.O(vt()),this.O(vt()),this,this.options)):s=r[i],s._$AI(n),i++;i<r.length&&(this._$AR(s&&s._$AB.nextSibling,i),r.length=i)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const s=us(e).nextSibling;us(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class vr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,i,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=r,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=M}_$AI(e,r=this,s,i){const n=this.strings;let a=!1;if(n===void 0)e=rt(this,e,r,0),a=!yt(e)||e!==this._$AH&&e!==tt,a&&(this._$AH=e);else{const o=e;let l,c;for(e=n[0],l=0;l<n.length-1;l++)c=rt(this,o[s+l],r,l),c===tt&&(c=this._$AH[l]),a||=!yt(c)||c!==this._$AH[l],c===M?e=M:e!==M&&(e+=(c??"")+n[l+1]),this._$AH[l]=c}a&&!i&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class pn extends vr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}}class mn extends vr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==M)}}class gn extends vr{constructor(e,r,s,i,n){super(e,r,s,i,n),this.type=5}_$AI(e,r=this){if((e=rt(this,e,r,0)??M)===tt)return;const s=this._$AH,i=e===M&&s!==M||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==M&&(s===M||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class bn{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){rt(this,e)}}const vn=Gr.litHtmlPolyfillSupport;vn?.(wt,jt),(Gr.litHtmlVersions??=[]).push("3.3.3");const yn=(t,e,r)=>{const s=r?.renderBefore??e;let i=s._$litPart$;if(i===void 0){const n=r?.renderBefore??null;s._$litPart$=i=new jt(e.insertBefore(vt(),n),n,void 0,r??{})}return i._$AI(t),i};const Yr=globalThis;class A extends Je{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yn(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}}A._$litElement$=!0,A.finalized=!0,Yr.litElementHydrateSupport?.({LitElement:A});const wn=Yr.litElementPolyfillSupport;wn?.({LitElement:A});(Yr.litElementVersions??=[]).push("4.2.2");const R=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const _n={attribute:!0,type:String,converter:sr,reflect:!1,hasChanged:Wr},$n=(t=_n,e,r)=>{const{kind:s,metadata:i}=r;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),s==="accessor"){const{name:a}=r;return{set(o){const l=e.get.call(this);e.set.call(this,o),this.requestUpdate(a,l,t,!0,o)},init(o){return o!==void 0&&this.C(a,void 0,t,o),o}}}if(s==="setter"){const{name:a}=r;return function(o){const l=this[a];e.call(this,o),this.requestUpdate(a,l,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};function j(t){return(e,r)=>typeof r=="object"?$n(t,e,r):((s,i,n)=>{const a=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),a?Object.getOwnPropertyDescriptor(i,n):void 0})(t,e,r)}function m(t){return j({...t,state:!0,attribute:!1})}class Sn{constructor(){this.state={status:"loading"},this.listeners=new Set}getState(){return this.state}setState(e){this.state=e;for(const r of this.listeners)r(e)}subscribe(e){return this.listeners.add(e),e(this.state),()=>this.listeners.delete(e)}}const nr=new Sn,kn=Symbol.for("@supabase/supabase-js.traceContextExtractor");function En(){return globalThis[kn]}function yr(t,e){var r={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(t);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(r[s[i]]=t[s[i]]);return r}function xn(t,e,r,s){function i(n){return n instanceof r?n:new r(function(a){a(n)})}return new(r||(r=Promise))(function(n,a){function o(h){try{c(s.next(h))}catch(u){a(u)}}function l(h){try{c(s.throw(h))}catch(u){a(u)}}function c(h){h.done?n(h.value):i(h.value).then(o,l)}c((s=s.apply(t,e||[])).next())})}const Tn=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class Xr extends Error{constructor(e,r="FunctionsError",s){super(e),this.name=r,this.context=s}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class An extends Xr{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class bs extends Xr{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class vs extends Xr{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var jr;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(jr||(jr={}));class Cn{constructor(e,{headers:r={},customFetch:s,region:i=jr.Any}={}){this.url=e,this.headers=r,this.region=i,this.fetch=Tn(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return xn(this,arguments,void 0,function*(r,s={}){var i,n;let a,o,l;try{const{headers:c,method:h,body:u,signal:p,timeout:d}=s;let g={},{region:b}=s;b||(b=this.region);const y=new URL(`${this.url}/${r}`);b&&b!=="any"&&(g["x-region"]=b,y.searchParams.set("forceFunctionRegion",b));let w;const S=!!c&&Object.keys(c).some(ct=>ct.toLowerCase()==="content-type");u&&!S?typeof Blob<"u"&&u instanceof Blob||u instanceof ArrayBuffer?(g["Content-Type"]="application/octet-stream",w=u):typeof u=="string"?(g["Content-Type"]="text/plain",w=u):typeof FormData<"u"&&u instanceof FormData?w=u:(g["Content-Type"]="application/json",w=JSON.stringify(u)):u&&typeof u!="string"&&!(typeof Blob<"u"&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<"u"&&u instanceof FormData)?w=JSON.stringify(u):w=u;let _=p;d&&(o=new AbortController,a=setTimeout(()=>o.abort(),d),p?(_=o.signal,l=()=>o.abort(),p.addEventListener("abort",l)):_=o.signal);const x=yield this.fetch(y.toString(),{method:h||"POST",headers:Object.assign(Object.assign(Object.assign({},g),this.headers),c),body:w,signal:_}).catch(ct=>{throw new An(ct)}),H=x.headers.get("x-relay-error");if(H&&H==="true")throw new bs(x);if(!x.ok)throw new vs(x);let T=((i=x.headers.get("Content-Type"))!==null&&i!==void 0?i:"text/plain").split(";")[0].trim().toLowerCase(),P;return T==="application/json"?P=yield x.json():T==="application/octet-stream"||T==="application/pdf"?P=yield x.blob():T==="text/event-stream"?P=x:T==="multipart/form-data"?P=yield x.formData():P=yield x.text(),{data:P,error:null,response:x}}catch(c){return{data:null,error:c,response:c instanceof vs||c instanceof bs?c.context:void 0}}finally{a&&clearTimeout(a),l&&((n=s.signal)===null||n===void 0||n.removeEventListener("abort",l))}})}}const hi=3,ys=t=>Math.min(1e3*2**t,3e4),On=[520,503],di=["GET","HEAD","OPTIONS"];var Tr=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function _t(t){"@babel/helpers - typeof";return _t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_t(t)}function Rn(t,e){if(_t(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(_t(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Pn(t){var e=Rn(t,"string");return _t(e)=="symbol"?e:e+""}function In(t,e,r){return(e=Pn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function ws(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function Ze(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?ws(Object(r),!0).forEach(function(s){In(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ws(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}function _s(t,e){return new Promise(r=>{if(e?.aborted){r();return}const s=setTimeout(()=>{e?.removeEventListener("abort",i),r()},t);function i(){clearTimeout(s),r()}e?.addEventListener("abort",i)})}function jn(t,e,r,s){return!(!s||r>=hi||!di.includes(t)||!On.includes(e))}var Dn=class{constructor(t){var e,r,s,i,n;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(s=t.shouldStripNulls)!==null&&s!==void 0?s:!1,this.urlLengthLimit=(i=t.urlLengthLimit)!==null&&i!==void 0?i:8e3,this.retryEnabled=(n=t.retry)!==null&&n!==void 0?n:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const a=this.headers.get("Accept");a==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!a||a==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const s=this.fetch;let n=(async()=>{let a=0;for(;;){const c={};r.headers.forEach((u,p)=>{c[p]=u}),a>0&&(c["X-Retry-Count"]=String(a));let h;try{h=await s(r.url.toString(),{method:r.method,headers:c,body:JSON.stringify(r.body,(u,p)=>typeof p=="bigint"?p.toString():p),signal:r.signal})}catch(u){if(u?.name==="AbortError"||u?.code==="ABORT_ERR"||!di.includes(r.method))throw u;if(r.retryEnabled&&a<hi){const p=ys(a);a++,await _s(p,r.signal);continue}throw u}if(jn(r.method,h.status,a,r.retryEnabled)){var o,l;const u=(o=(l=h.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,p=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:ys(a);await h.text(),a++,await _s(p,r.signal);continue}return await r.processResponse(h)}})();return this.shouldThrowOnError||(n=n.catch(a=>{var o;let l="",c="",h="";const u=a?.cause;if(u){var p,d,g,b;const S=(p=u?.message)!==null&&p!==void 0?p:"",_=(d=u?.code)!==null&&d!==void 0?d:"";l=`${(g=a?.name)!==null&&g!==void 0?g:"FetchError"}: ${a?.message}`,l+=`

Caused by: ${(b=u?.name)!==null&&b!==void 0?b:"Error"}: ${S}`,_&&(l+=` (${_})`),u?.stack&&(l+=`
${u.stack}`)}else{var y;l=(y=a?.stack)!==null&&y!==void 0?y:""}const w=this.url.toString().length;return a?.name==="AbortError"||a?.code==="ABORT_ERR"?(h="",c="Request was aborted (timeout or manual cancellation)",w>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${w} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(u?.name==="HeadersOverflowError"||u?.code==="UND_ERR_HEADERS_OVERFLOW")&&(h="",c="HTTP headers exceeded server limits (typically 16KB)",w>this.urlLengthLimit&&(c+=`. Your request URL is ${w} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=a?.name)!==null&&o!==void 0?o:"FetchError"}: ${a?.message}`,details:l,hint:c,code:h},data:null,count:null,status:0,statusText:""}})),n.then(t,e)}async processResponse(t){var e=this;let r=null,s=null,i=null,n=t.status,a=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const d=await t.text();if(d!=="")if(e.headers.get("Accept")==="text/csv")s=d;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))s=d;else try{s=JSON.parse(d)}catch{if(r={message:d},s=null,e.shouldThrowOnError)throw new Tr({message:d,details:"",hint:"",code:""})}}const u=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),p=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(u&&p&&p.length>1&&(i=parseInt(p[1])),e.isMaybeSingle&&Array.isArray(s))if(s.length>1){if(r={code:"PGRST116",details:`Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},s=null,i=null,n=406,a="Not Acceptable",e.shouldThrowOnError){var h;throw new Tr(Ze(Ze({},r),{},{hint:(h=r.hint)!==null&&h!==void 0?h:""}))}}else s.length===1?s=s[0]:s=null}else{const u=await t.text();try{r=JSON.parse(u),Array.isArray(r)&&t.status===404&&(s=[],r=null,n=200,a="OK")}catch{t.status===404&&u===""?(n=204,a="No Content"):r={message:u}}if(r&&e.shouldThrowOnError)throw new Tr(r)}return{success:r===null,error:r,data:s,count:i,status:n,statusText:a}}returns(){return this}overrideTypes(){return this}},Nn=class extends Dn{throwOnError(){return super.throwOnError()}select(t){let e=!1;const r=(t??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:s,referencedTable:i=s}={}){const n=i?`${i}.order`:"order",a=this.url.searchParams.get(n);return this.url.searchParams.set(n,`${a?`${a},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const s=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:s=r}={}){const i=typeof s>"u"?"offset":`${s}.offset`,n=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${t}`),this.url.searchParams.set(n,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:s=!1,wal:i=!1,format:n="text"}={}){var a;const o=[t?"analyze":null,e?"verbose":null,r?"settings":null,s?"buffers":null,i?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.get("Accept"))!==null&&a!==void 0?a:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${n}; for="${l}"; options=${o};`),n==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const $s=new RegExp("[,()]");var Ye=class extends Nn{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&$s.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&$s.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:s}={}){let i="";s==="plain"?i="pl":s==="phrase"?i="ph":s==="websearch"&&(i="w");const n=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${i}fts${n}.${e}`),this}match(t){return Object.entries(t).filter(([e,r])=>r!==void 0).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},Ln=class{constructor(t,{headers:e={},schema:r,fetch:s,urlLengthLimit:i=8e3,retry:n}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=s,this.urlLengthLimit=i,this.retry=n}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:s}=e??{},i=r?"HEAD":"GET";let n=!1;const a=(t??"*").split("").map(c=>/\s/.test(c)&&!n?"":(c==='"'&&(n=!n),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",a),s&&l.append("Prefer",`count=${s}`),new Ye({method:i,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:r=!0}={}){var s;const i="POST",{url:n,headers:a}=this.cloneRequestState();if(e&&a.append("Prefer",`count=${e}`),r||a.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);n.searchParams.set("columns",l.join(","))}}return new Ye({method:i,url:n,headers:a,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:s,defaultToNull:i=!0}={}){var n;const a="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),s&&l.append("Prefer",`count=${s}`),i||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((h,u)=>h.concat(Object.keys(u)),[]);if(c.length>0){const h=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",h.join(","))}}return new Ye({method:a,url:o,headers:l,schema:this.schema,body:t,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var r;const s="PATCH",{url:i,headers:n}=this.cloneRequestState();return e&&n.append("Prefer",`count=${e}`),new Ye({method:s,url:i,headers:n,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const r="DELETE",{url:s,headers:i}=this.cloneRequestState();return t&&i.append("Prefer",`count=${t}`),new Ye({method:r,url:s,headers:i,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Un=class fi{constructor(e,{headers:r={},schema:s,fetch:i,timeout:n,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(r),this.schemaName=s,this.urlLengthLimit=a;const l=i??globalThis.fetch;n!==void 0&&n>0?this.fetch=(c,h)=>{const u=new AbortController,p=setTimeout(()=>u.abort(),n),d=h?.signal;if(d){if(d.aborted)return clearTimeout(p),l(c,h);const g=()=>{clearTimeout(p),u.abort()};return d.addEventListener("abort",g,{once:!0}),l(c,Ze(Ze({},h),{},{signal:u.signal})).finally(()=>{clearTimeout(p),d.removeEventListener("abort",g)})}return l(c,Ze(Ze({},h),{},{signal:u.signal})).finally(()=>clearTimeout(p))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Ln(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new fi(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,r={},{head:s=!1,get:i=!1,count:n}={}){var a;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const h=d=>d!==null&&typeof d=="object"&&(!Array.isArray(d)||d.some(h)),u=s&&Object.values(r).some(h);u?(o="POST",c=r):s||i?(o=s?"HEAD":"GET",Object.entries(r).filter(([d,g])=>g!==void 0).map(([d,g])=>[d,Array.isArray(g)?`{${g.join(",")}}`:`${g}`]).forEach(([d,g])=>{l.searchParams.append(d,g)})):(o="POST",c=r);const p=new Headers(this.headers);return u?p.set("Prefer",n?`count=${n},return=minimal`:"return=minimal"):n&&p.set("Prefer",`count=${n}`),new Ye({method:o,url:l,headers:p,schema:this.schemaName,body:c,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Mn{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const r=globalThis;if(typeof globalThis<"u"&&typeof r.WebSocket<"u")return{type:"native",wsConstructor:r.WebSocket};const s=typeof global<"u"?global:void 0;if(s&&typeof s.WebSocket<"u")return{type:"native",wsConstructor:s.WebSocket};if(typeof globalThis<"u"&&typeof r.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&r.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const i=globalThis.process;if(i){const n=i.versions;if(n&&n.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const Bn="2.112.3",zn=`realtime-js/${Bn}`,Fn="1.0.0",pi="2.0.0",qn=pi,Hn=1e4,Kn=100,$e={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},mi={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Dr={connecting:"connecting",closing:"closing",closed:"closed"};class Vn{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,s;const i=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,i)}_encodeJsonUserBroadcastPush(e){var r,s;const i=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:{},a=new TextEncoder().encode(JSON.stringify(i)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,a)}_encodeUserBroadcastPush(e,r,s){var i,n;const a=new TextEncoder,o=a.encode(e.topic),l=a.encode((i=e.ref)!==null&&i!==void 0?i:""),c=a.encode((n=e.join_ref)!==null&&n!==void 0?n:""),h=a.encode(e.payload.event),u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},p=a.encode(Object.keys(u).length===0?"":JSON.stringify(u));if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(h.length>255)throw new Error(`userEvent length ${h.length} exceeds maximum of 255`);if(p.length>255)throw new Error(`metadata length ${p.length} exceeds maximum of 255`);const d=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+h.length+p.length,g=new ArrayBuffer(this.HEADER_LENGTH+d),b=new DataView(g),y=new Uint8Array(g);let w=0;b.setUint8(w++,this.KINDS.userBroadcastPush),b.setUint8(w++,c.length),b.setUint8(w++,l.length),b.setUint8(w++,o.length),b.setUint8(w++,h.length),b.setUint8(w++,p.length),b.setUint8(w++,r),y.set(c,w),w+=c.length,y.set(l,w),w+=l.length,y.set(o,w),w+=o.length,y.set(h,w),w+=h.length,y.set(p,w),w+=p.length;var S=new Uint8Array(g.byteLength+s.byteLength);return S.set(new Uint8Array(g),0),S.set(new Uint8Array(s),g.byteLength),S.buffer}decode(e,r){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return r(s)}if(typeof e=="string"){const s=JSON.parse(e),[i,n,a,o,l]=s;return r({join_ref:i,ref:n,topic:a,event:o,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),s=r.getUint8(0),i=new TextDecoder;if(s===this.KINDS.userBroadcast)return this._decodeUserBroadcast(e,r,i)}_decodeUserBroadcast(e,r,s){const i=r.getUint8(1),n=r.getUint8(2),a=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+i));l=l+i;const h=s.decode(e.slice(l,l+n));l=l+n;const u=s.decode(e.slice(l,l+a));l=l+a;const p=e.slice(l,e.byteLength),d=o===this.JSON_ENCODING?JSON.parse(s.decode(p)):p,g={type:this.BROADCAST_EVENT,event:h,payload:d};return a>0&&(g.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:g}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e?.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>r.includes(s)))}}var C;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(C||(C={}));const Ss=(t,e,r={})=>{var s;const i=(s=r.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((n,a)=>(n[a]=Wn(a,t,e,i),n),{}):{}},Wn=(t,e,r,s)=>{const i=e.find(o=>o.name===t),n=i?.type,a=r[t];return n&&!s.includes(n)?gi(n,a):Nr(a)},gi=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return Xn(e,r)}switch(t){case C.bool:return Gn(e);case C.float4:case C.float8:case C.int2:case C.int4:case C.int8:case C.numeric:case C.oid:return Jn(e);case C.json:case C.jsonb:return Yn(e);case C.timestamp:return Zn(e);case C.abstime:case C.date:case C.daterange:case C.int4range:case C.int8range:case C.money:case C.reltime:case C.text:case C.time:case C.timestamptz:case C.timetz:case C.tsrange:case C.tstzrange:return Nr(e);default:return Nr(e)}},Nr=t=>t,Gn=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},Jn=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},Yn=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},Xn=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,s=t[r];if(t[0]==="{"&&s==="}"){let n;const a=t.slice(1,r);try{n=JSON.parse("["+a+"]")}catch{n=a?a.split(","):[]}return n.map(o=>gi(e,o))}return t},Zn=t=>typeof t=="string"?t.replace(" ","T"):t,bi=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var Qe=t=>typeof t=="function"?t:function(){return t},Qn=typeof self<"u"?self:null,Xe=typeof window<"u"?window:null,se=Qn||Xe||globalThis,ea="2.0.0",ta=1e4,ra=1e3,sa=100,ie={connecting:0,open:1,closing:2,closed:3},W={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},de={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},Lr={longpoll:"longpoll",websocket:"websocket"},ia={complete:4},Ur="base64url.bearer.phx.",Ft=class{constructor(t,e,r,s){this.channel=t,this.event=e,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=s,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:r}){this.recHooks.filter(s=>s.status===t).forEach(s=>s.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},vi=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},na=class{constructor(t,e,r){this.state=W.closed,this.topic=t,this.params=Qe(e||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Ft(this,de.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new vi(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=W.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this.joinPush.receive("error",s=>{this.state=W.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=W.closed,this.socket.remove(this)}),this.onError(s=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.isJoining()&&this.joinPush.reset(),this.state=W.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Ft(this,de.leave,Qe({}),this.timeout).send(),this.state=W.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(de.reply,(s,i)=>{this.trigger(this.replyEventName(i),s)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=W.closed,this.bindings=[]}onClose(t){this.on(de.close,t)}onError(t){return this.on(de.error,e=>t(e))}on(t,e){let r=this.bindingRef++;return this.bindings.push({event:t,ref:r,callback:e}),r}off(t,e){this.bindings=this.bindings.filter(r=>!(r.event===t&&(typeof e>"u"||e===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,r=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let s=new Ft(this,t,function(){return e},r);return this.canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=W.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(de.close,"leave")},r=new Ft(this,de.leave,Qe({}),t);return r.receive("ok",()=>e()).receive("timeout",()=>e()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(t,e,r){return e}filterBindings(t,e,r){return!0}isMember(t,e,r,s){return this.topic!==t?!1:s&&s!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:r,joinRef:s}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=W.joining,this.joinPush.resend(t))}trigger(t,e,r,s){let i=this.onMessage(t,e,r,s);if(e&&!i)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let n=this.bindings.filter(a=>a.event===t&&this.filterBindings(a,e,r));for(let a=0;a<n.length;a++)n[a].callback(i,r,s||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===W.closed}isErrored(){return this.state===W.errored}isJoined(){return this.state===W.joined}isJoining(){return this.state===W.joining}isLeaving(){return this.state===W.leaving}},ar=class{static request(t,e,r,s,i,n,a){if(se.XDomainRequest){let o=new se.XDomainRequest;return this.xdomainRequest(o,t,e,s,i,n,a)}else if(se.XMLHttpRequest){let o=new se.XMLHttpRequest;return this.xhrRequest(o,t,e,r,s,i,n,a)}else{if(se.fetch&&se.AbortController)return this.fetchRequest(t,e,r,s,i,n,a);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,r,s,i,n,a){let o={method:t,headers:r,body:s},l=null;return i&&(l=new AbortController,setTimeout(()=>l.abort(),i),o.signal=l.signal),se.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>a&&a(c)).catch(c=>{c.name==="AbortError"&&n?n():a&&a(null)}),l}static xdomainRequest(t,e,r,s,i,n,a){return t.timeout=i,t.open(e,r),t.onload=()=>{let o=this.parseJSON(t.responseText);a&&a(o)},n&&(t.ontimeout=n),t.onprogress=()=>{},t.send(s),t}static xhrRequest(t,e,r,s,i,n,a,o){t.open(e,r,!0),t.timeout=n;for(let[l,c]of Object.entries(s))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===ia.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},a&&(t.ontimeout=a),t.send(i),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let r=[];for(var s in t){if(!Object.prototype.hasOwnProperty.call(t,s))continue;let i=e?`${e}[${s}]`:s,n=t[s];typeof n=="object"?r.push(this.serialize(n,i)):r.push(encodeURIComponent(i)+"="+encodeURIComponent(n))}return r.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let r=t.match(/\?/)?"&":"?";return`${t}${r}${this.serialize(e)}`}},aa=t=>{let e="",r=new Uint8Array(t),s=r.byteLength;for(let i=0;i<s;i++)e+=String.fromCharCode(r[i]);return btoa(e)},Ke=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(Ur)&&(this.authToken=atob(e[1].slice(Ur.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=ie.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+Lr.websocket),"$1/"+Lr.longpoll)}endpointURL(){return ar.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,r){this.close(t,e,r),this.readyState=ie.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===ie.open||this.readyState===ie.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:r,token:s,messages:i}=e;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=s}else r=0;switch(r){case 200:i.forEach(n=>{setTimeout(()=>this.onmessage({data:n}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=ie.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(t){typeof t!="string"&&(t=aa(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t,e=0){this.awaitingBatchAck=!0;const r=e+sa,s=t.slice(e,r);this.ajax("POST",{"Content-Type":"application/x-ndjson"},s.join(`
`),()=>this.onerror("timeout"),i=>{!i||i.status!==200?(this.awaitingBatchAck=!1,this.onerror(i&&i.status),this.closeAndRetry(1011,"internal server error",!1)):r<t.length?this.batchSend(t,r):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(t,e,r){for(let i of this.reqs)i.abort();this.readyState=ie.closed;let s=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",s)):this.onclose(s)}ajax(t,e,r,s,i){let n,a=()=>{this.reqs.delete(n),s()};n=ar.request(t,this.endpointURL(),e,r,this.timeout,a,o=>{this.reqs.delete(n),this.isActive()&&i(o)}),this.reqs.add(n)}},oa=class dt{constructor(e,r={}){let s=r.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(s.state,i=>{let{onJoin:n,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=dt.syncState(this.state,i,n,a),this.pendingDiffs.forEach(l=>{this.state=dt.syncDiff(this.state,l,n,a)}),this.pendingDiffs=[],o()}),this.channel.on(s.diff,i=>{let{onJoin:n,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=dt.syncDiff(this.state,i,n,a),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return dt.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,r,s,i){let n=this.toNullProtoObj(this.clone(e));r=this.toNullProtoObj(r);let a=Object.create(null),o=Object.create(null);return this.map(n,(l,c)=>{r[l]||(o[l]=c)}),this.map(r,(l,c)=>{let h=n[l];if(h){let u=c.metas.map(b=>b.phx_ref),p=h.metas.map(b=>b.phx_ref),d=c.metas.filter(b=>p.indexOf(b.phx_ref)<0),g=h.metas.filter(b=>u.indexOf(b.phx_ref)<0);d.length>0&&(a[l]=c,a[l].metas=d),g.length>0&&(o[l]=this.clone(h),o[l].metas=g)}else a[l]=c}),this.syncDiff(n,{joins:a,leaves:o},s,i)}static syncDiff(e,r,s,i){e=this.toNullProtoObj(e);let{joins:n,leaves:a}=this.clone(r);return s||(s=function(){}),i||(i=function(){}),this.map(n,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let h=e[o].metas.map(p=>p.phx_ref),u=c.metas.filter(p=>h.indexOf(p.phx_ref)<0);e[o].metas.unshift(...u)}s(o,c,l)}),this.map(a,(o,l)=>{let c=e[o];if(!c)return;let h=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>h.indexOf(u.phx_ref)<0),i(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,r){return r||(r=function(s,i){return i}),this.map(e,(s,i)=>r(s,i))}static map(e,r){return Object.getOwnPropertyNames(e).map(s=>r(s,e[s]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let r=Object.create(null);return Object.getOwnPropertyNames(e).forEach(s=>{r[s]=e[s]}),r}static clone(e){return JSON.parse(JSON.stringify(e))}},qt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(r))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[r,s,i,n,a]=JSON.parse(t);return e({join_ref:r,ref:s,topic:i,event:n,payload:a})}},binaryEncode(t){let{join_ref:e,ref:r,event:s,topic:i,payload:n}=t,a=new TextEncoder,o=a.encode(e),l=a.encode(r),c=a.encode(i),h=a.encode(s);this.assertFieldSize(o.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(c.byteLength,"topic"),this.assertFieldSize(h.byteLength,"event");let u=this.META_LENGTH+o.byteLength+l.byteLength+c.byteLength+h.byteLength,p=new ArrayBuffer(this.HEADER_LENGTH+u),d=new Uint8Array(p),g=new DataView(p),b=0;g.setUint8(b++,this.KINDS.push),g.setUint8(b++,o.byteLength),g.setUint8(b++,l.byteLength),g.setUint8(b++,c.byteLength),g.setUint8(b++,h.byteLength),d.set(o,b),b+=o.byteLength,d.set(l,b),b+=l.byteLength,d.set(c,b),b+=c.byteLength,d.set(h,b),b+=h.byteLength;var y=new Uint8Array(p.byteLength+n.byteLength);return y.set(d,0),y.set(new Uint8Array(n),p.byteLength),y.buffer},assertFieldSize(t,e){if(t>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`)},binaryDecode(t){let e=new DataView(t),r=e.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(t,e,s);case this.KINDS.reply:return this.decodeReply(t,e,s);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,s)}},decodePush(t,e,r){let s=e.getUint8(1),i=e.getUint8(2),n=e.getUint8(3),a=this.HEADER_LENGTH+this.META_LENGTH-1,o=r.decode(t.slice(a,a+s));a=a+s;let l=r.decode(t.slice(a,a+i));a=a+i;let c=r.decode(t.slice(a,a+n));a=a+n;let h=t.slice(a,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:h}},decodeReply(t,e,r){let s=e.getUint8(1),i=e.getUint8(2),n=e.getUint8(3),a=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=r.decode(t.slice(o,o+s));o=o+s;let c=r.decode(t.slice(o,o+i));o=o+i;let h=r.decode(t.slice(o,o+n));o=o+n;let u=r.decode(t.slice(o,o+a));o=o+a;let p=t.slice(o,t.byteLength),d={status:u,response:p};return{join_ref:l,ref:c,topic:h,event:de.reply,payload:d}},decodeBroadcast(t,e,r){let s=e.getUint8(1),i=e.getUint8(2),n=this.HEADER_LENGTH+2,a=r.decode(t.slice(n,n+s));n=n+s;let o=r.decode(t.slice(n,n+i));n=n+i;let l=t.slice(n,t.byteLength);return{join_ref:null,ref:null,topic:a,event:o,payload:l}}},la=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||ta,this.transport=e.transport||se.WebSocket||Ke,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let r=null;try{r=se&&se.sessionStorage}catch{}this.sessionStore=e.sessionStorage||r,this.establishedConnections=0,this.defaultEncoder=qt.encode.bind(qt),this.defaultDecoder=qt.decode.bind(qt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Ke?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let s=null;Xe&&Xe.addEventListener&&(Xe.addEventListener("pagehide",i=>{this.conn&&(this.disconnect(),s=this.connectClock)}),Xe.addEventListener("pageshow",i=>{s===this.connectClock&&(s=null,this.connect())}),Xe.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=i=>e.rejoinAfterMs?e.rejoinAfterMs(i):[1e3,2e3,5e3][i-1]||1e4,this.reconnectAfterMs=i=>e.reconnectAfterMs?e.reconnectAfterMs(i):[10,50,100,150,200,250,500,1e3,2e3][i-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(i,n,a)=>{console.log(`${i}: ${n}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=Qe(e.params||{}),this.endPoint=`${t}/${Lr.websocket}`,this.vsn=e.vsn||ea,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new vi(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&Qe(e.authToken)}getLongPollTransport(){return Ke}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=ar.appendParams(ar.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,r)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Qe(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Ke?this.connectWithFallback(Ke,this.longPollFallbackMs):this.transportConnect())}log(t,e,r){this.logger&&this.logger(t,e,r)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let s=this.onMessage(i=>{i.ref===e&&(this.off([s]),t(Date.now()-r))});return!0}transportName(t){return t===Ke?"LongPoll":t.name}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${Ur}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let r=!1,s=!0,i,n,a=this.transportName(t),o=l=>{this.log("transport",`falling back to ${a}...`,l),this.off([i,n]),s=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),n=this.onError(l=>{this.log("transport","error",l),s&&!r&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!s){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),ra,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,r){if(!this.conn)return t&&t();const s=this.conn;this.waitForBufferDone(s,()=>{e?s.close(e,r||""):s.close(),this.waitForSocketClosed(s,()=>{this.conn===s&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,r=1){if(r===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,r+1)},150*r)}waitForSocketClosed(t,e,r=1){if(r===5||t.readyState===ie.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,r+1)},150*r)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",t,e,r),(e===this.transport||r>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(de.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case ie.connecting:return"connecting";case ie.open:return"open";case ie.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([r])=>t.indexOf(r)===-1)}channel(t,e={}){let r=new na(t,e,this);return this.channels.push(r),r}push(t){if(this.hasLogger()){let{topic:e,event:r,payload:s,ref:i,join_ref:n}=t;this.log("push",`${e} ${r} (${n}, ${i})`,s)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:r,event:s,payload:i,ref:n,join_ref:a}=e;if(n&&n===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(i.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${i.status||""} ${r} ${s} ${n&&"("+n+")"||""}`.trim(),i);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(r,s,i,a)&&l.trigger(s,i,n,a)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([r,s])=>{try{s(...e)}catch(i){this.log("error",`error in ${t} callback`,i)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}leaveOpenTopic(t){let e=this.channels.find(r=>r.topic===t&&(r.isJoined()||r.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class bt{constructor(e,r){const s=ua(r);this.presence=new oa(e.getChannel(),s),this.presence.onJoin((i,n,a)=>{const o=bt.onJoinPayload(i,n,a);e.getChannel().trigger("presence",o)}),this.presence.onLeave((i,n,a)=>{const o=bt.onLeavePayload(i,n,a);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return bt.transformState(this.presence.state)}static transformState(e){return e=ca(e),Object.getOwnPropertyNames(e).reduce((r,s)=>{const i=e[s];return r[s]=er(i),r},{})}static onJoinPayload(e,r,s){const i=ks(r),n=er(s);return{event:"join",key:e,currentPresences:i,newPresences:n}}static onLeavePayload(e,r,s){const i=ks(r),n=er(s);return{event:"leave",key:e,currentPresences:i,leftPresences:n}}}function er(t){return t.metas.map(e=>{const r=Object.getOwnPropertyDescriptors(e),s=Object.defineProperties({},r);return s.presence_ref=s.phx_ref,delete s.phx_ref,delete s.phx_ref_prev,s})}function ca(t){return JSON.parse(JSON.stringify(t))}function ua(t){return t?.events&&{events:t.events}}function ks(t){return t?.metas?er(t):[]}var Es;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(Es||(Es={}));class ha{get state(){return this.presenceAdapter.state}constructor(e,r){this.channel=e,this.presenceAdapter=new bt(this.channel.channelAdapter,r)}}function da(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const r=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${r}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class fa{constructor(e,r,s){const i=pa(s);this.channel=e.getSocket().channel(r,i),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,r){return this.channel.on(e,r)}off(e,r){this.channel.off(e,r)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,r,s){let i;try{i=this.channel.push(e,r,s)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>Kn){const n=this.channel.pushBuffer.shift();n.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${n.event}`,n.payload())}return i}updateJoinPayload(e){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),e)}canPush(){return this.socket.isConnected()&&this.state===$e.joined}isJoined(){return this.state===$e.joined}isJoining(){return this.state===$e.joining}isClosed(){return this.state===$e.closed}isLeaving(){return this.state===$e.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function pa(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}const ma=/[,()"\\]/,ga=t=>ma.test(t)||t!==t.trim(),ba=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,xs=t=>{const e=t===null?"null":String(t);return ga(e)?ba(e):e},va=t=>t===null?"null":String(t),ya=(t,e)=>{if(t==="in"){const r=Array.isArray(e)?e:[e];if(r.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(r)).map(i=>xs(i)).join(",")})`}return t==="is"?`is.${va(e)}`:`${t}.${xs(e)}`};class wa{constructor(){this.filters=[]}add(e,r,s,i=!1){const n=i?"not.":"";return this.filters.push(`${e}=${n}${ya(r,s)}`),this}eq(e,r){return this.add(e,"eq",r)}neq(e,r){return this.add(e,"neq",r)}gt(e,r){return this.add(e,"gt",r)}gte(e,r){return this.add(e,"gte",r)}lt(e,r){return this.add(e,"lt",r)}lte(e,r){return this.add(e,"lte",r)}in(e,r){return this.add(e,"in",r)}like(e,r){return this.add(e,"like",r)}ilike(e,r){return this.add(e,"ilike",r)}match(e,r){return this.add(e,"match",r)}imatch(e,r){return this.add(e,"imatch",r)}is(e,r){return this.add(e,"is",r)}isDistinct(e,r){return this.add(e,"isdistinct",r)}not(e,r,s){return this.add(e,r,s,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var Ts;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Ts||(Ts={}));var Pe;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(Pe||(Pe={}));var fe;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(fe||(fe={}));class pe{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,r={config:{}},s){var i,n;if(this.topic=e,this.params=r,this.socket=s,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new fa(this.socket.socketAdapter,e,this.params),this.presence=new ha(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=bi(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((n=(i=this.params.config)===null||i===void 0?void 0:i.broadcast)===null||n===void 0)&&n.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,r=this.timeout){var s,i,n;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:a,presence:o,private:l}}=this.params,c=(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(d=>d.filter))!==null&&i!==void 0?i:[],h=!!this.bindings[Pe.PRESENCE]&&this.bindings[Pe.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,u={},p={broadcast:a,presence:Object.assign(Object.assign({},o),{enabled:h}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(d=>{e?.(fe.CHANNEL_ERROR,da(d))}),this._onClose(()=>e?.(fe.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:d})=>{if(this.socket._isManualToken()||this.socket.setAuth(),d===void 0){e?.(fe.SUBSCRIBED);return}this._updatePostgresBindings(d,e)}).receive("error",d=>{this.state=$e.errored;const g=Object.values(d).join(", ")||"error";e?.(fe.CHANNEL_ERROR,new Error(g,{cause:d}))}).receive("timeout",()=>{e?.(fe.TIMED_OUT)})}return this}_updatePostgresBindings(e,r){var s;const i=this.bindings.postgres_changes,n=(s=i?.length)!==null&&s!==void 0?s:0,a=[];for(let o=0;o<n;o++){const l=i[o],{filter:{event:c,schema:h,table:u,filter:p}}=l,d=e&&e[o];if(d&&d.event===c&&pe.isFilterValueEqual(d.schema,h)&&pe.isFilterValueEqual(d.table,u)&&pe.isFilterValueEqual(d.filter,p))a.push(Object.assign(Object.assign({},l),{id:d.id}));else{this.unsubscribe(),this.state=$e.errored,r?.(fe.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=a,this.state!=$e.errored&&r&&r(fe.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,s){const i=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),n=e===Pe.PRESENCE||e===Pe.POSTGRES_CHANGES;if(i&&n)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,r,s)}async httpSend(e,r,s={}){var i;if(r==null)return Promise.reject(new Error("Payload is required for httpSend()"));const n=r instanceof ArrayBuffer||ArrayBuffer.isView(r),a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":n?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:a,body:n?r:JSON.stringify(r)},c=await this._fetchWithTimeout(o.toString(),l,(i=s.timeout)!==null&&i!==void 0?i:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let h=c.statusText;try{const u=await c.json();h=u.error||u.message||h}catch{}return Promise.reject(new Error(h))}async send(e,r={}){var s,i;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:a}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:a,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var a,o,l;const c=this.channelAdapter.push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,r,s){const i=new AbortController,n=setTimeout(()=>i.abort(),s),a=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:i.signal}));return clearTimeout(n),a}_on(e,r,s){var i;const n=e.toLocaleLowerCase(),a=r?.filter;if((a instanceof wa||typeof a=="object"&&a!==null&&typeof a.build=="function")&&(r=Object.assign(Object.assign({},r),{filter:a.build()})),n===Pe.POSTGRES_CHANGES&&((i=this.bindings[n])===null||i===void 0?void 0:i.find(h=>pe.isSamePostgresFilter(h.filter,r))))return this.socket.log("error",`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,r),this;const o=this.channelAdapter.on(e,s),l={type:n,filter:r,callback:s,ref:o};return this.bindings[n]?this.bindings[n].push(l):this.bindings[n]=[l],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,r,s)=>{var i,n,a,o,l,c,h;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,s))return!1;const p=(i=this.bindings[u])===null||i===void 0?void 0:i.find(d=>d.ref===e.ref);if(!p)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in p){const d=p.id,g=(n=p.filter)===null||n===void 0?void 0:n.event;return d&&((a=r.ids)===null||a===void 0?void 0:a.includes(d))&&(g==="*"||g?.toLocaleLowerCase()===((o=r.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const d=(c=(l=p?.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return d==="*"||d===((h=r?.event)===null||h===void 0?void 0:h.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,r){const{close:s,error:i,leave:n,join:a}=mi;return r&&[s,i,n,a].includes(e)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,r,s)=>{if(typeof r=="object"&&"ids"in r){const i=r.data,{schema:n,table:a,commit_timestamp:o,type:l,errors:c}=i;return Object.assign(Object.assign({},{schema:n,table:a,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(i))}return r})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in e.bindings)for(const s of e.bindings[r])this._on(s.type,s.filter,s.callback)}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}static isSamePostgresFilter(e,r){var s,i,n,a;const o=(i=(s=e?.select)===null||s===void 0?void 0:s.join())!==null&&i!==void 0?i:void 0,l=(a=(n=r?.select)===null||n===void 0?void 0:n.join())!==null&&a!==void 0?a:void 0;return e?.event===r?.event&&pe.isFilterValueEqual(e?.schema,r?.schema)&&pe.isFilterValueEqual(e?.table,r?.table)&&pe.isFilterValueEqual(e?.filter,r?.filter)&&o===l}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=Ss(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=Ss(e.columns,e.old_record)),r}}class _a{constructor(e,r){this.socket=new la(e,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,r,s,i=1e4){return new Promise(n=>{setTimeout(()=>n("timeout"),i),this.socket.disconnect(()=>{e(),n("ok")},r,s)})}push(e){this.socket.push(e)}log(e,r,s){this.socket.log(e,r,s)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Dr.connecting}isDisconnecting(){return this.socket.connectionState()==Dr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const As={HEARTBEAT_INTERVAL:25e3},$a=[1e3,2e3,5e3,1e4],Sa=1e4;function ka(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var r;return(r=Array.from(t.keys())[e])!==null&&r!==void 0?r:null},removeItem(e){t.delete(e)},setItem(e,r){t.set(e,String(r))}}}function Ea(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return ka()}const xa=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Ta{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,r){var s;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new Vn,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=n=>n?(...a)=>n(...a):(...a)=>fetch(...a),!(!((s=r?.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const i=this._initializeOptions(r);this.socketAdapter=new _a(e,i),this.httpEndpoint=bi(e),this.fetch=this._resolveFetch(r?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const r=e.message;throw new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,r){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,r)}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return r==="ok"&&e.teardown(),r}async removeAllChannels(){const e=this.channels.map(async s=>{const i=await s.unsubscribe();return s.teardown(),i}),r=await Promise.all(e);return await this.disconnect(),r}log(e,r,s){this.socketAdapter.log(e,r,s)}connectionState(){return this.socketAdapter.connectionState()||Dr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,r={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(n=>n.topic===s);if(i)return i;{const n=new pe(`realtime:${e}`,r,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){const r=++this._authGeneration,s=this._performAuth(e,r);r===this._authGeneration&&(this._authPromise=s);try{await s}finally{this._authPromise===s&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,r){let s,i=!1;if(e)s=e,i=!0;else if(this.accessToken)try{s=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),s=this.accessTokenValue}else s=this.accessTokenValue;r===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:i&&(this._manuallySetToken=!0),this.accessTokenValue!=s&&(this.accessTokenValue=s,this.channels.forEach(n=>{const a={access_token:s,version:zn};n.updateJoinPayload(a),n.joinedOnce&&n.channelAdapter.isJoined()&&n.channelAdapter.push(mi.access_token,{access_token:s})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(r,s)=>{r!=="disconnected"&&(r=="sent"&&this._setAuthSafely(),e&&e(r,s))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let r;if(e)r=e;else{const s=new Blob([xa],{type:"application/javascript"});r=URL.createObjectURL(s)}return r}_initializeOptions(e){var r,s,i,n,a,o,l,c,h,u,p,d;this.worker=(r=e?.worker)!==null&&r!==void 0?r:!1,this.accessToken=(s=e?.accessToken)!==null&&s!==void 0?s:null;const g={};g.timeout=(i=e?.timeout)!==null&&i!==void 0?i:Hn,g.heartbeatIntervalMs=(n=e?.heartbeatIntervalMs)!==null&&n!==void 0?n:As.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(a=e?.disconnectOnEmptyChannelsAfterMs)!==null&&a!==void 0?a:2*((o=e?.heartbeatIntervalMs)!==null&&o!==void 0?o:As.HEARTBEAT_INTERVAL),g.transport=(l=e?.transport)!==null&&l!==void 0?l:Mn.getWebSocketConstructor(),g.params=e?.params,g.logger=e?.logger,g.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),g.sessionStorage=(c=e?.sessionStorage)!==null&&c!==void 0?c:Ea(),g.reconnectAfterMs=(h=e?.reconnectAfterMs)!==null&&h!==void 0?h:(S=>$a[S-1]||Sa);let b,y;const w=(u=e?.vsn)!==null&&u!==void 0?u:qn;switch(w){case Fn:b=(S,_)=>_(JSON.stringify(S)),y=(S,_)=>_(JSON.parse(S));break;case pi:b=this.serializer.encode.bind(this.serializer),y=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${g.vsn}`)}if(g.vsn=w,g.encode=(p=e?.encode)!==null&&p!==void 0?p:b,g.decode=(d=e?.decode)!==null&&d!==void 0?d:y,g.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,g.params=Object.assign(Object.assign({},g.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e?.workerUrl,g.autoSendHeartbeat=!this.worker}return g}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var $t=class extends Error{constructor(t,e){super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&e.icebergType?.includes("CommitState")===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Aa(t,e,r){const s=new URL(e,t);if(r)for(const[i,n]of Object.entries(r))n!==void 0&&s.searchParams.set(i,n);return s.toString()}async function Ca(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function Oa(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:s,query:i,body:n,headers:a}){const o=Aa(t.baseUrl,s,i),l=await Ca(t.auth),c=await e(o,{method:r,headers:{...n?{"Content-Type":"application/json"}:{},...l,...a},body:n?JSON.stringify(n):void 0}),h=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),p=u&&h?JSON.parse(h):h;if(!c.ok){const d=u?p:void 0,g=d?.error;throw new $t(g?.message??`Request failed with status ${c.status}`,{status:c.status,icebergType:g?.type,icebergCode:g?.code,details:d})}return{status:c.status,headers:c.headers,data:p}}}}function Ht(t){return t.join("")}var Ra=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:Ht(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e?.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ht(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ht(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ht(t.namespace)}`}),!0}catch(e){if(e instanceof $t&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof $t&&r.status===409)return;throw r}}};function Ve(t){return t.join("")}var Pa=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ve(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ve(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ve(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ve(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String(e?.purge??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ve(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ve(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof $t&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof $t&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},Ia=class{constructor(t){let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=Oa({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=t.accessDelegation?.join(","),this.namespaceOps=new Ra(this.client,e),this.tableOps=new Pa(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function St(t){"@babel/helpers - typeof";return St=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},St(t)}function ja(t,e){if(St(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(St(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Da(t){var e=ja(t,"string");return St(e)=="symbol"?e:e+""}function Na(t,e,r){return(e=Da(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Cs(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Cs(Object(r),!0).forEach(function(s){Na(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Cs(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}var wr=class extends Error{constructor(t,e="storage",r,s){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function _r(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Mr=class extends wr{constructor(t,e,r,s="storage",i){super(t,s,e,r),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r,this.code=i}toJSON(){return k(k({},super.toJSON()),{},{code:this.code})}},yi=class extends wr{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function or(t,e,r){const s=k({},t),i=e.toLowerCase();for(const n of Object.keys(s))n.toLowerCase()===i&&delete s[n];return s[i]=r,s}function La(t){const e={};for(const[r,s]of Object.entries(t))e[r.toLowerCase()]=s;return e}const Ua=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Ma=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Br=t=>{if(Array.isArray(t))return t.map(r=>Br(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,s])=>{const i=r.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[i]=Br(s)}),e},Ba=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),wi=t=>t.split("/").map(encodeURIComponent).join("/"),Os=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const r=e.error;if(typeof r.message=="string")return r.message}}return JSON.stringify(t)},za=async(t,e,r,s)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const i=t;let n=parseInt(String(i.status),10);Number.isFinite(n)||(n=500),i.json().then(a=>{const o=a?.statusCode||a?.code||n+"";e(new Mr(Os(a),n,o,s,a?.code))}).catch(()=>{const a=n+"";e(new Mr(i.statusText||`HTTP ${n} error`,n,a,s))})}else e(new yi(Os(t),t,s))},Fa=(t,e,r,s)=>{const i={method:t,headers:e?.headers||{}};if(t==="GET"||t==="HEAD"||!s)return k(k({},i),r);if(Ma(s)){var n;const a=e?.headers||{};let o;for(const[l,c]of Object.entries(a))l.toLowerCase()==="content-type"&&(o=c);i.headers=or(a,"Content-Type",(n=o)!==null&&n!==void 0?n:"application/json"),i.body=JSON.stringify(s)}else i.body=s;return e?.duplex&&(i.duplex=e.duplex),k(k({},i),r)};async function ht(t,e,r,s,i,n,a){return new Promise((o,l)=>{t(r,Fa(e,s,i,n)).then(c=>{if(!c.ok)throw c;if(s?.noResolveJson)return c;if(a==="vectors"){const h=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!h||!h.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>za(c,l,s,a))})}function _i(t="storage"){return{get:async(e,r,s,i)=>ht(e,"GET",r,s,i,void 0,t),post:async(e,r,s,i,n)=>ht(e,"POST",r,i,n,s,t),put:async(e,r,s,i,n)=>ht(e,"PUT",r,i,n,s,t),head:async(e,r,s,i)=>ht(e,"HEAD",r,k(k({},s),{},{noResolveJson:!0}),i,void 0,t),remove:async(e,r,s,i,n)=>ht(e,"DELETE",r,i,n,s,t)}}const qa=_i("storage"),{get:kt,post:ee,put:zr,head:Ha,remove:Et}=qa,J=_i("vectors");var ot=class{constructor(t,e={},r,s="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=La(e),this.fetch=Ua(r),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=or(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(_r(r))return{data:null,error:r};throw r}}};let $i;$i=Symbol.toStringTag;var Ka=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[$i]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(_r(e))return{data:null,error:e};throw e}}};let Si;Si=Symbol.toStringTag;var Va=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[Si]="BlobDownloadBuilder",this.promise=null}asStream(){return new Ka(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(_r(e))return{data:null,error:e};throw e}}};const Ar={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Rs={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Wa=class extends ot{constructor(t,e={},r,s){super(t,e,s,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,s){var i=this;return i.handleOperation(async()=>{let n;const a=k(k({},Rs),s);let o=k(k({},i.headers),t==="POST"&&{"x-upsert":String(a.upsert)});const l=a.metadata;if(typeof Blob<"u"&&r instanceof Blob?(n=new FormData,n.append("cacheControl",a.cacheControl),l&&n.append("metadata",i.encodeMetadata(l)),n.append("",r)):typeof FormData<"u"&&r instanceof FormData?(n=r,n.has("cacheControl")||n.append("cacheControl",a.cacheControl),l&&!n.has("metadata")&&n.append("metadata",i.encodeMetadata(l))):(n=r,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,l&&(o["x-metadata"]=i.toBase64(i.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!a.duplex&&(a.duplex="half")),s?.headers)for(const[p,d]of Object.entries(s.headers))o=or(o,p,d);const c=i._removeEmptyFolders(e),h=i._getFinalPath(c),u=await(t=="PUT"?zr:ee)(i.fetch,`${i.url}/object/${h}`,n,k({headers:o},a?.duplex?{duplex:a.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,s){var i=this;const n=i._removeEmptyFolders(t),a=i._getFinalPath(n),o=new URL(i.url+`/object/upload/sign/${a}`);return o.searchParams.set("token",e),i.handleOperation(async()=>{let l;const c=k(k({},Rs),s);let h=k(k({},i.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",i.encodeMetadata(u)),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",i.encodeMetadata(u))):(l=r,h["cache-control"]=`max-age=${c.cacheControl}`,h["content-type"]=c.contentType,u&&(h["x-metadata"]=i.toBase64(i.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),s?.headers)for(const[p,d]of Object.entries(s.headers))h=or(h,p,d);return{path:n,fullPath:(await zr(i.fetch,o.toString(),l,k({headers:h},c?.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(t);const i=k({},r.headers);e?.upsert&&(i["x-upsert"]="true");const n=await ee(r.fetch,`${r.url}/object/upload/sign/${s}`,{},{headers:i}),a=new URL(r.url+n.url),o=a.searchParams.get("token");if(!o)throw new wr("No token returned by API");return{signedUrl:a.toString(),path:t,token:o}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var s=this;return s.handleOperation(async()=>await ee(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r?.destinationBucket},{headers:s.headers}))}async copy(t,e,r){var s=this;return s.handleOperation(async()=>({path:(await ee(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r?.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(t,e,r){var s=this;return s.handleOperation(async()=>{let i=s._getFinalPath(t);const n=typeof r?.transform=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let a=await ee(s.fetch,`${s.url}/object/sign/${i}`,k({expiresIn:e},n?{transform:r.transform}:{}),{headers:s.headers});const o=new URLSearchParams;r?.download&&o.set("download",r.download===!0?"":r.download),r?.cacheNonce!=null&&o.set("cacheNonce",String(r.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${s.url}${a.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,r){var s=this;return s.handleOperation(async()=>{const i=await ee(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:e,paths:t},{headers:s.headers}),n=new URLSearchParams;r?.download&&n.set("download",r.download===!0?"":r.download),r?.cacheNonce!=null&&n.set("cacheNonce",String(r.cacheNonce));const a=n.toString();return i.map(o=>k(k({},o),{},{signedUrl:o.signedURL?encodeURI(`${s.url}${o.signedURL}${a?`&${a}`:""}`):null}))})}download(t,e,r){const s=typeof e?.transform=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",i=new URLSearchParams;e?.transform&&this.applyTransformOptsToQuery(i,e.transform),e?.cacheNonce!=null&&i.set("cacheNonce",String(e.cacheNonce));const n=i.toString(),a=this._getFinalPath(t),o=()=>kt(this.fetch,`${this.url}/${s}/${a}${n?`?${n}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new Va(o,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>Br(await kt(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await Ha(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(i){if(e.shouldThrowOnError)throw i;if(_r(i)){var s;const n=i instanceof Mr?i.status:i instanceof yi?(s=i.originalError)===null||s===void 0?void 0:s.status:void 0;if(n!==void 0&&[400,404].includes(n))return{data:!1,error:i}}throw i}}getPublicUrl(t,e){const r=this._getFinalPath(t),s=new URLSearchParams;e?.download&&s.set("download",e.download===!0?"":e.download),e?.transform&&this.applyTransformOptsToQuery(s,e.transform),e?.cacheNonce!=null&&s.set("cacheNonce",String(e.cacheNonce));const i=s.toString(),n=typeof e?.transform=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${n}/public/${r}`)+(i?`?${i}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await Et(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async purgeCache(t,e,r){var s=this;return s.handleOperation(async()=>{const i=wi(s._getFinalPath(t)),n=new URLSearchParams;e?.transformations&&n.set("transformations","true");const a=n.toString();return await Et(s.fetch,`${s.url}/cdn/${i}${a?`?${a}`:""}`,{},{headers:s.headers},r)})}async list(t,e,r){var s=this;return s.handleOperation(async()=>{const i=e?.sortBy?k(k({},Ar.sortBy),e.sortBy):Ar.sortBy,n=k(k(k({},Ar),e),{},{sortBy:i,prefix:t||""});return await ee(s.fetch,`${s.url}/object/list/${s.bucketId}`,n,{headers:s.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const s=k({},t);return await ee(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,s,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const Ga="2.112.3",Dt={"X-Client-Info":`storage-js/${Ga}`};var Ja=class extends ot{constructor(t,e={},r,s){const i=new URL(t);s?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase."));const n=i.href.replace(/\/$/,""),a=k(k({},Dt),e);super(n,a,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await kt(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await kt(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await ee(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await zr(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await ee(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Et(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}async purgeBucketCache(t,e,r){var s=this;return s.handleOperation(async()=>{const i=new URLSearchParams;e?.transformations&&i.set("transformations","true");const n=i.toString();return await Et(s.fetch,`${s.url}/cdn/${wi(t)}${n?`?${n}`:""}`,{},{headers:s.headers},r)})}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Ya=class extends ot{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Dt),e);super(s,i,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await ee(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;t?.limit!==void 0&&r.set("limit",t.limit.toString()),t?.offset!==void 0&&r.set("offset",t.offset.toString()),t?.sortColumn&&r.set("sortColumn",t.sortColumn),t?.sortOrder&&r.set("sortOrder",t.sortOrder),t?.search&&r.set("search",t.search);const s=r.toString(),i=s?`${e.url}/bucket?${s}`:`${e.url}/bucket`;return await kt(e.fetch,i,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Et(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!Ba(t))throw new wr("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new Ia({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(r,{get(i,n){const a=i[n];return typeof a!="function"?a:async(...o)=>{try{return{data:await a.apply(i,o),error:null}}catch(l){if(s)throw l;return{data:null,error:l}}}}})}},Xa=class extends ot{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Dt),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await J.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await J.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},Za=class extends ot{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Dt),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},Qa=class extends ot{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Dt),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},eo=class extends Qa{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new to(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},to=class extends Xa{constructor(t,e,r,s){super(t,e,s),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new ro(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},ro=class extends Za{constructor(t,e,r,s,i){super(t,e,i),this.vectorBucketName=r,this.indexName=s}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},so=class extends Ja{constructor(t,e={},r,s){super(t,e,r,s)}from(t){return new Wa(this.url,this.headers,t,this.fetch)}get vectors(){return new eo(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ya(this.url+"/iceberg",this.headers,this.fetch)}};const ki="2.112.3",me=30*1e3,ft=3,Cr=ft*me,io=2*me,no="http://localhost:9999",ao="supabase.auth.token",oo={"X-Client-Info":`gotrue-js/${ki}`},Fr="X-Supabase-Api-Version",Ei={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},lo=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,je="sb_flow_id",co=5,uo=600*1e3;class xt extends Error{constructor(e,r,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=s}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function v(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class ho extends xt{constructor(e,r,s){super(e,r,s),this.name="AuthApiError",this.status=r,this.code=s}}function Ps(t){return v(t)&&t.name==="AuthApiError"}class te extends xt{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class le extends xt{constructor(e,r,s,i){super(e,s,i),this.name=r,this.status=s}}class U extends le{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Kt(t){return v(t)&&t.name==="AuthSessionMissingError"}class We extends le{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Vt extends le{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Wt extends le{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function fo(t){return v(t)&&t.name==="AuthImplicitGrantRedirectError"}class Is extends le{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class po extends le{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class tr extends le{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function Gt(t){return v(t)&&t.name==="AuthRetryableFetchError"}class js extends le{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function mo(t){return v(t)&&t.name==="AuthRefreshDiscardedError"}class Ds extends le{constructor(e,r,s){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class lr extends le{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const cr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Ns=` 	
\r=`.split(""),go=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Ns.length;e+=1)t[Ns[e].charCodeAt(0)]=-2;for(let e=0;e<cr.length;e+=1)t[cr[e].charCodeAt(0)]=e;return t})();function Ls(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(cr[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(cr[s]),e.queuedBits-=6}}function xi(t,e,r){const s=go[t];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function Us(t){const e=[],r=a=>{e.push(String.fromCodePoint(a))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},n=a=>{yo(a,s,r)};for(let a=0;a<t.length;a+=1)xi(t.charCodeAt(a),i,n);return e.join("")}function bo(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function vo(t,e){for(let r=0;r<t.length;r+=1){let s=t.charCodeAt(r);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(t.charCodeAt(r+1)-56320&65535|i)+65536,r+=1}bo(s,e)}}function yo(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let s=1;s<6;s+=1)if((t>>7-s&1)===0){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function et(t){const e=[],r={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<t.length;i+=1)xi(t.charCodeAt(i),r,s);return new Uint8Array(e)}function wo(t){const e=[];return vo(t,r=>e.push(r)),new Uint8Array(e)}function De(t){const e=[],r={queue:0,queuedBits:0},s=i=>{e.push(i)};return t.forEach(i=>Ls(i,r,s)),Ls(null,r,s),e.join("")}function _o(t){return Math.round(Date.now()/1e3)+t}function $o(){return Symbol("auth-callback")}const B=()=>typeof window<"u"&&typeof document<"u",Oe={tested:!1,writable:!1},Ti=()=>{if(!B())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Oe.tested)return Oe.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),Oe.tested=!0,Oe.writable=!0}catch{Oe.tested=!0,Oe.writable=!1}return Oe.writable};function Ms(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((i,n)=>{e[n]=i})}catch{}return r.searchParams.forEach((s,i)=>{e[i]=s}),e}const Ai=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),So=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",ge=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},q=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return null}},G=async(t,e)=>{await t.removeItem(e)};class $r{constructor(){this.promise=new $r.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}$r.promiseConstructor=Promise;function Jt(t){const e=t.split(".");if(e.length!==3)throw new lr("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!lo.test(e[s]))throw new lr("JWT not in base64url format");return{header:JSON.parse(Us(e[0])),payload:JSON.parse(Us(e[1])),signature:et(e[2]),raw:{header:e[0],payload:e[1]}}}async function ko(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function Eo(t,e){return new Promise((s,i)=>{(async()=>{for(let n=0;n<1/0;n++)try{const a=await t(n);if(!e(n,null,a)){s(a);return}}catch(a){if(!e(n,a)){i(a);return}}})()})}function Ci(t){return("0"+t.toString(16)).substr(-2)}function xo(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=r.length;let i="";for(let n=0;n<56;n++)i+=r.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,Ci).join("")}async function To(t){const r=new TextEncoder().encode(t),s=await crypto.subtle.digest("SHA-256",r),i=new Uint8Array(s);return Array.from(i).map(n=>String.fromCharCode(n)).join("")}async function Ao(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await To(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Co=/^[a-zA-Z0-9_-]{8,64}$/;function rr(t){return typeof t=="string"&&Co.test(t)?t:null}function Oo(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Ci).join("")}let t="";for(let e=0;e<32;e++)t+=Math.floor(Math.random()*16).toString(16);return t}const st=(t,e)=>`${t}-flow-${e}-code-verifier`,Tt=t=>`${t}-flows-code-verifier`;async function Zr(t,e){const r=await q(t,Tt(e));return Array.isArray(r)?r.filter(s=>rr(s)!==null):[]}async function Ro(t,e,r,s,i){await ge(t,st(e,r),s);const n=(await Zr(t,e)).filter(a=>a!==r);for(n.push(r);n.length>co;){const a=n.shift();await G(t,st(e,a)),i?.(a)}await ge(t,Tt(e),n),await ge(t,`${e}-code-verifier`,s)}async function Po(t,e,r){if(r){const i=await q(t,st(e,r));return{verifier:typeof i=="string"?i:null,flowId:r}}const s=await q(t,`${e}-code-verifier`);return{verifier:typeof s=="string"?s:null,flowId:null}}async function Z(t,e,r){const s=`${e}-code-verifier`;if(!r){await G(t,s);return}const i=st(e,r),n=await q(t,i);await G(t,i);const a=await Zr(t,e),o=a.filter(l=>l!==r);o.length!==a.length&&(o.length>0?await ge(t,Tt(e),o):await G(t,Tt(e))),n!=null&&n===await q(t,s)&&await G(t,s)}async function Io(t,e){const r=await Zr(t,e);for(const s of r)await G(t,st(e,s));await G(t,Tt(e)),await G(t,`${e}-code-verifier`)}function jo(t,e){const r=t.indexOf("#");let s=r===-1?t:t.slice(0,r);const i=r===-1?"":t.slice(r),n=s.indexOf("?");if(n!==-1){const o=s.slice(0,n),l=s.slice(n+1).split("&").filter(c=>c!==""&&c!==je&&!c.startsWith(`${je}=`));s=l.length>0?`${o}?${l.join("&")}`:o}const a=s.includes("?")?"&":"?";return`${s}${a}${je}=${encodeURIComponent(e)}${i}`}async function Do(t,e,r=!1,s){const i=xo();let n=i;r&&(n+="/recovery");const a=Oo();await Ro(t,e,a,n,s);const o=await Ao(i);return[o,i===o?"plain":"s256",a]}const No=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Lo(t){const e=t.headers.get(Fr);if(!e||!e.match(No))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Uo(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function Mo(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Bo=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function he(t){if(!Bo.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Q(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function Or(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const s=r.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function zo(t,e){return new Proxy(t,{get:(r,s,i)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const n=s.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,s,i)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,s,i)}})}function Bs(t){return JSON.parse(JSON.stringify(t))}const Re=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},zs=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Fs(t){var e;if(!So(t))throw new tr(Re(t),0);let r;try{r=await t.json()}catch(n){throw zs.includes(t.status)?new tr(t.statusText||`HTTP ${t.status}`,t.status):new te(Re(n),n)}if(zs.includes(t.status))throw new tr(Re(r),t.status);let s;const i=Lo(t);if(i&&i.getTime()>=Ei["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?s=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(s=r.error_code),s){if(s==="weak_password")throw new Ds(Re(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new U}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((n,a)=>n&&typeof a=="string",!0))throw new Ds(Re(r),t.status,r.weak_password.reasons);throw new ho(Re(r),t.status||500,s)}const Fo=(t,e,r,s)=>{const i={method:t,headers:e?.headers||{}};return t==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e?.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),r))};async function $(t,e,r,s){var i;const n=Object.assign({},s?.headers);n[Fr]||(n[Fr]=Ei["2024-01-01"].name),s?.jwt&&(n.Authorization=`Bearer ${s.jwt}`);const a=(i=s?.query)!==null&&i!==void 0?i:{};s?.redirectTo&&(a.redirect_to=s.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",l=await qo(t,e,r+o,{headers:n,noResolveJson:s?.noResolveJson},{},s?.body);return s?.xform?s?.xform(l):{data:Object.assign({},l),error:null}}async function qo(t,e,r,s,i,n){const a=Fo(e,s,i,n);let o;try{o=await t(r,Object.assign({},a))}catch(l){throw new tr(Re(l),0)}if(o.ok||await Fs(o),s?.noResolveJson)return o;try{return await o.json()}catch(l){await Fs(l)}}function Y(t){var e;let r=null;Vo(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=_o(t.expires_in)));const s=(e=t.user)!==null&&e!==void 0?e:typeof t?.id=="string"?t:null;return{data:{session:r,user:s},error:null}}function qs(t){const e=Y(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,s)=>r&&typeof s=="string",!0)&&(e.data.weak_password=t.weak_password),e}function Se(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function Ho(t){return{data:t,error:null}}function Ko(t){const{action_link:e,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n}=t,a=yr(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n},l=Object.assign({},a);return{data:{properties:o,user:l},error:null}}function Hs(t){return t}function Vo(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const Rr=["global","local","others"];class Wo{constructor({url:e="",headers:r={},fetch:s,experimental:i}){this.url=e,this.headers=r,this.fetch=Ai(s),this.experimental=i??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,r=Rr[0]){if(Rr.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Rr.join(", ")}`);try{return await $(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(v(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,r={}){try{return await $(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:Se})}catch(s){if(v(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:r}=e,s=yr(e,["options"]),i=Object.assign(Object.assign({},s),r);return"newEmail"in s&&(i.new_email=s?.newEmail,delete i.newEmail),await $(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:Ko,redirectTo:r?.redirectTo})}catch(r){if(v(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await $(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Se})}catch(r){if(v(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,s,i,n,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},h=await $(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e?.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(n=(i=e?.perPage)===null||i===void 0?void 0:i.toString())!==null&&n!==void 0?n:""},xform:Hs});if(h.error)throw h.error;const u=await h.json(),p=(a=h.headers.get("x-total-count"))!==null&&a!==void 0?a:0,d=(l=(o=h.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return d.length>0&&(d.forEach(g=>{const b=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),y=JSON.parse(g.split(";")[1].split("=")[1]);c[`${y}Page`]=b}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(v(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){he(e);try{return await $(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Se})}catch(r){if(v(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){he(e);try{return await $(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:Se})}catch(s){if(v(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,r=!1){he(e);try{return await $(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:Se})}catch(s){if(v(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){he(e.userId);try{const{data:r,error:s}=await $(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:r,error:s}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _deleteFactor(e){he(e.userId),he(e.id);try{return{data:await $(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,s,i,n,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},h=await $(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e?.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(n=(i=e?.perPage)===null||i===void 0?void 0:i.toString())!==null&&n!==void 0?n:""},xform:Hs});if(h.error)throw h.error;const u=await h.json(),p=(a=h.headers.get("x-total-count"))!==null&&a!==void 0?a:0,d=(l=(o=h.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return d.length>0&&(d.forEach(g=>{const b=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),y=JSON.parse(g.split(";")[1].split("=")[1]);c[`${y}Page`]=b}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(v(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await $(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await $(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await $(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(v(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await $(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await $(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e?.type&&(r.type=e.type),await $(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:s=>{var i;return{data:{providers:(i=s?.providers)!==null&&i!==void 0?i:[]},error:null}}})}catch(r){if(v(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await $(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await $(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await $(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(v(s))return{data:null,error:s};throw s}}async _deleteCustomProvider(e){try{return await $(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _adminListPasskeys(e){Q(this.experimental),he(e.userId);try{return await $(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _adminDeletePasskey(e){Q(this.experimental),he(e.userId),he(e.passkeyId);try{return await $(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}}function Ks(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}globalThis&&Ti()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class Go extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function Jo(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Oi(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function Yo(t){return parseInt(t,16)}function Xo(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function Zo(t){var e;const{chainId:r,domain:s,expirationTime:i,issuedAt:n=new Date,nonce:a,notBefore:o,requestId:l,resources:c,scheme:h,uri:u,version:p}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const d=Oi(t.address),g=h?`${h}://${s}`:s,b=t.statement?`${t.statement}
`:"",y=`${g} wants you to sign in with your Ethereum account:
${d}

${b}`;let w=`URI: ${u}
Version: ${p}
Chain ID: ${r}${a?`
Nonce: ${a}`:""}
Issued At: ${n.toISOString()}`;if(i&&(w+=`
Expiration Time: ${i.toISOString()}`),o&&(w+=`
Not Before: ${o.toISOString()}`),l&&(w+=`
Request ID: ${l}`),c){let S=`
Resources:`;for(const _ of c){if(!_||typeof _!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${_}`);S+=`
- ${_}`}w+=S}return`${y}
${w}`}class L extends Error{constructor({message:e,code:r,cause:s,name:i}){var n;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(n=i??(s instanceof Error?s.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=r}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class ur extends L{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function Qo({error:t,options:e}){var r,s,i;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new L({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=n.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new L({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((s=n.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new L({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((i=n.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new L({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new L({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new L({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return n.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new L({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new L({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const a=window.location.hostname;if(Ri(a)){if(n.rp.id!==a)return new L({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new L({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new L({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new L({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new L({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function el({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new L({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new L({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const s=window.location.hostname;if(Ri(s)){if(r.rpId!==s)return new L({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new L({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new L({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new L({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class tl{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const qr=new tl;function Vs(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:s}=t,i=yr(t,["challenge","user","excludeCredentials"]),n=et(e).buffer,a=Object.assign(Object.assign({},r),{id:et(r.id).buffer}),o=Object.assign(Object.assign({},i),{challenge:n,user:a});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:et(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Ws(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,s=yr(t,["challenge","allowCredentials"]),i=et(e).buffer,n=Object.assign(Object.assign({},s),{challenge:i});if(r&&r.length>0){n.allowCredentials=new Array(r.length);for(let a=0;a<r.length;a++){const o=r[a];n.allowCredentials[a]=Object.assign(Object.assign({},o),{id:et(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return n}function Gs(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:De(new Uint8Array(t.response.attestationObject)),clientDataJSON:De(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Js(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,s=t.getClientExtensionResults(),i=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:De(new Uint8Array(i.authenticatorData)),clientDataJSON:De(new Uint8Array(i.clientDataJSON)),signature:De(new Uint8Array(i.signature)),userHandle:i.userHandle?De(new Uint8Array(i.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Ri(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function hr(){var t,e;return!!(B()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator?.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator?.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Pi(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ur("Browser returned unexpected credential type",e)}:{data:null,error:new ur("Empty credential response",e)}}catch(e){return{data:null,error:Qo({error:e,options:t})}}}async function Ii(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ur("Browser returned unexpected credential type",e)}:{data:null,error:new ur("Empty credential response",e)}}catch(e){return{data:null,error:el({error:e,options:t})}}}const rl={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},sl={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function dr(...t){const e=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),r=i=>i instanceof ArrayBuffer||ArrayBuffer.isView(i),s={};for(const i of t)if(i)for(const n in i){const a=i[n];if(a!==void 0)if(Array.isArray(a))s[n]=a;else if(r(a))s[n]=a;else if(e(a)){const o=s[n];e(o)?s[n]=dr(o,a):s[n]=dr(a)}else s[n]=a}return s}function il(t,e){return dr(rl,t,e||{})}function nl(t,e){return dr(sl,t,e||{})}class al{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:s,signal:i},n){var a;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!o)return{data:null,error:l};const c=i??qr.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:h}=o.webauthn.credential_options.publicKey;if(!h.name){const u=s;if(u)h.name=`${h.id}:${u}`;else{const d=(await this.client.getUser()).data.user,g=((a=d?.user_metadata)===null||a===void 0?void 0:a.name)||d?.email||d?.id||"User";h.name=`${h.id}:${g}`}}h.displayName||(h.displayName=h.name)}switch(o.webauthn.type){case"create":{const h=il(o.webauthn.credential_options.publicKey,n?.create),{data:u,error:p}=await Pi({publicKey:h,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const h=nl(o.webauthn.credential_options.publicKey,n?.request),{data:u,error:p}=await Ii(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:h,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(o){return v(o)?{data:null,error:o}:{data:null,error:new te("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:r,webauthn:s}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:i}={}},n){if(!r)return{data:null,error:new xt("rpId is required for WebAuthn authentication")};try{if(!hr())return{data:null,error:new te("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:s},signal:i},{request:n});if(!a)return{data:null,error:o};const{webauthn:l}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:s,credential_response:l.credential_response}})}catch(a){return v(a)?{data:null,error:a}:{data:null,error:new te("Unexpected error in authenticate",a)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:i}={}},n){if(!r)return{data:null,error:new xt("rpId is required for WebAuthn registration")};try{if(!hr())return{data:null,error:new te("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(h=>{var u;return(u=h.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===e&&p.status!=="unverified")}).then(h=>h?this.client.mfa.unenroll({factorId:h?.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:r,rpOrigins:s},signal:i},{create:n});return l?this._verify({factorId:a.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(a){return v(a)?{data:null,error:a}:{data:null,error:new te("Unexpected error in register",a)}}}}Jo();const ol={url:no,storageKey:ao,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:oo,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},Ge={};class At{get jwks(){var e,r;return(r=(e=Ge[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){Ge[this.storageKey]=Object.assign(Object.assign({},Ge[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=Ge[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Ge[this.storageKey]=Object.assign(Object.assign({},Ge[this.storageKey]),{cachedAt:e})}constructor(e){var r,s,i;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},ol),e);if(this.storageKey=n.storageKey,this.instanceID=(r=At.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,At.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&B()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.experimental=(s=n.experimental)!==null&&s!==void 0?s:{},this.admin=new Wo({url:n.url,headers:n.headers,fetch:n.fetch,experimental:this.experimental}),this.url=n.url,this.headers=n.headers,this.fetch=Ai(n.fetch),this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,this.lockAcquireTimeout=n.lockAcquireTimeout,n.lock!=null&&(this.lock=n.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new al(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:Ti()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Ks(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=Ks(this.memoryStorage)),B()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(i=this.broadcastChannel)===null||i===void 0||i.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a),(a.data.event==="TOKEN_REFRESHED"||a.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(a.data.event,a.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}n.skipAutoInitialize||this.initialize().catch(a=>{this._debug("#initialize()","error",a)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${ki}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const r=await this.initializePromise,s=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const i of s)await this._notifyAllSubscribers(i.event,i.session,i.broadcast);return r}async _initialize(){var e;try{let r={},s="none";if(B()&&(r=Ms(window.location.href),this._isImplicitGrantCallback(r)?s="implicit":await this._isPKCECallback(r)&&(s="pkce")),B()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:n}=await this._getSessionFromURL(r,s);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),fo(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return{error:n}}const{session:a,redirectType:o}=i;return this._debug("#_initialize()","detected session in URL",a,"redirect type",o),await this._saveSession(a),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",a):await this._notifyAllSubscribers("SIGNED_IN",a)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return v(r)?this._returnResult({error:r}):this._returnResult({error:new te("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,s,i;try{const n=await $(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(r=e?.options)===null||r===void 0?void 0:r.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e?.options)===null||i===void 0?void 0:i.captchaToken}},xform:Y}),{data:a,error:o}=n;if(o||!a)return this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(v(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var r,s,i;let n=null;try{let a;if("email"in e){const{email:u,password:p,options:d}=e;let g=null,b=null;this.flowType==="pkce"&&([g,b,n]=await this._getCodeChallengeAndMethod()),a=await $(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(d?.emailRedirectTo,n),body:{email:u,password:p,data:(r=d?.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:d?.captchaToken},code_challenge:g,code_challenge_method:b},xform:Y})}else if("phone"in e){const{phone:u,password:p,options:d}=e;a=await $(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:p,data:(s=d?.data)!==null&&s!==void 0?s:{},channel:(i=d?.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:d?.captchaToken}},xform:Y})}else throw new Vt("You must provide either an email or phone number and a password");const{data:o,error:l}=a;if(l||!o)return await Z(this.storage,this.storageKey,n),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,h=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:h,session:c},error:null})}catch(a){if(await Z(this.storage,this.storageKey,n),v(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let r;if("email"in e){const{email:n,password:a,options:o}=e;r=await $(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:a,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:qs})}else if("phone"in e){const{phone:n,password:a,options:o}=e;r=await $(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:a,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:qs})}else throw new Vt("You must provide either an email or phone number and a password");const{data:s,error:i}=r;if(i)return this._returnResult({data:{user:null,session:null},error:i});if(!s||!s.session||!s.user){const n=new We;return this._returnResult({data:{user:null,session:null},error:n})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(r){if(v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,s,i,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e,r){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,r)):this._exchangeCodeForSession(e,r)}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,s,i,n,a,o,l,c,h,u,p;let d,g;if("message"in e)d=e.message,g=e.signature;else{const{chain:b,wallet:y,statement:w,options:S}=e;let _;if(B())if(typeof y=="object")_=y;else{const ue=window;if("ethereum"in ue&&typeof ue.ethereum=="object"&&"request"in ue.ethereum&&typeof ue.ethereum.request=="function")_=ue.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!S?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");_=y}const x=new URL((r=S?.url)!==null&&r!==void 0?r:window.location.href),H=await _.request({method:"eth_requestAccounts"}).then(ue=>ue).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!H||H.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const T=Oi(H[0]);let P=(s=S?.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!P){const ue=await _.request({method:"eth_chainId"});P=Yo(ue)}const ct={domain:x.host,address:T,statement:w,uri:x.href,version:"1",chainId:P,nonce:(i=S?.signInWithEthereum)===null||i===void 0?void 0:i.nonce,issuedAt:(a=(n=S?.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&a!==void 0?a:new Date,expirationTime:(o=S?.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=S?.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=S?.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(h=S?.signInWithEthereum)===null||h===void 0?void 0:h.resources};d=Zo(ct),g=await _.request({method:"personal_sign",params:[Xo(d),T]})}try{const{data:b,error:y}=await $(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:d,signature:g},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Y});if(y)throw y;if(!b||!b.session||!b.user){const w=new We;return this._returnResult({data:{user:null,session:null},error:w})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:y})}catch(b){if(v(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async signInWithSolana(e){var r,s,i,n,a,o,l,c,h,u,p,d;let g,b;if("message"in e)g=e.message,b=e.signature;else{const{chain:y,wallet:w,statement:S,options:_}=e;let x;if(B())if(typeof w=="object")x=w;else{const T=window;if("solana"in T&&typeof T.solana=="object"&&("signIn"in T.solana&&typeof T.solana.signIn=="function"||"signMessage"in T.solana&&typeof T.solana.signMessage=="function"))x=T.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof w!="object"||!_?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");x=w}const H=new URL((r=_?.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in x&&x.signIn){const T=await x.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},_?.signInWithSolana),{version:"1",domain:H.host,uri:H.href}),S?{statement:S}:null));let P;if(Array.isArray(T)&&T[0]&&typeof T[0]=="object")P=T[0];else if(T&&typeof T=="object"&&"signedMessage"in T&&"signature"in T)P=T;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in P&&"signature"in P&&(typeof P.signedMessage=="string"||P.signedMessage instanceof Uint8Array)&&P.signature instanceof Uint8Array)g=typeof P.signedMessage=="string"?P.signedMessage:new TextDecoder().decode(P.signedMessage),b=P.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in x)||typeof x.signMessage!="function"||!("publicKey"in x)||typeof x!="object"||!x.publicKey||!("toBase58"in x.publicKey)||typeof x.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");g=[`${H.host} wants you to sign in with your Solana account:`,x.publicKey.toBase58(),...S?["",S,""]:[""],"Version: 1",`URI: ${H.href}`,`Issued At: ${(i=(s=_?.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((n=_?.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${_.signInWithSolana.notBefore}`]:[],...!((a=_?.signInWithSolana)===null||a===void 0)&&a.expirationTime?[`Expiration Time: ${_.signInWithSolana.expirationTime}`]:[],...!((o=_?.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${_.signInWithSolana.chainId}`]:[],...!((l=_?.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${_.signInWithSolana.nonce}`]:[],...!((c=_?.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${_.signInWithSolana.requestId}`]:[],...!((u=(h=_?.signInWithSolana)===null||h===void 0?void 0:h.resources)===null||u===void 0)&&u.length?["Resources",..._.signInWithSolana.resources.map(P=>`- ${P}`)]:[]].join(`
`);const T=await x.signMessage(new TextEncoder().encode(g),"utf8");if(!T||!(T instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");b=T}}try{const{data:y,error:w}=await $(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:g,signature:De(b)},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(d=e.options)===null||d===void 0?void 0:d.captchaToken}}:null),xform:Y});if(w)throw w;if(!y||!y.session||!y.user){const S=new We;return this._returnResult({data:{user:null,session:null},error:S})}return y.session&&(await this._saveSession(y.session),await this._notifyAllSubscribers("SIGNED_IN",y.session)),this._returnResult({data:Object.assign({},y),error:w})}catch(y){if(v(y))return this._returnResult({data:{user:null,session:null},error:y});throw y}}async _exchangeCodeForSession(e,r){const s=r?.flowId!=null,i=s?rr(r?.flowId):B()?rr(Ms(window.location.href)[je]):null;s&&!i&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",r?.flowId);const{verifier:n,flowId:a}=s&&!i?{verifier:null,flowId:null}:await Po(this.storage,this.storageKey,i),[o,l]=(n??"").split("/");try{if(!o&&this.flowType==="pkce")throw new po;const{data:c,error:h}=await $(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:Y});if(await Z(this.storage,this.storageKey,a),h)throw h;if(!c||!c.session||!c.user){const u=new We;return this._returnResult({data:{user:null,session:null,redirectType:null},error:u})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c.session)),this._returnResult({data:Object.assign(Object.assign({},c),{redirectType:l??null}),error:h})}catch(c){if(await Z(this.storage,this.storageKey,a),v(c))return this._returnResult({data:{user:null,session:null,redirectType:null},error:c});throw c}}async signInWithIdToken(e){try{const{options:r,provider:s,token:i,access_token:n,nonce:a}=e,o=await $(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:n,nonce:a,gotrue_meta_security:{captcha_token:r?.captchaToken}},xform:Y}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const h=new We;return this._returnResult({data:{user:null,session:null},error:h})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(r){if(v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,s,i,n,a;let o=null;try{if("email"in e){const{email:l,options:c}=e;let h=null,u=null;this.flowType==="pkce"&&([h,u,o]=await this._getCodeChallengeAndMethod());const{error:p}=await $(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(r=c?.data)!==null&&r!==void 0?r:{},create_user:(s=c?.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},code_challenge:h,code_challenge_method:u},redirectTo:this._maybeAppendFlowIdToRedirect(c?.emailRedirectTo,o)});return this._returnResult({data:{user:null,session:null},error:p})}if("phone"in e){const{phone:l,options:c}=e,{data:h,error:u}=await $(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(i=c?.data)!==null&&i!==void 0?i:{},create_user:(n=c?.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},channel:(a=c?.channel)!==null&&a!==void 0?a:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:h?.message_id},error:u})}throw new Vt("You must provide either an email or phone number.")}catch(l){if(await Z(this.storage,this.storageKey,o),v(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var r,s;try{let i,n;"options"in e&&(i=(r=e.options)===null||r===void 0?void 0:r.redirectTo,n=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:a,error:o}=await $(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:i,xform:Y});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const l=a.session,c=a.user;return l?.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(v(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithSSO(e){var r,s,i,n;let a=null;try{let o=null,l=null;this.flowType==="pkce"&&([o,l,a]=await this._getCodeChallengeAndMethod());const c=await $(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((r=e.options)===null||r===void 0?void 0:r.redirectTo,a)}),!((s=e?.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:Ho});return!((i=c.data)===null||i===void 0)&&i.url&&B()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await Z(this.storage,this.storageKey,a),v(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)throw s;if(!r)throw new U;const{error:i}=await $(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:i})})}catch(e){if(v(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let r=null;try{const s=`${this.url}/resend`;if("email"in e){const{email:i,type:n,options:a}=e;let o=null,l=null;this.flowType==="pkce"&&([o,l,r]=await this._getCodeChallengeAndMethod());const{error:c}=await $(this.fetch,"POST",s,{headers:this.headers,body:{email:i,type:n,gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,r)});return c&&await Z(this.storage,this.storageKey,r),this._returnResult({data:{user:null,session:null},error:c})}else if("phone"in e){const{phone:i,type:n,options:a}=e,{data:o,error:l}=await $(this.fetch,"POST",s,{headers:this.headers,body:{phone:i,type:n,gotrue_meta_security:{captcha_token:a?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o?.message_id},error:l})}throw new Vt("You must provide either an email or phone number and a type")}catch(s){if(await Z(this.storage,this.storageKey,r),v(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await r()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=r();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await q(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<Cr:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const a=await q(this.userStorage,this.storageKey+"-user");a?.user?e.user=a.user:e.user=Or()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const a={value:this.suppressGetSessionWarning};e.user=zo(e.user,a),a.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:i,error:n}=await this._callRefreshToken(e.refresh_token);if(n){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await q(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:n})}return this._returnResult({data:{session:i},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let r;return this.lock!=null?r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):r=await this._getUser(),r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await $(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Se}):await this._useSession(async r=>{var s,i,n;const{data:a,error:o}=r;if(o)throw o;return!(!((s=a.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new U}:await $(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(i=a.session)===null||i===void 0?void 0:i.access_token)!==null&&n!==void 0?n:void 0,xform:Se})})}catch(r){if(v(r))return Kt(r)&&await this._removeSession(),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r)):await this._updateUser(e,r)}async _updateUser(e,r={}){let s=null;try{return await this._useSession(async i=>{const{data:n,error:a}=i;if(a)throw a;if(!n.session)throw new U;const o=n.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c,s]=await this._getCodeChallengeAndMethod());const{data:h,error:u}=await $(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(r?.emailRedirectTo,s),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:Se});if(u)throw u;return o.user=h.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(i){if(await Z(this.storage,this.storageKey,s),v(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new U;const r=Date.now()/1e3;let s=r,i=!0,n=null;const{payload:a}=Jt(e.access_token);if(a.exp&&(s=a.exp,i=s<=r),i){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};n=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});n={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-r,expires_at:s},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(r){if(v(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async r=>{var s;if(!e){const{data:a,error:o}=r;if(o)throw o;e=(s=a.session)!==null&&s!==void 0?s:void 0}if(!e?.refresh_token)throw new U;const{data:i,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):i?this._returnResult({data:{user:i.user,session:i},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){var s;try{if(!B())throw new Wt("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Wt(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new Is("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Wt("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Is("No code detected.");const{data:_,error:x}=await this._exchangeCodeForSession(e.code,{flowId:e[je]});if(x)throw x;const H=new URL(window.location.href);return H.searchParams.delete("code"),H.searchParams.delete(je),window.history.replaceState(window.history.state,"",H.toString()),{data:{session:_.session,redirectType:(s=_.redirectType)!==null&&s!==void 0?s:null},error:null}}const{provider_token:i,provider_refresh_token:n,access_token:a,refresh_token:o,expires_in:l,expires_at:c,token_type:h}=e;if(!a||!l||!o||!h)throw new Wt("No session defined in URL");const u=Math.round(Date.now()/1e3),p=parseInt(l);let d=u+p;c&&(d=parseInt(c));const g=d-u;g*1e3<=me&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${p}s`);const b=d-p;u-b>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",b,d,u):u-b<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",b,d,u);const{data:y,error:w}=await this._getUser(a);if(w)throw w;const S={provider_token:i,provider_refresh_token:n,access_token:a,expires_in:p,expires_at:d,refresh_token:o,token_type:h,user:y.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:S,redirectType:e.type},error:null})}catch(i){if(v(i))return this._returnResult({data:{session:null,redirectType:null},error:i});throw i}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const r=rr(e[je]);return r&&await q(this.storage,st(this.storageKey,r))?!0:!!await q(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var s;const i=async()=>{await this._removeSession()},{data:n,error:a}=r;if(a&&!Kt(a))return this._returnResult({error:a});const o=(s=n.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:l}=await this.admin.signOut(o,e);if(l&&!(Ps(l)&&(l.status===404||l.status===401||l.status===403)||Kt(l)))return e!=="others"&&await i(),this._returnResult({error:l})}return e!=="others"&&await i(),this._returnResult({error:null})})}onAuthStateChange(e){const r=$o(),s={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,s),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)}):await this._emitInitialSession(r)))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async r=>{var s,i;try{const{data:{session:n},error:a}=r;if(a)throw a;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),Kt(n)||Gt(n)||Ps(n)&&(n.code==="refresh_token_not_found"||n.code==="refresh_token_already_used"||n.code==="session_expired")?console.warn(n):console.error(n)}})}async resetPasswordForEmail(e,r={}){let s=null,i=null,n=null;this.flowType==="pkce"&&([s,i,n]=await this._getCodeChallengeAndMethod(!0));try{return await $(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(r.redirectTo,n)})}catch(a){if(await Z(this.storage,this.storageKey,n),v(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:r,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;let s=null;try{const{data:i,error:n}=await this._useSession(async a=>{var o,l,c,h,u;const{data:p,error:d}=a;if(d)throw d;const{url:g,flowId:b}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return s=b,await $(this.fetch,"GET",g,{headers:this.headers,jwt:(u=(h=p.session)===null||h===void 0?void 0:h.access_token)!==null&&u!==void 0?u:void 0})});if(n)throw n;return B()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(i?.url),this._returnResult({data:{provider:e.provider,url:i?.url,flowId:s},error:null})}catch(i){if(v(i))return this._returnResult({data:{provider:e.provider,url:null,flowId:s},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var s;try{const{error:i,data:{session:n}}=r;if(i)throw i;const{options:a,provider:o,token:l,access_token:c,nonce:h}=e,u=await $(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=n?.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:c,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:Y}),{data:p,error:d}=u;return d?this._returnResult({data:{user:null,session:null},error:d}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new We}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:d}))}catch(i){if(await Z(this.storage,this.storageKey,null),v(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var s,i;const{data:n,error:a}=r;if(a)throw a;return await $(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=n.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r="#_refreshAccessToken()";this._debug(r,"begin");try{const s=Date.now();return await Eo(async i=>(i>0&&await ko(200*Math.pow(2,i-1)),this._debug(r,"refreshing attempt",i),await $(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Y})),(i,n)=>{const a=200*Math.pow(2,i);return n&&Gt(n)&&Date.now()+a-s<me})}catch(s){if(this._debug(r,"error",s),v(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const{url:s,flowId:i}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",s),B()&&!r.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s,flowId:i},error:null}}async _recoverAndRefresh(){var e,r;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await q(this.storage,this.storageKey);if(i&&this.userStorage){let a=await q(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!a&&(a={user:i.user},await ge(this.userStorage,this.storageKey+"-user",a)),i.user=(e=a?.user)!==null&&e!==void 0?e:Or()}else if(i&&!i.user&&!i.user){const a=await q(this.storage,this.storageKey+"-user");a&&a?.user?(i.user=a.user,await G(this.storage,this.storageKey+"-user"),await ge(this.storage,this.storageKey,i)):i.user=Or()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const n=((r=i.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<Cr;if(this._debug(s,`session has${n?"":" not"} expired with margin of ${Cr}s`),n){if(this.autoRefreshToken&&i.refresh_token){const{error:a}=await this._callRefreshToken(i.refresh_token);a&&(mo(a)?this._debug(s,"refresh discarded by commit guard",a):this._debug(s,"refresh failed",a))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:a,error:o}=await this._getUser(i.access_token);!o&&a?.user?(i.user=a.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(a){console.error("Error getting user data:",a),this._debug(s,"error getting user data, skipping SIGNED_IN notification",a)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),Gt(i)?console.warn(i):console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var r,s;if(!e)throw new U;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const i="#_callRefreshToken()";this._debug(i,"begin");try{this.refreshingDeferred=new $r;const n=await q(this.storage,this.storageKey),{data:a,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!a.session)throw new U;const l=await q(this.storage,this.storageKey);if(n!==null&&(l===null||l.refresh_token!==n.refresh_token)){this._debug(i,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const p={data:null,error:new js};return this.refreshingDeferred.resolve(p),p}const h=this._sessionRemovalEpoch;if(await this._saveSession(a.session),this._sessionRemovalEpoch!==h){this._debug(i,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await G(this.storage,this.storageKey),this.userStorage&&await G(this.userStorage,this.storageKey+"-user");const p={data:null,error:new js};return this.refreshingDeferred.resolve(p),p}await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const u={data:a.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(n){if(this._debug(i,"error",n),v(n)){const a={data:null,error:n};if(!Gt(n)){const o=await q(this.storage,this.storageKey);!!(o?.expires_at&&o.expires_at*1e3>Date.now())?this._debug(i,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:a,expiresAt:Date.now()+io},(r=this.refreshingDeferred)===null||r===void 0||r.resolve(a),a}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(n),n}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,r,s=!0){if(this._pendingInitNotifications!==null&&s){this._pendingInitNotifications.push({event:e,session:r,broadcast:s});return}const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",r,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:r});const n=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,r)}catch(l){n.push(l)}});if(await Promise.all(a),n.length>0){for(let o=0;o<n.length;o+=1)console.error(n[o]);throw n[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const r=Object.assign({},e),s=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&r.user&&await ge(this.userStorage,this.storageKey+"-user",{user:r.user});const i=Object.assign({},r);delete i.user;const n=Bs(i);await ge(this.storage,this.storageKey,n)}else{const i=Bs(r);await ge(this.storage,this.storageKey,i)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await G(this.storage,this.storageKey),await Io(this.storage,this.storageKey),await G(this.storage,this.storageKey+"-user"),this.userStorage&&await G(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&B()&&window?.removeEventListener&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),me);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/me);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${me}ms, refresh threshold is ${ft} ticks`),i<=ft&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof Go)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/me);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${me}ms, refresh threshold is ${ft} ticks`),i<=ft&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!B()||!window?.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window?.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;if(this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(r,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,s){let i=s?.redirectTo,n=null,a=null,o=null;this.flowType==="pkce"&&([n,a,o]=await this._getCodeChallengeAndMethod(),i=this._maybeAppendFlowIdToRedirect(i,o));const l=[`provider=${encodeURIComponent(r)}`];if(i&&l.push(`redirect_to=${encodeURIComponent(i)}`),s?.scopes&&l.push(`scopes=${encodeURIComponent(s.scopes)}`),n!=null&&a!=null){const c=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(a)}`});l.push(c.toString())}if(s?.queryParams){const c=new URLSearchParams(s.queryParams);l.push(c.toString())}return s?.skipBrowserRedirect&&l.push(`skip_http_redirect=${s.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,r){return!e||!r||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:jo(e,r)}async _getCodeChallengeAndMethod(e=!1){return Do(this.storage,this.storageKey,e,r=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",r))}async _unenroll(e){try{return await this._useSession(async r=>{var s;const{data:i,error:n}=r;return n?this._returnResult({data:null,error:n}):await $(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i?.session)===null||s===void 0?void 0:s.access_token})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var s,i;const{data:n,error:a}=r;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await $(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=n?.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((i=l?.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){const r=async()=>{try{return await this._useSession(async s=>{var i;const{data:n,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Gs(e.webauthn.credential_response):Js(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await $(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(i=n?.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challenge(e){const r=async()=>{try{return await this._useSession(async s=>{var i;const{data:n,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=await $(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(i=n?.session)===null||i===void 0?void 0:i.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Vs(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Ws(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challengeAndVerify(e){const{data:r,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:s}=await this.getUser();if(s)return{data:null,error:s};const i={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=r?.factors)!==null&&e!==void 0?e:[])i.all.push(n),n.status==="verified"&&i[n.factor_type].push(n);return{data:i,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,s,i,n;if(e)try{const{payload:d}=Jt(e);let g=null;d.aal&&(g=d.aal);let b=g;const{data:{user:y},error:w}=await this.getUser(e);if(w)return this._returnResult({data:null,error:w});((s=(r=y?.factors)===null||r===void 0?void 0:r.filter(x=>x.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(b="aal2");const _=d.amr||[];return{data:{currentLevel:g,nextLevel:b,currentAuthenticationMethods:_},error:null}}catch(d){if(v(d))return this._returnResult({data:null,error:d});throw d}const{data:{session:a},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!a)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Jt(a.access_token);let c=null;l.aal&&(c=l.aal);let h=c;((n=(i=a.user.factors)===null||i===void 0?void 0:i.filter(d=>d.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(h="aal2");const p=l.amr||[];return{data:{currentLevel:c,nextLevel:h,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;return i?this._returnResult({data:null,error:i}):s?await $(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new U})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:i},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new U});const a=await $(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:i.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&B()&&!r?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:i},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new U});const a=await $(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:i.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&B()&&!r?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;return s?this._returnResult({data:null,error:s}):r?await $(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new U})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;return i?this._returnResult({data:null,error:i}):s?(await $(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new U})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let s=r.keys.find(o=>o.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+uo>i)return s;const{data:n,error:a}=await $(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=i,s=n.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,r={}){try{let s=e;if(!s){const{data:d,error:g}=await this.getSession();if(g||!d.session)return this._returnResult({data:null,error:g});s=d.session.access_token}const{header:i,payload:n,signature:a,raw:{header:o,payload:l}}=Jt(s);if(!r?.allowExpired)try{Uo(n.exp)}catch(d){throw new lr(d instanceof Error?d.message:"JWT validation failed")}const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,r?.keys?{keys:r.keys}:r?.jwks);if(!c){const{error:d}=await this.getUser(s);if(d)throw d;return{data:{claims:n,header:i,signature:a},error:null}}const h=Mo(i.alg),u=await crypto.subtle.importKey("jwk",c,h,!0,["verify"]);if(!await crypto.subtle.verify(h,u,a,wo(`${o}.${l}`)))throw new lr("Invalid JWT signature");return{data:{claims:n,header:i,signature:a},error:null}}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async signInWithPasskey(e){var r,s,i;Q(this.experimental);try{if(!hr())return this._returnResult({data:null,error:new te("Browser does not support WebAuthn",null)});const{data:n,error:a}=await this._startPasskeyAuthentication({options:{captchaToken:(r=e?.options)===null||r===void 0?void 0:r.captchaToken}});if(a||!n)return this._returnResult({data:null,error:a});const o=Ws(n.options),l=(i=(s=e?.options)===null||s===void 0?void 0:s.signal)!==null&&i!==void 0?i:qr.createNewAbortSignal(),{data:c,error:h}=await Ii({publicKey:o,signal:l});if(h||!c)return this._returnResult({data:null,error:h??new te("WebAuthn ceremony failed",null)});const u=Js(c);return this._verifyPasskeyAuthentication({challengeId:n.challenge_id,credential:u})}catch(n){if(v(n))return this._returnResult({data:null,error:n});throw n}}async registerPasskey(e){var r,s;Q(this.experimental);try{if(!hr())return this._returnResult({data:null,error:new te("Browser does not support WebAuthn",null)});const{data:i,error:n}=await this._startPasskeyRegistration();if(n||!i)return this._returnResult({data:null,error:n});const a=Vs(i.options),o=(s=(r=e?.options)===null||r===void 0?void 0:r.signal)!==null&&s!==void 0?s:qr.createNewAbortSignal(),{data:l,error:c}=await Pi({publicKey:a,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new te("WebAuthn ceremony failed",null)});const h=Gs(l);return this._verifyPasskeyRegistration({challengeId:i.challenge_id,credential:h})}catch(i){if(v(i))return this._returnResult({data:null,error:i});throw i}}async _startPasskeyRegistration(){Q(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new U});const{data:i,error:n}=await $(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:r.access_token,body:{}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:i,error:null})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){Q(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new U});const{data:n,error:a}=await $(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:s.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyAuthentication(e){var r;Q(this.experimental);try{const{data:s,error:i}=await $(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(r=e?.options)===null||r===void 0?void 0:r.captchaToken}}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:s,error:null})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async _verifyPasskeyAuthentication(e){Q(this.experimental);try{const{data:r,error:s}=await $(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:Y});return s?this._returnResult({data:null,error:s}):(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:r,error:null}))}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _listPasskeys(){Q(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new U});const{data:i,error:n}=await $(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:r.access_token,xform:a=>({data:a,error:null})});return n?this._returnResult({data:null,error:n}):this._returnResult({data:i,error:null})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){Q(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new U});const{data:n,error:a}=await $(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _deletePasskey(e){Q(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new U});const{error:n}=await $(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,noResolveJson:!0});return n?this._returnResult({data:null,error:n}):this._returnResult({data:null,error:null})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}}At.nextInstanceID={};const ll=At,cl="2.112.3";let pt="",fr;if(typeof Deno<"u"){var Pr;pt="deno",fr=(Pr=Deno.version)===null||Pr===void 0?void 0:Pr.deno}else if(typeof document<"u")pt="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")pt="react-native";else{var Ir;pt="node";const t=globalThis.process;fr=t==null||(Ir=t.version)===null||Ir===void 0?void 0:Ir.replace(/^v/,"")}const ji=[`runtime=${pt}`];fr&&ji.push(`runtime-version=${fr}`);const ul={"X-Client-Info":`supabase-js/${cl}; ${ji.join("; ")}`},hl={headers:ul},dl={schema:"public"},fl={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},pl={},ml={enabled:!1,respectSamplingDecision:!0};function gl(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[r,s,i,n]=e;if(r.length!==2||s.length!==32||i.length!==16||n.length!==2)return null;const a=/^[0-9a-f]+$/i;return!a.test(r)||!a.test(s)||!a.test(i)||!a.test(n)||s==="00000000000000000000000000000000"||i==="0000000000000000"?null:{version:r,traceId:s,parentId:i,traceFlags:n,isSampled:(parseInt(n,16)&1)===1}}function bl(t,e){if(!t||!e||e.length===0)return!1;let r;if(t instanceof URL)r=t;else try{r=new URL(t)}catch{return!1}for(const s of e)try{if(typeof s=="string"){if(vl(r.hostname,s))return!0}else if(s instanceof RegExp){if(s.test(r.hostname))return!0}else if(typeof s=="function"&&s(r))return!0}catch{continue}return!1}function vl(t,e){if(e===t)return!0;if(e.startsWith("*.")){const r=e.slice(2);if(t.endsWith(r)&&(t===r||t.endsWith("."+r)))return!0}return!1}function yl(t){const e=[];try{const r=new URL(t);e.push(r.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function Ct(t){"@babel/helpers - typeof";return Ct=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ct(t)}function wl(t,e){if(Ct(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(Ct(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function _l(t){var e=wl(t,"string");return Ct(e)=="symbol"?e:e+""}function $l(t,e,r){return(e=_l(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Ys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function D(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Ys(Object(r),!0).forEach(function(s){$l(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ys(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}const Sl=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),kl=()=>Headers,Di=t=>t.startsWith("sb_publishable_")||t.startsWith("sb_secret_"),El="sb_temp_",Xs=new Set,xl=t=>{var e,r;if(!t.startsWith("sb_")||Di(t)||t.startsWith(El))return;const s=(e=(r=t.match(/^sb_[a-zA-Z0-9]+_/))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:"unknown";Xs.has(s)||(Xs.add(s),console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."))},Zs=(t,e,r,s,i,n)=>{const a=Sl(s),o=kl(),l=i?.enabled===!0,c=i?.respectSamplingDecision!==!1,h=l?yl(e):null,u=!(n?.omitApiKeyAsBearer&&Di(t));return async(p,d)=>{const g=await r();let b=new o(d?.headers);if(b.has("apikey")||b.set("apikey",t),!b.has("Authorization")){const y=g??(u?t:null);y&&b.set("Authorization",`Bearer ${y}`)}if(h){const y=Tl(p,h,c);y&&(y.traceparent&&!b.has("traceparent")&&b.set("traceparent",y.traceparent),y.tracestate&&!b.has("tracestate")&&b.set("tracestate",y.tracestate),y.baggage&&!b.has("baggage")&&b.set("baggage",y.baggage))}return a(p,D(D({},d),{},{headers:b}))}};let Qs=!1,ei=!1;function Tl(t,e,r){const s=En();if(!s)return Qs||(Qs=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!bl(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const i=s();if(!i||!i.traceparent){var n;if(!(i==null||(n=i.carrierKeys)===null||n===void 0)&&n.length&&!ei){ei=!0;const a=i.carrierKeys.includes("sentry-trace")?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":" Configure your tracing SDK to emit W3C trace context on outgoing requests.";console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${i.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.`+a)}return null}if(r){const a=gl(i.traceparent);if(a&&!a.isSampled)return{traceparent:i.traceparent}}return i}function ti(t){return typeof t=="boolean"?{enabled:t}:t}function Al(t){return t.endsWith("/")?t:t+"/"}function Cl(t,e){var r,s,i,n,a,o;const{db:l,auth:c,realtime:h,global:u}=t,{db:p,auth:d,realtime:g,global:b}=e,y=ti(t.tracePropagation),w=ti(e.tracePropagation),S={db:D(D({},p),l),auth:D(D({},d),c),realtime:D(D({},g),h),storage:{},global:D(D(D({},b),u),{},{headers:D(D({},(r=b?.headers)!==null&&r!==void 0?r:{}),(s=u?.headers)!==null&&s!==void 0?s:{})}),tracePropagation:{enabled:(i=(n=y?.enabled)!==null&&n!==void 0?n:w?.enabled)!==null&&i!==void 0?i:!1,respectSamplingDecision:(a=(o=y?.respectSamplingDecision)!==null&&o!==void 0?o:w?.respectSamplingDecision)!==null&&a!==void 0?a:!0},accessToken:async()=>""};return t.accessToken?S.accessToken=t.accessToken:delete S.accessToken,S}function Ol(t){const e=t?.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Al(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Rl=class extends ll{constructor(t){super(t)}},Pl=class{constructor(t,e,r){var s,i;this.supabaseUrl=t,this.supabaseKey=e;const n=Ol(t);if(!e)throw new Error("supabaseKey is required.");xl(e),this.realtimeUrl=new URL("realtime/v1",n),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",n),this.storageUrl=new URL("storage/v1",n),this.functionsUrl=new URL("functions/v1",n);const a=`sb-${n.hostname.split(".")[0]}-auth-token`,o={db:dl,realtime:pl,auth:D(D({},fl),{},{storageKey:a}),global:hl,tracePropagation:ml},l=Cl(r??{},o);if(this.settings=l,this.storageKey=(s=l.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(i=l.global.headers)!==null&&i!==void 0?i:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(h,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=Zs(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=Zs(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(D({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(h=>this.realtime.setAuth(h)).catch(h=>console.warn("Failed to set initial Realtime auth token:",h)),this.rest=new Un(new URL("rest/v1",n).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new so(this.storageUrl.href,this.headers,this.fetch,r?.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Cn(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:s}=await t.auth.getSession();return(e=(r=s.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var t=this,e;return(e=await t._getSessionToken())!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:i,storageKey:n,flowType:a,lock:o,debug:l,throwOnError:c,experimental:h,lockAcquireTimeout:u,skipAutoInitialize:p},d,g){const b={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Rl({url:this.authUrl.href,headers:D(D({},b),d),storageKey:n,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:i,flowType:a,lock:o,debug:l,throwOnError:c,experimental:h,fetch:g,lockAcquireTimeout:u,skipAutoInitialize:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(y=>y.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new Ta(this.realtimeUrl.href,D(D({},t),{},{params:D(D({},{apikey:this.supabaseKey}),t?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e?.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN"||t==="INITIAL_SESSION")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Il=(t,e,r)=>new Pl(t,e,r);function jl(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=20:!1}jl()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");const Dl="https://axtbrjgyjjvgclsszqpb.supabase.co",Nl="sb_publishable_ZPGR3OKnUApF9Nqsrrqogw_3wLtLFmJ",E=Il(Dl,Nl,{auth:{persistSession:!0,autoRefreshToken:!0}});function Ni(t){return{id:t.id,lastName:t.last_name,firstName:t.first_name,email:t.email,sex:t.sex,birthYear:t.birth_year,licenseNumber:t.license_number,licenseType:t.license_type,isAdmin:t.is_admin,isCoach:t.is_coach,mustChangePassword:t.must_change_password,active:t.active,lastLoginAt:t.last_login_at}}async function Ll(){const{data:t}=await E.auth.getUser(),e=t.user?.id;if(!e)return null;const{data:r,error:s}=await E.from("members").select("*").eq("id",e).maybeSingle();return s||!r?null:Ni(r)}async function Ul(){const{data:t,error:e}=await E.from("members").select("*").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});return e||!t?[]:t.map(Ni)}async function Ml(t,e){const{error:r}=await E.from("members").update({last_name:e.lastName,first_name:e.firstName,email:e.email,sex:e.sex,birth_year:e.birthYear,license_number:e.licenseNumber,license_type:e.licenseType,is_admin:e.isAdmin,is_coach:e.isCoach,active:e.active}).eq("id",t);return r?r.message:null}async function Li(){const t=await Ll();t?nr.setState({status:"signed-in",member:t}):nr.setState({status:"signed-out"})}function Bl(){E.auth.onAuthStateChange((t,e)=>{e?Li():nr.setState({status:"signed-out"})})}async function zl(t,e){const{error:r}=await E.auth.signInWithPassword({email:t,password:e});return r?{message:"Email ou mot de passe incorrect."}:(await E.rpc("mark_last_login"),null)}async function Fl(){await E.auth.signOut()}async function ql(t){const{error:e}=await E.auth.updateUser({password:t});return e?{message:"Le changement de mot de passe a échoué."}:(await E.rpc("complete_password_change"),await Li(),null)}var Hl=Object.defineProperty,Kl=Object.getOwnPropertyDescriptor,Nt=(t,e,r,s)=>{for(var i=s>1?void 0:s?Kl(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Hl(e,r,i),i};let Le=class extends A{constructor(){super(...arguments),this.email="",this.password="",this.errorMessage=null,this.submitting=!1}async handleSubmit(t){t.preventDefault(),this.errorMessage=null,this.submitting=!0;const e=await zl(this.email,this.password);this.submitting=!1,e&&(this.errorMessage=e.message)}render(){return f`
      <h1>Connexion à DahultiApp</h1>
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autocomplete="username"
          .value=${this.email}
          @input=${t=>this.email=t.target.value}
        />
        <label for="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          required
          autocomplete="current-password"
          .value=${this.password}
          @input=${t=>this.password=t.target.value}
        />
        <button type="submit" ?disabled=${this.submitting}>
          ${this.submitting?"Connexion…":"Se connecter"}
        </button>
      </form>
    `}};Le.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 360px;
      margin: 3rem auto;
      padding: 0 1.5rem;
    }
    h1 {
      font-size: 1.4rem;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    button {
      margin-top: 0.5rem;
      padding: 0.7rem;
      border: none;
      border-radius: 8px;
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;Nt([m()],Le.prototype,"email",2);Nt([m()],Le.prototype,"password",2);Nt([m()],Le.prototype,"errorMessage",2);Nt([m()],Le.prototype,"submitting",2);Le=Nt([R("login-view")],Le);var Vl=Object.defineProperty,Wl=Object.getOwnPropertyDescriptor,Lt=(t,e,r,s)=>{for(var i=s>1?void 0:s?Wl(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Vl(e,r,i),i};const ri=8;let Ue=class extends A{constructor(){super(...arguments),this.newPassword="",this.confirmPassword="",this.errorMessage=null,this.submitting=!1}validate(){return this.newPassword.length<ri?`Le mot de passe doit contenir au moins ${ri} caractères.`:this.newPassword!==this.confirmPassword?"Les deux mots de passe ne correspondent pas.":null}async handleSubmit(t){t.preventDefault();const e=this.validate();if(e){this.errorMessage=e;return}this.errorMessage=null,this.submitting=!0;const r=await ql(this.newPassword);this.submitting=!1,r&&(this.errorMessage=r.message)}render(){return f`
      <h1>Choisissez votre mot de passe</h1>
      <p class="intro">
        C'est votre première connexion : merci de définir un mot de passe personnel
        avant de continuer.
      </p>
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
        <label for="new-password">Nouveau mot de passe</label>
        <input
          id="new-password"
          type="password"
          required
          autocomplete="new-password"
          .value=${this.newPassword}
          @input=${t=>this.newPassword=t.target.value}
        />
        <label for="confirm-password">Confirmer le mot de passe</label>
        <input
          id="confirm-password"
          type="password"
          required
          autocomplete="new-password"
          .value=${this.confirmPassword}
          @input=${t=>this.confirmPassword=t.target.value}
        />
        <button type="submit" ?disabled=${this.submitting}>
          ${this.submitting?"Enregistrement…":"Valider"}
        </button>
      </form>
    `}};Ue.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 360px;
      margin: 3rem auto;
      padding: 0 1.5rem;
    }
    h1 {
      font-size: 1.4rem;
      text-align: center;
    }
    p.intro {
      color: #374151;
      font-size: 0.9rem;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    button {
      margin-top: 0.5rem;
      padding: 0.7rem;
      border: none;
      border-radius: 8px;
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;Lt([m()],Ue.prototype,"newPassword",2);Lt([m()],Ue.prototype,"confirmPassword",2);Lt([m()],Ue.prototype,"errorMessage",2);Lt([m()],Ue.prototype,"submitting",2);Ue=Lt([R("change-password-view")],Ue);function Ui(t){return{name:t.name,event_type_id:t.eventTypeId,category:t.category,format_id:t.formatId,division_id:t.divisionId,location:t.location,start_date:t.startDate,end_date:t.endDate,organizer_id:t.organizerId,response_deadline:t.responseDeadline}}function Gl(t,e){return{id:t.id,name:t.name,eventTypeId:t.event_type_id,category:t.category,formatId:t.format_id,divisionId:t.division_id,location:t.location,startDate:t.start_date,endDate:t.end_date,organizerId:t.organizer_id,responseDeadline:t.response_deadline,allowedCategories:e.map(r=>({sex:r.sex,ageCategoryId:r.age_category_id}))}}const Jl=900*1e3;let mt=null;function Mi(){mt=null}async function Bi(){if(mt&&mt.expiresAt>Date.now())return mt.data;const[t,e]=await Promise.all([E.from("events").select("*").order("start_date",{ascending:!0}),E.from("event_allowed_categories").select("*")]);if(t.error||!t.data)return[];const r=new Map;for(const i of e.data??[]){const n=r.get(i.event_id)??[];n.push(i),r.set(i.event_id,n)}const s=t.data.map(i=>Gl(i,r.get(i.id)??[]));return mt={data:s,expiresAt:Date.now()+Jl},s}async function zi(t,e){if(e.length===0)return null;const{error:r}=await E.from("event_allowed_categories").insert(e.map(s=>({event_id:t,sex:s.sex,age_category_id:s.ageCategoryId})));return r?r.message:null}async function Yl(t){const{data:e,error:r}=await E.from("events").insert(Ui(t)).select("id").single();if(r||!e)return r?.message??"La création de l'événement a échoué.";const s=await zi(e.id,t.allowedCategories);return s?(await E.from("events").delete().eq("id",e.id),s):(Mi(),null)}async function Xl(t,e){const{error:r}=await E.from("events").update(Ui(e)).eq("id",t);if(r)return r.message;const{error:s}=await E.from("event_allowed_categories").delete().eq("event_id",t);if(s)return s.message;const i=await zi(t,e.allowedCategories);return i||Mi(),i}function Zl(t){return{id:t.id,sex:t.sex,label:t.label,minBirthYear:t.min_birth_year,maxBirthYear:t.max_birth_year,sortOrder:t.sort_order}}function Fi(t){return{sex:t.sex,label:t.label,min_birth_year:t.minBirthYear,max_birth_year:t.maxBirthYear,sort_order:t.sortOrder}}async function Ut(){const{data:t,error:e}=await E.from("age_categories").select("*").order("sex",{ascending:!0}).order("sort_order",{ascending:!0});return e||!t?[]:t.map(Zl)}async function Ql(t){const{error:e}=await E.from("age_categories").insert(Fi(t));return e?e.message:null}async function ec(t,e){const{error:r}=await E.from("age_categories").update(Fi(e)).eq("id",t);return r?r.message:null}async function tc(t){const{error:e}=await E.from("age_categories").delete().eq("id",t);return e?e.message:null}async function rc(t){const{data:e,error:r}=await E.from("availabilities").select("member_id, status").eq("event_id",t);return r||!e?new Map:new Map(e.map(s=>[s.member_id,s.status]))}async function sc(){const{data:t}=await E.auth.getUser(),e=t.user?.id;if(!e)return new Set;const{data:r,error:s}=await E.from("availabilities").select("event_id").eq("member_id",e);return s||!r?new Set:new Set(r.map(i=>i.event_id))}async function ic(t,e){const{data:r}=await E.auth.getUser(),s=r.user?.id;if(!s)return"Vous devez être connecté pour répondre.";const{error:i}=await E.from("availabilities").upsert({event_id:t,member_id:s,status:e,responded_at:new Date().toISOString()},{onConflict:"event_id,member_id"});return i?i.message:null}function Qr(t,e,r){return t.find(i=>i.sex===e&&(i.minBirthYear===null||r>=i.minBirthYear)&&(i.maxBirthYear===null||r<=i.maxBirthYear))??null}function si(t,e){return`${t}:${e}`}function nc(t,e,r,s){const i=new Set(r.map(n=>si(n.sex,n.ageCategoryId)));return t.map(n=>{const a=Qr(e,n.sex,n.birthYear);return a!==null&&i.has(si(n.sex,a.id))?{member:n,status:s.get(n.id)??"no-response"}:{member:n,status:"not-concerned"}})}function ac(t,e,r,s,i=new Date().toISOString().slice(0,10)){const n=Qr(r,e.sex,e.birthYear);return n?t.filter(a=>s.has(a.id)||a.responseDeadline<i?!1:a.allowedCategories.some(o=>o.sex===e.sex&&o.ageCategoryId===n.id)):[]}function oc(t){const e={totalAvailable:0,womenAvailable:0,menAvailable:0,uncertain:0,notConcerned:0,noResponse:0,unavailable:0,totalResponses:0};for(const{member:r,status:s}of t)switch(s){case"available":e.totalAvailable+=1,r.sex==="F"?e.womenAvailable+=1:e.menAvailable+=1,e.totalResponses+=1;break;case"unavailable":e.unavailable+=1,e.totalResponses+=1;break;case"uncertain":e.uncertain+=1,e.totalResponses+=1;break;case"no-response":e.noResponse+=1;break;case"not-concerned":e.notConcerned+=1;break}return e}const ii=["Mixte","Féminin","Open","Loose Mixte","Master"];function pr(t){return t&&t.trim()?t:"Lieu inconnu"}function lc(t,e){if(!t)return"Non renseigné";const r=e.find(s=>s.id===t);return r?`${r.firstName} ${r.lastName}`:"Non renseigné"}function cc(t,e,r,s){return[t,e,r,s].map(i=>i.trim()).filter(i=>i.length>0).join(" ")}var uc=Object.defineProperty,hc=Object.getOwnPropertyDescriptor,Sr=(t,e,r,s)=>{for(var i=s>1?void 0:s?hc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&uc(e,r,i),i};let it=class extends A{constructor(){super(...arguments),this.unanswered=[],this.loading=!0}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;const[t,e,r]=await Promise.all([Bi(),Ut(),sc()]);this.unanswered=ac(t,this.member,e,r).sort((s,i)=>s.startDate.localeCompare(i.startDate)),this.loading=!1}handleSelect(t){this.dispatchEvent(new CustomEvent("select-event",{detail:t,bubbles:!0,composed:!0}))}render(){return f`
      <h2>Bonjour ${this.member.firstName} 👋</h2>
      <p class="greeting">Bienvenue sur DahultiApp.</p>

      <h3>Évènements en attente de votre réponse</h3>
      ${this.loading?f`<p>Chargement…</p>`:this.unanswered.length===0?f`<p class="empty">Vous êtes à jour, aucune réponse en attente 🎉</p>`:f`
              <ul>
                ${this.unanswered.map(t=>f`
                    <li>
                      <button @click=${()=>this.handleSelect(t)}>
                        <span class="name">${t.name}</span>
                        <span class="meta">${t.startDate} · ${pr(t.location)}</span>
                      </button>
                    </li>
                  `)}
              </ul>
            `}
    `}};it.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    h2 {
      font-size: 1.3rem;
      margin: 0 0 0.3rem;
      color: var(--color-text, #1f2937);
    }
    .greeting {
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 1.5rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.6rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    li button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      text-align: left;
      padding: 0.8rem 1rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-left: 4px solid var(--color-accent, #ec4899);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      cursor: pointer;
      font-size: 0.9rem;
    }
    li button:hover {
      box-shadow: var(--shadow-md, none);
    }
    .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .meta {
      color: var(--color-text-muted, #6b7280);
      white-space: nowrap;
      font-size: 0.82rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      background: var(--color-surface, white);
      border: 1px dashed var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      padding: 1rem;
      font-size: 0.9rem;
    }
  `;Sr([j({attribute:!1})],it.prototype,"member",2);Sr([m()],it.prototype,"unanswered",2);Sr([m()],it.prototype,"loading",2);it=Sr([R("home-view")],it);async function es(t,e){const r=t.context;if(r)try{const s=await r.clone().json();if(s.error)return s.error}catch{}return e}async function dc(t){const{data:e,error:r}=await E.functions.invoke("create-member-account",{body:t});return r?{message:await es(r,"La création du membre a échoué.")}:e||{message:"Réponse invalide du serveur."}}async function qi(t,e){const r=await Ml(t,e);return r?{message:r}:null}async function fc(t){const{error:e}=await E.functions.invoke("reset-member-password",{body:{memberId:t}});return e?{message:await es(e,"La réinitialisation a échoué.")}:null}async function pc(t){const{error:e}=await E.functions.invoke("delete-member-account",{body:{memberId:t}});return e?{message:await es(e,"La suppression a échoué.")}:null}var mc=Object.defineProperty,gc=Object.getOwnPropertyDescriptor,xe=(t,e,r,s)=>{for(var i=s>1?void 0:s?gc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&mc(e,r,i),i};let ne=class extends A{constructor(){super(...arguments),this.refreshToken=0,this.members=[],this.ageCategories=[],this.loading=!0,this.errorMessage=null,this.search="",this.openMenuId=null}connectedCallback(){super.connectedCallback(),this.refresh()}updated(t){t.has("refreshToken")&&t.get("refreshToken")!==void 0&&this.refresh()}async refresh(){this.loading=!0;const[t,e]=await Promise.all([Ul(),Ut()]);this.members=t,this.ageCategories=e,this.loading=!1}categoryLabel(t){return Qr(this.ageCategories,t.sex,t.birthYear)?.label??"—"}get filteredMembers(){const t=this.search.trim().toLowerCase();return t?this.members.filter(e=>{const r=[e.isAdmin?"admin":"",e.isCoach?"coach":"",e.active?"actif":"inactif"].join(" ");return[e.firstName,e.lastName,e.email,e.licenseNumber,this.categoryLabel(e),r].join(" ").toLowerCase().includes(t)}):this.members}async handleToggleActive(t){this.openMenuId=null,this.errorMessage=null;const e=await qi(t.id,{...t,active:!t.active});if(e){this.errorMessage=e.message;return}await this.refresh()}async handleResetPassword(t){if(this.openMenuId=null,!confirm(`Réinitialiser le mot de passe de ${t.firstName} ${t.lastName} à son numéro de licence (${t.licenseNumber}) ?`))return;this.errorMessage=null;const r=await fc(t.id);if(r){this.errorMessage=r.message;return}await this.refresh()}async handleDelete(t){if(this.openMenuId=null,!confirm(`Supprimer définitivement le compte de ${t.firstName} ${t.lastName} ? Cette action est irréversible.`))return;this.errorMessage=null;const r=await pc(t.id);if(r){this.errorMessage=r.message;return}await this.refresh()}handleEdit(t){this.openMenuId=null,this.dispatchEvent(new CustomEvent("edit",{detail:t,bubbles:!0,composed:!0}))}toggleMenu(t){this.openMenuId=this.openMenuId===t?null:t}renderMenu(t){return this.openMenuId!==t.id?"":f`
      <div class="menu">
        <button @click=${()=>this.handleEdit(t)}>Modifier</button>
        <button @click=${()=>this.handleToggleActive(t)}>${t.active?"Désactiver":"Réactiver"}</button>
        <button @click=${()=>this.handleResetPassword(t)}>Réinitialiser le mot de passe</button>
        <button class="danger" @click=${()=>this.handleDelete(t)}>Supprimer</button>
      </div>
    `}render(){if(this.loading)return f`<p>Chargement…</p>`;const t=this.filteredMembers;return f`
      ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
      <input
        type="search"
        placeholder="Rechercher (nom, email, licence, catégorie, droits)…"
        .value=${this.search}
        @input=${e=>this.search=e.target.value}
      />
      ${t.length===0?f`<p class="empty">Aucun membre ne correspond.</p>`:f`
            <ul>
              ${t.map(e=>f`
                  <li>
                    <div class="card ${e.active?"":"inactive"}">
                      <div class="identity">
                        <div class="name">${e.firstName} ${e.lastName}</div>
                        <div class="details">
                          ${e.email}<br />
                          Licence ${e.licenseNumber} (${e.licenseType==="competition"?"compétition":"loisir"})
                          · ${this.categoryLabel(e)}
                        </div>
                        <div class="badges">
                          ${e.isAdmin?f`<span class="badge admin">Admin</span>`:""}
                          ${e.isCoach?f`<span class="badge coach">Coach</span>`:""}
                          ${e.active?"":f`<span class="badge inactive-badge">Inactif</span>`}
                        </div>
                      </div>
                      <div class="menu-wrapper">
                        <button class="menu-button" @click=${()=>this.toggleMenu(e.id)} aria-label="Actions">⋮</button>
                        ${this.renderMenu(e)}
                      </div>
                    </div>
                  </li>
                `)}
            </ul>
          `}
    `}};ne.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    input[type="search"] {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .card {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      padding: 0.85rem 1rem;
    }
    .card.inactive {
      opacity: 0.6;
    }
    .identity .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .identity .details {
      font-size: 0.82rem;
      color: var(--color-text-muted, #6b7280);
      margin-top: 0.15rem;
      line-height: 1.5;
    }
    .badges {
      margin-top: 0.35rem;
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-block;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      font-size: 0.72rem;
    }
    .badge.admin {
      background: var(--color-primary-light, #ede9fe);
      color: var(--color-primary-dark, #5b21b6);
    }
    .badge.coach {
      background: var(--color-info-bg, #dbeafe);
      color: #1e40af;
    }
    .badge.inactive-badge {
      background: #f3f4f6;
      color: #6b7280;
    }
    .menu-wrapper {
      position: relative;
    }
    .menu-button {
      border: none;
      background: none;
      font-size: 1.2rem;
      line-height: 1;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      color: var(--color-text-muted, #6b7280);
      border-radius: 6px;
    }
    .menu-button:hover {
      background: #f3f4f6;
    }
    .menu {
      position: absolute;
      right: 0;
      top: 2rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      min-width: 180px;
      background: var(--color-surface, white);
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12));
      overflow: hidden;
    }
    .menu button {
      border: none;
      background: none;
      text-align: left;
      padding: 0.55rem 0.85rem;
      font-size: 0.85rem;
      cursor: pointer;
      color: var(--color-text, #1f2937);
    }
    .menu button:hover {
      background: #f7f6fb;
    }
    .menu button.danger {
      color: var(--color-danger, #991b1b);
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;xe([j({type:Number})],ne.prototype,"refreshToken",2);xe([m()],ne.prototype,"members",2);xe([m()],ne.prototype,"ageCategories",2);xe([m()],ne.prototype,"loading",2);xe([m()],ne.prototype,"errorMessage",2);xe([m()],ne.prototype,"search",2);xe([m()],ne.prototype,"openMenuId",2);ne=xe([R("members-list")],ne);var bc=Object.defineProperty,vc=Object.getOwnPropertyDescriptor,K=(t,e,r,s)=>{for(var i=s>1?void 0:s?vc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&bc(e,r,i),i};const Yt=new Date().getFullYear();let z=class extends A{constructor(){super(...arguments),this.member=null,this.lastName="",this.firstName="",this.email="",this.sex="F",this.birthYear=Yt-20,this.licenseNumber="",this.licenseType="loisir",this.isAdmin=!1,this.isCoach=!1,this.active=!0,this.errorMessage=null,this.successMessage=null,this.submitting=!1}willUpdate(t){!t.has("member")||!this.member||(this.lastName=this.member.lastName,this.firstName=this.member.firstName,this.email=this.member.email,this.sex=this.member.sex,this.birthYear=this.member.birthYear,this.licenseNumber=this.member.licenseNumber,this.licenseType=this.member.licenseType,this.isAdmin=this.member.isAdmin,this.isCoach=this.member.isCoach,this.active=this.member.active)}validate(){return!this.lastName.trim()||!this.firstName.trim()?"Le nom et le prénom sont obligatoires.":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)?!Number.isInteger(this.birthYear)||this.birthYear<1900||this.birthYear>Yt?"L'année de naissance n'est pas valide.":this.licenseNumber.trim()?null:"Le numéro de licence est obligatoire.":"L'adresse email n'est pas valide."}async handleSubmit(t){t.preventDefault();const e=this.validate();if(e){this.errorMessage=e,this.successMessage=null;return}this.errorMessage=null,this.successMessage=null,this.submitting=!0;const r={lastName:this.lastName.trim(),firstName:this.firstName.trim(),email:this.email.trim(),sex:this.sex,birthYear:this.birthYear,licenseNumber:this.licenseNumber.trim(),licenseType:this.licenseType};if(this.member){const i=await qi(this.member.id,{...r,isAdmin:this.isAdmin,isCoach:this.isCoach,active:this.active});if(this.submitting=!1,i){this.errorMessage=i.message;return}this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0}));return}const s=await dc(r);if(this.submitting=!1,"message"in s){this.errorMessage=s.message;return}this.successMessage=`Membre créé. Son mot de passe initial est son numéro de licence (${r.licenseNumber}) — communiquez-le lui, il devra le changer à sa première connexion.`,this.lastName="",this.firstName="",this.email="",this.sex="F",this.birthYear=Yt-20,this.licenseNumber="",this.licenseType="loisir",this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0,detail:s.member}))}render(){return f`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
        ${this.successMessage?f`<p class="success">${this.successMessage}</p>`:""}

        <label for="last-name">Nom</label>
        <input
          id="last-name"
          required
          .value=${this.lastName}
          @input=${t=>this.lastName=t.target.value}
        />

        <label for="first-name">Prénom</label>
        <input
          id="first-name"
          required
          .value=${this.firstName}
          @input=${t=>this.firstName=t.target.value}
        />

        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          required
          .value=${this.email}
          @input=${t=>this.email=t.target.value}
        />

        <label for="sex">Sexe</label>
        <select id="sex" .value=${this.sex} @change=${t=>this.sex=t.target.value}>
          <option value="F">Féminin</option>
          <option value="M">Masculin</option>
        </select>

        <label for="birth-year">Année de naissance</label>
        <input
          id="birth-year"
          type="number"
          required
          min="1900"
          max=${Yt}
          .value=${String(this.birthYear)}
          @input=${t=>this.birthYear=Number(t.target.value)}
        />

        <label for="license-number">Numéro de licence</label>
        <input
          id="license-number"
          required
          .value=${this.licenseNumber}
          @input=${t=>this.licenseNumber=t.target.value}
        />

        <label for="license-type">Type de licence</label>
        <select
          id="license-type"
          .value=${this.licenseType}
          @change=${t=>this.licenseType=t.target.value}
        >
          <option value="loisir">Loisir</option>
          <option value="competition">Compétition</option>
        </select>

        ${this.member?f`
              <div class="checkboxes">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this.isCoach}
                    @change=${t=>this.isCoach=t.target.checked}
                  />
                  Coach
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this.isAdmin}
                    @change=${t=>this.isAdmin=t.target.checked}
                  />
                  Administrateur
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this.active}
                    @change=${t=>this.active=t.target.checked}
                  />
                  Actif
                </label>
              </div>
            `:""}

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting?"Enregistrement…":this.member?"Enregistrer":"Créer le membre"}
          </button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}>
            ${this.member?"Annuler":"Retour à la liste"}
          </button>
        </div>
      </form>
    `}};z.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 420px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    .checkboxes {
      display: flex;
      gap: 1.25rem;
      margin-top: 0.25rem;
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.5rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;K([j({attribute:!1})],z.prototype,"member",2);K([m()],z.prototype,"lastName",2);K([m()],z.prototype,"firstName",2);K([m()],z.prototype,"email",2);K([m()],z.prototype,"sex",2);K([m()],z.prototype,"birthYear",2);K([m()],z.prototype,"licenseNumber",2);K([m()],z.prototype,"licenseType",2);K([m()],z.prototype,"isAdmin",2);K([m()],z.prototype,"isCoach",2);K([m()],z.prototype,"active",2);K([m()],z.prototype,"errorMessage",2);K([m()],z.prototype,"successMessage",2);K([m()],z.prototype,"submitting",2);z=K([R("member-form")],z);var yc=Object.defineProperty,wc=Object.getOwnPropertyDescriptor,ts=(t,e,r,s)=>{for(var i=s>1?void 0:s?wc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&yc(e,r,i),i};let Ot=class extends A{constructor(){super(...arguments),this.view={mode:"list"},this.listKey=0}goToList(){this.view={mode:"list"},this.listKey+=1}render(){return f`
      <header>
        <h2>Membres</h2>
        ${this.view.mode==="list"?f`<button @click=${()=>this.view={mode:"create"}}>+ Ajouter un membre</button>`:""}
      </header>

      ${this.view.mode==="list"?f`<members-list
            .refreshToken=${this.listKey}
            @edit=${t=>this.view={mode:"edit",member:t.detail}}
          ></members-list>`:f`<member-form
            .member=${this.view.mode==="edit"?this.view.member:null}
            @saved=${()=>this.goToList()}
            @cancel=${()=>this.goToList()}
          ></member-form>`}
    `}};Ot.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: 8px;
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `;ts([m()],Ot.prototype,"view",2);ts([m()],Ot.prototype,"listKey",2);Ot=ts([R("admin-members-view")],Ot);var _c=Object.defineProperty,$c=Object.getOwnPropertyDescriptor,we=(t,e,r,s)=>{for(var i=s>1?void 0:s?$c(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&_c(e,r,i),i};let re=class extends A{constructor(){super(...arguments),this.category=null,this.sex="F",this.label="",this.minBirthYear=null,this.maxBirthYear=null,this.sortOrder=0,this.errorMessage=null,this.submitting=!1}willUpdate(t){!t.has("category")||!this.category||(this.sex=this.category.sex,this.label=this.category.label,this.minBirthYear=this.category.minBirthYear,this.maxBirthYear=this.category.maxBirthYear,this.sortOrder=this.category.sortOrder)}validate(){return this.label.trim()?this.minBirthYear!==null&&this.maxBirthYear!==null&&this.minBirthYear>this.maxBirthYear?"L'année minimale doit être inférieure ou égale à l'année maximale.":null:"Le libellé est obligatoire."}async handleSubmit(t){t.preventDefault();const e=this.validate();if(e){this.errorMessage=e;return}this.errorMessage=null,this.submitting=!0;const r={sex:this.sex,label:this.label.trim(),minBirthYear:this.minBirthYear,maxBirthYear:this.maxBirthYear,sortOrder:this.sortOrder},s=this.category?await ec(this.category.id,r):await Ql(r);if(this.submitting=!1,s){this.errorMessage=s;return}this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0}))}parseYear(t){if(t.trim()==="")return null;const e=Number(t);return Number.isInteger(e)?e:null}render(){return f`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}

        <label for="sex">Sexe</label>
        <select id="sex" .value=${this.sex} @change=${t=>this.sex=t.target.value}>
          <option value="F">Féminin</option>
          <option value="M">Masculin</option>
        </select>

        <label for="label">Libellé</label>
        <input
          id="label"
          required
          .value=${this.label}
          @input=${t=>this.label=t.target.value}
        />

        <label for="min-year">Année de naissance minimale <span class="hint">(vide = pas de minimum)</span></label>
        <input
          id="min-year"
          type="number"
          .value=${this.minBirthYear===null?"":String(this.minBirthYear)}
          @input=${t=>this.minBirthYear=this.parseYear(t.target.value)}
        />

        <label for="max-year">Année de naissance maximale <span class="hint">(vide = pas de maximum)</span></label>
        <input
          id="max-year"
          type="number"
          .value=${this.maxBirthYear===null?"":String(this.maxBirthYear)}
          @input=${t=>this.maxBirthYear=this.parseYear(t.target.value)}
        />

        <label for="sort-order">Ordre d'affichage</label>
        <input
          id="sort-order"
          type="number"
          .value=${String(this.sortOrder)}
          @input=${t=>this.sortOrder=Number(t.target.value)}
        />

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting?"Enregistrement…":this.category?"Enregistrer":"Ajouter la tranche"}
          </button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}>
            Annuler
          </button>
        </div>
      </form>
    `}};re.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 380px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    .hint {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.78rem;
    }
    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.5rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;we([j({attribute:!1})],re.prototype,"category",2);we([m()],re.prototype,"sex",2);we([m()],re.prototype,"label",2);we([m()],re.prototype,"minBirthYear",2);we([m()],re.prototype,"maxBirthYear",2);we([m()],re.prototype,"sortOrder",2);we([m()],re.prototype,"errorMessage",2);we([m()],re.prototype,"submitting",2);re=we([R("age-category-form")],re);var Sc=Object.defineProperty,kc=Object.getOwnPropertyDescriptor,Mt=(t,e,r,s)=>{for(var i=s>1?void 0:s?kc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Sc(e,r,i),i};let Me=class extends A{constructor(){super(...arguments),this.view={mode:"list"},this.categories=[],this.loading=!0,this.errorMessage=null}connectedCallback(){super.connectedCallback(),this.refresh()}updated(t){t.has("view")&&this.view.mode==="list"&&this.refresh()}async refresh(){this.loading=!0,this.categories=await Ut(),this.loading=!1}async handleDelete(t){if(!confirm(`Supprimer la tranche "${t.label}" (${t.sex}) ?`))return;this.errorMessage=null;const r=await tc(t.id);if(r){this.errorMessage=r;return}await this.refresh()}renderYearRange(t){return t.minBirthYear===null?`avant ${t.maxBirthYear} inclus`:t.maxBirthYear===null?`après ${t.minBirthYear} inclus`:`${t.minBirthYear} - ${t.maxBirthYear}`}renderTable(t){const e=this.categories.filter(r=>r.sex===t);return f`
      <h3>${t==="F"?"Femmes":"Hommes"}</h3>
      <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Années de naissance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(r=>f`
              <tr>
                <td>${r.label}</td>
                <td>${this.renderYearRange(r)}</td>
                <td>
                  <button @click=${()=>this.view={mode:"edit",category:r}}>Modifier</button>
                  <button class="danger" @click=${()=>this.handleDelete(r)}>Supprimer</button>
                </td>
              </tr>
            `)}
        </tbody>
      </table>
      </div>
    `}render(){return f`
      <header>
        <h2>Catégories d'âge</h2>
        ${this.view.mode==="list"?f`<button @click=${()=>this.view={mode:"create"}}>+ Ajouter une tranche</button>`:""}
      </header>

      ${this.view.mode!=="list"?f`<age-category-form
            .category=${this.view.mode==="edit"?this.view.category:null}
            @saved=${()=>this.view={mode:"list"}}
            @cancel=${()=>this.view={mode:"list"}}
          ></age-category-form>`:this.loading?f`<p>Chargement…</p>`:f`
              ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
              ${this.renderTable("F")} ${this.renderTable("M")}
            `}
    `}};Me.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    h3 {
      font-size: 0.9rem;
      color: #6b7280;
      margin: 1rem 0 0.4rem;
    }
    .table-scroll {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.4rem 0.6rem;
      border-bottom: 1px solid #e5e7eb;
    }
    button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    header button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: 8px;
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
  `;Mt([m()],Me.prototype,"view",2);Mt([m()],Me.prototype,"categories",2);Mt([m()],Me.prototype,"loading",2);Mt([m()],Me.prototype,"errorMessage",2);Me=Mt([R("age-categories-view")],Me);function Ec(t){return{id:t.id,kind:t.kind,label:t.label,sortOrder:t.sort_order,eventFamily:t.event_family}}async function ke(t){const{data:e,error:r}=await E.from("event_reference_items").select("*").eq("kind",t).order("sort_order",{ascending:!0});return r||!e?[]:e.map(Ec)}async function xc(t,e){const{error:r}=await E.from("event_reference_items").insert({kind:t,label:e.label,sort_order:e.sortOrder,event_family:e.eventFamily});return r?r.message:null}async function Tc(t,e){const{error:r}=await E.from("event_reference_items").update({label:e.label,sort_order:e.sortOrder,event_family:e.eventFamily}).eq("id",t);return r?r.message:null}async function Ac(t){const{error:e}=await E.from("event_reference_items").delete().eq("id",t);return e?e.message:null}var Cc=Object.defineProperty,Oc=Object.getOwnPropertyDescriptor,Te=(t,e,r,s)=>{for(var i=s>1?void 0:s?Oc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Cc(e,r,i),i};let ae=class extends A{constructor(){super(...arguments),this.item=null,this.label="",this.sortOrder=0,this.eventFamily=null,this.errorMessage=null,this.submitting=!1}willUpdate(t){t.has("item")&&(this.label=this.item?.label??"",this.sortOrder=this.item?.sortOrder??0,this.eventFamily=this.item?.eventFamily??(this.kind==="event_type"?"sportif":null))}async handleSubmit(t){if(t.preventDefault(),!this.label.trim()){this.errorMessage="Le libellé est obligatoire.";return}if(this.kind==="event_type"&&!this.eventFamily){this.errorMessage="La famille (sportif ou tournoi/hat) est obligatoire.";return}this.errorMessage=null,this.submitting=!0;const e={label:this.label.trim(),sortOrder:this.sortOrder,eventFamily:this.kind==="event_type"?this.eventFamily:null},r=this.item?await Tc(this.item.id,e):await xc(this.kind,e);if(this.submitting=!1,r){this.errorMessage=r;return}this.label="",this.sortOrder=0,this.eventFamily=this.kind==="event_type"?"sportif":null,this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0}))}render(){return f`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
        <div class="field">
          <label for="label-${this.kind}">Libellé</label>
          <input
            id="label-${this.kind}"
            name="label"
            required
            .value=${this.label}
            @input=${t=>this.label=t.target.value}
          />
        </div>
        <div class="field">
          <label for="order-${this.kind}">Ordre</label>
          <input
            id="order-${this.kind}"
            name="sortOrder"
            type="number"
            .value=${String(this.sortOrder)}
            @input=${t=>this.sortOrder=Number(t.target.value)}
          />
        </div>
        ${this.kind==="event_type"?f`
              <div class="field">
                <label for="family-${this.kind}">Famille</label>
                <select
                  id="family-${this.kind}"
                  .value=${this.eventFamily??"sportif"}
                  @change=${t=>this.eventFamily=t.target.value}
                >
                  <option value="sportif">Sportif (Championnat, Coupe, Winter League…)</option>
                  <option value="tournoi">Tournoi / Hat</option>
                </select>
              </div>
            `:""}
        <button type="submit" ?disabled=${this.submitting}>
          ${this.submitting?"…":this.item?"Enregistrer":"Ajouter"}
        </button>
        ${this.item?f`<button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}>
              Annuler
            </button>`:""}
      </form>
    `}};ae.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      align-items: flex-end;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #374151;
    }
    input,
    select {
      box-sizing: border-box;
      padding: 0.5rem 0.65rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
    }
    input[name="sortOrder"] {
      width: 5rem;
    }
    button {
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.8rem;
      flex-basis: 100%;
    }
  `;Te([j()],ae.prototype,"kind",2);Te([j({attribute:!1})],ae.prototype,"item",2);Te([m()],ae.prototype,"label",2);Te([m()],ae.prototype,"sortOrder",2);Te([m()],ae.prototype,"eventFamily",2);Te([m()],ae.prototype,"errorMessage",2);Te([m()],ae.prototype,"submitting",2);ae=Te([R("event-reference-form")],ae);var Rc=Object.defineProperty,Pc=Object.getOwnPropertyDescriptor,Fe=(t,e,r,s)=>{for(var i=s>1?void 0:s?Pc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Rc(e,r,i),i};let be=class extends A{constructor(){super(...arguments),this.heading="",this.items=[],this.loading=!0,this.editingItem=null,this.errorMessage=null}connectedCallback(){super.connectedCallback(),this.refresh()}updated(t){t.has("kind")&&t.get("kind")!==void 0&&this.refresh()}async refresh(){this.loading=!0,this.items=await ke(this.kind),this.loading=!1}async handleDelete(t){if(!confirm(`Supprimer "${t.label}" ?`))return;this.errorMessage=null;const e=await Ac(t.id);if(e){this.errorMessage=e;return}await this.refresh()}handleSaved(){this.editingItem=null,this.refresh()}render(){return f`
      <h3>${this.heading}</h3>
      ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}
      ${this.loading?f`<p>Chargement…</p>`:f`
            <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Libellé</th>
                  <th>Ordre</th>
                  ${this.kind==="event_type"?f`<th>Famille</th>`:""}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.items.map(t=>f`
                    <tr>
                      <td>${t.label}</td>
                      <td>${t.sortOrder}</td>
                      ${this.kind==="event_type"?f`<td>${t.eventFamily==="tournoi"?"Tournoi / Hat":"Sportif"}</td>`:""}
                      <td>
                        <button @click=${()=>this.editingItem=t}>Modifier</button>
                        <button class="danger" @click=${()=>this.handleDelete(t)}>Supprimer</button>
                      </td>
                    </tr>
                  `)}
              </tbody>
            </table>
            </div>
          `}
      <event-reference-form
        .kind=${this.kind}
        .item=${this.editingItem}
        @saved=${()=>this.handleSaved()}
        @cancel=${()=>this.editingItem=null}
      ></event-reference-form>
    `}};be.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      margin-bottom: 1.75rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.6rem;
    }
    .table-scroll {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.4rem 0.6rem;
      border-bottom: 1px solid #e5e7eb;
    }
    button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
      margin-right: 0.3rem;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
  `;Fe([j()],be.prototype,"kind",2);Fe([j()],be.prototype,"heading",2);Fe([m()],be.prototype,"items",2);Fe([m()],be.prototype,"loading",2);Fe([m()],be.prototype,"editingItem",2);Fe([m()],be.prototype,"errorMessage",2);be=Fe([R("event-reference-list")],be);var Ic=Object.getOwnPropertyDescriptor,jc=(t,e,r,s)=>{for(var i=s>1?void 0:s?Ic(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=a(i)||i);return i};let Hr=class extends A{render(){return f`
      <h2>Référentiels événements</h2>
      <event-reference-list kind="event_type" heading="Types d'événement"></event-reference-list>
      <event-reference-list kind="format" heading="Formats"></event-reference-list>
      <event-reference-list kind="division" heading="Divisions"></event-reference-list>
    `}};Hr.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0 0 1rem;
    }
  `;Hr=jc([R("event-reference-admin-view")],Hr);var Dc=Object.defineProperty,Nc=Object.getOwnPropertyDescriptor,qe=(t,e,r,s)=>{for(var i=s>1?void 0:s?Nc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Dc(e,r,i),i};const Lc=[{id:"all",label:"Tous"},{id:"sportif",label:"Événements sportifs"},{id:"tournoi",label:"Tournois et Hats"}];let ve=class extends A{constructor(){super(...arguments),this.refreshToken=0,this.events=[],this.eventTypes=[],this.loading=!0,this.familyFilter="all",this.search=""}connectedCallback(){super.connectedCallback(),this.refresh()}updated(t){t.has("refreshToken")&&t.get("refreshToken")!==void 0&&this.refresh()}async refresh(){this.loading=!0;const[t,e]=await Promise.all([Bi(),ke("event_type")]);this.events=t,this.eventTypes=e,this.loading=!1}eventTypeLabel(t){return this.eventTypes.find(e=>e.id===t)?.label??"—"}get filteredEvents(){const t=this.search.trim().toLowerCase();return this.events.filter(e=>this.familyFilter!=="all"&&this.eventTypes.find(i=>i.id===e.eventTypeId)?.eventFamily!==this.familyFilter?!1:t?`${e.name} ${this.eventTypeLabel(e.eventTypeId)} ${e.category} ${pr(e.location)}`.toLowerCase().includes(t):!0).sort((e,r)=>e.startDate.localeCompare(r.startDate))}handleSelect(t){this.dispatchEvent(new CustomEvent("select",{detail:t,bubbles:!0,composed:!0}))}render(){if(this.loading)return f`<p>Chargement…</p>`;const t=this.filteredEvents;return f`
      <div class="toolbar">
        <div class="filters">
          ${Lc.map(e=>f`
              <button class=${this.familyFilter===e.id?"active":""} @click=${()=>this.familyFilter=e.id}>
                ${e.label}
              </button>
            `)}
        </div>
        <input
          type="search"
          placeholder="Rechercher un événement (type, catégorie, lieu)…"
          .value=${this.search}
          @input=${e=>this.search=e.target.value}
        />
      </div>

      ${t.length===0?f`<p class="empty">Aucun événement ne correspond.</p>`:f`
            <ul>
              ${t.map(e=>f`
                  <li>
                    <button @click=${()=>this.handleSelect(e)}>
                      <span class="name">${e.name}</span>
                      <span class="meta">${e.startDate} · ${pr(e.location)}</span>
                    </button>
                  </li>
                `)}
            </ul>
          `}
    `}};ve.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    .toolbar {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .filters {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .filters button {
      padding: 0.4rem 0.8rem;
      border-radius: 999px;
      border: 1px solid var(--color-border, #e6e3f1);
      background: var(--color-surface, white);
      color: var(--color-text-muted, #6b7280);
      font-size: 0.82rem;
      cursor: pointer;
    }
    .filters button.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
    input[type="search"] {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      font-size: 0.95rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    li button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      text-align: left;
      padding: 0.8rem 1rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      cursor: pointer;
      font-size: 0.9rem;
    }
    li button:hover {
      box-shadow: var(--shadow-md, none);
    }
    .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .meta {
      color: var(--color-text-muted, #6b7280);
      white-space: nowrap;
      font-size: 0.82rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;qe([j({type:Number})],ve.prototype,"refreshToken",2);qe([m()],ve.prototype,"events",2);qe([m()],ve.prototype,"eventTypes",2);qe([m()],ve.prototype,"loading",2);qe([m()],ve.prototype,"familyFilter",2);qe([m()],ve.prototype,"search",2);ve=qe([R("events-browser")],ve);async function Hi(){const{data:t,error:e}=await E.rpc("member_directory");return e||!t?[]:t.map(r=>({id:r.id,firstName:r.first_name,lastName:r.last_name,sex:r.sex,birthYear:r.birth_year}))}var Uc=Object.defineProperty,Mc=Object.getOwnPropertyDescriptor,ce=(t,e,r,s)=>{for(var i=s>1?void 0:s?Mc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Uc(e,r,i),i};function Bc(t){return new Date().toISOString().slice(0,10)>t}let X=class extends A{constructor(){super(...arguments),this.labels=new Map,this.eventTypeFamily=null,this.organizerName="—",this.evaluations=[],this.loading=!0,this.submittingStatus=null,this.responseFeedback=null}connectedCallback(){super.connectedCallback(),this.loadDetail()}updated(t){t.has("event")&&t.get("event")!==void 0&&this.loadDetail()}async loadDetail(){this.loading=!0;const[t,e,r,s,i,n]=await Promise.all([ke("event_type"),ke("format"),ke("division"),Ut(),Hi(),rc(this.event.id)]),a=new Map;for(const o of[...t,...e,...r])a.set(o.id,o.label);this.labels=a,this.eventTypeFamily=t.find(o=>o.id===this.event.eventTypeId)?.eventFamily??null,this.organizerName=lc(this.event.organizerId,i),this.evaluations=nc(i,s,this.event.allowedCategories,n),this.loading=!1}get myEvaluation(){return this.evaluations.find(t=>t.member.id===this.member.id)}async handleRespond(t){this.submittingStatus=t,this.responseFeedback=null;const e=await ic(this.event.id,t);if(this.submittingStatus=null,e){this.responseFeedback={kind:"error",message:"Votre réponse n'a pas pu être enregistrée."};return}this.responseFeedback={kind:"success",message:"Votre réponse a bien été enregistrée."},await this.loadDetail()}renderMyResponse(){const t=this.myEvaluation;if(!t||t.status==="not-concerned")return f`<p class="not-concerned">Vous n'êtes pas concerné(e) par cet événement (catégorie non autorisée à y participer).</p>`;const e=Bc(this.event.responseDeadline),r=t.status==="no-response"?null:t.status;return f`
      <section class="my-response">
        <h3>Votre disponibilité</h3>
        ${e?f`<p class="deadline-passed">
              La date butoir de réponse (${this.event.responseDeadline}) est dépassée${r?f`, votre réponse enregistrée est <strong>${this.statusLabel(r)}</strong>.`:", vous n'avez pas répondu."}
            </p>`:f`
              ${this.eventTypeFamily==="sportif"?f`<p class="engagement">
                    En vous déclarant disponible pour cet évènement, vous vous engagez à être au maximum
                    disponible pour les entrainements de préparation et pour la compétition
                  </p>`:""}
              <div class="response-buttons">
                <button
                  class=${r==="available"?"available active":"available"}
                  ?disabled=${this.submittingStatus!==null}
                  @click=${()=>this.handleRespond("available")}
                >
                  Disponible
                </button>
                <button
                  class=${r==="unavailable"?"unavailable active":"unavailable"}
                  ?disabled=${this.submittingStatus!==null}
                  @click=${()=>this.handleRespond("unavailable")}
                >
                  Indisponible
                </button>
                <button
                  class=${r==="uncertain"?"uncertain active":"uncertain"}
                  ?disabled=${this.submittingStatus!==null}
                  @click=${()=>this.handleRespond("uncertain")}
                >
                  Incertain
                </button>
              </div>
            `}
        ${this.responseFeedback?f`<p class=${this.responseFeedback.kind}>${this.responseFeedback.message}</p>`:""}
      </section>
    `}statusLabel(t){switch(t){case"available":return"Disponible";case"unavailable":return"Indisponible";case"uncertain":return"Incertain"}}byStatus(t){return this.evaluations.filter(e=>e.status===t).sort((e,r)=>e.member.lastName.localeCompare(r.member.lastName))}renderList(t,e){const r=this.byStatus(e);return f`
      <div class="list">
        <h3>${t} (${r.length})</h3>
        ${r.length===0?f`<p class="empty">—</p>`:f`<ul>
              ${r.map(s=>f`<li>${s.member.firstName} ${s.member.lastName}</li>`)}
            </ul>`}
      </div>
    `}render(){if(this.loading)return f`<p>Chargement…</p>`;const t=oc(this.evaluations),e=this.member.isAdmin;return f`
      <header>
        <div>
          <h2>${this.event.name}</h2>
          <p class="subtitle">${this.labels.get(this.event.eventTypeId)??"—"} — ${this.event.category}</p>
        </div>
        <div class="actions">
          ${e?f`<button class="primary" @click=${()=>this.dispatchEvent(new CustomEvent("edit",{detail:this.event,bubbles:!0,composed:!0}))}>
                Modifier
              </button>`:""}
          <button @click=${()=>this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}>← Retour</button>
        </div>
      </header>

      <dl>
        <dt>Format</dt>
        <dd>${this.labels.get(this.event.formatId)??"—"}</dd>
        <dt>Division</dt>
        <dd>${this.labels.get(this.event.divisionId)??"—"}</dd>
        <dt>Lieu</dt>
        <dd>${pr(this.event.location)}</dd>
        <dt>Date${this.event.startDate===this.event.endDate?"":"s"}</dt>
        <dd>
          ${this.event.startDate===this.event.endDate?this.event.startDate:f`du ${this.event.startDate} au ${this.event.endDate}`}
        </dd>
        <dt>Porteur de projet</dt>
        <dd>${this.organizerName}</dd>
        <dt>Date butoir de réponse</dt>
        <dd>${this.event.responseDeadline}</dd>
      </dl>

      ${this.renderMyResponse()}

      <div class="counters">
        <div class="counter"><div class="value">${t.totalAvailable}</div><div class="label">Disponibles</div></div>
        <div class="counter"><div class="value">${t.womenAvailable}</div><div class="label">dont femmes</div></div>
        <div class="counter"><div class="value">${t.menAvailable}</div><div class="label">dont hommes</div></div>
        <div class="counter"><div class="value">${t.uncertain}</div><div class="label">Incertains</div></div>
        <div class="counter"><div class="value">${t.unavailable}</div><div class="label">Indisponibles</div></div>
        <div class="counter"><div class="value">${t.noResponse}</div><div class="label">Sans réponse</div></div>
        <div class="counter"><div class="value">${t.notConcerned}</div><div class="label">Non concernés</div></div>
        <div class="counter"><div class="value">${t.totalResponses}</div><div class="label">Total réponses</div></div>
      </div>

      <div class="lists">
        ${this.renderList("Disponibles","available")} ${this.renderList("Indisponibles","unavailable")}
        ${this.renderList("Incertains","uncertain")} ${this.renderList("Sans réponse","no-response")}
      </div>
    `}};X.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 640px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.2rem;
      margin: 0 0 0.2rem;
    }
    .subtitle {
      margin: 0 0 0.4rem;
      font-size: 0.85rem;
      color: var(--color-text-muted, #6b7280);
    }
    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.25rem 1rem;
      font-size: 0.9rem;
      margin: 0 0 1.25rem;
    }
    dt {
      color: #6b7280;
    }
    dd {
      margin: 0;
      color: #1f2933;
    }
    .counters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 0.6rem;
      margin-bottom: 1.5rem;
    }
    .counter {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.6rem 0.75rem;
    }
    .counter .value {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1f2933;
    }
    .counter .label {
      font-size: 0.75rem;
      color: #6b7280;
    }
    .lists {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.25rem;
    }
    .list h3 {
      font-size: 0.85rem;
      color: #374151;
      margin: 0 0 0.4rem;
    }
    .list ul {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.85rem;
    }
    .list li {
      padding: 0.15rem 0;
    }
    .list .empty {
      color: #9ca3af;
      font-size: 0.85rem;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
    button.primary {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .my-response {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1.5rem;
    }
    .my-response h3 {
      font-size: 0.9rem;
      margin: 0 0 0.6rem;
      color: #374151;
    }
    .not-concerned {
      color: #6b7280;
      font-size: 0.9rem;
    }
    .deadline-passed {
      color: #6b7280;
      font-size: 0.9rem;
    }
    .engagement {
      background: #fffbeb;
      border: 1px solid #fde68a;
      color: #92400e;
      padding: 0.6rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin: 0 0 0.75rem;
    }
    .response-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .response-buttons button {
      flex: 1;
      min-width: 120px;
      font-weight: 600;
    }
    .response-buttons button.available.active {
      background: #16a34a;
      border-color: #16a34a;
      color: white;
    }
    .response-buttons button.unavailable.active {
      background: #dc2626;
      border-color: #dc2626;
      color: white;
    }
    .response-buttons button.uncertain.active {
      background: #d97706;
      border-color: #d97706;
      color: white;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin: 0.6rem 0 0;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin: 0.6rem 0 0;
    }
  `;ce([j({attribute:!1})],X.prototype,"event",2);ce([j({attribute:!1})],X.prototype,"member",2);ce([m()],X.prototype,"labels",2);ce([m()],X.prototype,"eventTypeFamily",2);ce([m()],X.prototype,"organizerName",2);ce([m()],X.prototype,"evaluations",2);ce([m()],X.prototype,"loading",2);ce([m()],X.prototype,"submittingStatus",2);ce([m()],X.prototype,"responseFeedback",2);X=ce([R("event-detail")],X);var zc=Object.defineProperty,Fc=Object.getOwnPropertyDescriptor,N=(t,e,r,s)=>{for(var i=s>1?void 0:s?Fc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&zc(e,r,i),i};function Xt(t,e){return`${t}:${e}`}let I=class extends A{constructor(){super(...arguments),this.event=null,this.eventTypes=[],this.formats=[],this.divisions=[],this.ageCategories=[],this.members=[],this.loadingOptions=!0,this.name="",this.nameManuallyEdited=!1,this.eventTypeId="",this.category=ii[0],this.formatId="",this.divisionId="",this.location="",this.startDate="",this.endDate="",this.organizerId="",this.responseDeadline="",this.allowedCategoryKeys=new Set,this.errorMessage=null,this.submitting=!1}connectedCallback(){super.connectedCallback(),this.loadOptions()}async loadOptions(){this.loadingOptions=!0;const[t,e,r,s,i]=await Promise.all([ke("event_type"),ke("format"),ke("division"),Ut(),Hi()]);this.eventTypes=t,this.formats=e,this.divisions=r,this.ageCategories=s,this.members=[...i].sort((n,a)=>n.lastName.localeCompare(a.lastName)),this.loadingOptions=!1,this.eventTypeId||(this.eventTypeId=t[0]?.id??""),this.formatId||(this.formatId=e[0]?.id??""),this.divisionId||(this.divisionId=r[0]?.id??""),this.maybeRecomputeName()}willUpdate(t){!t.has("event")||!this.event||(this.name=this.event.name,this.nameManuallyEdited=!0,this.eventTypeId=this.event.eventTypeId,this.category=this.event.category,this.formatId=this.event.formatId,this.divisionId=this.event.divisionId,this.location=this.event.location??"",this.startDate=this.event.startDate,this.endDate=this.event.endDate,this.organizerId=this.event.organizerId??"",this.responseDeadline=this.event.responseDeadline,this.allowedCategoryKeys=new Set(this.event.allowedCategories.map(e=>Xt(e.sex,e.ageCategoryId))))}maybeRecomputeName(){this.nameManuallyEdited||(this.name=cc(this.eventTypes.find(t=>t.id===this.eventTypeId)?.label??"",this.category,this.formats.find(t=>t.id===this.formatId)?.label??"",this.divisions.find(t=>t.id===this.divisionId)?.label??""))}handleNameInput(t){this.name=t,this.nameManuallyEdited=!0}toggleAllowedCategory(t,e,r){const s=Xt(t,e),i=new Set(this.allowedCategoryKeys);r?i.add(s):i.delete(s),this.allowedCategoryKeys=i}get allCategoryKeys(){return this.ageCategories.map(t=>Xt(t.sex,t.id))}get allCategoriesSelected(){return this.allCategoryKeys.length>0&&this.allCategoryKeys.every(t=>this.allowedCategoryKeys.has(t))}toggleSelectAllCategories(){this.allowedCategoryKeys=this.allCategoriesSelected?new Set:new Set(this.allCategoryKeys)}validate(){return this.name.trim()?!this.eventTypeId||!this.formatId||!this.divisionId?"Tous les champs sont obligatoires.":this.startDate?this.endDate?this.endDate<this.startDate?"La date de fin doit être après la date de début.":this.responseDeadline?this.responseDeadline>=this.startDate?"La date butoir doit être avant la date de début de l'événement.":this.allowedCategoryKeys.size===0?"Sélectionnez au moins une catégorie pouvant participer.":null:"La date butoir de réponse est obligatoire.":"La date de fin est obligatoire.":"La date de début est obligatoire.":"Le nom de l'événement est obligatoire."}async handleSubmit(t){t.preventDefault();const e=this.validate();if(e){this.errorMessage=e;return}this.errorMessage=null,this.submitting=!0;const r=[...this.allowedCategoryKeys].map(n=>{const[a,o]=n.split(":");return{sex:a,ageCategoryId:o}}),s={name:this.name.trim(),eventTypeId:this.eventTypeId,category:this.category,formatId:this.formatId,divisionId:this.divisionId,location:this.location.trim()?this.location.trim():null,startDate:this.startDate,endDate:this.endDate,organizerId:this.organizerId?this.organizerId:null,responseDeadline:this.responseDeadline,allowedCategories:r},i=this.event?await Xl(this.event.id,s):await Yl(s);if(this.submitting=!1,i){this.errorMessage=i;return}this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0}))}renderCategoryColumn(t,e){return f`
      <div class="categories-column">
        <h4>${e}</h4>
        <div class="chip-grid">
          ${this.ageCategories.filter(r=>r.sex===t).map(r=>{const s=this.allowedCategoryKeys.has(Xt(t,r.id));return f`
                <button
                  type="button"
                  class="chip ${s?"active":""}"
                  aria-pressed=${s}
                  @click=${()=>this.toggleAllowedCategory(t,r.id,!s)}
                >
                  ${r.label}
                </button>
              `})}
        </div>
      </div>
    `}render(){return this.loadingOptions?f`<p>Chargement…</p>`:f`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}

        <label for="event-type">Type d'événement</label>
        <select
          id="event-type"
          .value=${this.eventTypeId}
          @change=${t=>{this.eventTypeId=t.target.value,this.maybeRecomputeName()}}
        >
          ${this.eventTypes.map(t=>f`<option value=${t.id}>${t.label}</option>`)}
        </select>

        <label for="category">Catégorie</label>
        <select
          id="category"
          .value=${this.category}
          @change=${t=>{this.category=t.target.value,this.maybeRecomputeName()}}
        >
          ${ii.map(t=>f`<option value=${t}>${t}</option>`)}
        </select>

        <label for="format">Format</label>
        <select
          id="format"
          .value=${this.formatId}
          @change=${t=>{this.formatId=t.target.value,this.maybeRecomputeName()}}
        >
          ${this.formats.map(t=>f`<option value=${t.id}>${t.label}</option>`)}
        </select>

        <label for="division">Division</label>
        <select
          id="division"
          .value=${this.divisionId}
          @change=${t=>{this.divisionId=t.target.value,this.maybeRecomputeName()}}
        >
          ${this.divisions.map(t=>f`<option value=${t.id}>${t.label}</option>`)}
        </select>

        <label for="name">Nom de l'événement <span class="hint">(pré-rempli, modifiable)</span></label>
        <input
          id="name"
          required
          .value=${this.name}
          @input=${t=>this.handleNameInput(t.target.value)}
        />

        <label for="location">Lieu <span class="hint">(facultatif — "Lieu inconnu" si non renseigné)</span></label>
        <input
          id="location"
          .value=${this.location}
          @input=${t=>this.location=t.target.value}
        />

        <div class="dates-row">
          <div>
            <label for="start-date">Date de début</label>
            <input
              id="start-date"
              type="date"
              required
              .value=${this.startDate}
              @input=${t=>this.startDate=t.target.value}
            />
          </div>
          <div>
            <label for="end-date">Date de fin</label>
            <input
              id="end-date"
              type="date"
              required
              .value=${this.endDate}
              @input=${t=>this.endDate=t.target.value}
            />
          </div>
        </div>

        <label for="organizer">Porteur de projet <span class="hint">(facultatif)</span></label>
        <select
          id="organizer"
          .value=${this.organizerId}
          @change=${t=>this.organizerId=t.target.value}
        >
          <option value="">— Aucun —</option>
          ${this.members.map(t=>f`<option value=${t.id}>${t.firstName} ${t.lastName}</option>`)}
        </select>

        <label for="response-deadline">Date butoir de réponse <span class="hint">(avant la date de début)</span></label>
        <input
          id="response-deadline"
          type="date"
          required
          .value=${this.responseDeadline}
          @input=${t=>this.responseDeadline=t.target.value}
        />

        <fieldset>
          <legend>Catégories pouvant participer</legend>
          <button type="button" class="select-all" @click=${()=>this.toggleSelectAllCategories()}>
            ${this.allCategoriesSelected?"Tout désélectionner":"Toutes les catégories"}
          </button>
          <div class="categories-columns">
            ${this.renderCategoryColumn("F","Femmes")} ${this.renderCategoryColumn("M","Hommes")}
          </div>
        </fieldset>

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting?"Enregistrement…":this.event?"Enregistrer":"Créer l'événement"}
          </button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}>
            Annuler
          </button>
        </div>
      </form>
    `}};I.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 480px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    .hint {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.78rem;
    }
    input,
    select {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    .dates-row {
      display: flex;
      gap: 0.75rem;
    }
    .dates-row > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    fieldset {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.75rem;
    }
    legend {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
      padding: 0 0.3rem;
    }
    .select-all {
      display: block;
      width: 100%;
      margin-bottom: 0.75rem;
      padding: 0.6rem;
      border-radius: 999px;
      border: 1px dashed var(--color-primary, #7c3aed);
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .categories-columns {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .categories-column {
      flex: 1;
      min-width: 140px;
    }
    .categories-column h4 {
      font-size: 0.8rem;
      color: #6b7280;
      margin: 0 0 0.5rem;
    }
    .chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .chip {
      min-height: 2.6rem;
      padding: 0.5rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--color-border, #d1d5db);
      background: white;
      color: #374151;
      font-size: 0.85rem;
      cursor: pointer;
      touch-action: manipulation;
    }
    .chip.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.25rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;N([j({attribute:!1})],I.prototype,"event",2);N([m()],I.prototype,"eventTypes",2);N([m()],I.prototype,"formats",2);N([m()],I.prototype,"divisions",2);N([m()],I.prototype,"ageCategories",2);N([m()],I.prototype,"members",2);N([m()],I.prototype,"loadingOptions",2);N([m()],I.prototype,"name",2);N([m()],I.prototype,"nameManuallyEdited",2);N([m()],I.prototype,"eventTypeId",2);N([m()],I.prototype,"category",2);N([m()],I.prototype,"formatId",2);N([m()],I.prototype,"divisionId",2);N([m()],I.prototype,"location",2);N([m()],I.prototype,"startDate",2);N([m()],I.prototype,"endDate",2);N([m()],I.prototype,"organizerId",2);N([m()],I.prototype,"responseDeadline",2);N([m()],I.prototype,"allowedCategoryKeys",2);N([m()],I.prototype,"errorMessage",2);N([m()],I.prototype,"submitting",2);I=N([R("event-form")],I);var qc=Object.defineProperty,Hc=Object.getOwnPropertyDescriptor,kr=(t,e,r,s)=>{for(var i=s>1?void 0:s?Hc(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&qc(e,r,i),i};let nt=class extends A{constructor(){super(...arguments),this.view={mode:"list"},this.listRefreshToken=0}get canManage(){return this.member.isAdmin}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}render(){return this.view.mode!=="list"?f`
        ${this.view.mode==="detail"?f`<event-detail
              .event=${this.view.event}
              .member=${this.member}
              @back=${()=>this.emit("back-to-list")}
              @edit=${t=>this.emit("edit-event",t.detail)}
            ></event-detail>`:f`<event-form
              .event=${this.view.mode==="edit"?this.view.event:null}
              @saved=${()=>this.emit("saved")}
              @cancel=${()=>this.emit("back-to-list")}
            ></event-form>`}
      `:f`
      <header>
        <h2>Événements</h2>
        ${this.canManage?f`<button @click=${()=>this.emit("create-event")}>+ Créer un événement</button>`:""}
      </header>
      <events-browser
        .refreshToken=${this.listRefreshToken}
        @select=${t=>this.emit("select-event",t.detail)}
      ></events-browser>
    `}};nt.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--radius-md, 8px);
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `;kr([j({attribute:!1})],nt.prototype,"member",2);kr([j({attribute:!1})],nt.prototype,"view",2);kr([j({type:Number})],nt.prototype,"listRefreshToken",2);nt=kr([R("events-view")],nt);const Kc=["Tabata","Cardio"],Rt=8;function Vc(){return Array.from({length:Rt},()=>null)}function Wc(t){return{id:t.id,name:t.name,objective:t.objective,prepType:t.prep_type,seriesCount:t.series_count,exerciseDurationSeconds:t.exercise_duration_seconds,restDurationSeconds:t.rest_duration_seconds,betweenSeriesDurationSeconds:t.between_series_duration_seconds,exerciseIds:[t.exercise_1_id,t.exercise_2_id,t.exercise_3_id,t.exercise_4_id,t.exercise_5_id,t.exercise_6_id,t.exercise_7_id,t.exercise_8_id],finisherId:t.finisher_id}}function Ki(t){if(t.exerciseIds.length!==Rt)throw new Error(`exerciseIds doit contenir exactement ${Rt} créneaux.`);return{name:t.name,objective:t.objective,prep_type:t.prepType,series_count:t.seriesCount,exercise_duration_seconds:t.exerciseDurationSeconds,rest_duration_seconds:t.restDurationSeconds,between_series_duration_seconds:t.betweenSeriesDurationSeconds,exercise_1_id:t.exerciseIds[0],exercise_2_id:t.exerciseIds[1],exercise_3_id:t.exerciseIds[2],exercise_4_id:t.exerciseIds[3],exercise_5_id:t.exerciseIds[4],exercise_6_id:t.exerciseIds[5],exercise_7_id:t.exerciseIds[6],exercise_8_id:t.exerciseIds[7],finisher_id:t.finisherId}}async function rs(){const{data:t,error:e}=await E.from("physical_sessions").select("*").order("name",{ascending:!0});return e||!t?[]:t.map(Wc)}async function Gc(t){const{error:e}=await E.from("physical_sessions").insert(Ki(t));return e?e.message:null}async function Jc(t,e){const{error:r}=await E.from("physical_sessions").update(Ki(e)).eq("id",t);return r?r.message:null}async function Yc(t){const{error:e}=await E.from("physical_sessions").delete().eq("id",t);return e?e.message:null}async function Vi(){const{data:t,error:e}=await E.from("physical_session_rotation").select("session_ids").eq("id",1).maybeSingle();return e||!t?[]:t.session_ids}async function Xc(t){const{error:e}=await E.from("physical_session_rotation").update({session_ids:t}).eq("id",1);return e?e.message:null}function Zc(t){return{id:t.id,name:t.name,types:t.types,instructions:t.instructions,videoUrl:t.video_url}}function Wi(t){return{name:t.name,types:t.types,instructions:t.instructions,video_url:t.videoUrl}}async function ss(){const{data:t,error:e}=await E.from("physical_exercises").select("*").order("name",{ascending:!0});return e||!t?[]:t.map(Zc)}async function Qc(t){const{error:e}=await E.from("physical_exercises").insert(Wi(t));return e?e.message:null}async function eu(t,e){const{error:r}=await E.from("physical_exercises").update(Wi(e)).eq("id",t);return r?r.message:null}async function tu(t){const{error:e}=await E.from("physical_exercises").delete().eq("id",t);return e?e.message:null}function Gi(t){const e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())),r=e.getUTCDay()||7;e.setUTCDate(e.getUTCDate()+4-r);const s=new Date(Date.UTC(e.getUTCFullYear(),0,1));return Math.ceil(((e.getTime()-s.getTime())/864e5+1)/7)}function ru(t,e,r=new Date){const s=t.filter(n=>e.has(n));if(s.length===0)return null;const i=(Gi(r)-1)%s.length;return s[i]??null}var su=Object.defineProperty,iu=Object.getOwnPropertyDescriptor,Er=(t,e,r,s)=>{for(var i=s>1?void 0:s?iu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&su(e,r,i),i};let at=class extends A{constructor(){super(...arguments),this.session=null,this.exercisesById=new Map,this.loading=!0}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;const[t,e,r]=await Promise.all([rs(),Vi(),ss()]);this.exercisesById=new Map(r.map(i=>[i.id,i]));const s=ru(e,new Set(t.map(i=>i.id)));this.session=t.find(i=>i.id===s)??null,this.loading=!1}handleSelect(t){this.dispatchEvent(new CustomEvent("select-exercise",{detail:t,bubbles:!0,composed:!0}))}renderSlot(t,e){const r=e?this.exercisesById.get(e):void 0;return f`
      <li>
        <button ?disabled=${!r} @click=${()=>r&&this.handleSelect(r)}>
          <span class="slot-label">${t}</span>
          <span>${r?.name??"—"}</span>
        </button>
      </li>
    `}render(){if(this.loading)return f`<p>Chargement…</p>`;const t=Gi(new Date);return this.session?f`
      <h3>Semaine ${t}</h3>
      <div class="card">
        <h2>${this.session.name}</h2>
        <div class="meta">
          ${this.session.objective?f`<span>${this.session.objective}</span>`:""}
          ${this.session.prepType?f`<span>${this.session.prepType}</span>`:""}
          ${this.session.seriesCount?f`<span>${this.session.seriesCount} séries</span>`:""}
          ${this.session.exerciseDurationSeconds?f`<span>${this.session.exerciseDurationSeconds}s d'effort</span>`:""}
          ${this.session.restDurationSeconds!==null?f`<span>${this.session.restDurationSeconds}s de repos</span>`:""}
          ${this.session.betweenSeriesDurationSeconds!==null?f`<span>${this.session.betweenSeriesDurationSeconds}s entre les séries</span>`:""}
        </div>
        <ul>
          ${Array.from({length:Rt},(e,r)=>this.renderSlot(`Exercice ${r+1}`,this.session.exerciseIds[r]??null))}
          ${this.renderSlot("Finisher",this.session.finisherId)}
        </ul>
      </div>
    `:f`
        <h3>Semaine ${t}</h3>
        <p class="empty">Aucune session de préparation physique programmée cette semaine.</p>
      `}};at.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    .card {
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-lg, 18px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      padding: 1.25rem;
    }
    h3 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 0.3rem;
    }
    h2 {
      font-size: 1.25rem;
      margin: 0 0 0.6rem;
      color: var(--color-text, #1f2937);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }
    .meta span {
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.78rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    li button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      text-align: left;
      padding: 0.55rem 0.7rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: white;
      cursor: pointer;
      font-size: 0.88rem;
    }
    li button:hover {
      background: #f7f6fb;
    }
    li button:disabled {
      color: #9ca3af;
      cursor: default;
      background: #f9fafb;
    }
    .slot-label {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.78rem;
      min-width: 5.5rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;Er([m()],at.prototype,"session",2);Er([m()],at.prototype,"exercisesById",2);Er([m()],at.prototype,"loading",2);at=Er([R("current-physical-session")],at);const Ji=["Course","Jambes","Abdos","Dos","Bras","Cardio","Mobilité / Plio","Disque","Proprioception"],nu=/^[A-Za-z0-9_-]{6,20}$/;function au(t){let e;try{e=new URL(t.trim())}catch{return null}const r=e.hostname.replace(/^www\.|^m\.|^music\./,"");let s=null;return r==="youtu.be"?s=e.pathname.slice(1).split("/")[0]??null:r==="youtube.com"&&(e.pathname==="/watch"?s=e.searchParams.get("v"):s=/^\/(?:embed|shorts)\/([^/?]+)/.exec(e.pathname)?.[1]??null),s&&nu.test(s)?s:null}function ou(t){return`https://www.youtube-nocookie.com/embed/${t}`}var lu=Object.defineProperty,cu=Object.getOwnPropertyDescriptor,is=(t,e,r,s)=>{for(var i=s>1?void 0:s?cu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&lu(e,r,i),i};let Pt=class extends A{constructor(){super(...arguments),this.videoUrl=null,this.videoTitle="Vidéo de démonstration"}render(){if(!this.videoUrl)return"";const t=au(this.videoUrl);return t?f`
        <div class="video-wrapper">
          <iframe
            src=${ou(t)}
            title=${this.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `:f`<a class="video-link" href=${this.videoUrl} target="_blank" rel="noopener">Voir la vidéo de démonstration</a>`}};Pt.styles=O`
    :host {
      display: block;
    }
    .video-wrapper {
      position: relative;
      width: 100%;
      max-width: 480px;
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-sm, 8px);
      overflow: hidden;
    }
    .video-wrapper iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .video-link {
      color: var(--color-primary, #7c3aed);
      font-size: 0.9rem;
    }
  `;is([j()],Pt.prototype,"videoUrl",2);is([j()],Pt.prototype,"videoTitle",2);Pt=is([R("physical-exercise-video")],Pt);var uu=Object.defineProperty,hu=Object.getOwnPropertyDescriptor,Yi=(t,e,r,s)=>{for(var i=s>1?void 0:s?hu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&uu(e,r,i),i};let mr=class extends A{render(){return f`
      <header>
        <div>
          <h2>${this.exercise.name}</h2>
          ${this.exercise.types.length>0?f`<div class="types">
                ${this.exercise.types.map(t=>f`<span class="type-badge">${t}</span>`)}
              </div>`:""}
        </div>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}>← Retour</button>
      </header>
      ${this.exercise.instructions?f`<p class="instructions">${this.exercise.instructions}</p>`:""}
      <physical-exercise-video
        .videoUrl=${this.exercise.videoUrl}
        videoTitle="Vidéo de démonstration — ${this.exercise.name}"
      ></physical-exercise-video>
    `}};mr.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 560px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }
    h2 {
      font-size: 1.15rem;
      margin: 0 0 0.4rem;
    }
    .types {
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
    }
    .type-badge {
      display: inline-block;
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.72rem;
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
    }
    .instructions {
      white-space: pre-wrap;
      font-size: 0.9rem;
      color: #374151;
      margin: 0.75rem 0;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      font-size: 0.9rem;
      cursor: pointer;
      flex-shrink: 0;
    }
  `;Yi([j({attribute:!1})],mr.prototype,"exercise",2);mr=Yi([R("physical-exercise-detail")],mr);var du=Object.defineProperty,fu=Object.getOwnPropertyDescriptor,Ae=(t,e,r,s)=>{for(var i=s>1?void 0:s?fu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&du(e,r,i),i};let oe=class extends A{constructor(){super(...arguments),this.exercise=null,this.name="",this.types=new Set,this.instructions="",this.videoUrl="",this.errorMessage=null,this.submitting=!1}willUpdate(t){t.has("exercise")&&(this.name=this.exercise?.name??"",this.types=new Set(this.exercise?.types??[]),this.instructions=this.exercise?.instructions??"",this.videoUrl=this.exercise?.videoUrl??"")}toggleType(t){const e=new Set(this.types);e.has(t)?e.delete(t):e.add(t),this.types=e}validate(){return this.name.trim()?null:"Le nom de l'exercice est obligatoire."}async handleSubmit(t){t.preventDefault();const e=this.validate();if(e){this.errorMessage=e;return}this.errorMessage=null,this.submitting=!0;const r={name:this.name.trim(),types:[...this.types],instructions:this.instructions.trim()?this.instructions.trim():null,videoUrl:this.videoUrl.trim()?this.videoUrl.trim():null},s=this.exercise?await eu(this.exercise.id,r):await Qc(r);if(this.submitting=!1,s){this.errorMessage=s;return}this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0}))}render(){return f`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}

        <label for="name">Nom de l'exercice</label>
        <input
          id="name"
          required
          .value=${this.name}
          @input=${t=>this.name=t.target.value}
        />

        <label>Types <span class="hint">(facultatif, plusieurs possibles)</span></label>
        <div class="chip-grid">
          ${Ji.map(t=>{const e=this.types.has(t);return f`
              <button
                type="button"
                class="chip ${e?"active":""}"
                aria-pressed=${e}
                @click=${()=>this.toggleType(t)}
              >
                ${t}
              </button>
            `})}
        </div>

        <label for="instructions">Consignes <span class="hint">(facultatif)</span></label>
        <textarea
          id="instructions"
          .value=${this.instructions}
          @input=${t=>this.instructions=t.target.value}
        ></textarea>

        <label for="video-url">Lien vidéo de démonstration <span class="hint">(facultatif, YouTube intégré automatiquement)</span></label>
        <input
          id="video-url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          .value=${this.videoUrl}
          @input=${t=>this.videoUrl=t.target.value}
        />

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting?"Enregistrement…":this.exercise?"Enregistrer":"Ajouter l'exercice"}
          </button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}>
            Annuler
          </button>
        </div>
      </form>
    `}};oe.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 480px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    .hint {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.78rem;
    }
    input,
    textarea {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
    }
    textarea {
      resize: vertical;
      min-height: 5rem;
    }
    .chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .chip {
      min-height: 2.6rem;
      padding: 0.5rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--color-border, #d1d5db);
      background: white;
      color: #374151;
      font-size: 0.85rem;
      cursor: pointer;
      touch-action: manipulation;
    }
    .chip.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.25rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;Ae([j({attribute:!1})],oe.prototype,"exercise",2);Ae([m()],oe.prototype,"name",2);Ae([m()],oe.prototype,"types",2);Ae([m()],oe.prototype,"instructions",2);Ae([m()],oe.prototype,"videoUrl",2);Ae([m()],oe.prototype,"errorMessage",2);Ae([m()],oe.prototype,"submitting",2);oe=Ae([R("physical-exercise-form")],oe);var pu=Object.defineProperty,mu=Object.getOwnPropertyDescriptor,lt=(t,e,r,s)=>{for(var i=s>1?void 0:s?mu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&pu(e,r,i),i};let Ee=class extends A{constructor(){super(...arguments),this.view={mode:"list"},this.exercises=[],this.loading=!0,this.errorMessage=null}get canManage(){return this.member.isAdmin}connectedCallback(){super.connectedCallback(),this.refresh()}async refresh(){this.loading=!0,this.exercises=await ss(),this.loading=!1}goToList(){this.view={mode:"list"},this.refresh()}async handleDelete(t){if(!confirm(`Supprimer l'exercice "${t.name}" ?`))return;this.errorMessage=null;const e=await tu(t.id);if(e){this.errorMessage=e;return}await this.refresh()}renderList(){return this.loading?f`<p>Chargement…</p>`:this.exercises.length===0?f`<p class="empty">Aucun exercice pour le moment.</p>`:f`
      <ul>
        ${this.exercises.map(t=>f`
            <li class="card">
              <div class="card-header">
                <div>
                  <h3>${t.name}</h3>
                  ${t.types.length>0?f`<div class="types">
                        ${t.types.map(e=>f`<span class="type-badge">${e}</span>`)}
                      </div>`:""}
                </div>
                ${this.canManage?f`
                      <div class="actions">
                        <button @click=${()=>this.view={mode:"edit",exercise:t}}>Modifier</button>
                        <button class="danger" @click=${()=>this.handleDelete(t)}>Supprimer</button>
                      </div>
                    `:""}
              </div>
              ${t.instructions?f`<p class="instructions">${t.instructions}</p>`:""}
              <physical-exercise-video
                .videoUrl=${t.videoUrl}
                videoTitle="Vidéo de démonstration — ${t.name}"
              ></physical-exercise-video>
            </li>
          `)}
      </ul>
    `}render(){return f`
      <header>
        <h2>Préparation physique</h2>
        ${this.view.mode==="list"&&this.canManage?f`<button @click=${()=>this.view={mode:"create"}}>+ Ajouter un exercice</button>`:""}
      </header>

      ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}

      ${this.view.mode==="list"?this.renderList():f`<physical-exercise-form
            .exercise=${this.view.mode==="edit"?this.view.exercise:null}
            @saved=${()=>this.goToList()}
            @cancel=${()=>this.goToList()}
          ></physical-exercise-form>`}
    `}};Ee.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    header button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--radius-md, 8px);
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .card {
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      padding: 1rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.4rem;
      color: var(--color-text, #1f2937);
    }
    .types {
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
    }
    .type-badge {
      display: inline-block;
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.72rem;
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
    }
    .instructions {
      white-space: pre-wrap;
      font-size: 0.9rem;
      color: #374151;
      margin: 0 0 0.75rem;
    }
    .actions {
      display: flex;
      gap: 0.4rem;
      flex-shrink: 0;
    }
    .actions button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .actions button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
  `;lt([j({attribute:!1})],Ee.prototype,"member",2);lt([m()],Ee.prototype,"view",2);lt([m()],Ee.prototype,"exercises",2);lt([m()],Ee.prototype,"loading",2);lt([m()],Ee.prototype,"errorMessage",2);Ee=lt([R("physical-exercises-view")],Ee);var gu=Object.defineProperty,bu=Object.getOwnPropertyDescriptor,V=(t,e,r,s)=>{for(var i=s>1?void 0:s?bu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&gu(e,r,i),i};function Zt(t){if(t.trim()==="")return null;const e=Number(t);return Number.isInteger(e)?e:null}let F=class extends A{constructor(){super(...arguments),this.session=null,this.exercises=[],this.loadingOptions=!0,this.name="",this.objective="",this.prepType="",this.seriesCount="",this.exerciseDurationSeconds="",this.restDurationSeconds="",this.betweenSeriesDurationSeconds="",this.exerciseIds=Vc(),this.finisherId=null,this.errorMessage=null,this.submitting=!1}connectedCallback(){super.connectedCallback(),this.loadExercises()}async loadExercises(){this.loadingOptions=!0,this.exercises=await ss(),this.loadingOptions=!1}willUpdate(t){!t.has("session")||!this.session||(this.name=this.session.name,this.objective=this.session.objective??"",this.prepType=this.session.prepType??"",this.seriesCount=this.session.seriesCount?.toString()??"",this.exerciseDurationSeconds=this.session.exerciseDurationSeconds?.toString()??"",this.restDurationSeconds=this.session.restDurationSeconds?.toString()??"",this.betweenSeriesDurationSeconds=this.session.betweenSeriesDurationSeconds?.toString()??"",this.exerciseIds=[...this.session.exerciseIds],this.finisherId=this.session.finisherId)}setSlot(t,e){const r=[...this.exerciseIds];r[t]=e||null,this.exerciseIds=r}validate(){return this.name.trim()?null:"Le nom de la session est obligatoire."}async handleSubmit(t){t.preventDefault();const e=this.validate();if(e){this.errorMessage=e;return}this.errorMessage=null,this.submitting=!0;const r={name:this.name.trim(),objective:this.objective?this.objective:null,prepType:this.prepType?this.prepType:null,seriesCount:Zt(this.seriesCount),exerciseDurationSeconds:Zt(this.exerciseDurationSeconds),restDurationSeconds:Zt(this.restDurationSeconds),betweenSeriesDurationSeconds:Zt(this.betweenSeriesDurationSeconds),exerciseIds:this.exerciseIds,finisherId:this.finisherId},s=this.session?await Jc(this.session.id,r):await Gc(r);if(this.submitting=!1,s){this.errorMessage=s;return}this.dispatchEvent(new CustomEvent("saved",{bubbles:!0,composed:!0}))}renderExerciseSelect(t,e,r){return f`
      <div class="slot">
        <label>${t}</label>
        <select .value=${e??""} @change=${s=>r(s.target.value)}>
          <option value="">— Aucun —</option>
          ${this.exercises.map(s=>f`<option value=${s.id}>${s.name}</option>`)}
        </select>
      </div>
    `}render(){return this.loadingOptions?f`<p>Chargement…</p>`:f`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}

        <label for="name">Nom de la session</label>
        <input
          id="name"
          required
          .value=${this.name}
          @input=${t=>this.name=t.target.value}
        />

        <label for="objective">Objectif <span class="hint">(facultatif)</span></label>
        <select
          id="objective"
          .value=${this.objective}
          @change=${t=>this.objective=t.target.value}
        >
          <option value="">— Aucun —</option>
          ${Ji.map(t=>f`<option value=${t}>${t}</option>`)}
        </select>

        <label for="prep-type">Type de prépa <span class="hint">(facultatif)</span></label>
        <select
          id="prep-type"
          .value=${this.prepType}
          @change=${t=>this.prepType=t.target.value}
        >
          <option value="">— Aucun —</option>
          ${Kc.map(t=>f`<option value=${t}>${t}</option>`)}
        </select>

        <div class="grid-2">
          <div>
            <label for="series-count">Nombre de séries</label>
            <input
              id="series-count"
              type="number"
              min="1"
              .value=${this.seriesCount}
              @input=${t=>this.seriesCount=t.target.value}
            />
          </div>
          <div>
            <label for="exercise-duration">Durée des exercices (s)</label>
            <input
              id="exercise-duration"
              type="number"
              min="1"
              .value=${this.exerciseDurationSeconds}
              @input=${t=>this.exerciseDurationSeconds=t.target.value}
            />
          </div>
          <div>
            <label for="rest-duration">Durée du repos (s)</label>
            <input
              id="rest-duration"
              type="number"
              min="0"
              .value=${this.restDurationSeconds}
              @input=${t=>this.restDurationSeconds=t.target.value}
            />
          </div>
          <div>
            <label for="between-series-duration">Durée entre les séries (s)</label>
            <input
              id="between-series-duration"
              type="number"
              min="0"
              .value=${this.betweenSeriesDurationSeconds}
              @input=${t=>this.betweenSeriesDurationSeconds=t.target.value}
            />
          </div>
        </div>

        <fieldset>
          <legend>Exercices</legend>
          ${Array.from({length:Rt},(t,e)=>this.renderExerciseSelect(`Exercice ${e+1}`,this.exerciseIds[e]??null,r=>this.setSlot(e,r)))}
          ${this.renderExerciseSelect("Finisher",this.finisherId,t=>this.finisherId=t||null)}
        </fieldset>

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting?"Enregistrement…":this.session?"Enregistrer":"Créer la session"}
          </button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}>
            Annuler
          </button>
        </div>
      </form>
    `}};F.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 520px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    .hint {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.78rem;
    }
    input,
    select {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
    fieldset {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    legend {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
      padding: 0 0.3rem;
    }
    .slot {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .slot label {
      width: 6.5rem;
      flex-shrink: 0;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.25rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;V([j({attribute:!1})],F.prototype,"session",2);V([m()],F.prototype,"exercises",2);V([m()],F.prototype,"loadingOptions",2);V([m()],F.prototype,"name",2);V([m()],F.prototype,"objective",2);V([m()],F.prototype,"prepType",2);V([m()],F.prototype,"seriesCount",2);V([m()],F.prototype,"exerciseDurationSeconds",2);V([m()],F.prototype,"restDurationSeconds",2);V([m()],F.prototype,"betweenSeriesDurationSeconds",2);V([m()],F.prototype,"exerciseIds",2);V([m()],F.prototype,"finisherId",2);V([m()],F.prototype,"errorMessage",2);V([m()],F.prototype,"submitting",2);F=V([R("physical-session-form")],F);var vu=Object.defineProperty,yu=Object.getOwnPropertyDescriptor,Bt=(t,e,r,s)=>{for(var i=s>1?void 0:s?yu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&vu(e,r,i),i};let Be=class extends A{constructor(){super(...arguments),this.view={mode:"list"},this.sessions=[],this.loading=!0,this.errorMessage=null}connectedCallback(){super.connectedCallback(),this.refresh()}async refresh(){this.loading=!0,this.sessions=await rs(),this.loading=!1}goToList(){this.view={mode:"list"},this.refresh()}async handleDelete(t){if(!confirm(`Supprimer la session "${t.name}" ?`))return;this.errorMessage=null;const e=await Yc(t.id);if(e){this.errorMessage=e;return}await this.refresh()}renderList(){return this.loading?f`<p>Chargement…</p>`:this.sessions.length===0?f`<p class="empty">Aucune session pour le moment.</p>`:f`
      <ul>
        ${this.sessions.map(t=>f`
            <li class="card">
              <div>
                <div class="name">${t.name}</div>
                <div class="meta">${[t.objective,t.prepType].filter(Boolean).join(" · ")||"—"}</div>
              </div>
              <div class="actions">
                <button @click=${()=>this.view={mode:"edit",session:t}}>Modifier</button>
                <button class="danger" @click=${()=>this.handleDelete(t)}>Supprimer</button>
              </div>
            </li>
          `)}
      </ul>
    `}render(){return f`
      <header>
        <h3>Sessions</h3>
        ${this.view.mode==="list"?f`<button @click=${()=>this.view={mode:"create"}}>+ Créer une session</button>`:""}
      </header>

      ${this.errorMessage?f`<p class="error">${this.errorMessage}</p>`:""}

      ${this.view.mode==="list"?this.renderList():f`<physical-session-form
            .session=${this.view.mode==="edit"?this.view.session:null}
            @saved=${()=>this.goToList()}
            @cancel=${()=>this.goToList()}
          ></physical-session-form>`}
    `}};Be.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0;
    }
    header button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--radius-md, 8px);
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      padding: 0.75rem 1rem;
    }
    .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .meta {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.82rem;
    }
    .actions {
      display: flex;
      gap: 0.4rem;
      flex-shrink: 0;
    }
    .actions button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .actions button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
  `;Bt([m()],Be.prototype,"view",2);Bt([m()],Be.prototype,"sessions",2);Bt([m()],Be.prototype,"loading",2);Bt([m()],Be.prototype,"errorMessage",2);Be=Bt([R("physical-sessions-list")],Be);var wu=Object.defineProperty,_u=Object.getOwnPropertyDescriptor,He=(t,e,r,s)=>{for(var i=s>1?void 0:s?_u(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&wu(e,r,i),i};let ye=class extends A{constructor(){super(...arguments),this.sessions=[],this.rotation=[],this.loading=!0,this.toAddId="",this.saving=!1,this.message=null}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;const[t,e]=await Promise.all([rs(),Vi()]);this.sessions=t,this.rotation=e.filter(r=>t.some(s=>s.id===r)),this.loading=!1}sessionName(t){return this.sessions.find(e=>e.id===t)?.name??"(session supprimée)"}addToRotation(){this.toAddId&&(this.rotation=[...this.rotation,this.toAddId],this.toAddId="")}removeAt(t){this.rotation=this.rotation.filter((e,r)=>r!==t)}moveAt(t,e){const r=t+e;if(r<0||r>=this.rotation.length)return;const s=[...this.rotation],[i]=s.splice(t,1);s.splice(r,0,i),this.rotation=s}async handleSave(){this.saving=!0,this.message=null;const t=await Xc(this.rotation);this.saving=!1,this.message=t?{kind:"error",text:t}:{kind:"success",text:"Roulement enregistré."}}render(){if(this.loading)return f`<p>Chargement…</p>`;const t=this.sessions;return f`
      <h3>Roulement des sessions</h3>
      <p class="hint">
        Ordre rejoué en boucle, une session par semaine (numérotation des semaines ISO : semaine 1 → 1er élément,
        semaine 2 → 2e, etc., puis on recommence).
      </p>

      ${this.message?f`<p class=${this.message.kind}>${this.message.text}</p>`:""}

      ${this.rotation.length===0?f`<p class="empty">Aucune session dans le roulement.</p>`:f`
            <ol>
              ${this.rotation.map((e,r)=>f`
                  <li>
                    <span class="name">${this.sessionName(e)}</span>
                    <button ?disabled=${r===0} @click=${()=>this.moveAt(r,-1)}>↑</button>
                    <button ?disabled=${r===this.rotation.length-1} @click=${()=>this.moveAt(r,1)}>↓</button>
                    <button class="danger" @click=${()=>this.removeAt(r)}>✕</button>
                  </li>
                `)}
            </ol>
          `}

      <div class="add-row">
        <select .value=${this.toAddId} @change=${e=>this.toAddId=e.target.value}>
          <option value="">— Choisir une session à ajouter —</option>
          ${t.map(e=>f`<option value=${e.id}>${e.name}</option>`)}
        </select>
        <button @click=${()=>this.addToRotation()}>Ajouter</button>
      </div>

      <button class="primary" ?disabled=${this.saving} @click=${()=>this.handleSave()}>
        ${this.saving?"Enregistrement…":"Enregistrer le roulement"}
      </button>
    `}};ye.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.4rem;
    }
    p.hint {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.85rem;
      margin: 0 0 1rem;
    }
    ol {
      list-style: decimal;
      margin: 0 0 1rem;
      padding-left: 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    li .name {
      flex: 1;
    }
    .add-row {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    select {
      flex: 1;
      padding: 0.5rem 0.65rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
    }
    button {
      padding: 0.4rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.85rem;
      cursor: pointer;
    }
    button.primary {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;He([m()],ye.prototype,"sessions",2);He([m()],ye.prototype,"rotation",2);He([m()],ye.prototype,"loading",2);He([m()],ye.prototype,"toAddId",2);He([m()],ye.prototype,"saving",2);He([m()],ye.prototype,"message",2);ye=He([R("physical-session-rotation-editor")],ye);var $u=Object.defineProperty,Su=Object.getOwnPropertyDescriptor,ns=(t,e,r,s)=>{for(var i=s>1?void 0:s?Su(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&$u(e,r,i),i};let It=class extends A{constructor(){super(...arguments),this.view={mode:"current"}}get isAdmin(){return this.member.isAdmin}renderToolbar(){return f`
      <div class="toolbar">
        <button class=${this.view.mode==="current"?"active":""} @click=${()=>this.view={mode:"current"}}>
          Session de la semaine
        </button>
        <button class=${this.view.mode==="exercises"?"active":""} @click=${()=>this.view={mode:"exercises"}}>
          Tous les exercices
        </button>
        ${this.isAdmin?f`
              <button class=${this.view.mode==="sessions"?"active":""} @click=${()=>this.view={mode:"sessions"}}>
                Gérer les sessions
              </button>
              <button class=${this.view.mode==="rotation"?"active":""} @click=${()=>this.view={mode:"rotation"}}>
                Gérer le roulement
              </button>
            `:""}
      </div>
    `}renderBody(){switch(this.view.mode){case"current":return f`<current-physical-session
          @select-exercise=${t=>this.view={mode:"exercise-detail",exercise:t.detail}}
        ></current-physical-session>`;case"exercise-detail":return f`<physical-exercise-detail
          .exercise=${this.view.exercise}
          @back=${()=>this.view={mode:"current"}}
        ></physical-exercise-detail>`;case"exercises":return f`<physical-exercises-view .member=${this.member}></physical-exercises-view>`;case"sessions":return f`<physical-sessions-list></physical-sessions-list>`;case"rotation":return f`<physical-session-rotation-editor></physical-session-rotation-editor>`}}render(){return f`
      <header>
        <h2>Préparation physique</h2>
      </header>
      ${this.view.mode!=="exercise-detail"?this.renderToolbar():""}
      ${this.renderBody()}
    `}};It.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    .toolbar {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .toolbar button {
      padding: 0.45rem 0.8rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: 999px;
      background: white;
      color: var(--color-text, #1f2937);
      font-size: 0.82rem;
      cursor: pointer;
    }
    .toolbar button.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
  `;ns([j({attribute:!1})],It.prototype,"member",2);ns([m()],It.prototype,"view",2);It=ns([R("physical-prep-view")],It);var ku=Object.defineProperty,Eu=Object.getOwnPropertyDescriptor,zt=(t,e,r,s)=>{for(var i=s>1?void 0:s?Eu(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&ku(e,r,i),i};function ni(){return{tab:"home",eventsView:{mode:"list"}}}const xu=[{id:"home",label:"Accueil",icon:"🏠",visible:()=>!0},{id:"events",label:"Événements",icon:"📅",visible:()=>!0},{id:"physical-prep",label:"Préparation physique",icon:"💪",visible:()=>!0},{id:"members",label:"Membres",icon:"👥",visible:t=>t.isAdmin},{id:"age-categories",label:"Catégories",icon:"🎂",visible:t=>t.isAdmin},{id:"event-references",label:"Référentiels",icon:"⚙️",visible:t=>t.isAdmin}];let ze=class extends A{constructor(){super(...arguments),this.nav=ni(),this.drawerOpen=!1,this.eventsListRefreshToken=0,this.handlePopState=t=>{this.nav=t.state??ni()}}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this.handlePopState),history.replaceState(this.nav,"")}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState)}navigate(t){this.nav=t,history.pushState(t,"")}get visibleTabs(){return xu.filter(t=>t.visible(this.member))}goTo(t){this.navigate({tab:t,eventsView:{mode:"list"}}),this.drawerOpen=!1}goToEventsView(t){this.navigate({tab:"events",eventsView:t})}renderContent(){switch(this.nav.tab){case"home":return f`<home-view
          .member=${this.member}
          @select-event=${t=>this.goToEventsView({mode:"detail",event:t.detail})}
        ></home-view>`;case"events":return f`<events-view
          .member=${this.member}
          .view=${this.nav.eventsView}
          .listRefreshToken=${this.eventsListRefreshToken}
          @select-event=${t=>this.goToEventsView({mode:"detail",event:t.detail})}
          @create-event=${()=>this.goToEventsView({mode:"create"})}
          @edit-event=${t=>this.goToEventsView({mode:"edit",event:t.detail})}
          @back-to-list=${()=>this.goToEventsView({mode:"list"})}
          @saved=${()=>{this.eventsListRefreshToken+=1,this.goToEventsView({mode:"list"})}}
        ></events-view>`;case"physical-prep":return f`<physical-prep-view .member=${this.member}></physical-prep-view>`;case"members":return f`<admin-members-view></admin-members-view>`;case"age-categories":return f`<age-categories-view></age-categories-view>`;case"event-references":return f`<event-reference-admin-view></event-reference-admin-view>`}}render(){return f`
      <header>
        <button class="menu-toggle" @click=${()=>this.drawerOpen=!0} aria-label="Ouvrir le menu">☰</button>
        <span class="title">DahultiApp</span>
        <span class="who">${this.member.firstName} ${this.member.lastName}</span>
      </header>

      <main>${this.renderContent()}</main>

      ${this.drawerOpen?f`
            <div class="backdrop" @click=${()=>this.drawerOpen=!1}></div>
            <div class="drawer">
              <div class="drawer-header">
                <span>DahultiApp</span>
                <button @click=${()=>this.drawerOpen=!1} aria-label="Fermer le menu">✕</button>
              </div>
              <nav>
                ${this.visibleTabs.map(t=>f`
                    <button class=${this.nav.tab===t.id?"active":""} @click=${()=>this.goTo(t.id)}>
                      <span class="icon">${t.icon}</span>
                      <span>${t.label}</span>
                    </button>
                  `)}
              </nav>
              <div class="drawer-footer">
                <button @click=${()=>Fl()}>Déconnexion</button>
              </div>
            </div>
          `:""}
    `}};ze.styles=O`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      min-height: 100vh;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 20;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--color-primary, #7c3aed);
      color: white;
      box-shadow: var(--shadow-sm, none);
    }
    .menu-toggle {
      justify-self: start;
      border: none;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      font-size: 1.15rem;
      cursor: pointer;
    }
    .title {
      justify-self: center;
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: 0.02em;
    }
    .who {
      justify-self: end;
      font-size: 0.85rem;
      text-align: right;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    main {
      padding: 1.25rem;
      color: var(--color-text, #1f2937);
      max-width: 760px;
      margin: 0 auto;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(17, 12, 34, 0.35);
      z-index: 30;
    }
    .drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: min(280px, 82vw);
      background: var(--color-surface, white);
      z-index: 31;
      box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15));
      display: flex;
      flex-direction: column;
      padding: 1.25rem 0.75rem;
    }
    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem 1rem;
      border-bottom: 1px solid var(--color-border, #e6e3f1);
      margin-bottom: 0.75rem;
    }
    .drawer-header span {
      font-weight: 700;
      color: var(--color-primary, #7c3aed);
    }
    .drawer-header button {
      border: none;
      background: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--color-text-muted, #6b7280);
    }
    .drawer nav {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .drawer nav button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border: none;
      background: none;
      border-radius: var(--radius-sm, 8px);
      font-size: 0.95rem;
      color: var(--color-text, #1f2937);
      cursor: pointer;
      text-align: left;
    }
    .drawer nav button .icon {
      font-size: 1.1rem;
    }
    .drawer nav button.active {
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      font-weight: 600;
    }
    .drawer-footer {
      margin-top: auto;
      padding-top: 0.75rem;
      border-top: 1px solid var(--color-border, #e6e3f1);
    }
    .drawer-footer button {
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: none;
      cursor: pointer;
      font-size: 0.9rem;
      color: var(--color-text, #1f2937);
    }
  `;zt([j({attribute:!1})],ze.prototype,"member",2);zt([m()],ze.prototype,"nav",2);zt([m()],ze.prototype,"drawerOpen",2);zt([m()],ze.prototype,"eventsListRefreshToken",2);ze=zt([R("app-shell")],ze);var Tu=Object.defineProperty,Au=Object.getOwnPropertyDescriptor,Xi=(t,e,r,s)=>{for(var i=s>1?void 0:s?Au(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(s?a(e,r,i):a(i))||i);return s&&i&&Tu(e,r,i),i};let gr=class extends A{constructor(){super(...arguments),this.session={status:"loading"},this.unsubscribe=null}connectedCallback(){super.connectedCallback(),this.unsubscribe=nr.subscribe(t=>{this.session=t})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.()}render(){switch(this.session.status){case"loading":return f`<p class="loading">Chargement…</p>`;case"signed-out":return f`<login-view></login-view>`;case"signed-in":return this.session.member.mustChangePassword?f`<change-password-view></change-password-view>`:f`<app-shell .member=${this.session.member}></app-shell>`}}};gr.styles=O`
    :host {
      display: block;
    }
    .loading {
      font-family: system-ui, sans-serif;
      text-align: center;
      margin-top: 3rem;
      color: #6b7280;
    }
  `;Xi([m()],gr.prototype,"session",2);gr=Xi([R("dahultiapp-root")],gr);Bl();
