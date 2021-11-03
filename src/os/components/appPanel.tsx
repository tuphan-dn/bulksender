import { Row, Col, Image, Spin, Space } from 'antd'
import { Component, Suspense } from 'react'
import IonIcon from 'shared/ionicon'

import register from 'senhub.register'
import { RemoteStatic } from 'os/components/appLoader'

type Props = {
  appId: string
  onClick?: () => void
}
class ErrorBoundary extends Component<Props, { failed: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = {
      failed: false,
    }
  }

  componentDidCatch(error: Error) {
    return this.setState({ failed: Boolean(error) })
  }

  render() {
    const { failed } = this.state
    const { children } = this.props

    if (failed || !children)
      return (
        <Space
          direction="vertical"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <div
            style={{
              transition: 'all 0.25s ease-in-out',
              background: '#00000010',
              padding: 16,
              borderRadius: 16,
              minHeight: 300,
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <IonIcon
              name="image-outline"
              style={{ fontSize: 100, '--ionicon-stroke-width': 14 }}
            />
          </div>
        </Space>
      )

    return children
  }
}

const AppPanel = (props: Props) => {
  const { appId, onClick } = props
  const { url } = register[appId]
  const manifest = { url, scope: appId, module: './static' }

  return (
    <ErrorBoundary {...props}>
      <Suspense fallback={<Spin />}>
        <RemoteStatic
          type={'logo'}
          manifest={manifest}
          render={(src) => (
            <Row>
              <Col span={24} style={{ lineHeight: 0 }}>
                <Image
                  src={src}
                  width="100%"
                  onClick={onClick}
                  preview={false}
                />
              </Col>
            </Row>
          )}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppPanel
