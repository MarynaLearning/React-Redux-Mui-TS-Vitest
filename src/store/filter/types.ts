import type { TCategory } from '@/data/types'

import type { SORT_OPTIONS } from './constants'

export type TSortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

export interface IFilterState {
  searchTerm: string
  category: TCategory | 'all'
  sort: TSortOption
}
