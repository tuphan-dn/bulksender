(globalThis.webpackChunkbulk_sender=globalThis.webpackChunkbulk_sender||[]).push([["src_bootstrap_app_tsx"],{45597:(e,t,s)=>{"use strict";Object.defineProperty(t,"X$",{value:!0}),Object.defineProperty(t,"jY",{enumerable:!0,get:function(){return i.default}}),t.h0=void 0,Object.defineProperty(t,"ng",{enumerable:!0,get:function(){return a.default}});var n=o(s(70854)),r=o(s(65096)),i=o(s(69363)),a=o(s(83272));function o(e){return e&&e.__esModule?e:{default:e}}const d=[n.default,r.default];t.h0=d},41367:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Page:()=>ye,__esModule:()=>me.X$,logo:()=>me.jY,panels:()=>me.h0,readme:()=>me.ng});var n=s(55754),r=s(19690),i=s(94751),a=s(43785),o=s(92950),d=s(95418);const l={appId:"bulk_sender",url:"https://tuphan-dn.github.io/bulksender/index.js"},c={development:{...l},production:{...l}},u={devnet:{node:r.rpc,spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",bulksenderAddress:"FjkVzT6QJCQrgoZ8VoyAqysD5Mfa73ekpXWe9zDprWRA",fee:1e6,taxman:"8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D"},testnet:{node:r.rpc,spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",bulksenderAddress:"",fee:1e6,taxman:""},mainnet:{node:r.rpc,spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",bulksenderAddress:"8WB9yeJ946594RHtxdNoKbwC2y13yCwJCtSY1mAeLWu1",fee:1e6,taxman:"9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e"}},h={manifest:c[r.env],sol:u[r.net]};var p=s(19289);let m;!function(e){e[e.None=0]="None",e[e.Estimating=1]="Estimating",e[e.Estimated=2]="Estimated",e[e.Sending=3]="Sending",e[e.Done=4]="Done"}(m||(m={}));const g="main",y={mintAddress:"",data:[],decimalized:!1,status:m.None},f=(0,p.createAsyncThunk)("main/setData",(async e=>({data:e,status:m.None}))),x=(0,p.createAsyncThunk)("main/setMintAddress",(async e=>({mintAddress:e,status:m.None}))),b=(0,p.createAsyncThunk)("main/setDecimalized",(async e=>({decimalized:e,status:m.None}))),j=(0,p.createAsyncThunk)("main/setStatus",(async e=>({status:e}))),w=(0,p.createSlice)({name:g,initialState:y,reducers:{},extraReducers:e=>{e.addCase(f.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(x.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(b.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(j.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer;var A=s(42224);class k extends Error{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";super(e),this.info=void 0,this.name=`Error: ${e}`,this.info={txId:t}}}const v=class{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];this.nodeUrl=void 0,this.connection=void 0,this.errorMapping=void 0,this.throwError=(e,t)=>{const s="Transaction failed";if(!e)throw new k(s,t);const n=e.InstructionError||[];if("string"==typeof n[1])throw new k(n[1],t);const{Custom:r}=n[1]||{};if("number"!==typeof r)throw new k(s,t);throw new k(this.errorMapping[r]||s,t)},this.sendTransaction=async e=>{const t=e.serialize(),s=await this.connection.sendRawTransaction(t,{skipPreflight:!0,preflightCommitment:"confirmed"}),{value:{err:n}}=await this.connection.confirmTransaction(s,"confirmed");return n?this.throwError(n,s):s},this.addRecentCommitment=async e=>{const{blockhash:t}=await this.connection.getLatestBlockhash("confirmed");return e.recentBlockhash=t,e},this.nodeUrl=e,this.errorMapping=t,this.connection=new A.Connection(this.nodeUrl,"confirmed")}},S=s(70320),C=["Invalid instruction","Incorrect program id","Operation overflowed","Invalid owner"];const T=class extends v{constructor(e,t,s,n){var r;if(super(n,C),r=this,this.bulksenderProgramId=void 0,this.spltProgramId=void 0,this.splataProgramId=void 0,this._splt=void 0,this.checkedTransfer=async(e,t,s,n)=>{if(!d.account.isAddress(t))throw new Error("Invalid destination address");if(!d.account.isAddress(s))throw new Error("Invalid mint address");const r=await n.getAddress(),i=d.account.fromAddress(r),a=await this._splt.deriveAssociatedAddress(r,s),o=await this._splt.deriveAssociatedAddress(t,s),l=d.account.fromAddress(a),c=d.account.fromAddress(t),u=d.account.fromAddress(o),h=d.account.fromAddress(s);let p=new A.Transaction;p=await this.addRecentCommitment(p);const m=new S.struct([{key:"code",type:"u8"},{key:"amount",type:"u64"}],{code:0,amount:e}),g=new A.TransactionInstruction({keys:[{pubkey:i,isSigner:!0,isWritable:!0},{pubkey:l,isSigner:!1,isWritable:!0},{pubkey:c,isSigner:!1,isWritable:!1},{pubkey:u,isSigner:!1,isWritable:!0},{pubkey:h,isSigner:!1,isWritable:!1},{pubkey:A.SystemProgram.programId,isSigner:!1,isWritable:!1},{pubkey:this.spltProgramId,isSigner:!1,isWritable:!1},{pubkey:A.SYSVAR_RENT_PUBKEY,isSigner:!1,isWritable:!1},{pubkey:this.splataProgramId,isSigner:!1,isWritable:!1}],programId:this.bulksenderProgramId,data:m.toBuffer()});p.add(g),p.feePayer=i,p=await n.signTransaction(p);return{txId:await this.sendTransaction(p)}},this.buildCheckedBulkTransferTransaction=async function(e,t,s,n,i,a){let o=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(!d.account.isAddress(a))throw new Error(`Invalid taxman address: ${a}`);for(const r of t)if(!d.account.isAddress(r))throw new Error(`Invalid destination address: ${r}`);for(const r of e)if(!r)throw new Error(`Invalid amount: ${r}`);if(!d.account.isAddress(s))throw new Error("Invalid mint address");if(e.length!==t.length)throw new Error(`The number of amounts and the number of addresses are unmatcher (${e.length}, ${t.length})`);const l=await n.getAddress(),c=d.account.fromAddress(l),u=await r._splt.deriveAssociatedAddress(l,s),h=d.account.fromAddress(u),p=d.account.fromAddress(s);let m=new A.Transaction;o||(m=await r.addRecentCommitment(m));const g=new S.struct([{key:"code",type:"u8"},{key:"num_txs",type:"u32"},{key:"amounts",type:`[u64;${e.length}]`}],{code:1,num_txs:e.length,amounts:e});let y=[{pubkey:c,isSigner:!0,isWritable:!0},{pubkey:h,isSigner:!1,isWritable:!0},{pubkey:p,isSigner:!1,isWritable:!1},{pubkey:A.SystemProgram.programId,isSigner:!1,isWritable:!1},{pubkey:r.spltProgramId,isSigner:!1,isWritable:!1},{pubkey:A.SYSVAR_RENT_PUBKEY,isSigner:!1,isWritable:!1},{pubkey:r.splataProgramId,isSigner:!1,isWritable:!1}];for(const b of t){const e=await r._splt.deriveAssociatedAddress(b,s),t=d.account.fromAddress(b),n=d.account.fromAddress(e);y.push({pubkey:t,isSigner:!1,isWritable:!1}),y.push({pubkey:n,isSigner:!1,isWritable:!0})}const f=new A.TransactionInstruction({keys:y,programId:r.bulksenderProgramId,data:g.toBuffer()});m.add(f);const x=A.SystemProgram.transfer({fromPubkey:c,toPubkey:new A.PublicKey(a),lamports:i});return m.add(x),m.feePayer=c,m},this.simulateBulkTransfer=async(e,t,s,n,r,i)=>{const a=await this.buildCheckedBulkTransferTransaction(e,t,s,n,r,i,!0),{value:{err:o}}=await this.connection.simulateTransaction(a);return!o},this.checkedBulkTransfer=async(e,t,s,n,r,i)=>{let a=await this.buildCheckedBulkTransferTransaction(e,t,s,n,r,i);a=await n.signTransaction(a);return{txId:await this.sendTransaction(a)}},!d.account.isAddress(e))throw new Error("Invalid bulksender program address");if(!d.account.isAddress(t))throw new Error("Invalid SPL token program address");if(!d.account.isAddress(s))throw new Error("Invalid SPL associated token program address");this.bulksenderProgramId=d.account.fromAddress(e),this.spltProgramId=d.account.fromAddress(t),this.splataProgramId=d.account.fromAddress(s),this._splt=new d.SPLT(t,s,n)}},I=e=>{try{return BigInt(e)}catch(t){return BigInt(0)}};var P=s(45263);const{sol:{spltAddress:E,splataAddress:B,bulksenderAddress:W,node:D,taxman:_,fee:N}}=h,R=e=>{let{disabled:t=!1,onChange:s=(()=>{})}=e;const[d,l]=(0,o.useState)(0),[c,u]=(0,o.useState)([]),h=(0,n.useDispatch)(),p=(0,n.useSelector)((e=>e.main.data)),g=(0,n.useSelector)((e=>e.main.mintAddress)),y=(0,n.useSelector)((e=>e.main.status)),f=(0,o.useCallback)((async()=>{const{sentre:{wallet:e}}=window;if(!e)return u([]);await h(j(m.Estimating));const t=new T(W,E,B,D);let s=[...p];const n=[[]];for(;s.length;){const[a,o]=s.shift(),d=[...n[n.length-1],[a,o]];await r.util.asyncWait(250);let c=!1;try{c=await t.simulateBulkTransfer(d.map((e=>{let[t,s]=e;return I(s)})),d.map((e=>{let[t,s]=e;return t})),g,e,N,_)}catch(i){c=!1}if(!c&&d.length<=1)return u([]),window.notify({type:"error",description:"Cannot handle the transaction. Make sure that your SOL balance is enough to pay fees."}),h(j(m.None));c?n[n.length-1]=d:n.push([[a,o]]),l(n.flat().length/p.length)}return u(n),h(j(m.Estimated))}),[p,h,g]);return(0,o.useEffect)((()=>(s(c),()=>l(0))),[c,s]),(0,P.jsxs)(i.Button,{type:"primary",icon:(0,P.jsx)(a.Z,{name:"send"}),onClick:f,disabled:t,loading:y===m.Estimating,block:!0,children:["Optimize ",Math.floor(100*d),"%"]})},O=e=>{let{disabled:t=!1}=e;const s=(0,n.useDispatch)(),r=(0,n.useSelector)((e=>e.main.data)),d=(0,o.useCallback)((async()=>{const e=[];for(const[t,s]of r){const n=e.findIndex((e=>{let[s]=e;return s===t}));n>=0?e[n][1]=(I(e[n][1])+I(s)).toString():e.push([t,s])}await s(f(e))}),[r,s]);return(0,P.jsx)(i.Button,{type:"text",icon:(0,P.jsx)(a.Z,{name:"git-merge-outline"}),onClick:d,disabled:t,block:!0,children:"Merge"})},{sol:{spltAddress:z,splataAddress:M,bulksenderAddress:L,node:Z,taxman:$,fee:U}}=h,Y=e=>{let{bulk:t=[],disabled:s=!1}=e;const[d,l]=(0,o.useState)(!1),c=(0,n.useSelector)((e=>e.main.mintAddress)),u=(0,o.useCallback)((async()=>{l(!0);const e=new T(L,z,M,Z);for(const n of t)try{const{sentre:{wallet:t}}=window;if(!t)return;const{txId:s}=await e.checkedBulkTransfer(n.map((e=>{let[t,s]=e;return I(s)})),n.map((e=>{let[t,s]=e;return t})),c,t,U,$);window.notify({type:"success",description:"Successfully transfer tokens. Click to view details.",onClick:()=>window.open(r.util.explorer(s),"_blank")})}catch(s){window.notify({type:"error",description:s.message})}return l(!1)}),[t,c]);return(0,P.jsx)(i.Button,{type:"primary",icon:(0,P.jsx)(a.Z,{name:"send"}),onClick:u,disabled:s,loading:d,block:!0,children:"Send"})},F=()=>{const[e,t]=(0,o.useState)(!1),[s,l]=(0,o.useState)([]),c=(0,n.useSelector)((e=>e.main.data)),u=(0,n.useSelector)((e=>e.main.mintAddress)),h=(0,n.useSelector)((e=>e.main.status)),p=(0,r.useAccounts)(),g=(0,r.useWalletAddress)(),y=(0,r.useWalletBalance)(),f=(0,r.useMintDecimals)({mintAddress:u})||0,x=(0,o.useMemo)((()=>.015*s.length),[s.length]),b=(0,o.useMemo)((()=>{if(!c||!c.length)return!1;return c.filter(((e,t)=>{let[s]=e;const n=c.findIndex((e=>{let[t]=e;return s===t}));return n!==t&&n>-1})).length>0}),[c]),j=(0,o.useCallback)((async()=>{if(!c||!c.length)return t(!0);if(!r.util.isAddress(g))return t("Please connect your wallet");if(!r.util.isAddress(u))return t("Please select a token to send");const e=c.filter((e=>{let[t,s]=e;return!r.util.isAddress(t)||!I(s)}));if(e.length>0)return t(!0);if(Number(y)/10**9<x)return t(`Not enough SOL to execute the transactions. It requires ${x} SOL at least.`);const{sentre:{splt:s}}=window,n=await s.deriveAssociatedAddress(g,u),{amount:i}=p[n]||{amount:BigInt(0)},a=c.reduce(((e,t)=>{let[s,n]=t;return e+I(n)}),BigInt(0));return t(i<a&&`Not enough token balance. It requires ${d.utils.undecimalize(a,f)} tokens over your balance, ${d.utils.undecimalize(i,f)} tokens.`)}),[c,u,p,g,y,x,f]);return(0,o.useEffect)((()=>{j()}),[j]),(0,P.jsxs)(i.Row,{gutter:[16,16],children:[(0,P.jsx)(i.Col,{span:24,children:"string"===typeof e?(0,P.jsxs)(i.Space,{children:[(0,P.jsx)(a.Z,{name:"information-circle-outline",style:{color:"#F2323F"}}),(0,P.jsx)(i.Typography.Text,{type:"danger",children:e})]}):(0,P.jsxs)(i.Space,{children:[(0,P.jsx)(a.Z,{name:"information-circle-outline"}),(0,P.jsxs)(i.Typography.Text,{type:s.length?void 0:"secondary",children:["To send tokens to ",(0,P.jsx)("strong",{children:c.length})," address(es), you will need to sign ",(0,P.jsx)("strong",{children:s.length})," time(s) with the total estimated fee is ~",x," SOL."]})]})}),(0,P.jsx)(i.Col,{span:12,children:(0,P.jsx)(O,{disabled:!b||!!e||[m.Estimated,m.Sending,m.Done].includes(h)})}),(0,P.jsx)(i.Col,{span:12,children:[m.None,m.Estimating].includes(h)?(0,P.jsx)(R,{disabled:!!e,onChange:l}):(0,P.jsx)(Y,{bulk:s,disabled:!!e})})]})};var K=s(24656),Q=s.n(K);const V=()=>{const[e,t]=(0,o.useState)(!1),s=(0,n.useDispatch)();return(0,P.jsx)(i.Row,{gutter:[24,24],children:(0,P.jsx)(i.Col,{span:24,style:{marginBottom:16},children:(0,P.jsx)(i.Upload.Dragger,{accept:".csv,.txt",beforeUpload:async e=>(t(!0),s(b(!1)),s(f(await(e=>new Promise(((t,s)=>Q().parse(e,{skipEmptyLines:!0,complete:e=>{let{data:s}=e;return t(s)}}))))(e))),t(!1),!1),onRemove:async()=>(t(!0),s(f([])),t(!1),!0),maxCount:1,children:(0,P.jsxs)(i.Space,{direction:"vertical",size:"large",align:"center",children:[(0,P.jsx)(i.Typography.Title,{level:3,children:"Click or Drop file to upload"}),(0,P.jsxs)(i.Typography.Text,{children:["The accepted file types are ",(0,P.jsx)("code",{children:".csv"}),", ",(0,P.jsx)("code",{children:".txt"}),"."]}),(0,P.jsx)(i.Button,{type:"primary",icon:(0,P.jsx)(a.Z,{name:"cloud-upload-outline"}),loading:e,children:"Upload"})]})})})})},G=[void 0],J=e=>{let{mintAddress:t,size:s=24,icon:n=(0,P.jsx)(a.Z,{name:"diamond-outline"}),reversed:d=!1,...l}=e;const[c,u]=(0,o.useState)(G),{pools:h}=(0,r.usePool)(),p=(0,o.useCallback)((async e=>{const t=await r.tokenProvider.findByAddress(e);if(null!==t&&void 0!==t&&t.logoURI)return t.logoURI}),[]),m=(0,o.useCallback)((async()=>{if(!r.util.isAddress(t))return u(G);const e=Object.values(h||{}).find((e=>{let{mint_lpt:s}=e;return s===t}));if(e){const{mint_a:t,mint_b:s}=e,n=await Promise.all([t,s].map(p));return d&&n.reverse(),u(n)}const s=await p(t);return u([s])}),[t,d,p,h]);return(0,o.useEffect)((()=>{m()}),[m]),1===c.length?(0,P.jsx)(i.Avatar,{src:c[0],size:s,style:{backgroundColor:"#2D3355",border:"none"},...l,children:n}):(0,P.jsx)(i.Avatar.Group,{style:{display:"block",whiteSpace:"nowrap"},...l,children:c.map(((e,t)=>(0,P.jsx)(i.Avatar,{src:e,size:s,style:{backgroundColor:"#2D3355",border:"none"},children:n},t)))})},q="Unknown Token",H=e=>{let{mintAddress:t,separator:s=" \u2022 ",reversed:n=!1}=e;const[i,a]=(0,o.useState)(q),{pools:d}=(0,r.usePool)(),l=(0,o.useCallback)((async e=>{const t=await r.tokenProvider.findByAddress(e);return null!==t&&void 0!==t&&t.name?t.name:q}),[]),c=(0,o.useCallback)((async()=>{if(!r.util.isAddress(t))return a(q);const e=Object.values(d||{}).find((e=>{let{mint_lpt:s}=e;return s===t}));if(e){const{mint_a:t,mint_b:r}=e,i=await Promise.all([t,r].map(l));return n&&i.reverse(),a(`${i.join(s)} LP`)}const i=await l(t);return a(i)}),[t,n,l,d,s]);return(0,o.useEffect)((()=>{c()}),[c]),(0,P.jsx)("span",{children:i})},X="TOKN",ee=e=>{let{mintAddress:t,separator:s=" \u2022 ",reversed:n=!1}=e;const[i,a]=(0,o.useState)(X),{pools:d}=(0,r.usePool)(),l=(0,o.useCallback)((async e=>{const t=await r.tokenProvider.findByAddress(e);return null!==t&&void 0!==t&&t.symbol?t.symbol:e.substring(0,4)}),[]),c=(0,o.useCallback)((async()=>{if(!r.util.isAddress(t))return a(X);const e=Object.values(d||{}).find((e=>{let{mint_lpt:s}=e;return s===t}));if(e){const{mint_a:t,mint_b:r}=e,i=await Promise.all([t,r].map(l));return n&&i.reverse(),a(i.join(s))}const i=await l(t);return a(i)}),[t,n,l,d,s]);return(0,o.useEffect)((()=>{c()}),[c]),(0,P.jsx)("span",{children:i})};s(58421);s(7726);r.net;const te=(e,t,s)=>r.util.isAddress(e)&&void 0!==t&&void 0!==s?{mintAddress:e,amount:t,decimals:s,balance:Number(d.utils.undecimalize(t,s))}:{amount:BigInt(0),decimals:0,balance:0},se=e=>{const t=(0,r.useWalletAddress)(),s=(0,r.useWalletBalance)(),n=(0,r.useAccounts)(),{amount:i,mint:a}=n[e]||{},o=(0,r.useMintDecimals)({mintAddress:a})||0;return r.util.isAddress(t)&&r.util.isAddress(e)?e===t?te(d.DEFAULT_EMPTY_ADDRESS,s,9):te(a,i,o):te()},ne=()=>{const e=(0,n.useDispatch)(),t=(0,n.useSelector)((e=>e.main.mintAddress)),s=(0,r.useAccounts)(),{balance:a}=(e=>{const[t,s]=(0,o.useState)(""),n=(0,r.useWalletAddress)(),i=se(t);return(0,o.useEffect)((()=>{(async()=>{if(!r.util.isAddress(n)||!r.util.isAddress(e))return s("");const t=await r.util.deriveAssociatedAddress(n,e);s(t)})()})),i})(t);return(0,P.jsx)(i.Card,{children:(0,P.jsxs)(i.Row,{gutter:[16,16],children:[(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(i.Select,{size:"large",placeholder:"Select token",style:{width:"100%"},onChange:t=>e(x(t)),children:Object.values(s).map(((e,t)=>{let{mint:s}=e;return(0,P.jsx)(i.Select.Option,{value:s,children:(0,P.jsxs)(i.Space,{align:"center",children:[(0,P.jsx)(J,{mintAddress:s}),(0,P.jsx)(i.Typography.Text,{type:"secondary",children:(0,P.jsx)(ee,{mintAddress:s})}),(0,P.jsx)(i.Typography.Text,{children:(0,P.jsx)(H,{mintAddress:s})})]})},t)}))})}),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsxs)(i.Space,{children:[(0,P.jsx)(i.Typography.Text,{type:"secondary",children:"Balance:"}),(0,P.jsx)(i.Typography.Text,{children:r.util.numeric(a).format("0,0.[0000]")}),(0,P.jsx)(i.Typography.Text,{children:(0,P.jsx)(ee,{mintAddress:t})})]})})]})})},re=e=>{let{index:t,accountAddress:s,amount:o}=e;const l=(0,n.useDispatch)(),c=(0,n.useSelector)((e=>e.main.data)),u=(0,n.useSelector)((e=>e.main.mintAddress)),h=(0,r.useMintDecimals)({mintAddress:u})||0,p=r.util.isAddress(s)?I(o)?"":"Invalid amount":"Invalid address",m=c.slice(0,t).findIndex((e=>{let[t]=e;return t===s})),g=m>=0?`Duplicated address to #${m}`:"",y=I(o)?d.utils.undecimalize(I(o),h):o;return(0,P.jsxs)(i.Row,{gutter:[16,8],children:[(0,P.jsx)(i.Col,{span:24,children:(0,P.jsxs)(i.Row,{gutter:[16,8],align:"middle",wrap:!1,children:[(0,P.jsx)(i.Col,{children:(0,P.jsxs)(i.Typography.Text,{type:"secondary",children:["#",t+1]})}),(0,P.jsx)(i.Col,{span:12,children:(0,P.jsx)(i.Tooltip,{title:s,children:(0,P.jsx)(i.Typography.Text,{ellipsis:!0,children:s})})}),(0,P.jsx)(i.Col,{flex:"auto",children:(0,P.jsxs)(i.Space,{children:[(0,P.jsx)(i.Typography.Text,{children:y}),(0,P.jsx)(i.Typography.Text,{children:(0,P.jsx)(ee,{mintAddress:u})})]})}),(0,P.jsx)(i.Col,{children:(0,P.jsxs)(i.Space,{align:"center",children:[g?(0,P.jsx)(i.Tooltip,{title:g,children:(0,P.jsx)(a.Z,{name:"alert-circle-outline",style:{color:"#FCB017"}})}):null,p?(0,P.jsx)(i.Tooltip,{title:p,children:(0,P.jsx)(a.Z,{name:"warning-outline",style:{color:"#F2323F"}})}):null,(0,P.jsx)(i.Button,{type:"text",icon:(0,P.jsx)(a.Z,{name:"trash-outline"}),onClick:()=>(e=>{const t=[...c];return t.splice(e,1),l(f(t))})(t)})]})})]})}),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(i.Divider,{style:{margin:0}})})]})},ie=()=>{const[e,t]=(0,o.useState)(""),[s,l]=(0,o.useState)(""),c=(0,n.useSelector)((e=>e.main.data)),u=(0,n.useSelector)((e=>e.main.mintAddress)),h=(0,r.useMintDecimals)({mintAddress:u})||0,p=(0,n.useDispatch)(),m=(0,o.useMemo)((()=>!(!r.util.isAddress(e)||!Number(s))),[e,s]),g=(0,o.useCallback)((async()=>{if(!r.util.isAddress(e))return window.notify({type:"warning",description:"Invalid address"});if(!Number(s))return window.notify({type:"warning",description:"Invalid amount"});const n=[...c];n.push([e,d.utils.decimalize(s,h).toString()]),await p(f(n)),await t(""),await l("")}),[e,s,c,h,p]);return(0,P.jsxs)(i.Row,{gutter:[16,8],align:"middle",wrap:!1,children:[(0,P.jsx)(i.Col,{span:12,children:(0,P.jsx)(i.Input,{placeholder:"Address",value:e,onChange:e=>t(e.target.value||"")})}),(0,P.jsx)(i.Col,{flex:"auto",children:(0,P.jsx)(i.InputNumber,{placeholder:"Amount",value:s,onChange:e=>l(e),stringMode:!0,type:"number",controls:!1,style:{width:"100%"}})}),(0,P.jsx)(i.Col,{children:(0,P.jsx)(i.Button,{type:"primary",icon:(0,P.jsx)(a.Z,{name:"add-outline"}),onClick:g,disabled:!m})})]})},ae=()=>{const e=(0,n.useDispatch)(),t=(0,n.useSelector)((e=>e.main.data)),s=(0,n.useSelector)((e=>e.main.decimalized)),a=(0,n.useSelector)((e=>e.main.mintAddress)),o=(0,r.useMintDecimals)({mintAddress:a})||0;return(0,P.jsxs)(i.Row,{gutter:[8,8],justify:"end",align:"middle",children:[(0,P.jsx)(i.Col,{children:(0,P.jsx)(i.Typography.Text,{children:"With Decimals?"})}),(0,P.jsx)(i.Col,{children:(0,P.jsx)(i.Switch,{checked:s,onChange:async s=>{const n=t.map((e=>{let[t,n]=e;return[t,s?d.utils.decimalize(n,o).toString():d.utils.undecimalize(I(n),o)]}));await e(b(s)),await e(f(n))},checkedChildren:o,unCheckedChildren:o,disabled:!o})})]})},oe=()=>{const e=(0,n.useSelector)((e=>e.main.data));return(0,P.jsxs)(i.Row,{gutter:[16,16],children:[(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(ae,{})}),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(i.Card,{bodyStyle:{padding:16,height:384},className:"scrollbar",children:(0,P.jsxs)(i.Row,{gutter:[8,8],children:[e.length?null:(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(i.Typography.Text,{type:"secondary",children:"No Data"})}),e.map(((e,t)=>{let[s,n]=e;return(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(re,{index:t,accountAddress:s,amount:n})},s+t)})),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(ie,{})}),(0,P.jsx)(i.Col,{span:24})]})})})]})},de=()=>(0,P.jsxs)(i.Row,{gutter:[24,24],justify:"center",children:[(0,P.jsx)(i.Col,{span:24,style:{maxWidth:1200},children:(0,P.jsxs)(i.Row,{gutter:[24,24],children:[(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(i.Typography.Title,{level:3,children:"Solana Bulk Sender"})}),(0,P.jsx)(i.Col,{xs:24,md:12,children:(0,P.jsxs)(i.Row,{gutter:[24,24],children:[(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(i.Card,{onClick:()=>window.open("https://hub.sentre.io/lightning_tunnel?autoInstall=true","_blank"),hoverable:!0,children:(0,P.jsxs)(i.Typography.Text,{children:[(0,P.jsx)(a.Z,{name:"information-circle-outline"})," If you plan to do Airdrops (or Retroactives, Vesting, Distributions), we highly recommend"," ",(0,P.jsx)("span",{style:{color:"#328f62"},children:"Lightning Tunnel"})," ","to effectively save transaction fees."]})})}),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(ne,{})}),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(V,{})})]})}),(0,P.jsx)(i.Col,{xs:24,md:12,children:(0,P.jsxs)(i.Row,{gutter:[24,24],children:[(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(oe,{})}),(0,P.jsx)(i.Col,{span:24,children:(0,P.jsx)(F,{})})]})})]})}),(0,P.jsx)(i.Col,{span:24})]});var le=s(48744),ce=s.n(le),ue=s(97429).Buffer;BigInt.prototype.toJSON=function(){return this.toString()};const he={serializableCheck:{isSerializable:e=>"undefined"===typeof e||null===e||"string"===typeof e||"boolean"===typeof e||"number"===typeof e||Array.isArray(e)||(e=>{if(null===e)return!1;const t=Object.getPrototypeOf(e);return null!==t&&null===Object.getPrototypeOf(t)})(e)||"bigint"===typeof e||e instanceof A.PublicKey||e instanceof ce()||ue.isBuffer(e)}},pe=(0,p.configureStore)({middleware:e=>e(he),devTools:!1,reducer:{main:w}});var me=s(45597);const{manifest:{appId:ge}}=h,ye=()=>(0,P.jsx)(r.UIProvider,{appId:ge,antd:{prefixCls:ge},children:(0,P.jsx)(r.PoolProvider,{children:(0,P.jsx)(n.Provider,{store:pe,children:(0,P.jsx)(de,{})})})})},83272:(e,t,s)=>{"use strict";e.exports=s.p+"static/media/README.631f2b04a38660f9ec7f.md"},69363:(e,t,s)=>{"use strict";e.exports=s.p+"static/media/logo.1e3475aabcdd9e1626aa.png"},70854:(e,t,s)=>{"use strict";e.exports=s.p+"static/media/panel.6b76cca872cba442836f.png"},65096:(e,t,s)=>{"use strict";e.exports=s.p+"static/media/preview.1dc7ab4f81b92a27dbf6.png"},46601:()=>{},89214:()=>{},85568:()=>{},52361:()=>{},94616:()=>{},55024:()=>{}}]);
//# sourceMappingURL=src_bootstrap_app_tsx.43249e94.chunk.js.map