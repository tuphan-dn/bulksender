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
    base: `${window.location.origin}/referral/`,
  },

  /**
   * Staging configurations
   */
  staging: {
    base: 'https://hub.sentre.io/referral/',
  },

  /**
   * Production configurations
   */
  production: {
    base: 'https://hub.sentre.io/referral/',
  },
}

/**
 * Module exports
 */
export default conf
