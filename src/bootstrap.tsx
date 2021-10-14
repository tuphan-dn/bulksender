import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import App from 'app'
import store from 'senhub/store'
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
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
