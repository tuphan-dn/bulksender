const name = process.env.REACT_APP_ID
const senhub = process.env.REACT_APP_SENHUB

module.exports = {
  name,
  filename: 'index.js',
  shared: {
    react: { singleton: true, requiredVersion: '^17.0.2' },
    'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
    'react-router-dom': { singleton: true, requiredVersion: '^5.3.0' },
    '@reduxjs/toolkit': { singleton: true, requiredVersion: '^1.6.2' },
    'react-redux': { singleton: true, requiredVersion: '^7.2.5' },
    antd: { singleton: true, requiredVersion: '^4.17.0-alpha.7' },
  },
  remotes: {
    senhub,
  },
  exposes: {
    // app
    './bootstrap': 'app/bootstrap.app',
    './static': 'app/static.app',
    // senhub
    './providers': 'os/providers',
  },
}
