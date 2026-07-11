import { ROUTES } from '@/routes/constants'

import type { INavLink } from './types'

export const NAV_LINKS: INavLink[] = [
  { label: 'Catalog', path: ROUTES.HOME },
  { label: 'Cart', path: ROUTES.CART },
]
