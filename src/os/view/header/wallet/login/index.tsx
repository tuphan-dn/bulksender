import { Modal } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import {
  useRootDispatch,
  useRootSelector,
  RootState,
  RootDispatch,
} from 'os/store'
import { closeWallet } from 'os/store/wallet.reducer'
import WalletConnection from './walletConnection'

const Login = () => {
  const { visible } = useRootSelector((state: RootState) => state.wallet)
  const dispatch = useRootDispatch<RootDispatch>()
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
