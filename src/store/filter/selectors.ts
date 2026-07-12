import { createSelector } from '@reduxjs/toolkit'

import { PRODUCTS } from '@/data/products'
import type { TRootState } from '@/store/index'

import { SORT_OPTIONS } from './constants'

export const searchTermSelector = (state: TRootState) => state.filter.searchTerm

export const categorySelector = (state: TRootState) => state.filter.category

export const sortSelector = (state: TRootState) => state.filter.sort

export const filteredProductsSelector = createSelector(
  [searchTermSelector, categorySelector, sortSelector],
  (searchTerm, category, sort) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()

    const filtered = PRODUCTS.filter((product) => {
      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(normalizedSearchTerm)
      const matchesCategory =
        category === 'all' || product.category === category

      return matchesSearchTerm && matchesCategory
    })

    switch (sort) {
      case SORT_OPTIONS.PRICE_ASC:
        return [...filtered].sort((a, b) => a.price - b.price)
      case SORT_OPTIONS.PRICE_DESC:
        return [...filtered].sort((a, b) => b.price - a.price)
      case SORT_OPTIONS.RATING_DESC:
        return [...filtered].sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  },
)
