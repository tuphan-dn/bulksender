import { useDispatch } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import SLOPE from 'os/static/images/slope.svg'
import { RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { SlopeWallet } from '../../lib'

const Slope = () => {
  const dispatch = useDispatch<RootDispatch>()

  const connect = async () => {
    const { Slope } = window
    if (!Slope)
      return window.notify({
        type: 'warning',
        description:
          'Slope Wallet is not installed. If this is the first time you install Slope wallet, please restart your browser to complete the setup.',
      })
    const wallet = new SlopeWallet()
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
          <Avatar size={64} shape="square" src={SLOPE} />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, textAlign: 'center' }}>Slope</p>
        </Col>
      </Row>
    </Card>
  )
}

export default Slope
