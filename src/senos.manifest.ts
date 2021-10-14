export type ComponentManifest = {
  url: string
  scope: string
  module: string
}

export type SenOSManifest = Record<
  string,
  Record<'manifest', ComponentManifest> & any
>

const manifest: SenOSManifest = {
  senos: {
    manifest: {
      url: 'https://tuphan-dn.github.io/2mf/index.js',
      scope: 'senos',
      module: './',
    },
  },
}

export default manifest
