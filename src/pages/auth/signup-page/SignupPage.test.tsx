import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import SignupPage from './SignupPage'

describe('SignupPage', () => {
  it('renders the page heading and the signup form', () => {
    renderWithProviders(<SignupPage />)

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('First name')).toBeInTheDocument()
  })

  it('navigates back to the previous screen when Back is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={<Link to={ROUTES.SIGNUP}>Go to signup</Link>}
        />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      </Routes>,
      { route: ROUTES.LOGIN },
    )

    await user.click(screen.getByRole('link', { name: 'Go to signup' }))
    expect(
      await screen.findByRole('heading', { name: 'Sign Up' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Back' }))

    expect(
      await screen.findByRole('link', { name: 'Go to signup' }),
    ).toBeInTheDocument()
  })
})
