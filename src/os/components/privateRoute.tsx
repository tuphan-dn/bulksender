import { ComponentProps, ElementType, useCallback } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { useRootSelector, RootState } from 'os/store'

export type PrivateRouteProps = {
  component: ElementType
} & ComponentProps<typeof Route>

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { pathname } = useLocation()
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)

  const render = useCallback(
    (props) => {
      if (!account.isAddress(walletAddress))
        return (
          <Redirect to={'/welcome?redirect=' + encodeURIComponent(pathname)} />
        )
      return <Component {...props} />
    },
    [walletAddress, Component, pathname],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
