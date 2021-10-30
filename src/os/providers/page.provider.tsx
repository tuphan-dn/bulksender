import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  useCallback,
  ReactNode,
  useMemo,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, RootDispatch } from 'os/store'
import {
  State as PageState,
  loadPage as _loadPage,
  updatePage as _updatePage,
  installApp as _installApp,
  uninstallApp as _uninstallApp,
} from 'os/store/page.reducer'

const Context = createContext<PageProvider>({} as PageProvider)

export type PageProvider = {
  page: PageState
  loadPage: (
    ...agrs: Parameters<typeof _loadPage>
  ) => Promise<Partial<PageState>>
  updatePage: (
    ...agrs: Parameters<typeof _updatePage>
  ) => Promise<Partial<PageState>>
  installApp: (
    ...agrs: Parameters<typeof _installApp>
  ) => Promise<Partial<PageState>>
  uninstallApp: (
    ...agrs: Parameters<typeof _uninstallApp>
  ) => Promise<Partial<PageState>>
}

/**
 * Page Context Provider
 */
const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<RootDispatch>()
  const page = useSelector((state: RootState) => state.page)
  const loadPage = useCallback(
    async (...agrs: Parameters<typeof _loadPage>) =>
      await dispatch(_loadPage(...agrs)).unwrap(),
    [dispatch],
  )
  const updatePage = useCallback(
    async (...agrs: Parameters<typeof _updatePage>) =>
      await dispatch(_updatePage(...agrs)).unwrap(),
    [dispatch],
  )
  const installApp = useCallback(
    async (...agrs: Parameters<typeof _installApp>) =>
      await dispatch(_installApp(...agrs)).unwrap(),
    [dispatch],
  )
  const uninstallApp = useCallback(
    async (...agrs: Parameters<typeof _uninstallApp>) =>
      await dispatch(_uninstallApp(...agrs)).unwrap(),
    [dispatch],
  )
  const provider = useMemo(
    () => ({ page, loadPage, updatePage, installApp, uninstallApp }),
    [page, loadPage, updatePage, installApp, uninstallApp],
  )
  return <Context.Provider value={provider}>{children}</Context.Provider>
}
export default PageContextProvider

/**
 * Page Context Consumer
 */
const PageComsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * Page HOC
 */
export const withPage = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <PageComsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </PageComsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * Page Hook
 */
export const usePage = () => {
  return useContext<PageProvider>(Context)
}
