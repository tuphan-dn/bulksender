import { Provider } from 'react-redux'
import { WalletProvider, PDBProvider } from 'senhub/providers'

import PageView from 'app/page'

import model from 'app/model'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const Page = () => {
  return (
    <PDBProvider appId={appId}>
      <WalletProvider>
        <Provider store={model}>
          <PageView />
        </Provider>
      </WalletProvider>
    </PDBProvider>
  )
}

export default Page
