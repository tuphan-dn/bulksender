import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import { PageLoader } from 'os/components/appLoader'
import NotFound from './notFound'

import register from 'senhub.register'
import { RootState } from 'os/store'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  const { appIds } = useSelector((state: RootState) => state.page)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {appIds.includes(appId) ? (
          <PageLoader {...register[appId]} />
        ) : (
          <NotFound appId={appId} />
        )}
      </Col>
    </Row>
  )
}

export default Dashboard
