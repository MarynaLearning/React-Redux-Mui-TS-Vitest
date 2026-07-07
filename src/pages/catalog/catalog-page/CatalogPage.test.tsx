import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CatalogPage from './CatalogPage'

describe('CatalogPage', () => {
  it('renders the page heading', () => {
    render(<CatalogPage />)
    expect(screen.getByRole('heading', { name: 'Catalog' })).toBeInTheDocument()
  })
})
