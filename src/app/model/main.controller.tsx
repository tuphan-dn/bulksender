import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */
export type TransferData = Array<[string, string]>
export type State = {
  mintAddress: string
  data: TransferData /* address, amount */
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: State = {
  mintAddress: '',
  data: [],
}

/**
 * Actions
 */

export const setData = createAsyncThunk(
  `${NAME}/setData`,
  async (data: TransferData) => {
    return { data }
  },
)

export const setMintAddress = createAsyncThunk(
  `${NAME}/setMintAddress`,
  async (mintAddress: string) => {
    return { mintAddress }
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
        setData.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setMintAddress.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
