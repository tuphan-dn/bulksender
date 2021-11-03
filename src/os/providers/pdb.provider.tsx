import { account } from '@senswap/sen-js'
import { RootState } from 'os/store'
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

import PDB from 'shared/pdb'

const Context = createContext<PDBProvider>({
  isInitialized: false,
} as PDBProvider)

export type PDBProvider = typeof PDB & { isInitialized: boolean }

/**
 * PDB Context Provider
 */
const PDBContextProvider = ({
  children,
  appId,
}: {
  children: ReactNode
  appId: string
}) => {
  const { address } = useSelector((state: RootState) => state.wallet)
  const provider = useMemo(() => {
    return account.isAddress(address)
      ? new PDB(address).createInstance(appId)
      : null
  }, [address, appId])
  return (
    <Context.Provider value={{ ...provider, isInitialized: true }}>
      {children}
    </Context.Provider>
  )
}
export default PDBContextProvider

/**
 * PDB Context Consumer
 */
const PDBContextComsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * PDB HOC
 */
export const withPDB = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <PDBContextComsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </PDBContextComsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * PDB Hook
 */
export const usePDB = () => {
  return useContext<PDBProvider>(Context)
}
