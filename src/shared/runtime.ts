import { Connection } from '@solana/web3.js'
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
const CLUSTERS: Record<Net, string[]> = {
  devnet: [
    'https://api.devnet.solana.com',
    'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/',
  ],
  testnet: ['https://api.testnet.solana.com'],
  mainnet: [
    'https://ssc-dao.genesysgo.net/',
    'https://solana-api.projectserum.com',
    'https://solitary-autumn-water.solana-mainnet.quiknode.pro/dcbac9d444818a20ac583541dec35b44c6840888/',
  ],
}
const getRPC = () => {
  const rpcs = CLUSTERS[net]
  const rpc = rpcs[Math.floor(Math.random() * rpcs.length)]
  console.log('Debug OS RPC:', rpc)
  return rpc
}
export const rpc: string = getRPC()

/**
 * Ping Solana cluster
 * @param nodeRpc - Solana's RPC cluster
 * @returns ping time
 */
export const pingCluster = async (nodeRpc: string): Promise<number> => {
  const connection = new Connection(nodeRpc)
  const start = Date.now()
  await connection.getVersion()
  const end = Date.now()
  return end - start
}
