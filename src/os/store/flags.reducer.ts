import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

/**
 * Interface & Utility
 */

type State = {
  visited: boolean
}

/**
 * Store constructor
 */

const NAME = 'flags'
const initialState: State = {
  visited: true,
}

/**
 * Actions
 */

export const setVisited = createAsyncThunk<
  Partial<State>,
  boolean,
  { state: any }
>(`${NAME}/setVisited`, async (visited, { getState }) => {
  const {
    wallet: { address },
    flags: prevFlags,
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  return { ...prevFlags, visited }
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
      setVisited.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
