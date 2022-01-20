import { net, env } from 'shared/runtime'
import sol from './sol.config'
import register from './register.config'
import referral from './referral.config'

const configs = {
  sol: sol[net],
  register: register[env],
  referral: referral[env],
}

/**
 * Module exports
 */
export default configs
