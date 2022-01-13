import { Row, Col, Typography } from 'antd'
import { useUI } from '@senhub/providers'

import { env } from 'shared/runtime'

const Widget = () => {
  const {
    ui: { width, infix },
  } = useUI()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={5}>BulkSender Widget</Typography.Title>
        <Typography.Text>
          Env: {env} - {width}px - {infix}
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default Widget
