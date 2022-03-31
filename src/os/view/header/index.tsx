import { useHistory, useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Button, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Wallet from 'os/view/wallet'
import Brand from 'os/components/brand'
import ActionCenter from '../actionCenter'
import ContextMenu from './contextMenu'
import Search from './search'

import {
  useRootDispatch,
  useRootSelector,
  RootDispatch,
  RootState,
} from 'os/store'
import { setWalkthrough, WalkThroughType } from 'os/store/walkthrough.reducer'
import { net } from 'shared/runtime'
import { setVisible } from 'os/store/search.reducer'

export type NavButtonProps = {
  id: string
  iconName: string
  title: string
  onClick: () => void
}

export const NavButton = ({ id, iconName, title, onClick }: NavButtonProps) => {
  const { width } = useRootSelector((state: RootState) => state.ui)
  return (
    <Button
      type="text"
      icon={<IonIcon name={iconName} />}
      onClick={onClick}
      id={id}
    >
      {width >= 576 ? title : null}
    </Button>
  )
}

const Header = () => {
  const {
    wallet: { address: walletAddress },
    ui: { width, theme },
    walkthrough: { run, step },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch<RootDispatch>()
  const history = useHistory()
  const { pathname } = useLocation()

  const onSearch = () => dispatch(setVisible(true))
  const onStore = async () => {
    if (run && step === 0)
      await dispatch(
        setWalkthrough({ type: WalkThroughType.NewComer, step: 1 }),
      )
    return history.push('/store')
  }

  return (
    <Row gutter={[12, 12]} align="middle" wrap={false}>
      <Col>
        <Brand
          style={{ height: 24, cursor: 'pointer' }}
          lite={width < 768}
          darkTheme={theme === 'dark'}
          network={net}
        />
      </Col>
      <Col flex="auto">
        <ContextMenu />
      </Col>
      <Col>
        <Space align="center">
          {pathname.startsWith('/store') ? (
            <NavButton
              id="search-nav-button"
              iconName="search-outline"
              onClick={onSearch}
              title="Search"
            />
          ) : null}
          <NavButton
            id="store-nav-button"
            iconName="bag-handle-outline"
            onClick={onStore}
            title="Store"
          />
          {!account.isAddress(walletAddress) ? <Wallet /> : <ActionCenter />}
        </Space>
      </Col>
      <Search />
    </Row>
  )
}

export default Header
