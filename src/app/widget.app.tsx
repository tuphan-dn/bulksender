import { Provider } from 'react-redux'
import { UIProvider } from 'senhub/providers'

import WidgetView from 'app/widget'

import model from 'app/model'

export { default as logo } from 'app/static/images/logo.png'

const Widget = () => {
  return (
    <UIProvider>
      <Provider store={model}>
        <WidgetView />
      </Provider>
    </UIProvider>
  )
}

export default Widget
