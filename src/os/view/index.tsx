import { useCallback, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Layout, Row, Col, Card, Affix } from 'antd'
import PrivateRoute from 'os/components/privateRoute'
import Header from 'os/view/header'
import Welcome from 'os/view/welcome'
import Dashboard from 'os/view/dashboard'
import Page from 'os/view/page'
import Market from 'os/view/market'
import AppViewer from 'os/view/market/appViewer'
import Sync from 'os/view/sync'

import Watcher from 'os/view/watcher'
import Walkthrough from 'os/view/walkthrough'
import Installer from 'os/view/installer'
import ReferralLogger from './actionCenter/referral/logger'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import { loadPage, loadRegister } from 'os/store/page.reducer'
import { loadReferred, loadVisited } from 'os/store/flags.reducer'
import 'os/static/styles/dark.os.less'
import 'os/static/styles/light.os.less'

const View = () => {
  const {
    ui: { theme },
    wallet: { address: walletAddress },
    page: { register },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch<RootDispatch>()

  /**
   * Init the system
   */

  // Load DApp register
  const initRegister = useCallback(async () => {
    await dispatch(loadRegister())
  }, [dispatch])
  useEffect(() => {
    initRegister()
  }, [initRegister])
  // Load page
  const initPage = useCallback(async () => {
    if (!account.isAddress(walletAddress) || !Object.keys(register).length)
      return
    await dispatch(loadPage())
  }, [dispatch, walletAddress, register])
  useEffect(() => {
    initPage()
  }, [initPage])
  // Load flags
  const initFlags = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return
    await dispatch(loadVisited())
    await dispatch(loadReferred())
  }, [dispatch, walletAddress])
  useEffect(() => {
    initFlags()
  }, [initFlags])
  // Load theme
  useEffect(() => {
    document.body.setAttribute('id', theme)
  }, [theme])

  return (
    <Layout>
      {/* Header */}
      <Affix>
        <Card
          style={{ borderRadius: '0px 0px 16px 16px', zIndex: 999 }}
          bodyStyle={{ padding: 16 }}
          bordered={false}
        >
          <Header />
        </Card>
      </Affix>
      {/* Body */}
      <Layout style={{ padding: '24px 12px 0px 12px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Switch>
              <Route exact path="/welcome" component={Welcome} />
              <PrivateRoute
                exact
                path="/dashboard/:pageId?"
                component={Dashboard}
              />
              <PrivateRoute path="/app/:appId" component={Page} />
              <Route exact path="/store" component={Market} />
              <Route exact path="/store/:appId" component={AppViewer} />
              <PrivateRoute exact path="/sync" component={Sync} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          </Col>
        </Row>
      </Layout>
      {/* In-Background Run Jobs */}
      <Walkthrough />
      <Watcher />
      <Installer />
      <ReferralLogger />
    </Layout>
  )
}

export default View
