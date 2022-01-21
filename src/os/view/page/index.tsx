import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import NotFound from 'os/view/page/notFound'
import PageLoader from 'os/components/pageLoader'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import { useCallback, useEffect } from 'react'
import { setVisibleInstaller } from 'os/store/ui.reducer'
import { setValue } from 'os/store/search.reducer'

let delaying: NodeJS.Timeout

const Dashboard = () => {
  const { appId } = useParams<{ appId: string }>()
  const {
    page: { appIds, register },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch<RootDispatch>()

  const existing = appIds.includes(appId) && register[appId]

  const openInstaller = useCallback(async () => {
    await dispatch(setVisibleInstaller(!existing))
    await dispatch(setValue(!existing ? appId : ''))
  }, [dispatch, existing, appId])

  useEffect(() => {
    // Wait a while for system loading
    if (Object.keys(register).length) {
      if (delaying) clearTimeout(delaying)
      delaying = setTimeout(openInstaller, 500)
    }
  }, [openInstaller, register])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {existing ? (
          <PageLoader {...(register[appId] as ComponentManifest)} />
        ) : (
          <NotFound appId={appId} />
        )}
      </Col>
    </Row>
  )
}

export default Dashboard
