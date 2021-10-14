import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  useCallback,
  ReactNode,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, RootDispatch } from 'store'
import { notify as _notify, State as UIState } from 'store/ui.reducer'

const Context = createContext<UIProvider>({} as UIProvider)

export type UIProvider = {
  ui: UIState
  notify: (...agrs: Parameters<typeof _notify>) => Promise<{}>
}

/**
 * UI Context Provider
 */
const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<RootDispatch>()
  const ui = useSelector((state: RootState) => state.ui)
  const notify = useCallback(
    async (...agrs: Parameters<typeof _notify>) =>
      await dispatch(_notify(...agrs)).unwrap(),
    [dispatch],
  )
  const provider = { ui, notify }
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
