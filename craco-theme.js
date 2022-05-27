/**
 * Postcss Prefixwrap
 * https://www.npmjs.com/package/postcss-prefixwrap
 * Theme changing by CSS selector
 * https://gist.github.com/sbusch/a90eafaf5a5b61c6d6172da6ff76ddaa
 */
const path = require('path')
const { getLoaders, loaderByName } = require('@craco/craco')
const PrefixWrap = require('postcss-prefixwrap')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  // Cannot use prebuilt options in craco, so we have to add it manually
  // https://stackoverflow.com/questions/68738215/craco-plugin-not-loading
  const { theme, uniqueName } = pluginOptions
  const pathSep = path.sep
  const styleExt = '.(c|(le)|(sa)|(sc))ss'
  const any = '.*'
  const osExt = '.os'
  const osPath = `${pathSep}src${pathSep}os${pathSep}`
  const appPath = `${pathSep}src${pathSep}app${pathSep}`
  const end = '$'

  const { hasFoundAny, matches } = getLoaders(
    webpackConfig,
    loaderByName('postcss-loader'),
  )
  if (!hasFoundAny) return webpackConfig
  const osPrefixWrap = theme.map((selector) =>
    PrefixWrap(`#${selector}`, {
      ignoredSelectors: ['html'],
      whitelist: [
        new RegExp(osPath + any + selector + osExt + styleExt + end, 'i'),
      ],
    }),
  )
  const appPrefixWrap = theme.map((selector) =>
    PrefixWrap(`#${selector} #${uniqueName}`, {
      ignoredSelectors: ['html'],
      whitelist: [new RegExp(appPath + any + selector + styleExt + end, 'i')],
    }),
  )
  matches.forEach((match) => {
    match.loader.options.postcssOptions.plugins.push(
      ...osPrefixWrap,
      ...appPrefixWrap,
    )
  })
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
