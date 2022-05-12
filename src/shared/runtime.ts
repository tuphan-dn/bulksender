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
const RPC_NETS: Record<Net, string[]> = {
  devnet: [
    'https://api.devnet.solana.com',
    'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/',
  ],
  testnet: ['https://api.testnet.solana.com'],
  mainnet: [
    'https://ssc-dao.genesysgo.net/',
    'https://solana-api.projectserum.com',
  ],
}

const balancing = (): string => {
  if (!!window.rpc_balancing) {
    console.log('Debug OS Window RPC:', window.rpc_balancing)
    return window.rpc_balancing
  }
  const RPCs = getRPCs()
  return RPCs[Math.floor(Math.random() * RPCs.length)]
}

export const getRPCs = () => RPC_NETS[net]
export const rpc: string = balancing()
