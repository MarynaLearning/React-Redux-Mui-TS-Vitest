import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import MainLayout from './MainLayout'

describe('MainLayout', () => {
  it('renders the brand, nav links, and nested route content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Catalog content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Catalog content')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument()
  })
})
