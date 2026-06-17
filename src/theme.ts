'use client'
import { createTheme, PaletteMode } from '@mui/material/styles'

export const buildTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: { main: '#4fc3f7' },
    secondary: { main: '#ce93d8' },
    background: mode === 'dark'
      ? { default: '#0a0e1a', paper: '#0d1628' }
      : { default: '#f0f4f8', paper: '#ffffff' },
    success: { main: '#66bb6a' },
    warning: { main: '#ffa726' },
    error: { main: '#ef5350' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    fontSize: 16,
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600, fontSize: '1.4rem' },
    h6: { fontWeight: 600, fontSize: '1.15rem' },
    body1: { fontSize: '1.05rem', lineHeight: 1.8 },
    body2: { fontSize: '1rem',   lineHeight: 1.8 },
    caption: { fontSize: '0.9rem' },
    overline: { fontSize: '0.8rem' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
})

// keep backward compat for any direct import of `theme`
export const theme = buildTheme('dark')
