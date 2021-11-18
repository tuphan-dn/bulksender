/**
 * Postcss Prefixwrap
 * https://www.npmjs.com/package/postcss-prefixwrap
 * Theme changing by CSS selector
 * https://gist.github.com/sbusch/a90eafaf5a5b61c6d6172da6ff76ddaa
 */
const path = require('path')
const { getLoaders, loaderByName } = require('@craco/craco')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  // Cannot use prebuilt options in craco, so we have to add it manually
  // https://stackoverflow.com/questions/68738215/craco-plugin-not-loading
  // PostcssFilterRules({
  //   filter: (selector) => {
  //     const matches =
  //       selector.match(antDVars["ant-prefix"]) || selector.match(/\.anticon|data-|\.ant-motion|^(\d)*%$/);
  //     return !!matches;
  //   },
  // })
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
