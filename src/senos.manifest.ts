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
      url: 'http://localhost:5000/index.js',
      scope: 'senos',
      module: './',
    },
  },
}

export default manifest
