import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { signup } from '@/store/auth/reducer'
import { useAppDispatch } from '@/store/hooks'

import type { TSignupFormValues } from './SignupFormSchema'
import { signupFormSchema } from './SignupFormSchema'

export const useSignupFormController = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const redirectTo = useAuthRedirect()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupFormValues>({
    resolver: yupResolver(signupFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(({ email, firstName, lastName, password }) => {
    dispatch(
      signup({
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        password,
      }),
    )
    navigate(redirectTo, { replace: true })
  })

  return { register, onSubmit, errors }
}
