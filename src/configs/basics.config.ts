import { Env } from './env'

if (
  typeof process.env.REACT_APP_ID !== 'string' ||
  typeof process.env.REACT_APP_LOCAL !== 'string' ||
  typeof process.env.REACT_APP_GITHUB !== 'string'
)
  throw new Error(
    'Please add REACT_APP_ID, REACT_APP_LOCAL, and REACT_APP_GITHUB in .env!',
  )

/**
 * Contructor
 */

type Config = {
  appId: string
  url: string
}

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    appId: process.env.REACT_APP_ID,
    url: process.env.REACT_APP_LOCAL,
  },

  /**
   * Staging configurations
   */
  staging: {
    appId: process.env.REACT_APP_ID,
    url: '',
  },

  /**
   * Production configurations
   */
  production: {
    appId: process.env.REACT_APP_ID,
    url: process.env.REACT_APP_GITHUB,
  },
}

/**
 * Module exports
 */
export default configs
