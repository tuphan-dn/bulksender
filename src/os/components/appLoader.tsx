import { Suspense, forwardRef, cloneElement } from 'react'

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
  { type?: string; manifest: ComponentManifest }
>(({ type = 'default', manifest, ...props }, ref) => {
  const { [type]: Component } = useRemoteModule(manifest)
  return <Component {...props} ref={ref} />
})

/**
 * Remote static
 */
const RemoteStatic = forwardRef<
  HTMLElement,
  {
    type?: string
    manifest: ComponentManifest
    render: (url: string) => JSX.Element
  }
>(({ type = 'default', manifest, render }, ref) => {
  const { [type]: url } = useRemoteModule(manifest)
  return cloneElement(render(url), { ref })
})

/**
 * Static Loader
 */
export const StaticLoader = forwardRef<
  HTMLElement,
  {
    type: 'logo' | 'panel' | 'readme'
    manifest: ComponentManifest
    render: (url: string) => JSX.Element
  }
>(({ type, manifest, render }, ref) => {
  return (
    <ErrorBoundary remoteUrl={manifest?.url || 'Unknown'}>
      <Suspense fallback={<AppLoading />}>
        <RemoteStatic
          type={type}
          manifest={manifest}
          render={render}
          ref={ref}
        />
      </Suspense>
    </ErrorBoundary>
  )
})

/**
 * App Loader
 */
const AppLoader = forwardRef<
  HTMLElement,
  { type: 'Page' | 'Widget'; manifest: ComponentManifest }
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
