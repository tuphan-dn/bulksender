import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

import PDB from 'shared/pdb'
import configs from 'os/configs'

const {
  register: { senreg, extra },
} = configs

/**
 * Interface & Utility
 */

export type State = {
  register: SenHubRegister
  appIds: AppIds
  farvoriteAppIds: AppIds
}

const troubleshoot = (appIds?: AppIds): AppIds => {
  if (!appIds || !Array.isArray(appIds)) return []
  return appIds.filter((appId) => appId)
}
const fetchRegister = async () => {
  try {
    const re = await fetch(senreg)
    return re.json()
  } catch (er) {
    return {}
  }
}

/**
 * Store constructor
 */

const NAME = 'page'
const initialState: State = {
  register: {},
  appIds: [],
  farvoriteAppIds: [],
}

/**
 * Actions
 */

export const loadPage = createAsyncThunk<Partial<State>, void, { state: any }>(
  `${NAME}/loadPage`,
  async (_, { getState }) => {
    const {
      wallet: { address },
    } = getState()
    if (!account.isAddress(address))
      throw new Error('Wallet is not connected yet')
    // Fetch user's apps
    const db = new PDB(address).createInstance('sentre')
    const appIds = troubleshoot(
      (await db.getItem('appIds')) || initialState.appIds,
    )
    // Fetch register
    const register = await fetchRegister()
    return { appIds, register: { ...register, ...extra } }
  },
)

export const updatePage = createAsyncThunk<
  Partial<State>,
  AppIds,
  { state: any }
>(`${NAME}/updatePage`, async (appIds, { getState }) => {
  const {
    wallet: { address },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  appIds = troubleshoot(appIds)
  const pdb = new PDB(address)
  await pdb.createInstance('sentre').setItem('appIds', appIds)
  return { appIds }
})

export const installApp = createAsyncThunk<
  Partial<State>,
  string,
  { state: any }
>(`${NAME}/installApp`, async (appId, { getState }) => {
  const {
    wallet: { address },
    page: { appIds },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  if (appIds.includes(appId)) return {}
  const newAppIds: AppIds = [...appIds]
  newAppIds.push(appId)
  const pdb = new PDB(address)
  await pdb.createInstance('sentre').setItem('appIds', newAppIds)
  return { appIds: newAppIds }
})

export const uninstallApp = createAsyncThunk<
  Partial<State>,
  string,
  { state: any }
>(`${NAME}/uninstallApp`, async (appId, { getState }) => {
  const {
    wallet: { address },
    page: { appIds },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  if (!appIds.includes(appId)) return {}
  const newAppIds = appIds.filter((_appId: string) => _appId !== appId)
  const pdb = new PDB(address)
  await pdb.createInstance('sentre').setItem('appIds', newAppIds)
  await pdb.dropInstance(appId)
  return { appIds: newAppIds }
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
        loadPage.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        updatePage.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        installApp.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        uninstallApp.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
