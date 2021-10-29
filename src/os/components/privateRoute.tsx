import { ComponentProps, ElementType, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { RootState } from 'os/store'

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: ElementType
} & ComponentProps<typeof Route>) => {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )

  const render = useCallback(
    (props) => {
      const pathname = encodeURI(
        window.location.href.replace(window.location.origin, ''),
      )
      if (!account.isAddress(walletAddress))
        return <Redirect to={'/welcome?redirect=' + pathname} />
      return <Component {...props} />
    },
    [walletAddress, Component],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
