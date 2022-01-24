import { useState } from 'react'

import { Row, Col, Tooltip, Switch, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import OtherMethods from './otherMethods'
import WalletMethods from './walletMethods'

import { RootState, useRootSelector } from 'os/store'

const WalletConnection = () => {
  const [advance, setAdvance] = useState(false)
  const { width } = useRootSelector((state: RootState) => state.ui)

  const spacing = width <= 992 ? 16 : 24
  return (
    <Row gutter={[spacing, spacing]} style={{ boxShadow: 'unset' }}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Typography.Title level={5}>Wallet Connection</Typography.Title>
          </Col>
          <Col>
            <Space>
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
          </Col>
        </Row>
      </Col>
      <Col span={24}>{advance ? <OtherMethods /> : <WalletMethods />} </Col>
    </Row>
  )
}

export default WalletConnection
