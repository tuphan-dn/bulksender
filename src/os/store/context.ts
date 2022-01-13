import { createContext } from 'react'
import { ReactReduxContextValue } from 'react-redux'

/**
 * Root context
 */

export const RootContext = createContext<ReactReduxContextValue>(null as any)

// For singleton debugging
if (process.env.NODE_ENV !== 'production') {
  const uid = Math.random().toString().substring(3, 7)
  RootContext.displayName = uid
}
