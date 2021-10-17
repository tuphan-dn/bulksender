/**
 * Credit https://github.com/diegomura/react-pdf/issues/1029
 * Add buffer to webpack 5 polyfill
 */

const webpack = require('webpack')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  )
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
