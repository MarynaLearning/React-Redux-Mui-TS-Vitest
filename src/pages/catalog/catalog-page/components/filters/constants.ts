import { CATEGORIES } from '@/data/constants'
import type { TCategory } from '@/data/types'
import { SORT_OPTIONS } from '@/store/filter/constants'
import type { TSortOption } from '@/store/filter/types'

export const SORT_SELECT_OPTIONS: { value: TSortOption; label: string }[] = [
  { value: SORT_OPTIONS.DEFAULT, label: 'Featured' },
  { value: SORT_OPTIONS.PRICE_ASC, label: 'Price: Low to High' },
  { value: SORT_OPTIONS.PRICE_DESC, label: 'Price: High to Low' },
  { value: SORT_OPTIONS.RATING_DESC, label: 'Rating: High to Low' },
]

export const CATEGORY_OPTIONS: { value: TCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  ...CATEGORIES.map((category) => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  })),
]
