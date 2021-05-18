import { configureStore } from '@reduxjs/toolkit'

import authModalSlice from './auth/modal/authModalSlice'

export const reducer = {
  authModal: authModalSlice,
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
