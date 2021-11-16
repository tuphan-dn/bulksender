import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Drawer, Button, Tabs } from 'antd'
import IonIcon from 'shared/ionicon'
import Applications from './applications'
import Settings from './settings'

import { RootDispatch, RootState } from 'os/store'
import {
  setActionCenterVisible,
  setDefaultTabSettings,
} from 'os/store/ui.reducer'

const ActionCenter = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { actionCenterVisible, defaultTabSetting } = useSelector(
    (state: RootState) => state.ui,
  )

  return (
    <Fragment>
      <Button
        type="text"
        icon={<IonIcon name="menu" style={{ fontSize: 20 }} />}
        onClick={() => dispatch(setActionCenterVisible(!actionCenterVisible))}
      />
      <Drawer
        visible={actionCenterVisible}
        onClose={() => {
          dispatch(setActionCenterVisible(false))
          dispatch(setDefaultTabSettings('action-center'))
        }}
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
                  icon={<IonIcon name="close-outline" />}
                  onClick={() => dispatch(setActionCenterVisible(false))}
                />
              }
              defaultActiveKey={defaultTabSetting}
              destroyInactiveTabPane
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <IonIcon name="grid-outline" />
                    Applications
                  </span>
                }
                key="action-center"
              >
                <Applications />
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
