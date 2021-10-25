import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

/**
 * Interface & Utility
 */

export type WorkingMode = undefined | 'focus' | 'professional'

type State = {
  mode: WorkingMode
  visited: boolean
}

/**
 * Store constructor
 */

const NAME = 'flags'
const initialState: State = {
  mode: undefined,
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

export const setMode = createAsyncThunk<
  Partial<State>,
  WorkingMode,
  { state: any }
>(`${NAME}/setMode`, async (mode, { getState }) => {
  const {
    wallet: { address },
    flags: prevFlags,
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  return { ...prevFlags, mode }
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
        setVisited.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setMode.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
