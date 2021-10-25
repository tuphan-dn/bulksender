import { Provider } from 'react-redux'
import { UIProvider, WalletProvider } from 'senhub/providers'

import { ConfigProvider } from 'antd'
import PageView from './page'
import WidgetView from './widget'

import configs from 'app/configs'
import model from './model'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <WalletProvider>
      <Provider store={model}>
        <ConfigProvider prefixCls={appId}>
          <PageView />
        </ConfigProvider>
      </Provider>
    </WalletProvider>
  )
}

export const Widget = () => {
  return (
    <UIProvider>
      <Provider store={model}>
        <ConfigProvider prefixCls={appId}>
          <WidgetView />
        </ConfigProvider>
      </Provider>
    </UIProvider>
  )
}
