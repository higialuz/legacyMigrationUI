'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert, Chip } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'

const SYSTEM_PROMPT = `# ERP Knowledge Agent — System Prompt

You are a technical assistant for the dental insurance ERP billing module.

## Your knowledge base includes:
- Business rules catalog (v2.3, last updated 2025-01-10)
- Client customization matrix (70 clients, billing section)
- Stored procedure documentation (300 SPs, billing module)
- Architecture Decision Records (ADR-001 to ADR-042)
- Integration contracts (50 integrations)

## Rules you must follow:
1. NEVER confirm a business rule without citing its source document and version
2. ALWAYS flag if the rule has client-specific exceptions
3. NEVER generate migration scripts — surface the relevant SP, let the engineer decide
4. If asked about production behavior, direct to the observability dashboard, not your docs
5. State confidence level on every answer: HIGH / MEDIUM / LOW
6. LOW confidence = escalate to engineering team

## What you must NEVER decide alone:
- Whether a stored procedure is safe to deprecate
- Which client will be impacted by a rule change
- Whether a code change is backward compatible
- Any decision that affects live production data`

export default function Q5() {
  return (
    <PageShell q="Q5" title="Responsible Use of Artificial Intelligence" subtitle="AI agents can accelerate everything — or hallucinate business-critical rules. The difference is what you feed them and what guardrails you build.">

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <strong>The core principle:</strong> AI is a force multiplier for humans who know the domain. It is not a replacement for domain knowledge. An agent fed bad documentation will produce confident, wrong answers faster.
      </Alert>

      {/* Knowledge base structure */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1 & 2. Knowledge Base Structure</Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Tier 1 — Ground Truth Docs', color: '#ef5350', items: ['Approved ADRs', 'Validated business rules catalog', 'Client customization matrix', 'Acceptance criteria'] },
            { title: 'Tier 2 — Technical Reference', color: '#ffa726', items: ['Stored procedure documentation', 'Integration contracts', 'Table map', 'ERD'] },
            { title: 'Tier 3 — Operational Guides', color: '#66bb6a', items: ['Support runbooks', 'Deployment procedures', 'Rollback plans', 'Observability dashboards'] },
            { title: 'Tier 4 — Living Context', color: '#4fc3f7', items: ['Meeting notes', 'Open questions log', 'In-progress ADRs', 'Change history'] },
          ].map(({ title, color, items }) => (
            <Grid key={title} size={{ xs: 12, sm: 6 }}>
              <ArtifactCard title={title} color={color}>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {items.map(i => <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary', mb: 0.3 }}>{i}</Typography>)}
                </Box>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* System prompt */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>4. Agent Instructions — System Prompt Design</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          The system prompt is the agent's constitution. It defines what it can do, what it must cite, and what it must never decide alone.
        </Typography>
        <CodeBlock code={SYSTEM_PROMPT} language="markdown" label="ERP Knowledge Agent — System Prompt" />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Controls */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5, 6 & 7. Risks, Controls, and Hard Limits</Typography>
        <Grid container spacing={2}>
          {[
            { title: '⚠ Risk: Stale documentation', desc: 'Agent answers based on outdated rules. Control: every doc update triggers a knowledge base re-index. Docs have version + last-updated timestamp. Agent cites both.' },
            { title: '⚠ Risk: Confident hallucination', desc: 'Agent generates plausible-sounding but incorrect SP logic. Control: agent must cite source + version. "I don\'t know" is a valid answer. Confidence scoring required.' },
            { title: '⚠ Risk: Scope creep', desc: 'Agent starts making recommendations beyond its role. Control: system prompt explicitly lists forbidden decision types. Monitored via output logging.' },
            { title: '🛑 Never automated', desc: 'Deprecating SPs · Changing production data · Client impact assessment · Final approval on business rules · Any action with no rollback path.' },
          ].map(({ title, desc }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>8. Keeping Documentation Alive</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Dead documentation is the root cause of hallucinating agents. The process:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[
            'PR merged → doc update required',
            'ADR approved → knowledge base re-indexed',
            'Business rule changed → catalog version bumped',
            'Client exception added → customization matrix updated',
            'Monthly doc freshness review',
          ].map((step, i) => (
            <Chip key={step} label={`${i + 1}. ${step}`} variant="outlined" sx={{ borderColor: 'rgba(79,195,247,0.3)', color: 'primary.main' }} />
          ))}
        </Box>
      </Box>

    </PageShell>
  )
}
