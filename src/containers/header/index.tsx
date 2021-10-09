import { Row, Col, Typography, Avatar, Space, Affix, Card } from 'antd'

import logo from 'static/images/logo.svg'

const Welcome = () => {
  return (
    <Affix offsetTop={12}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 16 }} hoverable>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Space align="center">
                  <Avatar src={logo} alt="logo" />
                  <Typography.Text>2MF</Typography.Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Affix>
  )
}

export default Welcome
