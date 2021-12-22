import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

type State = {
  run: boolean
  stepIndex: number
}

/**
 * Store constructor
 */

const NAME = 'walkthrogh'
const initialState: State = {
  run: false,
  stepIndex: 0,
}

/**
 * Actions
 */

export const setWalkthroughState = createAsyncThunk<
  Partial<State>,
  Partial<State>,
  { state: any }
>(`${NAME}/setWalkthroughState`, async ({ ...rest }, { getState }) => {
  return { ...rest }
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
      setWalkthroughState.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
