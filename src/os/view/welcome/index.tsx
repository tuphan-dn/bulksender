import { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Row, Col } from 'antd'

import { RootState } from 'os/store'

const Welcome = () => {
  const history = useHistory()
  const location = useLocation()
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )

  // Redirect callback
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const redirect = decodeURI(params.get('redirect') || '/welcome')
    if (account.isAddress(walletAddress)) return history.push(redirect)
  }, [walletAddress, history, location.search])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>Welcome</Col>
    </Row>
  )
}

export default Welcome
