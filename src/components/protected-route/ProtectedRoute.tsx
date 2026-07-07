import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '../../routes/constants'

const ProtectedRoute = () => {
  // placeholder until store/auth/reducer.ts exists — always allows through
  const isLoggedIn: boolean = true

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}

export default ProtectedRoute
