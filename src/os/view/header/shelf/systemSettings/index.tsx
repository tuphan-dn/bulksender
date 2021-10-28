import { Row, Col } from 'antd'
import Mode from './mode'
import Network from './network'
import Sync from './sync'

const SystemSettings = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Mode />
      </Col>
      <Col span={12}>
        <Sync />
      </Col>
      <Col span={24}>
        <Network />
      </Col>
    </Row>
  )
}

export default SystemSettings
