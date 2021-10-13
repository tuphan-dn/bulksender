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
  'senos-app': {
    manifest: {
      url: 'http://localhost:5000/index.js',
      scope: 'senos',
      module: './app',
    },
  },
  'senos-widget': {
    manifest: {
      url: 'http://localhost:5000/index.js',
      scope: 'senos',
      module: './widget',
    },
    backgroundColor: 'cyan',
  },
}

export default manifest
