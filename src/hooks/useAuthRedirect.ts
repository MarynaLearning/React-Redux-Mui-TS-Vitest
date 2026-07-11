import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/routes/constants'
import type { IProtectedRouteState } from '@/routes/ProtectedRoute.types'

export const useAuthRedirect = (): string => {
  const location = useLocation()
  const state = location.state as IProtectedRouteState | null

  return state?.from.pathname ?? ROUTES.HOME
}
