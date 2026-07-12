import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useNotification } from '@/context/NotificationContext'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { login } from '@/store/auth/reducer'
import { accountsSelector } from '@/store/auth/selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import type { TLoginFormValues } from './LoginFormSchema'
import { loginFormSchema } from './LoginFormSchema'

export const useLoginFormController = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const redirectTo = useAuthRedirect()
  const accounts = useAppSelector(accountsSelector)
  const { notify } = useNotification()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(({ email, password }) => {
    const account = accounts.find(
      (candidate) =>
        candidate.email === email && candidate.password === password,
    )

    if (!account) {
      notify('No account found for these credentials. Please sign up.', 'error')
      return
    }

    const { id, firstName, lastName } = account
    dispatch(login({ id, email, firstName, lastName }))
    navigate(redirectTo, { replace: true })
  })

  return { register, onSubmit, errors }
}
