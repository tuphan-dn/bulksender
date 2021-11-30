import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Row, Col, Card } from 'antd'
import WelcomeSlide from './welcomeSlide'
import SocialButton from './socialButton'
import WalletConnection from '../header/wallet/login/walletConnection'

import { RootState } from 'os/store'
import './index.less'

const Welcome = () => {
  const history = useHistory()
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )
  const { width } = useSelector((state: RootState) => state.ui)

  // Redirect callback
  useEffect(() => {
    if (account.isAddress(walletAddress)) return history.push('/dashboard')
  }, [walletAddress, history])

  return (
    <Row gutter={[24, 24]} justify="center" className="welcome">
      <Col xs={24} lg={12} className="welcome-slide">
        <WelcomeSlide />
        <SocialButton />
      </Col>
      {width >= 992 && (
        <Col xs={24} lg={12} className="welcome-wallet-connection">
          <Card
            className="card-wallet-connection"
            bordered={false}
            hoverable={false}
          >
            <WalletConnection />
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default Welcome
