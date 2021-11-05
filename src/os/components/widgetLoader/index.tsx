import { forwardRef, Suspense } from 'react'
import { RemoteModule } from 'react-dynamic-remote-component/dist/types/types'
import { useRemoteModule } from 'react-dynamic-remote-component'

import { Row, Spin } from 'antd'
import WidgetContainer from './widgetContainer'
import ErrorBoundary from './errorBoundary'

const WidgetLoading = () => (
  <WidgetContainer>
    <Row style={{ height: '100%' }} align="middle" justify="center">
      <Spin />
    </Row>
  </WidgetContainer>
)

/**
 * Remote component
 */
const RemoteComponent = forwardRef<HTMLElement, { manifest: RemoteModule }>(
  ({ manifest, ...props }, ref) => {
    const { default: Component, widgetConfig } = useRemoteModule(manifest)
    return (
      <WidgetContainer {...widgetConfig}>
        <Component {...props} ref={ref} />
      </WidgetContainer>
    )
  },
)

export const WidgetLoader = forwardRef<HTMLElement, ComponentManifest>(
  (props, ref) => {
    const { url, appId } = props
    const manifest = { url, scope: appId, module: './widget' }
    return (
      <ErrorBoundary {...props}>
        <Suspense fallback={<WidgetLoading />}>
          <RemoteComponent manifest={manifest} {...props} ref={ref} />
        </Suspense>
      </ErrorBoundary>
    )
  },
)
