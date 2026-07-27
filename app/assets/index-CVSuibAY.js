(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const U=globalThis,z=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),W=new WeakMap;let rt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(z&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=W.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&W.set(e,t))}return t}toString(){return this.cssText}};const pt=i=>new rt(typeof i=="string"?i:i+"",void 0,L),j=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new rt(e,i,L)},ut=(i,t)=>{if(z)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=U.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},K=z?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return pt(e)})(i):i;const{is:ft,defineProperty:mt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:gt,getOwnPropertySymbols:_t,getPrototypeOf:yt}=Object,H=globalThis,F=H.trustedTypes,At=F?F.emptyScript:"",vt=H.reactiveElementPolyfillSupport,S=(i,t)=>i,M={toAttribute(i,t){switch(t){case Boolean:i=i?At:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},I=(i,t)=>!ft(i,t),Z={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),H.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Z){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&mt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:o}=$t(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){const l=r?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Z}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const t=yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const e=this.properties,s=[...gt(e),..._t(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(K(r))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:M).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:M;this._$Em=r;const l=n.fromAttribute(e,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,s,r=!1,o){if(t!==void 0){const n=this.constructor;if(r===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??I)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[S("elementProperties")]=new Map,y[S("finalized")]=new Map,vt?.({ReactiveElement:y}),(H.reactiveElementVersions??=[]).push("2.1.2");const B=globalThis,J=i=>i,N=B.trustedTypes,Y=N?N.createPolicy("lit-html",{createHTML:i=>i}):void 0,it="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+m,bt=`<${ot}>`,_=document,w=()=>_.createComment(""),x=i=>i===null||typeof i!="object"&&typeof i!="function",V=Array.isArray,Et=i=>V(i)||typeof i?.[Symbol.iterator]=="function",k=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,G=/-->/g,Q=/>/g,$=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),X=/'/g,tt=/"/g,nt=/^(?:script|style|textarea|title)$/i,St=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),at=St(1),v=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),et=new WeakMap,g=_.createTreeWalker(_,129);function lt(i,t){if(!V(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Y!==void 0?Y.createHTML(t):t}const wt=(i,t)=>{const e=i.length-1,s=[];let r,o=t===2?"<svg>":t===3?"<math>":"",n=E;for(let l=0;l<e;l++){const a=i[l];let h,p,c=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===E?p[1]==="!--"?n=G:p[1]!==void 0?n=Q:p[2]!==void 0?(nt.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=$):p[3]!==void 0&&(n=$):n===$?p[0]===">"?(n=r??E,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?$:p[3]==='"'?tt:X):n===tt||n===X?n=$:n===G||n===Q?n=E:(n=$,r=void 0);const f=n===$&&i[l+1].startsWith("/>")?" ":"";o+=n===E?a+bt:c>=0?(s.push(h),a.slice(0,c)+it+a.slice(c)+m+f):a+m+(c===-2?l:f)}return[lt(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class P{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[h,p]=wt(t,e);if(this.el=P.createElement(h,s),g.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=g.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(it)){const u=p[n++],f=r.getAttribute(c).split(m),O=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:O[2],strings:f,ctor:O[1]==="."?Pt:O[1]==="?"?Ct:O[1]==="@"?Ot:R}),r.removeAttribute(c)}else c.startsWith(m)&&(a.push({type:6,index:o}),r.removeAttribute(c));if(nt.test(r.tagName)){const c=r.textContent.split(m),u=c.length-1;if(u>0){r.textContent=N?N.emptyScript:"";for(let f=0;f<u;f++)r.append(c[f],w()),g.nextNode(),a.push({type:2,index:++o});r.append(c[u],w())}}}else if(r.nodeType===8)if(r.data===ot)a.push({type:2,index:o});else{let c=-1;for(;(c=r.data.indexOf(m,c+1))!==-1;)a.push({type:7,index:o}),c+=m.length-1}o++}}static createElement(t,e){const s=_.createElement("template");return s.innerHTML=t,s}}function b(i,t,e=i,s){if(t===v)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl;const o=x(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=b(i,r._$AS(i,t.values),r,s)),t}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??_).importNode(e,!0);g.currentNode=r;let o=g.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new C(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new Ut(o,this,t)),this._$AV.push(h),a=s[++l]}n!==a?.index&&(o=g.nextNode(),n++)}return g.currentNode=_,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class C{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=b(this,t,e),x(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Et(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&x(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=P.createElement(lt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const o=new xt(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=et.get(t.strings);return e===void 0&&et.set(t.strings,e=new P(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const o of t)r===e.length?e.push(s=new C(this.O(w()),this.O(w()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=J(t).nextSibling;J(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,r){const o=this.strings;let n=!1;if(o===void 0)t=b(this,t,e,0),n=!x(t)||t!==this._$AH&&t!==v,n&&(this._$AH=t);else{const l=t;let a,h;for(t=o[0],a=0;a<o.length-1;a++)h=b(this,l[s+a],e,a),h===v&&(h=this._$AH[a]),n||=!x(h)||h!==this._$AH[a],h===d?t=d:t!==d&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Ct extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Ot extends R{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=b(this,t,e,0)??d)===v)return;const s=this._$AH,r=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ut{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){b(this,t)}}const Mt=B.litHtmlPolyfillSupport;Mt?.(P,C),(B.litHtmlVersions??=[]).push("3.3.3");const Nt=(i,t,e)=>{const s=e?.renderBefore??t;let r=s._$litPart$;if(r===void 0){const o=e?.renderBefore??null;s._$litPart$=r=new C(t.insertBefore(w(),o),o,void 0,e??{})}return r._$AI(i),r};const q=globalThis;class A extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}}A._$litElement$=!0,A.finalized=!0,q.litElementHydrateSupport?.({LitElement:A});const Tt=q.litElementPolyfillSupport;Tt?.({LitElement:A});(q.litElementVersions??=[]).push("4.2.2");const ct=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};const Ht={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:I},Rt=(i=Ht,t,e)=>{const{kind:s,metadata:r}=e;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function kt(i){return(t,e)=>typeof e=="object"?Rt(i,t,e):((s,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,t,e)}function Dt(i){const t=st(i.VITE_SUPABASE_URL),e=st(i.VITE_SUPABASE_ANON_KEY);return{supabaseUrl:t,supabaseAnonKey:e,isSupabaseConfigured:t!==null&&e!==null}}function st(i){const t=i?.trim();return t||null}const ht=j`
  :host {
    --color-background: #f5f3ed;
    --color-surface: #ffffff;
    --color-ink: #17201c;
    --color-muted: #64706a;
    --color-brand: #6936c9;
    --color-brand-dark: #45208c;
    --color-accent: #d9f04f;
    --color-border: #deddd7;
    --shadow-card: 0 18px 50px rgb(30 26 49 / 10%);
    color: var(--color-ink);
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .eyebrow {
    color: var(--color-brand);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    margin: 0 0 0.75rem;
    text-transform: uppercase;
  }
`;var zt=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,dt=(i,t,e,s)=>{for(var r=s>1?void 0:s?Lt(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(t,e,r):n(r))||r);return s&&r&&zt(t,e,r),r};let T=class extends A{constructor(){super(...arguments),this.configured=!1}render(){const i=this.configured?"#2a8c5b":"#d28129";return at`
      <article>
        <p class="eyebrow">Étape 1 · Socle technique</p>
        <h2>L’espace membres prend forme.</h2>
        <p>
          L’application est isolée du site public et prête à accueillir
          l’authentification sécurisée, les membres et les événements.
        </p>
        <div
          class="status"
          style=${`--status-color: ${i}`}
          role="status"
        >
          <span class="dot" aria-hidden="true"></span>
          <span>
            <strong>
              ${this.configured?"Connexion Supabase configurée":"Configuration Supabase en attente"}
            </strong>
            <span>
              ${this.configured?"Le socle est prêt pour la prochaine étape.":"Suivez le guide docs/01-socle-technique.md."}
            </span>
          </span>
        </div>
      </article>
    `}};T.styles=[ht,j`
      :host {
        display: block;
      }

      article {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 1.5rem;
        box-shadow: var(--shadow-card);
        overflow: hidden;
        padding: clamp(1.5rem, 5vw, 3rem);
        position: relative;
      }

      article::after {
        background: var(--color-accent);
        border-radius: 999px;
        content: "";
        height: 8rem;
        position: absolute;
        right: -3rem;
        top: -4rem;
        transform: rotate(-18deg);
        width: 8rem;
      }

      h2 {
        font-size: clamp(1.75rem, 5vw, 2.75rem);
        letter-spacing: -0.05em;
        line-height: 1;
        margin: 0;
        max-width: 12ch;
      }

      p:not(.eyebrow) {
        color: var(--color-muted);
        line-height: 1.65;
        margin: 1.25rem 0 0;
        max-width: 58ch;
      }

      .status {
        align-items: center;
        background: #f7f7f3;
        border-radius: 1rem;
        display: flex;
        gap: 0.75rem;
        margin-top: 2rem;
        padding: 1rem;
      }

      .dot {
        background: var(--status-color);
        border-radius: 50%;
        box-shadow: 0 0 0 5px color-mix(in srgb, var(--status-color) 18%, transparent);
        flex: 0 0 auto;
        height: 0.75rem;
        width: 0.75rem;
      }

      .status strong {
        display: block;
        font-size: 0.9rem;
      }

      .status span:last-child {
        color: var(--color-muted);
        display: block;
        font-size: 0.8rem;
        margin-top: 0.15rem;
      }
    `];dt([kt({type:Boolean})],T.prototype,"configured",2);T=dt([ct("setup-card")],T);const jt={};var It=Object.getOwnPropertyDescriptor,Bt=(i,t,e,s)=>{for(var r=s>1?void 0:s?It(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=n(r)||r);return r};let D=class extends A{constructor(){super(...arguments),this.config=Dt(jt)}render(){return at`
      <main>
        <header>
          <div class="brand" aria-label="DahultiApp">
            <span class="mark" aria-hidden="true">D</span>
            <span class="brand-name">DahultiApp</span>
          </div>
          <span class="access">Accès réservé aux membres</span>
        </header>

        <setup-card .configured=${this.config.isSupabaseConfigured}></setup-card>

        <footer>Dahultimate · Annecy</footer>
      </main>
    `}};D.styles=[ht,j`
      :host {
        background:
          radial-gradient(circle at 10% 5%, rgb(105 54 201 / 14%), transparent 28rem),
          var(--color-background);
        display: block;
        min-height: 100vh;
      }

      main {
        margin: 0 auto;
        max-width: 70rem;
        padding: clamp(1.25rem, 5vw, 4rem);
      }

      header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: clamp(3rem, 8vw, 7rem);
      }

      .brand {
        align-items: center;
        display: flex;
        gap: 0.8rem;
      }

      .mark {
        align-items: center;
        background: var(--color-brand);
        border-radius: 0.85rem;
        color: white;
        display: inline-flex;
        font-size: 1.25rem;
        font-weight: 900;
        height: 2.75rem;
        justify-content: center;
        transform: rotate(-4deg);
        width: 2.75rem;
      }

      .brand-name {
        font-size: 1rem;
        font-weight: 850;
        letter-spacing: -0.02em;
      }

      .access {
        color: var(--color-muted);
        font-size: 0.82rem;
        font-weight: 650;
      }

      setup-card {
        margin: 0 auto;
        max-width: 47rem;
      }

      footer {
        color: var(--color-muted);
        font-size: 0.75rem;
        margin-top: 2rem;
        text-align: center;
      }

      @media (max-width: 36rem) {
        .access {
          display: none;
        }
      }
    `];D=Bt([ct("dah-app")],D);
//# sourceMappingURL=index-CVSuibAY.js.map
