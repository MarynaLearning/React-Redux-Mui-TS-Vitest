import { Button, Link, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import './LoginPage.scss'
import { ROUTES } from '@/routes/constants'

import LoginForm from './components/login-form/LoginForm'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <Typography variant="h4">Login</Typography>
      <LoginForm
        backButton={<Button onClick={() => navigate(-1)}>Back</Button>}
      />
      <Typography className="signup-link">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to={ROUTES.SIGNUP}>
          Sign Up
        </Link>
      </Typography>
    </div>
  )
}

export default LoginPage
