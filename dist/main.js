/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`),r="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const i=[],o=[],l=document.createTreeWalker(t.content,133,null,!1);let d=0,p=-1,u=0;const{strings:m,values:{length:f}}=e;for(;u<f;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let i=0;for(let e=0;e<s;e++)a(t[e].name,r)&&i++;for(;i-- >0;){const t=m[u],s=h.exec(t)[2],i=s.toLowerCase()+r,o=e.getAttribute(i);e.removeAttribute(i);const a=o.split(n);this.parts.push({type:"attribute",index:p,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,o=t.split(n),l=o.length-1;for(let t=0;t<l;t++){let i,n=o[t];if(""===n)i=c();else{const e=h.exec(n);null!==e&&a(e[2],r)&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-r.length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++p})}""===o[l]?(s.insertBefore(c(),e),i.push(e)):e.data=o[l],u+=l}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&p!==d||(p++,t.insertBefore(c(),e)),d=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(i.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of i)e.parentNode.removeChild(e)}}const a=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(e,t){const{element:{content:s},parts:i}=e,n=document.createTreeWalker(s,133,null,!1);let r=u(i),o=i[r],a=-1,l=0;const c=[];let h=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,r=u(i,r),o=i[r]}c.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1},m=new WeakMap,f=e=>"function"==typeof e&&m.has(e),y={},_={};class g{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,c=n.nextNode();for(;o<i.length;)if(r=i[o],l(r)){for(;a<r.index;)a++,"TEMPLATE"===c.nodeName&&(s.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=s.pop(),c=n.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${s} `;class S{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===e.indexOf("--\x3e",a+1);const l=h.exec(e);t+=null===l?e+(n?w:i):e.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const x=e=>null===e||!("object"==typeof e||"function"==typeof e),b=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class C{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new P(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!b(e))return e}let i="";for(let n=0;n<t;n++){i+=e[n];const t=s[n];if(void 0!==t){const e=t.value;if(x(e)||!b(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===y||x(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const e=this.value;this.value=y,e(this)}this.value!==y&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}const e=this.__pendingValue;e!==y&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof S?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):b(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const s=new g(t,e.processor,this.options),i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,i=0;for(const n of e)s=t[i],void 0===s&&(s=new N(this.options),t.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(t[i-1])),s.setValue(n),s.commit(),i++;i<t.length&&(t.length=i,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=y}}class k extends C{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends P{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class V{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=U(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=y}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const U=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function M(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return i=t.keyString.get(n),void 0===i&&(i=new o(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const O=new Map,$=new WeakMap,R=new class{handleAttributeExpressions(e,t,s,i){const n=t[0];return"."===n?new k(e,t.slice(1),s).parts:"@"===n?[new V(e,t.slice(1),i.eventContext)]:"?"===n?[new E(e,t.slice(1),s)]:new C(e,t,s).parts}handleTextExpression(e){return new N(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const j=(e,...t)=>new S(e,t,"html",R),z=(e,t)=>`${e}--${t}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const q=e=>t=>{const i=z(t.type,e);let n=O.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},O.set(i,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const a=t.strings.join(s);if(r=n.keyString.get(a),void 0===r){const s=t.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(s,e),r=new o(t,s),n.keyString.set(a,r)}return n.stringsArray.set(t.strings,r),r},L=["html","svg"],W=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const B={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},F=(e,t)=>t!==e&&(t==t||e==e),H={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:F};class D extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=H){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdateInternal(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||H}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=F){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,i=t.converter||B,n="function"==typeof i?i:i.fromAttribute;return n?n(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,i=t.converter;return(i&&i.toAttribute||B.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=H){const i=this.constructor,n=i._attributeNameForProperty(e,s);if(void 0!==n){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let i=!0;if(void 0!==e){const n=this.constructor;s=s||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}D.finalized=!0;const J=Element.prototype;J.msMatchesSelector||J.webkitMatchesSelector;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Q{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(e,...t)=>{const s=t.reduce(((t,s,i)=>t+(e=>{if(e instanceof Q)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[i+1]),e[0]);return new Q(s,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),i=[];s.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!G){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Q(String(t),K)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Y}}Z.finalized=!0,Z.render=(e,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=$.has(s),o=I&&11===s.nodeType&&!!s.host,a=o&&!W.has(n),l=a?document.createDocumentFragment():s;if(((e,s,i)=>{let n=$.get(s);void 0===n&&(t(s,s.firstChild),$.set(s,n=new N(Object.assign({templateFactory:M},i))),n.appendInto(s)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:q(n)},i)),a){const e=$.get(l);$.delete(l);((e,t,s)=>{W.add(e);const i=s?s.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let e=0;e<r;e++){const t=n[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{L.forEach((t=>{const s=O.get(z(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),d(e,s)}))}))})(e);const a=i.content;s?function(e,t,s=null){const{element:{content:i},parts:n}=e;if(null==s)return void i.appendChild(t);const r=document.createTreeWalker(i,133,null,!1);let o=u(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=p(t),s.parentNode.insertBefore(t,s));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=u(n,o);return}o=u(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),d(s,e)}})(n,l,e.value instanceof g?e.value.template:void 0),t(s,s.firstChild),s.appendChild(l),$.set(s,e)}!r&&o&&window.ShadyCSS.styleElement(s.host)};class ee{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach((t=>e+=t+" ")),this.element.setAttribute("class",e)}}}const te=new WeakMap,se=(ie=e=>t=>{if(!(t instanceof P)||t instanceof T||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:s}=t,{element:i}=s;let n=te.get(t);void 0===n&&(i.setAttribute("class",s.strings.join(" ")),te.set(t,n=new Set));const r=i.classList||new ee(i);n.forEach((t=>{t in e||(r.remove(t),n.delete(t))}));for(const t in e){const s=e[t];s!=n.has(t)&&(s?(r.add(t),n.add(t)):(r.remove(t),n.delete(t)))}"function"==typeof r.commit&&r.commit()},(...e)=>{const t=ie(...e);return m.set(t,!0),t});var ie;class ne extends Z{static get styles(){return X`
      :host {
        background: #333;
        z-index: 1;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        border-radius: 30px;
        text-align: center;
        padding: 2em;
        width: 200px;
      }
      :host([winner='true']) {
        box-shadow: inset 0 0 10px whitesmoke, inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff, inset 20px 0 300px #f0f,
          inset -20px 0 300px #0ff, 0 0 50px #fff, -10px 0 80px #f0f,
          10px 0 80px #0ff;
        border-radius: 30px;
        cursor: pointer;
      }
      :host(:hover)[winner='false'] {
        z-index: 2;
        box-shadow: inset 0 0 10px whitesmoke, inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff, inset 20px 0 300px #f0f,
          inset -20px 0 300px #0ff, 0 0 50px #fff, -10px 0 80px #f0f,
          10px 0 80px #0ff;
        border-radius: 30px;
        cursor: pointer;
      }
      :host(:hover) #unknown-value {
        display: none;
      }
      :host(:hover) #options {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      :host(:hover) #options.hide {
        display: none;
      }
      #unknown-value,
      #value {
        font-size: 10em;
      }
      #value {
        cursor: not-allowed;
      }
      #options {
        display: none;
      }
      .hide {
        display: none;
      }
      ul {
        display: flex;
        flex-direction: column;
        padding: 0;
      }
      ul li {
        list-style: none;
        margin: 0 15px;
      }
      ul li button {
        position: relative;
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 60px;
        background: #171515;
        border-radius: 50%;
        font-size: 30px;
        color: #666;
        transition: 0.5s;
        text-decoration: none;
        margin: 5px;
      }
      ul li button:before {
        content: '';
        position: absolute;
        border-radius: 50%;
        background: #d30086;
        transition: 0.5s;
        transform: scale(0.9);
        z-index: -1;
      }
      ul li button:hover:before {
        transform: scale(1.2);
        box-shadow: 0 0 15px #d30086;
        filter: blur(3px);
      }
      ul li button:hover {
        color: #e266ad;
        box-shadow: 0 0 15px #d02b97;
        text-shadow: 0 0 15px #d30086;
      }
    `}static get properties(){return{isPlayed:Boolean,choice:String,choices:Array,winner:{type:String,reflect:!0}}}__onClick(e){this.isPlayed=!0,this.valueClass={hide:!this.isPlayed},this.choiceClass={hide:this.isPlayed},this.choice=e.target.value}constructor(){super(),this.isPlayed=!1,this.choice="👾",this.valueClass={hide:!this.isPlayed},this.choiceClass={hide:this.isPlayed},this.choices=["✊","🖐","✌️"]}updated(e){if(super.updated(e),e.has("isPlayed")&&this.isPlayed){const e=new CustomEvent("choice-selected",{detail:{choice:this.choice}});this.dispatchEvent(e)}}render(){return j`
      <div id="unknown-value" class="${se(this.choiceClass)}">❔</div>
      <div id="options" class="${se(this.choiceClass)}">
        <ul>
          ${this.choices.map((e=>j`<li>
              <button value="${e}" @click="${this.__onClick}">
                ${e}
              </button>
            </li>`))}
        </ul>
      </div>
      <div id="value" class="${se(this.valueClass)}">${this.choice}</div>
      <slot> Player </slot>
    `}}window.customElements.define("npc-card-rock-paper-scissors",class extends ne{static get styles(){return[super.styles,X`
        :host {
          background: #303f4a;
        }

        :host(:hover) {
          z-index: 2;
          box-shadow: none;
        }

        :host(:hover) #unknown-value {
          display: block;
        }
        :host(:hover) #unknown-value.hide {
          display: none;
        }
      `]}_play(){const e=Math.floor(Math.random()*(Math.floor(2)-Math.ceil(0)+1))+Math.ceil(0);this.__onClick({target:{value:this.choices[e]}})}firstUpdated(){this.addEventListener("npc-play",this._play)}render(){return j`
      <div id="unknown-value" class="${se(this.choiceClass)}">❔</div>
      <div id="value" class="${se(this.valueClass)}">${this.choice}</div>
      <slot></slot>
    `}}),window.customElements.define("card-rock-paper-scissors",ne),window.customElements.define("envm92-rock-paper-scissors",class extends Z{static get styles(){return X`
      :host {
        background-color: black;
        display: flex;
        color: white;
        font-family: sans-serif;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
      }

      #board {
        padding: 40px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }

      @media all and (max-width: 768px) {
        #board {
          flex-direction: column;
          align-items: center;
        }
      }
    `}static get properties(){return{namePlayer:{type:String,reflect:!0,attribute:"name-player",converter:e=>{let t=e;return t=t.toUpperCase(),t=t.substr(0,6),t}},playerChoice:String,npcChoice:String,winner:String,message:String}}constructor(){super(),this.message="Let's play Rock Paper Scissors!",this.namePlayer="",this.playerChoice="",this.npcChoice="",this.winner=""}__playerSelect(e){this.shadowRoot.getElementById("npc-card").dispatchEvent(new CustomEvent("npc-play")),this.playerChoice=e.detail.choice}__npcSelect(e){this.npcChoice=e.detail.choice}__whoWon(){this.npcChoice===this.playerChoice?this.message="TIE!":"✊"===this.npcChoice&&"✌️"===this.playerChoice||"🖐"===this.npcChoice&&"✊"===this.playerChoice||"✌️"===this.npcChoice&&"🖐"===this.playerChoice?(this.winner="npc",this.message="Winner NPC"):(this.winner="player",this.message=`Winner ${this.namePlayer}`)}updated(e){super.updated(e),e.has("npcChoice")&&e.has("playerChoice")&&""!==this.npcChoice&&this.__whoWon()}render(){return j`
      <div id="welcome-message">
        <h2>${this.message}</h2>
      </div>
      <div id="board">
        <card-rock-paper-scissors
          @choice-selected="${this.__playerSelect}"
          .winner="${""!==this.winner&&"player"===this.winner}"
        >
          ${this.namePlayer}
        </card-rock-paper-scissors>
        <npc-card-rock-paper-scissors
          id="npc-card"
          @choice-selected="${this.__npcSelect}"
          .winner="${""!==this.winner&&"npc"===this.winner}"
        >
          NPC
        </npc-card-rock-paper-scissors>
      </div>
    `}}),document.body.appendChild(function(){const e=document.createElement("envm92-rock-paper-scissors");return e.setAttribute("name-player","Erika"),e}())})();