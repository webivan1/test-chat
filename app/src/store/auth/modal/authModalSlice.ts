import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthModalForms, AuthModalStateType } from './types'

const initialState: AuthModalStateType = {
  show: false,
  currentForm: AuthModalForms.login,
}

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    show: (state) => {
      state.show = true
    },
    hide: (state) => {
      state.show = false
    },
    setForm: (state, action: PayloadAction<AuthModalForms>) => {
      state.currentForm = action.payload
    },
  },
})

export const { show, hide, setForm } = authModalSlice.actions

export default authModalSlice.reducer
