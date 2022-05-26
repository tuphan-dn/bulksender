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

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <MintProvider>
      <AccountProvider>
        <UIProvider appId={appId} antd>
          <WalletProvider>
            <Provider store={model}>
              <View />
            </Provider>
          </WalletProvider>
        </UIProvider>
      </AccountProvider>
    </MintProvider>
  )
}
