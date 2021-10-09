import { Env } from './env'

/**
 * Contructor
 */

type Config = {
  subversion: 'devnet' | 'alpha' | 'beta' | null
}

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    subversion: 'devnet',
  },

  /**
   * Staging configurations
   */
  staging: {
    subversion: 'devnet',
  },

  /**
   * Production configurations
   */
  production: {
    subversion: 'beta',
  },
}

/**
 * Module exports
 */
export default configs
