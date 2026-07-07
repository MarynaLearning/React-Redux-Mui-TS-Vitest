import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ProductDetailPage from './ProductDetailPage'

describe('ProductDetailPage', () => {
  it('renders the page heading', () => {
    render(<ProductDetailPage />)
    expect(screen.getByRole('heading', { name: 'Product' })).toBeInTheDocument()
  })
})
