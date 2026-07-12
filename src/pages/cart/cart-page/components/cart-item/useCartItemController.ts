import { useState } from 'react'
import type { ChangeEvent } from 'react'

import { removeItem, setQuantity } from '@/store/cart/reducer'
import { useAppDispatch } from '@/store/hooks'

import type { ICartItemProps } from './types'

export const useCartItemController = ({
  product,
  quantity,
}: ICartItemProps) => {
  const dispatch = useAppDispatch()
  const [quantityText, setQuantityText] = useState<string>(String(quantity))

  const commitQuantity = (value: number) => {
    const clamped = Math.min(Math.max(value, 1), product.stock)
    dispatch(setQuantity({ productId: product.id, quantity: clamped }))
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
  }

  const onQuantityInputBlur = () => {
    commitQuantity(quantityText === '' ? quantity : Number(quantityText))
  }

  const onRemove = () => {
    dispatch(removeItem({ productId: product.id }))
  }

  return {
    quantityText,
    onIncrement,
    onDecrement,
    onQuantityInputChange,
    onQuantityInputBlur,
    onRemove,
  }
}
