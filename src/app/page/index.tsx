import { Row, Col, Typography } from 'antd'

const Page = () => {
  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <Typography.Title level={1}>Solana Bulk Sender</Typography.Title>
      </Col>
    </Row>
  )
}

export default Page
