'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert, Chip } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'

const PHASES = [
  {
    phase: 'Days 1–30',
    title: 'Listen, Map, and Diagnose',
    color: '#4fc3f7',
    items: [
      { title: 'Shadow the team', desc: 'Attend stand-ups, support calls, and deployment meetings. Learn what breaks most often and who gets called at 2am.' },
      { title: 'Interview everyone', desc: 'Dev team, support, business analyst, product owner, DBA. Ask: "What are you most afraid of? What would you never touch?"' },
      { title: 'Map the system', desc: 'Produce ERD, SP dependency graph, integration map. Not to refactor — to understand. No code changes in month 1.' },
      { title: 'Assess test coverage', desc: 'Run coverage report. Map which critical paths have zero test coverage. This is the risk map.' },
      { title: 'Deliver: Technical Diagnostic Report', desc: 'A document summarizing what was found: top 5 risks, highest-pain modules, dependency map, coverage gaps. Shared with leadership.' },
    ],
  },
  {
    phase: 'Days 31–60',
    title: 'Design the Migration Framework',
    color: '#66bb6a',
    items: [
      { title: 'Select pilot module', desc: 'Criteria: high support ticket volume + low coupling + willing business owner. NOT the most complex module. The goal is to prove the process, not show heroics.' },
      { title: 'Produce all 13 artifacts for pilot', desc: 'Process map, business rules map, table map, SP map, integration map, client matrix, customization matrix, acceptance criteria, test plan, rollback plan, staging strategy, support docs, agent docs.' },
      { title: 'Set up infrastructure', desc: 'CI/CD pipeline, staging environment mirroring production structure (anonymized data), observability stack, feature flag service.' },
      { title: 'Establish ADR process', desc: 'Every architectural decision gets an ADR. Template in repo. Pipeline enforces it for billing-related PRs.' },
      { title: 'Deliver: Migration Playbook v1', desc: 'The repeatable process for every subsequent module. Includes checklist, artifact templates, deployment runbook, and rollback procedure.' },
    ],
  },
  {
    phase: 'Days 61–90',
    title: 'Execute Pilot — Prove the Process',
    color: '#ce93d8',
    items: [
      { title: 'Develop pilot module', desc: 'Using the 13 validated artifacts as spec. Every business rule has a test. Every integration has a contract test. No "we\'ll add tests later."' },
      { title: 'Deploy to internal test client', desc: 'Strangler Fig in place. Legacy still runs for all other clients. 2 weeks of parallel running — compare outputs.' },
      { title: 'Expand to 3 low-risk clients', desc: 'With explicit client consent and support team briefed. Monitor for 2 weeks.' },
      { title: 'Post-pilot retrospective', desc: 'What worked, what didn\'t, what needs to change in the playbook before wave 2.' },
      { title: 'Deliver: Wave 1 Report + Wave 2 Plan', desc: 'Metrics: error rate, test coverage, support ticket reduction, deployment time. Proposed next 2 modules for wave 2.' },
    ],
  },
]

const NOT_TODO = [
  'Refactor anything without the 13 artifacts completed and validated',
  'Touch production without a tested rollback plan',
  'Start module 2 before module 1 is stable',
  'Make architectural decisions without an ADR',
  'Promise a rewrite timeline to management',
  'Allow AI to generate migration scripts without human review',
  'Deprioritize test coverage in favor of speed',
  'Work in isolation — every decision involves analyst + support',
]

export default function Q8() {
  return (
    <PageShell q="Q8" title="First 90 Days" subtitle="The board wants progress. Production cannot be at risk. Here is exactly what a senior engineer does — and what they explicitly do not do.">

      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <strong>The biggest mistake:</strong> Starting to code in week 1. The first 30 days produce zero code and deliver the highest value — because they prevent 6 months of rework.
      </Alert>

      {PHASES.map(({ phase, title, color, items }) => (
        <Box key={phase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip label={phase} sx={{ bgcolor: color, color: '#000', fontWeight: 800 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
          </Box>
          <Grid container spacing={2}>
            {items.map(({ title: t, desc }) => (
              <Grid key={t} size={{ xs: 12, md: 6 }}>
                <ArtifactCard title={t} color={color}>{desc}</ArtifactCard>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mt: 3, mb: 1 }} />
        </Box>
      ))}

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>What I Would NOT Do in 90 Days</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Restraint is a senior engineering skill. These are explicit non-actions.
        </Typography>
        <Grid container spacing={1}>
          {NOT_TODO.map((item, i) => (
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
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Communication Cadence</Typography>
        <Grid container spacing={2}>
          {[
            { audience: 'Engineering team', cadence: 'Daily stand-up + async ADR reviews', content: 'Technical decisions, blockers, artifact progress' },
            { audience: 'Product & Analyst', cadence: 'Weekly sync', content: 'Business rule validations, acceptance criteria review' },
            { audience: 'Management / Board', cadence: 'Bi-weekly written update', content: 'Progress metrics, risks, decisions made, next 2 weeks plan' },
            { audience: 'Support', cadence: 'Before every deployment', content: 'What changed, what to watch for, how to escalate' },
          ].map(({ audience, cadence, content }) => (
            <Grid key={audience} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={audience} color="#ffa726">
                <Typography variant="body2" sx={{ color: 'primary.main', mb: 0.5 }}>{cadence}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{content}</Typography>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

    </PageShell>
  )
}
