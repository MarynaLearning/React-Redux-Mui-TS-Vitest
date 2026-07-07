import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, Outlet } from 'react-router-dom'

import { NAV_LINKS } from './constants'
import './MainLayout.scss'

const MainLayout = () => (
  <div className="main-layout">
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h6" className="brand">
          Shop
        </Typography>
        {NAV_LINKS.map(({ path, label }) => (
          <Button key={path} color="inherit" component={RouterLink} to={path}>
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
    <Container component="main" className="content">
      <Outlet />
    </Container>
  </div>
)

export default MainLayout
