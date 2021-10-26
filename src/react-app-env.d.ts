/// <reference types="react-scripts" />

declare module 'senhub/*'
declare module 'flexsearch'
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}

// declare global {
//   interface Window {
//     sentre: {
//       wallet: WalletInterface
//       lamports: Lamports
//       splt: SPLT
//       swap: Swap
//     }
//   }
// }