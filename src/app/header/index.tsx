import { Row, Col, Typography, Avatar, Space, Affix, Card, Button } from 'antd'
import { useHistory } from 'react-router-dom'

import logo from 'static/images/sen.svg'

const Header = () => {
  const history = useHistory()
  const home = () => history.push('/welcome')
  const back = () => history.goBack()

  return (
    <Affix offsetTop={12}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 16 }} hoverable>
            <Row gutter={[24, 24]} wrap={false}>
              <Col flex="auto">
                <Space align="center">
                  <Avatar src={logo} alt="logo" />
                  <Typography.Text>2MF</Typography.Text>
                </Space>
              </Col>
              <Col>
                <Button onClick={home}>Home</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={back}>
                  Back
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Affix>
  )
}

export default Header
