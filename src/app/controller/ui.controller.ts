import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type State = {
  width: number
}

const NAME = process.env.REACT_APP_ID || ''
const initialState: State = {
  width: window.innerWidth,
}

/**
 * Actions
 */

export const setWidth = createAsyncThunk(`${NAME}/setWidth`, async () => {
  const width = window.innerWidth
  return { width }
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
      setWidth.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
