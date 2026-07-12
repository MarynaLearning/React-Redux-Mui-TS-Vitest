import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import PageHeader from './PageHeader'

describe('PageHeader', () => {
  it('renders the title with optional left/right slots', () => {
    render(
      <PageHeader
        title="Cart"
        leftSlot={<button type="button">Back</button>}
        rightSlot={<button type="button">Action</button>}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('renders just the title when no slots are provided', () => {
    render(<PageHeader title="Catalog" />)

    expect(screen.getByRole('heading', { name: 'Catalog' })).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
