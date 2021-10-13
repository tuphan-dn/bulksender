import { Suspense, forwardRef } from 'react'

import { Skeleton } from 'antd'
import ErrorBoundary from 'components/errorBoundary'
import { useRemoteModule } from 'react-dynamic-remote-component'
import { ComponentManifest } from 'senos.manifest'

/**
 * App Loading
 */
const AppLoading = () => {
  return <Skeleton active />
}

/**
 * Remote component
 */
const RemoteComponent = forwardRef<HTMLElement, ComponentManifest & any>(
  ({ manifest, ...props }, ref) => {
    const { default: Component } = useRemoteModule(manifest)
    return <Component {...props} ref={ref} />
  },
)

/**
 * App Loader
 */
const AppLoader = forwardRef<HTMLElement, ComponentManifest & any>(
  ({ manifest, ...props }, ref) => {
    return (
      <ErrorBoundary remoteUrl={manifest?.url || 'Unknown'}>
        <Suspense fallback={<AppLoading />}>
          <RemoteComponent manifest={manifest} {...props} ref={ref} />
        </Suspense>
      </ErrorBoundary>
    )
  },
)

export default AppLoader
