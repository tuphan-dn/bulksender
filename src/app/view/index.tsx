import { Row, Col, Typography } from 'antd'
import Actions from './actions'
import Collector from './collector'
import MintSelection from './mintSelection'
import Representor from './representor'

const View = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} style={{ maxWidth: 1200 }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={3}>Solana Bulk Sender</Typography.Title>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <MintSelection />
              </Col>
              <Col span={24}>
                <Collector />
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Representor />
              </Col>
              <Col span={24}>
                <Actions />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
