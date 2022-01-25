import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Row, Col, Typography, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const NotFound = ({ appId }: { appId: string }) => {
  const history = useHistory()

  const search = useCallback(() => {
    return history.push(`/store?search=${appId}`)
  }, [history, appId])

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24} />
      <Col>
        <Typography.Title level={1}>
          The app is not installed yet!
        </Typography.Title>
      </Col>
      <Col span={24} />
      <Col>
        <Button onClick={search} icon={<IonIcon name="search-outline" />}>
          Search in the store
        </Button>
      </Col>
    </Row>
  )
}

export default NotFound
