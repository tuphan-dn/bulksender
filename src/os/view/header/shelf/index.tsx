import { Fragment, useState } from 'react'

import { Row, Col, Drawer, Button, Tabs } from 'antd'
import IonIcon from 'shared/ionicon'
import ActionCenter from './actionCenter'
import SystemSettings from './systemSettings'

const Shelf = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <Button
        type="text"
        icon={<IonIcon name="options-outline" />}
        onClick={() => setVisible(!visible)}
      />
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        closable={false}
      >
        <Row gutter={[16, 16]} style={{ marginTop: -16 }}>
          <Col span={24}>
            <Tabs
              style={{ overflow: 'visible' }}
              tabBarExtraContent={
                <Button
                  type="text"
                  icon={<IonIcon name="close-outline" />}
                  onClick={() => setVisible(false)}
                />
              }
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <IonIcon name="grid-outline" />
                    Action Center
                  </span>
                }
                key="action-center"
              >
                <ActionCenter />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <IonIcon name="settings-outline" />
                    System Settings
                  </span>
                }
                key="system-settings"
              >
                <SystemSettings />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default Shelf
