import { Row, Col, Typography, Avatar, Space } from 'antd'

import logo from 'static/images/logo.svg'

const Welcome = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Space direction="vertical" align="center">
          <Avatar size={128} src={logo} alt="logo" />
          <Typography.Text>
            Edit <code>src/App.tsx</code> and save to reload.
          </Typography.Text>

          <Typography.Link
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Typography.Link>
        </Space>
      </Col>
    </Row>
  )
}

export default Welcome
