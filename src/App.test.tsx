import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the catalog page at the root route', async () => {
    render(<App />)
    expect(
      await screen.findByRole('heading', { name: 'Catalog' }),
    ).toBeInTheDocument()
  })
})
