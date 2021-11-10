import { Net } from 'shared/runtime'

const SOLVARS = {
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
}

/**
 * Contructor
 */
type Conf = {
  node: string
  chainId: 101 | 102 | 103
  senAddress: string
  senPoolAddress: string
  swapAddress: string
  taxmanAddress: string
} & typeof SOLVARS

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    ...SOLVARS,
    node: 'https://api.devnet.solana.com',
    chainId: 103,
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    senPoolAddress: '3EUPL7YQLbU6DNU5LZeQeHPXTf1MigJ2yASXA9rH5Ku4',
    swapAddress: '4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
  },

  /**
   * Staging configurations
   */
  testnet: {
    ...SOLVARS,
    node: 'https://api.testnet.solana.com',
    chainId: 102,
    senAddress: '',
    senPoolAddress: '',
    swapAddress: '',
    taxmanAddress: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    ...SOLVARS,
    node: 'https://api.mainnet-beta.solana.com',
    chainId: 101,
    senAddress: 'SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M',
    senPoolAddress: '',
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
  },
}

/**
 * Module exports
 */
export default conf
