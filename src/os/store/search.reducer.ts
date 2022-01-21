import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

type SearchState = {
  value: string
  loading: boolean
  disabled: boolean
  visible: boolean
  currentAppId: string
}

/**
 * Store constructor
 */

const NAME = 'search'
const initialState: SearchState = {
  value: '',
  loading: false,
  disabled: false,
  visible: true,
  currentAppId: '',
}

/**
 * Actions
 */

export const setValue = createAsyncThunk<
  Partial<SearchState>,
  string,
  { state: any }
>(`${NAME}/setValue`, async (value) => {
  return { value }
})

export const setLoading = createAsyncThunk<
  Partial<SearchState>,
  boolean,
  { state: any }
>(`${NAME}/setLoading`, async (loading) => {
  return { loading }
})

export const setDisabled = createAsyncThunk<
  Partial<SearchState>,
  boolean,
  { state: any }
>(`${NAME}/setDisabled`, async (disabled) => {
  return { disabled }
})

export const openModalInstall = createAsyncThunk(
  `${NAME}/openModalInstall`,
  async () => {
    return { visible: true }
  },
)

export const closeModalInstall = createAsyncThunk(
  `${NAME}/closeModalInstall`,
  async () => {
    return { visible: false }
  },
)

export const setCurrentAppId = createAsyncThunk<
  Partial<SearchState>,
  string,
  { state: any }
>(`${NAME}/setCurrentAppId`, async (currentAppId) => {
  return { currentAppId }
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
      )
      .addCase(
        openModalInstall.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        closeModalInstall.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCurrentAppId.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
