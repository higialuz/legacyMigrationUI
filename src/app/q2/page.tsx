'use client'
import { Box, Typography, Grid2 as Grid, Chip, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import { useLang } from '@/context/LangContext'
import { q2 } from '@/translations/q1q2'

export default function Q2() {
  const { lang } = useLang()
  return (
    <PageShell q={q2.shell.q[lang]} title={q2.shell.title[lang]} subtitle={q2.shell.subtitle[lang]}>
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q2.alert[lang] }} />
      </Alert>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 800, mb: 3 }}>{q2.intro[lang]}</Typography>
        <Grid container spacing={2}>
          {q2.artifacts[lang].map((a: { n: string; title: string; risk: string; who: string; desc: string }) => (
            <Grid key={a.n} size={{ xs: 12, md: 6 }} sx={{ fontSize: 15, fontWeight: 800 }}>
              <ArtifactCard number={a.n} title={a.title} risk={a.risk} who={a.who}>{a.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{q2.validTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{q2.validBody[lang]}</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          {(q2.validChips[lang] as string[]).map((chip: string) => (
            <Chip key={chip} label={chip} size="small" color="success" variant='filled' />
          ))}
        </Box>
      </Box>
    </PageShell>
  )
}
