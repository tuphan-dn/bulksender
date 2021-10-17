import { env, net } from './runtime'
import manifest from './manifest.config'
import sol from './sol.config'

const configs = {
  env,
  net,
  manifest: manifest[env],
  sol: sol[net],
}

/**
 * Module exports
 */
export default configs
