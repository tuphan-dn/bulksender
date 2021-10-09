const CracoAlias = require('craco-alias')
const { ModuleFederationPlugin } = require('webpack').container
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
            panel: 'panel@http://localhost:3002/index.js',
          },
          shared: {
            react: { singleton: true, requiredVersion: '^17.0.2' },
            'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
            'react-router-dom': { singleton: true, requiredVersion: '^5.3.0' },
          },
        }),
      ],
    },
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
}
