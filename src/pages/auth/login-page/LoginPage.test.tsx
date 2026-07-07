import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('renders the page heading', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })
})
