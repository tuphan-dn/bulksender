import { useState } from 'react'

import { Row, Col, Tooltip, Switch, Divider, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import Coin98 from './coin98'
import Phantom from './phantom'
import Sollet from './sollet'
import Keystore from './keystore'
import SecretKey from './secretKey'
import Slope from './slope'

const WalletConnection = () => {
  const [advance, setAdvance] = useState(false)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={5}>Wallet Connection</Typography.Title>
      </Col>
      <Col xs={{ span: 12 }} sm={{ span: 8 }}>
        <Coin98 />
      </Col>
      <Col xs={{ span: 12 }} sm={{ span: 8 }}>
        <Phantom />
      </Col>
      <Col xs={{ span: 12 }} sm={{ span: 8 }}>
        <Sollet />
      </Col>
      <Col xs={{ span: 12 }} sm={{ span: 8 }}>
        <Slope />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]} align="middle">
          <Col flex="auto">
            <Divider plain orientation="left">
              Other methods
            </Divider>
          </Col>
          <Col>
            <Tooltip title="Caution! These methods is not recommended due to lack of cryptographical protection. By switching the button, you agree that you will use this function at your own risk.">
              <Switch
                size="small"
                checked={advance}
                onChange={setAdvance}
                checkedChildren={<IonIcon name="warning" />}
                unCheckedChildren={<IonIcon name="help-circle" />}
              />
            </Tooltip>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {advance ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Keystore />
            </Col>
            <Col span={24} style={{ height: 16 }} /> {/* Safe space */}
            <Col span={24}>
              <SecretKey />
            </Col>
          </Row>
        ) : null}
      </Col>
    </Row>
  )
}

export default WalletConnection
