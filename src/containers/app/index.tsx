import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import Header from 'containers/header'
import Welcome from 'containers/welcome'

function App() {
  return (
    <Layout style={{ padding: 12, minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        </Col>
      </Row>
    </Layout>
  )
}

export default App
