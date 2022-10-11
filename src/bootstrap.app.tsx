import { Provider } from 'react-redux'
import { AntdProvider } from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'

import 'static/styles/light.less'
import 'static/styles/dark.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <AntdProvider appId={appId} prefixCls={appId}>
      <Provider store={model}>
        <View />
      </Provider>
    </AntdProvider>
  )
}

export * from 'static.app'
