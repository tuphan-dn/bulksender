import { Row, Col, Spin } from 'antd'

/**
 * Lazy Loading
 */
const AppLoading = () => {
  return (
    <Row
      gutter={[8, 8]}
      style={{ height: '100%' }}
      align="middle"
      justify="center"
    >
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  )
}

export default AppLoading
