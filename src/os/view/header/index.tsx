import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Space, Affix, Card, Button } from 'antd'
import IonIcon from 'shared/ionicon'
import Wallet from 'os/view/header/wallet'
import Brand from 'os/components/brand'
import ActionCenter from './actionCenter'

import { RootState } from 'os/store'

const NavButton = ({
  iconName,
  title,
  route,
}: {
  iconName: string
  title: string
  route: string
}) => {
  const history = useHistory()

  return (
    <Button
      type="text"
      size="small"
      icon={<IonIcon name={iconName} />}
      onClick={() => history.push(route)}
    >
      {title}
    </Button>
  )
}

const Header = () => {
  const { address } = useSelector((state: RootState) => state.wallet)

  return (
    <Affix offsetTop={12}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 16 }} hoverable>
            <Row gutter={[16, 16]} align="middle" wrap={false}>
              <Col flex="auto">
                <Space align="center">
                  <Brand style={{ margin: '0px 8px 3px 4px', height: 25 }} />
                  <NavButton
                    iconName="home-outline"
                    route="/home"
                    title="Home"
                  />
                  <NavButton
                    iconName="bag-handle-outline"
                    route="/store"
                    title="Store"
                  />
                </Space>
              </Col>
              <Col>
                {!account.isAddress(address) ? <Wallet /> : <ActionCenter />}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Affix>
  )
}

export default Header
