import { Container } from '@mui/material'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import './AuthLayout.scss'

const AuthLayout = () => (
  <div className="auth-layout">
    <Container maxWidth="xs">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  </div>
)

export default AuthLayout
