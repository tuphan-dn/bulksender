import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */
export type TransferData = Array<[string, string]>
export enum Status {
  None,
  Estimating,
  Estimated,
  Sending,
  Done,
}
export type State = {
  mintAddress: string
  data: TransferData /* address, amount */
  decimalized: boolean
  status: Status
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: State = {
  mintAddress: '',
  data: [],
  decimalized: false,
  status: Status.None,
}

/**
 * Actions
 */

export const setData = createAsyncThunk(
  `${NAME}/setData`,
  async (data: TransferData) => {
    return { data, status: Status.None }
  },
)

export const setMintAddress = createAsyncThunk(
  `${NAME}/setMintAddress`,
  async (mintAddress: string) => {
    return { mintAddress, status: Status.None }
  },
)

export const setDecimalized = createAsyncThunk(
  `${NAME}/setDecimalized`,
  async (decimalized: boolean) => {
    return { decimalized, status: Status.None }
  },
)

export const setStatus = createAsyncThunk(
  `${NAME}/setStatus`,
  async (status: Status) => {
    return { status }
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
      )
      .addCase(
        setDecimalized.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setStatus.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
