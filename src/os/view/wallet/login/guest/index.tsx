import { Row, Card, Col, Avatar, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { useRootDispatch, RootDispatch } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { GuestWallet } from '../../lib'

const Guest = () => {
  const dispatch = useRootDispatch<RootDispatch>()

  const connect = async () => {
    const wallet = new GuestWallet()
    try {
      await dispatch(connectWallet(wallet)).unwrap()
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
          <Avatar
            size={32}
            shape="square"
            style={{ backgroundColor: '#f9575e' }}
          >
            <IonIcon name="person-outline" />
          </Avatar>
        </Col>
        <Col>
          <Typography.Text>Try as a guest</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default Guest
