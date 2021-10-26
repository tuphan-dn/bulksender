import { Row, Col } from 'antd'
import { StaticLoader } from 'os/components/appLoader'

import manifest from 'senhub.manifest'

const WidgetLayout = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {Object.keys(manifest).map((appId, i) => (
          <Col key={appId + i}>
            <StaticLoader type="logo" {...manifest[appId]} />
          </Col>
        ))}
      </Col>
    </Row>
  )
}

export default WidgetLayout
