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
    url: 'https://descartesnetwork.github.io/bulksender/index.js',
    appId: 'bulksender',
    name: 'Bulk Sender',
  },
}

export default register
