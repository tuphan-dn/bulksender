import { useDispatch } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import COIN98 from 'os/static/images/coin98.png'
import { RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { Coin98Wallet } from '../../lib'

const Coin98 = () => {
  const dispatch = useDispatch<RootDispatch>()

  const connect = async () => {
    const { coin98 } = window
    if (!coin98)
      return window.notify({
        type: 'warning',
        description:
          'Coin98 Wallet is not installed. If this is the first time you install Coin98 wallet, please restart your browser to complete the setup.',
      })
    const wallet = new Coin98Wallet()
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
    >
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Avatar size={64} shape="square" src={COIN98} />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, textAlign: 'center' }}>Coin98</p>
        </Col>
      </Row>
    </Card>
  )
}

export default Coin98
