import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

import PDB from 'shared/pdb'

/**
 * Interface & Utility
 */

type FlagsState = {
  visited: boolean
}

/**
 * Store constructor
 */

const NAME = 'flags'
const initialState: FlagsState = {
  visited: true,
}

/**
 * Actions
 */

export const loadVisited = createAsyncThunk<
  Partial<FlagsState>,
  void,
  { state: any }
>(`${NAME}/loadVisited`, async (_, { getState }) => {
  const {
    wallet: { address },
    flags: prevFlags,
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  const db = new PDB(address).createInstance('sentre')
  const visited = (await db.getItem('visited')) || false
  return { ...prevFlags, visited }
})

export const updateVisited = createAsyncThunk<
  Partial<FlagsState>,
  boolean,
  { state: any }
>(`${NAME}/updateVisited`, async (visited, { getState }) => {
  const {
    wallet: { address },
    flags: prevFlags,
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  const db = new PDB(address).createInstance('sentre')
  await db.setItem('visited', visited)
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
    void builder
      .addCase(
        loadVisited.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        updateVisited.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
