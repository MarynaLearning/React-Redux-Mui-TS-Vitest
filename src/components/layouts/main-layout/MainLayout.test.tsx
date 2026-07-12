import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import MainLayout from './MainLayout'

const renderMainLayout = (isLoggedIn: boolean) =>
  renderWithProviders(
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<div>Catalog content</div>} />
      </Route>
    </Routes>,
    {
      preloadedState: { auth: { accounts: [], user: null, isLoggedIn } },
      route: ROUTES.HOME,
    },
  )

describe('MainLayout', () => {
  it('renders the brand, nav links, and nested route content', () => {
    renderMainLayout(false)

    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Catalog content')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument()
  })

  it('shows a Login link when logged out', () => {
    renderMainLayout(false)

    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Account' }),
    ).not.toBeInTheDocument()
  })

  it('shows an Account link when logged in', () => {
    renderMainLayout(true)

    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Login' }),
    ).not.toBeInTheDocument()
  })
})
