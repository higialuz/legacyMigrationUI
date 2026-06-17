'use client'
import { Box, List, ListItemButton, ListItemText, Typography, Chip, Divider, IconButton, Tooltip } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useThemeMode } from '@/context/ThemeModeContext'
import { useLang } from '@/context/LangContext'
import { t } from '@/translations'

export default function Sidebar() {
  const path = usePathname()
  const { mode, toggle: toggleMode } = useThemeMode()
  const { lang, toggle: toggleLang } = useLang()
  const s = t.sidebar

  const NAV = [
    { href: '/',      label: 'Overview', sub: s.nav.overview[lang] },
    { href: '/q1',    label: 'Q1',       sub: s.nav.q1[lang] },
    { href: '/q2',    label: 'Q2',       sub: s.nav.q2[lang] },
    { href: '/q3',    label: 'Q3',       sub: s.nav.q3[lang] },
    { href: '/q4',    label: 'Q4',       sub: s.nav.q4[lang] },
    { href: '/q5',    label: 'Q5',       sub: s.nav.q5[lang] },
    { href: '/q6',    label: 'Q6',       sub: s.nav.q6[lang] },
    { href: '/q7',    label: 'Q7',       sub: s.nav.q7[lang] },
    { href: '/q8',    label: 'Q8',       sub: s.nav.q8[lang] },
    { href: '/bonus', label: '★ Bonus',  sub: s.nav.bonus[lang] },
  ]

  return (
    <Box sx={{ width: 220, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block' }}>
          {s.title[lang]}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {s.subtitle[lang]}
        </Typography>
      </Box>
      <List dense sx={{ flex: 1, py: 1 }}>
        {NAV.map(({ href, label, sub }) => {
          const active = path === href
          return (
            <ListItemButton key={href} component={Link} href={href} selected={active}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5, '&.Mui-selected': { background: 'rgba(79,195,247,0.1)', borderLeft: '3px solid', borderColor: 'primary.main' } }}>
              <Chip label={label} size="small" sx={{ mr: 1.5, minWidth: 44, fontWeight: 700, fontSize: '0.7rem', background: active ? 'primary.main' : 'rgba(255,255,255,0.07)', color: active ? '#000' : 'text.secondary' }} />
              <ListItemText primary={sub} primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: active ? 700 : 400 }} />
            </ListItemButton>
          )
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>Emerson Yaegashi</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>Senior Full Stack & AI Engineer</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={mode === 'dark' ? s.lightMode[lang] : s.darkMode[lang]}>
            <IconButton onClick={toggleMode} size="small" sx={{ color: 'text.secondary' }}>
              {mode === 'dark' ? '☀️' : '🌙'}
            </IconButton>
          </Tooltip>
          <Tooltip title={lang === 'en' ? 'Português' : 'English'}>
            <IconButton onClick={toggleLang} size="small" sx={{ color: 'text.secondary', fontWeight: 700, fontSize: '0.7rem' }}>
              {lang === 'en' ? 'PT' : 'EN'}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}
