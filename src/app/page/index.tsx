import { Row, Col, Typography } from 'antd'
import Action from './action'
import Collector from './collector'
import MintSelection from './mintSelection'
import Representor from './representor'

const Page = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={1}>Solana Bulk Sender</Typography.Title>
      </Col>
      <Col span={24}>
        <MintSelection />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <Collector />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Representor />
          </Col>
          <Col span={24}>
            <Action />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Page
