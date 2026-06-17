'use client'
import { Box, Typography, Grid2 as Grid, Chip, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import { useLang } from '@/context/LangContext'
import { q8 } from '@/translations/q8'

export default function Q8() {
  const { lang } = useLang()
  return (
    <PageShell q={q8.shell.q[lang]} title={q8.shell.title[lang]} subtitle={q8.shell.subtitle[lang]}>
      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q8.alert[lang] }} />
      </Alert>

      {q8.phases[lang].map((phase: { phase: string; title: string; color: string; items: { title: string; desc: string }[] }) => (
        <Box key={phase.phase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip label={phase.phase} sx={{ bgcolor: phase.color, color: '#000', fontWeight: 800 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{phase.title}</Typography>
          </Box>
          <Grid container spacing={2}>
            {phase.items.map((item: { title: string; desc: string }) => (
              <Grid key={item.title} size={{ xs: 12, md: 6 }}>
                <ArtifactCard title={item.title} color={phase.color}>{item.desc}</ArtifactCard>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mt: 3, mb: 1 }} />
        </Box>
      ))}

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q8.notTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q8.notBody[lang]}</Typography>
        <Grid container spacing={1}>
          {(q8.notItems[lang] as string[]).map((item: string, i: number) => (
            <Grid key={i} size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: 'rgba(239,83,80,0.06)', border: '1px solid rgba(239,83,80,0.15)' }}>
                <Typography sx={{ color: '#ef5350', fontWeight: 700, flexShrink: 0 }}>✗</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{q8.commsTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q8.comms[lang].map((c: { audience: string; cadence: string; content: string }) => (
            <Grid key={c.audience} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={c.audience} color="#ffa726">
                <Typography variant="body2" sx={{ color: 'primary.main', mb: 0.5 }}>{c.cadence}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.content}</Typography>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageShell>
  )
}
