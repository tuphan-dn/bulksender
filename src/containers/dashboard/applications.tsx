import { RemoteComponentManifest } from 'components/appLoader'

export type Applications = Record<
  string,
  Record<'manifest', RemoteComponentManifest> & any
>

const APPLICATIONS: Applications = {
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

export default APPLICATIONS
