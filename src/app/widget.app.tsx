import { Provider } from 'react-redux'
import { UIProvider } from 'senhub/providers'

import WidgetView from 'app/widget'

import model from 'app/model'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

export const widgetConfig: WidgetConfig = {
  size: 'small',
  type: 'solid',
}

const Widget = () => {
  return (
    <UIProvider appId={appId}>
      <Provider store={model}>
        <WidgetView />
      </Provider>
    </UIProvider>
  )
}

export default Widget
