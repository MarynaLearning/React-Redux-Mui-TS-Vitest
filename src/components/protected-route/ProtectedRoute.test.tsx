import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import ProtectedRoute from './ProtectedRoute'

describe('ProtectedRoute', () => {
  it('renders the protected child route when allowed through', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Secret</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Secret')).toBeInTheDocument()
  })
})
