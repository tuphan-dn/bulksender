(globalThis.webpackChunkbulk_sender=globalThis.webpackChunkbulk_sender||[]).push([[582],{43379:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Page:()=>ce,Widget:()=>he,widgetConfig:()=>ue});var n=s(55754),r=s(49142),i=s(99019),a=s(92950),o=s(95418);const l={"logo-telegram":s.p+"static/media/icon-telegram.2450489f40d03000fe65fc1c6f238d85.svg"};var d=s(45263);const c=(0,a.forwardRef)((({name:e,className:t,...s},n)=>{const r=t?"anticon "+t:"anticon";return(0,d.jsx)("span",{className:r,...s,children:l[e]?(0,d.jsx)("ion-icon",{ref:n,src:l[e]}):(0,d.jsx)("ion-icon",{ref:n,name:e})})}));var u=s(63805);const h={appId:"bulk_sender",url:"https://tuphan-dn.github.io/bulksender/index.js",senhub:"senhub@https://descartesnetwork.github.io/senhub/index.js"},p={devnet:{node:"https://api.devnet.solana.com",spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",bulksenderAddress:"FjkVzT6QJCQrgoZ8VoyAqysD5Mfa73ekpXWe9zDprWRA"},testnet:{node:"https://api.testnet.solana.com",spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",bulksenderAddress:""},mainnet:{node:"https://api.mainnet-beta.solana.com",spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",bulksenderAddress:"8WB9yeJ946594RHtxdNoKbwC2y13yCwJCtSY1mAeLWu1"}},m={manifest:{development:{...h},staging:{...h},production:{...h}}[u.OB],sol:p[u.ef]};var g=s(16200),f=s.n(g);const y={ttl:3e4},x={limit:{calls:10,time:1e3},cache:y};class w{constructor(e){this.key="",this.resolveQueue=[],this.rejectQueue=[],this.key=e}add(e,t){this.resolveQueue.push(e),this.rejectQueue.push(t)}resolves(e){for(;this.resolveQueue.length>0;){this.resolveQueue.shift()(e)}}rejects(e){for(;this.rejectQueue.length>0;){this.rejectQueue.shift()(e)}}}class j{static set(e,t,s=y){this.mapCache.set(e,t),setTimeout((()=>{this.mapCache.delete(e)}),s.ttl)}static get(e){return this.mapCache.get(e)}}j.mapCache=new Map;class b{static getSingleFlight(e){const t=JSON.stringify(e);if(this.mapInstance.has(t)){const e=this.mapInstance.get(t);if(e)return e}let s=new v(e);return this.mapInstance.set(t,s),s}static async load(e,t,s={}){"object"===typeof e&&(e=JSON.stringify(e));let n=b.getSingleFlight(s);b.mapInstance.set(e,n);const r=new w(e);return n.load(r,t)}}b.mapInstance=new Map;class v{constructor(e){this.config=void 0,this.intervalRequest=void 0,this.timeLogs=[],this.mapRequestCalling=new Map,this.requestQueue=[],this.config=Object.assign(x,e)}async load(e,t){const s=j.get(e.key);if(s)return Promise.resolve(s);let n=!1,r=this.mapRequestCalling.get(e.key);return r||(r=e,n=!0,this.mapRequestCalling.set(r.key,r)),new Promise(((e,s)=>{if(!r)return s("Not found request!");r.add(e,s),n&&this.fetch(r,t)}))}fetch(e,t){if(!this.validateLimit())return this.addRequestQueue(e,t);this.createTimeLogs(),t().then((t=>{j.set(e.key,t,this.config.cache),e.resolves(t)})).catch((t=>{e.rejects(t)})).finally((()=>{this.mapRequestCalling.delete(e.key),this.fetchRequestQueue(t)}))}fetchRequestQueue(e){if(!this.validateLimit())return;const t=this.requestQueue.shift();t&&this.load(t,e),0===this.requestQueue.length&&this.intervalRequest&&clearInterval(this.intervalRequest)}addRequestQueue(e,t){var s;this.requestQueue.push(e),this.intervalRequest=setInterval((()=>{this.fetchRequestQueue(t)}),null===(s=this.config.limit)||void 0===s?void 0:s.time)}validateLimit(){return!0}createTimeLogs(){var e;if(!this.config.limit)return;const t=(new Date).getTime();this.timeLogs.push(t),this.timeLogs.length>(null===(e=this.config.limit)||void 0===e?void 0:e.calls)&&this.timeLogs.shift()}}var k=s(71256);class A extends Error{constructor(e,t=""){super(e),this.info=void 0,this.name=`Error: ${e}`,this.info={txId:t}}}const C=class{constructor(e,t=[]){this.nodeUrl=void 0,this.connection=void 0,this.errorMapping=void 0,this.throwError=(e,t)=>{const s="Transaction failed";if(!e)throw new A(s,t);const n=e.InstructionError||[];if("string"==typeof n[1])throw new A(n[1],t);const{Custom:r}=n[1]||{};if("number"!==typeof r)throw new A(s,t);throw new A(this.errorMapping[r]||s,t)},this.sendTransaction=async e=>{const t=e.serialize(),s=await this.connection.sendRawTransaction(t,{skipPreflight:!0,preflightCommitment:"confirmed"}),{value:{err:n}}=await this.connection.confirmTransaction(s,"confirmed");return n?this.throwError(n,s):s},this.addRecentCommitment=async e=>{const{blockhash:t}=await this.connection.getRecentBlockhash("confirmed");return e.recentBlockhash=t,e},this.addSignature=(e,{publicKey:t,signature:s})=>(e.feePayer||(e.feePayer=t),e.addSignature(t,s),e),this.nodeUrl=e,this.errorMapping=t,this.connection=new k.Connection(this.nodeUrl,"confirmed")}},S=s(70320),T=["Invalid instruction","Incorrect program id","Operation overflowed","Invalid owner"];const I=class extends C{constructor(e,t,s,n){if(super(n,T),this.bulksenderProgramId=void 0,this.spltProgramId=void 0,this.splataProgramId=void 0,this._splt=void 0,this.checkedTransfer=async(e,t,s,n)=>{if(!o.account.isAddress(t))throw new Error("Invalid destination address");if(!o.account.isAddress(s))throw new Error("Invalid mint address");const r=await n.getAddress(),i=o.account.fromAddress(r),a=await this._splt.deriveAssociatedAddress(r,s),l=await this._splt.deriveAssociatedAddress(t,s),d=o.account.fromAddress(a),c=o.account.fromAddress(t),u=o.account.fromAddress(l),h=o.account.fromAddress(s);let p=new k.Transaction;p=await this.addRecentCommitment(p);const m=new S.struct([{key:"code",type:"u8"},{key:"amount",type:"u64"}],{code:0,amount:e}),g=new k.TransactionInstruction({keys:[{pubkey:i,isSigner:!0,isWritable:!0},{pubkey:d,isSigner:!1,isWritable:!0},{pubkey:c,isSigner:!1,isWritable:!1},{pubkey:u,isSigner:!1,isWritable:!0},{pubkey:h,isSigner:!1,isWritable:!1},{pubkey:k.SystemProgram.programId,isSigner:!1,isWritable:!1},{pubkey:this.spltProgramId,isSigner:!1,isWritable:!1},{pubkey:k.SYSVAR_RENT_PUBKEY,isSigner:!1,isWritable:!1},{pubkey:this.splataProgramId,isSigner:!1,isWritable:!1}],programId:this.bulksenderProgramId,data:m.toBuffer()});p.add(g),p.feePayer=i;const f=await n.rawSignTransaction(p);this.addSignature(p,f);return{txId:await this.sendTransaction(p)}},this.buildCheckedBulkTransferTransaction=async(e,t,s,n)=>{for(const m of t)if(!o.account.isAddress(m))throw new Error(`Invalid destination address: ${m}`);for(const o of e)if(!o)throw new Error(`Invalid amount: ${o}`);if(!o.account.isAddress(s))throw new Error("Invalid mint address");if(e.length!==t.length)throw new Error(`The number of amounts and the number of addresses are unmatcher (${e.length}, ${t.length})`);const r=await n.getAddress(),i=o.account.fromAddress(r),a=await this._splt.deriveAssociatedAddress(r,s),l=o.account.fromAddress(a),d=o.account.fromAddress(s);let c=new k.Transaction;c=await this.addRecentCommitment(c);const u=new S.struct([{key:"code",type:"u8"},{key:"num_txs",type:"u32"},{key:"amounts",type:`[u64;${e.length}]`}],{code:1,num_txs:e.length,amounts:e});let h=[{pubkey:i,isSigner:!0,isWritable:!0},{pubkey:l,isSigner:!1,isWritable:!0},{pubkey:d,isSigner:!1,isWritable:!1},{pubkey:k.SystemProgram.programId,isSigner:!1,isWritable:!1},{pubkey:this.spltProgramId,isSigner:!1,isWritable:!1},{pubkey:k.SYSVAR_RENT_PUBKEY,isSigner:!1,isWritable:!1},{pubkey:this.splataProgramId,isSigner:!1,isWritable:!1}];for(const m of t){const e=await this._splt.deriveAssociatedAddress(m,s),t=o.account.fromAddress(m),n=o.account.fromAddress(e);h.push({pubkey:t,isSigner:!1,isWritable:!1}),h.push({pubkey:n,isSigner:!1,isWritable:!0})}const p=new k.TransactionInstruction({keys:h,programId:this.bulksenderProgramId,data:u.toBuffer()});return c.add(p),c.feePayer=i,c},this.simulateBulkTransfer=async(e,t,s,n)=>{const r=await this.buildCheckedBulkTransferTransaction(e,t,s,n),{value:{err:i}}=await this.connection.simulateTransaction(r);return!i},this.checkedBulkTransfer=async(e,t,s,n)=>{const r=await this.buildCheckedBulkTransferTransaction(e,t,s,n),i=await n.rawSignTransaction(r);this.addSignature(r,i);return{txId:await this.sendTransaction(r)}},!o.account.isAddress(e))throw new Error("Invalid bulksender program address");if(!o.account.isAddress(t))throw new Error("Invalid SPL token program address");if(!o.account.isAddress(s))throw new Error("Invalid SPL associated token program address");this.bulksenderProgramId=o.account.fromAddress(e),this.spltProgramId=o.account.fromAddress(t),this.splataProgramId=o.account.fromAddress(s),this._splt=new o.SPLT(t,s,n)}};var P=s(19289);const R="main",B=(0,P.createAsyncThunk)("main/setData",(async e=>({data:e}))),W=(0,P.createAsyncThunk)("main/setMintAddress",(async e=>({mintAddress:e}))),E=(0,P.createAsyncThunk)("main/setDecimalized",(async e=>({decimalized:e}))),N=(0,P.createSlice)({name:R,initialState:{mintAddress:"",data:[],decimalized:!1},reducers:{},extraReducers:e=>{e.addCase(B.fulfilled,((e,{payload:t})=>{Object.assign(e,t)})).addCase(W.fulfilled,((e,{payload:t})=>{Object.assign(e,t)})).addCase(E.fulfilled,((e,{payload:t})=>{Object.assign(e,t)}))}}).reducer,O=e=>{try{return BigInt(e)}catch(t){return BigInt(0)}},Q=({disabled:e=!1})=>{const t=(0,n.useDispatch)(),{main:{data:s}}=(0,n.useSelector)((e=>e)),r=(0,a.useCallback)((async()=>{const e=[];for(const[t,n]of s){const s=e.findIndex((([e])=>e===t));s>=0?e[s][1]=(O(e[s][1])+O(n)).toString():e.push([t,n])}await t(B(e))}),[s,t]);return(0,d.jsx)(i.Button,{type:"text",icon:(0,d.jsx)(c,{name:"git-merge-outline"}),onClick:r,disabled:e,block:!0,children:"Merge"})},{sol:{spltAddress:_,splataAddress:L,bulksenderAddress:q,node:D}}=m,z=()=>{const[e,t]=(0,a.useState)(!1),[s,l]=(0,a.useState)(!1),[h,p]=(0,a.useState)([]),{data:m,mintAddress:g}=(0,n.useSelector)((e=>e.main)),{accounts:f}=(0,r.useAccount)(),{wallet:{address:y}}=(0,r.useWallet)(),x=(0,a.useMemo)((()=>{if(!m||!m.length)return!1;return m.filter((([e],t)=>{const s=m.findIndex((([t])=>e===t));return s!==t&&s>-1})).length>0}),[m]),w=(0,a.useCallback)((async()=>{await t(!0);const e=new I(q,_,L,D);for(const t of h)try{const{sentre:{wallet:s}}=window;if(!s)throw new Error("Cannot connect wallet");const{txId:n}=await e.checkedBulkTransfer(t.map((([e,t])=>O(t))),t.map((([e,t])=>e)),g,s);window.notify({type:"success",description:"Successfully transfer tokens. Click to view details.",onClick:()=>{return window.open((e=n,o.account.isAddress(e)?`https://explorer.solana.com/address/${e}?cluster=${u.ef}`:`https://explorer.solana.com/tx/${e}?cluster=${u.ef}`),"_blank");var e}})}catch(s){window.notify({type:"error",description:s.message})}await t(!1)}),[h,g]),j=(0,a.useCallback)((async()=>{if(!m||!m.length)return l(!0);if(!o.account.isAddress(y))return l("Please connect your wallet");if(!o.account.isAddress(g))return l("Please select a token to send");const e=m.filter((([e,t])=>!o.account.isAddress(e)||!O(t)));if(e.length>0)return l(!0);const{sentre:{splt:t}}=window,s=await t.deriveAssociatedAddress(y,g),{amount:n}=f[s]||{amount:BigInt(0)},r=m.reduce(((e,[t,s])=>e+O(s)),BigInt(0));return l(n<r&&"Not enough token balance")}),[m,g,f,y]);(0,a.useEffect)((()=>{j()}),[j]);const b=(0,a.useCallback)((async()=>{if(s)return p([]);const{sentre:{wallet:e}}=window;if(!e)return l("Cannot connect wallet");await t(!0);const n=new I(q,_,L,D);let r=[...m];const i=[[]];for(;r.length;){const[s,a]=r.shift(),o=i[i.length-1],d=[...o,[s,a]],c=await n.simulateBulkTransfer(d.map((([e,t])=>O(t))),d.map((([e,t])=>e)),g,e);if(c)i[i.length-1]=d;else{if(o.length<=1)return await l("Cannot handle the transaction. Make sure that your SOL balance is enough to pay fees."),t(!1);i.push([[s,a]])}}return await p(i),t(!1)}),[s,m,g]);return(0,a.useEffect)((()=>{b()}),[b]),(0,d.jsxs)(i.Row,{gutter:[16,16],children:[(0,d.jsx)(i.Col,{span:24,children:"string"===typeof s?(0,d.jsxs)(i.Space,{children:[(0,d.jsx)(c,{name:"information-circle-outline",style:{color:"#F2323F"}}),(0,d.jsx)(i.Typography.Text,{type:"danger",children:s})]}):(0,d.jsxs)(i.Space,{children:[(0,d.jsx)(c,{name:"information-circle-outline"}),(0,d.jsxs)(i.Typography.Text,{type:h.length?void 0:"secondary",children:["To send tokens to ",(0,d.jsx)("strong",{children:m.length})," address(es), you will need to sign ",(0,d.jsx)("strong",{children:h.length})," time(s) with the total estimated fee is ~",.005*h.length," SOL."]})]})}),(0,d.jsx)(i.Col,{span:12,children:(0,d.jsx)(Q,{disabled:!x||!!s||e})}),(0,d.jsx)(i.Col,{span:12,children:(0,d.jsx)(i.Button,{type:"primary",icon:(0,d.jsx)(c,{name:"send"}),onClick:w,disabled:!!s,loading:e,block:!0,children:"Send"})})]})};var M=s(24656),J=s.n(M);const U=()=>{const[e,t]=(0,a.useState)(!1),s=(0,n.useDispatch)();return(0,d.jsx)(i.Row,{gutter:[24,24],children:(0,d.jsx)(i.Col,{span:24,style:{marginBottom:16},children:(0,d.jsx)(i.Upload.Dragger,{accept:".csv,.txt",beforeUpload:async e=>(await t(!0),await s(B(await(e=>new Promise(((t,s)=>J().parse(e,{skipEmptyLines:!0,complete:({data:e})=>t(e)}))))(e))),await t(!1),!1),onRemove:async()=>(await t(!0),await s(B([])),await t(!1),!0),maxCount:1,children:(0,d.jsxs)(i.Space,{direction:"vertical",size:"large",align:"center",children:[(0,d.jsx)(i.Typography.Title,{level:3,children:"Click or Drop file to upload"}),(0,d.jsxs)(i.Typography.Text,{children:["The accepted file types are ",(0,d.jsx)("code",{children:".csv"}),", ",(0,d.jsx)("code",{children:".txt"}),"."]}),(0,d.jsx)(i.Button,{type:"primary",icon:(0,d.jsx)(c,{name:"cloud-upload-outline"}),loading:e,children:"Upload"})]})})})})},F=[void 0],$=({mintAddress:e,size:t=24,icon:s=(0,d.jsx)(c,{name:"diamond-outline"}),reversed:n=!1})=>{const[l,u]=(0,a.useState)(F),{tokenProvider:h}=(0,r.useMint)(),{pools:p}=(0,r.usePool)(),m=(0,a.useCallback)((async e=>{const t=await h.findByAddress(e);if(null!==t&&void 0!==t&&t.logoURI)return t.logoURI}),[h]),g=(0,a.useCallback)((async()=>{if(!o.account.isAddress(e))return u(F);const t=Object.values(p).find((({mint_lpt:t})=>t===e));if(t){const{mint_a:e,mint_b:s}=t,r=await Promise.all([e,s].map(m));return n&&r.reverse(),u(r)}const s=await m(e);return u([s])}),[e,n,m,p]);return(0,a.useEffect)((()=>{g()}),[g]),(0,d.jsx)(i.Avatar.Group,{style:{display:"block",whiteSpace:"nowrap"},children:l.map(((e,n)=>(0,d.jsx)(i.Avatar,{src:e,size:t,style:{backgroundColor:"#2D3355",border:"none"},children:s},n)))})},V="Unknown Token",G=({mintAddress:e,separator:t=" \u2022 ",reversed:s=!1})=>{const[n,i]=(0,a.useState)(V),{tokenProvider:l}=(0,r.useMint)(),{pools:c}=(0,r.usePool)(),u=(0,a.useCallback)((async e=>{const t=await l.findByAddress(e);return null!==t&&void 0!==t&&t.name?t.name:V}),[l]),h=(0,a.useCallback)((async()=>{if(!o.account.isAddress(e))return i(V);const n=Object.values(c).find((({mint_lpt:t})=>t===e));if(n){const{mint_a:e,mint_b:r}=n,a=await Promise.all([e,r].map(u));return s&&a.reverse(),i(`${a.join(t)} LP`)}const r=await u(e);return i(r)}),[e,s,u,c,t]);return(0,a.useEffect)((()=>{h()}),[h]),(0,d.jsx)("span",{children:n})},Z="TOKN",K=({mintAddress:e,separator:t=" \u2022 ",reversed:s=!1})=>{const[n,i]=(0,a.useState)(Z),{tokenProvider:l}=(0,r.useMint)(),{pools:c}=(0,r.usePool)(),u=(0,a.useCallback)((async e=>{const t=await l.findByAddress(e);return null!==t&&void 0!==t&&t.symbol?t.symbol:e.substring(0,4)}),[l]),h=(0,a.useCallback)((async()=>{if(!o.account.isAddress(e))return i(Z);const n=Object.values(c).find((({mint_lpt:t})=>t===e));if(n){const{mint_a:e,mint_b:r}=n,a=await Promise.all([e,r].map(u));return s&&a.reverse(),i(a.join(t))}const r=await u(e);return i(r)}),[e,s,u,c,t]);return(0,a.useEffect)((()=>{h()}),[h]),(0,d.jsx)("span",{children:n})},Y=()=>{const e=(0,n.useDispatch)(),[t,s]=(0,a.useState)("0"),{main:{mintAddress:l}}=(0,n.useSelector)((e=>e)),{accounts:c}=(0,r.useAccount)(),{wallet:{address:u}}=(0,r.useWallet)(),{getMint:h}=(0,r.useMint)(),p=(0,a.useCallback)((async()=>{if(!o.account.isAddress(l)||!o.account.isAddress(u))return s("0");const{sentre:{splt:e}}=window,{[l]:{decimals:t}}=await h({address:l}),n=await e.deriveAssociatedAddress(u,l),{amount:r}=c[n]||{amount:BigInt(0)},i=o.utils.undecimalize(r,t);return s(i)}),[l,u,h,c]);return(0,a.useEffect)((()=>{p()}),[p]),(0,d.jsx)(i.Card,{children:(0,d.jsxs)(i.Row,{gutter:[16,16],children:[(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(i.Select,{size:"large",placeholder:"Select token",style:{width:"100%"},onChange:t=>e(W(t)),children:Object.values(c).map((({mint:e},t)=>(0,d.jsx)(i.Select.Option,{value:e,children:(0,d.jsxs)(i.Space,{align:"center",children:[(0,d.jsx)($,{mintAddress:e}),(0,d.jsx)(i.Typography.Text,{type:"secondary",children:(0,d.jsx)(K,{mintAddress:e})}),(0,d.jsx)(i.Typography.Text,{children:(0,d.jsx)(G,{mintAddress:e})})]})},e+t)))})}),(0,d.jsx)(i.Col,{span:24,children:(0,d.jsxs)(i.Space,{children:[(0,d.jsx)(i.Typography.Text,{type:"secondary",children:"Balance:"}),(0,d.jsx)(i.Typography.Text,{children:(m=t,m?f()(m):f()("0")).format("0,0.[0000]")}),(0,d.jsx)(i.Typography.Text,{children:(0,d.jsx)(K,{mintAddress:l})})]})})]})});var m},H=e=>{const[t,s]=(0,a.useState)(void 0),{getDecimals:n}=(0,r.useMint)(),i=(0,a.useCallback)((async()=>{try{const t=await n(e);return s(t)}catch(t){return s(void 0)}}),[e,n]);return(0,a.useEffect)((()=>{i()}),[i]),t},X=({index:e,accountAddress:t,amount:s})=>{const r=(0,n.useDispatch)(),{main:{data:a,mintAddress:l}}=(0,n.useSelector)((e=>e)),u=H(l)||0,h=o.account.isAddress(t)?O(s)?"":"Invalid amount":"Invalid address",p=a.slice(0,e).findIndex((([e])=>e===t)),m=p>=0?`Duplicated address to #${p}`:"",g=O(s)?o.utils.undecimalize(O(s),u):s;return(0,d.jsxs)(i.Row,{gutter:[16,8],children:[(0,d.jsx)(i.Col,{span:24,children:(0,d.jsxs)(i.Row,{gutter:[16,8],align:"middle",wrap:!1,children:[(0,d.jsx)(i.Col,{children:(0,d.jsxs)(i.Typography.Text,{type:"secondary",children:["#",e+1]})}),(0,d.jsx)(i.Col,{span:12,children:(0,d.jsx)(i.Tooltip,{title:t,children:(0,d.jsx)(i.Typography.Text,{ellipsis:!0,children:t})})}),(0,d.jsx)(i.Col,{flex:"auto",children:(0,d.jsxs)(i.Space,{children:[(0,d.jsx)(i.Typography.Text,{children:g}),(0,d.jsx)(i.Typography.Text,{children:(0,d.jsx)(K,{mintAddress:l})})]})}),(0,d.jsx)(i.Col,{children:(0,d.jsxs)(i.Space,{align:"center",children:[m?(0,d.jsx)(i.Tooltip,{title:m,children:(0,d.jsx)(c,{name:"alert-circle-outline",style:{color:"#FCB017"}})}):null,h?(0,d.jsx)(i.Tooltip,{title:h,children:(0,d.jsx)(c,{name:"warning-outline",style:{color:"#F2323F"}})}):null,(0,d.jsx)(i.Button,{type:"text",icon:(0,d.jsx)(c,{name:"trash-outline"}),onClick:()=>(e=>{const t=[...a];return t.splice(e,1),r(B(t))})(e)})]})})]})}),(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(i.Divider,{style:{margin:0}})})]})};let ee;const te=(0,a.forwardRef)((({max:e,onValue:t=(()=>{}),onChange:s=(()=>{}),...n},r)=>{var o;const[l,u]=(0,a.useState)(""),[h,p]=(0,a.useState)(null),m=(0,a.useRef)(r),g=(0,a.useCallback)((s=>{const n=e=>{ee&&(clearTimeout(ee),ee=void 0),u(e),ee=setTimeout((()=>u("")),500)};return/^\d*(\.\d*)?$/.test(s)?e&&parseFloat(s)>parseFloat(e.toString())?n("Not enough balance"):t(s):n("Invalid character")}),[e,t]);return null!==h&&(null===m||void 0===m||null===(o=m.current)||void 0===o||o.setSelectionRange(h,h)),(0,d.jsx)(i.Tooltip,{title:(0,d.jsxs)(i.Space,{children:[(0,d.jsx)(c,{name:"warning"}),l]}),visible:!!l,children:(0,d.jsx)(i.Input,{...n,onChange:e=>{s(e),p(e.target.selectionStart),g(e.target.value||"")},ref:m})})})),se=()=>{const e=(0,n.useDispatch)(),[t,s]=(0,a.useState)(""),[r,l]=(0,a.useState)(""),{main:{data:u,mintAddress:h}}=(0,n.useSelector)((e=>e)),p=H(h)||0;return(0,d.jsxs)(i.Row,{gutter:[16,8],align:"middle",wrap:!1,children:[(0,d.jsx)(i.Col,{span:12,children:(0,d.jsx)(i.Input,{placeholder:"Address",value:t,onChange:e=>s(e.target.value)})}),(0,d.jsx)(i.Col,{flex:"auto",children:(0,d.jsx)(te,{placeholder:"Amount",value:r,onValue:e=>l(e)})}),(0,d.jsx)(i.Col,{children:(0,d.jsx)(i.Button,{type:"primary",icon:(0,d.jsx)(c,{name:"add-outline"}),onClick:async()=>{if(!o.account.isAddress(t))return window.notify({type:"warning",description:"Invalid address"});if(!Number(r))return window.notify({type:"warning",description:"Invalid amount"});const n=[...u];n.push([t,o.utils.decimalize(r,p).toString()]),await e(B(n)),await s(""),await l("")},disabled:!o.account.isAddress(h)})})]})},ne=()=>{const e=(0,n.useDispatch)(),{main:{data:t,decimalized:s,mintAddress:r}}=(0,n.useSelector)((e=>e)),a=H(r)||0;return(0,d.jsxs)(i.Row,{gutter:[8,8],justify:"end",align:"middle",children:[(0,d.jsx)(i.Col,{children:(0,d.jsx)(i.Typography.Text,{children:"Decimals?"})}),(0,d.jsx)(i.Col,{children:(0,d.jsx)(i.Switch,{checked:s,onChange:async s=>{const n=t.map((([e,t])=>[e,s?o.utils.decimalize(t,a).toString():o.utils.undecimalize(O(t),a)]));await e(E(s)),await e(B(n))},checkedChildren:a,unCheckedChildren:a,disabled:!a})})]})},re=()=>{const{main:{data:e}}=(0,n.useSelector)((e=>e));return(0,d.jsxs)(i.Row,{gutter:[16,16],children:[(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(ne,{})}),(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(i.Card,{bodyStyle:{padding:16,height:384},className:"scrollbar",children:(0,d.jsxs)(i.Row,{gutter:[8,8],children:[e.length?null:(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(i.Typography.Text,{type:"secondary",children:"No Data"})}),e.map((([e,t],s)=>(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(X,{index:s,accountAddress:e,amount:t})},e+s))),(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(se,{})}),(0,d.jsx)(i.Col,{span:24})]})})})]})},ie=()=>(0,d.jsxs)(i.Row,{gutter:[24,24],justify:"center",children:[(0,d.jsx)(i.Col,{span:24,style:{maxWidth:1200},children:(0,d.jsxs)(i.Row,{gutter:[24,24],children:[(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(i.Typography.Title,{level:3,children:"Solana Bulk Sender"})}),(0,d.jsx)(i.Col,{xs:{span:24},md:{span:12},children:(0,d.jsxs)(i.Row,{gutter:[24,24],children:[(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(Y,{})}),(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(U,{})})]})}),(0,d.jsx)(i.Col,{xs:{span:24},md:{span:12},children:(0,d.jsxs)(i.Row,{gutter:[24,24],children:[(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(re,{})}),(0,d.jsx)(i.Col,{span:24,children:(0,d.jsx)(z,{})})]})})]})}),(0,d.jsx)(i.Col,{span:24})]}),ae=()=>{const{ui:{width:e,infix:t}}=(0,r.useUI)();return(0,d.jsx)(i.Row,{gutter:[24,24],children:(0,d.jsxs)(i.Col,{span:24,children:[(0,d.jsx)(i.Typography.Title,{level:5,children:"BulkSender Widget"}),(0,d.jsxs)(i.Typography.Text,{children:["Env: ",u.OB," - ",e,"px - ",t]})]})})};BigInt.prototype.toJSON=function(){return this.toString()};const oe={serializableCheck:{isSerializable:e=>"undefined"===typeof e||null===e||"string"===typeof e||"boolean"===typeof e||"number"===typeof e||Array.isArray(e)||(e=>{if(null===e)return!1;const t=Object.getPrototypeOf(e);return null!==t&&null===Object.getPrototypeOf(t)})(e)||"bigint"===typeof e}},le=(0,P.configureStore)({middleware:e=>e(oe),devTools:!1,reducer:{main:N}}),{manifest:{appId:de}}=m,ce=()=>(0,d.jsx)(r.UIProvider,{appId:de,antd:{prefixCls:de},children:(0,d.jsx)(r.WalletProvider,{children:(0,d.jsx)(r.AccountProvider,{children:(0,d.jsx)(r.MintProvider,{children:(0,d.jsx)(r.PoolProvider,{children:(0,d.jsx)(n.Provider,{store:le,children:(0,d.jsx)(ie,{})})})})})})}),ue={size:"small",type:"solid"},he=()=>(0,d.jsx)(r.UIProvider,{appId:de,antd:{prefixCls:de},children:(0,d.jsx)(r.WalletProvider,{children:(0,d.jsx)(r.AccountProvider,{children:(0,d.jsx)(r.MintProvider,{children:(0,d.jsx)(r.PoolProvider,{children:(0,d.jsx)(n.Provider,{store:le,children:(0,d.jsx)(ae,{})})})})})})})},63805:(e,t,s)=>{"use strict";s.d(t,{OB:()=>r,ef:()=>i});var n=s(53933);const r="production",i=(()=>{switch(n.Z.get("network")){case"devnet":return"devnet";case"testnet":return"testnet";default:return"mainnet"}})()},53933:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});const n="sentre",r=window.localStorage,i=e=>{if(!e)return null;try{return JSON.parse(e)}catch(t){return null}},a={set:(e,t)=>{let s=i(r.getItem(n));s&&"object"===typeof s||(s={}),s[e]=t,r.setItem(n,JSON.stringify(s))},get:e=>{let t=i(r.getItem(n));return t&&"object"===typeof t?t[e]:null},clear:e=>{a.set(e,null)}},o=a},46601:()=>{},89214:()=>{},85568:()=>{},52361:()=>{},94616:()=>{},55024:()=>{}}]);
//# sourceMappingURL=582.a946a4e1.chunk.js.map