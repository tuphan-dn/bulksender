import { Fragment, useCallback, useEffect, useState } from 'react'

import { Row, Col, Drawer, Button, Tabs } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Applications from './applications'
import Settings from './settings'

import {
  useRootDispatch,
  useRootSelector,
  RootDispatch,
  RootState,
} from 'os/store'
import { setVisibleActionCenter } from 'os/store/ui.reducer'
import Referral from './referral'
import { setWalkthrough, WalkThroughType } from 'os/store/walkthrough.reducer'

const ActionCenter = () => {
  const [activeTab, setActiveTab] = useState('applications')
  const dispatch = useRootDispatch<RootDispatch>()
  const {
    ui: { visibleActionCenter },
    walkthrough: { run, step },
  } = useRootSelector((state: RootState) => state)

  const onActionCenter = async () => {
    if (run && step === 0)
      await dispatch(
        setWalkthrough({ type: WalkThroughType.Referral, step: 1 }),
      )
  }
  const onUserTab = useCallback(async () => {
    if (activeTab !== 'referral') return
    if (run && step === 1)
      await dispatch(
        setWalkthrough({ type: WalkThroughType.Referral, step: 2 }),
      )
  }, [activeTab, dispatch, run, step])

  useEffect(() => {
    onUserTab()
  }, [onUserTab])

  const onHandleActionCenter = () => {
    onActionCenter()
    dispatch(setVisibleActionCenter(!visibleActionCenter))
  }

  return (
    <Fragment>
      <Button
        type="text"
        icon={<IonIcon name="menu" style={{ fontSize: 20 }} />}
        onClick={onHandleActionCenter}
        id="button-action-center"
      />
      <Drawer
        visible={visibleActionCenter}
        onClose={() => dispatch(setVisibleActionCenter(false))}
        closable={false}
        contentWrapperStyle={{ width: '95%', maxWidth: 400 }}
        destroyOnClose
      >
        <Row gutter={[16, 16]} style={{ marginTop: -16 }}>
          <Col span={24}>
            <Tabs
              style={{ overflow: 'visible' }}
              tabBarExtraContent={
                <Button
                  type="text"
                  icon={<IonIcon name="close" />}
                  onClick={() => dispatch(setVisibleActionCenter(false))}
                />
              }
              onChange={setActiveTab}
              destroyInactiveTabPane
              activeKey={activeTab}
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <IonIcon name="grid-outline" />
                    Apps
                  </span>
                }
                key="applications"
              >
                <Applications />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span id="action-center-tab-user">
                    <IonIcon name="person-outline" />
                    User
                  </span>
                }
                key="referral"
              >
                <Referral />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <IonIcon name="settings-outline" />
                    Settings
                  </span>
                }
                key="system-settings"
              >
                <Settings />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default ActionCenter
