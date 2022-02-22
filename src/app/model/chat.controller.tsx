import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type Message = {
  text: string
  createdAt: string
  owner: string
}

export type Messages = { messages: Message[] }

/**
 * Store constructor
 */

const NAME = 'chat'
const initialState: Messages = {
  messages: [],
}

/**
 * Actions
 */

export const fetchNewMessages = createAsyncThunk<
  Messages,
  { message: Message },
  { state: any }
>(`${NAME}/fetchNewMessages`, async ({ message }, { getState }) => {
  const {
    chat: { messages },
  } = getState()
  const newMessages: Message[] = [...messages]
  newMessages.push(message)
  return { messages: newMessages }
})

export const clearMessages = createAsyncThunk<Messages>(
  `${NAME}/clearMessages`,
  async () => {
    return { messages: [] }
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
        fetchNewMessages.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        clearMessages.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
