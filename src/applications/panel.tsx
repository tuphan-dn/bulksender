import { lazy, forwardRef } from 'react'

const RemoteApp = lazy(() => import('panel'))
const App = forwardRef<HTMLElement, any>((props, ref) => (
  <RemoteApp {...props} ref={ref} />
))

export default App
