const webpack = require('webpack')

const WebpackBuffer = new webpack.ProvidePlugin({
  Buffer: ['buffer', 'Buffer'],
})

module.exports = WebpackBuffer
