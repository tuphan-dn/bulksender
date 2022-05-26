import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Col, Modal, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CustomAppIcon from './customAppIcon'

import { RootState, useRootDispatch, useRootSelector } from 'os/store'
import { setVisibleInstaller } from 'os/store/ui.reducer'
import SearchEngine from 'os/view/header/search/searchEngine'
import { installApp } from 'os/store/page.reducer'
import { randChoose } from 'shared/util'

const SUGGESTION_LIMIT = 6

const Installer = () => {
  const [recommendedApps, setRecommendeddApps] = useState<string[]>([])
  const appIds = useRootSelector((state: RootState) => state.page.appIds)
  const register = useRootSelector((state: RootState) => state.page.register)
  const value = useRootSelector((state: RootState) => state.search.value)
  const visible = useRootSelector(
    (state: RootState) => state.ui.visibleInstaller,
  )
  const dispatch = useRootDispatch()
  const history = useHistory()
  const { pathname, search } = useLocation()
  const params = new URLSearchParams(search)
  const autoInstall = params.get('autoInstall') === 'true' ? true : false

  const allAppIds = useMemo(() => Object.keys(register), [register])
  const exactAppId = useMemo(() => {
    return allAppIds.find((id) => id === value)
  }, [allAppIds, value])

  const closeInstaller = useCallback(async () => {
    await dispatch(setVisibleInstaller(false))
    return history.push('/welcome')
  }, [dispatch, history])

  const onSearch = useCallback(async () => {
    if (!visible) return setRecommendeddApps([]) // For performance
    const engine = new SearchEngine(register)
    const appIds = engine.search(value)
    // Suggest additional apps
    while (appIds.length < Math.min(allAppIds.length, SUGGESTION_LIMIT)) {
      const randAppId = randChoose(allAppIds)
      if (!appIds.includes(randAppId)) appIds.push(randAppId)
    }
    return setRecommendeddApps(appIds)
  }, [allAppIds, register, value, visible])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  useEffect(() => {
    if (
      autoInstall &&
      exactAppId &&
      register[exactAppId] &&
      !appIds.includes(exactAppId)
    ) {
      dispatch(installApp(exactAppId))
    }
  }, [dispatch, autoInstall, exactAppId, appIds, register])

  if (autoInstall || !pathname.startsWith('/app')) return <Fragment />
  return (
    <Modal
      title={null}
      closeIcon={<IonIcon name="close-outline" />}
      footer={null}
      onCancel={closeInstaller}
      visible={visible}
      destroyOnClose
    >
      <Row gutter={[18, 18]}>
        {exactAppId && (
          <Fragment>
            <Col span={24}>
              <Typography.Title level={4}>
                You need to install this app
              </Typography.Title>
            </Col>
            <Col span={24}>
              <CustomAppIcon appId={exactAppId} />
            </Col>
            <Col span={24} />
          </Fragment>
        )}
        <Col span={24}>
          <Typography.Title level={4}>Recommended Apps</Typography.Title>
        </Col>
        {recommendedApps.map((appId, i) => (
          <Col span={12} key={i}>
            <CustomAppIcon appId={appId} />
          </Col>
        ))}
      </Row>
    </Modal>
  )
}

export default Installer
