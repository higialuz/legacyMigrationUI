'use client'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4fc3f7' },
    secondary: { main: '#ce93d8' },
    background: { default: '#0a0e1a', paper: '#0d1628' },
    success: { main: '#66bb6a' },
    warning: { main: '#ffa726' },
    error: { main: '#ef5350' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.08)' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
})
