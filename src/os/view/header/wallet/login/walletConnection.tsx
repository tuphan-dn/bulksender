import { useState } from 'react'

import { Row, Col, Tooltip, Switch, Typography, Space, Divider } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Coin98 from './coin98'
import Phantom from './phantom'
import Slope from './slope'
import SolflareExtension from './solflareExt'
import SolflareWeb from './solflareWeb'
import SolletWeb from './solletWeb'
import KeyStore from './keystore'
import SecretKey from './secretKey'
import CloverWallet from './clover'

const SecureMethods = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Coin98 />
      </Col>
      <Col span={24}>
        <Phantom />
      </Col>
      <Col span={24}>
        <SolletWeb />
      </Col>
      <Col span={24}>
        <Slope />
      </Col>
      <Col span={24}>
        <SolflareWeb />
      </Col>
      <Col span={24}>
        <SolflareExtension />
      </Col>
      <Col span={24}>
        <CloverWallet />
      </Col>
    </Row>
  )
}

const UnsecureMethods = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Text>
          These options will be no longer supported as from April 1st, 2022.
          Please choose secure methods to protect your wallet.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: '0px 0px 8px 0px' }} />
      </Col>
      <Col span={24}>
        <KeyStore />
      </Col>
      <Col span={24}>
        <SecretKey />
      </Col>
    </Row>
  )
}

const WalletConnection = () => {
  const [advance, setAdvance] = useState(false)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space>
          <Typography.Title level={5}>Wallet Connection</Typography.Title>
          <Space>
            <Divider type="vertical" style={{ margin: 0 }} />
            <Typography.Text>Other methods</Typography.Text>
            <Tooltip title="Caution! These methods is not recommended due to lack of cryptographical protection. By switching the button, you agree that you will use this function at your own risk.">
              <Switch
                size="small"
                checked={advance}
                onChange={setAdvance}
                checkedChildren={<IonIcon name="warning" />}
                unCheckedChildren={<IonIcon name="help-circle" />}
              />
            </Tooltip>
          </Space>
        </Space>
      </Col>
      <Col span={24}>{advance ? <UnsecureMethods /> : <SecureMethods />}</Col>
    </Row>
  )
}

export default WalletConnection
