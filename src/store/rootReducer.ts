import { combineReducers } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth/reducer'
import { reducer as cartReducer } from './cart/reducer'
import { reducer as filterReducer } from './filter/reducer'

// further reducers are added here as each PR introduces them
export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  filter: filterReducer,
})
