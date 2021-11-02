import { useSelector } from 'react-redux'

import { Row, Col } from 'antd'
import { WidgetLoader } from 'os/components/appLoader'

import register from 'senhub.register'
import { RootState } from 'os/store'

const Dashboard = () => {
  const { appIds } = useSelector((state: RootState) => state.page)

  return (
    <Row gutter={[24, 24]}>
      {appIds.map((appId) => (
        <Col key={appId}>
          <WidgetLoader {...register[appId]} />
        </Col>
      ))}
    </Row>
  )
}

export default Dashboard
