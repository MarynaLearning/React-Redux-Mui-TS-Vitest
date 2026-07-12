import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { useNotification } from '@/context/NotificationContext'
import { PRODUCTS } from '@/data/products'
import { addItem } from '@/store/cart/reducer'
import { useAppDispatch } from '@/store/hooks'

export const useProductDetailPageController = () => {
  const { id } = useParams()
  const product = PRODUCTS.find((candidate) => candidate.id === id)
  const dispatch = useAppDispatch()
  const { notify } = useNotification()
  const [quantity, setQuantity] = useState<number>(1)
  const [quantityText, setQuantityText] = useState<string>('1')

  // Resets the quantity picker whenever the route's :id changes — React
  // Router reuses this component instance across param-only navigations,
  // so without this the previous product's quantity (and its stock bound)
  // would carry over to the new product. The reset runs in the cleanup,
  // which React fires for the outgoing id before committing the new one.
  useEffect(() => {
    return () => {
      setQuantity(1)
      setQuantityText('1')
    }
  }, [id])

  const commitQuantity = (value: number) => {
    if (!product) return
    const clamped = Math.min(Math.max(value, 1), product.stock)
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
    if (!product) return

    setQuantity(Math.min(Math.max(Number(raw), 1), product.stock))
  }

  const onQuantityInputBlur = () => {
    commitQuantity(quantity)
  }

  const onAddToCart = () => {
    if (!product) return
    dispatch(addItem({ productId: product.id, quantity }))
    notify(`${product.title} added to cart`, 'success')
    commitQuantity(1)
  }

  return {
    product,
    quantity,
    quantityText,
    onIncrement,
    onDecrement,
    onQuantityInputChange,
    onQuantityInputBlur,
    onAddToCart,
  }
}
