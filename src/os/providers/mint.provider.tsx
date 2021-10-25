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
import { getMint as _getMint, State as MintState } from 'os/store/mints.reducer'
import TokenProvider from './tokenProvider'

const tokenProvider = new TokenProvider()
const Context = createContext<MintProvider>({} as MintProvider)

export type MintProvider = {
  mints: MintState
  getMint: (...agrs: Parameters<typeof _getMint>) => Promise<MintState>
  tokenProvider: TokenProvider
}

/**
 * Mint Context Provider
 */
const MintContextProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<RootDispatch>()
  const mints = useSelector((state: RootState) => state.mints)
  const getMint = useCallback(
    async (...agrs: Parameters<typeof _getMint>) =>
      await dispatch(_getMint(...agrs)).unwrap(),
    [dispatch],
  )
  const provider = useMemo(
    () => ({ mints, getMint, tokenProvider }),
    [mints, getMint],
  )
  // Context provider
  return <Context.Provider value={provider}>{children}</Context.Provider>
}
export default MintContextProvider

/**
 * Mint Context Consumer
 */
const MintContextComsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * Mint HOC
 */
export const withMint = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <MintContextComsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </MintContextComsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * Mint Hook
 */
export const useMint = () => {
  return useContext<MintProvider>(Context)
}
