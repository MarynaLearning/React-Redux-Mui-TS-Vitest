import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { IAccount, IAuthState, IUser } from './types'

const initialState: IAuthState = {
  accounts: [],
  user: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<IAccount>) => {
      const { id, email, firstName, lastName } = action.payload

      state.accounts.push(action.payload)
      state.user = { id, email, firstName, lastName }
      state.isLoggedIn = true
    },
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
  },
})

export const { login, signup } = authSlice.actions
export const reducer = authSlice.reducer
