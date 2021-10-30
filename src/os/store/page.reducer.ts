import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

import PDB from 'shared/pdb'

/**
 * Interface & Utility
 */

export type State = {
  appPage: AppPage
  farvoriteAppIds: AppIds
}

const troubleshoot = (appPage?: AppPage): AppPage => {
  if (!appPage || !Array.isArray(appPage)) return [[]]
  if (!appPage.length) return [[]]
  return appPage.map((row) => row.filter((appId) => appId))
}

/**
 * Store constructor
 */

const NAME = 'page'
const initialState: State = {
  appPage: [[]],
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
    const db = new PDB(address).createInstance('sentre')
    const appPage = troubleshoot(
      (await db.getItem('appPage')) || initialState.appPage,
    )
    return { appPage }
  },
)

export const updatePage = createAsyncThunk<
  Partial<State>,
  AppPage,
  { state: any }
>(`${NAME}/updatePage`, async (appPage, { getState }) => {
  const {
    wallet: { address },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  appPage = troubleshoot(appPage)
  const pdb = new PDB(address)
  await pdb.createInstance('sentre').setItem('appPage', appPage)
  return { appPage }
})

export const installApp = createAsyncThunk<
  Partial<State>,
  string,
  { state: any }
>(`${NAME}/installApp`, async (appId, { getState }) => {
  const {
    wallet: { address },
    page: { appPage },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  if (appPage.flat().includes(appId)) return {}
  const newAppPage: AppPage = appPage.map((page: string[]) => [...page])
  newAppPage[newAppPage.length - 1].push(appId)
  const pdb = new PDB(address)
  await pdb.createInstance('sentre').setItem('appPage', newAppPage)
  return { appPage: newAppPage }
})

export const uninstallApp = createAsyncThunk<
  Partial<State>,
  string,
  { state: any }
>(`${NAME}/uninstallApp`, async (appId, { getState }) => {
  const {
    wallet: { address },
    page: { appPage },
  } = getState()
  if (!account.isAddress(address))
    throw new Error('Wallet is not connected yet')
  if (!appPage.flat().includes(appId)) return {}
  const newAppPage = appPage.map((page: string[]) =>
    page.filter((_appId) => _appId !== appId),
  )
  const pdb = new PDB(address)
  await pdb.createInstance('sentre').setItem('appPage', newAppPage)
  await pdb.dropInstance(appId)
  return { appPage: newAppPage }
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
