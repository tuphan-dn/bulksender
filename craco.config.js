const CracoLessPlugin = require('./plugins/craco-less')
const CracoModuleFederation = require('./plugins/craco-module-federation')
const CracoCompatibility = require('./plugins/craco-compatibility')
const CracoSilence = require('./plugins/craco-silence')
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
            javascriptEnabled: true,
            modifyVars: theme,
          },
        },
      },
    },
    {
      plugin: CracoCompatibility,
    },
    {
      plugin: CracoSilence,
    },
  ],
}
