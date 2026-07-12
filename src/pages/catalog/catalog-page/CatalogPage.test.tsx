import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/renderWithProviders'

import CatalogPage from './CatalogPage'

describe('CatalogPage', () => {
  it('renders the page heading, filters, and product grid', () => {
    renderWithProviders(<CatalogPage />)

    expect(screen.getByRole('heading', { name: 'Catalog' })).toBeInTheDocument()
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
  })
})
