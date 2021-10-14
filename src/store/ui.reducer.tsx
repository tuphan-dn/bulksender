import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'

import { isTouchable } from 'helpers/util'

/**
 * Interface & Utility
 */

export type Infix = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type Notification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}

export type State = {
  width: number
  infix: Infix
  touchable: boolean
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
}

/**
 * Actions
 */

export const resize = createAsyncThunk(`${NAME}/resize`, async () => {
  const width = window.innerWidth
  const infix = getInfix()
  return { width, infix }
})

export const notify = createAsyncThunk(
  `${NAME}/notify`,
  async ({ type, description, onClick }: Notification) => {
    if (!type) throw new Error('Notification type is not provided')
    if (!description) throw new Error('Description is not provided')
    // Parse icon
    let icon = (
      <ion-icon name="information-circle" style={{ color: '#37CDFA' }} />
    )
    if (type === 'error')
      icon = <ion-icon name="alert-circle" style={{ color: '#F2323F' }} />
    if (type === 'warning')
      icon = <ion-icon name="warning" style={{ color: '#FCB017' }} />
    if (type === 'success')
      icon = <ion-icon name="checkmark-circle" style={{ color: '#3DBA4E' }} />
    notification[type]({
      message: type.toUpperCase(),
      description,
      onClick,
      closeIcon: <ion-icon name="close-outline" />,
      icon,
      style: { cursor: 'pointer' },
    })
    return {}
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
        notify.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
