import { Provider } from 'react-redux'
import { UIProvider, WalletProvider } from 'senhub/providers'

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
    <ConfigProvider prefixCls={appId}>
      <WalletProvider>
        <Provider store={model}>
          <PageView />
        </Provider>
      </WalletProvider>
    </ConfigProvider>
  )
}

export const Widget = () => {
  return (
    <ConfigProvider prefixCls={appId}>
      <UIProvider>
        <Provider store={model}>
          <WidgetView />
        </Provider>
      </UIProvider>
    </ConfigProvider>
  )
}
