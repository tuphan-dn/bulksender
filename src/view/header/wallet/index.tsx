import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Space, Typography, Button } from 'antd'
import IonIcon from 'components/ionicon'
import Login from './login'

import session from 'helpers/session'
import { RootDispatch, RootState } from 'store'
import {
  connectWallet,
  openWallet,
  disconnectWallet,
} from 'store/wallet.reducer'
import { notify } from 'store/ui.reducer'
import {
  Coin98Wallet,
  PhantomWallet,
  SecretKeyWallet,
  SolletWallet,
  SlopeWallet,
} from './lib'

const Wallet = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { address } = useSelector((state: RootState) => state.wallet)

  const reconnect = () => {
    const walletType = session.get('WalletType')
    if (walletType === 'SecretKey')
      return new SecretKeyWallet(session.get('SecretKey'))
    if (walletType === 'Keystore')
      return new SecretKeyWallet(session.get('SecretKey'))
    if (walletType === 'Coin98') return new Coin98Wallet()
    if (walletType === 'Phantom') return new PhantomWallet()
    if (walletType === 'Sollet') return new SolletWallet()
    if (walletType === 'Slope') return new SlopeWallet()
    return null
  }

  useEffect(() => {
    const wallet = reconnect()
    try {
      if (wallet) dispatch(connectWallet(wallet)).unwrap()
    } catch (er) {
      dispatch(notify({ type: 'error', description: (er as Error).message }))
    }
  }, [dispatch])

  if (!account.isAddress(address))
    return (
      <Space>
        <Typography.Text style={{ fontSize: 12 }}>
          Connect Wallet
        </Typography.Text>
        <Button
          type="primary"
          icon={<IonIcon name="wallet-outline" />}
          onClick={() => dispatch(openWallet())}
        />
        <Login />
      </Space>
    )

  return (
    <Button
      type="primary"
      icon={<IonIcon name="power-outline" />}
      onClick={() => dispatch(disconnectWallet())}
      block
    >
      Disconnect
    </Button>
  )
}

export default Wallet
