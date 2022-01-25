import { Env } from 'shared/runtime'

/**
 * Contructor
 */

type Conf = {
  base: string
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    base: `${window.location.origin}/dashboard?referrer=`,
  },

  /**
   * Staging configurations
   */
  staging: {
    base: 'https://hub.sentre.io/dashboard?referrer=',
  },

  /**
   * Production configurations
   */
  production: {
    base: 'https://hub.sentre.io/dashboard?referrer=',
  },
}

/**
 * Module exports
 */
export default conf
