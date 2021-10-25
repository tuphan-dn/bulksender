import { Provider } from 'react-redux'
import { UIProvider, WalletProvider } from 'senhub/providers'

import PageView from 'app/page'
import WidgetView from 'app/widget'

import model from 'app/model'

export const Page = () => {
  return (
    <WalletProvider>
      <Provider store={model}>
        <PageView />
      </Provider>
    </WalletProvider>
  )
}

export const Widget = () => {
  return (
    <UIProvider>
      <Provider store={model}>
        <WidgetView />
      </Provider>
    </UIProvider>
  )
}
