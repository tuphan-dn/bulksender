import { Provider } from 'react-redux'
import {
  UIProvider,
  WalletProvider,
  AccountProvider,
  MintProvider,
  PoolProvider,
} from 'senhub/providers'

import { ConfigProvider } from 'antd'
import PageView from './page'
import WidgetView from './widget'

import configs from 'configs'
import model from './model'
import 'static/styles/index.less'

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
