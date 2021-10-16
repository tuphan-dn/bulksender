import { Fragment } from 'react'
import UIWatcher from './ui.watcher'
import WalletWatcher from './wallet.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <WalletWatcher />
    </Fragment>
  )
}

export default Watcher
