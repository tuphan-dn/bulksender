import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  MintProvider,
  AccountProvider,
} from '@senhub/providers'

import View from 'app/view'

import model from 'app/model'
import configs from 'app/configs'

import 'app/static/styles/light.less'
import 'app/static/styles/dark.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} antd={{ prefixCls: appId }}>
      <WalletProvider>
        <MintProvider>
          <AccountProvider>
            <Provider store={model}>
              <View />
            </Provider>
          </AccountProvider>
        </MintProvider>
      </WalletProvider>
    </UIProvider>
  )
}
