import { Suspense, forwardRef } from 'react'

import { Skeleton } from 'antd'
import ErrorBoundary from 'components/errorBoundary'
import { useRemoteModule } from 'react-dynamic-remote-component'
import { ComponentManifest } from 'senhub.manifest'

/**
 * App Loading
 */
const AppLoading = () => {
  return <Skeleton active />
}

/**
 * Remote component
 */
const RemoteComponent = forwardRef<
  HTMLElement,
  { type: 'Page' | 'Widget' } & ComponentManifest & any
>(({ type, manifest, ...props }, ref) => {
  const { [type]: Component } = useRemoteModule(manifest)
  return <Component {...props} ref={ref} />
})

/**
 * App Loader
 */
const AppLoader = forwardRef<
  HTMLElement,
  { type: 'Page' | 'Widget' } & ComponentManifest & any
>(({ type, manifest, ...props }, ref) => {
  return (
    <ErrorBoundary remoteUrl={manifest?.url || 'Unknown'}>
      <Suspense fallback={<AppLoading />}>
        <RemoteComponent type={type} manifest={manifest} {...props} ref={ref} />
      </Suspense>
    </ErrorBoundary>
  )
})

export default AppLoader
