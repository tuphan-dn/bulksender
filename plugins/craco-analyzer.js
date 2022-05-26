/**
 * Bundle Analyzer
 * https://github.com/webpack-contrib/webpack-bundle-analyzer
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
  )
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
