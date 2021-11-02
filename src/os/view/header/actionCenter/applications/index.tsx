import { useState } from 'react'

import { Row, Col, Switch, Typography } from 'antd'
import WalletIntro from './walletIntro'
import WidgetLayout from './widgetLayout'

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
        <WidgetLayout disabled={!editable} />
      </Col>
    </Row>
  )
}

export default Applications
