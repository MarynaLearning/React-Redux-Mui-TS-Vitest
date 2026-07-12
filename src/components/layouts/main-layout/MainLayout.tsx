import {
  AppBar,
  Badge,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import { Suspense } from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'

import { ROUTES } from '@/routes/constants'

import { NAV_LINKS } from './constants'
import './MainLayout.scss'
import { useMainLayoutController } from './useMainLayoutController'

const MainLayout = () => {
  const { accountLink, cartCount } = useMainLayoutController()

  return (
    <div className="main-layout">
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="brand">
            Weak designed Shop (don't look for login)
          </Typography>
          {NAV_LINKS.map(({ path, label }) => (
            <Button key={path} color="inherit" component={RouterLink} to={path}>
              {path === ROUTES.CART && cartCount > 0 ? (
                <Badge badgeContent={cartCount}>{label}</Badge>
              ) : (
                label
              )}
            </Button>
          ))}
          <Button color="inherit" component={RouterLink} to={accountLink.path}>
            {accountLink.label}
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Container>
    </div>
  )
}

export default MainLayout
