/*! For license information please see 262.8b265d6f.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunksenpage=self.webpackChunksenpage||[]).push([[262],{1262:function(e,n,r){r.r(n),r.d(n,{RemoteIonIcon:function(){return f}});var t=r(1413),o=r(5987),c=r(2950),i=r(396),a=r(184),u=["name","className"],s=(0,c.forwardRef)((function(e,n){var r=e.name,c=e.className,i=(0,o.Z)(e,u),s=c?"anticon "+c:"anticon";return(0,a.jsx)("span",(0,t.Z)((0,t.Z)({className:s},i),{},{children:(0,a.jsx)("ion-icon",{ref:n,name:r})}))}));n.default=s;var f=(0,c.forwardRef)((function(e,n){var r=(0,i.oR)({url:"https://descartesnetwork.github.io/senhub/index.js",scope:"senhub",module:"./ionicon"}).default;return(0,a.jsx)(c.Suspense,{fallback:"ionicon",children:(0,a.jsx)(r,(0,t.Z)((0,t.Z)({},e),{},{ref:n}))})}))},1725:function(e){var n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function o(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var n={},r=0;r<10;r++)n["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(n).map((function(e){return n[e]})).join(""))return!1;var t={};return"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},t)).join("")}catch(o){return!1}}()?Object.assign:function(e,c){for(var i,a,u=o(e),s=1;s<arguments.length;s++){for(var f in i=Object(arguments[s]))r.call(i,f)&&(u[f]=i[f]);if(n){a=n(i);for(var l=0;l<a.length;l++)t.call(i,a[l])&&(u[a[l]]=i[a[l]])}}return u}},396:function(e,n,r){r.d(n,{oR:function(){return f}});var t=r(5861),o=r(7757),c=r.n(o),i=(r(184),function(e){var n=e.url,r=e.module;return[n,e.scope,r].join()}),a=function(e){var n=i(e),r=document.getElementById(n);if(r)return window[e.scope]?Promise.resolve(!0):new Promise((function(e){r.onload=function(n){e(!0)}}));var t=document.createElement("script");t.src=e.url,t.type="text/javascript",t.async=!0,t.id=n;var o=new Promise((function(e,n){t.onload=function(){return e(t)},t.onerror=function(e){n(e)}}));return document.head.appendChild(t),o},u=function(e,n,o){return(0,t.Z)(c().mark((function t(){var i,a,u,s;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.I("default");case 3:if((i=window[n]).isInitialized){t.next=8;break}return i.isInitialized=!0,t.next=8,i.init(r.S.default);case 8:return t.next=10,window[n].get(o);case 10:return a=t.sent,u=a(),t.abrupt("return",u);case 15:throw t.prev=15,t.t0=t.catch(0),(s=new Error("There was a problem loading the remote module. Please check the parameters (url: ".concat(e," scope: ").concat(n," module: ").concat(o,")"))).name="RemoteModuleLoadingError",s;case 20:case"end":return t.stop()}}),t,null,[[0,15]])})))},s=function(e){window.remoteObjectDictionary=window.remoteObjectDictionary||{};var n=i(e),r=window.remoteObjectDictionary[n];if(r)return r();var o=function(e){var n,r="pending",t=e.then((function(e){r="success",n=e}),(function(e){r="error",n=e}));return function(){switch(r){case"pending":throw t;case"error":throw n;default:return n}}}(function(e){window.remoteModuleDictionary=window.remoteModuleDictionary||{};var n=i(e);return window.remoteModuleDictionary[n]||(window.remoteModuleDictionary[n]=new Promise(function(){var n=(0,t.Z)(c().mark((function n(r,t){var o;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,a(e);case 3:return n.next=5,u(e.url,e.scope,e.module)();case 5:o=n.sent,r(o),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e,r){return n.apply(this,arguments)}}()),window.remoteModuleDictionary[n])}(e));return window.remoteObjectDictionary[n]=o,o()},f=function(e){return s(e)}},6374:function(e,n,r){r(1725);var t=r(2950),o=60103;if(60107,"function"===typeof Symbol&&Symbol.for){var c=Symbol.for;o=c("react.element"),c("react.fragment")}var i=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a=Object.prototype.hasOwnProperty,u={key:!0,ref:!0,__self:!0,__source:!0};function s(e,n,r){var t,c={},s=null,f=null;for(t in void 0!==r&&(s=""+r),void 0!==n.key&&(s=""+n.key),void 0!==n.ref&&(f=n.ref),n)a.call(n,t)&&!u.hasOwnProperty(t)&&(c[t]=n[t]);if(e&&e.defaultProps)for(t in n=e.defaultProps)void 0===c[t]&&(c[t]=n[t]);return{$$typeof:o,type:e,key:s,ref:f,props:c,_owner:i.current}}n.jsx=s,n.jsxs=s},184:function(e,n,r){e.exports=r(6374)},5987:function(e,n,r){r.d(n,{Z:function(){return o}});var t=r(3366);function o(e,n){if(null==e)return{};var r,o,c=(0,t.Z)(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}},3366:function(e,n,r){function t(e,n){if(null==e)return{};var r,t,o={},c=Object.keys(e);for(t=0;t<c.length;t++)r=c[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}r.d(n,{Z:function(){return t}})}}]);
//# sourceMappingURL=262.8b265d6f.chunk.js.map