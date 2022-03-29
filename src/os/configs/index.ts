import { net, env } from 'shared/runtime'
import sol from './sol.config'
import register from './register.config'
import stat from './stat.config'

const configs = {
  sol: sol[net],
  register: register[env],
  stat: stat[net],
}

/**
 * Module exports
 */
export default configs
