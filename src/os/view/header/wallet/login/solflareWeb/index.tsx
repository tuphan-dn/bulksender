import { useDispatch } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import SOLFLARE from 'os/static/images/solflare.png'
import { RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { SolflareWallet } from '../../lib'

const Solflare = () => {
  const dispatch = useDispatch<RootDispatch>()

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
      style={{ cursor: 'pointer' }}
      bordered={false}
      hoverable
      bodyStyle={{ padding: '24px 16px' }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Avatar size={64} shape="square" src={SOLFLARE} />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, textAlign: 'center' }}>Solflare Web</p>
        </Col>
      </Row>
    </Card>
  )
}

export default Solflare
