import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { isTouchable } from 'shared/util'

/**
 * Interface & Utility
 */

export type Infix = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type State = {
  width: number
  infix: Infix
  touchable: boolean
  actionCenterVisible: boolean
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
  actionCenterVisible: false,
}

/**
 * Actions
 */

export const resize = createAsyncThunk(`${NAME}/resize`, async () => {
  const width = window.innerWidth
  const infix = getInfix()
  return { width, infix }
})

export const setActionCenterVisible = createAsyncThunk(
  `${NAME}/setActionCenterVisible`,
  async (visible: boolean) => {
    return { actionCenterVisible: visible }
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
        setActionCenterVisible.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
