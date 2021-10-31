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

  // React Refresh
  // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/394#issuecomment-877708732
  // The bug is examined by people, please follow the link for updates

  return webpackConfig
}

module.exports = { overrideWebpackConfig, overrideDevServerConfig }
