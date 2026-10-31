import{o as at}from"./chunk-QVAFNZWO.js";import{a as re,b as z,c as K}from"./chunk-XEN5VKAV.js";import{a as At,b as ce,c as Tt,h as ue,i as Pt,j as _t,k as nt}from"./chunk-N7Q34F2P.js";import{a as Bt}from"./chunk-IUBYFIV6.js";import{a as Ce,b as st,d as Y}from"./chunk-V2FP4EEH.js";import{b as Ot,e as Rt,h as Mt}from"./chunk-G65H4ZTJ.js";var R={PAGE_ADDED:"copio:page-added",PAGE_REMOVED:"copio:page-removed",PAGES_CHANGED:"copio:pages-changed",SCAN_COMPLETE:"copio:scan-complete",EXPORT_PROGRESS:"copio:export-progress",EXPORT_COMPLETE:"copio:export-complete",OCR_COMPLETE:"copio:ocr-complete",SYNC_CONNECTED:"copio:sync-connected",ERROR:"copio:error"};function Nt(i,e,t={}){let o=new CustomEvent(e,{bubbles:!0,composed:!0,cancelable:!0,detail:t});return i&&typeof i.dispatchEvent=="function"&&i.dispatchEvent(o),o}function Lt(i,e){var t=Object.keys(i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(i);e&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable})),t.push.apply(t,o)}return t}function Z(i){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Lt(Object(t),!0).forEach(function(o){ho(i,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(t)):Lt(Object(t)).forEach(function(o){Object.defineProperty(i,o,Object.getOwnPropertyDescriptor(t,o))})}return i}function qe(i){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?qe=function(e){return typeof e}:qe=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},qe(i)}function ho(i,e,t){return e in i?Object.defineProperty(i,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):i[e]=t,i}function ee(){return ee=Object.assign||function(i){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(i[o]=t[o])}return i},ee.apply(this,arguments)}function uo(i,e){if(i==null)return{};var t={},o=Object.keys(i),r,n;for(n=0;n<o.length;n++)r=o[n],!(e.indexOf(r)>=0)&&(t[r]=i[r]);return t}function fo(i,e){if(i==null)return{};var t=uo(i,e),o,r;if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(i);for(r=0;r<n.length;r++)o=n[r],!(e.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(i,o)&&(t[o]=i[o])}return t}var go="1.15.6";function J(i){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(i)}var te=J(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Me=J(/Edge/i),zt=J(/firefox/i),Te=J(/safari/i)&&!J(/chrome/i)&&!J(/android/i),xt=J(/iP(ad|od|hone)/i),Gt=J(/chrome/i)&&J(/android/i),Wt={capture:!1,passive:!1};function E(i,e,t){i.addEventListener(e,t,!te&&Wt)}function x(i,e,t){i.removeEventListener(e,t,!te&&Wt)}function We(i,e){if(e){if(e[0]===">"&&(e=e.substring(1)),i)try{if(i.matches)return i.matches(e);if(i.msMatchesSelector)return i.msMatchesSelector(e);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(e)}catch{return!1}return!1}}function Yt(i){return i.host&&i!==document&&i.host.nodeType?i.host:i.parentNode}function W(i,e,t,o){if(i){t=t||document;do{if(e!=null&&(e[0]===">"?i.parentNode===t&&We(i,e):We(i,e))||o&&i===t)return i;if(i===t)break}while(i=Yt(i))}return null}var Ft=/\s+/g;function H(i,e,t){if(i&&e)if(i.classList)i.classList[t?"add":"remove"](e);else{var o=(" "+i.className+" ").replace(Ft," ").replace(" "+e+" "," ");i.className=(o+(t?" "+e:"")).replace(Ft," ")}}function g(i,e,t){var o=i&&i.style;if(o){if(t===void 0)return document.defaultView&&document.defaultView.getComputedStyle?t=document.defaultView.getComputedStyle(i,""):i.currentStyle&&(t=i.currentStyle),e===void 0?t:t[e];!(e in o)&&e.indexOf("webkit")===-1&&(e="-webkit-"+e),o[e]=t+(typeof t=="string"?"":"px")}}function ve(i,e){var t="";if(typeof i=="string")t=i;else do{var o=g(i,"transform");o&&o!=="none"&&(t=o+" "+t)}while(!e&&(i=i.parentNode));var r=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return r&&new r(t)}function Kt(i,e,t){if(i){var o=i.getElementsByTagName(e),r=0,n=o.length;if(t)for(;r<n;r++)t(o[r],r);return o}return[]}function V(){var i=document.scrollingElement;return i||document.documentElement}function O(i,e,t,o,r){if(!(!i.getBoundingClientRect&&i!==window)){var n,a,s,l,c,h,d;if(i!==window&&i.parentNode&&i!==V()?(n=i.getBoundingClientRect(),a=n.top,s=n.left,l=n.bottom,c=n.right,h=n.height,d=n.width):(a=0,s=0,l=window.innerHeight,c=window.innerWidth,h=window.innerHeight,d=window.innerWidth),(e||t)&&i!==window&&(r=r||i.parentNode,!te))do if(r&&r.getBoundingClientRect&&(g(r,"transform")!=="none"||t&&g(r,"position")!=="static")){var f=r.getBoundingClientRect();a-=f.top+parseInt(g(r,"border-top-width")),s-=f.left+parseInt(g(r,"border-left-width")),l=a+n.height,c=s+n.width;break}while(r=r.parentNode);if(o&&i!==window){var w=ve(r||i),u=w&&w.a,y=w&&w.d;w&&(a/=y,s/=u,d/=u,h/=y,l=a+h,c=s+d)}return{top:a,left:s,bottom:l,right:c,width:d,height:h}}}function $t(i,e,t){for(var o=se(i,!0),r=O(i)[e];o;){var n=O(o)[t],a=void 0;if(t==="top"||t==="left"?a=r>=n:a=r<=n,!a)return o;if(o===V())break;o=se(o,!1)}return!1}function ye(i,e,t,o){for(var r=0,n=0,a=i.children;n<a.length;){if(a[n].style.display!=="none"&&a[n]!==m.ghost&&(o||a[n]!==m.dragged)&&W(a[n],t.draggable,i,!1)){if(r===e)return a[n];r++}n++}return null}function Et(i,e){for(var t=i.lastElementChild;t&&(t===m.ghost||g(t,"display")==="none"||e&&!We(t,e));)t=t.previousElementSibling;return t||null}function X(i,e){var t=0;if(!i||!i.parentNode)return-1;for(;i=i.previousElementSibling;)i.nodeName.toUpperCase()!=="TEMPLATE"&&i!==m.clone&&(!e||We(i,e))&&t++;return t}function jt(i){var e=0,t=0,o=V();if(i)do{var r=ve(i),n=r.a,a=r.d;e+=i.scrollLeft*n,t+=i.scrollTop*a}while(i!==o&&(i=i.parentNode));return[e,t]}function mo(i,e){for(var t in i)if(i.hasOwnProperty(t)){for(var o in e)if(e.hasOwnProperty(o)&&e[o]===i[t][o])return Number(t)}return-1}function se(i,e){if(!i||!i.getBoundingClientRect)return V();var t=i,o=!1;do if(t.clientWidth<t.scrollWidth||t.clientHeight<t.scrollHeight){var r=g(t);if(t.clientWidth<t.scrollWidth&&(r.overflowX=="auto"||r.overflowX=="scroll")||t.clientHeight<t.scrollHeight&&(r.overflowY=="auto"||r.overflowY=="scroll")){if(!t.getBoundingClientRect||t===document.body)return V();if(o||e)return t;o=!0}}while(t=t.parentNode);return V()}function bo(i,e){if(i&&e)for(var t in e)e.hasOwnProperty(t)&&(i[t]=e[t]);return i}function lt(i,e){return Math.round(i.top)===Math.round(e.top)&&Math.round(i.left)===Math.round(e.left)&&Math.round(i.height)===Math.round(e.height)&&Math.round(i.width)===Math.round(e.width)}var Pe;function Vt(i,e){return function(){if(!Pe){var t=arguments,o=this;t.length===1?i.call(o,t[0]):i.apply(o,t),Pe=setTimeout(function(){Pe=void 0},e)}}}function vo(){clearTimeout(Pe),Pe=void 0}function Zt(i,e,t){i.scrollLeft+=e,i.scrollTop+=t}function Qt(i){var e=window.Polymer,t=window.jQuery||window.Zepto;return e&&e.dom?e.dom(i).cloneNode(!0):t?t(i).clone(!0)[0]:i.cloneNode(!0)}function Jt(i,e,t){var o={};return Array.from(i.children).forEach(function(r){var n,a,s,l;if(!(!W(r,e.draggable,i,!1)||r.animated||r===t)){var c=O(r);o.left=Math.min((n=o.left)!==null&&n!==void 0?n:1/0,c.left),o.top=Math.min((a=o.top)!==null&&a!==void 0?a:1/0,c.top),o.right=Math.max((s=o.right)!==null&&s!==void 0?s:-1/0,c.right),o.bottom=Math.max((l=o.bottom)!==null&&l!==void 0?l:-1/0,c.bottom)}}),o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}var j="Sortable"+new Date().getTime();function yo(){var i=[],e;return{captureAnimationState:function(){if(i=[],!!this.options.animation){var o=[].slice.call(this.el.children);o.forEach(function(r){if(!(g(r,"display")==="none"||r===m.ghost)){i.push({target:r,rect:O(r)});var n=Z({},i[i.length-1].rect);if(r.thisAnimationDuration){var a=ve(r,!0);a&&(n.top-=a.f,n.left-=a.e)}r.fromRect=n}})}},addAnimationState:function(o){i.push(o)},removeAnimationState:function(o){i.splice(mo(i,{target:o}),1)},animateAll:function(o){var r=this;if(!this.options.animation){clearTimeout(e),typeof o=="function"&&o();return}var n=!1,a=0;i.forEach(function(s){var l=0,c=s.target,h=c.fromRect,d=O(c),f=c.prevFromRect,w=c.prevToRect,u=s.rect,y=ve(c,!0);y&&(d.top-=y.f,d.left-=y.e),c.toRect=d,c.thisAnimationDuration&&lt(f,d)&&!lt(h,d)&&(u.top-d.top)/(u.left-d.left)===(h.top-d.top)/(h.left-d.left)&&(l=xo(u,f,w,r.options)),lt(d,h)||(c.prevFromRect=h,c.prevToRect=d,l||(l=r.options.animation),r.animate(c,u,d,l)),l&&(n=!0,a=Math.max(a,l),clearTimeout(c.animationResetTimer),c.animationResetTimer=setTimeout(function(){c.animationTime=0,c.prevFromRect=null,c.fromRect=null,c.prevToRect=null,c.thisAnimationDuration=null},l),c.thisAnimationDuration=l)}),clearTimeout(e),n?e=setTimeout(function(){typeof o=="function"&&o()},a):typeof o=="function"&&o(),i=[]},animate:function(o,r,n,a){if(a){g(o,"transition",""),g(o,"transform","");var s=ve(this.el),l=s&&s.a,c=s&&s.d,h=(r.left-n.left)/(l||1),d=(r.top-n.top)/(c||1);o.animatingX=!!h,o.animatingY=!!d,g(o,"transform","translate3d("+h+"px,"+d+"px,0)"),this.forRepaintDummy=wo(o),g(o,"transition","transform "+a+"ms"+(this.options.easing?" "+this.options.easing:"")),g(o,"transform","translate3d(0,0,0)"),typeof o.animated=="number"&&clearTimeout(o.animated),o.animated=setTimeout(function(){g(o,"transition",""),g(o,"transform",""),o.animated=!1,o.animatingX=!1,o.animatingY=!1},a)}}}}function wo(i){return i.offsetWidth}function xo(i,e,t,o){return Math.sqrt(Math.pow(e.top-i.top,2)+Math.pow(e.left-i.left,2))/Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))*o.animation}var fe=[],ct={initializeByDefault:!0},Be={mount:function(e){for(var t in ct)ct.hasOwnProperty(t)&&!(t in e)&&(e[t]=ct[t]);fe.forEach(function(o){if(o.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),fe.push(e)},pluginEvent:function(e,t,o){var r=this;this.eventCanceled=!1,o.cancel=function(){r.eventCanceled=!0};var n=e+"Global";fe.forEach(function(a){t[a.pluginName]&&(t[a.pluginName][n]&&t[a.pluginName][n](Z({sortable:t},o)),t.options[a.pluginName]&&t[a.pluginName][e]&&t[a.pluginName][e](Z({sortable:t},o)))})},initializePlugins:function(e,t,o,r){fe.forEach(function(s){var l=s.pluginName;if(!(!e.options[l]&&!s.initializeByDefault)){var c=new s(e,t,e.options);c.sortable=e,c.options=e.options,e[l]=c,ee(o,c.defaults)}});for(var n in e.options)if(e.options.hasOwnProperty(n)){var a=this.modifyOption(e,n,e.options[n]);typeof a<"u"&&(e.options[n]=a)}},getEventProperties:function(e,t){var o={};return fe.forEach(function(r){typeof r.eventProperties=="function"&&ee(o,r.eventProperties.call(t[r.pluginName],e))}),o},modifyOption:function(e,t,o){var r;return fe.forEach(function(n){e[n.pluginName]&&n.optionListeners&&typeof n.optionListeners[t]=="function"&&(r=n.optionListeners[t].call(e[n.pluginName],o))}),r}};function Eo(i){var e=i.sortable,t=i.rootEl,o=i.name,r=i.targetEl,n=i.cloneEl,a=i.toEl,s=i.fromEl,l=i.oldIndex,c=i.newIndex,h=i.oldDraggableIndex,d=i.newDraggableIndex,f=i.originalEvent,w=i.putSortable,u=i.extraEventProperties;if(e=e||t&&t[j],!!e){var y,k=e.options,I="on"+o.charAt(0).toUpperCase()+o.substr(1);window.CustomEvent&&!te&&!Me?y=new CustomEvent(o,{bubbles:!0,cancelable:!0}):(y=document.createEvent("Event"),y.initEvent(o,!0,!0)),y.to=a||t,y.from=s||t,y.item=r||t,y.clone=n,y.oldIndex=l,y.newIndex=c,y.oldDraggableIndex=h,y.newDraggableIndex=d,y.originalEvent=f,y.pullMode=w?w.lastPutMode:void 0;var S=Z(Z({},u),Be.getEventProperties(o,e));for(var C in S)y[C]=S[C];t&&t.dispatchEvent(y),k[I]&&k[I].call(e,y)}}var So=["evt"],$=function(e,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=o.evt,n=fo(o,So);Be.pluginEvent.bind(m)(e,t,Z({dragEl:p,parentEl:T,ghostEl:v,rootEl:D,nextEl:he,lastDownEl:He,cloneEl:A,cloneHidden:ae,dragStarted:De,putSortable:M,activeSortable:m.active,originalEvent:r,oldIndex:be,oldDraggableIndex:_e,newIndex:U,newDraggableIndex:ne,hideGhostForTarget:io,unhideGhostForTarget:ro,cloneNowHidden:function(){ae=!0},cloneNowShown:function(){ae=!1},dispatchSortableEvent:function(s){F({sortable:t,name:s,originalEvent:r})}},n))};function F(i){Eo(Z({putSortable:M,cloneEl:A,targetEl:p,rootEl:D,oldIndex:be,oldDraggableIndex:_e,newIndex:U,newDraggableIndex:ne},i))}var p,T,v,D,he,He,A,ae,be,U,_e,ne,ze,M,me=!1,Ye=!1,Ke=[],de,G,dt,pt,qt,Ht,De,ge,Oe,Re=!1,Fe=!1,Ue,L,ht=[],bt=!1,Ve=[],Qe=typeof document<"u",$e=xt,Ut=Me||te?"cssFloat":"float",ko=Qe&&!Gt&&!xt&&"draggable"in document.createElement("div"),eo=(function(){if(Qe){if(te)return!1;var i=document.createElement("x");return i.style.cssText="pointer-events:auto",i.style.pointerEvents==="auto"}})(),to=function(e,t){var o=g(e),r=parseInt(o.width)-parseInt(o.paddingLeft)-parseInt(o.paddingRight)-parseInt(o.borderLeftWidth)-parseInt(o.borderRightWidth),n=ye(e,0,t),a=ye(e,1,t),s=n&&g(n),l=a&&g(a),c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+O(n).width,h=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+O(a).width;if(o.display==="flex")return o.flexDirection==="column"||o.flexDirection==="column-reverse"?"vertical":"horizontal";if(o.display==="grid")return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(n&&s.float&&s.float!=="none"){var d=s.float==="left"?"left":"right";return a&&(l.clear==="both"||l.clear===d)?"vertical":"horizontal"}return n&&(s.display==="block"||s.display==="flex"||s.display==="table"||s.display==="grid"||c>=r&&o[Ut]==="none"||a&&o[Ut]==="none"&&c+h>r)?"vertical":"horizontal"},Co=function(e,t,o){var r=o?e.left:e.top,n=o?e.right:e.bottom,a=o?e.width:e.height,s=o?t.left:t.top,l=o?t.right:t.bottom,c=o?t.width:t.height;return r===s||n===l||r+a/2===s+c/2},Do=function(e,t){var o;return Ke.some(function(r){var n=r[j].options.emptyInsertThreshold;if(!(!n||Et(r))){var a=O(r),s=e>=a.left-n&&e<=a.right+n,l=t>=a.top-n&&t<=a.bottom+n;if(s&&l)return o=r}}),o},oo=function(e){function t(n,a){return function(s,l,c,h){var d=s.options.group.name&&l.options.group.name&&s.options.group.name===l.options.group.name;if(n==null&&(a||d))return!0;if(n==null||n===!1)return!1;if(a&&n==="clone")return n;if(typeof n=="function")return t(n(s,l,c,h),a)(s,l,c,h);var f=(a?s:l).options.group.name;return n===!0||typeof n=="string"&&n===f||n.join&&n.indexOf(f)>-1}}var o={},r=e.group;(!r||qe(r)!="object")&&(r={name:r}),o.name=r.name,o.checkPull=t(r.pull,!0),o.checkPut=t(r.put),o.revertClone=r.revertClone,e.group=o},io=function(){!eo&&v&&g(v,"display","none")},ro=function(){!eo&&v&&g(v,"display","")};Qe&&!Gt&&document.addEventListener("click",function(i){if(Ye)return i.preventDefault(),i.stopPropagation&&i.stopPropagation(),i.stopImmediatePropagation&&i.stopImmediatePropagation(),Ye=!1,!1},!0);var pe=function(e){if(p){e=e.touches?e.touches[0]:e;var t=Do(e.clientX,e.clientY);if(t){var o={};for(var r in e)e.hasOwnProperty(r)&&(o[r]=e[r]);o.target=o.rootEl=t,o.preventDefault=void 0,o.stopPropagation=void 0,t[j]._onDragOver(o)}}},Io=function(e){p&&p.parentNode[j]._isOutsideThisEl(e.target)};function m(i,e){if(!(i&&i.nodeType&&i.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(i));this.el=i,this.options=e=ee({},e),i[j]=this;var t={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(i.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return to(i,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(a,s){a.setData("Text",s.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:m.supportPointer!==!1&&"PointerEvent"in window&&(!Te||xt),emptyInsertThreshold:5};Be.initializePlugins(this,i,t);for(var o in t)!(o in e)&&(e[o]=t[o]);oo(e);for(var r in this)r.charAt(0)==="_"&&typeof this[r]=="function"&&(this[r]=this[r].bind(this));this.nativeDraggable=e.forceFallback?!1:ko,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?E(i,"pointerdown",this._onTapStart):(E(i,"mousedown",this._onTapStart),E(i,"touchstart",this._onTapStart)),this.nativeDraggable&&(E(i,"dragover",this),E(i,"dragenter",this)),Ke.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),ee(this,yo())}m.prototype={constructor:m,_isOutsideThisEl:function(e){!this.el.contains(e)&&e!==this.el&&(ge=null)},_getDirection:function(e,t){return typeof this.options.direction=="function"?this.options.direction.call(this,e,t,p):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,o=this.el,r=this.options,n=r.preventOnFilter,a=e.type,s=e.touches&&e.touches[0]||e.pointerType&&e.pointerType==="touch"&&e,l=(s||e).target,c=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||l,h=r.filter;if(Bo(o),!p&&!(/mousedown|pointerdown/.test(a)&&e.button!==0||r.disabled)&&!c.isContentEditable&&!(!this.nativeDraggable&&Te&&l&&l.tagName.toUpperCase()==="SELECT")&&(l=W(l,r.draggable,o,!1),!(l&&l.animated)&&He!==l)){if(be=X(l),_e=X(l,r.draggable),typeof h=="function"){if(h.call(this,e,l,this)){F({sortable:t,rootEl:c,name:"filter",targetEl:l,toEl:o,fromEl:o}),$("filter",t,{evt:e}),n&&e.preventDefault();return}}else if(h&&(h=h.split(",").some(function(d){if(d=W(c,d.trim(),o,!1),d)return F({sortable:t,rootEl:d,name:"filter",targetEl:l,fromEl:o,toEl:o}),$("filter",t,{evt:e}),!0}),h)){n&&e.preventDefault();return}r.handle&&!W(c,r.handle,o,!1)||this._prepareDragStart(e,s,l)}}},_prepareDragStart:function(e,t,o){var r=this,n=r.el,a=r.options,s=n.ownerDocument,l;if(o&&!p&&o.parentNode===n){var c=O(o);if(D=n,p=o,T=p.parentNode,he=p.nextSibling,He=o,ze=a.group,m.dragged=p,de={target:p,clientX:(t||e).clientX,clientY:(t||e).clientY},qt=de.clientX-c.left,Ht=de.clientY-c.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,p.style["will-change"]="all",l=function(){if($("delayEnded",r,{evt:e}),m.eventCanceled){r._onDrop();return}r._disableDelayedDragEvents(),!zt&&r.nativeDraggable&&(p.draggable=!0),r._triggerDragStart(e,t),F({sortable:r,name:"choose",originalEvent:e}),H(p,a.chosenClass,!0)},a.ignore.split(",").forEach(function(h){Kt(p,h.trim(),ut)}),E(s,"dragover",pe),E(s,"mousemove",pe),E(s,"touchmove",pe),a.supportPointer?(E(s,"pointerup",r._onDrop),!this.nativeDraggable&&E(s,"pointercancel",r._onDrop)):(E(s,"mouseup",r._onDrop),E(s,"touchend",r._onDrop),E(s,"touchcancel",r._onDrop)),zt&&this.nativeDraggable&&(this.options.touchStartThreshold=4,p.draggable=!0),$("delayStart",this,{evt:e}),a.delay&&(!a.delayOnTouchOnly||t)&&(!this.nativeDraggable||!(Me||te))){if(m.eventCanceled){this._onDrop();return}a.supportPointer?(E(s,"pointerup",r._disableDelayedDrag),E(s,"pointercancel",r._disableDelayedDrag)):(E(s,"mouseup",r._disableDelayedDrag),E(s,"touchend",r._disableDelayedDrag),E(s,"touchcancel",r._disableDelayedDrag)),E(s,"mousemove",r._delayedDragTouchMoveHandler),E(s,"touchmove",r._delayedDragTouchMoveHandler),a.supportPointer&&E(s,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=setTimeout(l,a.delay)}else l()}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){p&&ut(p),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;x(e,"mouseup",this._disableDelayedDrag),x(e,"touchend",this._disableDelayedDrag),x(e,"touchcancel",this._disableDelayedDrag),x(e,"pointerup",this._disableDelayedDrag),x(e,"pointercancel",this._disableDelayedDrag),x(e,"mousemove",this._delayedDragTouchMoveHandler),x(e,"touchmove",this._delayedDragTouchMoveHandler),x(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||e.pointerType=="touch"&&e,!this.nativeDraggable||t?this.options.supportPointer?E(document,"pointermove",this._onTouchMove):t?E(document,"touchmove",this._onTouchMove):E(document,"mousemove",this._onTouchMove):(E(p,"dragend",this),E(D,"dragstart",this._onDragStart));try{document.selection?Xe(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(me=!1,D&&p){$("dragStarted",this,{evt:t}),this.nativeDraggable&&E(document,"dragover",Io);var o=this.options;!e&&H(p,o.dragClass,!1),H(p,o.ghostClass,!0),m.active=this,e&&this._appendGhost(),F({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(G){this._lastX=G.clientX,this._lastY=G.clientY,io();for(var e=document.elementFromPoint(G.clientX,G.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(G.clientX,G.clientY),e!==t);)t=e;if(p.parentNode[j]._isOutsideThisEl(e),t)do{if(t[j]){var o=void 0;if(o=t[j]._onDragOver({clientX:G.clientX,clientY:G.clientY,target:e,rootEl:t}),o&&!this.options.dragoverBubble)break}e=t}while(t=Yt(t));ro()}},_onTouchMove:function(e){if(de){var t=this.options,o=t.fallbackTolerance,r=t.fallbackOffset,n=e.touches?e.touches[0]:e,a=v&&ve(v,!0),s=v&&a&&a.a,l=v&&a&&a.d,c=$e&&L&&jt(L),h=(n.clientX-de.clientX+r.x)/(s||1)+(c?c[0]-ht[0]:0)/(s||1),d=(n.clientY-de.clientY+r.y)/(l||1)+(c?c[1]-ht[1]:0)/(l||1);if(!m.active&&!me){if(o&&Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))<o)return;this._onDragStart(e,!0)}if(v){a?(a.e+=h-(dt||0),a.f+=d-(pt||0)):a={a:1,b:0,c:0,d:1,e:h,f:d};var f="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");g(v,"webkitTransform",f),g(v,"mozTransform",f),g(v,"msTransform",f),g(v,"transform",f),dt=h,pt=d,G=n}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!v){var e=this.options.fallbackOnBody?document.body:D,t=O(p,!0,$e,!0,e),o=this.options;if($e){for(L=e;g(L,"position")==="static"&&g(L,"transform")==="none"&&L!==document;)L=L.parentNode;L!==document.body&&L!==document.documentElement?(L===document&&(L=V()),t.top+=L.scrollTop,t.left+=L.scrollLeft):L=V(),ht=jt(L)}v=p.cloneNode(!0),H(v,o.ghostClass,!1),H(v,o.fallbackClass,!0),H(v,o.dragClass,!0),g(v,"transition",""),g(v,"transform",""),g(v,"box-sizing","border-box"),g(v,"margin",0),g(v,"top",t.top),g(v,"left",t.left),g(v,"width",t.width),g(v,"height",t.height),g(v,"opacity","0.8"),g(v,"position",$e?"absolute":"fixed"),g(v,"zIndex","100000"),g(v,"pointerEvents","none"),m.ghost=v,e.appendChild(v),g(v,"transform-origin",qt/parseInt(v.style.width)*100+"% "+Ht/parseInt(v.style.height)*100+"%")}},_onDragStart:function(e,t){var o=this,r=e.dataTransfer,n=o.options;if($("dragStart",this,{evt:e}),m.eventCanceled){this._onDrop();return}$("setupClone",this),m.eventCanceled||(A=Qt(p),A.removeAttribute("id"),A.draggable=!1,A.style["will-change"]="",this._hideClone(),H(A,this.options.chosenClass,!1),m.clone=A),o.cloneId=Xe(function(){$("clone",o),!m.eventCanceled&&(o.options.removeCloneOnHide||D.insertBefore(A,p),o._hideClone(),F({sortable:o,name:"clone"}))}),!t&&H(p,n.dragClass,!0),t?(Ye=!0,o._loopId=setInterval(o._emulateDragOver,50)):(x(document,"mouseup",o._onDrop),x(document,"touchend",o._onDrop),x(document,"touchcancel",o._onDrop),r&&(r.effectAllowed="move",n.setData&&n.setData.call(o,r,p)),E(document,"drop",o),g(p,"transform","translateZ(0)")),me=!0,o._dragStartId=Xe(o._dragStarted.bind(o,t,e)),E(document,"selectstart",o),De=!0,window.getSelection().removeAllRanges(),Te&&g(document.body,"user-select","none")},_onDragOver:function(e){var t=this.el,o=e.target,r,n,a,s=this.options,l=s.group,c=m.active,h=ze===l,d=s.sort,f=M||c,w,u=this,y=!1;if(bt)return;function k(ke,co){$(ke,u,Z({evt:e,isOwner:h,axis:w?"vertical":"horizontal",revert:a,dragRect:r,targetRect:n,canSort:d,fromSortable:f,target:o,completed:S,onMove:function(It,po){return je(D,t,p,r,It,O(It),e,po)},changed:C},co))}function I(){k("dragOverAnimationCapture"),u.captureAnimationState(),u!==f&&f.captureAnimationState()}function S(ke){return k("dragOverCompleted",{insertion:ke}),ke&&(h?c._hideClone():c._showClone(u),u!==f&&(H(p,M?M.options.ghostClass:c.options.ghostClass,!1),H(p,s.ghostClass,!0)),M!==u&&u!==m.active?M=u:u===m.active&&M&&(M=null),f===u&&(u._ignoreWhileAnimating=o),u.animateAll(function(){k("dragOverAnimationComplete"),u._ignoreWhileAnimating=null}),u!==f&&(f.animateAll(),f._ignoreWhileAnimating=null)),(o===p&&!p.animated||o===t&&!o.animated)&&(ge=null),!s.dragoverBubble&&!e.rootEl&&o!==document&&(p.parentNode[j]._isOutsideThisEl(e.target),!ke&&pe(e)),!s.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),y=!0}function C(){U=X(p),ne=X(p,s.draggable),F({sortable:u,name:"change",toEl:t,newIndex:U,newDraggableIndex:ne,originalEvent:e})}if(e.preventDefault!==void 0&&e.cancelable&&e.preventDefault(),o=W(o,s.draggable,t,!0),k("dragOver"),m.eventCanceled)return y;if(p.contains(e.target)||o.animated&&o.animatingX&&o.animatingY||u._ignoreWhileAnimating===o)return S(!1);if(Ye=!1,c&&!s.disabled&&(h?d||(a=T!==D):M===this||(this.lastPutMode=ze.checkPull(this,c,p,e))&&l.checkPut(this,c,p,e))){if(w=this._getDirection(e,o)==="vertical",r=O(p),k("dragOverValid"),m.eventCanceled)return y;if(a)return T=D,I(),this._hideClone(),k("revert"),m.eventCanceled||(he?D.insertBefore(p,he):D.appendChild(p)),S(!0);var b=Et(t,s.draggable);if(!b||_o(e,w,this)&&!b.animated){if(b===p)return S(!1);if(b&&t===e.target&&(o=b),o&&(n=O(o)),je(D,t,p,r,o,n,e,!!o)!==!1)return I(),b&&b.nextSibling?t.insertBefore(p,b.nextSibling):t.appendChild(p),T=t,C(),S(!0)}else if(b&&Po(e,w,this)){var P=ye(t,0,s,!0);if(P===p)return S(!1);if(o=P,n=O(o),je(D,t,p,r,o,n,e,!1)!==!1)return I(),t.insertBefore(p,P),T=t,C(),S(!0)}else if(o.parentNode===t){n=O(o);var B=0,N,we=p.parentNode!==t,q=!Co(p.animated&&p.toRect||r,o.animated&&o.toRect||n,w),xe=w?"top":"left",oe=$t(o,"top","top")||$t(p,"top","top"),Ee=oe?oe.scrollTop:void 0;ge!==o&&(N=n[xe],Re=!1,Fe=!q&&s.invertSwap||we),B=Oo(e,o,n,w,q?1:s.swapThreshold,s.invertedSwapThreshold==null?s.swapThreshold:s.invertedSwapThreshold,Fe,ge===o);var Q;if(B!==0){var le=X(p);do le-=B,Q=T.children[le];while(Q&&(g(Q,"display")==="none"||Q===v))}if(B===0||Q===o)return S(!1);ge=o,Oe=B;var Se=o.nextElementSibling,ie=!1;ie=B===1;var Le=je(D,t,p,r,o,n,e,ie);if(Le!==!1)return(Le===1||Le===-1)&&(ie=Le===1),bt=!0,setTimeout(To,30),I(),ie&&!Se?t.appendChild(p):o.parentNode.insertBefore(p,ie?Se:o),oe&&Zt(oe,0,Ee-oe.scrollTop),T=p.parentNode,N!==void 0&&!Fe&&(Ue=Math.abs(N-O(o)[xe])),C(),S(!0)}if(t.contains(p))return S(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){x(document,"mousemove",this._onTouchMove),x(document,"touchmove",this._onTouchMove),x(document,"pointermove",this._onTouchMove),x(document,"dragover",pe),x(document,"mousemove",pe),x(document,"touchmove",pe)},_offUpEvents:function(){var e=this.el.ownerDocument;x(e,"mouseup",this._onDrop),x(e,"touchend",this._onDrop),x(e,"pointerup",this._onDrop),x(e,"pointercancel",this._onDrop),x(e,"touchcancel",this._onDrop),x(document,"selectstart",this)},_onDrop:function(e){var t=this.el,o=this.options;if(U=X(p),ne=X(p,o.draggable),$("drop",this,{evt:e}),T=p&&p.parentNode,U=X(p),ne=X(p,o.draggable),m.eventCanceled){this._nulling();return}me=!1,Fe=!1,Re=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),vt(this.cloneId),vt(this._dragStartId),this.nativeDraggable&&(x(document,"drop",this),x(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Te&&g(document.body,"user-select",""),g(p,"transform",""),e&&(De&&(e.cancelable&&e.preventDefault(),!o.dropBubble&&e.stopPropagation()),v&&v.parentNode&&v.parentNode.removeChild(v),(D===T||M&&M.lastPutMode!=="clone")&&A&&A.parentNode&&A.parentNode.removeChild(A),p&&(this.nativeDraggable&&x(p,"dragend",this),ut(p),p.style["will-change"]="",De&&!me&&H(p,M?M.options.ghostClass:this.options.ghostClass,!1),H(p,this.options.chosenClass,!1),F({sortable:this,name:"unchoose",toEl:T,newIndex:null,newDraggableIndex:null,originalEvent:e}),D!==T?(U>=0&&(F({rootEl:T,name:"add",toEl:T,fromEl:D,originalEvent:e}),F({sortable:this,name:"remove",toEl:T,originalEvent:e}),F({rootEl:T,name:"sort",toEl:T,fromEl:D,originalEvent:e}),F({sortable:this,name:"sort",toEl:T,originalEvent:e})),M&&M.save()):U!==be&&U>=0&&(F({sortable:this,name:"update",toEl:T,originalEvent:e}),F({sortable:this,name:"sort",toEl:T,originalEvent:e})),m.active&&((U==null||U===-1)&&(U=be,ne=_e),F({sortable:this,name:"end",toEl:T,originalEvent:e}),this.save()))),this._nulling()},_nulling:function(){$("nulling",this),D=p=T=v=he=A=He=ae=de=G=De=U=ne=be=_e=ge=Oe=M=ze=m.dragged=m.ghost=m.clone=m.active=null,Ve.forEach(function(e){e.checked=!0}),Ve.length=dt=pt=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":p&&(this._onDragOver(e),Ao(e));break;case"selectstart":e.preventDefault();break}},toArray:function(){for(var e=[],t,o=this.el.children,r=0,n=o.length,a=this.options;r<n;r++)t=o[r],W(t,a.draggable,this.el,!1)&&e.push(t.getAttribute(a.dataIdAttr)||Mo(t));return e},sort:function(e,t){var o={},r=this.el;this.toArray().forEach(function(n,a){var s=r.children[a];W(s,this.options.draggable,r,!1)&&(o[n]=s)},this),t&&this.captureAnimationState(),e.forEach(function(n){o[n]&&(r.removeChild(o[n]),r.appendChild(o[n]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return W(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var o=this.options;if(t===void 0)return o[e];var r=Be.modifyOption(this,e,t);typeof r<"u"?o[e]=r:o[e]=t,e==="group"&&oo(o)},destroy:function(){$("destroy",this);var e=this.el;e[j]=null,x(e,"mousedown",this._onTapStart),x(e,"touchstart",this._onTapStart),x(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(x(e,"dragover",this),x(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Ke.splice(Ke.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!ae){if($("hideClone",this),m.eventCanceled)return;g(A,"display","none"),this.options.removeCloneOnHide&&A.parentNode&&A.parentNode.removeChild(A),ae=!0}},_showClone:function(e){if(e.lastPutMode!=="clone"){this._hideClone();return}if(ae){if($("showClone",this),m.eventCanceled)return;p.parentNode==D&&!this.options.group.revertClone?D.insertBefore(A,p):he?D.insertBefore(A,he):D.appendChild(A),this.options.group.revertClone&&this.animate(p,A),g(A,"display",""),ae=!1}}};function Ao(i){i.dataTransfer&&(i.dataTransfer.dropEffect="move"),i.cancelable&&i.preventDefault()}function je(i,e,t,o,r,n,a,s){var l,c=i[j],h=c.options.onMove,d;return window.CustomEvent&&!te&&!Me?l=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(l=document.createEvent("Event"),l.initEvent("move",!0,!0)),l.to=e,l.from=i,l.dragged=t,l.draggedRect=o,l.related=r||e,l.relatedRect=n||O(e),l.willInsertAfter=s,l.originalEvent=a,i.dispatchEvent(l),h&&(d=h.call(c,l,a)),d}function ut(i){i.draggable=!1}function To(){bt=!1}function Po(i,e,t){var o=O(ye(t.el,0,t.options,!0)),r=Jt(t.el,t.options,v),n=10;return e?i.clientX<r.left-n||i.clientY<o.top&&i.clientX<o.right:i.clientY<r.top-n||i.clientY<o.bottom&&i.clientX<o.left}function _o(i,e,t){var o=O(Et(t.el,t.options.draggable)),r=Jt(t.el,t.options,v),n=10;return e?i.clientX>r.right+n||i.clientY>o.bottom&&i.clientX>o.left:i.clientY>r.bottom+n||i.clientX>o.right&&i.clientY>o.top}function Oo(i,e,t,o,r,n,a,s){var l=o?i.clientY:i.clientX,c=o?t.height:t.width,h=o?t.top:t.left,d=o?t.bottom:t.right,f=!1;if(!a){if(s&&Ue<c*r){if(!Re&&(Oe===1?l>h+c*n/2:l<d-c*n/2)&&(Re=!0),Re)f=!0;else if(Oe===1?l<h+Ue:l>d-Ue)return-Oe}else if(l>h+c*(1-r)/2&&l<d-c*(1-r)/2)return Ro(e)}return f=f||a,f&&(l<h+c*n/2||l>d-c*n/2)?l>h+c/2?1:-1:0}function Ro(i){return X(p)<X(i)?1:-1}function Mo(i){for(var e=i.tagName+i.className+i.src+i.href+i.textContent,t=e.length,o=0;t--;)o+=e.charCodeAt(t);return o.toString(36)}function Bo(i){Ve.length=0;for(var e=i.getElementsByTagName("input"),t=e.length;t--;){var o=e[t];o.checked&&Ve.push(o)}}function Xe(i){return setTimeout(i,0)}function vt(i){return clearTimeout(i)}Qe&&E(document,"touchmove",function(i){(m.active||me)&&i.cancelable&&i.preventDefault()});m.utils={on:E,off:x,css:g,find:Kt,is:function(e,t){return!!W(e,t,e,!1)},extend:bo,throttle:Vt,closest:W,toggleClass:H,clone:Qt,index:X,nextTick:Xe,cancelNextTick:vt,detectDirection:to,getChild:ye,expando:j};m.get=function(i){return i[j]};m.mount=function(){for(var i=arguments.length,e=new Array(i),t=0;t<i;t++)e[t]=arguments[t];e[0].constructor===Array&&(e=e[0]),e.forEach(function(o){if(!o.prototype||!o.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));o.utils&&(m.utils=Z(Z({},m.utils),o.utils)),Be.mount(o)})};m.create=function(i,e){return new m(i,e)};m.version=go;var _=[],Ie,yt,wt=!1,ft,gt,Ze,Ae;function No(){function i(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var e in this)e.charAt(0)==="_"&&typeof this[e]=="function"&&(this[e]=this[e].bind(this))}return i.prototype={dragStarted:function(t){var o=t.originalEvent;this.sortable.nativeDraggable?E(document,"dragover",this._handleAutoScroll):this.options.supportPointer?E(document,"pointermove",this._handleFallbackAutoScroll):o.touches?E(document,"touchmove",this._handleFallbackAutoScroll):E(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var o=t.originalEvent;!this.options.dragOverBubble&&!o.rootEl&&this._handleAutoScroll(o)},drop:function(){this.sortable.nativeDraggable?x(document,"dragover",this._handleAutoScroll):(x(document,"pointermove",this._handleFallbackAutoScroll),x(document,"touchmove",this._handleFallbackAutoScroll),x(document,"mousemove",this._handleFallbackAutoScroll)),Xt(),Ge(),vo()},nulling:function(){Ze=yt=Ie=wt=Ae=ft=gt=null,_.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,o){var r=this,n=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,s=document.elementFromPoint(n,a);if(Ze=t,o||this.options.forceAutoScrollFallback||Me||te||Te){mt(t,this.options,s,o);var l=se(s,!0);wt&&(!Ae||n!==ft||a!==gt)&&(Ae&&Xt(),Ae=setInterval(function(){var c=se(document.elementFromPoint(n,a),!0);c!==l&&(l=c,Ge()),mt(t,r.options,c,o)},10),ft=n,gt=a)}else{if(!this.options.bubbleScroll||se(s,!0)===V()){Ge();return}mt(t,this.options,se(s,!1),!1)}}},ee(i,{pluginName:"scroll",initializeByDefault:!0})}function Ge(){_.forEach(function(i){clearInterval(i.pid)}),_=[]}function Xt(){clearInterval(Ae)}var mt=Vt(function(i,e,t,o){if(e.scroll){var r=(i.touches?i.touches[0]:i).clientX,n=(i.touches?i.touches[0]:i).clientY,a=e.scrollSensitivity,s=e.scrollSpeed,l=V(),c=!1,h;yt!==t&&(yt=t,Ge(),Ie=e.scroll,h=e.scrollFn,Ie===!0&&(Ie=se(t,!0)));var d=0,f=Ie;do{var w=f,u=O(w),y=u.top,k=u.bottom,I=u.left,S=u.right,C=u.width,b=u.height,P=void 0,B=void 0,N=w.scrollWidth,we=w.scrollHeight,q=g(w),xe=w.scrollLeft,oe=w.scrollTop;w===l?(P=C<N&&(q.overflowX==="auto"||q.overflowX==="scroll"||q.overflowX==="visible"),B=b<we&&(q.overflowY==="auto"||q.overflowY==="scroll"||q.overflowY==="visible")):(P=C<N&&(q.overflowX==="auto"||q.overflowX==="scroll"),B=b<we&&(q.overflowY==="auto"||q.overflowY==="scroll"));var Ee=P&&(Math.abs(S-r)<=a&&xe+C<N)-(Math.abs(I-r)<=a&&!!xe),Q=B&&(Math.abs(k-n)<=a&&oe+b<we)-(Math.abs(y-n)<=a&&!!oe);if(!_[d])for(var le=0;le<=d;le++)_[le]||(_[le]={});(_[d].vx!=Ee||_[d].vy!=Q||_[d].el!==w)&&(_[d].el=w,_[d].vx=Ee,_[d].vy=Q,clearInterval(_[d].pid),(Ee!=0||Q!=0)&&(c=!0,_[d].pid=setInterval(function(){o&&this.layer===0&&m.active._onTouchMove(Ze);var Se=_[this.layer].vy?_[this.layer].vy*s:0,ie=_[this.layer].vx?_[this.layer].vx*s:0;typeof h=="function"&&h.call(m.dragged.parentNode[j],ie,Se,i,Ze,_[this.layer].el)!=="continue"||Zt(_[this.layer].el,ie,Se)}.bind({layer:d}),24))),d++}while(e.bubbleScroll&&f!==l&&(f=se(f,!1)));wt=c}},30),no=function(e){var t=e.originalEvent,o=e.putSortable,r=e.dragEl,n=e.activeSortable,a=e.dispatchSortableEvent,s=e.hideGhostForTarget,l=e.unhideGhostForTarget;if(t){var c=o||n;s();var h=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(h.clientX,h.clientY);l(),c&&!c.el.contains(d)&&(a("spill"),this.onSpill({dragEl:r,putSortable:o}))}};function St(){}St.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,o=e.putSortable;this.sortable.captureAnimationState(),o&&o.captureAnimationState();var r=ye(this.sortable.el,this.startIndex,this.options);r?this.sortable.el.insertBefore(t,r):this.sortable.el.appendChild(t),this.sortable.animateAll(),o&&o.animateAll()},drop:no};ee(St,{pluginName:"revertOnSpill"});function kt(){}kt.prototype={onSpill:function(e){var t=e.dragEl,o=e.putSortable,r=o||this.sortable;r.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),r.animateAll()},drop:no};ee(kt,{pluginName:"removeOnSpill"});m.mount(new No);m.mount(kt,St);var ao=m;var Je=class extends HTMLElement{#e=[];#t=null;#l=null;#p=null;#i=null;#o=!1;#s=null;#r=new Set;#a=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#o||(this.#c(),this.#o=!0),this.#d()}disconnectedCallback(){if(this.#l){try{this.#l.destroy()}catch(o){console.warn("Error destroying Sortable:",o)}this.#l=null}if(this.#t){try{this.#t.destroy()}catch(o){console.warn("Error destroying Cropper:",o)}this.#t=null}this.#p=null,this.#i=null,this.stopCamera(),this.#g(),this.#s&&(this.#s.abort(),this.#s=null);let e=this.shadowRoot.querySelector(".file-input"),t=this.shadowRoot.querySelector(".camera-input");e&&(e.onchange=null),t&&(t.onchange=null),this.#o=!1}setCameraStream(e){this.stopCamera(),this.#a=e||null}stopCamera(){if(this.#a){try{(typeof this.#a.getTracks=="function"?this.#a.getTracks():[]).forEach(t=>{typeof t.stop=="function"&&t.stop()})}catch(e){console.warn("Error stopping camera tracks:",e)}this.#a=null}}#f(e){return e&&typeof e=="string"&&e.startsWith("blob:")&&this.#r.add(e),e}#u(e){if(this.#r.has(e)){try{URL.revokeObjectURL(e)}catch{}this.#r.delete(e)}}#g(){for(let e of this.#r)try{URL.revokeObjectURL(e)}catch{}this.#r.clear()}#c(){let e=`
      <link rel="stylesheet" href="css/cropper.css">
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          max-width: 100%;
          min-height: 140px;
          padding: 0.5rem;
          border-radius: 8px;
          border: 2px dashed transparent;
          box-sizing: border-box;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .container.drag-over {
          border-color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.08);
          box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.2);
        }
        @media (min-width: 640px) {
          .container {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .container {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .image-wrapper {
          cursor: grab;
          position: relative;
          user-select: none;
          -webkit-user-select: none;
          width: 100%;
          aspect-ratio: 1;
        }
        .image-wrapper:active {
          cursor: grabbing;
        }
        .image-wrapper.dragging {
          opacity: 0.4;
          cursor: grabbing;
        }
        .image-wrapper.sortable-ghost {
          opacity: 0.2;
        }
        .image-menu {
          position: absolute;
          top: 4px;
          right: 4px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 1px solid #ccc;
          border-radius: 4px;
          display: block;
        }
        #crop-image {
          max-width: 100%;
          max-height: 60vh;
        }
        .markdown-card {
          width: 100%;
          height: 100%;
          border: 1px solid #334155;
          border-radius: 4px;
          background: #0f172a;
          color: #f8fafc;
          padding: 10px;
          box-sizing: border-box;
          font-family: monospace;
          font-size: 0.72rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .markdown-card-header {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: bold;
          font-size: 0.75rem;
          color: #38bdf8;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .markdown-card-body {
          flex: 1;
          opacity: 0.8;
          word-break: break-word;
          overflow: hidden;
          line-height: 1.35;
        }
        button.add-btn {
          width: 100%;
          aspect-ratio: 1;
          font-size: 1.6rem;
          border: 2px dashed #888;
          border-radius: 4px;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: border-color 0.15s, color 0.15s, background-color 0.15s;
        }
        button.add-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.04);
        }
        dialog {
          border: none;
          border-radius: 6px;
          padding: 1rem;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.3);
        }
      </style>
    `;this.shadowRoot.innerHTML=`
      ${e}
      <div class="container"></div>

      <input type="file" class="file-input" accept="image/*,application/pdf,.md,.markdown,text/plain" multiple style="display: none">
      <input type="file" class="camera-input" accept="image/*" capture="environment" style="display: none">

      <sl-dialog label="Edit Markdown Text" class="text-dialog" style="--width: 80vw">
        <div style="margin-bottom: 1rem;">
          <sl-textarea class="text-editor" rows="12" placeholder="Enter markdown content..."></sl-textarea>
        </div>
        <sl-button slot="footer" variant="default" class="cancel-text">Cancel</sl-button>
        <sl-button slot="footer" variant="primary" class="apply-text">Save Text</sl-button>
      </sl-dialog>

      <sl-dialog label="Image Data" class="data-dialog">
        <div class="exif-data" style="font-size: 0.85rem; line-height: 1.6;"></div>
        <sl-button slot="footer" variant="primary" class="close-data">Close</sl-button>
      </sl-dialog>

      <sl-dialog label="Crop Image" class="crop-dialog" style="--width: 80vw">
        <div style="margin-bottom: 1rem;">
          <img id="crop-image" />
        </div>
        <sl-button slot="footer" variant="default" class="cancel-crop">Cancel</sl-button>
        <sl-button slot="footer" variant="primary" class="apply-crop">Apply</sl-button>
      </sl-dialog>
    `,this.#s&&this.#s.abort(),this.#s=new AbortController;let{signal:t}=this.#s,o=this.shadowRoot.querySelector(".close-data");o&&o.addEventListener("click",()=>{this.shadowRoot.querySelector(".data-dialog")?.hide()},{signal:t});let r=this.shadowRoot.querySelector(".file-input"),n=this.shadowRoot.querySelector(".camera-input"),a=!1,s=async b=>{if(a)return;let P=Array.from(b.target?.files||[]);if(P.length!==0){a=!0;try{await this.addFiles(P)}finally{b.target&&(b.target.value=""),a=!1}}};r&&(r.onchange=s,r.addEventListener("change",s,{signal:t})),n&&(n.onchange=s,n.addEventListener("change",s,{signal:t}));let l=0,c=b=>{let P=b.dataTransfer;if(!P)return!1;if(!P.types||P.types.length===0)return!0;let B=Array.from(P.types);return B.includes("Files")||B.some(N=>N.startsWith("image/")||N.startsWith("public.")||N.includes("pdf")||N.includes("file")||N==="text/uri-list")},h=b=>{c(b)&&(b.preventDefault(),l++,u.classList.add("drag-over"))},d=b=>{c(b)&&(b.preventDefault(),b.stopPropagation(),b.dataTransfer&&(b.dataTransfer.dropEffect="copy"),u.classList.add("drag-over"))},f=()=>{l--,l<=0&&(l=0,u.classList.remove("drag-over"))},w=async b=>{l=0,u.classList.remove("drag-over"),b.preventDefault(),b.stopPropagation();let P=[];if(b.dataTransfer?.files?.length>0)P=Array.from(b.dataTransfer.files);else if(b.dataTransfer?.items?.length>0){for(let B of b.dataTransfer.items)if(B.kind==="file"){let N=B.getAsFile();N&&P.push(N)}}else b.detail?.files&&(P=Array.from(b.detail.files));P.length>0&&await this.addFiles(P)},u=this.shadowRoot.querySelector(".container");u&&(u.addEventListener("dragenter",h,{signal:t}),u.addEventListener("dragover",d,{signal:t}),u.addEventListener("dragleave",f,{signal:t}),u.addEventListener("drop",w,{signal:t}),u.addEventListener("dragend",()=>{l=0,u.classList.remove("drag-over")},{signal:t}),u.addEventListener("click",b=>{b.target===u&&r?.click()},{signal:t}));let y=this.shadowRoot.querySelector(".cancel-crop"),k=this.shadowRoot.querySelector(".apply-crop"),I=this.shadowRoot.querySelector(".cancel-text"),S=this.shadowRoot.querySelector(".apply-text");y&&y.addEventListener("click",()=>this.closeCropDialog(),{signal:t}),k&&k.addEventListener("click",()=>this.applyCrop(),{signal:t}),I&&I.addEventListener("click",()=>this.closeTextDialog(),{signal:t}),S&&S.addEventListener("click",()=>this.applyTextEdit(),{signal:t});let C=this.shadowRoot.querySelector(".crop-dialog");C&&C.addEventListener("sl-hide",()=>{this.#t&&(this.#t.destroy(),this.#t=null),this.#p=null},{signal:t})}#d(){let e=this.shadowRoot.querySelector(".container");if(!e)return;let t=this.#e.map((a,s)=>{if(a.type==="markdown"){let h=a.name||"Markdown Note",d=(a.content||"").slice(0,120);return`
            <div class="image-wrapper" data-index="${s}">
              <div class="markdown-card">
                <div class="markdown-card-header">
                  <sl-icon name="file-earmark-text"></sl-icon> ${h}
                </div>
                <div class="markdown-card-body">${d}</div>
              </div>
              <sl-dropdown class="image-menu" data-index="${s}">
                <sl-button slot="trigger" variant="default" size="small" circle>
                  <sl-icon name="three-dots-vertical"></sl-icon>
                </sl-button>
                <sl-menu>
                  <sl-menu-item value="edittext">Edit Text</sl-menu-item>
                  <sl-menu-item value="download">Download Markdown</sl-menu-item>
                  <sl-divider></sl-divider>
                  <sl-menu-item value="delete">Delete</sl-menu-item>
                </sl-menu>
              </sl-dropdown>
            </div>
          `}let l=Pt(a.edits),c=a.edits?.filter==="bw";return`
          <div class="image-wrapper" data-index="${s}">
            <img src="${a.src}" draggable="false">
            <sl-dropdown class="image-menu" data-index="${s}">
              <sl-button slot="trigger" variant="default" size="small" circle>
                <sl-icon name="three-dots-vertical"></sl-icon>
              </sl-button>
              <sl-menu>
                <sl-menu-item value="ocr">
                  <sl-icon slot="prefix" name="card-text"></sl-icon> Extract Text
                </sl-menu-item>
                <sl-divider></sl-divider>
                <sl-menu-item value="crop">Crop</sl-menu-item>
                <sl-menu-item value="rotate">Rotate</sl-menu-item>
                <sl-menu-item value="threshold">
                  <sl-icon slot="prefix" name="${c?"check-lg":"circle"}"></sl-icon>
                  ${c?"Remove Black &amp; White":"Black &amp; White"}
                </sl-menu-item>
                <sl-menu-item value="reset" ?disabled=${!l}>
                  <sl-icon slot="prefix" name="arrow-counterclockwise"></sl-icon>
                  Reset to Original
                </sl-menu-item>
                <sl-menu-item value="showdata">Show Data</sl-menu-item>
                <sl-menu-item value="download">Download Image</sl-menu-item>
                <sl-divider></sl-divider>
                <sl-menu-item value="delete">Delete</sl-menu-item>
              </sl-menu>
            </sl-dropdown>
          </div>
        `}).join("");e.innerHTML=`
      ${t}
      <button class="add-btn add-image-btn" title="Add image, PDF, or Markdown" aria-label="Add image or PDF">
        <sl-icon name="plus-lg"></sl-icon>
      </button>
      <button class="add-btn add-camera-btn" title="Capture from camera" aria-label="Capture from camera">
        <sl-icon name="camera"></sl-icon>
      </button>
      <button class="add-btn add-note-btn" title="New blank note" aria-label="New blank note">
        <sl-icon name="file-earmark-plus"></sl-icon>
      </button>
    `;let o=e.querySelector(".add-image-btn");o&&(o.onclick=()=>{this.shadowRoot.querySelector(".file-input").click()});let r=e.querySelector(".add-camera-btn");r&&(r.onclick=()=>{this.shadowRoot.querySelector(".camera-input").click()});let n=e.querySelector(".add-note-btn");n&&(n.onclick=()=>{this.addBlankNote()}),e.querySelectorAll(".image-menu").forEach(a=>{a.querySelector("sl-menu").addEventListener("sl-select",l=>{l.stopPropagation();let c=parseInt(a.dataset.index),h=l.detail.item.value;if(h==="ocr")a.hide(),this.dispatchEvent(new CustomEvent("copio:ocr-page",{bubbles:!0,composed:!0,detail:{page:this.#e[c],pageIndex:c}}));else if(h==="crop")a.hide(),this.openCropDialog(c);else if(h==="rotate")this.rotateImage(c);else if(h==="threshold")this.thresholdImage(c);else if(h==="reset")a.hide(),this.resetImage(c);else if(h==="showdata")a.hide(),this.showImageData(c);else if(h==="edittext")a.hide(),this.openTextDialog(c);else if(h==="download")this.downloadImage(c);else if(h==="delete"){let[d]=this.#e.splice(c,1);this.#d();let f=d.name||(d.type==="markdown"?"Markdown Note":`Page ${c+1}`);Y.undo(`Deleted ${f}`,()=>{this.#e.splice(c,0,d),this.#d(),Y.success(`Restored ${f}`)},{duration:5e3})}})}),this.#h(e)}#h(e){if(this.#l){try{this.#l.destroy()}catch(t){console.warn("Error destroying Sortable:",t)}this.#l=null}this.#l=ao.create(e,{animation:150,draggable:".image-wrapper",chosenClass:"dragging",ghostClass:"sortable-ghost",filter:"sl-dropdown",preventOnFilter:!1,delay:150,delayOnTouchOnly:!0,touchStartThreshold:5,onEnd:t=>{if(t.to!==e)return;let o=t.oldDraggableIndex,r=t.newDraggableIndex;if(o===r)return;let n=this.#e[o];this.#e.splice(o,1),this.#e.splice(r,0,n),this.#d()}})}async openCropDialog(e){this.#p=e;let t=this.#e[e];if(!t||t.type==="markdown")return;let o=this.shadowRoot.querySelector(".crop-dialog"),r=this.shadowRoot.querySelector("#crop-image");t.originalSrc=t.originalSrc||t.src,t.edits=ue(t.edits),r.src=t.originalSrc,o.show();let n=await Rt(),a=t.edits?.crop,s=()=>{this.#t&&this.#t.destroy(),this.#t=new n(r,{viewMode:1,autoCropArea:1,ready:()=>{if(a&&a.width>0&&a.height>0)try{this.#t.setData(a)}catch{}}})};r.onload=s,r.complete&&r.naturalWidth>0&&!this.#t&&s()}closeCropDialog(){let e=this.shadowRoot.querySelector(".crop-dialog"),t=this.shadowRoot.querySelector("#crop-image");if(t&&(t.onload=null),this.#t){try{this.#t.destroy()}catch(o){console.warn("Error destroying Cropper:",o)}this.#t=null}this.#p=null,e?.hide()}applyCrop(){if(this.#t&&this.#p!==null){let e=this.#e[this.#p];if(!e)return;e.originalSrc=e.originalSrc||e.src||"";let t=this.#t.getData(!0);e.edits={...ue(e.edits),crop:{x:Math.round(t.x),y:Math.round(t.y),width:Math.round(t.width),height:Math.round(t.height)}};let o=this.#t.getCroppedCanvas();if(o){let r=_t(o,{crop:null,rotation:e.edits.rotation,filter:e.edits.filter}),n=e.originalSrc.startsWith("data:image/png"),a=n?"image/png":"image/jpeg";e.src=r.toDataURL(a,n?void 0:.82)}this.#d(),this.closeCropDialog()}}async rotateImage(e){let t=this.#e[e];!t||t.type==="markdown"||(t.originalSrc=t.originalSrc||t.src,t.edits={...ue(t.edits),rotation:((t.edits?.rotation||0)+90)%360},t.src=await nt(t.originalSrc,t.edits),this.#d())}async thresholdImage(e){let t=this.#e[e];if(!t||t.type==="markdown")return;t.originalSrc=t.originalSrc||t.src;let o=t.edits?.filter==="bw";t.edits={...ue(t.edits),filter:o?"none":"bw"},t.src=await nt(t.originalSrc,t.edits),this.#d(),o?Y.info("Restored color (removed B&W filter)"):Y.success("Applied B&W threshold filter")}resetImage(e){let t=this.#e[e];!t||t.type==="markdown"||(t.edits={crop:null,rotation:0,filter:"none"},t.src=t.originalSrc||t.src,this.#d(),Y.success("Reset page to original"))}addBlankNote(){let e={id:ce(),type:"markdown",name:"New Note",content:""};this.#e.push(e),this.#d(),this.openTextDialog(this.#e.length-1)}downloadImage(e){let t=this.#e[e];if(!t)return;if(t.type==="markdown"){let a=new Blob([t.content||""],{type:"text/markdown;charset=utf-8"}),s=this.#f(URL.createObjectURL(a)),l=document.createElement("a"),c=t.name||`document-${e+1}.md`;l.href=s,l.download=c,l.click(),this.#u(s),Y.success(`Downloaded "${c}"`);return}if(!t.src)return;let o="jpg";if(t.src.startsWith("data:")){let a=t.src.match(/^data:(image\/[a-zA-Z+]+);base64,/);a&&a[1].includes("png")&&(o="png")}let r=document.createElement("a"),n=`image-${e+1}.${o}`;r.href=t.src,r.download=n,r.click(),Y.success(`Downloaded "${n}"`)}openTextDialog(e){this.#i=e;let t=this.shadowRoot.querySelector(".text-dialog"),o=this.shadowRoot.querySelector(".text-editor");o.value=this.#e[e].content||"",t.label=this.#e[e].name||"Note",t.show()}applyTextEdit(){if(this.#i!==null&&this.#e[this.#i]){let e=this.shadowRoot.querySelector(".text-editor");this.#e[this.#i].content=e.value,this.#d(),this.closeTextDialog()}}closeTextDialog(){let e=this.shadowRoot.querySelector(".text-dialog");this.#i=null,e.hide()}showImageData(e){let{src:t,exif:o}=this.#e[e],r=this.shadowRoot.querySelector(`img[src="${t}"]`),n=[];if(n.push(`<strong>Dimensions:</strong> ${r?`${r.naturalWidth} \xD7 ${r.naturalHeight}`:"unknown"}`),o){let a=new Set(["MakerNote","UserComment","FlashPixVersion","ExifVersion","ComponentsConfiguration","SceneType","thumbnail"]);for(let[s,l]of Object.entries(o)){if(a.has(s)||l===void 0||l===null)continue;let c=l instanceof Array?l.join(", "):String(l);c.length>200||n.push(`<strong>${s}:</strong> ${c}`)}}else n.push("<em>No EXIF data available</em>");this.shadowRoot.querySelector(".exif-data").innerHTML=n.join("<br>"),this.shadowRoot.querySelector(".data-dialog").show()}async pdfToImages(e){let t=await e.arrayBuffer();return(await Bt(t)).map(r=>({id:ce(),src:r,originalSrc:r,edits:{crop:null,rotation:0,filter:"none"}}))}async addFiles(e){if(!e||e.length===0)return;let t=[];try{for(let r of e)if(r.type==="application/pdf"){let n=await this.pdfToImages(r);t.push(...n)}else if(r.name?.endsWith(".md")||r.name?.endsWith(".markdown")||r.type==="text/markdown"||r.type==="text/plain"){let n=await r.text();t.push({id:ce(),type:"markdown",name:r.name,content:n})}else{let[n,a]=await Promise.all([Tt(r),At(r)]);t.push({id:ce(),src:n,originalSrc:n,edits:{crop:null,rotation:0,filter:"none"},exif:a})}this.#e.push(...t),this.#d();let o=t.length;Y.success(`Imported ${o} page${o!==1?"s":""}`)}catch(o){console.error("Failed to import files:",o),Y.error("Failed to import files")}}get images(){return this.#e}set images(e){let t=Array.isArray(e)?e:[];this.#e=t.map(o=>!o||o.type==="markdown"?o:{...o,originalSrc:o.originalSrc||o.src||"",edits:ue(o.edits)}),this.#o&&this.#d()}};customElements.define("copio-images",Je);var et=class extends K{disconnectedCallback(){super.disconnectedCallback(),this.activeSlideIndex=0}updated(e){super.updated(e),e.has("images")&&Array.isArray(this.images)&&this.images.some(t=>t.type==="markdown")&&(!window.marked||!window.marked.parse)&&Mt().then(()=>this.requestUpdate())}static properties={docId:{type:String},docName:{type:String},images:{type:Array},activeSlideIndex:{type:Number,state:!0}};get hasImages(){return(this.images||[]).some(e=>e.type!=="markdown"&&!!e.src)}get hasMarkdown(){return(this.images||[]).some(e=>e.type==="markdown")}get pageCount(){return(this.images||[]).length}static styles=re`
    sl-carousel {
      position: absolute;
      top: 0;
      padding-top: 16px;
      background: white;
      z-index: 4;
      height: 100%;
      width: 100%;
    }
    sl-carousel-item {
      height: 100%;
    }
    .item {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      background: linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.3) 80%, transparent 100%);
      pointer-events: none;
      box-sizing: border-box;
    }
    .top-bar > * {
      pointer-events: auto;
    }
    .top-bar-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .top-bar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .back {
      font-size: 26px;
      cursor: pointer;
      appearance: none;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: white;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }
    .back:hover {
      background: rgba(15, 23, 42, 0.9);
    }
    .doc-heading {
      color: #f8fafc;
      font-size: 1.05rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 240px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .ocr-btn, .export-btn {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 6px 12px;
      height: 36px;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      box-sizing: border-box;
    }
    .ocr-btn:hover, .export-btn:hover {
      background: rgba(15, 23, 42, 0.95);
      border-color: rgba(255, 255, 255, 0.4);
    }
    .markdown-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 60px 24px 24px 24px;
      overflow-y: auto;
      background: #151f2a;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
    }
    .markdown-body {
      max-width: 800px;
      margin: 0 auto;
    }
    .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
      color: #f1f5f9;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      line-height: 1.25;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 0.3em;
    }
    .markdown-body h1 { font-size: 2em; }
    .markdown-body h2 { font-size: 1.5em; }
    .markdown-body h3 { font-size: 1.25em; }
    .markdown-body p { margin-top: 0; margin-bottom: 1em; }
    .markdown-body ul, .markdown-body ol { padding-left: 2em; margin-bottom: 1em; }
    .markdown-body li { margin-bottom: 0.3em; }
    .markdown-body code {
      background: rgba(255,255,255,0.1);
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
    }
    .markdown-body pre {
      background: #0f172a;
      padding: 1em;
      border-radius: 8px;
      overflow-x: auto;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .markdown-body pre code { background: none; padding: 0; }
    .markdown-body blockquote {
      border-left: 4px solid #38bdf8;
      margin: 1em 0;
      padding-left: 1em;
      color: #cbd5e1;
      font-style: italic;
    }
    .markdown-body table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1em;
    }
    .markdown-body th, .markdown-body td {
      border: 1px solid rgba(255,255,255,0.15);
      padding: 8px 12px;
      text-align: left;
    }
    .markdown-body th {
      background: rgba(255,255,255,0.1);
    }
    .markdown-body img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
    }
  `;constructor(){super(),this.docId="",this.docName="",this.images=[],this.activeSlideIndex=0}handleBackClick(){this.dispatchEvent(new CustomEvent("dialog:close",{bubbles:!0,composed:!1}))}handleOcrClick(){let e=this.images[this.activeSlideIndex];!e||e.type==="markdown"||!e.src||this.dispatchEvent(new CustomEvent("copio:ocr-page",{bubbles:!0,composed:!0,detail:{page:e,pageIndex:this.activeSlideIndex}}))}handleExportSelect(e){if(e.detail?.item?.disabled)return;let t=e.detail?.item?.value,o={docId:this.docId,docName:this.docName,pages:this.images};t==="pdf"?this.dispatchEvent(new CustomEvent("doc:download-pdf",{bubbles:!0,composed:!1,detail:o})):t==="images"?this.dispatchEvent(new CustomEvent("doc:download-images",{bubbles:!0,composed:!1,detail:o})):t==="markdown"&&this.dispatchEvent(new CustomEvent("doc:download-markdown",{bubbles:!0,composed:!1,detail:o}))}handleSlideChange(e){this.activeSlideIndex=e.detail?.index||0}renderItem(e){if(e.type==="markdown"){let t=e.content||"",o=window.marked&&window.marked.parse?window.marked.parse(t):t;return z`
        <sl-carousel-item data-id="${e.id}">
          <div class="markdown-container">
            <div class="markdown-body" .innerHTML=${o}></div>
          </div>
        </sl-carousel-item>
      `}return z`
      <sl-carousel-item data-id="${e.id}">
        <div class="item" style="background-image: url('${e.src}')"></div>
      </sl-carousel-item>
    `}render(){let e=this.images[this.activeSlideIndex],t=e&&e.type!=="markdown"&&!!e.src;return z`
      <div class="top-bar">
        <div class="top-bar-left">
          <button class="back" @click=${this.handleBackClick} aria-label="Back">←</button>
          <span class="doc-heading">${this.docName||"Document"}</span>
        </div>

        <div class="top-bar-right">
          ${t?z`
                <button class="ocr-btn" @click=${this.handleOcrClick} aria-label="Extract text">
                  <sl-icon name="card-text"></sl-icon>
                  <span>Extract Text</span>
                </button>
              `:""}

          <sl-dropdown>
            <button slot="trigger" class="export-btn" aria-label="Export document">
              <sl-icon name="box-arrow-up"></sl-icon>
              <span>Export</span>
              <sl-icon name="chevron-down" style="font-size: 0.75rem;"></sl-icon>
            </button>
            <sl-menu @sl-select=${this.handleExportSelect}>
              <sl-menu-item value="pdf" ?disabled=${this.pageCount===0}>
                <sl-icon slot="prefix" name="file-earmark-pdf"></sl-icon>
                Download as PDF
              </sl-menu-item>
              <sl-menu-item value="images" ?disabled=${this.pageCount===0}>
                <sl-icon slot="prefix" name="images"></sl-icon>
                Download as Images (ZIP)
              </sl-menu-item>
              <sl-menu-item value="markdown" ?disabled=${!this.hasMarkdown}>
                <sl-icon slot="prefix" name="markdown"></sl-icon>
                Download as Markdown
              </sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </div>
      </div>

      <sl-carousel
        class="sl-carousel"
        orientation="vertical"
        @sl-slide-change=${this.handleSlideChange}
      >
        ${this.images.map(o=>this.renderItem(o))}
      </sl-carousel>
    `}};customElements.define("copio-carousel",et);var tt=class extends K{createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.#e()}#e=()=>{let e=this.querySelector(".dialog-add-edit-input-name"),t=this.querySelector(".dialog-name-error");if(t&&(t.style.display="none"),e&&(e.classList.remove("input-invalid"),e.style.removeProperty("--sl-input-border-color"),e.style.removeProperty("--sl-input-border-color-focus"),typeof e.setCustomValidity=="function"))try{e.setCustomValidity("")}catch{}};#t=e=>{e.target?.value?.trim()&&this.#e()};#l=e=>{if(e.target!==e.currentTarget)return;this.#e();let t=this.querySelector(".dialog-add-edit-input-id"),o=this.querySelector(".dialog-add-edit-input-name"),r=this.querySelector("copio-images");t&&(t.value=""),o&&(o.value=""),r&&(r.images=[]),this.dispatchEvent(new CustomEvent("dialog:close",{bubbles:!0,composed:!1}))};#p=e=>{if(e.key!=="Enter"||this.querySelector("sl-dialog[open]"))return;if(e.target?.classList?.contains("dialog-add-edit-input-name")){e.preventDefault(),this.#i();return}let t=e.target?.tagName;t==="TEXTAREA"||t==="SL-TEXTAREA"||t==="INPUT"||t==="SL-INPUT"||e.target?.tagName==="SL-BUTTON"||e.target?.tagName==="BUTTON"||(e.preventDefault(),this.#i())};async open(){await this.updateComplete,this.#e();let e=this.querySelector(".dialog-add-edit");e&&(await e.show(),this.querySelector(".dialog-add-edit-input-name")?.focus())}async openEdit(e,t,o){await this.updateComplete,this.#e();let r=this.querySelector(".dialog-add-edit");if(!r)return;let n=this.querySelector(".dialog-add-edit-input-id"),a=this.querySelector(".dialog-add-edit-input-name"),s=this.querySelector("copio-images");n.value=e,a.value=t,await customElements.whenDefined("copio-images"),s.images=o.map(({id:l,src:c,originalSrc:h,edits:d,exif:f,type:w,name:u,content:y})=>({id:l,src:c,originalSrc:h||c,edits:d||{crop:null,rotation:0,filter:"none"},exif:f,type:w,name:u,content:y})),r.open||(await r.show(),a.focus())}#i=()=>{let e=this.querySelector(".dialog-add-edit-input-id"),t=this.querySelector(".dialog-add-edit-input-name"),o=this.querySelector(".dialog-name-error"),r=this.querySelector("copio-images"),n=t?.value?.trim();if(!n){o&&(o.style.display="block"),t&&(t.classList.add("input-invalid"),t.style.setProperty("--sl-input-border-color","#ef4444"),t.style.setProperty("--sl-input-border-color-focus","#ef4444"),typeof t.setCustomValidity=="function"&&(t.setCustomValidity("Please enter a document name"),t.reportValidity?.()),t.focus());return}let a=(r?.images||[]).map(({id:l,src:c,originalSrc:h,edits:d,exif:f,type:w,name:u,content:y})=>({id:l,src:c,originalSrc:h||c,edits:d||{crop:null,rotation:0,filter:"none"},exif:f,type:w,name:u,content:y})),s=e?.value||ce();this.dispatchEvent(new CustomEvent("dialog:save",{bubbles:!0,composed:!1,detail:{id:s,name:n,pages:a}})),this.querySelector(".dialog-add-edit")?.hide()};render(){return z`
      <sl-dialog
        label="Add / Edit"
        class="dialog-add-edit"
        style="--width: 90vw"
        @sl-after-hide=${this.#l}
        @keydown=${this.#p}
      >
        <div class="relative" style="min-height: 65vh">
          <sl-input
            disabled
            class="dialog-add-edit-input-id"
            placeholder="id"
            style="display: none"
          ></sl-input>
          <div class="dialog-name-field" style="max-width: 300px">
            <sl-input
              class="dialog-add-edit-input-name"
              placeholder="Enter name of document or image"
              @sl-input=${this.#t}
            ></sl-input>
            <div
              class="dialog-name-error"
              style="color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: none;"
            >
              Please enter a document name
            </div>
          </div>

          <copio-images
            style="display: block; margin-top: 1.5rem"
          ></copio-images>

          <br />

          <sl-button
            class="dialog-add-edit-savebtn abm w-full"
            slot="footer"
            variant="primary"
            @click=${this.#i}
            >Save</sl-button
          >
        </div>
      </sl-dialog>
    `}};customElements.define("copio-add-edit-dialog",tt);var ot=class extends K{static properties={name:{type:String},pages:{type:Array},isRenaming:{type:Boolean,state:!0},renameValue:{type:String,state:!0}};constructor(){super(),this.name="",this.pages=[],this.isRenaming=!1,this.renameValue=""}get hasImages(){return(this.pages||[]).some(e=>e.type!=="markdown"&&!!e.src)}get hasMarkdown(){return(this.pages||[]).some(e=>e.type==="markdown")}get pageCount(){return(this.pages||[]).length}static styles=re`
    .wrapper {
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 768px;
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      cursor: pointer;
      user-select: none;
    }
    .inner {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
    }
    .titles {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      padding: 2px 0;
      flex: 1;
      min-width: 0;
    }
    .doc-title {
      font-weight: 600;
      font-size: 0.95rem;
      color: #151f2a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
    .doc-page-count {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }
    .rename-container {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      max-width: 320px;
    }
    .rename-container sl-input {
      flex: 1;
    }
    button {
      appearance: none;
      border: none;
      color: black;
      padding: 3px 4px 3px 7px;
      background: white;
      cursor: pointer;
    }
  `;#e(e){this.isRenaming||e.target.closest("sl-dropdown")||e.target.closest(".rename-container")||this.handleView()}#t(e){if(e.detail?.item?.disabled)return;let t=e.detail?.item?.value;t==="delete"&&this.handleDelete(),t==="rename"&&this.startRename(),t==="edit"&&this.handleEdit(),t==="extract-ocr"&&this.handleExtractOcr(),t==="download"&&this.handleDownload(),t==="download-images"&&this.handleDownloadImages(),t==="download-markdown"&&this.handleDownloadMarkdown()}startRename(e){e&&(e.preventDefault(),e.stopPropagation()),this.renameValue=this.name||"",this.isRenaming=!0,this.updateComplete.then(()=>{let t=this.shadowRoot.querySelector(".rename-input");t&&(t.focus(),typeof t.select=="function"&&t.select())})}cancelRename(e){e&&(e.preventDefault(),e.stopPropagation()),this.isRenaming=!1,this.renameValue=this.name||""}commitRename(e){e&&(e.preventDefault(),e.stopPropagation());let t=(this.renameValue||"").trim();if(!t){this.cancelRename();return}if(t!==this.name){let o={id:this.getAttribute("id"),name:t};this.dispatchEvent(new CustomEvent("doc:rename",{bubbles:!0,composed:!1,detail:o})),this.name=t}this.isRenaming=!1}handleRenameKeyDown(e){e.key==="Enter"?(e.preventDefault(),this.commitRename()):e.key==="Escape"&&(e.preventDefault(),this.cancelRename())}handleExtractOcr(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:extract-ocr",{bubbles:!0,composed:!1,detail:e}))}handleView(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:view",{bubbles:!0,composed:!1,detail:e}))}handleDelete(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:delete",{bubbles:!0,composed:!1,detail:e}))}handleEdit(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:edit",{bubbles:!0,composed:!1,detail:e}))}handleDownload(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:download",{bubbles:!0,composed:!1,detail:e}))}handleDownloadImages(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:download-images",{bubbles:!0,composed:!1,detail:e}))}handleDownloadMarkdown(){let e={id:this.getAttribute("id")};this.dispatchEvent(new CustomEvent("doc:download-markdown",{bubbles:!0,composed:!1,detail:e}))}render(){return z`
      <div class="wrapper" @click=${this.#e}>
        <div class="inner">
          <sl-avatar label="Document icon">
            <sl-icon slot="icon" name="file-earmark-text"></sl-icon>
          </sl-avatar>

          <div class="titles">
            ${this.isRenaming?z`
                  <div class="rename-container" @click=${e=>e.stopPropagation()}>
                    <sl-input
                      class="rename-input"
                      size="small"
                      .value=${this.renameValue}
                      @sl-input=${e=>this.renameValue=e.target.value}
                      @keydown=${this.handleRenameKeyDown}
                    ></sl-input>
                    <sl-icon-button
                      name="check-lg"
                      label="Save rename"
                      @click=${this.commitRename}
                    ></sl-icon-button>
                    <sl-icon-button
                      name="x-lg"
                      label="Cancel rename"
                      @click=${this.cancelRename}
                    ></sl-icon-button>
                  </div>
                `:z`
                  <div class="doc-title">${this.name||"Untitled Document"}</div>
                  <div class="doc-page-count">
                    ${this.pageCount} ${this.pageCount===1?"page":"pages"}
                  </div>
                `}
          </div>
        </div>

        <sl-dropdown>
          <sl-button slot="trigger" variant="default" size="small" circle>
            <sl-icon name="three-dots-vertical"></sl-icon>
          </sl-button>
          <sl-menu @sl-select=${this.#t}>
            <sl-menu-item value="edit">
              <sl-icon slot="prefix" name="sliders"></sl-icon>
              Edit
            </sl-menu-item>
            <sl-menu-item value="rename">
              <sl-icon slot="prefix" name="pencil"></sl-icon>
              Rename
            </sl-menu-item>
            <sl-menu-item
              value="extract-ocr"
              ?disabled=${!this.hasImages}
              title=${this.hasImages?"Extract text with OCR":"No image pages in document"}
            >
              <sl-icon slot="prefix" name="card-text"></sl-icon>
              Extract All Text (OCR)
            </sl-menu-item>
            <sl-divider></sl-divider>
            <sl-menu-item
              value="download"
              ?disabled=${this.pageCount===0}
              title=${this.pageCount===0?"Document is empty":"Download as PDF"}
            >
              <sl-icon slot="prefix" name="file-earmark-pdf"></sl-icon>
              Download as PDF
            </sl-menu-item>
            <sl-menu-item
              value="download-images"
              ?disabled=${this.pageCount===0}
              title=${this.pageCount===0?"Document is empty":"Download as Images"}
            >
              <sl-icon slot="prefix" name="images"></sl-icon>
              Download as Images
            </sl-menu-item>
            <sl-menu-item
              value="download-markdown"
              ?disabled=${!this.hasMarkdown}
              title=${this.hasMarkdown?"Download as Markdown":"No markdown notes in document"}
            >
              <sl-icon slot="prefix" name="markdown"></sl-icon>
              Download as Markdown
            </sl-menu-item>
            <sl-divider></sl-divider>
            <sl-menu-item value="delete">
              <sl-icon slot="prefix" name="trash"></sl-icon>
              Delete
            </sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </div>
    `}};customElements.define("copio-row",ot);var it=class extends K{static styles=re`
    header {
      background-color: #151f2a;
      color: white;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 8px;
    }
    .header-left,
    .header-right {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .header-right {
      justify-content: flex-end;
    }
    h1 {
      font-size: 24px;
      margin: 0;
    }
  `;static properties={_storageEstimate:{state:!0},_isPersisted:{state:!0}};async connectedCallback(){super.connectedCallback(),await this.#e()}disconnectedCallback(){super.disconnectedCallback()}async#e(){navigator.storage&&(navigator.storage.persisted&&(this._isPersisted=await navigator.storage.persisted()),navigator.storage.estimate&&(this._storageEstimate=await navigator.storage.estimate()))}_formatBytes(e){if(e==null)return"Unknown";if(e===0)return"0 B";let t=1024,o=["B","KB","MB","GB"],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,r)).toFixed(1))+" "+o[r]}#t(e){if(e.detail.item.value==="link-device"){this.dispatchEvent(new CustomEvent("header:link-device",{bubbles:!0,composed:!1}));return}e.detail.item.value==="clear-cache"&&this.dispatchEvent(new CustomEvent("header:clear-cache",{bubbles:!0,composed:!1}))}render(){return z`
      <header>
        <div class="header-left">
          <sl-dropdown @sl-show=${this.#e}>
            <sl-icon-button
              slot="trigger"
              name="list"
              label="Menu"
              style="font-size: 1.5rem; color: white;"
            ></sl-icon-button>
            <sl-menu @sl-select=${this.#t}>
              <sl-menu-item value="link-device">Link another device</sl-menu-item>
              <sl-menu-item value="clear-cache">Clear cache &amp; update</sl-menu-item>
              <sl-divider></sl-divider>
              <sl-menu-item disabled>
                Storage: ${this._formatBytes(this._storageEstimate?.usage)} 
                (${this._isPersisted?"Persisted":"Volatile"})
              </sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </div>
        <h1>COPIO CARDS</h1>
        <div class="header-right"></div>
      </header>
    `}};customElements.define("copio-header",it);var rt=class extends K{disconnectedCallback(){super.disconnectedCallback()}static styles=re`
    .lds-roller {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-roller div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 40px 40px;
    }
    .lds-roller div:after {
      content: ' ';
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
      animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
      top: 63px;
      left: 63px;
    }
    .lds-roller div:nth-child(2) {
      animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
      top: 68px;
      left: 56px;
    }
    .lds-roller div:nth-child(3) {
      animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
      top: 71px;
      left: 48px;
    }
    .lds-roller div:nth-child(4) {
      animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
      top: 72px;
      left: 40px;
    }
    .lds-roller div:nth-child(5) {
      animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
      top: 71px;
      left: 32px;
    }
    .lds-roller div:nth-child(6) {
      animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
      top: 68px;
      left: 24px;
    }
    .lds-roller div:nth-child(7) {
      animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
      top: 63px;
      left: 17px;
    }
    .lds-roller div:nth-child(8) {
      animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
      top: 56px;
      left: 12px;
    }
    @keyframes lds-roller {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;render(){return z`
      <div
        style="
          background: #151f2a;
          width: 100%;
          position: absolute;
          z-index: 5;
          height: 100%;
          margin: 0;
          padding: 0;
          top: 0;
          left: 0;
        "
      >
        <img
          src="copio.svg"
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.3;
            z-index: 1;
            max-width: 320px;
          "
        />
        <div
          class="lds-roller"
          style="
            position: absolute;
            top: calc(50% + -50px);
            left: 50%;
            transform: translate(-50%) scale(1);
            opacity: 0.5;
          "
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    `}};customElements.define("copio-loader",rt);var Ct=`
/* ==========================================================================
   1. HOST RESET & BOUNDARY ENCAPSULATION
   all: initial isolates inherited typography, line-height, text-align, etc.
   ========================================================================== */
:host {
  all: initial;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  container-type: size;
  container-name: copio-scanner;
  overflow: hidden;
  contain: layout;
  box-sizing: border-box;
  text-align: left;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Typography Design Tokens */
  --copio-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --copio-font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;

  /* Surface & Background Tokens (Default Dark) */
  --copio-color-bg: #0b0f17;
  --copio-color-surface: #131b26;
  --copio-color-surface-elevated: #1c2736;
  --copio-color-surface-overlay: rgba(15, 22, 32, 0.88);
  --copio-color-stage-bg: #070a0f;

  /* Text & Iconography Tokens */
  --copio-color-text: #f1f5f9;
  --copio-color-text-muted: #94a3b8;
  --copio-color-text-inverse: #090d14;

  /* Brand & Semantic Accent Tokens */
  --copio-color-primary: #38bdf8;
  --copio-color-primary-hover: #7dd3fc;
  --copio-color-primary-contrast: #06131f;
  --copio-color-success: #22c55e;
  --copio-color-warning: #f59e0b;
  --copio-color-danger: #ef4444;

  /* Borders, Dividers & Focus Rings */
  --copio-color-border: rgba(148, 163, 184, 0.18);
  --copio-color-border-strong: rgba(148, 163, 184, 0.34);
  --copio-focus-ring: 0 0 0 2px #0b0f17, 0 0 0 4px #38bdf8;

  /* Geometry, Spacing & Touch Ergonomics (>=44px touch targets) */
  --copio-radius-sm: 6px;
  --copio-radius-md: 10px;
  --copio-radius-lg: 14px;
  --copio-radius-pill: 9999px;
  --copio-spacing-xs: 4px;
  --copio-spacing-sm: 8px;
  --copio-spacing-md: 12px;
  --copio-spacing-lg: 16px;
  --copio-spacing-xl: 24px;
  --copio-touch-target-min: 44px;
  --copio-crop-handle-hit: 48px;
  --copio-crop-handle-visual: 16px;
  --copio-shadow-elevated: 0 12px 32px -4px rgba(0, 0, 0, 0.55);
  --copio-transition-fast: 150ms cubic-bezier(0.22, 1, 0.36, 1);
  --copio-transition-normal: 240ms cubic-bezier(0.22, 1, 0.36, 1);

  /* Shoelace Theme Mapping */
  --sl-font-sans: var(--copio-font-family);
  --sl-font-mono: var(--copio-font-mono);
  --sl-color-primary-50: #f0f9ff;
  --sl-color-primary-100: #e0f2fe;
  --sl-color-primary-200: #bae6fd;
  --sl-color-primary-300: #7dd3fc;
  --sl-color-primary-400: #38bdf8;
  --sl-color-primary-500: #0ea5e9;
  --sl-color-primary-600: var(--copio-color-primary);
  --sl-color-primary-700: #0369a1;
  --sl-color-primary-800: #075985;
  --sl-color-primary-900: #0c4a6e;
  --sl-color-primary-950: #082f49;

  font-family: var(--copio-font-family);
  font-size: 14px;
  line-height: 1.5;
  color: var(--copio-color-text);
  background-color: var(--copio-color-bg);
  color-scheme: dark;
}

/* Explicit Dark Theme Override */
:host([theme="dark"]),
:host(.copio-theme-dark),
:host-context([data-theme="dark"]),
:host-context(.sl-theme-dark),
:host-context(.theme-dark) {
  --copio-color-bg: #0b0f17;
  --copio-color-surface: #131b26;
  --copio-color-surface-elevated: #1c2736;
  --copio-color-surface-overlay: rgba(15, 22, 32, 0.88);
  --copio-color-stage-bg: #070a0f;
  --copio-color-text: #f1f5f9;
  --copio-color-text-muted: #94a3b8;
  --copio-color-text-inverse: #090d14;
  --copio-color-primary: #38bdf8;
  --copio-color-primary-hover: #7dd3fc;
  --copio-color-primary-contrast: #06131f;
  --copio-color-success: #22c55e;
  --copio-color-warning: #f59e0b;
  --copio-color-danger: #ef4444;
  --copio-color-border: rgba(148, 163, 184, 0.18);
  --copio-color-border-strong: rgba(148, 163, 184, 0.34);
  --copio-focus-ring: 0 0 0 2px #0b0f17, 0 0 0 4px #38bdf8;
  --copio-radius-sm: 6px;
  --copio-radius-md: 10px;
  --copio-radius-lg: 14px;
  --copio-shadow-elevated: 0 12px 32px -4px rgba(0, 0, 0, 0.55);
  color-scheme: dark;
}

/* Light Theme Override */
:host([theme="light"]),
:host(.copio-theme-light),
:host-context([data-theme="light"]),
:host-context(.sl-theme-light),
:host-context(.theme-light) {
  --copio-color-bg: #f8fafc;
  --copio-color-surface: #ffffff;
  --copio-color-surface-elevated: #f1f5f9;
  --copio-color-surface-overlay: rgba(255, 255, 255, 0.92);
  --copio-color-stage-bg: #1e293b;
  --copio-color-text: #0f172a;
  --copio-color-text-muted: #475569;
  --copio-color-text-inverse: #ffffff;
  --copio-color-primary: #0284c7;
  --copio-color-primary-hover: #0369a1;
  --copio-color-primary-contrast: #ffffff;
  --copio-color-success: #16a34a;
  --copio-color-warning: #d97706;
  --copio-color-danger: #dc2626;
  --copio-color-border: rgba(15, 23, 42, 0.12);
  --copio-color-border-strong: rgba(15, 23, 42, 0.26);
  --copio-focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px #0284c7;
  --copio-radius-sm: 6px;
  --copio-radius-md: 10px;
  --copio-radius-lg: 14px;
  --copio-shadow-elevated: 0 12px 28px -4px rgba(15, 23, 42, 0.18);
  color-scheme: light;
}

/* Brand Theme Override (Emerald) */
:host([theme="brand"]),
:host(.copio-theme-brand),
:host-context([data-theme="brand"]),
:host-context(.theme-brand) {
  --copio-color-bg: #0f111a;
  --copio-color-surface: #181b28;
  --copio-color-surface-elevated: #23273a;
  --copio-color-surface-overlay: rgba(24, 27, 40, 0.90);
  --copio-color-stage-bg: #090a10;
  --copio-color-text: #f8fafc;
  --copio-color-text-muted: #9ca3af;
  --copio-color-text-inverse: #ffffff;
  --copio-color-primary: #10b981;
  --copio-color-primary-hover: #34d399;
  --copio-color-primary-contrast: #042f2e;
  --copio-color-success: #10b981;
  --copio-color-warning: #f59e0b;
  --copio-color-danger: #ef4444;
  --copio-color-border: rgba(16, 185, 129, 0.22);
  --copio-color-border-strong: rgba(16, 185, 129, 0.42);
  --copio-focus-ring: 0 0 0 2px #0f111a, 0 0 0 4px #10b981;
  --copio-radius-sm: 4px;
  --copio-radius-md: 8px;
  --copio-radius-lg: 12px;
  --copio-shadow-elevated: 0 12px 32px -4px rgba(0, 0, 0, 0.65);
  color-scheme: dark;
}

/* Auto Theme: follows prefers-color-scheme when theme is auto */
@media (prefers-color-scheme: light) {
  :host([theme="auto"]),
  :host(.copio-theme-auto) {
    --copio-color-bg: #f8fafc;
    --copio-color-surface: #ffffff;
    --copio-color-surface-elevated: #f1f5f9;
    --copio-color-surface-overlay: rgba(255, 255, 255, 0.92);
    --copio-color-stage-bg: #1e293b;
    --copio-color-text: #0f172a;
    --copio-color-text-muted: #475569;
    --copio-color-text-inverse: #ffffff;
    --copio-color-primary: #0284c7;
    --copio-color-primary-hover: #0369a1;
    --copio-color-primary-contrast: #ffffff;
    --copio-color-success: #16a34a;
    --copio-color-warning: #d97706;
    --copio-color-danger: #dc2626;
    --copio-color-border: rgba(15, 23, 42, 0.12);
    --copio-color-border-strong: rgba(15, 23, 42, 0.26);
    --copio-focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px #0284c7;
    --copio-radius-sm: 6px;
    --copio-radius-md: 10px;
    --copio-radius-lg: 14px;
    --copio-shadow-elevated: 0 12px 28px -4px rgba(15, 23, 42, 0.18);
    color-scheme: light;
  }
}

/* ==========================================================================
   2. INTERNAL ELEMENT RESET (Scoped to Shadow DOM)
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
}

::slotted(*) {
  box-sizing: border-box;
}

/* ==========================================================================
   3. ROOT CONTAINER & COMPONENT SHELL
   ========================================================================== */
.copio-scanner-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  container-type: size;
  container-name: copio-scanner;
  contain: layout;
  background: var(--copio-color-bg);
  color: var(--copio-color-text);
  font-family: var(--copio-font-family);
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  direction: ltr;
  user-select: none;
}

/* Header (Shadow Part: header) */
.copio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--copio-spacing-sm);
  padding: var(--copio-spacing-sm) var(--copio-spacing-md);
  background: var(--copio-color-surface);
  border-bottom: 1px solid var(--copio-color-border);
  min-height: 52px;
  flex-shrink: 0;
  z-index: 5;
  box-sizing: border-box;
}

.copio-header-left {
  display: flex;
  align-items: center;
  gap: var(--copio-spacing-sm);
  min-width: 0;
}

.copio-mode-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: var(--copio-radius-pill);
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-primary);
  border: 1px solid var(--copio-color-border);
  white-space: nowrap;
}

.copio-title-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.copio-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--copio-color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copio-subtitle {
  font-size: 11px;
  color: var(--copio-color-text-muted);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copio-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* Interactive Stage Switcher Pill (Viewfinder vs Workbench) */
.copio-stage-tabs {
  display: inline-flex;
  background: var(--copio-color-bg);
  padding: 2px;
  border-radius: var(--copio-radius-md);
  border: 1px solid var(--copio-color-border);
}

.copio-stage-tab {
  appearance: none;
  border: none;
  background: transparent;
  color: var(--copio-color-text-muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 10px;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  border-radius: var(--copio-radius-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--copio-transition-fast), color var(--copio-transition-fast);
}

.copio-stage-tab[aria-selected="true"] {
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Touch-Safe Interactive Buttons (>=44px touch invariant) */
.copio-btn {
  appearance: none;
  border: 1px solid var(--copio-color-border);
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-text);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  padding: 0 12px;
  border-radius: var(--copio-radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
  white-space: nowrap;
  text-decoration: none;
  box-sizing: border-box;
}

.copio-btn:hover {
  background: var(--copio-color-primary-hover);
  color: var(--copio-color-primary-contrast);
  border-color: var(--copio-color-primary);
}

.copio-btn-primary {
  background: var(--copio-color-primary);
  color: var(--copio-color-primary-contrast);
  border-color: var(--copio-color-primary);
}

.copio-btn-danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--copio-color-danger);
  border-color: rgba(239, 68, 68, 0.35);
}

.copio-btn-danger:hover {
  background: var(--copio-color-danger);
  color: #fff;
}

/* Viewfinder (Shadow Part: viewfinder) */
.copio-viewfinder,
.copio-viewfinder-stage {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--copio-color-stage-bg);
  overflow: hidden;
  min-height: 0;
  width: 100%;
}

.copio-viewfinder-feed,
.copio-camera-feed {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 20px 104px 20px;
  background: radial-gradient(circle at 50% 45%, #1e293b 0%, #090d14 75%);
}

/* Framing Guide Overlay (receipt | card | a4 | auto) */
.copio-framing-guide {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  border: 1.5px dashed rgba(56, 189, 248, 0.55);
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(4, 7, 12, 0.52);
  transition: all var(--copio-transition-normal);
  overflow: hidden;
}

.copio-framing-guide[data-aspect="receipt"] {
  aspect-ratio: 1 / 2.1;
  height: 100%;
}

.copio-framing-guide[data-aspect="card"] {
  aspect-ratio: 1.586 / 1;
  width: 92%;
  max-height: 82%;
}

.copio-framing-guide[data-aspect="a4"] {
  aspect-ratio: 1 / 1.414;
  height: 96%;
}

.copio-framing-guide[data-aspect="auto"] {
  width: 94%;
  height: 94%;
}

/* Corner Targeting Brackets */
.copio-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--copio-color-primary);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  z-index: 2;
}
.copio-corner.tl { top: 6px; left: 6px; border-top-width: 3px; border-left-width: 3px; border-top-left-radius: 6px; }
.copio-corner.tr { top: 6px; right: 6px; border-top-width: 3px; border-right-width: 3px; border-top-right-radius: 6px; }
.copio-corner.bl { bottom: 6px; left: 6px; border-bottom-width: 3px; border-left-width: 3px; border-bottom-left-radius: 6px; }
.copio-corner.br { bottom: 6px; right: 6px; border-bottom-width: 3px; border-right-width: 3px; border-bottom-right-radius: 6px; }

/* Top Viewfinder HUD Overlay (Step Pill + Privacy Assurance Badge) */
.copio-viewfinder-hud-top {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(to bottom, rgba(7, 10, 15, 0.85), transparent);
}

.copio-step-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--copio-radius-pill);
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(56, 189, 248, 0.45);
  color: #f8fafc;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.copio-privacy-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: var(--copio-radius-pill);
  background: rgba(22, 101, 52, 0.35);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #86efac;
  font-size: 11px;
  font-weight: 500;
}

/* Shutter Dock (Shadow Part: shutter-dock) */
.copio-shutter-dock {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-border);
  min-height: 84px;
  flex-shrink: 0;
}

.copio-shutter-side {
  flex: 1;
  display: flex;
  align-items: center;
}

.copio-shutter-side.right {
  justify-content: flex-end;
}

.copio-shutter-btn {
  appearance: none;
  width: 64px;
  height: 64px;
  border-radius: var(--copio-radius-pill);
  border: 4px solid var(--copio-color-primary);
  background: transparent;
  padding: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--copio-transition-fast), border-color 150ms ease;
  flex-shrink: 0;
}

.copio-shutter-btn:hover {
  transform: scale(1.04);
}

.copio-shutter-btn:active {
  transform: scale(0.94);
}

.copio-shutter-btn-inner,
.copio-shutter-inner {
  width: 100%;
  height: 100%;
  border-radius: var(--copio-radius-pill);
  background: var(--copio-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--copio-color-primary-contrast);
  transition: transform var(--copio-transition-fast);
}

.copio-shutter-btn:active .copio-shutter-btn-inner,
.copio-shutter-btn:active .copio-shutter-inner {
  transform: scale(0.88);
}

/* Stacking Thumbnail Counter Pill in Viewfinder */
.copio-stack-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: var(--copio-touch-target-min);
  padding: 4px 12px 4px 6px;
  border-radius: var(--copio-radius-md);
  background: var(--copio-color-surface-elevated);
  border: 1px solid var(--copio-color-primary);
  color: var(--copio-color-text);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.copio-stack-thumb {
  width: 30px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: #000;
}

/* Workbench & Filmstrip (Shadow Part: workbench) */
.copio-workbench,
.copio-workbench-stage {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background: var(--copio-color-bg);
  overflow: hidden;
  min-height: 0;
  width: 100%;
}

.copio-workbench-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  overflow: hidden;
}

.copio-stage-canvas,
.copio-canvas-viewport {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px 20px 44px 20px;
  background: var(--copio-color-stage-bg);
  min-height: 180px;
}

.copio-canvas-viewport.has-card-switcher {
  padding-top: 66px;
}

.copio-canvas-viewport.is-cropping {
  padding: 74px 26px 26px 26px;
}

/* Card Side Switcher */
.copio-card-side-switcher {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: inline-flex;
  gap: 4px;
  padding: 3px;
  background: var(--copio-color-surface-overlay, rgba(15, 22, 32, 0.88));
  border: 1px solid var(--copio-color-border-strong);
  border-radius: var(--copio-radius-pill);
  backdrop-filter: blur(8px);
}

.copio-side-pill {
  appearance: none;
  border: none;
  background: transparent;
  color: var(--copio-color-text-muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  border-radius: var(--copio-radius-pill);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.copio-side-pill[aria-selected="true"] {
  background: var(--copio-color-primary);
  color: var(--copio-color-primary-contrast);
}

.copio-stage-figure {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}

.copio-stage-canvas img,
.copio-stage-img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: var(--copio-shadow-elevated);
  border-radius: var(--copio-radius-sm);
  user-select: none;
}

.copio-edit-state-bar {
  position: absolute;
  bottom: 10px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 5;
}

.copio-status-chip {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--copio-radius-pill);
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #e2e8f0;
  font-size: 11px;
  font-weight: 500;
  backdrop-filter: blur(6px);
}

/* ==========================================================================
   NON-DESTRUCTIVE CROP OVERLAY (CPO-025)
   ========================================================================== */
.copio-crop-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 8;
  touch-action: none;
}

.copio-crop-box {
  position: absolute;
  border: 2px solid var(--copio-color-primary);
  box-shadow: 0 0 0 9999px rgba(5, 8, 14, 0.68);
  cursor: move;
  touch-action: none;
  box-sizing: border-box;
}

/* Rule-of-thirds crop grid */
.copio-crop-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(56, 189, 248, 0.28) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(56, 189, 248, 0.28) 1px, transparent 1px);
  background-size: 33.333% 33.333%;
}

/* 48px x 48px Touch Target Handles (exceeds 44px requirement) */
.copio-crop-handle {
  position: absolute;
  width: var(--copio-crop-handle-hit);
  height: var(--copio-crop-handle-hit);
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  touch-action: none;
  box-sizing: border-box;
}

.copio-crop-handle::after {
  content: '';
  width: var(--copio-crop-handle-visual);
  height: var(--copio-crop-handle-visual);
  border-radius: 50%;
  background: var(--copio-color-primary);
  border: 2.5px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  transition: transform 120ms ease;
  box-sizing: border-box;
}

.copio-crop-handle:hover::after,
.copio-crop-handle:active::after {
  transform: scale(1.25);
  background: var(--copio-color-success, #22c55e);
}

.copio-crop-handle.nw { top: -24px; left: -24px; cursor: nwse-resize; }
.copio-crop-handle.ne { top: -24px; right: -24px; cursor: nesw-resize; }
.copio-crop-handle.sw { bottom: -24px; left: -24px; cursor: nesw-resize; }
.copio-crop-handle.se { bottom: -24px; right: -24px; cursor: nwse-resize; }
.copio-crop-handle.n  { top: -24px; left: calc(50% - 24px); cursor: ns-resize; }
.copio-crop-handle.s  { bottom: -24px; left: calc(50% - 24px); cursor: ns-resize; }
.copio-crop-handle.w  { left: -24px; top: calc(50% - 24px); cursor: ew-resize; }
.copio-crop-handle.e  { right: -24px; top: calc(50% - 24px); cursor: ew-resize; }

/* Crop Sub-Toolbar Banner */
.copio-crop-banner {
  position: absolute;
  top: 8px;
  left: 12px;
  right: 12px;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 8px;
  background: var(--copio-color-surface-overlay, rgba(15, 23, 42, 0.94));
  border: 1px solid var(--copio-color-primary);
  border-radius: var(--copio-radius-md);
  box-shadow: var(--copio-shadow-elevated);
}

.copio-crop-banner-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--copio-color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copio-crop-banner-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* Filmstrip & Reorder Tray */
.copio-filmstrip,
.copio-filmstrip-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-border);
  overflow-x: auto;
  min-height: 80px;
  flex-shrink: 0;
}

.copio-thumb-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  flex-shrink: 0;
  padding: 4px;
  border-radius: var(--copio-radius-sm);
  background: var(--copio-color-surface-elevated);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
}

.copio-thumb-card[aria-selected="true"] {
  border-color: var(--copio-color-primary);
  background: rgba(56, 189, 248, 0.12);
}

.copio-thumb-card.dragging {
  opacity: 0.4;
  transform: scale(0.95);
}

.copio-thumb-img-wrap {
  width: 48px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copio-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.copio-thumb-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
  font-size: 10px;
  font-weight: 600;
  color: var(--copio-color-text-muted);
}

.copio-filmstrip-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: auto;
}

.copio-add-page-tile {
  min-width: 60px;
  height: 82px;
  padding: 0 8px;
  flex-shrink: 0;
  border-radius: var(--copio-radius-sm);
  border: 1.5px dashed var(--copio-color-border-strong);
  background: transparent;
  color: var(--copio-color-text-muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
}

.copio-add-page-tile:hover {
  border-color: var(--copio-color-primary);
  color: var(--copio-color-primary);
  background: rgba(56, 189, 248, 0.06);
}

/* Edit Action Toolbar & Primary Completion Dock */
.copio-toolbar,
.copio-controls-dock {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-border);
  min-height: 56px;
  flex-shrink: 0;
  z-index: 6;
}

.copio-edit-toolbar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
}

.copio-edit-toolbar.cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.copio-tool-btn {
  appearance: none;
  border: 1px solid var(--copio-color-border);
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-text);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  padding: 4px 6px;
  border-radius: var(--copio-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
}

.copio-tool-btn:hover:not(:disabled) {
  border-color: var(--copio-color-border-strong);
  background: rgba(255, 255, 255, 0.06);
}

.copio-tool-btn[aria-pressed="true"] {
  background: rgba(56, 189, 248, 0.16);
  color: var(--copio-color-primary);
  border-color: var(--copio-color-primary);
}

.copio-tool-btn.danger {
  color: #fca5a5;
}

.copio-tool-btn.danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.16);
  border-color: rgba(239, 68, 68, 0.45);
}

.copio-submit-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.copio-submit-btn {
  flex: 1;
  min-height: 46px;
  font-size: 14px;
}

/* Container-Scoped Toast & Undo Notification */
.copio-toast-region {
  position: absolute;
  bottom: 124px;
  left: 12px;
  right: 12px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.copio-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--copio-radius-md);
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid var(--copio-color-primary);
  box-shadow: var(--copio-shadow-elevated);
  font-size: 12px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.copio-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--copio-color-primary);
  transition: width 100ms linear;
}

.copio-toast-undo-btn {
  appearance: none;
  border: 1px solid rgba(56, 189, 248, 0.45);
  background: rgba(56, 189, 248, 0.16);
  color: #38bdf8;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  padding: 0 12px;
  border-radius: var(--copio-radius-sm);
  cursor: pointer;
  flex-shrink: 0;
}

/* Slide-up OCR Extraction Sheet */
.copio-ocr-sheet {
  position: absolute;
  inset: auto 0 0 0;
  max-height: 78%;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-primary);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.65);
  z-index: 25;
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 10px;
}

.copio-ocr-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.copio-ocr-textarea {
  width: 100%;
  min-height: 130px;
  flex: 1;
  resize: none;
  background: var(--copio-color-bg);
  color: var(--copio-color-text);
  border: 1px solid var(--copio-color-border);
  border-radius: var(--copio-radius-sm);
  padding: 10px;
  font-family: var(--copio-font-mono);
  font-size: 11px;
  line-height: 1.5;
}

/* Container-Scoped Toast Stack */
.sl-toast-stack,
.copio-toast-stack-scoped {
  position: absolute !important;
  top: auto !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  padding: var(--copio-spacing-md) !important;
  box-sizing: border-box !important;
  z-index: 1000 !important;
  pointer-events: none;
}

.sl-toast-stack sl-alert,
.copio-toast-stack-scoped sl-alert {
  pointer-events: auto;
  margin-top: var(--copio-spacing-sm);
}

/* ==========================================================================
   4. @container BREAKPOINTS (Strictly Container Queries)
   ========================================================================== */

/* Modal Breakpoint: <= 400px */
@container copio-scanner (max-width: 400px) {
  .copio-header {
    padding: 6px 10px;
    min-height: 52px;
  }
  .copio-header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .copio-mode-badge {
    font-size: 10px;
    padding: 2px 6px;
  }
  .copio-subtitle {
    display: none;
  }
  .copio-privacy-pill span.hide-compact {
    display: none;
  }
  .copio-crop-banner-text {
    display: none;
  }
  .copio-crop-banner-actions {
    width: 100%;
    justify-content: space-between;
  }
  .copio-filmstrip-bar {
    gap: 6px;
    padding: 6px 8px;
  }
  .copio-thumb-card {
    width: 52px;
    padding: 3px;
  }
  .copio-thumb-img-wrap {
    width: 42px;
    height: 52px;
  }
  .copio-filmstrip-actions {
    gap: 4px;
  }
  .copio-add-page-tile {
    min-width: 52px;
    height: 70px;
    padding: 0 6px;
    font-size: 10px;
  }
  .copio-tool-btn {
    font-size: 10px;
    padding: 3px 4px;
  }
  .copio-btn {
    padding: 0 8px;
    font-size: 12px;
  }
}

/* Drawer Breakpoint: 401px..767px */
@container copio-scanner (min-width: 401px) and (max-width: 767px) {
  .copio-header {
    padding: var(--copio-spacing-sm) var(--copio-spacing-md);
  }
  .copio-tool-btn {
    flex-direction: row;
    font-size: 12px;
    gap: 6px;
  }
}

/* Full View Breakpoint: >= 768px */
@container copio-scanner (min-width: 768px) {
  .copio-header {
    padding: var(--copio-spacing-md) var(--copio-spacing-lg);
  }
  .copio-workbench-main {
    flex-direction: row;
  }
  .copio-filmstrip-bar {
    order: -1;
    flex-direction: column;
    width: 168px;
    height: 100%;
    border-top: none;
    border-right: 1px solid var(--copio-color-border);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px;
  }
  .copio-thumb-card {
    width: 100%;
    padding: 8px;
  }
  .copio-thumb-img-wrap {
    width: 100%;
    height: 110px;
  }
  .copio-filmstrip-actions {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 0;
  }
}
`,Ne=null;function so(){if(Ne)return Ne;if(typeof CSSStyleSheet<"u"&&typeof Document<"u"&&"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype)try{return Ne=new CSSStyleSheet,Ne.replaceSync(Ct),Ne}catch{return null}return null}function lo(i){if(!i)return;let e=so();if(e&&"adoptedStyleSheets"in i){let t=i.adoptedStyleSheets||[];t.includes(e)||(i.adoptedStyleSheets=[...t,e])}else if(!i.querySelector("style[data-copio-encapsulated-styles]")){let t=document.createElement("style");t.setAttribute("data-copio-encapsulated-styles",""),t.textContent=Ct,i.appendChild(t)}}var Lo=typeof HTMLElement<"u"?HTMLElement:class{},Dt=class extends Lo{#e=null;#t=null;#l=null;#p=!1;#i="viewfinder";#o=0;#s=!1;#r=null;#a=null;#f=0;#u=null;#g=null;get#c(){return this.docId?this.docId:(this.#g||(this.#g=`doc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`),this.#g)}static get observedAttributes(){return["mode","aspect","stage","doc-id","features","export-formats","ocr-languages","max-pages","asset-base","license-key","theme","ocr","pdf"]}constructor(){super(),typeof this.attachShadow=="function"&&this.attachShadow({mode:"open"}),this.#d()}#d(){let e={storage:this.#t};typeof this.getAttribute=="function"&&(this.hasAttribute("features")&&(e.features=this.getAttribute("features")),this.hasAttribute("export-formats")&&(e.exportFormats=this.getAttribute("export-formats")),this.hasAttribute("ocr-languages")&&(e.ocrLanguages=this.getAttribute("ocr-languages")),this.hasAttribute("max-pages")&&(e.maxPages=this.getAttribute("max-pages")),this.hasAttribute("asset-base")&&(e.assetBase=this.getAttribute("asset-base")),this.hasAttribute("license-key")&&(e.licenseKey=this.getAttribute("license-key")),this.hasAttribute("ocr")&&(e.ocr=this.getAttribute("ocr")!=="false"),this.hasAttribute("pdf")&&(e.pdf=this.getAttribute("pdf")!=="false")),this.#e=new at(e)}connectedCallback(){this.shadowRoot&&(lo(this.shadowRoot),this.#S()),typeof Ce=="function"&&typeof document<"u"&&st()===document.body&&Ce(this.shadowRoot?.querySelector(".copio-scanner-container")||this),this.#e&&(this.#l=this.#e.subscribe(async()=>{let e=await this.getPages();this.dispatch(R.PAGES_CHANGED,{pages:e,docId:this.docId}),this.#n()})),this.hasAttribute&&this.hasAttribute("asset-base")&&Ot(this.getAttribute("asset-base")),this.#h(),this.#n()}disconnectedCallback(){if(typeof this.#l=="function"&&(this.#l(),this.#l=null),this.#a&&(clearInterval(this.#a),this.#a=null),typeof Ce=="function"&&typeof document<"u"){let e=this.shadowRoot?.querySelector(".copio-scanner-container")||this;st()===e&&Ce(null)}}attributeChangedCallback(e,t,o){if(!(t===o||!this.#e))switch(e){case"features":this.#e.setFeatures(o),this.#h();break;case"export-formats":this.#e.exportFormats=o,this.#h();break;case"ocr-languages":this.#e.ocrLanguages=o;break;case"asset-base":this.#e.assetBase=o;break;case"license-key":this.#e.licenseKey=o;break;case"ocr":this.#e.ocr=o!=="false",this.#h();break;case"pdf":this.#e.pdf=o!=="false",this.#h();break;case"stage":if(o==="viewfinder"||o==="workbench"){this.#i=o;let r=this.shadowRoot;if(r){let n=r.getElementById("viewfinder-section"),a=r.getElementById("workbench-section");n&&a&&(n.style.display=o==="viewfinder"?"flex":"none",a.style.display=o==="workbench"?"flex":"none")}this.#n()}break;case"max-pages":this.#e.maxPages=o,this.#n();break;case"mode":case"aspect":case"theme":this.#n();break}}#h(){if(typeof this.querySelectorAll!="function")return;let e=[];this.shadowRoot&&e.push(this.shadowRoot),e.push(this);for(let t of e){let o=t.querySelectorAll("copio-carousel, copio-row, copio-images");for(let r of o)"ocr"in r&&(r.ocr=this.ocrEnabled),"pdf"in r&&(r.pdf=this.pdf)}}#S(){if(!this.shadowRoot||this.shadowRoot.innerHTML)return;let e="Align Document Inside Frame";this.aspect==="card"?e="Step 1 of 2: Capture Front of ID Card":this.mode==="batch"&&(e="Batch Capture \xB7 Page 1"),this.shadowRoot.innerHTML=`
      <div class="copio-scanner-container copio-scanner-host" part="scanner-root">
        <header class="copio-header" part="header">
          <div class="copio-header-left">
            <span class="copio-mode-badge" id="mode-badge">${(this.mode||"single").toUpperCase()}</span>
            <div class="copio-title-group">
              <h2 class="copio-title" id="header-title">Copio Scanner</h2>
              <p class="copio-subtitle" id="header-subtitle">Non-destructive mobile document scanner</p>
            </div>
          </div>
          <div class="copio-header-actions" part="header-actions">
            <div class="copio-stage-tabs" role="tablist" aria-label="Scanner Stage">
              <button type="button" class="copio-stage-tab" id="tab-viewfinder" role="tab" aria-selected="true">Camera</button>
              <button type="button" class="copio-stage-tab" id="tab-workbench" role="tab" aria-selected="false">Workbench</button>
            </div>
            <slot name="header-actions"></slot>
          </div>
        </header>

        <!-- Viewfinder Stage -->
        <div class="copio-viewfinder copio-viewfinder-stage" part="viewfinder" id="viewfinder-section">
          <div class="copio-viewfinder-hud-top">
            <div class="copio-step-pill" id="step-pill">
              <span class="copio-status-dot"></span>
              <span id="step-pill-text">${e}</span>
            </div>
            <div class="copio-privacy-pill" title="100% Local On-Device Processing">
              <span>\u{1F512} 100% Local</span>
            </div>
          </div>

          <div class="copio-camera-feed" id="camera-feed">
            <slot name="viewfinder">
              <div class="copio-framing-guide" id="framing-guide" data-aspect="${this.aspect}">
                <span class="copio-corner tl"></span>
                <span class="copio-corner tr"></span>
                <span class="copio-corner bl"></span>
                <span class="copio-corner br"></span>
                <div class="copio-edge-quad"></div>
                <div class="copio-camera-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span>Position document within guide lines</span>
                </div>
              </div>
            </slot>
          </div>

          <div class="copio-shutter-dock" part="shutter-dock">
            <div class="copio-shutter-side left">
              <button type="button" class="copio-btn copio-btn-secondary" id="btn-import-file" title="Import image from file">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Import</span>
              </button>
            </div>

            <slot name="shutter-dock">
              <button type="button" class="copio-shutter-btn" id="btn-shutter" aria-label="Capture page">
                <span class="copio-shutter-btn-inner"></span>
              </button>
            </slot>

            <div class="copio-shutter-side right">
              <button type="button" class="copio-stack-pill" id="btn-review" title="Review pages" style="display:none;">
                <span id="review-pill-text">Review (0) \u2192</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Workbench Stage -->
        <div class="copio-workbench copio-workbench-stage" part="workbench" id="workbench-section" style="display: none;">
          <div class="copio-workbench-main">
            <div class="copio-canvas-viewport" id="canvas-viewport">
              <div class="copio-card-side-switcher" id="card-side-switcher" style="display:none;" role="tablist" aria-label="Card side switcher">
                <button type="button" role="tab" class="copio-side-pill active" id="btn-card-front" aria-selected="true">1. Front Side</button>
                <button type="button" role="tab" class="copio-side-pill" id="btn-card-back" aria-selected="false">2. Back Side</button>
              </div>

              <div class="copio-canvas-wrapper" id="canvas-wrapper">
                <img id="stage-img" class="copio-stage-image" alt="Active document page" />
              </div>
            </div>

            <!-- Filmstrip Tray -->
            <div class="copio-filmstrip" id="filmstrip-tray" part="filmstrip">
              <div class="copio-filmstrip-scroll" id="filmstrip-scroll">
                <slot name="filmstrip"></slot>
              </div>
            </div>
          </div>

          <!-- Bottom Action Toolbar -->
          <footer class="copio-toolbar" part="toolbar" id="workbench-toolbar">
            <div class="copio-toolbar-tools">
              <button type="button" class="copio-tool-btn" id="btn-retake" title="Retake page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 4v6h-6M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                <span>Retake</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-crop" title="Adjust crop">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
                  <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
                </svg>
                <span id="crop-btn-label">Crop</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-rotate" title="Rotate 90\xB0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Rotate</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-filter-bw" title="Toggle B&W filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/>
                </svg>
                <span>B&W</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-ocr" title="Recognize text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
                </svg>
                <span>OCR</span>
              </button>

              <button type="button" class="copio-tool-btn copio-btn-danger" id="btn-delete" title="Delete active page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                <span>Delete</span>
              </button>
            </div>

            <div class="copio-toolbar-actions">
              <slot name="toolbar">
                <button type="button" class="copio-btn copio-btn-primary" id="btn-primary-complete">
                  \u2713 Use Photo
                </button>
              </slot>
            </div>
          </footer>

          <!-- Scoped OCR Slide-out / Bottom Sheet -->
          <div class="copio-ocr-sheet" id="ocr-sheet" style="display:none;" part="ocr-sheet">
            <div class="copio-ocr-header">
              <strong class="copio-ocr-title">Text Recognition (OCR)</strong>
              <button type="button" class="copio-btn copio-btn-secondary" id="btn-close-ocr">\u2715</button>
            </div>
            <div class="copio-ocr-body" id="ocr-body">
              <p class="copio-ocr-placeholder">Select text or extract full page data...</p>
            </div>
          </div>

          <!-- Container-scoped Toast Region (5s undo) -->
          <div class="copio-toast-region" id="toast-region" aria-live="polite"></div>
        </div>

        <!-- Hidden input for file picker fallback -->
        <input type="file" id="internal-file-input" accept="image/*" style="display: none;" />
        <slot></slot>
      </div>
    `,this.#k()}#k(){let e=this.shadowRoot;if(!e)return;e.getElementById("tab-viewfinder")?.addEventListener("click",()=>{this.stage="viewfinder"}),e.getElementById("tab-workbench")?.addEventListener("click",()=>{this.stage="workbench"});let t=e.getElementById("internal-file-input");e.getElementById("btn-import-file")?.addEventListener("click",()=>{t?.click()}),t?.addEventListener("change",async o=>{let r=o.target;r.files&&r.files.length>0&&(await this.addFiles(r.files),r.value="",this.stage="workbench")}),e.getElementById("btn-shutter")?.addEventListener("click",async()=>{await this.#I()}),e.getElementById("btn-review")?.addEventListener("click",()=>{this.stage="workbench"}),e.getElementById("btn-retake")?.addEventListener("click",()=>{this.#s=!1,this.stage="viewfinder"}),e.getElementById("btn-rotate")?.addEventListener("click",async()=>{await this.#y()}),e.getElementById("btn-filter-bw")?.addEventListener("click",async()=>{await this.#w()}),e.getElementById("btn-crop")?.addEventListener("click",async()=>{await this.#x()}),e.getElementById("btn-delete")?.addEventListener("click",async()=>{await this.#E()}),e.getElementById("btn-ocr")?.addEventListener("click",async()=>{await this.#T()}),e.getElementById("btn-close-ocr")?.addEventListener("click",()=>{this.#P()}),e.getElementById("btn-primary-complete")?.addEventListener("click",async()=>{await this.#_()}),e.getElementById("btn-card-front")?.addEventListener("click",()=>{this.#o=0,this.#n()}),e.getElementById("btn-card-back")?.addEventListener("click",()=>{this.#o=1,this.#n()}),this.#m()}#m(){let e=this.shadowRoot;if(!e)return;let t=e.getElementById("crop-box"),o=e.querySelectorAll(".copio-crop-handle");if(!t||o.length===0)return;let r=null,n=0,a=0,s=null,l=d=>{let f=d.target.closest(".copio-crop-handle");f&&(d.preventDefault(),d.stopPropagation(),r=f.getAttribute("data-handle"),n=d.clientX,a=d.clientY,s=this.#r?{...this.#r}:{x:.05,y:.05,w:.9,h:.9},window.addEventListener("pointermove",c),window.addEventListener("pointerup",h))},c=d=>{if(!r||!s)return;let w=e.getElementById("canvas-viewport")?.getBoundingClientRect()||{width:300,height:400},u=(d.clientX-n)/Math.max(w.width,1),y=(d.clientY-a)/Math.max(w.height,1),{x:k,y:I,w:S,h:C}=s;if(r.includes("w")){let b=Math.min(Math.max(0,k+u),k+S-.1);S+=k-b,k=b}if(r.includes("e")&&(S=Math.min(Math.max(.1,S+u),1-k)),r.includes("n")){let b=Math.min(Math.max(0,I+y),I+C-.1);C+=I-b,I=b}r.includes("s")&&(C=Math.min(Math.max(.1,C+y),1-I)),this.#r={x:k,y:I,w:S,h:C},this.#b()},h=()=>{r=null,s=null,window.removeEventListener("pointermove",c),window.removeEventListener("pointerup",h)};o.forEach(d=>{d.addEventListener("pointerdown",l)})}#b(){let e=this.shadowRoot;if(!e||!this.#r)return;let t=e.getElementById("crop-box");t&&(t.style.left=`${(this.#r.x*100).toFixed(1)}%`,t.style.top=`${(this.#r.y*100).toFixed(1)}%`,t.style.width=`${(this.#r.w*100).toFixed(1)}%`,t.style.height=`${(this.#r.h*100).toFixed(1)}%`)}async#n(){if(this.shadowRoot)return this.#u?this.#u:(this.#u=(async()=>{try{await Promise.resolve(),await this.#C()}finally{this.#u=null}})(),this.#u)}async#C(){if(this.shadowRoot)try{let e=await this.getPages(),t=this.shadowRoot,o=t.getElementById("mode-badge");o&&(o.textContent=(this.mode||"single").toUpperCase());let r=t.getElementById("tab-viewfinder"),n=t.getElementById("tab-workbench");r&&r.setAttribute("aria-selected",String(this.#i==="viewfinder")),n&&n.setAttribute("aria-selected",String(this.#i==="workbench"));let a=t.getElementById("viewfinder-section"),s=t.getElementById("workbench-section");a&&s&&(this.#i==="viewfinder"?(a.style.display="flex",s.style.display="none"):(a.style.display="none",s.style.display="flex"));let l=t.getElementById("framing-guide");l&&l.setAttribute("data-aspect",this.aspect||"auto");let c=t.getElementById("step-pill-text");c&&(this.aspect==="card"&&this.maxPages===2?c.textContent=e.length===0?"Step 1 of 2: Capture Front of ID Card":"Step 2 of 2: Capture Back of ID Card":this.mode==="batch"?c.textContent=`Batch Capture \xB7 Page ${e.length+1}`:c.textContent="Align Document Inside Frame");let h=t.getElementById("btn-review"),d=t.getElementById("review-pill-text");if(h&&d&&(e.length>0?(h.style.display="inline-flex",d.textContent=`Review (${e.length}) \u2192`):h.style.display="none"),e.length===0){this.#i==="workbench"&&(this.stage="viewfinder");return}this.#o>=e.length&&(this.#o=Math.max(0,e.length-1));let f=e[this.#o],w=t.getElementById("card-side-switcher");if(w){let I=this.aspect==="card"&&(this.maxPages===2||e.length<=2);w.style.display=I?"flex":"none";let S=t.getElementById("btn-card-front"),C=t.getElementById("btn-card-back");S&&(S.classList.toggle("active",this.#o===0),S.setAttribute("aria-selected",String(this.#o===0))),C&&(C.classList.toggle("active",this.#o===1),C.setAttribute("aria-selected",String(this.#o===1)))}let u=t.getElementById("crop-layer");if(this.#s){if(!u){let I=t.getElementById("canvas-wrapper");u=document.createElement("div"),u.className="copio-crop-layer",u.id="crop-layer",u.innerHTML=`
            <div class="copio-crop-box" id="crop-box">
              <span class="copio-crop-handle nw" data-handle="nw"></span>
              <span class="copio-crop-handle ne" data-handle="ne"></span>
              <span class="copio-crop-handle se" data-handle="se"></span>
              <span class="copio-crop-handle sw" data-handle="sw"></span>
              <span class="copio-crop-handle edge-n" data-handle="n"></span>
              <span class="copio-crop-handle edge-e" data-handle="e"></span>
              <span class="copio-crop-handle edge-s" data-handle="s"></span>
              <span class="copio-crop-handle edge-w" data-handle="w"></span>
            </div>
          `,I?.appendChild(u),this.#m()}u.style.display="block",this.#r=f.edits?.crop||{x:.05,y:.05,w:.9,h:.9},this.#b()}else u&&u.remove();let y=t.getElementById("crop-btn-label");y&&(y.textContent=this.#s?"Apply":"Crop");let k=t.getElementById("btn-primary-complete");k&&(this.aspect==="card"&&this.maxPages===2&&e.length===1?k.textContent="Next: Capture Back (Step 2/2) \u2192":this.aspect==="card"&&e.length>=2?k.textContent="\u2713 Complete ID Scan (2 Sides)":this.mode==="batch"?k.textContent=`\u2713 Complete Scan (${e.length} Pages)`:k.textContent="\u2713 Use Photo"),this.#D(e)}catch{}}#D(e){let t=this.shadowRoot;if(!t)return;let o=t.getElementById("filmstrip-scroll");o&&(o.innerHTML="",e.forEach((r,n)=>{let a=document.createElement("div");a.className=`copio-filmstrip-item ${n===this.#o?"is-active":""}`,a.setAttribute("data-index",String(n)),a.innerHTML=`
        <div class="copio-thumb-container">
          <img src="${r.src||r.originalSrc}" alt="Page ${n+1}" class="copio-thumb-img" />
          <span class="copio-thumb-num">${n+1}</span>
        </div>
        ${this.mode==="batch"?`
          <div class="copio-thumb-reorder">
            <button type="button" class="copio-reorder-btn move-left" title="Move Left" ${n===0?"disabled":""}>\u25C0</button>
            <button type="button" class="copio-reorder-btn move-right" title="Move Right" ${n===e.length-1?"disabled":""}>\u25B6</button>
          </div>
        `:""}
      `,a.querySelector(".copio-thumb-container")?.addEventListener("click",()=>{this.#o=n,this.#s=!1,this.#n()}),this.mode==="batch"&&(a.querySelector(".move-left")?.addEventListener("click",async s=>{s.stopPropagation(),await this.#v(n,n-1)}),a.querySelector(".move-right")?.addEventListener("click",async s=>{s.stopPropagation(),await this.#v(n,n+1)})),o.appendChild(a)}))}async#v(e,t){let o=await this.getPages();if(t<0||t>=o.length||e===t)return;let r=o.map(a=>a.id),[n]=r.splice(e,1);r.splice(t,0,n),await this.#e.reorderPages(this.#c,r),this.#o=t,this.#n()}async#I(){let t=this.shadowRoot?.getElementById("internal-file-input");t&&typeof t.click=="function"&&t.click()}async#y(){let t=(await this.getPages())[this.#o];if(!t)return;let r=((t.edits?.rotate||0)+90)%360;await this.#e.applyEdit(this.#c,t.id,{rotate:r}),await this.#n()}async#w(){let t=(await this.getPages())[this.#o];if(!t)return;let r=(t.edits?.filter||"none")==="bw"?"none":"bw";await this.#e.applyEdit(this.#c,t.id,{filter:r}),await this.#n()}async#x(){let t=(await this.getPages())[this.#o];if(t){if(this.#s){this.#s=!1;let o=this.#r;this.#r=null,o&&await this.#e.applyEdit(this.#c,t.id,{crop:o})}else this.#s=!0;await this.#n()}}async#E(){let e=await this.getPages(),t=e[this.#o];if(!t)return;let o=t.id;await this.#e.deletePage(this.#c,o),this.dispatch(R.PAGE_REMOVED,{pageId:o,docId:this.docId}),this.#o>=e.length-1&&(this.#o=Math.max(0,e.length-2)),this.#A(),await this.#n()}#A(){let e=this.shadowRoot;if(!e)return;let t=e.getElementById("toast-region");if(!t)return;this.#a&&clearInterval(this.#a),this.#f=5;let o=()=>{t.innerHTML=`
        <div class="copio-toast copio-toast-undo">
          <span>Page deleted</span>
          <button type="button" class="copio-btn-toast-undo" id="btn-toast-undo">
            Undo (${this.#f}s)
          </button>
        </div>
      `,e.getElementById("btn-toast-undo")?.addEventListener("click",async()=>{clearInterval(this.#a),this.#a=null,t.innerHTML="",await this.#e.undo(this.#c),await this.#n()})};o(),this.#a=setInterval(()=>{this.#f-=1,this.#f<=0?(clearInterval(this.#a),this.#a=null,t.innerHTML=""):o()},1e3)}async#T(){let e=this.shadowRoot;if(!e)return;let t=e.getElementById("ocr-sheet"),o=e.getElementById("ocr-body");if(!(!t||!o)){t.style.display="block",o.innerHTML='<p class="copio-ocr-loading">Recognizing text...</p>';try{let n=(await this.getPages())[this.#o],a=await this.ocr(n?.id||null);o.innerHTML=`
        <div class="copio-ocr-content">
          <pre class="copio-ocr-text">${a.text||"No text detected."}</pre>
          <div class="copio-ocr-meta">
            <span>Confidence: ${Math.round((a.averageConfidence||0)*100)}%</span>
          </div>
        </div>
      `}catch(r){o.innerHTML=`<p class="copio-ocr-error">OCR recognition failed: ${r.message}</p>`}}}#P(){let e=this.shadowRoot;if(!e)return;let t=e.getElementById("ocr-sheet");t&&(t.style.display="none")}async#_(){let e=await this.getPages();if(this.aspect==="card"&&this.maxPages===2&&e.length===1){this.stage="viewfinder";return}let t=e.map((r,n)=>({id:r.id,pageNumber:n+1,label:r.label||`Page ${n+1}`,originalSrc:r.originalSrc,src:r.src,originalPreserved:!0,dimensions:{width:r.width||0,height:r.height||0},edits:r.edits||{crop:{x:0,y:0,w:1,h:1},rotate:0,filter:"none"},ocrText:r.ocrText||null,blob:r.blob||null})),o={mode:this.mode,aspect:this.aspect,docId:this.docId,pageCount:t.length,pages:t};this.mode==="single"&&(o.page=t[0]||null,this.maxPages>1&&(o.maxPages=this.maxPages)),this.dispatch(R.SCAN_COMPLETE,o)}get theme(){return typeof this.getAttribute=="function"&&this.getAttribute("theme")||"dark"}set theme(e){typeof this.setAttribute=="function"&&(e?this.setAttribute("theme",e):this.removeAttribute("theme"))}get mode(){return typeof this.getAttribute=="function"&&this.getAttribute("mode")||"document"}set mode(e){typeof this.setAttribute=="function"&&this.setAttribute("mode",e)}get aspect(){return typeof this.getAttribute=="function"&&this.getAttribute("aspect")||"auto"}set aspect(e){typeof this.setAttribute=="function"&&this.setAttribute("aspect",e)}get stage(){return this.#i}set stage(e){if(e==="viewfinder"||e==="workbench"){this.#i=e,typeof this.setAttribute=="function"&&this.getAttribute("stage")!==e&&this.setAttribute("stage",e);let t=this.shadowRoot;if(t){let o=t.getElementById("viewfinder-section"),r=t.getElementById("workbench-section");o&&r&&(o.style.display=e==="viewfinder"?"flex":"none",r.style.display=e==="workbench"?"flex":"none")}this.#n()}}get docId(){return typeof this.getAttribute=="function"?this.getAttribute("doc-id"):null}set docId(e){typeof this.setAttribute=="function"&&(e?this.setAttribute("doc-id",e):this.removeAttribute("doc-id"))}async rotateActivePage(){return this.#y()}async toggleActivePageBw(){return this.#w()}async toggleCropMode(){return this.#x()}async deleteActivePageWithUndo(){return this.#E()}get features(){return this.#e?this.#e.features:[]}set features(e){if(typeof this.setAttribute=="function"){let t=Array.isArray(e)?e.join(" "):String(e||"");this.setAttribute("features",t)}this.#e&&this.#e.setFeatures(e)}hasFeature(e){return this.#e?this.#e.hasFeature(e):!1}get ocrEnabled(){return this.#e?this.#e.ocr:!0}set ocrEnabled(e){let t=!!e;typeof this.setAttribute=="function"&&this.setAttribute("ocr",t?"true":"false"),this.#e&&(this.#e.ocr=t),this.#h()}get pdf(){return this.#e?this.#e.pdf:!0}set pdf(e){let t=!!e;typeof this.setAttribute=="function"&&this.setAttribute("pdf",t?"true":"false"),this.#e&&(this.#e.pdf=t),this.#h()}get exportFormats(){return this.#e?this.#e.exportFormats:[]}set exportFormats(e){if(typeof this.setAttribute=="function"){let t=Array.isArray(e)?e.join(","):String(e||"");this.setAttribute("export-formats",t)}this.#e&&(this.#e.exportFormats=e)}get ocrLanguages(){return this.#e?this.#e.ocrLanguages:[]}set ocrLanguages(e){if(typeof this.setAttribute=="function"){let t=Array.isArray(e)?e.join(","):String(e||"");this.setAttribute("ocr-languages",t)}this.#e&&(this.#e.ocrLanguages=e)}get maxPages(){return this.#e?this.#e.maxPages:0}set maxPages(e){typeof this.setAttribute=="function"&&this.setAttribute("max-pages",String(e)),this.#e&&(this.#e.maxPages=e)}get assetBase(){return this.#e?this.#e.assetBase:""}set assetBase(e){typeof this.setAttribute=="function"&&this.setAttribute("asset-base",String(e||"")),this.#e&&(this.#e.assetBase=e)}get licenseKey(){return this.#e?this.#e.licenseKey:""}set licenseKey(e){typeof this.setAttribute=="function"&&this.setAttribute("license-key",String(e||"")),this.#e&&(this.#e.licenseKey=e)}get storage(){return this.#t}set storage(e){this.#t=e,this.#e&&this.#e.setStorage(e)}get engine(){return this.#e}set engine(e){e instanceof at&&(this.#e=e)}dispatch(e,t={}){return Nt(this,e,t)}async open(){this.#p=!0,typeof this.focus=="function"&&this.focus()}async close(){this.#p=!1}get isOpen(){return this.#p}async capture(){return new Promise(e=>{let t=document.createElement("input");t.type="file",t.accept="image/*",t.capture="environment",t.style.display="none",t.onchange=async()=>{try{if(t.files&&t.files.length>0){let o=await this.addFiles([t.files[0]]);e(o[0]||null)}else e(null)}catch(o){this.dispatch(R.ERROR,{code:"CAPTURE_FAILED",message:o.message,error:o}),e(null)}finally{t.remove()}},t.onerror=()=>{t.remove(),e(null)},document.body.appendChild(t),t.click()})}async addFiles(e){try{let t=await this.#e.addFiles(e,this.#c);for(let r=0;r<t.length;r++)this.dispatch(R.PAGE_ADDED,{page:t[r],pageNumber:r+1,docId:this.docId,source:"file"});let o=await this.getPages();return this.dispatch(R.PAGES_CHANGED,{pages:o,docId:this.docId}),this.mode==="single"&&t.length>0&&this.maxPages<=1&&this.dispatch(R.SCAN_COMPLETE,{mode:this.mode,aspect:this.aspect,docId:this.docId,pages:o,page:o[0]||null,pageCount:o.length}),await this.#n(),t}catch(t){throw this.dispatch(R.ERROR,{code:t.code||"ADD_FILES_FAILED",message:t.message,error:t}),t}}async getPages(){return this.#e.getPages(this.#c)}async clear(){await this.#e.clear(this.#c),this.dispatch(R.PAGES_CHANGED,{pages:[],docId:this.docId}),await this.#n()}async exportPdf(e={}){try{let t=await this.#e.exportPdf(this.#c,e);return this.dispatch(R.EXPORT_COMPLETE,{type:"pdf",format:"pdf",blob:t,docId:this.docId}),t}catch(t){throw this.dispatch(R.ERROR,{code:t.code||"EXPORT_FAILED",message:t.message,error:t}),t}}async exportZip(e={}){try{let t=await this.#e.exportZip(this.#c,e);return this.dispatch(R.EXPORT_COMPLETE,{type:"zip",format:"zip",blob:t,docId:this.docId}),t}catch(t){throw this.dispatch(R.ERROR,{code:t.code||"EXPORT_FAILED",message:t.message,error:t}),t}}async ocr(e=null,t={}){try{let o=await this.#e.runOcr(this.#c,e,t);return this.dispatch(R.OCR_COMPLETE,{text:o.text,pages:o.pagesResults,averageConfidence:o.averageConfidence,docId:this.docId,pageId:e}),o}catch(o){throw this.dispatch(R.ERROR,{code:o.code||"OCR_FAILED",message:o.message,error:o}),o}}async runOcr(e=null,t={}){return this.ocr(e,t)}async sync(e={}){try{return await this.#e.sync({onStateChange:o=>{o&&(o.step==="connected"||o.step==="syncing")&&this.dispatch(R.SYNC_CONNECTED,{peerId:o.peerId,mode:o.mode}),e.onStateChange&&e.onStateChange(o)}})}catch(t){throw this.dispatch(R.ERROR,{code:t.code||"SYNC_FAILED",message:t.message,error:t}),t}}};typeof customElements<"u"&&!customElements.get("copio-scanner")&&customElements.define("copio-scanner",Dt);export{R as a,Nt as b,Je as c,et as d,tt as e,ot as f,it as g,rt as h,Ct as i,so as j,lo as k,Dt as l};
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
//# sourceMappingURL=chunk-QWG526KG.js.map
