import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getMaxCartQuantity } from './helpers'
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
      const maxQuantity = getMaxCartQuantity(productId)
      const existingItem = state.items.find(
        (item) => item.productId === productId,
      )

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          maxQuantity,
        )
      } else {
        state.items.push({
          productId,
          quantity: Math.min(quantity, maxQuantity),
        })
      }
    },
    setQuantity: (state, action: PayloadAction<ICartItem>) => {
      const { productId, quantity } = action.payload
      const existingItem = state.items.find(
        (item) => item.productId === productId,
      )

      if (existingItem) {
        existingItem.quantity = Math.min(
          quantity,
          getMaxCartQuantity(productId),
        )
      }
    },
    removeItem: (
      state,
      action: PayloadAction<Pick<ICartItem, 'productId'>>,
    ) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId,
      )
    },
    clear: (state) => {
      state.items = []
    },
  },
})

export const { addItem, setQuantity, removeItem, clear } = cartSlice.actions
export const reducer = cartSlice.reducer
