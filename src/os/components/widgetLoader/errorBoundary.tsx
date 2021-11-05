import { Component } from 'react'

import { Typography, Row, Col, Button } from 'antd'
import WidgetContainer from './widgetContainer'

class ErrorBoundary extends Component<ComponentManifest, { failed: boolean }> {
  constructor(props: ComponentManifest) {
    super(props)
    this.state = {
      failed: false,
    }
  }

  componentDidCatch(error: any) {
    return this.setState({ failed: Boolean(error) })
  }

  support = () => {
    const { url } = this.props
    return window.open(
      `mailto:hi@sentre.io?subject=${url} has failed`,
      '_blank',
    )
  }

  render() {
    const { failed } = this.state
    const { children, url } = this.props

    if (failed || !children)
      return (
        <WidgetContainer>
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
              <Button type="primary" onClick={this.support} block>
                Support
              </Button>
            </Col>
          </Row>
        </WidgetContainer>
      )
    return children
  }
}

export default ErrorBoundary
