import { useSelector } from 'react-redux'

import { Row, Col, Typography, Space, Badge, Card } from 'antd'
import NetSwitch from './netSwitch'

import { RootState } from 'os/store'

export const parseType = (status: number) => {
  return status === 3
    ? 'success'
    : status === 2
    ? 'warning'
    : status === 1
    ? 'error'
    : 'default'
}

export const parseMessage = (status: number) => {
  return status === 3
    ? 'Good'
    : status === 2
    ? 'Moderate'
    : status === 1
    ? 'Poor'
    : 'No'
}

const Network = () => {
  const { networkStatus } = useSelector((state: RootState) => state.ui)

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col flex="auto">
              <Typography.Text>Solana Network</Typography.Text>
            </Col>
            <Col>
              <NetSwitch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space size={0}>
            <Badge status={parseType(networkStatus)} dot />
            <Typography.Text type="secondary">
              {`${parseMessage(networkStatus)} connection`}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default Network
