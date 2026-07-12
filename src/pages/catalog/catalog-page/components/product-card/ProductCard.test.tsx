import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { IProduct } from '@/data/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import ProductCard from './ProductCard'

const product: IProduct = {
  id: 'p1',
  title: 'Wireless Headphones',
  description: 'Over-ear headphones with active noise cancellation.',
  price: 89.99,
  category: 'electronics',
  imageUrl: 'https://picsum.photos/seed/p1/400/300',
  stock: 24,
  rating: 4.5,
}

describe('ProductCard', () => {
  it('renders the product title, category, price, and rating', () => {
    renderWithProviders(<ProductCard product={product} />)

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
    expect(screen.getByText('★ 4.5')).toBeInTheDocument()
  })

  it('links to the product detail route', () => {
    renderWithProviders(<ProductCard product={product} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/p1')
  })
})
