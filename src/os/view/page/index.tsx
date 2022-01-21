import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import PageLoader from 'os/components/pageLoader'
import NotFound from './notFound'

import { useRootSelector, RootState, useRootDispatch } from 'os/store'
import { setCurrentAppId } from 'os/store/search.reducer'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  const dispatch = useRootDispatch()
  const {
    page: { appIds, register },
  } = useRootSelector((state: RootState) => state)

  useEffect(() => {
    dispatch(setCurrentAppId(appId))
  }, [appId, dispatch])

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
