import { useSelector } from 'react-redux'

import { Row, Col, Typography, Avatar, Space } from 'antd'
import AppIcon from './appIcon'

import logo from 'static/images/sen.svg'
import manifest from 'senhub.manifest'
import { RootState } from 'store'

const Welcome = () => {
  const { width, infix } = useSelector((state: RootState) => state.ui)

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Space direction="vertical" align="center">
          <Avatar size={128} src={logo} alt="logo" />
          <Typography.Text>
            Screen Size: <strong>{width}</strong>
          </Typography.Text>
          <Typography.Text>
            Screen Type: <strong>{infix}</strong>
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {Object.keys(manifest).map((appId) => (
            <Col key={appId}>
              <AppIcon appId={appId} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Welcome
