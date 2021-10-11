import { useLocation } from 'react-router-dom'
import { Row, Col } from 'antd'
import AppLoader from 'components/appLoader'
import APPLICATIONS from './applications'

const useQuery = (key: string) => {
  const query = new URLSearchParams(useLocation().search)
  return query.get(key)
}

const Dashboard = () => {
  const appId = useQuery('appId') || ''
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppLoader {...APPLICATIONS[appId]} />
      </Col>
    </Row>
  )
}

export default Dashboard
