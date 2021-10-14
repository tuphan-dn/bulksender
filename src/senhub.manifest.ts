import configs from 'configs'

const {
  basics: { url, appId },
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
  senhub: {
    manifest: {
      url: `${url}/index.js`,
      scope: appId,
      module: './',
    },
  },
}

export default manifest
