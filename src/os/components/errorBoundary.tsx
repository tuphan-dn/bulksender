import { Component } from 'react'

import { Row, Col, Typography, Button } from 'antd'

interface Props {
  remoteUrl: string
}

interface State {
  failed: boolean
}

/**
 * Error Boundary
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      failed: false,
    }
  }

  componentDidCatch(error: Error) {
    return this.setState({ failed: Boolean(error) })
  }

  support = () => {
    const { remoteUrl } = this.props
    return window.open(`mailto:hi@sentre.io?subject=${remoteUrl} has failed`, '_blank')
  }

  render() {
    const { failed } = this.state
    const { remoteUrl, children } = this.props

    if (failed || !children)
      return (
        <Row
          gutter={[8, 8]}
          style={{ height: '100%' }}
          align="middle"
          justify="center"
        >
          <Col span={24}>
            <Typography.Title level={4} style={{ textAlign: 'center' }}>
              {remoteUrl}
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
      )
    return children
  }
}

export default ErrorBoundary
