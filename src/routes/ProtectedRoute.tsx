import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { isLoggedInSelector } from '@/store/auth/selectors'
import { useAppSelector } from '@/store/hooks'

import { ROUTES } from './constants'
import type { IProtectedRouteState } from './ProtectedRoute.types'

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const location = useLocation()

  if (!isLoggedIn) {
    const state: IProtectedRouteState = { from: location }
    return <Navigate to={ROUTES.LOGIN} replace state={state} />
  }

  return <Outlet />
}

export default ProtectedRoute
