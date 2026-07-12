import type { TRootState } from '@/store/index'

export const isLoggedInSelector = (state: TRootState) => state.auth.isLoggedIn

export const accountsSelector = (state: TRootState) => state.auth.accounts
