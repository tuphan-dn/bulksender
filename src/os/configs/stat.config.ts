import { Net } from 'shared/runtime'

/**
 * Contructor
 */
type Config = {
  baseURL: string
}

const config: Record<Net, Config> = {
  /**
   * Development configurations
   */
  devnet: {
    baseURL: 'https://stat-dev.sentre.io',
  },

  /**
   * Staging configurations
   */
  testnet: {
    baseURL: 'https://stat-dev.sentre.io',
  },

  /**
   * Production configurations
   */
  mainnet: {
    baseURL: 'https://stat.sentre.io',
  },
}

/**
 * Module exports
 */
export default config
