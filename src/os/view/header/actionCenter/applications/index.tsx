import { Row, Col, Divider } from 'antd'
import WalletIntro from './walletIntro'
import WidgetsInDashboard from './widgetsInDashboard'
import AllApplications from './allApplications'

const Applications = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <WalletIntro />
      </Col>
      <Col span={24}>
        <WidgetsInDashboard />
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      <Col span={24}>
        <AllApplications />
      </Col>
    </Row>
  )
}

export default Applications
