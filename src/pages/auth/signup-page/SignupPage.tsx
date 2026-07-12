import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './SignupPage.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import SignupForm from './components/signup-form/SignupForm'

const SignupPage = () => {
  const navigate = useNavigate()
  useDocumentTitle('Sign Up')

  return (
    <div className="signup-page">
      <Typography variant="h4">Sign Up</Typography>
      <SignupForm
        backButton={<Button onClick={() => navigate(-1)}>Back</Button>}
      />
    </div>
  )
}

export default SignupPage
