import { Row, Col, Typography, Card } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Actions from './actions'
import Collector from './collector'
import MintSelection from './mintSelection'
import Representor from './representor'

const LIGHTNING_TUNNEL_URL =
  'https://hub.sentre.io/lightning_tunnel?autoInstall=true'

const View = () => {
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
                <Card
                  onClick={() => window.open(LIGHTNING_TUNNEL_URL, '_blank')}
                  hoverable
                >
                  <Typography.Text>
                    <IonIcon name="information-circle-outline" /> If you plan to
                    do Airdrops (or Retroactives, Vesting, Distributions), we
                    highly recommend{' '}
                    <span style={{ color: '#328f62' }}>Lightning Tunnel</span>{' '}
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
