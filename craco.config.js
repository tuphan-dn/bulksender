require('dotenv-cra').config() // https://github.com/gsoft-inc/craco/issues/180

const {
  CracoAppLessPlugin,
  CracoDarkOsLessPlugin,
  CracoLightOsLessPlugin,
} = require('./plugins/craco-less')
const CracoModuleFederation = require('./plugins/craco-module-federation')
const CracoCompatibility = require('./plugins/craco-compatibility')
const CracoSilence = require('./plugins/craco-silence')

module.exports = {
  plugins: [
    {
      plugin: CracoModuleFederation,
    },
    // Os style loaders
    {
      plugin: CracoLightOsLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@ant-prefix': 'light-sentre',
            },
          },
        },
      },
    },
    {
      plugin: CracoDarkOsLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@ant-prefix': 'dark-sentre',
            },
          },
        },
      },
    },
    // App style loaders
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
      plugin: CracoCompatibility,
    },
    {
      plugin: CracoSilence,
    },
  ],
}
