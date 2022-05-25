import { useHistory } from 'react-router-dom'

import { Card, Col, Row, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'

import { RootState, useRootSelector } from 'os/store'

const AllApps = () => {
  const history = useHistory()
  const register = useRootSelector((state: RootState) => state.page.register)
  const appIds = Object.keys(register)

  return (
    <Card bordered={false} className="glass" bodyStyle={{ padding: 32 }}>
      <Row gutter={[24, 32]}>
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Typography.Title type="secondary" level={3}>
                Let's explore the Store
              </Typography.Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            {appIds.map((appId, i) => (
              <Col key={i}>
                <AppIcon
                  appId={appId}
                  size={72}
                  onClick={() => history.push(`/store/${appId}`)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default AllApps
