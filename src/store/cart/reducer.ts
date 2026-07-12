import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { ICartItem, ICartState } from './types'

const initialState: ICartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const { productId, quantity } = action.payload
      const existingItem = state.items.find(
        (item) => item.productId === productId,
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ productId, quantity })
      }
    },
  },
})

export const { addItem } = cartSlice.actions
export const reducer = cartSlice.reducer
