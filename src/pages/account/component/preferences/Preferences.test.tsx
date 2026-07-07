import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Preferences from './Preferences'

describe('Preferences', () => {
  it('renders the page heading', () => {
    render(<Preferences />)
    expect(
      screen.getByRole('heading', { name: 'Preferences' }),
    ).toBeInTheDocument()
  })
})
