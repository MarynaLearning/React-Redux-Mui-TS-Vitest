import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Statistics from './Statistics'

describe('Statistics', () => {
  it('renders the page heading', () => {
    render(<Statistics />)
    expect(
      screen.getByRole('heading', { name: 'Statistics' }),
    ).toBeInTheDocument()
  })
})
