import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import PageLoader from 'os/components/pageLoader'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import { setVisibleInstaller } from 'os/store/ui.reducer'
import { setValue } from 'os/store/search.reducer'

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  const {
    page: { appIds, register },
    flags: { loading },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch<RootDispatch>()

  const existing = appIds.includes(appId) && register[appId]

  const openInstaller = useCallback(async () => {
    await dispatch(setVisibleInstaller(!existing))
    await dispatch(setValue(!existing ? appId : ''))
  }, [dispatch, existing, appId])

  useEffect(() => {
    if (!loading) openInstaller()
  }, [openInstaller, loading])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {existing ? (
          <PageLoader {...(register[appId] as ComponentManifest)} />
        ) : null}
      </Col>
    </Row>
  )
}

export default Dashboard
