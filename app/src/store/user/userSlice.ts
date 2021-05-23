import { UserAssignType, UserStateType, UserType } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import Cookies from 'js-cookie'

const storageTokenName: string = process.env.REACT_APP_STORAGE_TOKEN_NAME ?? 'user-token'

const initialState: UserStateType = {
  user: null,
}

const removeToken = () => {
  const token = Cookies.get(storageTokenName)
  if (token) {
    Cookies.remove(storageTokenName, {
      secure: process.env.NODE_ENV === 'production',
    })
  }
}

const createToken = (token: string) => {
  Cookies.set(storageTokenName, token, {
    expires: 2,
    secure: process.env.NODE_ENV === 'production',
  })
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assign: (state, { payload }: PayloadAction<UserAssignType>) => {
      state.user = payload.user
      removeToken()
      createToken(payload.accessToken)
    },
    assignWithoutToken: (state, { payload }: PayloadAction<UserType>) => {
      state.user = payload
    },
    logout: (state) => {
      state.user = null
      removeToken()
    },
  },
})

export const { assign, assignWithoutToken, logout } = userSlice.actions

export const autoFetchUser = (): AppThunk => async (dispatch) => {
  const token = Cookies.get(storageTokenName)
  if (token) {
    try {
      // dispatch() LOADING
      // const user: UserType = await (Promise.resolve({ username: 'Test user auto', id: '1' }))
      // dispatch(assignWithoutToken(user))
    } catch (e) {
      // dispatch()
    } finally {
      // dispatch()
    }
  }
}

export default userSlice.reducer
