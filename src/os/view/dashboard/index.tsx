import { Row, Col } from 'antd'
import WidgetLoader from 'os/components/widgetLoader'

import { useRootSelector, RootState } from 'os/store'

const Dashboard = () => {
  const {
    page: { widgetIds, register },
  } = useRootSelector((state: RootState) => state)

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} className="sentre-col-container">
        <Row gutter={[24, 24]}>
          {widgetIds.map((appId) =>
            register[appId] ? (
              <WidgetLoader
                key={appId}
                {...(register[appId] as ComponentManifest)}
              />
            ) : null,
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
