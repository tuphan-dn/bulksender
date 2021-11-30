import { useDispatch, useSelector } from 'react-redux'

import { Modal } from 'antd'
import IonIcon from 'shared/ionicon'

import { RootState, RootDispatch } from 'os/store'
import { closeWallet } from 'os/store/wallet.reducer'
import WalletConnection from './walletConnection'

const Login = () => {
  const { visible } = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch<RootDispatch>()

  return (
    <Modal
      visible={visible}
      onCancel={() => dispatch(closeWallet())}
      closeIcon={<IonIcon name="close" />}
      footer={null}
    >
      <WalletConnection />
    </Modal>
  )
}

export default Login
