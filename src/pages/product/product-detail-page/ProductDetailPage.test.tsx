import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import type { ICartItem } from '@/store/cart/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import ProductDetailPage from './ProductDetailPage'

const renderProductDetailPage = (route: string, cartItems: ICartItem[] = []) =>
  renderWithProviders(
    <Routes>
      <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
    </Routes>,
    { route, preloadedState: { cart: { items: cartItems } } },
  )

describe('ProductDetailPage', () => {
  it('renders the product title, price, and stock for a valid id', () => {
    renderProductDetailPage('/product/p1')

    expect(
      screen.getByRole('heading', { name: 'Wireless Headphones' }),
    ).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
    expect(screen.getByText('24 in stock')).toBeInTheDocument()
  })

  it('shows a not-found message for an invalid id', () => {
    renderProductDetailPage('/product/does-not-exist')

    expect(
      screen.getByRole('heading', { name: 'Product not found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Continue Shopping' }),
    ).toBeInTheDocument()
  })

  it('disables the decrement control at the minimum quantity of one', () => {
    renderProductDetailPage('/product/p1')

    expect(
      screen.getByRole('button', { name: 'Decrease quantity' }),
    ).toBeDisabled()
  })

  it('adds the selected quantity to the cart and shows a confirmation', async () => {
    const user = userEvent.setup()
    const { store } = renderProductDetailPage('/product/p1')

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))

    expect(store.getState().cart.items).toEqual([
      { productId: 'p1', quantity: 2 },
    ])
    expect(
      await screen.findByText('Wireless Headphones added to cart'),
    ).toBeInTheDocument()
  })

  it('allows typing a quantity directly', async () => {
    const user = userEvent.setup()
    const { store } = renderProductDetailPage('/product/p1')

    const quantityInput = screen.getByLabelText('Quantity')
    await user.clear(quantityInput)
    await user.type(quantityInput, '5')
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))

    expect(store.getState().cart.items).toEqual([
      { productId: 'p1', quantity: 5 },
    ])
  })

  it('clamps a typed quantity above stock down to the available stock', async () => {
    const user = userEvent.setup()
    renderProductDetailPage('/product/p1')

    const quantityInput = screen.getByLabelText('Quantity')
    await user.clear(quantityInput)
    await user.type(quantityInput, '999')
    await user.tab()

    expect(quantityInput).toHaveValue('24')
  })

  it('ignores non-numeric characters typed into the quantity field', async () => {
    const user = userEvent.setup()
    renderProductDetailPage('/product/p1')

    const quantityInput = screen.getByLabelText('Quantity')
    await user.clear(quantityInput)
    await user.type(quantityInput, 'abc5')

    expect(quantityInput).toHaveValue('5')
  })

  it('resets the quantity back to one after adding to cart', async () => {
    const user = userEvent.setup()
    renderProductDetailPage('/product/p1')

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))

    expect(
      await screen.findByText('Wireless Headphones added to cart'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Decrease quantity' }),
    ).toBeDisabled()
  })

  it('limits the selectable quantity to what is still available once some is already in the cart', async () => {
    const user = userEvent.setup()
    renderProductDetailPage('/product/p1', [{ productId: 'p1', quantity: 20 }])

    expect(screen.getByText('24 in stock')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))

    expect(
      screen.getByRole('button', { name: 'Increase quantity' }),
    ).toBeDisabled()
    expect(screen.getByLabelText('Quantity')).toHaveValue('4')
  })

  it('replaces the add-to-cart controls once all available stock is already in the cart', () => {
    renderProductDetailPage('/product/p1', [{ productId: 'p1', quantity: 24 }])

    expect(
      screen.getByText('All available stock is already in your cart'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Add to Cart' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Quantity')).not.toBeInTheDocument()
  })

  it('caps what gets added to the cart at exactly the remaining stock', async () => {
    const user = userEvent.setup()
    const { store } = renderProductDetailPage('/product/p1', [
      { productId: 'p1', quantity: 20 },
    ])

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))

    expect(store.getState().cart.items).toEqual([
      { productId: 'p1', quantity: 24 },
    ])
  })

  it('links back to the catalog via Continue Shopping', () => {
    renderProductDetailPage('/product/p1')

    expect(
      screen.getByRole('link', { name: 'Continue Shopping' }),
    ).toHaveAttribute('href', ROUTES.HOME)
  })

  it('resets quantity to one when navigating directly between two product pages', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Routes>
        <Route
          path={ROUTES.PRODUCT_DETAIL}
          element={
            <>
              <ProductDetailPage />
              <Link to="/product/p2">Go to p2</Link>
            </>
          }
        />
      </Routes>,
      { route: '/product/p1' },
    )

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('link', { name: 'Go to p2' }))

    expect(
      screen.getByRole('heading', { name: 'Smartwatch' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Decrease quantity' }),
    ).toBeDisabled()
  })
})
