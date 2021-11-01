import { Route, Switch, Redirect } from 'react-router-dom'

import { Layout, Row, Col, Card, Affix } from 'antd'
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
              <Route exact path="/dashboard/:pageId?" component={Dashboard} />
              <PrivateRoute exact path="/app/:appId" component={Page} />
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
  )
}

export default View
