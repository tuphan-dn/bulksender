import { Provider } from 'react-redux'
import { UIProvider, WalletProvider } from 'senhub/providers'
import PageView from './page'
import WidgetView from './widget'
import model from './model'

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
