import { useDispatch } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import PHANTOM from 'static/images/phantom.png'
import { RootDispatch } from 'store'
import { connectWallet } from 'store/wallet.reducer'
import { notify } from 'store/ui.reducer'
import { PhantomWallet } from '../../lib'

const Phantom = () => {
  const dispatch = useDispatch<RootDispatch>()

  const connect = async () => {
    const { solana } = window
    if (!solana?.isPhantom)
      return dispatch(
        notify({
          type: 'warning',
          description:
            'Phantom Wallet is not installed. If this is the first time you install Phantom wallet, please restart your browser to complete the setup.',
        }),
      )
    const wallet = new PhantomWallet()
    try {
      await dispatch(connectWallet(wallet)).unwrap()
    } catch (er) {
      return dispatch(notify({ type: 'error', description: (er as Error).message }))
    }
  }

  return (
    <Card
      onClick={connect}
      style={{ cursor: 'pointer' }}
      bordered={false}
      hoverable
    >
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Avatar size={64} shape="square" src={PHANTOM} />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, textAlign: 'center' }}>Phantom</p>
        </Col>
      </Row>
    </Card>
  )
}

export default Phantom
