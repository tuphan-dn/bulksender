import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Typography, Avatar, Space, Affix, Card } from 'antd'
import Wallet from 'os/view/header/wallet'
import QuickSettings from 'os/view/header/quickSettings'
import WalletIntro from 'os/view/header/wallet/intro'

import logo from 'os/static/images/sen.svg'
import { RootState } from 'os/store'

const Header = () => {
  const history = useHistory()
  const { address } = useSelector((state: RootState) => state.wallet)

  const home = () => history.push('/')

  return (
    <Affix offsetTop={12}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 16 }} hoverable>
            <Row gutter={[16, 16]} align="middle">
              <Col flex="auto">
                <Space
                  align="center"
                  onClick={home}
                  style={{ cursor: 'pointer' }}
                >
                  <Avatar src={logo} alt="logo" />
                  <Typography.Title level={5} style={{ marginLeft: -4 }}>
                    Sentre
                  </Typography.Title>
                </Space>
              </Col>
              <Col>
                <WalletIntro />
              </Col>
              <Col>
                {!account.isAddress(address) ? <Wallet /> : <QuickSettings />}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Affix>
  )
}

export default Header
