import { env } from 'shared/runtime'
import configs from 'app/configs'

const {
  manifest: { url, appId },
} = configs

const fixed: SenHubRegister = {
  senstore: {
    url: 'https://descartesnetwork.github.io/senstore/index.js',
    appId: 'senstore',
    name: 'Sen Store',
  },
}

const register: SenHubRegister =
  env === 'production'
    ? {}
    : {
        [appId]: {
          url: `${url}/index.js`,
          appId,
          name: 'My App',
        },
      }

export default { ...register, ...fixed }
