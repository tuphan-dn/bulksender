var bulk_sender;(()=>{"use strict";var e={10205:(e,r,_)=>{var t={"./bootstrap":()=>Promise.all([_.e("vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_solana_buffer-layout_lib_Layou-e1f4a8"),_.e("vendors-node_modules_solana_web3_js_lib_index_browser_esm_js"),_.e("vendors-node_modules_sentre_antd-ionicon_dist_customs_js-node_modules_react-helmet_es_Helmet_js"),_.e("vendors-node_modules_sentre_antd-ionicon_dist_index_js-node_modules_sentre_react-lazyload_lib-3dd274"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa"),_.e("webpack_sharing_consume_default_antd_antd"),_.e("src_app_bootstrap_app_tsx")]).then((()=>()=>_(35635)))},s=(e,r)=>(_.R=r,r=_.o(t,e)?t[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),_.R=void 0,r),o=(e,r)=>{if(_.S){var t="default",s=_.S[t];if(s&&s!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return _.S[t]=e,_.I(t,r)}};_.d(r,{get:()=>s,init:()=>o})}},r={};function _(t){var s=r[t];if(void 0!==s)return s.exports;var o=r[t]={id:t,loaded:!1,exports:{}};return e[t].call(o.exports,o,o.exports,_),o.loaded=!0,o.exports}_.m=e,_.c=r,_.amdO={},_.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return _.d(r,{a:r}),r},(()=>{var e,r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;_.t=function(t,s){if(1&s&&(t=this(t)),8&s)return t;if("object"===typeof t&&t){if(4&s&&t.__esModule)return t;if(16&s&&"function"===typeof t.then)return t}var o=Object.create(null);_.r(o);var d={};e=e||[null,r({}),r([]),r(r)];for(var n=2&s&&t;"object"==typeof n&&!~e.indexOf(n);n=r(n))Object.getOwnPropertyNames(n).forEach((e=>d[e]=()=>t[e]));return d.default=()=>t,_.d(o,d),o}})(),_.d=(e,r)=>{for(var t in r)_.o(r,t)&&!_.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},_.f={},_.e=e=>Promise.all(Object.keys(_.f).reduce(((r,t)=>(_.f[t](e,r),r)),[])),_.u=e=>"static/js/"+e+"."+{"vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js":"58b5b1fd",webpack_sharing_consume_default_react_react:"f9c8c1c0","src_os_store_context_ts-_3b660":"affe4253","vendors-node_modules_project-serum_sol-wallet-adapter_dist_esm_index_js-node_modules_iso-rand-ae9fe6":"5f32829e","vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_solana_buffer-layout_lib_Layou-e1f4a8":"06096faa","vendors-node_modules_solana_spl-token-registry_dist_module_index_js":"5d8b0d29","vendors-node_modules_solana_web3_js_lib_index_browser_esm_js":"f80438fe","vendors-node_modules_is-ipfs_src_index_js-node_modules_libp2p-crypto_src_pbkdf2_js-node_modul-e2401a":"be553499","src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-47ddb7":"6a6105cb","webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa":"1c52f737","src_os_store_index_ts-src_shared_dataloader_index_ts":"178394d9",webpack_sharing_consume_default_antd_antd:"143d032d","src_os_providers_index_tsx-src_shared_storage_ts-src_shared_util_ts":"47915f10","vendors-node_modules_antd_es_index_js":"90564267","webpack_sharing_consume_default_react-dom_react-dom":"677c89ca",node_modules_babel_runtime_regenerator_index_js:"d4e1f123","vendors-node_modules_react-dom_index_js":"a3372ba6","vendors-node_modules_react-redux_es_index_js":"cdd961df","vendors-node_modules_react-router_esm_react-router_js":"4d4b15e4","node_modules_react-router-dom_esm_react-router-dom_js-_d6f00":"509db077",node_modules_react_index_js:"9a6909f2","vendors-node_modules_sentre_antd-ionicon_dist_customs_js-node_modules_react-helmet_es_Helmet_js":"b0dda67d","vendors-node_modules_sentre_antd-ionicon_dist_index_js-node_modules_sentre_react-lazyload_lib-3dd274":"70e25beb",src_app_bootstrap_app_tsx:"58edd070","src_os_store_context_ts-_3b661":"244cc965","vendors-node_modules_is-ipfs_src_index_js-node_modules_libp2p-crypto_src_pbkdf2_js-node_modul-7f16ed":"becc8232",src_os_providers_index_tsx:"b4405ef5"}[e]+".chunk.js",_.miniCssF=e=>"static/css/"+e+".6a114c17.chunk.css",_.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),_.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={},r="bulk_sender:";_.l=(t,s,o,d)=>{if(e[t])e[t].push(s);else{var n,a;if(void 0!==o)for(var l=document.getElementsByTagName("script"),i=0;i<l.length;i++){var u=l[i];if(u.getAttribute("src")==t||u.getAttribute("data-webpack")==r+o){n=u;break}}n||(a=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,_.nc&&n.setAttribute("nonce",_.nc),n.setAttribute("data-webpack",r+o),n.src=t),e[t]=[s];var c=(r,_)=>{n.onerror=n.onload=null,clearTimeout(m);var s=e[t];if(delete e[t],n.parentNode&&n.parentNode.removeChild(n),s&&s.forEach((e=>e(_))),r)return r(_)},m=setTimeout(c.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=c.bind(null,n.onerror),n.onload=c.bind(null,n.onload),a&&document.head.appendChild(n)}}})(),_.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},_.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),_.j="bulk_sender",(()=>{_.S={};var e={},r={};_.I=(t,s)=>{s||(s=[]);var o=r[t];if(o||(o=r[t]={}),!(s.indexOf(o)>=0)){if(s.push(o),e[t])return e[t];_.o(_.S,t)||(_.S[t]={});var d=_.S[t],n="bulk_sender",a=(e,r,_,t)=>{var s=d[e]=d[e]||{},o=s[r];(!o||!o.loaded&&(!t!=!o.eager?t:n>o.from))&&(s[r]={get:_,from:n,eager:!!t})},l=[];if("default"===t)a("@reduxjs/toolkit","1.8.2",(()=>_.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>_(57853))))),a("@senhub/context","2.2.1",(()=>Promise.all([_.e("webpack_sharing_consume_default_react_react"),_.e("src_os_store_context_ts-_3b660")]).then((()=>()=>_(23320))))),a("@senhub/providers","2.2.1",(()=>Promise.all([_.e("vendors-node_modules_project-serum_sol-wallet-adapter_dist_esm_index_js-node_modules_iso-rand-ae9fe6"),_.e("vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_solana_buffer-layout_lib_Layou-e1f4a8"),_.e("vendors-node_modules_solana_spl-token-registry_dist_module_index_js"),_.e("vendors-node_modules_solana_web3_js_lib_index_browser_esm_js"),_.e("vendors-node_modules_is-ipfs_src_index_js-node_modules_libp2p-crypto_src_pbkdf2_js-node_modul-e2401a"),_.e("webpack_sharing_consume_default_react_react"),_.e("src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-47ddb7"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa"),_.e("src_os_store_index_ts-src_shared_dataloader_index_ts"),_.e("webpack_sharing_consume_default_antd_antd"),_.e("src_os_providers_index_tsx-src_shared_storage_ts-src_shared_util_ts")]).then((()=>()=>_(80039))))),a("antd","4.21.0",(()=>Promise.all([_.e("vendors-node_modules_antd_es_index_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom"),_.e("node_modules_babel_runtime_regenerator_index_js")]).then((()=>()=>_(77145))))),a("react-dom","17.0.2",(()=>Promise.all([_.e("vendors-node_modules_react-dom_index_js"),_.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>_(81108))))),a("react-redux","7.2.8",(()=>Promise.all([_.e("vendors-node_modules_react-redux_es_index_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(59771))))),a("react-router-dom","5.3.3",(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("node_modules_react-router-dom_esm_react-router-dom_js-_d6f00")]).then((()=>()=>_(9402))))),a("react","17.0.2",(()=>_.e("node_modules_react_index_js").then((()=>()=>_(7276)))));return l.length?e[t]=Promise.all(l).then((()=>e[t]=1)):e[t]=1}}})(),(()=>{var e;_.g.importScripts&&(e=_.g.location+"");var r=_.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),_.p=e})(),(()=>{var e=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),_=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),t=_[1]?r(_[1]):[];return _[2]&&(t.length++,t.push.apply(t,r(_[2]))),_[3]&&(t.push([]),t.push.apply(t,r(_[3]))),t},r=(r,_)=>{r=e(r),_=e(_);for(var t=0;;){if(t>=r.length)return t<_.length&&"u"!=(typeof _[t])[0];var s=r[t],o=(typeof s)[0];if(t>=_.length)return"u"==o;var d=_[t],n=(typeof d)[0];if(o!=n)return"o"==o&&"n"==n||"s"==n||"u"==o;if("o"!=o&&"u"!=o&&s!=d)return s<d;t++}},t=e=>{var r=e[0],_="";if(1===e.length)return"*";if(r+.5){_+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var s=1,o=1;o<e.length;o++)s--,_+="u"==(typeof(n=e[o]))[0]?"-":(s>0?".":"")+(s=2,n);return _}var d=[];for(o=1;o<e.length;o++){var n=e[o];d.push(0===n?"not("+a()+")":1===n?"("+a()+" || "+a()+")":2===n?d.pop()+" "+d.pop():t(n))}return a();function a(){return d.pop().replace(/^\((.+)\)$/,"$1")}},s=(r,_)=>{if(0 in r){_=e(_);var t=r[0],o=t<0;o&&(t=-t-1);for(var d=0,n=1,a=!0;;n++,d++){var l,i,u=n<r.length?(typeof r[n])[0]:"";if(d>=_.length||"o"==(i=(typeof(l=_[d]))[0]))return!a||("u"==u?n>t&&!o:""==u!=o);if("u"==i){if(!a||"u"!=u)return!1}else if(a)if(u==i)if(n<=t){if(l!=r[n])return!1}else{if(o?l>r[n]:l<r[n])return!1;l!=r[n]&&(a=!1)}else if("s"!=u&&"n"!=u){if(o||n<=t)return!1;a=!1,n--}else{if(n<=t||i<u!=o)return!1;a=!1}else"s"!=u&&"n"!=u&&(a=!1,n--)}}var c=[],m=c.pop.bind(c);for(d=1;d<r.length;d++){var f=r[d];c.push(1==f?m()|m():2==f?m()&m():f?s(f,_):!m())}return!!m()},o=(e,_)=>{var t=e[_];return Object.keys(t).reduce(((e,_)=>!e||!t[e].loaded&&r(e,_)?_:e),0)},d=(e,r,_,s)=>"Unsatisfied version "+_+" from "+(_&&e[r][_].from)+" of shared singleton module "+r+" (required "+t(s)+")",n=(e,r,_,t)=>{var n=o(e,_);return s(t,n)||"undefined"!==typeof console&&console.warn&&console.warn(d(e,_,n,t)),a(e[_][n])},a=e=>(e.loaded=1,e.get()),l=e=>function(r,t,s,o){var d=_.I(r);return d&&d.then?d.then(e.bind(e,r,_.S[r],t,s,o)):e(r,_.S[r],t,s,o)},i=l(((e,r,t,s,o)=>r&&_.o(r,t)?n(r,0,t,s):o())),u={},c={92950:()=>i("default","react",[1,17,0,2],(()=>_.e("node_modules_react_index_js").then((()=>()=>_(7276))))),48128:()=>i("default","@senhub/context",[4,2,2,1],(()=>_.e("src_os_store_context_ts-_3b661").then((()=>()=>_(23320))))),55754:()=>i("default","react-redux",[1,7,2,5],(()=>Promise.all([_.e("vendors-node_modules_react-redux_es_index_js"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(59771))))),19289:()=>i("default","@reduxjs/toolkit",[1,1,6,2],(()=>_.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>_(57853))))),32659:()=>i("default","antd",[1,4,20,2],(()=>Promise.all([_.e("vendors-node_modules_antd_es_index_js"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(77145))))),12181:()=>i("default","react-dom",[1,17,0,2],(()=>_.e("vendors-node_modules_react-dom_index_js").then((()=>()=>_(81108))))),53836:()=>i("default","@senhub/providers",[4,2,2,1],(()=>Promise.all([_.e("vendors-node_modules_project-serum_sol-wallet-adapter_dist_esm_index_js-node_modules_iso-rand-ae9fe6"),_.e("vendors-node_modules_solana_spl-token-registry_dist_module_index_js"),_.e("vendors-node_modules_is-ipfs_src_index_js-node_modules_libp2p-crypto_src_pbkdf2_js-node_modul-7f16ed"),_.e("src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-47ddb7"),_.e("src_os_providers_index_tsx")]).then((()=>()=>_(80039)))))},m={webpack_sharing_consume_default_react_react:[92950],"src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-47ddb7":[48128],"webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa":[55754,19289],webpack_sharing_consume_default_antd_antd:[32659],"webpack_sharing_consume_default_react-dom_react-dom":[12181],src_app_bootstrap_app_tsx:[53836]};_.f.consumes=(e,r)=>{_.o(m,e)&&m[e].forEach((e=>{if(_.o(u,e))return r.push(u[e]);var t=r=>{u[e]=0,_.m[e]=t=>{delete _.c[e],t.exports=r()}},s=r=>{delete u[e],_.m[e]=t=>{throw delete _.c[e],r}};try{var o=c[e]();o.then?r.push(u[e]=o.then(t).catch(s)):t(o)}catch(d){s(d)}}))}})(),(()=>{var e=e=>new Promise(((r,t)=>{var s=_.miniCssF(e),o=_.p+s;if(((e,r)=>{for(var _=document.getElementsByTagName("link"),t=0;t<_.length;t++){var s=(d=_[t]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(s===e||s===r))return d}var o=document.getElementsByTagName("style");for(t=0;t<o.length;t++){var d;if((s=(d=o[t]).getAttribute("data-href"))===e||s===r)return d}})(s,o))return r();((e,r,_,t)=>{var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onerror=s.onload=o=>{if(s.onerror=s.onload=null,"load"===o.type)_();else{var d=o&&("load"===o.type?"missing":o.type),n=o&&o.target&&o.target.href||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.type=d,a.request=n,s.parentNode.removeChild(s),t(a)}},s.href=r,document.head.appendChild(s)})(e,o,r,t)})),r={bulk_sender:0};_.f.miniCss=(_,t)=>{r[_]?t.push(r[_]):0!==r[_]&&{src_app_bootstrap_app_tsx:1}[_]&&t.push(r[_]=e(_).then((()=>{r[_]=0}),(e=>{throw delete r[_],e})))}})(),(()=>{var e={bulk_sender:0};_.f.j=(r,t)=>{var s=_.o(e,r)?e[r]:void 0;if(0!==s)if(s)t.push(s[2]);else if(/^webpack_sharing_consume_default_(re(act(\-dom_react\-dom|_react)|duxjs_toolkit_reduxjs_toolkit\-webpack_sharing_consume_defau\-3cd5aa)|antd_antd)$/.test(r))e[r]=0;else{var o=new Promise(((_,t)=>s=e[r]=[_,t]));t.push(s[2]=o);var d=_.p+_.u(r),n=new Error;_.l(d,(t=>{if(_.o(e,r)&&(0!==(s=e[r])&&(e[r]=void 0),s)){var o=t&&("load"===t.type?"missing":t.type),d=t&&t.target&&t.target.src;n.message="Loading chunk "+r+" failed.\n("+o+": "+d+")",n.name="ChunkLoadError",n.type=o,n.request=d,s[1](n)}}),"chunk-"+r,r)}};var r=(r,t)=>{var s,o,[d,n,a]=t,l=0;if(d.some((r=>0!==e[r]))){for(s in n)_.o(n,s)&&(_.m[s]=n[s]);if(a)a(_)}for(r&&r(t);l<d.length;l++)o=d[l],_.o(e,o)&&e[o]&&e[o][0](),e[o]=0},t=globalThis.webpackChunkbulk_sender=globalThis.webpackChunkbulk_sender||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var t=_(10205);bulk_sender=t})();
//# sourceMappingURL=index.js.map