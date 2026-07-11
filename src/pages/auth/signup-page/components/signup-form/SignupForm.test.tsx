import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import SignupForm from './SignupForm'

const renderSignupForm = ({
  route = ROUTES.SIGNUP,
  state,
}: { route?: string; state?: unknown } = {}) =>
  renderWithProviders(
    <Routes>
      <Route
        path={ROUTES.SIGNUP}
        element={
          <SignupForm backButton={<button type="button">Back</button>} />
        }
      />
      <Route path={ROUTES.HOME} element={<div>Catalog page</div>} />
      <Route path={ROUTES.CHECKOUT} element={<div>Checkout page</div>} />
    </Routes>,
    { route, state },
  )

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Email'), 'jane@example.com')
  await user.type(screen.getByLabelText('First name'), 'Jane')
  await user.type(screen.getByLabelText('Last name'), 'Doe')
  await user.type(screen.getByLabelText('Password'), 'secret123')
  await user.type(screen.getByLabelText('Confirm password'), 'secret123')
}

describe('SignupForm', () => {
  it('renders all fields with a submit button', () => {
    renderSignupForm()

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('First name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last name')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderSignupForm()

    await user.click(screen.getByRole('button', { name: 'Sign Up' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('First name is required')).toBeInTheDocument()
    expect(screen.getByText('Last name is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
    expect(screen.getByText('Please confirm your password')).toBeInTheDocument()
  })

  it('shows an error when the confirm-password field does not match', async () => {
    const user = userEvent.setup()
    renderSignupForm()

    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('First name'), 'Jane')
    await user.type(screen.getByLabelText('Last name'), 'Doe')
    await user.type(screen.getByLabelText('Password'), 'secret123')
    await user.type(screen.getByLabelText('Confirm password'), 'mismatch')
    await user.click(screen.getByRole('button', { name: 'Sign Up' }))

    expect(await screen.findByText('Passwords must match')).toBeInTheDocument()
  })

  it('registers the account, logs in, and redirects to the catalog when there is no prior location', async () => {
    const user = userEvent.setup()
    const { store } = renderSignupForm()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Sign Up' }))

    expect(await screen.findByText('Catalog page')).toBeInTheDocument()

    const { auth } = store.getState()
    expect(auth.accounts).toHaveLength(1)
    expect(auth.accounts[0]).toMatchObject({
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'secret123',
    })
    expect(auth.isLoggedIn).toBe(true)
    expect(auth.user).toMatchObject({
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
    })
  })

  it('redirects back to the originally attempted route after signing up', async () => {
    const user = userEvent.setup()
    renderSignupForm({ state: { from: { pathname: ROUTES.CHECKOUT } } })

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Sign Up' }))

    expect(await screen.findByText('Checkout page')).toBeInTheDocument()
  })
})
