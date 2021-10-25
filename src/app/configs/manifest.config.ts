import { Env } from 'shared/runtime'

if (
  typeof process.env.REACT_APP_ID !== 'string' ||
  typeof process.env.REACT_APP_URL !== 'string' ||
  typeof process.env.REACT_APP_SENHUB !== 'string'
)
  throw new Error('Please add REACT_APP_ID, REACT_APP_URL in .env!')

/**
 * Contructor
 */

type Conf = {
  appId: string
  url: string
  senhub: string
}

const shared = {
  appId: process.env.REACT_APP_ID,
  url: process.env.REACT_APP_URL,
  senhub: process.env.REACT_APP_SENHUB,
}

const conf: Record<Env, Conf> = {
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
export default conf
