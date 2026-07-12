import { cartItemsWithProductsSelector } from '@/store/cart/selectors'
import { useAppSelector } from '@/store/hooks'

export const useCartItemListController = () => {
  const lineItems = useAppSelector(cartItemsWithProductsSelector)

  return { lineItems }
}
