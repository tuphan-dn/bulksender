import { Provider } from 'react-redux'
import {
  UIProvider,
  WalletProvider,
  AccountProvider,
  MintProvider,
  PoolProvider,
} from 'senhub/providers'

import PageView from 'app/page'

import model from 'app/model'
import configs from 'app/configs'
import 'app/static/styles/light.less'
import 'app/static/styles/dark.less'

const {
  manifest: { appId },
} = configs

const Page = () => {
  return (
    <UIProvider appId={appId} antd>
      <WalletProvider>
        <AccountProvider>
          <MintProvider>
            <PoolProvider>
              <Provider store={model}>
                <PageView />
              </Provider>
            </PoolProvider>
          </MintProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export default Page
