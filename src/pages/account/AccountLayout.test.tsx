import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'

import AccountLayout from './AccountLayout'

describe('AccountLayout', () => {
  it('renders the account tabs and nested route content', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.ACCOUNT_PERSONAL_INFO]}>
        <Routes>
          <Route element={<AccountLayout />}>
            <Route
              path={ROUTES.ACCOUNT_PERSONAL_INFO}
              element={<div>Personal info form</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('tab', { name: 'Personal Info' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Personal info form')).toBeInTheDocument()
  })
})
