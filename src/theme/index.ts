import type { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import { THEME_COLORS } from './constants'

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: THEME_COLORS.PRIMARY, dark: THEME_COLORS.PRIMARY_DARK },
      secondary: { main: THEME_COLORS.SECONDARY },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: 'none' } },
      },
    },
  })
