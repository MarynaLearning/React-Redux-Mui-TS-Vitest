import { Button, TextField } from '@mui/material'
import type { ReactNode } from 'react'

import './SignupForm.scss'
import { useSignupFormController } from './useSignupFormController'

interface ISignupFormProps {
  backButton: ReactNode
}

const SignupForm = ({ backButton }: ISignupFormProps) => {
  const { register, onSubmit, errors } = useSignupFormController()

  return (
    <form className="signup-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <TextField
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message ?? ' '}
          {...register('email')}
        />
      </div>
      <div className="field">
        <TextField
          label="First name"
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName?.message ?? ' '}
          {...register('firstName')}
        />
      </div>
      <div className="field">
        <TextField
          label="Last name"
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName?.message ?? ' '}
          {...register('lastName')}
        />
      </div>
      <div className="field">
        <TextField
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message ?? ' '}
          {...register('password')}
        />
      </div>
      <div className="field">
        <TextField
          label="Confirm password"
          type="password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message ?? ' '}
          {...register('confirmPassword')}
        />
      </div>
      <div className="actions">
        {backButton}
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </div>
    </form>
  )
}

export default SignupForm
