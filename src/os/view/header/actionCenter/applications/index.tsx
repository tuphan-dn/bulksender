import { useState } from 'react'

import { Row, Col, Switch, Typography } from 'antd'
import WalletIntro from './walletIntro'
import WidgetLayout from './widgetLayout'

import register from 'senhub.register'

const Applications = () => {
  const [editable, setEditable] = useState(false)
  const [pages, setPages] = useState([Object.keys(register), []])

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
        <WidgetLayout pages={pages} onChange={setPages} disabled={!editable} />
      </Col>
    </Row>
  )
}

export default Applications
