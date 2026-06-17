'use client'
import { Box, Typography, Chip, Divider } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  q: string
  title: string
  subtitle: string
  color?: string
  children: ReactNode
}

export default function PageShell({ q, title, subtitle, color = '#4b4374', children }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Chip label={q} sx={{ mb: 1.5, bgcolor: color, color: '#fff', fontWeight: 800, fontSize: '1rem' }} />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color }}>{title}</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 700 }}>{subtitle}</Typography>
        <Divider sx={{ mt: 3, borderColor: 'rgba(255,255,255,0.08)' }} />
      </Box>
      {children}
    </Box>
  )
}
