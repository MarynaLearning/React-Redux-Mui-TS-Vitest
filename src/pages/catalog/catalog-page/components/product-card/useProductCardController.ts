import { useNotification } from '@/context/NotificationContext'
import { addItem } from '@/store/cart/reducer'
import { cartItemsSelector } from '@/store/cart/selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import type { IProductCardProps } from './types'

export const useProductCardController = ({ product }: IProductCardProps) => {
  const dispatch = useAppDispatch()
  const { notify } = useNotification()
  const cartItems = useAppSelector(cartItemsSelector)

  const cartQuantity =
    cartItems.find((item) => item.productId === product.id)?.quantity ?? 0
  const isAddToCartDisabled =
    product.stock === 0 || cartQuantity >= product.stock

  const onAddToCart = () => {
    dispatch(addItem({ productId: product.id, quantity: 1 }))
    notify(`${product.title} added to cart`, 'success')
  }

  return { onAddToCart, isAddToCartDisabled }
}
