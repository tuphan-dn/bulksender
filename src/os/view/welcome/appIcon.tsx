import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Row, Col, Card, Typography } from 'antd'

import register from 'senhub.register'

const AppIcon = ({ appId }: { appId: string }) => {
  const history = useHistory()

  const launch = useCallback(() => {
    return history.push(`/page/${appId}`)
  }, [history, appId])

  return (
    <Card onClick={launch} hoverable>
      <Row gutter={[24, 24]}>
        <Col>
          <Typography.Title level={5}>{register[appId].name}</Typography.Title>
        </Col>
      </Row>
    </Card>
  )
}

export default AppIcon
