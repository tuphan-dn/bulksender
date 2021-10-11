import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import Header from 'containers/header'
import Welcome from 'containers/welcome'
import Dashboard from 'containers/dashboard'

const App = () => {
  return (
    <Layout style={{ padding: 12, minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/dashboard/:appId" component={Dashboard} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        </Col>
      </Row>
    </Layout>
  )
}

export default App
