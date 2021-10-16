import { Env } from './env'

if (
  typeof process.env.REACT_APP_ID !== 'string' ||
  typeof process.env.REACT_APP_URL !== 'string'
)
  throw new Error('Please add REACT_APP_ID, REACT_APP_URL in .env!')

/**
 * Contructor
 */

type Config = {
  appId: string
  url: string
}

const shared = {
  appId: process.env.REACT_APP_ID,
  url: process.env.REACT_APP_URL,
}

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    ...shared,
  },

  /**
   * Staging configurations
   */
  staging: {
    ...shared,
  },

  /**
   * Production configurations
   */
  production: {
    ...shared,
  },
}

/**
 * Module exports
 */
export default configs
