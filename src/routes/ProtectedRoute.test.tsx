import { screen } from '@testing-library/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/renderWithProviders'

import ProtectedRoute from './ProtectedRoute'
import type { IProtectedRouteState } from './ProtectedRoute.types'

const LoginProbe = () => {
  const location = useLocation()
  const state = location.state as IProtectedRouteState | null

  return <div>Login page, from: {state?.from.pathname ?? 'none'}</div>
}

const renderProtectedTree = (isLoggedIn: boolean) =>
  renderWithProviders(
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/protected" element={<div>Secret</div>} />
      </Route>
      <Route path="/login" element={<LoginProbe />} />
    </Routes>,
    {
      preloadedState: { auth: { accounts: [], user: null, isLoggedIn } },
      route: '/protected',
    },
  )

describe('ProtectedRoute', () => {
  it('renders the protected child route when logged in', () => {
    renderProtectedTree(true)

    expect(screen.getByText('Secret')).toBeInTheDocument()
  })

  it('redirects to login, carrying the attempted location, when logged out', () => {
    renderProtectedTree(false)

    expect(screen.queryByText('Secret')).not.toBeInTheDocument()
    expect(screen.getByText('Login page, from: /protected')).toBeInTheDocument()
  })
})
