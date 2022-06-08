import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { RootContext } from '@senhub/context'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ConfigProvider } from 'antd'
import View from 'os/view'

import store from 'os/store'
import reportWebVitals from 'reportWebVitals'

render(
  <Provider context={RootContext} store={store}>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ConfigProvider prefixCls={'sentre'}>
          <View />
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
