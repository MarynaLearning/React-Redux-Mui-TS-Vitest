import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/routes/constants'
import { renderWithProviders } from '@/test/renderWithProviders'

import ContinueShoppingLink from './ContinueShoppingLink'

describe('ContinueShoppingLink', () => {
  it('links back to the catalog', () => {
    renderWithProviders(<ContinueShoppingLink />)

    expect(
      screen.getByRole('link', { name: 'Continue Shopping' }),
    ).toHaveAttribute('href', ROUTES.HOME)
  })
})
