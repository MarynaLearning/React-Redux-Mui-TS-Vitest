import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SignupPage from './SignupPage'

describe('SignupPage', () => {
  it('renders the page heading', () => {
    render(<SignupPage />)
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument()
  })
})
