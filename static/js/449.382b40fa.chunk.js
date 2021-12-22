(globalThis.webpackChunkbulk_sender=globalThis.webpackChunkbulk_sender||[]).push([[449],{99800:(e,s,t)=>{"use strict";t.r(s),t.d(s,{AccountProvider:()=>v,MintProvider:()=>O,PoolProvider:()=>p,UIProvider:()=>d,WalletProvider:()=>x,useAccount:()=>I,useMint:()=>se,usePool:()=>g,useUI:()=>u,useWallet:()=>y,withAccount:()=>A,withMint:()=>ee,withPool:()=>f,withUI:()=>l,withWallet:()=>k});var n=t(92950),r=t(55754),o=t(78589),i=t(45263);const a=(0,n.createContext)({}),d=({children:e,appId:s,style:t={},antd:d=!1})=>{const c=(0,r.useSelector)((e=>e.ui)),l=(0,n.useMemo)((()=>({ui:c})),[c]),u=d?{getPopupContainer:()=>document.getElementById(s),..."object"===typeof d?d:{}}:void 0;return(0,i.jsx)(a.Provider,{value:l,children:(0,i.jsx)("section",{id:s,style:{height:"100%",backgroundColor:"transparent",...t},children:u?(0,i.jsx)(o.ConfigProvider,{...u,children:e}):e})})},c=({children:e})=>(0,i.jsx)(a.Consumer,{children:s=>n.Children.map(e,(e=>(0,n.cloneElement)(e,{...s})))}),l=e=>{class s extends n.Component{render(){const{forwardedRef:s,...t}=this.props;return(0,i.jsx)(c,{children:(0,i.jsx)(e,{ref:s,...t})})}}return(0,n.forwardRef)(((e,t)=>(0,i.jsx)(s,{...e,ref:t})))},u=()=>(0,n.useContext)(a),h=(0,n.createContext)({}),p=({children:e})=>{const s=(0,r.useSelector)((e=>e.pools)),t=(0,n.useMemo)((()=>({pools:s})),[s]);return(0,i.jsx)(h.Provider,{value:t,children:e})},m=({children:e})=>(0,i.jsx)(h.Consumer,{children:s=>n.Children.map(e,(e=>(0,n.cloneElement)(e,{...s})))}),f=e=>{class s extends n.Component{render(){const{forwardedRef:s,...t}=this.props;return(0,i.jsx)(m,{children:(0,i.jsx)(e,{ref:s,...t})})}}return(0,n.forwardRef)(((e,t)=>(0,i.jsx)(s,{...e,ref:t})))},g=()=>(0,n.useContext)(h),w=(0,n.createContext)({}),x=({children:e})=>{const s=(0,r.useSelector)((e=>e.wallet)),t=(0,n.useMemo)((()=>({wallet:s})),[s]);return(0,i.jsx)(w.Provider,{value:t,children:e})},b=({children:e})=>(0,i.jsx)(w.Consumer,{children:s=>n.Children.map(e,(e=>(0,n.cloneElement)(e,{...s})))}),k=e=>{class s extends n.Component{render(){const{forwardedRef:s,...t}=this.props;return(0,i.jsx)(b,{children:(0,i.jsx)(e,{ref:s,...t})})}}return(0,n.forwardRef)(((e,t)=>(0,i.jsx)(s,{...e,ref:t})))},y=()=>(0,n.useContext)(w),C=(0,n.createContext)({}),v=({children:e})=>{const s=(0,r.useSelector)((e=>e.accounts)),t=(0,n.useMemo)((()=>({accounts:s})),[s]);return(0,i.jsx)(C.Provider,{value:t,children:e})},j=({children:e})=>(0,i.jsx)(C.Consumer,{children:s=>n.Children.map(e,(e=>(0,n.cloneElement)(e,{...s})))}),A=e=>{class s extends n.Component{render(){const{forwardedRef:s,...t}=this.props;return(0,i.jsx)(j,{children:(0,i.jsx)(e,{ref:s,...t})})}}return(0,n.forwardRef)(((e,t)=>(0,i.jsx)(s,{...e,ref:t})))},I=()=>(0,n.useContext)(C);var M=t(19289),S=t(95418);const P="mints",E=(0,M.createAsyncThunk)("mints/getMint",(async({address:e,force:s=!1},{getState:t})=>{if(!S.account.isAddress(e))throw new Error("Invalid mint address");if(!s){const{accounts:{[e]:s}}=t();if(s)return{[e]:s}}const{splt:n}=window.sentre;return{[e]:await n.getMintData(e)}})),R=(0,M.createAsyncThunk)("mints/upsetMint",(async({address:e,data:s})=>{if(!S.account.isAddress(e))throw new Error("Invalid address");if(!s)throw new Error("Data is empty");return{[e]:s}})),T=(0,M.createAsyncThunk)("mints/deleteMint",(async({address:e})=>{if(!S.account.isAddress(e))throw new Error("Invalid address");return{address:e}}));(0,M.createSlice)({name:P,initialState:{},reducers:{},extraReducers:e=>{e.addCase(E.fulfilled,((e,{payload:s})=>{Object.assign(e,s)})).addCase(R.fulfilled,((e,{payload:s})=>{Object.assign(e,s)})).addCase(T.fulfilled,((e,{payload:s})=>{delete e[s.address]}))}}).reducer;var U=t(11796),B=t(67845),L=t(63805);const D={spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"},q={devnet:{...D,node:"https://api.devnet.solana.com",chainId:103,sntrAddress:"5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ",sntrPoolAddress:"3EUPL7YQLbU6DNU5LZeQeHPXTf1MigJ2yASXA9rH5Ku4",swapAddress:"4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF",taxmanAddress:"8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9",bulksenderAddress:"FjkVzT6QJCQrgoZ8VoyAqysD5Mfa73ekpXWe9zDprWRA"},testnet:{...D,node:"https://api.testnet.solana.com",chainId:102,sntrAddress:"",sntrPoolAddress:"",swapAddress:"",taxmanAddress:"",bulksenderAddress:""},mainnet:{...D,node:"https://api.mainnet-beta.solana.com",chainId:101,sntrAddress:"SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M",sntrPoolAddress:"Aa3WZX7Xunfebp2MuAcz9CNw8TYTDL7mVrmb11rjyVm6",swapAddress:"SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV",taxmanAddress:"9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e",bulksenderAddress:""}};const Z="senhub",W={bulk_sender:{url:"https://tuphan-dn.github.io/bulksender/index.js",appId:"bulk_sender",name:"Bulk Sender",author:{name:"Tu Phan",email:"tuphan@descartes.network"},supportedViews:"page".split(",").map((e=>e.trim())).filter((e=>["page","widget"].includes(e))),tags:"solana,dapp,utility".split(",").map((e=>e.trim())),description:"Single signature for Multiple transactions",verified:!1}},F={development:{defaultAppId:Z,extra:W,senreg:"https://descartesnetwork.github.io/senreg/register.json"},staging:{defaultAppId:Z,extra:W,senreg:"https://descartesnetwork.github.io/senreg/register.json"},production:{defaultAppId:Z,extra:{},senreg:"https://descartesnetwork.github.io/senreg/register.json"}},N={sol:q[L.ef],register:F[L.OB]},V=e=>({symbol:"SOL",name:"Solana",address:"11111111111111111111111111111111",decimals:9,chainId:e,extensions:{coingeckoId:"solana"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"}),G=e=>({symbol:"SNTR",name:"Sentre",address:"5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ",decimals:9,chainId:e,extensions:{coingeckoId:"sentre"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png"}),J=[V(103),G(103),{symbol:"wBTC",name:"Wrapped Bitcoin",address:"8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM",decimals:9,chainId:103,extensions:{coingeckoId:"bitcoin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png"},{symbol:"wETH",name:"Ethereum",address:"27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c",decimals:9,chainId:103,extensions:{coingeckoId:"ethereum"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png"},{symbol:"UNI",name:"Uniswap",address:"FVZFSXu3yn17YdcxLD72TFDUqkdE5xZvcW18EUpRQEbe",decimals:9,chainId:103,extensions:{coingeckoId:"uniswap"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3MVa4e32PaKmPxYUQ6n8vFkWtCma68Ld7e7fTktWDueQ/logo.png"},{symbol:"USDC",name:"USD Coin",address:"2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj",decimals:9,chainId:103,extensions:{coingeckoId:"usd-coin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"}],{sol:{chainId:X,sntrAddress:Y}}=N,z=/[\W_]+/g,K={tokenize:"full",context:!0,minlength:3},Q={document:{id:"address",index:[{field:"symbol",...K},{field:"name",...K}]}};const H=new class{constructor(){this.tokenMap=void 0,this.engine=void 0,this.chainId=void 0,this.cluster=void 0,this.loading=void 0,this.queue=void 0,this._init=async()=>this.tokenMap.size?[this.tokenMap,this.engine]:new Promise((async e=>{if(this.loading)return this.queue.push(e);this.loading=!0;let s=await(await(new B.DK).resolve()).filterByChainId(this.chainId).getList();for(s.forEach(((e,t)=>{if(e.address===Y){const{extensions:n,name:r,symbol:o,...i}=e;s[t]={...i,name:"Sentre",symbol:"SNTR",extensions:{...n,coingeckoId:"sentre"}}}})),"devnet"===this.cluster&&(s=s.concat(J)),s="testnet"===this.cluster?s.concat([G(102),V(102)]):s.concat([V(101)]),s.forEach((e=>this.tokenMap.set(e.address,e))),this.engine=new U.Document(Q),this.tokenMap.forEach((({address:e,...s})=>this.engine.add(e,s))),e([this.tokenMap,this.engine]);this.queue.length;)this.queue.shift()([this.tokenMap,this.engine]);this.loading=!1})),this.all=async()=>{const[e]=await this._init();return Array.from(e.values())},this.findByAddress=async e=>{const[s]=await this._init();return s.get(e)},this.find=async(e,s)=>{const[t,n]=await this._init();let r=[];return e.split(z).forEach((e=>n.search(e,s).forEach((({result:e})=>e.forEach((e=>{if(r.findIndex((({address:s})=>s===e))<0){const s=t.get(e);s&&r.push(s)}})))))),r},this.tokenMap=new Map,this.engine=void 0,this.chainId=X,this.cluster=L.ef,this.loading=!1,this.queue=[],this._init()}},_=(0,n.createContext)({}),O=({children:e})=>{const s=(0,r.useDispatch)(),t=(0,r.useSelector)((e=>e.mints)),o=(0,n.useCallback)((async(...e)=>await s(E(...e)).unwrap()),[s]),a=(0,n.useMemo)((()=>({mints:t,getMint:o,tokenProvider:H})),[t,o]);return(0,i.jsx)(_.Provider,{value:a,children:e})},$=({children:e})=>(0,i.jsx)(_.Consumer,{children:s=>n.Children.map(e,(e=>(0,n.cloneElement)(e,{...s})))}),ee=e=>{class s extends n.Component{render(){const{forwardedRef:s,...t}=this.props;return(0,i.jsx)($,{children:(0,i.jsx)(e,{ref:s,...t})})}}return(0,n.forwardRef)(((e,t)=>(0,i.jsx)(s,{...e,ref:t})))},se=()=>(0,n.useContext)(_)},63805:(e,s,t)=>{"use strict";t.d(s,{OB:()=>r,ef:()=>o});var n=t(53933);const r="production",o=(()=>{switch(n.Z.get("network")){case"devnet":return"devnet";case"testnet":return"testnet";default:return"mainnet"}})()},53933:(e,s,t)=>{"use strict";t.d(s,{Z:()=>a});const n="sentre",r=window.localStorage,o=e=>{if(!e)return null;try{return JSON.parse(e)}catch(s){return null}},i={set:(e,s)=>{let t=o(r.getItem(n));t&&"object"===typeof t||(t={}),t[e]=s,r.setItem(n,JSON.stringify(t))},get:e=>{let s=o(r.getItem(n));return s&&"object"===typeof s?s[e]:null},clear:e=>{i.set(e,null)}},a=i},46601:()=>{},89214:()=>{},85568:()=>{},52361:()=>{},94616:()=>{},55024:()=>{}}]);
//# sourceMappingURL=449.382b40fa.chunk.js.map