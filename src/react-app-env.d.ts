/// <reference types="react-scripts" />

/**
 * Declare global
 */
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
    ipfs?: ReturnType<import('ipfs-core').create>
  }
  // Utility
  notify: ({ type, description, onClick }: SentreNotification) => void
  // Partner wallet
  coin98: any
  solana: any
  Slope: any
}

// For bigint serialization
interface BigInt {
  toJSON: (this: bigint) => string
}

// Application ID management
type AppIds = Array<string>
// Application manifest
type ComponentManifest = {
  url: string
  appId: string
  name: string
  author: {
    name: string
    email: string
  }
  description: string
  verified: boolean
}
// List of application manifests
type SenHubRegister = Record<string, ComponentManifest | undefined>
// Widget size
type WidgetSize = 'small' | 'middle' | 'large'
type WidgetType = 'default' | 'solid' 
type WidgetConfig = {
  size?: WidgetSize
  type?: WidgetType
}
type CgkData = {
  icon: any;
  symbol: any;
  name: any;
  address: any;
  rank: any;
  price: any;
  priceChange: any;
  totalVolume: any;
}
/**
 * Declare module
 */
declare module '*.md'
declare module 'senhub/*'
declare module 'flexsearch'

/**
 * Declare namespace
 */
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}
