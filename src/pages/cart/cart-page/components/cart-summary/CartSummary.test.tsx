import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/renderWithProviders'

import CartSummary from './CartSummary'

describe('CartSummary', () => {
  it('renders nothing when the cart is empty', () => {
    const { container } = renderWithProviders(<CartSummary />, {
      preloadedState: { cart: { items: [] } },
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('shows the item count and total price', () => {
    renderWithProviders(<CartSummary />, {
      preloadedState: {
        cart: {
          items: [
            { productId: 'p1', quantity: 2 },
            { productId: 'p2', quantity: 1 },
          ],
        },
      },
    })

    expect(screen.getByText('3 items')).toBeInTheDocument()
    expect(screen.getByText('Total: $329.97')).toBeInTheDocument()
  })

  it('clears the cart when Clear Cart is clicked', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<CartSummary />, {
      preloadedState: {
        cart: { items: [{ productId: 'p1', quantity: 1 }] },
      },
    })

    await user.click(screen.getByRole('button', { name: 'Clear Cart' }))

    expect(store.getState().cart.items).toEqual([])
  })
})
