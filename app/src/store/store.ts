import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import userSlice from './user/userSlice'
import authModalSlice from './auth/modal/authModalSlice'
import registerSlice from './auth/register/registerSlice'
import loginSlice from './auth/login/loginSlice'

export const reducer = {
  user: userSlice,
  authModal: authModalSlice,
  register: registerSlice,
  login: loginSlice,
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
