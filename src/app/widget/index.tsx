import { Row, Col, Typography, Space } from 'antd'
import IonIcon from 'shared/ionicon'

import { env } from 'shared/runtime'
import { useUI } from 'senhub/providers'

const Widget = () => {
  const {
    ui: { width, infix },
  } = useUI()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space align="center">
          <IonIcon name="apps-outline" />
          <Typography.Title level={4}>Widget</Typography.Title>
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Text>
          Env: {env} - {width}px - {infix}
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default Widget
