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
  hello: {
    manifest: {
      url: 'http://localhost:5001/index.js',
      scope: 'hello',
      module: './app',
    },
  },
  panel: {
    manifest: {
      url: 'http://localhost:3002/index.js',
      scope: 'panel',
      module: '.',
    },
    backgroundColor: 'cyan',
  },
}

export default manifest
