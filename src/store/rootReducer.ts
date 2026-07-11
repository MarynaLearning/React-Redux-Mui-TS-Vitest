import { combineReducers } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth/reducer'

// further reducers are added here as each PR introduces them
export const rootReducer = combineReducers({
  auth: authReducer,
})
