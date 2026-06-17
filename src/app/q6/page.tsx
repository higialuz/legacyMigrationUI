'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'
import { useLang } from '@/context/LangContext'
import { q6 } from '@/translations/q6'

const LOG_CODE = {
  sst: `const event = {
  timestamp: new Date().toISOString(),
  traceId: ctx.traceId,
  clientId: ctx.clientId,
  userId: ctx.userId,
  action: 'BILLING_BATCH_RUN',
  ruleId: rule.ruleId(),
  result: 'SUCCESS' | 'PARTIAL' | 'FAILED',
  errorCode: null, // TECH_ERROR | RULE_ERROR | CONFIG_ERROR
  durationMs: elapsed,
}
logger.info(event)`,
  mern: `const event = {
  timestamp: new Date().toISOString(),
  traceId: req.headers['x-trace-id'],
  clientId: req.client.id,
  action: 'BILLING_BATCH_RUN',
  ruleId: rule.ruleId,
  result: success ? 'SUCCESS' : 'FAILED',
  errorCode: err?.code ?? null,
  durationMs: Date.now() - startTime,
}
logger.info(JSON.stringify(event))`,
  dotnet: `Log.Information("{@BillingEvent}", new {
  TraceId = Activity.Current?.Id,
  ClientId = ctx.ClientId,
  Action = "BILLING_BATCH_RUN",
  RuleId = rule.RuleId,
  Result = result.IsSuccess ? "SUCCESS" : "FAILED",
  ErrorCode = result.ErrorCode,
  DurationMs = stopwatch.ElapsedMilliseconds,
});`,
}

export default function Q6() {
  const { stack } = useStack()
  const { lang } = useLang()
  return (
    <PageShell q={q6.shell.q[lang]} title={q6.shell.title[lang]} subtitle={q6.shell.subtitle[lang]}>
      <Alert severity="success" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q6.alert[lang] }} />
      </Alert>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q6.logTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q6.logBody[lang]}</Typography>
        <CodeBlock code={LOG_CODE[stack.id]} language={stack.id === 'dotnet' ? 'csharp' : 'typescript'} label={`Structured billing event — ${stack.label}`} />
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q6.errTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q6.errors[lang].map((e: { type: string; color: string; desc: string }) => (
            <Grid key={e.type} size={{ xs: 12, md: 4 }}>
              <ArtifactCard title={e.type} color={e.color}>{e.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q6.stackTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q6.stack[lang].map((s: { title: string; desc: string }) => (
            <Grid key={s.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={s.title}>{s.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q6.lgpdTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q6.lgpd[lang].map((l: { title: string; items: string[] }) => (
            <Grid key={l.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={l.title}>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {l.items.map((i: string) => <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary' }}>{i}</Typography>)}
                </Box>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 2, p: 2.5, borderRadius: 2, border: '1px solid rgba(79,195,247,0.3)', bgcolor: 'rgba(79,195,247,0.05)', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>{q6.liveText[lang]}</Typography>
        <Box component="a" href="/demo" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.main', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {q6.liveBtn[lang]}
        </Box>
      </Box>
    </PageShell>
  )
}
