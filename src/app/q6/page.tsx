'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'

const LOG_CODE = {
  sst: `// Structured log event — every billing action
const event = {
  timestamp: new Date().toISOString(),
  traceId: ctx.traceId,         // correlates all steps in one request
  clientId: ctx.clientId,       // which of the 70+ clients
  userId: ctx.userId,           // who triggered it
  action: 'BILLING_BATCH_RUN',
  ruleId: rule.ruleId(),        // which rule was applied
  invoiceCount: batch.length,
  result: 'SUCCESS' | 'PARTIAL' | 'FAILED',
  errorCode: null,              // TECH_ERROR | RULE_ERROR | CONFIG_ERROR
  durationMs: elapsed,
  // LGPD: no CPF, name, or financial values in logs
}
logger.info(event)`,
  mern: `// Structured log event (Winston)
const event = {
  timestamp: new Date().toISOString(),
  traceId: req.headers['x-trace-id'],
  clientId: req.client.id,
  userId: req.user.id,
  action: 'BILLING_BATCH_RUN',
  ruleId: rule.ruleId,
  invoiceCount: batch.length,
  result: success ? 'SUCCESS' : 'FAILED',
  errorCode: err?.code ?? null,
  durationMs: Date.now() - startTime,
  // LGPD: never log CPF, name, or raw financial data
}
logger.info(JSON.stringify(event))`,
  dotnet: `// Structured log (Serilog)
Log.Information("{@BillingEvent}", new {
    Timestamp = DateTimeOffset.UtcNow,
    TraceId = Activity.Current?.Id,
    ClientId = ctx.ClientId,
    UserId = ctx.UserId,
    Action = "BILLING_BATCH_RUN",
    RuleId = rule.RuleId,
    InvoiceCount = batch.Count,
    Result = result.IsSuccess ? "SUCCESS" : "FAILED",
    ErrorCode = result.ErrorCode,
    DurationMs = stopwatch.ElapsedMilliseconds,
    // LGPD: no CPF, name, or financial values
});`,
}

export default function Q6() {
  const { stack } = useStack()
  return (
    <PageShell q="Q6" title="Observability & Support" subtitle={`Client reports: "The payment batch was not generated." Today this requires manual DB queries and developer intervention. It shouldn't.`}>

      <Alert severity="success" sx={{ borderRadius: 2 }}>
        <strong>Design goal:</strong> Support must be able to answer — what happened, where, when, which client, which user, which rule, which integration, and what type of error — without developer intervention and without accessing sensitive data.
      </Alert>

      {/* Logging */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Logging Strategy — Structured Events</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Every business action emits a structured log event with a trace ID, client ID, rule ID, and error classification.
          No free-text logs. No printf debugging. Every field is queryable.
        </Typography>
        <CodeBlock code={LOG_CODE[stack.id]} language={stack.id === 'dotnet' ? 'csharp' : 'typescript'} label={`Structured billing event — ${stack.label}`} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Error classification */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Error Classification — 3 Types</Typography>
        <Grid container spacing={2}>
          {[
            { type: 'TECH_ERROR', color: '#ef5350', desc: 'Infrastructure failure — DB timeout, network error, Lambda cold start. Support escalates to DevOps. No business impact implied.' },
            { type: 'RULE_ERROR', color: '#ffa726', desc: 'Business rule produced unexpected result — validation failed, calculation out of range. Support escalates to Analyst. Requires ADR investigation.' },
            { type: 'CONFIG_ERROR', color: '#ce93d8', desc: 'Missing or invalid client configuration — rule ID not found, parameter null. Support can fix directly in client_config table with audit trail.' },
          ].map(({ type, color, desc }) => (
            <Grid key={type} size={{ xs: 12, md: 4 }}>
              <ArtifactCard title={type} color={color}>{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2–8. Full Observability Stack</Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Metrics', desc: 'Batch success rate per client, average processing time, error rate by type, integration latency. Dashboards in CloudWatch / Grafana. SLA alerts when client error rate > 2%.' },
            { title: 'Tracing', desc: 'Distributed trace spans the full request lifecycle: HTTP entry → rule evaluation → SP execution → integration call → response. Trace ID correlates all log lines from one operation.' },
            { title: 'Functional Audit', desc: 'Immutable audit trail: who ran what, when, for which client, with which result. Not for debugging — for compliance. Stored in a write-once append log, not the main DB.' },
            { title: 'Dashboards', desc: 'Support dashboard shows: last 100 batch runs per client, error breakdown, integration status, last successful run per client. No raw DB access required.' },
            { title: 'Alerts', desc: 'PagerDuty/SNS alert when: batch fails for any client, error rate spikes, integration unreachable for > 5 min, processing time exceeds 2× baseline.' },
            { title: 'Support AI Assistant', desc: 'Agent with access to structured logs and runbooks. Support types "Client X batch failed" and gets: last run time, error type, rule that was applied, suggested action. No code required.' },
          ].map(({ title, desc }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>10. LGPD — What Support Cannot See</Typography>
        <Grid container spacing={2}>
          {[
            { title: '🔒 Hidden from support', items: ['CPF / CNPJ', 'Patient names', 'Raw financial values', 'Bank account numbers', 'Personal contact data'] },
            { title: '✅ Visible to support', items: ['Client ID + name', 'Error code + type', 'Timestamp + duration', 'Rule ID applied', 'Integration that failed'] },
          ].map(({ title, items }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {items.map(i => <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary' }}>{i}</Typography>)}
                </Box>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 2, p: 2.5, borderRadius: 2, border: '1px solid rgba(79,195,247,0.3)', bgcolor: 'rgba(79,195,247,0.05)', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
          Watch a live structured audit trace stream in real time — pick a scenario (success, config error, rule error) and see exactly what support would see in the dashboard.
        </Typography>
        <Box component="a" href="https://d1lz772m0ovkmh.cloudfront.net" target="_blank"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.main', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          ▶ Try it live on AWS →
        </Box>
      </Box>

    </PageShell>
  )
}
