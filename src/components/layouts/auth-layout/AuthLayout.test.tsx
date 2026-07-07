import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import AuthLayout from './AuthLayout'

describe('AuthLayout', () => {
  it('renders the nested route content', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<div>Login form</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Login form')).toBeInTheDocument()
  })
})
