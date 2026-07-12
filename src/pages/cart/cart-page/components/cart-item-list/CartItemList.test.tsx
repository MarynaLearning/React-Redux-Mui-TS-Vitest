import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/renderWithProviders'

import CartItemList from './CartItemList'

describe('CartItemList', () => {
  it('shows an empty-cart message when there are no items', () => {
    renderWithProviders(<CartItemList />, {
      preloadedState: { cart: { items: [] } },
    })

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('renders a CartItem for each cart entry', () => {
    renderWithProviders(<CartItemList />, {
      preloadedState: {
        cart: {
          items: [
            { productId: 'p1', quantity: 2 },
            { productId: 'p2', quantity: 1 },
          ],
        },
      },
    })

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Smartwatch')).toBeInTheDocument()
  })
})
