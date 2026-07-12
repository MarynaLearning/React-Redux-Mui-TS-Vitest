import { ROUTES } from '@/routes/constants'
import { isLoggedInSelector } from '@/store/auth/selectors'
import { cartTotalCountSelector } from '@/store/cart/selectors'
import { useAppSelector } from '@/store/hooks'

import type { INavLink } from './types'

export const useMainLayoutController = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const cartCount = useAppSelector(cartTotalCountSelector)

  const accountLink: INavLink = isLoggedIn
    ? { label: 'Account', path: ROUTES.ACCOUNT_PERSONAL_INFO }
    : { label: 'Login', path: ROUTES.LOGIN }

  return { accountLink, cartCount }
}
