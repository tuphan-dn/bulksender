import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

type State = {
  value: string
  loading: boolean
  disabled: boolean
}

/**
 * Store constructor
 */

const NAME = 'search'
const initialState: State = {
  value: '',
  loading: false,
  disabled: false,
}

/**
 * Actions
 */

export const setValue = createAsyncThunk<
  Partial<State>,
  string,
  { state: any }
>(`${NAME}/setValue`, async (value) => {
  return { value }
})

export const setLoading = createAsyncThunk<
  Partial<State>,
  boolean,
  { state: any }
>(`${NAME}/setLoading`, async (loading) => {
  return { loading }
})

export const setDisabled = createAsyncThunk<
  Partial<State>,
  boolean,
  { state: any }
>(`${NAME}/setDisabled`, async (disabled) => {
  return { disabled }
})

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
        setValue.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setLoading.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setDisabled.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
