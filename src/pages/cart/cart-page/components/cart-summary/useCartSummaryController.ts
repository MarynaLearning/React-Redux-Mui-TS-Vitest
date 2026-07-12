import { clear } from '@/store/cart/reducer'
import {
  cartTotalCountSelector,
  cartTotalPriceSelector,
} from '@/store/cart/selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export const useCartSummaryController = () => {
  const dispatch = useAppDispatch()
  const totalCount = useAppSelector(cartTotalCountSelector)
  const totalPrice = useAppSelector(cartTotalPriceSelector)

  const onClearCart = () => {
    dispatch(clear())
  }

  return { totalCount, totalPrice, onClearCart }
}
