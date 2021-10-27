import { Fragment, useState } from 'react'

import { Row, Col, Drawer, Button } from 'antd'
import IonIcon from 'shared/ionicon'
import WalletIntro from './walletIntro'
import WidgetLayout from './widgetLayout'

import register from 'senhub.register'

const ControlCenter = () => {
  const [visible, setVisible] = useState(true)

  return (
    <Fragment>
      <Button
        type="text"
        icon={<IonIcon name="grid-outline" />}
        onClick={() => setVisible(!visible)}
      />
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <WalletIntro />
          </Col>
          <Col span={24}>
            <WidgetLayout pages={[Object.keys(register), []]} />
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default ControlCenter
