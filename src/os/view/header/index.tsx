import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Typography, Avatar, Space, Affix, Card } from 'antd'
import Wallet from 'os/view/header/wallet'
import QuickSettings from 'os/view/header/quickSettings'

import logo from 'os/static/images/sen.svg'
import { RootState } from 'os/store'
import ControlCenter from './controlCenter'

const Header = () => {
  const history = useHistory()
  const { address } = useSelector((state: RootState) => state.wallet)

  const home = () => history.push('/')

  return (
    <Affix offsetTop={12}>
      <Row gutter={[16, 16]}>
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
                {!account.isAddress(address) ? (
                  <Wallet />
                ) : (
                  <Space>
                    <ControlCenter />
                    <QuickSettings />
                  </Space>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Affix>
  )
}

export default Header
