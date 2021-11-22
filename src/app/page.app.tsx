import { Provider } from 'react-redux'
import { WalletProvider, UIProvider } from 'senhub/providers'

import PageView from 'app/page'

import model from 'app/model'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const Page = () => {
  return (
    <UIProvider appId={appId}>
      <WalletProvider>
        <Provider store={model}>
          <PageView />
        </Provider>
      </WalletProvider>
    </UIProvider>
  )
}

export default Page
