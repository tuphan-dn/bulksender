import { Row, Col } from 'antd'
import WidgetLayout from './widgetLayout'

const Settings = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <WidgetLayout />
      </Col>
    </Row>
  )
}

export default Settings
