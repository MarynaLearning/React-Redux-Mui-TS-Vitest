import * as yup from 'yup'

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export type TLoginFormValues = yup.InferType<typeof loginFormSchema>
