import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import App from 'containers/app'
import store from 'senos/store'
import reportWebVitals from 'reportWebVitals'

import 'static/styles/index.css'
ConfigProvider.config({
  theme: {
    primaryColor: '#F9575E',
    infoColor: '#37CDFA',
    successColor: '#3DBA4E',
    warningColor: '#FCB017',
    errorColor: '#F2323F',
  },
})

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
