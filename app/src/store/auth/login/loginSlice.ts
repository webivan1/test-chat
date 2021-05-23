import { LoginFormType, LoginStateType } from './types'
import { assign } from '../../user/userSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store'
import { captchaToken } from '../../../services/captcha'
import { loginQuery } from './queries'
import { hide } from '../modal/authModalSlice'

const initialState: LoginStateType = {
  loader: false,
  error: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    startFetching: (state) => {
      state.error = null
      state.loader = true
    },
    stopFetching: (state) => {
      state.loader = false
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { startFetching, stopFetching, setError } = loginSlice.actions

export const fetchUserByCredentials = (credentials: LoginFormType): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startFetching())
    const captcha = await captchaToken('login')
    const { user, accessToken, errorMessage } = await loginQuery({
      ...credentials,
      captcha,
    })
    if (errorMessage) {
      dispatch(setError(errorMessage))
    } else if (user && accessToken) {
      dispatch(assign({ user, accessToken }))
      dispatch(hide())
    } else {
      dispatch(setError('Unknown error'))
    }
  } catch (e) {
    dispatch(setError(e.message))
  } finally {
    dispatch(stopFetching())
  }
}

export default loginSlice.reducer
