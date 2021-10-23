import { Row, Col } from 'antd'
import AppLoader from 'components/appLoader'

import manifest from 'senhub.manifest'

const Dashboard = () => {
  return (
    <Row gutter={[24, 24]}>
      {Object.keys(manifest).map((appId, i) => (
        <Col key={`#${i}-${appId}`}>
          <AppLoader type="Widget" {...manifest[appId]} />
        </Col>
      ))}
    </Row>
  )
}

export default Dashboard
