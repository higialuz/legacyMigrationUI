import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/theme'
import { StackProvider } from '@/context/StackContext'
import Sidebar from '@/components/Sidebar'
import StackSelector from '@/components/StackSelector'
import Box from '@mui/material/Box'
import MuiRegistry from '@/components/MuiRegistry'

export const metadata: Metadata = {
  title: 'ERP Migration Showcase — Emerson Yaegashi',
  description: 'Live migration showcase: Legacy VB.NET ERP → Modern serverless stack. Senior Software Engineer evaluation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <MuiRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StackProvider>
              <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
                <Sidebar />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, maxWidth: 900, width: '100%', mx: 'auto' }}>
                    {children}
                  </Box>
                  <StackSelector />
                </Box>
              </Box>
            </StackProvider>
          </ThemeProvider>
        </MuiRegistry>
      </body>
    </html>
  )
}
