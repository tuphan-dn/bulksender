import env from './env'
import manifest from './manifest.config'
import sol from './sol.config'

const configs = {
  env,
  manifest: manifest[env],
  sol: sol[env],
}

/**
 * Module exports
 */
export default configs
