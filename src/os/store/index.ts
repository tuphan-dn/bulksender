import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'shared/devTools'

import ui from './ui.reducer'
import flags from './flags.reducer'
import page from './page.reducer'
import wallet from './wallet.reducer'
import accounts from './accounts.reducer'
import mints from './mints.reducer'
import pools from './pools.reducer'
import search from './search.reducer'

/**
 * Root store
 */
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools('sentre'),
  reducer: {
    ui,
    flags,
    page,
    wallet,
    accounts,
    mints,
    pools,
    search,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export default store
