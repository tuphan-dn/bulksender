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
import WidgetView from 'app/widget'

import configs from 'app/configs'
import model from 'app/model'
import 'app/static/styles/index.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
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

export const Widget = () => {
  return (
    <UIProvider>
      <WalletProvider>
        <AccountProvider>
          <MintProvider>
            <PoolProvider>
              <Provider store={model}>
                <ConfigProvider prefixCls={appId}>
                  <WidgetView />
                </ConfigProvider>
              </Provider>
            </PoolProvider>
          </MintProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}
