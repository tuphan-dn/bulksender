import { Row, Col, Image, Spin } from 'antd'
import { Component, Suspense } from 'react'

import register from 'senhub.register'
import { RemoteStatic } from 'os/components/appLoader'
import ERROR_IMG from 'os/static/images/error-image.svg'

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
      return <RawAppPanel {...this.props} src={ERROR_IMG} />

    return children
  }
}

const RawAppPanel = ({ src, onClick }: Props & { src: string }) => {
  return (
    <Row>
      <Col span={24} style={{ lineHeight: 0 }}>
        <Image src={src} width="100%" onClick={onClick} preview={false} />
      </Col>
    </Row>
  )
}

const AppPanel = (props: Props) => {
  const { appId } = props
  const { url } = register[appId]
  const manifest = { url, scope: appId, module: './static' }

  return (
    <ErrorBoundary {...props}>
      <Suspense fallback={<Spin />}>
        <RemoteStatic
          type="panel"
          manifest={manifest}
          render={(src) => <RawAppPanel {...props} src={src} />}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppPanel
