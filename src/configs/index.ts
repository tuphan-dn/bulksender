import env from './env'
import basics from './basics.config'
import sol from './sol.config'

const configs = {
  env,
  basics: basics[env],
  sol: sol[env],
}

/**
 * Module exports
 */
export default configs
