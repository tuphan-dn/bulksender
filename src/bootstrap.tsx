import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import View from 'view'

import configs from 'configs'
import store from 'store'
import reportWebVitals from 'reportWebVitals'

const {
  manifest: { appId },
} = configs

render(
  <Provider store={store}>
    <ConfigProvider prefixCls={appId}>
      <BrowserRouter>
        <View />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
