import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import PersonalInfo from './PersonalInfo'

describe('PersonalInfo', () => {
  it('renders the page heading', () => {
    render(<PersonalInfo />)
    expect(
      screen.getByRole('heading', { name: 'Personal Info' }),
    ).toBeInTheDocument()
  })
})
