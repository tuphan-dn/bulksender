const webpack = require('webpack')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const cracoModuleFederation = require('craco-module-federation')

module.exports = {
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
  webpack: {
    plugins: [
      // Support polyfill in webpack 5
      // new NodePolyfillPlugin({
      //   excludeAliases: ['console', 'process'],
      // }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    configure: (webpackConfig, { env, paths }) => {
      // Minimal stats - less verbose
      webpackConfig.stats = 'errors-only'
      // Fix fully specified
      // https://github.com/webpack/webpack/issues/11467#issuecomment-808618999/
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      })
      return webpackConfig
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    // Disable warning overlay
    devServerConfig.client.overlay = {
      warnings: false,
      errors: true,
    }
    return devServerConfig
  },
}
