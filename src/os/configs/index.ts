import { net, env } from 'shared/runtime'
import sol from './sol.config'
import register from './register.config'
import referral from './referral.config'
import stat from './stat.config'

const configs = {
  sol: sol[net],
  register: register[env],
  referral: referral[env],
  stat: stat[net],
}

/**
 * Module exports
 */
export default configs
