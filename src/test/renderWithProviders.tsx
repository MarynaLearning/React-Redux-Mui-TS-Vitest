import { configureStore } from '@reduxjs/toolkit'
import type { EnhancedStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { NotificationProvider } from '@/context/NotificationContext'
import type { TRootState } from '@/store'
import { rootReducer } from '@/store/rootReducer'

interface IRenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<TRootState>
  route?: string
  state?: unknown
}

interface IRenderWithProvidersResult extends RenderResult {
  store: EnhancedStore<TRootState>
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState,
    route = '/',
    state,
    ...renderOptions
  }: IRenderWithProvidersOptions = {},
): IRenderWithProvidersResult => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <NotificationProvider>
        <MemoryRouter initialEntries={[{ pathname: route, state }]}>
          {children}
        </MemoryRouter>
      </NotificationProvider>
    </Provider>
  )

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
