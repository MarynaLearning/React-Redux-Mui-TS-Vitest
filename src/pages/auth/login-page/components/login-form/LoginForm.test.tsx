import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import type { IAccount } from '@/store/auth/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import LoginForm from './LoginForm'

const account: IAccount = {
  id: 'user-1',
  email: 'jane@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  password: 'secret123',
}

const renderLoginForm = ({
  accounts = [],
  route = ROUTES.LOGIN,
  state,
}: {
  accounts?: IAccount[]
  route?: string
  state?: unknown
} = {}) =>
  renderWithProviders(
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={<LoginForm backButton={<button type="button">Back</button>} />}
      />
      <Route path={ROUTES.HOME} element={<div>Catalog page</div>} />
      <Route path={ROUTES.CHECKOUT} element={<div>Checkout page</div>} />
    </Routes>,
    {
      preloadedState: { auth: { accounts, user: null, isLoggedIn: false } },
      route,
      state,
    },
  )

describe('LoginForm', () => {
  it('renders email and password fields with a submit button', () => {
    renderLoginForm()

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('shows an error and does not navigate when no account matches', async () => {
    const user = userEvent.setup()
    renderLoginForm({ accounts: [] })

    await user.type(screen.getByLabelText('Email'), account.email)
    await user.type(screen.getByLabelText('Password'), account.password)
    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(
      await screen.findByText(
        'No account found for these credentials. Please sign up.',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByText('Catalog page')).not.toBeInTheDocument()
  })

  it('logs in and redirects to the catalog when credentials match and there is no prior location', async () => {
    const user = userEvent.setup()
    renderLoginForm({ accounts: [account] })

    await user.type(screen.getByLabelText('Email'), account.email)
    await user.type(screen.getByLabelText('Password'), account.password)
    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(await screen.findByText('Catalog page')).toBeInTheDocument()
  })

  it('redirects back to the originally attempted route after logging in', async () => {
    const user = userEvent.setup()
    renderLoginForm({
      accounts: [account],
      state: { from: { pathname: ROUTES.CHECKOUT } },
    })

    await user.type(screen.getByLabelText('Email'), account.email)
    await user.type(screen.getByLabelText('Password'), account.password)
    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(await screen.findByText('Checkout page')).toBeInTheDocument()
  })
})
