import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import AppLoader from 'components/appLoader'
import manifest from 'senos.manifest'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppLoader {...manifest[appId]} />
      </Col>
    </Row>
  )
}

export default Dashboard
