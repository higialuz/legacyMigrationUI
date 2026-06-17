'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import { useLang } from '@/context/LangContext'
import { bonus } from '@/translations/bonus'

export default function Bonus() {
  const { lang } = useLang()
  return (
    <PageShell q={bonus.shell.q[lang]} title={bonus.shell.title[lang]} subtitle={bonus.shell.subtitle[lang]} color="#ffa726">
      <Alert severity="error" sx={{ borderRadius: 2, border: '1px solid #ef5350' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>{bonus.alertTitle[lang]}</Typography>
        <Typography variant="body2">{bonus.alertBody[lang]}</Typography>
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{bonus.coreTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          {bonus.coreBody[lang]}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{bonus.prereqTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {bonus.prereqs[lang].map((p: { n: string; title: string; desc: string }) => (
            <Grid key={p.n} size={{ xs: 12, md: 6 }}>
              <ArtifactCard number={p.n} title={p.title} color="#ffa726">{p.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{bonus.goodTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {bonus.good[lang].map((g: { title: string; desc: string }) => (
            <Grid key={g.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={g.title} color="#66bb6a">{g.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{bonus.convTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{bonus.convBody[lang]}</Typography>
        <Box sx={{ bgcolor: 'rgba(79,195,247,0.05)', borderRadius: 2, p: 3, border: '1px solid rgba(79,195,247,0.15)' }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary', lineHeight: 1.8 }}>
            {bonus.convQuote[lang]}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1 }}>
            {bonus.convCaption[lang]}
          </Typography>
        </Box>
      </Box>
    </PageShell>
  )
}
