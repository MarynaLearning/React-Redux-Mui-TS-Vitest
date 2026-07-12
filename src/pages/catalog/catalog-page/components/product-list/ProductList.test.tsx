import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SORT_OPTIONS } from '@/store/filter/constants'
import type { IFilterState } from '@/store/filter/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import ProductList from './ProductList'

const renderProductList = (filter: IFilterState) =>
  renderWithProviders(<ProductList />, { preloadedState: { filter } })

describe('ProductList', () => {
  it('renders every product matching the filter state', () => {
    renderProductList({
      searchTerm: '',
      category: 'electronics',
      sort: SORT_OPTIONS.DEFAULT,
    })

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Smartwatch')).toBeInTheDocument()
    expect(screen.queryByText('Atomic Habits')).not.toBeInTheDocument()
  })

  it('shows an empty state when no products match', () => {
    renderProductList({
      searchTerm: 'no-such-product',
      category: 'all',
      sort: SORT_OPTIONS.DEFAULT,
    })

    expect(
      screen.getByText('No products match your filters.'),
    ).toBeInTheDocument()
  })
})
