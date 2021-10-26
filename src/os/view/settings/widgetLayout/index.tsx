import { Row, Col, Avatar } from 'antd'
import { StaticLoader } from 'os/components/appLoader'
import IonIcon from 'shared/ionicon'

import manifest from 'senhub.manifest'

const WidgetLayout = () => {
  return (
    <Row gutter={[16, 16]}>
      {Object.keys(manifest).map((appId, i) => (
        <Col key={appId + i}>
          <StaticLoader
            type="logo"
            {...manifest[appId]}
            render={(src) => (
              <Avatar
                src={src}
                shape="square"
                size={64}
                style={{ cursor: 'pointer' }}
              >
                <IonIcon name="image-outline" />
              </Avatar>
            )}
          />
        </Col>
      ))}
    </Row>
  )
}

export default WidgetLayout
