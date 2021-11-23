import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import PageLoader from 'os/components/pageLoader'
import NotFound from './notFound'

import { RootState } from 'os/store'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  const { appIds, register } = useSelector((state: RootState) => state.page)

  if (!register[appId]) return null
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {appIds.includes(appId) ? (
          <PageLoader {...(register[appId] as ComponentManifest)} />
        ) : (
          <NotFound appId={appId} />
        )}
      </Col>
    </Row>
  )
}

export default Dashboard
