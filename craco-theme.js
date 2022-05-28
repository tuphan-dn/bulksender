/**
 * Postcss Prefix Selector
 * https://www.npmjs.com/package/postcss-prefix-selector
 * Theme changing by CSS selector
 * https://gist.github.com/sbusch/a90eafaf5a5b61c6d6172da6ff76ddaa
 */
const path = require('path')
const { getLoaders, loaderByName } = require('@craco/craco')
const prefixer = require('postcss-prefix-selector')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  // Cannot use prebuilt options in craco, so we have to add it manually
  // https://stackoverflow.com/questions/68738215/craco-plugin-not-loading
  const { theme, uniqueName } = pluginOptions
  const pathSep = path.sep
  const uniqueSelector = '#' + uniqueName
  const themeSelectors = theme.map((e) => '#' + e.trim())
  const prefixed = themeSelectors.map((e) => new RegExp(`^${e} `, 'i'))
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
  const osThemePrefixer = theme.map((selector) =>
    prefixer({
      prefix: `#${selector}`,
      exclude: ['html', 'body', ...prefixed],
      includeFiles: [
        new RegExp(osPath + any + selector + osExt + styleExt + end, 'i'),
      ],
    }),
  )
  const appThemePrefixer = theme.map((selector) =>
    prefixer({
      prefix: `#${selector}`,
      exclude: ['html', 'body', ...prefixed],
      includeFiles: [
        new RegExp(appPath + any + selector + styleExt + end, 'i'),
      ],
    }),
  )
  const appIdPrefixer = prefixer({
    prefix: uniqueSelector,
    exclude: ['html', 'body'],
    includeFiles: [new RegExp(appPath + any + styleExt + end, 'i')],
    transform: (prefix, selector, prefixedSelector) => {
      prefixedSelector = selector
      themeSelectors.forEach((e) => {
        prefixedSelector = prefixedSelector.replace(e, `${e} ${uniqueSelector}`)
      })
      return prefixedSelector
    },
  })
  matches.forEach((match) => {
    match.loader.options.postcssOptions.plugins.push(
      ...osThemePrefixer,
      ...appThemePrefixer,
      appIdPrefixer,
    )
  })
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
