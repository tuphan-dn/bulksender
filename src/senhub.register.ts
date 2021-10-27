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
}

export default register
