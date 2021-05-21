import { LoginFormType, LoginResponseType, LoginStateType } from "./types";
import { assign } from '../../user/userSlice'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";

const initialState: LoginStateType = {
  loader: false,
  error: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    startFetching: state => {
      state.error = null
      state.loader = true
    },
    stopFetching: state => {
      state.loader = false
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})

export const { startFetching, stopFetching, setError } = loginSlice.actions

const fetchTokenHttp = new Promise<LoginResponseType>((resolve) => {
  setTimeout(() => resolve({
    token: 'test-token-for-user',
    user: {
      id: '1',
      username: 'Test user'
    }
  }), 3500)
})

export const fetchUserByCredentials = (credentials: LoginFormType): AppThunk => async dispatch => {
  try {
    dispatch(startFetching())
    const user = await fetchTokenHttp
    dispatch(assign(user))
  } catch (e) {
    dispatch(setError(e.message))
  } finally {
    dispatch(stopFetching())
  }
}

export default loginSlice.reducer

