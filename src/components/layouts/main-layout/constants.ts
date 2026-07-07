import type { INavLink } from './types'
import { ROUTES } from '../../../routes/constants'

export const NAV_LINKS: INavLink[] = [
  { label: 'Catalog', path: ROUTES.HOME },
  { label: 'Cart', path: ROUTES.CART },
  { label: 'Account', path: ROUTES.ACCOUNT_PERSONAL_INFO },
]
