import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Button, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Wallet from 'os/view/header/wallet'
import Brand from 'os/components/brand'
import ActionCenter from '../actionCenter'
import ContextMenu from './contextMenu'

import { RootDispatch, RootState } from 'os/store'
import { loadRegister, loadPage } from 'os/store/page.reducer'
import { setWalkthrough } from 'os/store/walkthrough.reducer'
import { loadVisited } from 'os/store/flags.reducer'
import { net } from 'shared/runtime'

type NavButtonProps = {
  id: string
  iconName: string
  title: string
  onClick: () => void
}

const NavButton = ({ id, iconName, title, onClick }: NavButtonProps) => {
  const { width } = useSelector((state: RootState) => state.ui)
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
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  const {
    wallet: { address: walletAddress },
    ui: { width, theme },
    walkthrough: { run, step },
    page: { register },
  } = useSelector((state: RootState) => state)

  const onDashboard = async () => {
    if (run && step === 3) await dispatch(setWalkthrough({ step: 4 }))
    return history.push('/dashboard')
  }

  const onStore = async () => {
    if (run && step === 0) await dispatch(setWalkthrough({ step: 1 }))
    return history.push('/store')
  }

  /**
   * Init the system
   * - Load DApp register
   * - Load page
   * - Set flags
   */
  useEffect(() => {
    ;(async () => {
      await dispatch(loadRegister()) // Load DApp register
    })()
  }, [dispatch])
  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(walletAddress) || !Object.keys(register).length)
        return
      await dispatch(loadPage()) // Load page
      await dispatch(loadVisited()) // Load flags
    })()
  }, [dispatch, walletAddress, register])

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
          {account.isAddress(walletAddress) && (
            <NavButton
              id="dashboard-nav-button"
              iconName="grid-outline"
              onClick={onDashboard}
              title="Dashboard"
            />
          )}
          <NavButton
            id="store-nav-button"
            iconName="bag-handle-outline"
            onClick={onStore}
            title="Store"
          />
          {!account.isAddress(walletAddress) ? <Wallet /> : <ActionCenter />}
        </Space>
      </Col>
    </Row>
  )
}

export default Header
