import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { SORT_OPTIONS } from '@/store/filter/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import Filters from './Filters'

describe('Filters', () => {
  it('renders search, category, and sort controls', () => {
    renderWithProviders(<Filters />)

    expect(screen.getByLabelText('Search')).toBeInTheDocument()
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
    expect(screen.getByLabelText('Sort')).toBeInTheDocument()
  })

  it('dispatches the search term as the user types', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Filters />)

    await user.type(screen.getByLabelText('Search'), 'lamp')

    expect(store.getState().filter.searchTerm).toBe('lamp')
  })

  it('has no clear button until there is a search term, then clears it on click', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Filters />)

    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Search'), 'lamp')
    await user.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(store.getState().filter.searchTerm).toBe('')
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument()
  })

  it('dispatches the selected category', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Filters />)

    await user.click(screen.getByLabelText('Category'))
    await user.click(screen.getByRole('option', { name: 'Books' }))

    expect(store.getState().filter.category).toBe('books')
  })

  it('dispatches the selected sort option', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Filters />)

    await user.click(screen.getByLabelText('Sort'))
    await user.click(screen.getByRole('option', { name: 'Price: Low to High' }))

    expect(store.getState().filter.sort).toBe(SORT_OPTIONS.PRICE_ASC)
  })
})
