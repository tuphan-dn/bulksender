import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { isTouchable } from 'helpers/util'

/**
 * Interface & Utility
 */

export type Infix = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
// 0: Failed, 1: Poor, 2: Moderate, 3: Good
export type NetworkStatus = 0 | 1 | 2 | 3

export type State = {
  width: number
  infix: Infix
  touchable: boolean
  networkStatus: NetworkStatus
}

const getInfix = (): Infix => {
  const width = window.innerWidth
  if (width < 576) return 'xs'
  if (width < 768) return 'sm'
  if (width < 992) return 'md'
  if (width < 1200) return 'lg'
  if (width < 1400) return 'xl'
  return 'xxl'
}

/**
 * Store constructor
 */

const NAME = 'ui'
const initialState: State = {
  width: window.innerWidth,
  infix: getInfix(),
  touchable: isTouchable(),
  networkStatus: 0,
}

/**
 * Actions
 */

export const resize = createAsyncThunk(`${NAME}/resize`, async () => {
  const width = window.innerWidth
  const infix = getInfix()
  return { width, infix }
})

export const setNetworkStatus = createAsyncThunk(
  `${NAME}/setNetworkStatus`,
  async (networkStatus: NetworkStatus) => {
    return { networkStatus }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        resize.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setNetworkStatus.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
