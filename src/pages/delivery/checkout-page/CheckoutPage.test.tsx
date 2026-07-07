import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CheckoutPage from './CheckoutPage'

describe('CheckoutPage', () => {
  it('renders the page heading', () => {
    render(<CheckoutPage />)
    expect(
      screen.getByRole('heading', { name: 'Checkout' }),
    ).toBeInTheDocument()
  })
})
