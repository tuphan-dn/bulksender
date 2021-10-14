const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const cracoModuleFederation = require('craco-module-federation')

module.exports = {
  plugins: [{ plugin: cracoModuleFederation }],
  webpack: {
    plugins: [
      new NodePolyfillPlugin(), // Support polyfill in webpack 5
    ],
    configure: (webpackConfig, { env, paths }) => {
      // Bugfix: https://github.com/graphql/graphql-js/issues/2721#issuecomment-723008284
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
