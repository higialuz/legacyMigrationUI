'use client'
import { Box, Typography, Grid2 as Grid, Chip, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'

const ARTIFACTS = [
  { n: '01', title: 'Process Map', risk: 'Missing = wrong scope', who: 'Analyst + Business', desc: 'End-to-end billing lifecycle diagram. Every step, every decision point, every actor. This is the contract between business and engineering. Without it, developers will implement their interpretation, not the business one.' },
  { n: '02', title: 'Business Rules Map', risk: 'Missing = broken clients', who: 'Analyst + Dev + Support', desc: 'Every rule extracted from code, SPs, and config tables. Each rule has: source (where it lives today), owner (who defined it), client scope (all / specific / parametric), and test condition.' },
  { n: '03', title: 'Table Map', risk: 'Missing = data corruption', who: 'DBA + Dev', desc: 'All 150 tables with: purpose, volume, critical flag, FK dependencies, write frequency, and which SPs touch them. Prevents refactoring a table that 12 other modules depend on.' },
  { n: '04', title: 'Stored Procedure Map', risk: 'Missing = silent breakage', who: 'DBA + Dev', desc: 'All 300 SPs with: purpose, calling context (screen / scheduler / integration), execution frequency, and complexity score. Prioritizes which must be refactored vs. which can be kept as anti-corruption adapters.' },
  { n: '05', title: 'Integration Map', risk: 'Missing = broken contracts', who: 'Dev + Ops', desc: '50 integrations mapped with: direction, protocol, auth method, SLA, owner contact, and whether they are synchronous or asynchronous. Prevents deploying without notifying downstream systems.' },
  { n: '06', title: 'Matrix of Impacted Clients', risk: 'Missing = client incident', who: 'Analyst + Business + Support', desc: 'Which of the 70+ clients use this module and in which configuration. Determines the testing surface and deployment order. Some clients may need to be notified before go-live.' },
  { n: '07', title: 'Customization Matrix', risk: 'Missing = regression', who: 'Analyst + Dev', desc: 'Per-client rule exceptions mapped to source code locations. This is where "Client X does it differently" is formalized. Without this, a fix for Client A silently breaks Client X.' },
  { n: '08', title: 'Acceptance Criteria', risk: 'Missing = no definition of done', who: 'Analyst + QA + Business', desc: 'Precise, testable conditions that define when the refactored module is correct. Written in Given/When/Then format. Must cover standard flow AND all known client exceptions.' },
  { n: '09', title: 'Test Plan', risk: 'Missing = production surprise', who: 'QA + Dev + Analyst', desc: 'Covers: unit tests for each business rule, integration tests for each of the 50 integrations, regression suite for all 70+ clients, performance baseline, and manual UAT checklist.' },
  { n: '10', title: 'Rollback Plan', risk: 'Missing = unrecoverable incident', who: 'Dev + Ops + DBA', desc: 'Step-by-step rollback for every deployment step. Includes: DB migration reversal scripts, feature flag kill switches, proxy routing revert, and data reconciliation procedure if dual-write was active.' },
  { n: '11', title: 'Staging / Homologation Strategy', risk: 'Missing = testing in production', who: 'Dev + Ops + QA', desc: 'Defines how staging mirrors production data (anonymized), which clients participate in UAT, how long homologation runs, and what approval gates exist before production deploy.' },
  { n: '12', title: 'Support Documentation', risk: 'Missing = helpdesk escalations', who: 'Dev + Support', desc: 'How-to guide for support teams: what logs to check, what queries to run, what errors mean, escalation path. Must exist before go-live — not after the first incident.' },
  { n: '13', title: 'Documentation for Internal Agents', risk: 'Missing = hallucinating AI', who: 'Dev + Analyst', desc: 'Structured knowledge base that feeds AI assistants: business rules in plain English, integration contracts, client exceptions, known edge cases. Without this, agents will hallucinate business logic.' },
]

export default function Q2() {
  return (
    <PageShell q="Q2" title="Minimum Artifacts Before Refactoring" subtitle="13 artifacts that must exist before any development begins. Each one prevents a specific category of failure.">

      <Alert severity="error" sx={{ borderRadius: 2 }}>
        <strong>Non-negotiable gate:</strong> If any of these 13 artifacts is missing or unvalidated, development authorization should not be granted. Refactoring without them is not engineering — it is gambling with production.
      </Alert>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Each artifact has a clear objective, a named risk if absent, and a validation owner. The artifacts are ordered by dependency —
          you cannot produce artifact N+1 without artifact N being validated.
        </Typography>
        <Grid container spacing={2}>
          {ARTIFACTS.map(a => (
            <Grid key={a.n} size={{ xs: 12, md: 6 }}>
              <ArtifactCard number={a.n} title={a.title} risk={a.risk} who={a.who}>{a.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Validation Principle</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Each artifact must be reviewed and signed off by its named owner — not just produced. A document that exists but hasn't been validated
          by the people who operate the system is a liability. It creates false confidence and can lead to refactoring based on incorrect assumptions.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          {['Analyst sign-off', 'DBA sign-off', 'Business owner approval', 'Support review', 'QA acceptance', 'Tech lead gate'].map(t => (
            <Chip key={t} label={t} size="small" color="success" variant="outlined" />
          ))}
        </Box>
      </Box>

    </PageShell>
  )
}
