import { configureStore } from '@reduxjs/toolkit'
import middleware from './middleware'
import devTools from './devTools'

import ui from './ui.reducer'
const store = configureStore({
  middleware,
  devTools: devTools('SenOS'),
  reducer: {
    ui,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export default store
