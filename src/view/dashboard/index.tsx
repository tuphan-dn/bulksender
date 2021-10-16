import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import AppLoader from 'components/appLoader'
import manifest from 'senhub.manifest'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppLoader type="Page" {...manifest[appId]} />
      </Col>
      <Col span={24}>
        <AppLoader type="Widget" {...manifest[appId]} backgroundColor="cyan" />
      </Col>
    </Row>
  )
}

export default Dashboard
