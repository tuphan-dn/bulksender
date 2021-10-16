import { configureStore } from '@reduxjs/toolkit'
import middleware from 'store/middleware'
import devTools from 'store/devTools'

import main from 'app/model/main.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware,
  devTools: devTools('myapp'),
  reducer: {
    main,
  },
})
export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
