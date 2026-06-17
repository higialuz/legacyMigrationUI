'use client'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

export default function DemoPage() {
  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 1300, display: 'flex', flexDirection: 'column', bgcolor: '#0a0a0a' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <Button component={Link} href="/" size="small" sx={{ fontWeight: 700, color: 'primary.main' }}>
          ← Back to Showcase
        </Button>
      </Box>
      <Box component="iframe"
        src="https://d1lz772m0ovkmh.cloudfront.net"
        sx={{ flex: 1, border: 'none', width: '100%' }}
        title="ERP Migration Live Demo"
      />
    </Box>
  )
}
