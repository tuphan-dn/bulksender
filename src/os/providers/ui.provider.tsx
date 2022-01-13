import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  ReactNode,
  useMemo,
  CSSProperties,
} from 'react'

import { ConfigProvider } from 'antd'

import { useRootSelector, RootState } from 'os/store'
import { UIState } from 'os/store/ui.reducer'
import { ConfigProviderProps } from 'antd/lib/config-provider'

const Context = createContext<UIProvider>({} as UIProvider)

export type UIProvider = {
  ui: UIState
}

/**
 * UI Context Provider
 */
const UIContextProvider = ({
  children,
  appId,
  style = {},
  antd = false,
}: {
  children: ReactNode
  appId: string
  style?: CSSProperties
  antd?: boolean | ConfigProviderProps
}) => {
  const { ui } = useRootSelector((state: RootState) => state)
  const provider = useMemo(() => ({ ui }), [ui])
  const configProvider = antd
    ? {
        getPopupContainer: () => document.getElementById(appId) as HTMLElement,
        ...(typeof antd === 'object' ? antd : {}),
      }
    : undefined

  return (
    <Context.Provider value={provider}>
      <section
        id={appId}
        style={{ height: '100%', backgroundColor: 'transparent', ...style }}
      >
        {configProvider ? (
          <ConfigProvider {...configProvider}>{children}</ConfigProvider>
        ) : (
          children
        )}
      </section>
    </Context.Provider>
  )
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
