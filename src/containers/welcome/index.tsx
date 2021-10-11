import { Row, Col, Typography, Avatar, Space } from 'antd'
import AppIcon from './appIcon'

import logo from 'static/images/logo.svg'

const Welcome = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Space direction="vertical" align="center">
          <Avatar size={128} src={logo} alt="logo" />
          <Typography.Text>
            <strong>2mf</strong> is an example and an experiement for Micro
            Frontend and Module Federation.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col>
            <AppIcon appId="panel" />
          </Col>
          <Col>
            <AppIcon appId="hello" />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Welcome
