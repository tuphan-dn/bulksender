import { forwardRef } from 'react'
import { Provider } from 'react-redux'
import model from 'app/model'
import P from './page'
import W from './widget'

export const Page = forwardRef<HTMLElement, any>((props, ref) => {
  return (
    <Provider store={model}>
      <P {...props} ref={ref} />
    </Provider>
  )
})

export const Widget = forwardRef<HTMLElement, any>((props, ref) => {
  return (
    <Provider store={model}>
      <W {...props} ref={ref} />
    </Provider>
  )
})
