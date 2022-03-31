import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Col, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import CustomAppIcon from './customAppIcon'

import { RootState, useRootDispatch, useRootSelector } from 'os/store'
import { setVisibleInstaller } from 'os/store/ui.reducer'
import SearchEngine from 'os/view/header/search/searchEngine'
import { randChoose } from 'os/helpers/utils'

const SUGGESTION_LIMIT = 6

const Installer = () => {
  const [recommendedApps, setRecommendeddApps] = useState<string[]>([])
  const {
    page: { register },
    search: { value },
    ui: { visibleInstaller },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch()
  const history = useHistory()

  const allAppIds = useMemo(() => Object.keys(register), [register])
  const exactAppId = useMemo(() => {
    return allAppIds.find((id) => id === value)
  }, [allAppIds, value])

  const closeInstaller = useCallback(async () => {
    await dispatch(setVisibleInstaller(false))
    return history.push('/welcome')
  }, [dispatch, history])

  const onSearch = useCallback(async () => {
    if (!visibleInstaller) return setRecommendeddApps([]) // For performance
    const engine = new SearchEngine(register)
    const appIds = engine.search(value)
    // Suggest additional apps
    while (appIds.length < Math.min(allAppIds.length, SUGGESTION_LIMIT)) {
      const randAppId = randChoose(allAppIds)
      if (!appIds.includes(randAppId)) appIds.push(randAppId)
    }
    return setRecommendeddApps(appIds)
  }, [allAppIds, register, value, visibleInstaller])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  return (
    <Modal
      title={null}
      closeIcon={<IonIcon name="close-outline" />}
      footer={null}
      onCancel={closeInstaller}
      visible={visibleInstaller}
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
