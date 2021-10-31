/**
 * Maintain webpack 5 compatibility
 */
const path = require('path')
const webpack = require('webpack')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  // Add buffer to webpack 5 polyfill
  // https://github.com/diegomura/react-pdf/issues/1029
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  )
  // Add util polyfill
  // (For IPFS compatibility)
  webpackConfig.resolve.fallback = {
    util: require.resolve('util/'),
  }
  // Fix unrecognized change / caching problem
  webpackConfig.cache.buildDependencies.config.push(
    path.join(context.paths.appPath, './craco.config.js'),
  )
  // Fix fully specified
  // https://github.com/webpack/webpack/issues/11467#issuecomment-808618999/
  webpackConfig.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  })
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
