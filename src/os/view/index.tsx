import { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Layout, Row, Col, Card, Affix } from 'antd'
import PrivateRoute from 'os/components/privateRoute'
import Header from 'os/view/header'
import Welcome from 'os/view/welcome'
import Page from 'os/view/page'
import Market from 'os/view/market'
import AppViewer from 'os/view/market/appViewer'
import Sync from 'os/view/sync'
import Loading from 'os/view/loading'

import Watcher from 'os/view/watcher'
import Walkthrough from 'os/view/walkthrough'
import Installer from 'os/view/installer'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import { loadPage, loadRegister } from 'os/store/page.reducer'
import { loadVisited, updateLoading } from 'os/store/flags.reducer'
import 'os/static/styles/dark.os.less'
import 'os/static/styles/light.os.less'

const View = () => {
  const {
    ui: { theme },
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch<RootDispatch>()

  // Load DApp flags, registry, page
  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(walletAddress)) return
      try {
        await dispatch(updateLoading(true))
        await dispatch(loadVisited())
        const register = await dispatch(loadRegister()).unwrap()
        if (Object.keys(register).length) await dispatch(loadPage())
      } catch (er: any) {
        return window.notify({ type: 'warning', description: er.message })
      } finally {
        await dispatch(updateLoading(false))
      }
    })()
  }, [dispatch, walletAddress])
  // Load theme
  useEffect(() => {
    document.body.setAttribute('id', theme)
  }, [theme])

  return (
    <Layout>
      {/* Header */}
      <Affix>
        <Card
          style={{ borderRadius: '0px 0px 16px 16px' }}
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
      <Loading />
      <Walkthrough />
      <Watcher />
      <Installer />
    </Layout>
  )
}

export default View
