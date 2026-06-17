'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { StackProvider } from '@/context/StackContext'
import { useThemeMode } from '@/context/ThemeModeContext'
import { buildTheme } from '@/theme'
import MuiRegistry from '@/components/MuiRegistry'
import Sidebar from '@/components/Sidebar'
import StackSelector from '@/components/StackSelector'
import { ReactNode } from 'react'

export default function DynamicLayout({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode()
  const theme = buildTheme(mode)

  return (
    <MuiRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StackProvider>
          <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <StackSelector />
              <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, maxWidth: 900, width: '100%', mx: 'auto' }}>
                {children}
              </Box>
            </Box>
          </Box>
        </StackProvider>
      </ThemeProvider>
    </MuiRegistry>
  )
}
