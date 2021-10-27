import { Fragment, useState } from 'react'

import { Row, Col, Drawer, Button, Switch } from 'antd'
import IonIcon from 'shared/ionicon'
import WalletIntro from './walletIntro'
import WidgetLayout from './widgetLayout'

import register from 'senhub.register'

const ControlCenter = () => {
  const [editable, setEditable] = useState(false)
  const [pages, setPages] = useState([Object.keys(register), []])
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
            <Switch onChange={setEditable} size="small" />
          </Col>
          <Col span={24}>
            <WidgetLayout
              pages={pages}
              onChange={setPages}
              disabled={!editable}
            />
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default ControlCenter
