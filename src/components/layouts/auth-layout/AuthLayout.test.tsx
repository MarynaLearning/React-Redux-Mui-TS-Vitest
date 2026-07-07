import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import AuthLayout from './AuthLayout'
import { ROUTES } from '../../../routes/constants'

describe('AuthLayout', () => {
  it('renders the nested route content', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<div>Login form</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Login form')).toBeInTheDocument()
  })
})
