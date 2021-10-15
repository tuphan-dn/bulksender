const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
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
      new NodePolyfillPlugin({
        excludeAliases: ['console', 'process'],
      }),
    ],
    configure: (webpackConfig, { env, paths }) => {
      // Workaround: https://github.com/webpack/webpack/issues/11467#issuecomment-808618999/
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      })
      return webpackConfig
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
