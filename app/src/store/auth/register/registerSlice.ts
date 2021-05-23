import { RegisterFormType, RegisterStateType } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store'
import { registerQuery } from './queries'
import { assign } from '../../user/userSlice'
import { hide } from '../modal/authModalSlice'
import { captchaToken } from '../../../services/captcha'

const initialState: RegisterStateType = {
  loader: false,
  error: null,
}

export const registerSlice = createSlice({
  name: 'register',
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

export const { startFetching, stopFetching, setError } = registerSlice.actions

export const registerUserAsync = (form: RegisterFormType): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching())
    const captcha = await captchaToken('register')
    const { user, accessToken, errorMessage } = await registerQuery({
      ...form,
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

export default registerSlice.reducer
