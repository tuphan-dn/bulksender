import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  MintProvider,
  PoolProvider,
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
    <UIProvider appId={appId} antd>
      <WalletProvider>
        <AccountProvider>
          <PoolProvider>
            <MintProvider>
              <Provider store={model}>
                <View />
              </Provider>
            </MintProvider>
          </PoolProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}
