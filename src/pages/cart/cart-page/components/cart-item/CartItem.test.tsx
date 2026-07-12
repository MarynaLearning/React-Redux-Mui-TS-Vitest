import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { IProduct } from '@/data/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import CartItem from './CartItem'

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

const renderCartItem = (quantity: number) =>
  renderWithProviders(<CartItem product={product} quantity={quantity} />, {
    preloadedState: {
      cart: { items: [{ productId: product.id, quantity }] },
    },
  })

describe('CartItem', () => {
  it('renders the title, unit price, and line total', () => {
    renderCartItem(2)

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
    expect(screen.getByText('$179.98')).toBeInTheDocument()
  })

  it('increments the quantity', async () => {
    const user = userEvent.setup()
    const { store } = renderCartItem(2)

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))

    expect(store.getState().cart.items).toEqual([
      { productId: 'p1', quantity: 3 },
    ])
  })

  it('disables decrement at the minimum quantity of one', () => {
    renderCartItem(1)

    expect(
      screen.getByRole('button', { name: 'Decrease quantity' }),
    ).toBeDisabled()
  })

  it('disables increment at the stock limit', () => {
    renderCartItem(24)

    expect(
      screen.getByRole('button', { name: 'Increase quantity' }),
    ).toBeDisabled()
  })

  it('removes the item when the remove button is clicked', async () => {
    const user = userEvent.setup()
    const { store } = renderCartItem(2)

    await user.click(
      screen.getByRole('button', { name: 'Remove Wireless Headphones' }),
    )

    expect(store.getState().cart.items).toEqual([])
  })

  it('allows typing a quantity directly, committed on blur', async () => {
    const user = userEvent.setup()
    const { store } = renderCartItem(2)

    const quantityInput = screen.getByLabelText('Quantity')
    await user.clear(quantityInput)
    await user.type(quantityInput, '5')
    await user.tab()

    expect(store.getState().cart.items).toEqual([
      { productId: 'p1', quantity: 5 },
    ])
  })
})
