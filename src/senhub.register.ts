import configs from 'app/configs'

const {
  manifest: { url, appId },
} = configs

const register: SenHubRegister = {
  [appId]: {
    url: `${url}/index.js`,
    appId,
    name: 'Bulk Sender',
  },
}

export default register
