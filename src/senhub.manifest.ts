import configs from 'configs'

const {
  manifest: { url, appId },
} = configs

export type ComponentManifest = {
  url: string
  scope: string
  module: string
}

export type SenHubManifest = Record<
  string,
  Record<'manifest', ComponentManifest> & any
>

const manifest: SenHubManifest = {
  [appId]: {
    manifest: {
      url: `${url}/index.js`,
      scope: appId,
      module: './',
    },
  },
  senpage: {
    manifest: {
      url: 'https://descartesnetwork.github.io/senpage/index.js',
      scope: 'senpage',
      module: './',
    },
  },
}

export default manifest
