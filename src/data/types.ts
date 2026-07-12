import type { CATEGORIES } from './constants'

export type TCategory = (typeof CATEGORIES)[number]

export interface IProduct {
  id: string
  title: string
  description: string
  price: number
  category: TCategory
  imageUrl: string
  stock: number
  rating: number
}
