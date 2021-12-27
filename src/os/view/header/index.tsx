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
import { setWalkthroughState } from 'os/store/walkthrough.reducer'
import { loadVisited } from 'os/store/flags.reducer'

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
  const { run, stepIndex } = useSelector(
    (state: RootState) => state.walkthrough,
  )
  const dispatch = useDispatch()

  const handleOnClick = () => {
    history.push(route)
    if (run === true && stepIndex === 0) {
      return dispatch(
        setWalkthroughState({
          stepIndex: 1,
        }),
      )
    }
    if (run === true && stepIndex === 3) {
      return dispatch(
        setWalkthroughState({
          stepIndex: stepIndex + 1,
        }),
      )
    }
  }

  return (
    <Button
      type="text"
      icon={<IonIcon name={iconName} />}
      onClick={handleOnClick}
      id={
        title === 'Store'
          ? 'store'
          : title === 'Dashboard'
          ? 'dashboard'
          : undefined
      }
    >
      {width >= 576 ? title : null}
    </Button>
  )
}

const Header = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { address } = useSelector((state: RootState) => state.wallet)
  const { width, theme } = useSelector((state: RootState) => state.ui)

  /**
   * Init the system
   * - Load DApp register
   * - Load page
   * - Set flags
   */
  useEffect(() => {
    ;(async () => {
      // Load DApp register
      await dispatch(loadRegister())
    })()
  }, [dispatch])
  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(address)) return
      // Load page
      await dispatch(loadPage())
      // Load flags
      await dispatch(loadVisited())
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
