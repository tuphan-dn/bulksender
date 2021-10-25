import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import Header from 'view/header'
import Welcome from 'view/welcome'
import Dashboard from 'view/dashboard'
import Page from 'view/page'

import Watcher from 'view/watcher'

import 'static/styles/index.less'
import Utility from './utility'

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
            <Redirect from="*" to="/welcome" />
          </Switch>
        </Col>
      </Row>
      {/* In-Background Run Jobs */}
      <Watcher />
      <Utility />
    </Layout>
  )
}

export default View
