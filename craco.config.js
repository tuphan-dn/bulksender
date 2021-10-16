const CracoLessPlugin = require('./plugins/craco-less')
const CracoModuleFederation = require('./plugins/craco-module-federation')
const WebpackBuffer = require('./plugins/webpack-buffer')
const theme = require('./src/static/styles/theme.js')

module.exports = {
  plugins: [
    {
      plugin: CracoModuleFederation,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    plugins: [WebpackBuffer],
    configure: (webpackConfig, { env, paths }) => {
      // Minimal stats - less verbose
      // https://webpack.js.org/configuration/stats/
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
