import configs from 'app/configs'

const {
  manifest: { url, appId },
} = configs

export type ComponentManifest = {
  url: string
  appId: string
  name: string
}

export type SenHubRegister = Record<string, ComponentManifest>

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
