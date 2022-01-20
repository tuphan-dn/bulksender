import { Suspense, forwardRef, cloneElement } from 'react'
import { useRemoteModule } from 'react-dynamic-remote-component'
import { RemoteModule } from 'react-dynamic-remote-component/dist/types/types'

import { Spin } from 'antd'
import ErrorBoundary from 'os/components/errorBoundary'

import { useRootSelector, RootState } from 'os/store'

/**
 * Remote Static
 */
type StaticType = 'logo' | 'readme'
type MultiStaticType = 'panels'

const RemoteStatic = forwardRef<
  HTMLElement,
  {
    type?: StaticType
    manifest: RemoteModule
    render: (src: string) => JSX.Element
  }
>(({ type = 'default', manifest, render }, ref) => {
  const { [type]: src } = useRemoteModule(manifest)
  return cloneElement(render(src), ref ? { ref } : {})
})

/**
 * Static Loader
 */
export const StaticLoader = forwardRef<
  HTMLElement,
  {
    appId: string
    type: StaticType
    defaultData?: string
    render: (url: string) => JSX.Element
  }
>(({ type, appId, defaultData = '', render }, ref) => {
  const { register } = useRootSelector((state: RootState) => state.page)
  const url = register[appId]?.url || ''
  const manifest: RemoteModule = { url, scope: appId, module: './static' }
  if (!url) return null
  return (
    <ErrorBoundary defaultChildren={render(defaultData)}>
      <Suspense fallback={<Spin size="small" />}>
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
 * Remote Multi Statics
 */
const RemoteMultiStatic = forwardRef<
  HTMLElement,
  {
    type?: MultiStaticType
    manifest: RemoteModule
    render: (src: string[]) => JSX.Element
  }
>(({ type = 'default', manifest, render }, ref) => {
  const { [type]: arrSrc } = useRemoteModule(manifest)
  return cloneElement(render(arrSrc), ref ? { ref } : {})
})

/**
 * Remote Multi Loader
 */
export const MultiStaticLoader = forwardRef<
  HTMLElement,
  {
    appId: string
    type: MultiStaticType
    defaultData?: string[]
    render: (url: string[]) => JSX.Element
  }
>(({ type, appId, defaultData = [''], render }, ref) => {
  const { register } = useRootSelector((state: RootState) => state.page)
  const url = register[appId]?.url || ''
  const manifest: RemoteModule = { url, scope: appId, module: './static' }
  if (!url) return null
  return (
    <ErrorBoundary defaultChildren={render(defaultData)}>
      <Suspense fallback={<Spin size="small" />}>
        <RemoteMultiStatic
          type={type}
          manifest={manifest}
          render={render}
          ref={ref}
        />
      </Suspense>
    </ErrorBoundary>
  )
})
