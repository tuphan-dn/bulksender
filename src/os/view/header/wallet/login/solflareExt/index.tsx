import { useDispatch } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import SOLFLARE from 'os/static/images/solflare.png'
import { RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { SolflareExtensionWallet } from '../../lib'

const SolflareExtension = () => {
  const dispatch = useDispatch<RootDispatch>()

  const connect = async () => {
    const { solflare } = window
    if (!solflare)
      return window.notify({
        type: 'warning',
        description:
          'Solflare Wallet is not installed. If this is the first time you install Solflare wallet, please restart your browser to complete the setup.',
      })
    const wallet = new SolflareExtensionWallet()
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
      bodyStyle={{ padding: '24px 16px' }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Avatar size={64} shape="square" src={SOLFLARE} />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, textAlign: 'center' }}>Solflare Ext</p>
        </Col>
      </Row>
    </Card>
  )
}

export default SolflareExtension
