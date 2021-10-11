import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import AppLoader from 'components/appLoader'
import APPLICATIONS from './applications'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppLoader {...APPLICATIONS[appId]} />
      </Col>
    </Row>
  )
}

export default Dashboard
