import { Row, Col, Typography } from 'antd'

import configs from 'configs'
import { useUI } from 'senhub/providers'

const { env } = configs

const Widget = () => {
  const {
    ui: { width, infix },
  } = useUI()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={5}>Sen Page</Typography.Title>
        <Typography.Text>
          Env: {env} - {width}px - {infix}
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default Widget
