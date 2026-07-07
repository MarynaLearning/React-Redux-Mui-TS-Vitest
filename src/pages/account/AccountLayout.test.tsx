import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import AccountLayout from './AccountLayout'

describe('AccountLayout', () => {
  it('renders the account tabs and nested route content', () => {
    render(
      <MemoryRouter initialEntries={['/account/personal-info']}>
        <Routes>
          <Route element={<AccountLayout />}>
            <Route
              path="/account/personal-info"
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
