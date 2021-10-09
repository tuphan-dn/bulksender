import { Suspense, lazy, useMemo, forwardRef, useState } from 'react'

import util from 'helpers/util'
import AppLoading from 'components/appLoading'
import AppLogo from 'components/appLogo'
import AppPanel from 'components/appPanel'

/**
 * Metadata Loader
 */
export const metadata = (appName: string) => {
  const folderName = util.normalizeAppName(appName)
  try {
    return require(`applications/${folderName}/package.json`)
  } catch (er) {
    return {}
  }
}

/**
 * Logo Loader
 */
export const DynamicLogo = forwardRef<HTMLElement, any>(
  ({ name, ...rest }, ref) => {
    const folderName = util.normalizeAppName(name)
    let src = ''
    try {
      src = require(`applications/${folderName}/assets/icon.png`).default
    } catch (er) {
      /* Nothing */
    }
    return <AppLogo name={name} src={src} {...rest} ref={ref} />
  },
)

/**
 * Panel Loader
 */
export const DynamicPanel = forwardRef<HTMLElement, any>(
  ({ appName, ...rest }, ref) => {
    const folderName = util.normalizeAppName(appName)
    let src = ''
    try {
      src = require(`applications/${folderName}/assets/panel.png`).default
    } catch (er) {
      /* Nothing */
    }
    return <AppPanel appName={appName} src={src} {...rest} ref={ref} />
  },
)

/**
 * App Loader
 */
export const DynamicApp = forwardRef<
  HTMLElement,
  { appName: string; headed?: boolean }
>(({ appName, headed = true, ...rest }, ref) => {
  const [refresh, setRefresh] = useState(false)

  const folderName = util.normalizeAppName(appName)
  const Application = useMemo(
    () =>
      lazy(async () => {
        try {
          return await import(`applications/${folderName}/index`)
        } catch (er) {
          return await import('components/errorBoundary')
        }
      }),
    [folderName],
  )

  const onRefresh = async () => {
    await setRefresh(true)
    setTimeout(() => setRefresh(false), 1000)
  }

  if (refresh) return <AppLoading />
  return (
    <Suspense fallback={<AppLoading />}>
      <Application appName={appName} {...rest} ref={ref} />
    </Suspense>
  )
})
