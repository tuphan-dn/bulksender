import { Suspense, lazy, useMemo, forwardRef } from 'react'

import { Skeleton } from 'antd'
import ErrorBoundary from 'components/errorBoundary'

/**
 * App Loading
 */
const AppLoading = () => {
  return <Skeleton active />
}

/**
 * App Loader
 */
const AppLoader = forwardRef<HTMLElement, { remoteUrl: string } & any>(
  ({ remoteUrl, ...rest }, ref) => {
    const Application = useMemo(
      () => lazy(() => import(`applications/${remoteUrl}`)),
      [remoteUrl],
    )

    return (
      <ErrorBoundary remoteUrl={remoteUrl}>
        <Suspense fallback={<AppLoading />}>
          <Application {...rest} ref={ref} />
        </Suspense>
      </ErrorBoundary>
    )
  },
)

export default AppLoader
