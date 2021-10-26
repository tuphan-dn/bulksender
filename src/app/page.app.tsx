import { Provider } from 'react-redux'
import { WalletProvider } from 'senhub/providers'

import PageView from 'app/page'

import model from 'app/model'

const Page = () => {
  return (
    <WalletProvider>
      <Provider store={model}>
        <PageView />
      </Provider>
    </WalletProvider>
  )
}

export default Page
