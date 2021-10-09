const CracoAlias = require('craco-alias')
const {
  compilerOptions: { baseUrl },
} = require('./tsconfig.json')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl,
        tsConfigPath: './tsconfig.ext.json',
      },
    },
  ],
}
