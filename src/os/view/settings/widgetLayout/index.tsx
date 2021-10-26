
import { Row, Col, Avatar } from 'antd'
import { StaticLoader } from 'os/components/appLoader'

import manifest from 'senhub.manifest'

const WidgetLayout = () => {
  return (
    <Row gutter={[24, 24]}>
      {Object.keys(manifest).map((appId, i) => (
        <Col key={appId + i}>
          <StaticLoader
            type="logo"
            {...manifest[appId]}
            render={(url) => <Avatar src={url} shape="square" size="large" />}
          />
        </Col>
      ))}
    </Row>
  )
}

export default WidgetLayout
