import { useSelector } from 'react-redux'

import { Row, Col } from 'antd'
import WidgetLoader from 'os/components/widgetLoader'

import { RootState } from 'os/store'

const Dashboard = () => {
  const { widgetIds, register } = useSelector((state: RootState) => state.page)

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} style={{ maxWidth: 1920, width: '100%' }}>
        <Row gutter={[24, 24]}>
          {widgetIds.map((appId) => {
            if (!register[appId]) return null
            return (
              <WidgetLoader
                key={appId}
                {...(register[appId] as ComponentManifest)}
              />
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
