import { Suspense, forwardRef } from 'react'

import { Skeleton } from 'antd'
import ErrorBoundary from 'os/components/errorBoundary'
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
  { type?: string } & ComponentManifest & any
>(({ type = 'default', manifest, ...props }, ref) => {
  const { [type]: Component } = useRemoteModule(manifest)
  return <Component {...props} ref={ref} />
})

/**
 * Static Loader
 */
export const StaticLoader = forwardRef<
  HTMLElement,
  { type: 'logo' | 'panel' | 'readme'; manifest: ComponentManifest }
>(({ type, manifest }, ref) => {
  return (
    <ErrorBoundary remoteUrl={manifest?.url || 'Unknown'}>
      <Suspense fallback={<AppLoading />}>
        <RemoteComponent type={type} manifest={manifest} ref={ref} />
      </Suspense>
    </ErrorBoundary>
  )
})

/**
 * App Loader
 */
const AppLoader = forwardRef<
  HTMLElement,
  { type: 'Page' | 'Widget'; manifest: ComponentManifest } & any
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
