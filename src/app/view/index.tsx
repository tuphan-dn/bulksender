import { Row, Col, Typography, Card } from 'antd'
import { useCallback } from 'react'
import IonIcon from 'shared/antd/ionicon'
import Actions from './actions'
import Collector from './collector'
import MintSelection from './mintSelection'
import Representor from './representor'

const View = () => {
  const url = 'https://hub.sentre.io/app/lightning_tunnel?autoInstall=true'
  const onLightningTunnel = useCallback(() => window.open(url, '_blank'), [url])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} style={{ maxWidth: 1200 }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={3}>Solana Bulk Sender</Typography.Title>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Card onClick={onLightningTunnel} hoverable>
                  <Typography.Text>
                    <IonIcon name="information-circle-outline" /> If you plan to
                    do an airdrop with more than 10 receivers, we highly
                    recommend{' '}
                    <span style={{ color: '#328f62', cursor: 'pointer' }}>
                      Lightning Tunnel
                    </span>{' '}
                    to effectively save transaction fees.
                  </Typography.Text>
                </Card>
              </Col>
              <Col span={24}>
                <MintSelection />
              </Col>
              <Col span={24}>
                <Collector />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Representor />
              </Col>
              <Col span={24}>
                <Actions />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
