import type { TRootState } from '@/store/index'

export const cartItemsSelector = (state: TRootState) => state.cart.items
