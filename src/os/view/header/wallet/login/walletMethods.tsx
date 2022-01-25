import { Col, Row } from 'antd'
import Coin98 from './coin98'
import Phantom from './phantom'
import Slope from './slope'
import SolflareExtension from './solflareExt'
import SolflareWeb from './solflareWeb'
import SolletWeb from './solletWeb'

const WalletMethods = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Coin98 />
      </Col>
      <Col span={24}>
        <Phantom />
      </Col>
      <Col span={24}>
        <SolletWeb />
      </Col>
      <Col span={24}>
        <Slope />
      </Col>
      <Col span={24}>
        <SolflareWeb />
      </Col>
      <Col span={24}>
        <SolflareExtension />
      </Col>
    </Row>
  )
}

export default WalletMethods
