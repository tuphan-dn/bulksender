import { useSelector } from 'react-redux'

import { Row, Col, Typography, Space, Badge } from 'antd'
import NetSwitch from './netSwitch'

import { RootState } from 'store'

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
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Space direction="vertical">
          <Typography.Text>Network</Typography.Text>
          <Space size={0}>
            <Badge status={parseType(networkStatus)} dot />
            <Typography.Text type="secondary">
              {`${parseMessage(networkStatus)} connection`}
            </Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col>
        <NetSwitch />
      </Col>
    </Row>
  )
}

export default Network
