require('dotenv-cra').config() // https://github.com/gsoft-inc/craco/issues/180

const {
  CracoAppLessPlugin,
  CracoOsLessPlugin,
} = require('./plugins/craco-less')
const CracoModuleFederation = require('./plugins/craco-module-federation')
const CracoCompatibility = require('./plugins/craco-compatibility')
const CracoSilence = require('./plugins/craco-silence')

module.exports = {
  plugins: [
    {
      plugin: CracoModuleFederation,
    },
    {
      plugin: CracoAppLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            // modifyVars: require('./src/app/static/styles/theme'),
          },
        },
      },
    },
    {
      plugin: CracoOsLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: require('./src/os/static/styles/theme'),
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
