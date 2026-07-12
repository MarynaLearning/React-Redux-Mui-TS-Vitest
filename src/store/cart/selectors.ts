import { createSelector } from '@reduxjs/toolkit'

import { PRODUCTS } from '@/data/products'
import type { TRootState } from '@/store/index'

import type { ICartLineItem } from './types'

export const cartItemsSelector = (state: TRootState) => state.cart.items

export const cartItemsWithProductsSelector = createSelector(
  [cartItemsSelector],
  (items): ICartLineItem[] =>
    items.reduce<ICartLineItem[]>((lineItems, item) => {
      const product = PRODUCTS.find(
        (candidate) => candidate.id === item.productId,
      )

      if (product) {
        lineItems.push({ product, quantity: item.quantity })
      }

      return lineItems
    }, []),
)

export const cartTotalCountSelector = createSelector(
  [cartItemsSelector],
  (items) => items.reduce((total, item) => total + item.quantity, 0),
)

export const cartTotalPriceSelector = createSelector(
  [cartItemsWithProductsSelector],
  (lineItems) =>
    lineItems.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0,
    ),
)
