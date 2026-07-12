import { ROUTES } from '@/routes/constants'
import { isLoggedInSelector } from '@/store/auth/selectors'
import { useAppSelector } from '@/store/hooks'

import type { INavLink } from './types'

export const useMainLayoutController = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const accountLink: INavLink = isLoggedIn
    ? { label: 'Account', path: ROUTES.ACCOUNT_PERSONAL_INFO }
    : { label: 'Login', path: ROUTES.LOGIN }

  return { accountLink }
}
