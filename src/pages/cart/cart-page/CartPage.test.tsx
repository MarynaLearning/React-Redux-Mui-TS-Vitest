import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CartPage from './CartPage'

describe('CartPage', () => {
  it('renders the page heading', () => {
    render(<CartPage />)
    expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument()
  })
})
