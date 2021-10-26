import { Provider } from 'react-redux'
import {
  UIProvider,
  WalletProvider,
  AccountProvider,
  MintProvider,
  PoolProvider,
} from 'senhub/providers'

import { ConfigProvider } from 'antd'
import PageView from 'app/page'

import configs from 'app/configs'
import model from 'app/model'
import 'app/static/styles/index.less'

const {
  manifest: { appId },
} = configs

const Page = () => {
  return (
    <UIProvider>
      <WalletProvider>
        <AccountProvider>
          <MintProvider>
            <PoolProvider>
              <Provider store={model}>
                <ConfigProvider prefixCls={appId}>
                  <PageView />
                </ConfigProvider>
              </Provider>
            </PoolProvider>
          </MintProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export default Page
