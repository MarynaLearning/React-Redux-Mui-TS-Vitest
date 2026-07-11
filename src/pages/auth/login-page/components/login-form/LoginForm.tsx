import { Button, TextField } from '@mui/material'
import type { ReactNode } from 'react'

import './LoginForm.scss'
import { useLoginFormController } from './useLoginFormController'

interface ILoginFormProps {
  backButton: ReactNode
}

const LoginForm = ({ backButton }: ILoginFormProps) => {
  const { register, onSubmit, errors } = useLoginFormController()

  return (
    <div className="login-form">
      <form className="form" onSubmit={onSubmit} noValidate>
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
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message ?? ' '}
            {...register('password')}
          />
        </div>
        <div className="actions">
          {backButton}
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
