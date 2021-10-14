import { Env } from './env'

const SOLVARS = {
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
}

/**
 * Contructor
 */
type Config = {
  node: string
  cluster: 'devnet' | 'testnet' | 'mainnet'
  chainId: 101 | 102 | 103
  senAddress: string
  swapAddress: string
  taxmanAddress: string
} & typeof SOLVARS

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    node: 'https://api.devnet.solana.com',
    chainId: 103,
    cluster: 'devnet',
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    ...SOLVARS,
    swapAddress: '4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
  },

  /**
   * Staging configurations
   */
  staging: {
    node: 'https://api.devnet.solana.com',
    cluster: 'devnet',
    chainId: 103,
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    ...SOLVARS,
    swapAddress: '4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
  },

  /**
   * Production configurations
   */
  production: {
    node: 'https://api.mainnet-beta.solana.com',
    cluster: 'mainnet',
    chainId: 101,
    senAddress: 'SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M',
    ...SOLVARS,
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
  },
}

/**
 * Module exports
 */
export default configs
