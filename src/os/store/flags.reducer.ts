import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

import PDB from 'shared/pdb'

/**
 * Interface & Utility
 */

type FlagsState = {
  visited: boolean
  referred: boolean
}

/**
 * Store constructor
 */

const NAME = 'flags'
const initialState: FlagsState = {
  visited: true,
  referred: false,
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
    wallet: { address: walletAddress },
  } = getState()
  if (!account.isAddress(walletAddress))
    throw new Error('Wallet is not connected yet')
  const db = new PDB(walletAddress).createInstance('sentre')
  const visited: boolean = (await db.getItem('visited')) || false
  return { visited }
})

export const updateVisited = createAsyncThunk<
  Partial<FlagsState>,
  boolean,
  { state: any }
>(`${NAME}/updateVisited`, async (visited, { getState }) => {
  const {
    wallet: { address },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  const db = new PDB(address).createInstance('sentre')
  await db.setItem('visited', visited)
  return { visited }
})

export const loadReferred = createAsyncThunk<
  Partial<FlagsState>,
  void,
  { state: any }
>(`${NAME}/loadReferred`, async (_, { getState }) => {
  const {
    wallet: { address: walletAddress },
  } = getState()
  if (!account.isAddress(walletAddress))
    throw new Error('Wallet is not connected yet')
  const db = new PDB(walletAddress).createInstance('sentre')
  const referred: boolean = (await db.getItem('referred')) || false
  return { referred }
})

export const updateReferred = createAsyncThunk<
  Partial<FlagsState>,
  boolean,
  { state: any }
>(`${NAME}/updateReferred`, async (referred, { getState }) => {
  const {
    wallet: { address },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  const db = new PDB(address).createInstance('sentre')
  await db.setItem('referred', referred)
  return { referred }
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
      )
      .addCase(
        loadReferred.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        updateReferred.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
