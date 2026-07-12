import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import CartPage from './CartPage'

describe('CartPage', () => {
  it('renders the page heading and a Continue Shopping link back to the catalog', () => {
    renderWithProviders(<CartPage />, {
      preloadedState: { cart: { items: [] } },
    })

    expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Continue Shopping' }),
    ).toHaveAttribute('href', ROUTES.HOME)
  })

  it('composes the item list and summary from cart state', () => {
    renderWithProviders(<CartPage />, {
      preloadedState: {
        cart: { items: [{ productId: 'p1', quantity: 2 }] },
      },
    })

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Total: $179.98')).toBeInTheDocument()
  })
})
