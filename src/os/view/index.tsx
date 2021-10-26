import { Route, Switch, Redirect } from 'react-router-dom'

import { Layout, Row, Col } from 'antd'
import Header from 'os/view/header'
import Welcome from 'os/view/welcome'
import Dashboard from 'os/view/dashboard'
import Page from 'os/view/page'
import Settings from 'os/view/settings'

import Watcher from 'os/view/watcher'
import 'os/static/styles/index.os.less'

const View = () => {
  return (
    <Layout style={{ padding: 12, minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/page/:appId" component={Page} />
            <Route exact path="/settings" component={Settings} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        </Col>
      </Row>
      {/* In-Background Run Jobs */}
      <Watcher />
    </Layout>
  )
}

export default View
