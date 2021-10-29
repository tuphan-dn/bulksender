/**
 * Credit https://github.com/hasanayan/craco-module-federation
 */

const {
  overrideWebpackConfig: originOverrideWebpackConfig,
  overrideDevServerConfig,
} = require('craco-module-federation')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  webpackConfig = originOverrideWebpackConfig({
    context,
    webpackConfig,
    pluginOptions,
  })
  // Avoid remote collision
  // https://webpack.js.org/concepts/module-federation/#collision-between-modules-from-different-remotes
  webpackConfig.output.uniqueName = process.env.REACT_APP_ID
  return webpackConfig
}

module.exports = { overrideWebpackConfig, overrideDevServerConfig }
