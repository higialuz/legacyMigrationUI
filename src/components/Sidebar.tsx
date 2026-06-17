'use client'
import { Box, List, ListItemButton, ListItemText, Typography, Chip, Divider } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Overview', sub: 'Migration Plan' },
  { href: '/q1', label: 'Q1', sub: 'Reverse Engineering' },
  { href: '/q2', label: 'Q2', sub: 'Minimum Artifacts' },
  { href: '/q3', label: 'Q3', sub: 'Multi-client Rules' },
  { href: '/q4', label: 'Q4', sub: 'Decision Making' },
  { href: '/q5', label: 'Q5', sub: 'AI Usage' },
  { href: '/q6', label: 'Q6', sub: 'Observability' },
  { href: '/q7', label: 'Q7', sub: 'Architecture' },
  { href: '/q8', label: 'Q8', sub: 'First 90 Days' },
  { href: '/bonus', label: '★ Bonus', sub: 'Eliminatory' },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <Box sx={{ width: 220, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block' }}>
          ERP Migration
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Legacy → Modern · Live Showcase
        </Typography>
      </Box>
      <List dense sx={{ flex: 1, py: 1 }}>
        {NAV.map(({ href, label, sub }) => {
          const active = path === href
          return (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              selected={active}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5, '&.Mui-selected': { background: 'rgba(79,195,247,0.1)', borderLeft: '3px solid', borderColor: 'primary.main' } }}
            >
              <Chip label={label} size="small" sx={{ mr: 1.5, minWidth: 44, fontWeight: 700, fontSize: '0.7rem', background: active ? 'primary.main' : 'rgba(255,255,255,0.07)', color: active ? '#000' : 'text.secondary' }} />
              <ListItemText primary={sub} primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: active ? 700 : 400 }} />
            </ListItemButton>
          )
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>Emerson Yaegashi</Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>Senior Full Stack & AI Engineer</Typography>
      </Box>
    </Box>
  )
}
