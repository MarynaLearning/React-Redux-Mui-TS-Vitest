import { useState } from 'react'
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
  const [prevId, setPrevId] = useState(id)

  if (id !== prevId) {
    setPrevId(id)
    setQuantity(1)
  }

  const onIncrement = () => {
    if (!product) return
    setQuantity((current) => Math.min(current + 1, product.stock))
  }

  const onDecrement = () => {
    setQuantity((current) => Math.max(current - 1, 1))
  }

  const onAddToCart = () => {
    if (!product) return
    dispatch(addItem({ productId: product.id, quantity }))
    notify(`${product.title} added to cart`, 'success')
    setQuantity(1)
  }

  return { product, quantity, onIncrement, onDecrement, onAddToCart }
}
