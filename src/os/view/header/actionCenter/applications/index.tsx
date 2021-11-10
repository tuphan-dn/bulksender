import { useState } from 'react'

import { Row, Col, Switch, Typography, Divider } from 'antd'
import WalletIntro from './walletIntro'
import DashboardWidget from './dashboardWidget'
import HeaderWidget from './headerWidget'

const Applications = () => {
  const [editableDashboard, setEditableDashboard] = useState(false)
  const [editableHeader, setEditableHeader] = useState(false)

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <WalletIntro />
      </Col>
      {/* Dashboard */}
      <Col span={24}>
        <Row justify="space-between" gutter={[12, 24]}>
          <Col>
            <Typography.Title level={5}>Widgets in dashboard</Typography.Title>
          </Col>
          <Col>
            <Switch onChange={setEditableDashboard} size="small" />
          </Col>
          <Col span={24}>
            <DashboardWidget disabled={!editableDashboard} />
          </Col>
        </Row>
      </Col>
      {/* Divider */}
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      {/* Header */}
      <Col span={24}>
        <Row justify="space-between" gutter={[12, 24]}>
          <Col>
            <Typography.Title level={5}>All appplications</Typography.Title>
          </Col>
          <Col>
            <Switch onChange={setEditableHeader} size="small" />
          </Col>
          <Col span={24}>
            <HeaderWidget disabled={!editableHeader} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Applications
