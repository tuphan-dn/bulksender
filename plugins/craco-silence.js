/**
 * Disable warnings & Minimal logs
 */

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  webpackConfig.stats = 'errors-only'
  return webpackConfig
}

const overrideDevServerConfig = ({
  devServerConfig,
  cracoConfig,
  pluginOptions,
  context,
}) => {
  devServerConfig.client.overlay = {
    warnings: false,
    errors: true,
  }
  return devServerConfig
}

module.exports = { overrideWebpackConfig, overrideDevServerConfig }
