import { useCallback, useState, useEffect } from 'react'
import { Connection } from '@solana/web3.js'

import { Row, Col, Typography, Space, Badge, Card } from 'antd'
import NetSwitch from './netSwitch'

import configs from 'os/configs'
import IonIcon from 'shared/ionicon'

const {
  sol: { node },
} = configs
const connection = new Connection(node)
// 0: Failed, 1: Poor, 2: Moderate, 3: Good
type NetworkStatus = 0 | 1 | 2 | 3
let intervalId: ReturnType<typeof setTimeout> | undefined

const parseType = (status: number) => {
  return status === 3
    ? 'success'
    : status === 2
    ? 'warning'
    : status === 1
    ? 'error'
    : 'default'
}

const parseMessage = (status: number) => {
  return status === 3
    ? 'Good'
    : status === 2
    ? 'Moderate'
    : status === 1
    ? 'Poor'
    : 'No'
}

const Network = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(0)

  // Intervally ping solana cluster
  const ping = useCallback(async () => {
    try {
      if (!window.navigator.onLine) return setNetworkStatus(0)
      const start = Date.now()
      await connection.getVersion()
      const end = Date.now()
      const duration = end - start
      if (duration < 250) return setNetworkStatus(3)
      if (duration < 1000) return setNetworkStatus(2)
      return setNetworkStatus(1)
    } catch (er) {
      return setNetworkStatus(0)
    }
  }, [])

  useEffect(() => {
    if (intervalId) clearInterval(intervalId)
    ping() // Init the network status
    intervalId = setInterval(ping, 1000)
    return () => {
      if (intervalId) clearInterval(intervalId)
      intervalId = undefined
    }
  }, [ping])

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable bordered={false}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col flex="auto">
              <Space>
                <IonIcon name="wifi-outline" />
                <Typography.Text>Solana Network</Typography.Text>
              </Space>
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
