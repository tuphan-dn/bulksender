import env from './env'
import basics from './basics.config'

const configs = {
  env,
  basics: basics[env],
}

/**
 * Module exports
 */
export default configs
