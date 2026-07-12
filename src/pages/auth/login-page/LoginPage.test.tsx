import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('renders the page heading and the login form', () => {
    renderWithProviders(<LoginPage />)

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('navigates to the signup page when the Sign Up link is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<div>Signup page</div>} />
      </Routes>,
      { route: ROUTES.LOGIN },
    )

    await user.click(screen.getByRole('link', { name: 'Sign Up' }))

    expect(await screen.findByText('Signup page')).toBeInTheDocument()
  })

  it('navigates back to the previous screen when Back is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Link to={ROUTES.LOGIN}>Go to login</Link>}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>,
      { route: ROUTES.HOME },
    )

    await user.click(screen.getByRole('link', { name: 'Go to login' }))
    expect(
      await screen.findByRole('heading', { name: 'Login' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Back' }))

    expect(
      await screen.findByRole('link', { name: 'Go to login' }),
    ).toBeInTheDocument()
  })
})
