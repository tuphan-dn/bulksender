import storage from './storage'

/**
 * Environment
 */
const getEnv = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'development':
      return 'development'
    case 'staging':
      return 'staging'
    case 'production':
      return 'production'
    default:
      return 'development'
  }
}
export type Env = 'development' | 'staging' | 'production'
export const env: Env = getEnv()

/**
 * Network
 */
const getNetwork = () => {
  switch (storage.get('network')) {
    case 'devnet':
      return 'devnet'
    case 'testnet':
      return 'testnet'
    case 'mainnet':
      return 'mainnet'
    default:
      return 'mainnet'
  }
}
export type Net = 'devnet' | 'testnet' | 'mainnet'
export const net: Net = getNetwork()

export const onSwitchNetwork = (value: Net) => {
  storage.set('network', value)
  return window.location.reload()
}

/**
 * Chain ID
 */
const getChainId = () => {
  switch (net) {
    case 'devnet':
      return 103
    case 'testnet':
      return 102
    case 'mainnet':
      return 101
    default:
      return 101
  }
}
export type ChainId = 101 | 102 | 103
export const chainId: ChainId = getChainId()

/**
 * RPC Node
 */
const devnetRPCs = [
  'https://api.devnet.solana.com',
  'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/',
]
const testnetRPCs = ['https://api.testnet.solana.com']
const mainnetRPCs = [
  'https://ssc-dao.genesysgo.net/',
  'https://solana-api.projectserum.com',
]
const balancing = <T>(arr: T[]): T => {
  const rpc = arr[Math.floor(Math.random() * arr.length)]
  console.log('Debug OS RPC:', rpc)
  return rpc
}
const getRPC = () => {
  switch (net) {
    case 'devnet':
      return balancing(devnetRPCs)
    case 'testnet':
      return balancing(testnetRPCs)
    case 'mainnet':
      return balancing(mainnetRPCs)
    default:
      return balancing(mainnetRPCs)
  }
}
export const rpc: string = getRPC()
