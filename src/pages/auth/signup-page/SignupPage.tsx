import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './SignupPage.scss'
import SignupForm from './components/signup-form/SignupForm'

const SignupPage = () => {
  const navigate = useNavigate()

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
