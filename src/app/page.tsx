'use client'
import { Box, Typography, Card, CardContent, Grid2 as Grid, Chip, Divider, Alert } from '@mui/material'
import Link from 'next/link'
import { useLang } from '@/context/LangContext'
import { t } from '@/translations'

export default function HomePage() {
  const { lang } = useLang()
  const h = t.home

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ py: 2 }}>
        <Chip label={h.chip[lang]} size="small" sx={{ mb: 2, bgcolor: '#4fc3f7', color: '#000', fontWeight: 700 }} />
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.1 }}>
          {h.h2a[lang]}<br />
          <Box component="span" sx={{ color: 'primary.main' }}>{h.h2b[lang]}</Box>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 660, lineHeight: 1.8 }}>
          {h.intro[lang]}
        </Typography>
      </Box>

      {/* Live Demo Card */}
      <Box component="a" href="/demo" sx={{ textDecoration: 'none', display: 'block' }}>
        <Card elevation={0} sx={{ border: '2px solid #ef5350', borderRadius: 3, background: 'linear-gradient(135deg, rgba(239,83,80,0.08) 0%, rgba(79,195,247,0.06) 100%)', cursor: 'pointer', transition: 'border-color .2s, transform .15s', '&:hover': { borderColor: '#4fc3f7', transform: 'translateY(-2px)' } }}>
          <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef5350', flexShrink: 0, animation: 'livepulse 1.5s ease-in-out infinite', '@keyframes livepulse': { '0%,100%': { boxShadow: '0 0 0 0 rgba(239,83,80,0.6)' }, '50%': { boxShadow: '0 0 0 8px rgba(239,83,80,0)' } } }} />
              <Box>
                <Typography variant="overline" sx={{ color: '#ef5350', fontWeight: 800, letterSpacing: 3, lineHeight: 1, display: 'block' }}>LIVE PROCESS</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>{h.liveTitle[lang]}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 200 }}>
              {(h.liveItems[lang] as unknown as string[]).map((item: string) => (
                <Typography key={item} variant="caption" sx={{ color: 'text.secondary' }}>{item}</Typography>
              ))}
            </Box>
            <Box sx={{ px: 2.5, py: 1.2, borderRadius: 2, bgcolor: 'primary.main', color: '#000', fontWeight: 800, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              {h.liveBtn[lang]}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: h.alertInfo[lang] }} />
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{h.systemTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {(h.systemStats[lang] as unknown as string[][]).map(([val, label]) => (
            <Grid key={label} size={{ xs: 6, md: 4 }}>
              <Card elevation={0} sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>{val}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{h.philTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          <span dangerouslySetInnerHTML={{ __html: h.philBody[lang] }} />
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {(h.philChips[lang] as unknown as string[]).map((t: string) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderColor: 'rgba(79,195,247,0.4)', color: 'primary.main' }} />
          ))}
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{h.questionsTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {(h.questions[lang] as unknown as { href: string; q: string; title: string; desc: string }[]).map(({ href, q, title, desc }) => (
            <Grid key={href} size={{ xs: 12, sm: 6 }}>
              <Card elevation={0} component={Link} href={href} sx={{ display: 'block', textDecoration: 'none', transition: 'border-color .2s', '&:hover': { borderColor: 'primary.main' } }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Chip label={q} size="small" sx={{ mb: 1, fontWeight: 700, fontSize: '0.7rem', bgcolor: q === '★' ? '#ffa726' : 'rgba(79,195,247,0.15)', color: q === '★' ? '#000' : 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
