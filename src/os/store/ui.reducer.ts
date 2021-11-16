import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { isTouchable } from 'shared/util'

/**
 * Interface & Utility
 */

export type Infix = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type Theme = 'light' | 'dark'
export type TabSetting = 'action-center' | 'system-settings'

export type State = {
  theme: Theme
  width: number
  infix: Infix
  touchable: boolean
  actionCenterVisible: boolean
  defaultTabSetting: TabSetting
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
  theme: 'light',
  width: window.innerWidth,
  infix: getInfix(),
  touchable: isTouchable(),
  actionCenterVisible: false,
  defaultTabSetting: 'action-center',
}

/**
 * Actions
 */

export const setTheme = createAsyncThunk(
  `${NAME}/setTheme`,
  async (theme: Theme) => {
    return { theme }
  },
)

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
export const setDefaultTabSettings = createAsyncThunk(
  `${NAME}/setDefaultTabSettings`,
  async (defaultTab: TabSetting) => {
    return { defaultTabSetting: defaultTab }
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
        setTheme.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        resize.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setActionCenterVisible.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setDefaultTabSettings.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
