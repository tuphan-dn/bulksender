import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { isTouchable } from 'helpers/util'

/**
 * Interface & Utility
 */

type Infix = 'senos-xs' | 'senos-sm' | 'senos-md' | 'senos-lg' | 'senos-xl' | 'senos-xxl'

export type State = {
  width: number
  infix: Infix
  touchable: boolean
}

const getInfix = (): Infix => {
  const width = window.innerWidth
  if (width < 576) return 'senos-xs'
  if (width < 768) return 'senos-sm'
  if (width < 992) return 'senos-md'
  if (width < 1200) return 'senos-lg'
  if (width < 1400) return 'senos-xl'
  return 'senos-xxl'
}

/**
 * Store constructor
 */

const NAME = 'ui'
const initialState: State = {
  width: window.innerWidth,
  infix: getInfix(),
  touchable: isTouchable(),
}

/**
 * Actions
 */

export const resize = createAsyncThunk(`${NAME}/resize`, async () => {
  const width = window.innerWidth
  const infix = getInfix()
  return { width, infix }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      resize.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
