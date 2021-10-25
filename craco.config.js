require('dotenv-cra').config() // https://github.com/gsoft-inc/craco/issues/180

const CracoLessPlugin = require('./plugins/craco-less')
const CracoModuleFederation = require('./plugins/craco-module-federation')
const CracoCompatibility = require('./plugins/craco-compatibility')
const CracoSilence = require('./plugins/craco-silence')
const theme = require('./src/theme')

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
            modifyVars: theme(process.env.REACT_APP_ID),
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
