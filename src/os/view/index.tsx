import { Route, Switch, Redirect } from 'react-router-dom'

import { Layout, Row, Col } from 'antd'
import PrivateRoute from 'os/components/privateRoute'
import Header from 'os/view/header'
import Welcome from 'os/view/welcome'
import Dashboard from 'os/view/dashboard'
import Page from 'os/view/page'
import Market from 'os/view/market'
import AppViewer from './market/appViewer'

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
            <PrivateRoute exact path="/page/:appId" component={Page} />
            <Route exact path="/store" component={Market} />
            <Route exact path="/store/:appId" component={AppViewer} />
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
