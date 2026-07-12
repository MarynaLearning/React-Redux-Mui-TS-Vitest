import { ROUTES } from '@/routes/constants'

import type { IAccountTab } from './types'

export const ACCOUNT_TABS: IAccountTab[] = [
  { label: 'Personal Info', path: ROUTES.ACCOUNT_PERSONAL_INFO },
  { label: 'Preferences', path: ROUTES.ACCOUNT_PREFERENCES },
  { label: 'Statistics', path: ROUTES.ACCOUNT_STATISTICS },
]
