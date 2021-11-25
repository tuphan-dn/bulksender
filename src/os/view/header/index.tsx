import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Button, Space } from 'antd'
import IonIcon from 'shared/ionicon'
import Wallet from 'os/view/header/wallet'
import Brand from 'os/components/brand'
import ActionCenter from '../actionCenter'
import ContextMenu from './contextMenu'

import { RootDispatch, RootState } from 'os/store'
import { loadRegister, loadPage } from 'os/store/page.reducer'

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
    >
      {width >= 576 ? title : null}
    </Button>
  )
}

const Header = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { address } = useSelector((state: RootState) => state.wallet)
  const { width, theme } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    ;(async () => {
      await dispatch(loadRegister())
      if (account.isAddress(address)) await dispatch(loadPage())
    })()
  }, [dispatch, address])

  return (
    <Row gutter={[12, 12]} align="middle" wrap={false}>
      <Col>
        <Brand
          style={{ height: 24, cursor: 'pointer' }}
          lite={width < 768}
          darkTheme={theme === 'dark'}
        />
      </Col>
      <Col flex="auto">
        <ContextMenu />
      </Col>
      <Col>
        <Space align="center">
          {account.isAddress(address) && (
            <NavButton
              iconName="grid-outline"
              route="/dashboard"
              title="Dashboard"
            />
          )}
          <NavButton
            iconName="bag-handle-outline"
            route="/store"
            title="Store"
          />

          {!account.isAddress(address) ? <Wallet /> : <ActionCenter />}
        </Space>
      </Col>
    </Row>
  )
}

export default Header
