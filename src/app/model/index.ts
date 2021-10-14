import { configureStore } from '@reduxjs/toolkit'
import middleware from 'store/middleware'
import devTools from 'store/devTools'

import ui from '../controller/ui.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware,
  devTools: devTools(process.env.REACT_APP_NAME || ''),
  reducer: {
    ui,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
