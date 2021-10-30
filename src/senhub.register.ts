import configs from 'app/configs'

const {
  manifest: { url, appId },
} = configs

const register: SenHubRegister = {
  [appId]: {
    url: `${url}/index.js`,
    appId,
    name: 'My App',
  },
  bulksender: {
    url: 'https://descartesnetwork.github.io/senstore/index.js',
    appId: 'senstore',
    name: 'Sen Store',
  },
}

export default register
