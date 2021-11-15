import { useEffect, useMemo } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Layout, Row, Col, Card, Affix, ConfigProvider } from 'antd'
import PrivateRoute from 'os/components/privateRoute'
import Header from 'os/view/header'
import Welcome from 'os/view/welcome'
import Dashboard from 'os/view/dashboard'
import Page from 'os/view/page'
import Market from 'os/view/market'
import AppViewer from './market/appViewer'
import Sync from './sync'

import Watcher from 'os/view/watcher'
import { RootState } from 'os/store'
import 'os/static/styles/index.light.os.less'
import 'os/static/styles/index.dark.os.less'

const View = () => {
  const {
    ui: { theme },
  } = useSelector((state: RootState) => state)

  const prefix = useMemo(() => `${theme}-sentre`, [theme])
  useEffect(() => {
    return document.body.setAttribute('class', prefix)
  }, [theme, prefix])

  return (
    <ConfigProvider prefixCls={prefix}>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Affix>
          <Card
            style={{
              marginBottom: 12,
              borderRadius: '0px 0px 16px 16px',
            }}
            bodyStyle={{ padding: 16 }}
            bordered={false}
          >
            <Header />
          </Card>
        </Affix>
        {/* Body */}
        <Layout style={{ padding: 12 }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Switch>
                <Route exact path="/welcome" component={Welcome} />
                <PrivateRoute
                  exact
                  path="/dashboard/:pageId?"
                  component={Dashboard}
                />
                <PrivateRoute exact path="/app/:appId" component={Page} />
                <PrivateRoute exact path="/sync" component={Sync} />
                <Route exact path="/store" component={Market} />
                <Route exact path="/store/:appId" component={AppViewer} />
                <Redirect from="*" to="/welcome" />
              </Switch>
            </Col>
          </Row>
        </Layout>
        {/* In-Background Run Jobs */}
        <Watcher />
      </Layout>
    </ConfigProvider>
  )
}

export default View
