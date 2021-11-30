import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Card, Col, Avatar } from 'antd'

import SOLLET from 'os/static/images/sollet.png'
import { RootDispatch, RootState } from 'os/store'
import { connectWallet } from 'os/store/wallet.reducer'
import { SolletWallet } from '../../lib'

const Sollet = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { infix } = useSelector((state: RootState) => state.ui)

  const connect = async () => {
    const wallet = new SolletWallet()
    try {
      await dispatch(connectWallet(wallet)).unwrap()
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    }
  }

  const avatarSize = useMemo(() => {
    return infix === 'lg' ? 32 : 64
  }, [infix])

  return (
    <Card
      onClick={connect}
      style={{ cursor: 'pointer' }}
      bordered={false}
      hoverable
    >
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Avatar size={avatarSize} shape="square" src={SOLLET} />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, textAlign: 'center' }}>Sollet</p>
        </Col>
      </Row>
    </Card>
  )
}

export default Sollet
