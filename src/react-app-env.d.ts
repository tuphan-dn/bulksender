/// <reference types="react-scripts" />

// Declare global
type SentreNotification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}
interface Window {
  // Sentre
  sentre: {
    wallet: import('@senswap/sen-js').WalletInterface
    lamports: import('@senswap/sen-js').Lamports
    splt: import('@senswap/sen-js').SPLT
    swap: import('@senswap/sen-js').Swap
    ipfs: ReturnType<import('ipfs-core').create>
  }
  // Utility
  notify: ({ type, description, onClick }: SentreNotification) => void
  // Partner wallet
  coin98: any
  solana: any
  Slope: any
}
interface BigInt {
  toJSON: (this: bigint) => string
}

// Declare module
declare module 'senhub/*'
declare module 'flexsearch'

// Declare namespace
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}
