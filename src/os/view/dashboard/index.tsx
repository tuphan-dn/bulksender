import { Row, Col } from 'antd'
import AppLoader from 'os/components/appLoader'

import register from 'senhub.register'

const Dashboard = () => {
  return (
    <Row gutter={[24, 24]}>
      {Object.keys(register).map((appId, i) => (
        <Col key={appId + i}>
          <AppLoader type="widget" {...register[appId]} />
        </Col>
      ))}
    </Row>
  )
}

export default Dashboard
