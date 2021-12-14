import { Provider } from 'react-redux'
import {
  UIProvider,
  WalletProvider,
  AccountProvider,
  MintProvider,
  PoolProvider,
} from 'senhub/providers'

import PageView from 'app/page'
import WidgetView from 'app/widget'

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

export const widgetConfig: WidgetConfig = {
  size: 'small',
  type: 'solid',
}

export const Widget = () => {
  return (
    <UIProvider appId={appId} antd={{ prefixCls: appId }}>
      <WalletProvider>
        <AccountProvider>
          <MintProvider>
            <PoolProvider>
              <Provider store={model}>
                <WidgetView />
              </Provider>
            </PoolProvider>
          </MintProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}
