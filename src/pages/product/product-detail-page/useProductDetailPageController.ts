import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { useNotification } from '@/context/NotificationContext'
import { PRODUCTS } from '@/data/products'
import { addItem } from '@/store/cart/reducer'
import { cartItemsSelector } from '@/store/cart/selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export const useProductDetailPageController = () => {
  const { id } = useParams()
  const product = PRODUCTS.find((candidate) => candidate.id === id)
  const dispatch = useAppDispatch()
  const { notify } = useNotification()
  const cartItems = useAppSelector(cartItemsSelector)
  const [quantity, setQuantity] = useState<number>(1)
  const [quantityText, setQuantityText] = useState<string>('1')

  const cartQuantity =
    cartItems.find((item) => item.productId === product?.id)?.quantity ?? 0
  const maxAddable = product ? Math.max(product.stock - cartQuantity, 0) : 0

  useEffect(() => {
    return () => {
      setQuantity(1)
      setQuantityText('1')
    }
  }, [id])

  const commitQuantity = (value: number) => {
    const clamped = Math.min(Math.max(value, 1), Math.max(maxAddable, 1))
    setQuantity(clamped)
    setQuantityText(String(clamped))
  }

  const onIncrement = () => {
    commitQuantity(quantity + 1)
  }

  const onDecrement = () => {
    commitQuantity(quantity - 1)
  }

  const onQuantityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    if (raw !== '' && !/^\d+$/.test(raw)) return

    setQuantityText(raw)

    if (raw === '') return

    setQuantity(Math.min(Math.max(Number(raw), 1), Math.max(maxAddable, 1)))
  }

  const onQuantityInputBlur = () => {
    commitQuantity(quantity)
  }

  const onAddToCart = () => {
    if (!product || maxAddable <= 0) return
    dispatch(
      addItem({
        productId: product.id,
        quantity: Math.min(quantity, maxAddable),
      }),
    )
    notify(`${product.title} added to cart`, 'success')
    commitQuantity(1)
  }

  return {
    product,
    quantity,
    quantityText,
    maxAddable,
    onIncrement,
    onDecrement,
    onQuantityInputChange,
    onQuantityInputBlur,
    onAddToCart,
  }
}
