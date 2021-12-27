import { useDispatch } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import SOLFLARE from 'os/static/images/solflare.png'
import { RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { SolflareWallet } from '../../lib'

const Solflare = () => {
  const dispatch = useDispatch<RootDispatch>()

  const connect = async () => {
    const { solflare } = window
    if (!solflare)
      return window.notify({
        type: 'warning',
        description:
          'Solflare Wallet is not installed. If this is the first time you install Solflare wallet, please restart your browser to complete the setup.',
      })
    const wallet = new SolflareWallet()
    try {
      await dispatch(connectWallet(wallet)).unwrap()
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
      bodyStyle={{ padding: 16 }}
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
