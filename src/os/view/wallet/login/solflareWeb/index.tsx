import { Row, Card, Col, Avatar } from 'antd'

import SOLFLARE from 'os/static/images/wallet/solflare.png'
import { useRootDispatch, RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { SolflareWallet } from '../../lib'

const Solflare = () => {
  const dispatch = useRootDispatch<RootDispatch>()

  const connect = async () => {
    const solFlareWallet = new SolflareWallet()
    try {
      await dispatch(connectWallet(solFlareWallet)).unwrap()
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    }
  }

  return (
    <Card
      onClick={connect}
      style={{ cursor: 'pointer', borderRadius: 8, boxShadow: 'unset' }}
      bordered={false}
      className="card-wallet-method"
      hoverable
      bodyStyle={{ padding: '12px 16px' }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar size={32} shape="square" src={SOLFLARE} />
        </Col>
        <Col>
          <p style={{ margin: 0, textAlign: 'center' }}>Solflare Web</p>
        </Col>
      </Row>
    </Card>
  )
}

export default Solflare
