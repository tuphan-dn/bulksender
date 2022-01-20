import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import PageLoader from 'os/components/pageLoader'
import NotFound from './notFound'

import { useRootSelector, RootState, useRootDispatch } from 'os/store'
import {
  openModalInstall,
  setCurrentAppId,
  setPrevAppId,
} from 'os/store/search.reducer'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  const dispatch = useRootDispatch()
  const {
    page: { appIds, register },
    search: { prevAppId },
  } = useRootSelector((state: RootState) => state)

  useEffect(() => {
    dispatch(setCurrentAppId(appId))
    if (!appIds.length) return
    if (appIds.includes(appId)) {
      dispatch(setPrevAppId(appId))
      return
    }
    dispatch(openModalInstall())
  }, [appId, appIds, dispatch])

  if (!register[appId]) return null
  if (!appIds.includes(appId) && !appIds.includes(prevAppId))
    return <NotFound appId={appId} />
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {appIds.includes(appId) ? (
          <PageLoader {...(register[appId] as ComponentManifest)} />
        ) : (
          <PageLoader {...(register[prevAppId] as ComponentManifest)} />
        )}
      </Col>
    </Row>
  )
}

export default Dashboard
