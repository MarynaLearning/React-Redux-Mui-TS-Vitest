/* eslint-disable react-refresh/only-export-components -- context, provider,
   and hook are colocated in one file by design; see PLAN.md §5 */
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { getTheme } from '@/theme'

export interface IThemeModeContextValue {
  mode: PaletteMode
  toggleMode: () => void
}

export const ThemeModeContext = createContext<
  IThemeModeContextValue | undefined
>(undefined)

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  const toggleMode = (): void =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export const useThemeMode = (): IThemeModeContextValue => {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider')
  }
  return ctx
}
