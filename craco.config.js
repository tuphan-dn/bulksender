const CracoAlias = require('craco-alias')
const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const {
  compilerOptions: { baseUrl },
} = require('./tsconfig.json')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl,
        tsConfigPath: './tsconfig.ext.json',
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: 'master',
          remotes: {
            app2: 'app2@http://localhost:3002/remoteEntry.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
        new ExternalTemplateRemotesPlugin(),
      ],
    },
  },
}
