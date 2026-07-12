import type { IProduct } from '@/data/types'

export interface ICartItem {
  productId: string
  quantity: number
}

export interface ICartState {
  items: ICartItem[]
}

export interface ICartLineItem {
  product: IProduct
  quantity: number
}
