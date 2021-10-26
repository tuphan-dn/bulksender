import configs from 'app/configs'

const {
  manifest: { url, appId },
} = configs

export type ComponentManifest = {
  url: string
  appId: string
}

export type SenHubManifest = Record<string, ComponentManifest>

const manifest: SenHubManifest = {
  [appId]: {
    url: `${url}/index.js`,
    appId,
  },
  bulksender: {
    url: 'https://descartesnetwork.github.io/bulksender/index.js',
    appId: 'bulksender',
  },
}

export default manifest
