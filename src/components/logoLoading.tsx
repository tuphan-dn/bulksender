import { Row, Col, Spin } from 'antd'

/**
 * Logo Loading
 */
const LogoLoading = () => {
  return (
    <Row
      style={{
        width: 64,
        height: 64,
        backgroundColor: '#00000099',
        borderRadius: 16,
        cursor: 'progress',
      }}
      justify="center"
      align="middle"
    >
      <Col>
        <Spin size="small" />
      </Col>
    </Row>
  )
}

export default LogoLoading
