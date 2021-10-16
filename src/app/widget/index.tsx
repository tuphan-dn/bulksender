import { Row, Col, Typography } from 'antd'

import { useUI } from 'senhub/providers'

const Widget = () => {
  const {
    ui: { width, infix },
  } = useUI()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={5}>Sen Page</Typography.Title>
        <Typography.Text>
          Widget: {width}px - {infix}
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default Widget
