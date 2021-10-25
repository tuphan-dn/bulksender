import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  ReactNode,
  useMemo,
} from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'store'
import { State as UIState } from 'store/ui.reducer'

const Context = createContext<UIProvider>({} as UIProvider)

export type UIProvider = {
  ui: UIState
}

/**
 * UI Context Provider
 */
const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const ui = useSelector((state: RootState) => state.ui)
  const provider = useMemo(() => ({ ui }), [ui])
  return <Context.Provider value={provider}>{children}</Context.Provider>
}
export default UIContextProvider

/**
 * UI Context Consumer
 */
const UIComsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * UI HOC
 */
export const withUI = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <UIComsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </UIComsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * UI Hook
 */
export const useUI = () => {
  return useContext<UIProvider>(Context)
}
