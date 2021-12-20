import { Suspense, forwardRef, useCallback } from 'react'
import { useRemoteModule } from 'react-dynamic-remote-component'
import { RemoteModule } from 'react-dynamic-remote-component/dist/types/types'

import { Row, Col, Typography, Button, Skeleton } from 'antd'
import ErrorBoundary from 'os/components/errorBoundary'

/**
 * Remote component
 */
const RemoteComponent = forwardRef<HTMLElement, { manifest: RemoteModule }>(
  ({ manifest, ...props }, ref) => {
    const { Page: Component } = useRemoteModule(manifest)
    return <Component {...props} ref={ref} />
  },
)

/**
 * Error Component
 */
const PageError = ({ url = 'Unknown' }: { url?: string }) => {
  const support = useCallback(() => {
    return window.open(
      `mailto:hi@sentre.io?subject=${url} has failed`,
      '_blank',
    )
  }, [url])

  return (
    <Row
      gutter={[8, 8]}
      style={{ height: '100%' }}
      align="middle"
      justify="center"
    >
      <Col span={24}>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          {url}
        </Typography.Title>
      </Col>
      <Col span={24}>
        <p style={{ textAlign: 'center' }}>
          Oops! The application can't load properly
        </p>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={support} block>
          Support
        </Button>
      </Col>
    </Row>
  )
}

/**
 * Page Loader
 */
const PageLoader = forwardRef<HTMLElement, ComponentManifest>(
  ({ url, appId, ...props }, ref) => {
    const manifest = { url, scope: appId, module: './bootstrap' }
    return (
      <ErrorBoundary defaultChildren={<PageError url="url" />}>
        <Suspense fallback={<Skeleton active />}>
          <RemoteComponent manifest={manifest} {...props} ref={ref} />
        </Suspense>
      </ErrorBoundary>
    )
  },
)

export default PageLoader
