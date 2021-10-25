import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import AppLoader from 'os/components/appLoader'
import manifest from 'senhub.manifest'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppLoader type="Page" {...manifest[appId]} />
      </Col>
    </Row>
  )
}

export default Dashboard
