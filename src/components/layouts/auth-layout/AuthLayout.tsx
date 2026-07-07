import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import './AuthLayout.scss'

const AuthLayout = () => (
  <div className="auth-layout">
    <Container maxWidth="xs">
      <Outlet />
    </Container>
  </div>
)

export default AuthLayout
