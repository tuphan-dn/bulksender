import { Row, Col, Card, Typography } from 'antd'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const AppIcon = ({ appId }: { appId: string }) => {
  const history = useHistory()

  const launch = useCallback(() => {
    return history.push(`/page/${appId}`)
  }, [history, appId])

  return (
    <Card onClick={launch} hoverable>
      <Row gutter={[24, 24]}>
        <Col>
          <Typography.Title level={5}>{appId}</Typography.Title>
        </Col>
      </Row>
    </Card>
  )
}

export default AppIcon
