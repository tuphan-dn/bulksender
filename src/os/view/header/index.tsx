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
  const { width } = useSelector((state: RootState) => state.ui)

  return (
    <Button
      type="text"
      icon={<IonIcon name={iconName} />}
      onClick={() => history.push(route)}
      size={width >= 768 ? 'middle' : 'small'}
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
            <Row gutter={[8, 8]} align="middle" wrap={false}>
              <Col flex="auto">
                <Brand style={{ margin: '-3px 8px 0px 0px', height: 22 }} />
              </Col>
              <Col>
                <Space align="center">
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
