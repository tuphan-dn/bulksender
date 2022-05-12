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
  ],
}

const balancing = (): string => {
  if (!window.cluster) {
    const clusters = CLUSTERS[net]
    const cluster = clusters[Math.floor(Math.random() * clusters.length)]
    console.log('Debug OS Random Cluster:', window.cluster)
    return cluster
  }
  console.log('Debug OS Window Cluster:', window.cluster)
  return window.cluster
}

export const rpc: string = balancing()

/**
 * Ping solana cluster
 * @param nodeRpc - solana cluster's node RPC
 * @returns duration ping to solana
 */
export const pingSolanaCluster = async (nodeRpc: string): Promise<number> => {
  const connection = new Connection(nodeRpc)
  const start = Date.now()
  await connection.getVersion()
  const end = Date.now()
  return end - start
}

/**
 * Check health and get best cluster
 * @returns best cluster with duration at least
 */
export const getBestCluster = async (): Promise<string> => {
  const clusters = CLUSTERS[net]
  return new Promise((resolveBestCluster) =>
    clusters.forEach(async (cluster) => {
      try {
        await pingSolanaCluster(cluster)
        resolveBestCluster(cluster)
      } catch (error) {}
    }),
  )
}
