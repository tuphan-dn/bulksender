import { useState } from 'react'

import { Row, Col, Switch, Typography, Divider } from 'antd'
import WalletIntro from './walletIntro'
import DashboardWidget from './dashboardWidget'
import HeaderWidget from './headerWidget'

const Applications = () => {
  const [editable, setEditable] = useState(false)

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <WalletIntro />
      </Col>
      <Col flex="auto">
        <Typography.Text>To customize your workspace</Typography.Text>
      </Col>
      <Col>
        <Switch onChange={setEditable} size="small" />
      </Col>

      <Col span={24}>
        <DashboardWidget disabled={!editable} />
      </Col>
      <Divider />
      <Col span={24}>
        <HeaderWidget disabled={!editable} />
      </Col>
    </Row>
  )
}

export default Applications
