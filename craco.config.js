const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const cracoModuleFederation = require('craco-module-federation')

module.exports = {
  plugins: [{ plugin: cracoModuleFederation }],
  webpack: {
    plugins: [new NodePolyfillPlugin()], // Fix polyfill in webpack 5
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
