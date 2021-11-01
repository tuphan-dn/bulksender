import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import { PageLoader } from 'os/components/appLoader'

import register from 'senhub.register'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <PageLoader {...register[appId]} />
      </Col>
    </Row>
  )
}

export default Dashboard
