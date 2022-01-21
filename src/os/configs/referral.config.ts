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
    base: `${window.location.origin}/dashboard?referral=`,
  },

  /**
   * Staging configurations
   */
  staging: {
    base: 'https://hub.sentre.io/dashboard?referral=',
  },

  /**
   * Production configurations
   */
  production: {
    base: 'https://hub.sentre.io/dashboard?referral=',
  },
}

/**
 * Module exports
 */
export default conf
