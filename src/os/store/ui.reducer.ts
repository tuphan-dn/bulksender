import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

const TIME_ZONE_MORNING = 6
const TIME_ZONE_NIGHT = 18

export type Infix = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type Theme = 'light' | 'dark'

export type State = {
  theme: Theme
  width: number
  infix: Infix
  touchable: boolean
  visibleActionCenter: boolean
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
const isTouchable = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
const getTheme = (): Theme => {
  const hour = new Date().getHours()
  if (hour >= TIME_ZONE_MORNING && hour < TIME_ZONE_NIGHT) return 'light'
  return 'dark'
}

/**
 * Store constructor
 */

const NAME = 'ui'
const initialState: State = {
  theme: getTheme(),
  width: window.innerWidth,
  infix: getInfix(),
  touchable: isTouchable(),
  visibleActionCenter: false,
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

export const setVisibleActionCenter = createAsyncThunk(
  `${NAME}/setVisibleActionCenter`,
  async (visible: boolean) => {
    return { visibleActionCenter: visible }
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
        setVisibleActionCenter.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
