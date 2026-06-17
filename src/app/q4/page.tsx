'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert, Stepper, Step, StepLabel, StepContent } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'

const ADR_TEMPLATE = `# ADR-042: Billing Fee Calculation — Ground Truth

**Date:** 2025-01-15
**Status:** Approved
**Approver:** Head of Product + Tech Lead

## Context
Four conflicting versions of the billing fee rule were found:
- Analyst doc: flat 10% on gross amount
- Application code: 10% on net after deductions
- Stored procedure sp_CalcBilling: tiered rate based on volume
- Production observation: tiered, but with a floor of R$50

## Decision
**Ground truth is the stored procedure behavior as observed in production.**
Rationale: production has been running for 7 years without client complaints.
The SP behavior is what clients have accepted as correct.

## Evidence
- 6 months of production logs analyzed (2024-07-01 to 2024-12-31)
- 3 clients interviewed — all confirmed tiered behavior
- Support ticket history: zero billing disputes related to calculation method

## Consequences
- Analyst documentation will be updated to reflect SP behavior
- New implementation must produce identical output to sp_CalcBilling for all test cases
- sp_CalcBilling output used as test oracle for regression suite

## Participants
- Systems Analyst: [name]
- Lead Developer: [name]  
- Support Lead: [name]
- Product Owner: [name] ← final approval`

export default function Q4() {
  return (
    <PageShell q="Q4" title="Technical Decision Making Under Conflicting Truth" subtitle="4 sources, 4 different rules. Analyst, developer, stored procedure, and production all say something different. How do you find ground truth?">

      <Alert severity="error" sx={{ borderRadius: 2 }}>
        <strong>The trap:</strong> Picking the most authoritative-sounding source (the analyst doc, the most senior developer) and moving on. Ground truth is what production actually does — not what anyone thinks it does.
      </Alert>

      {/* Process */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>The Ground Truth Process</Typography>
        <Stepper orientation="vertical">
          {[
            { label: 'Freeze — stop all informal decisions', content: 'Call a meeting with all parties. Acknowledge the conflict explicitly. No one implements anything until ground truth is established. Informal "let\'s just go with X" decisions made under time pressure are how production incidents happen.' },
            { label: 'Extract technical evidence', content: 'Pull 6+ months of production logs. Identify actual calculation patterns. Run the SP in a staging environment with real production data (anonymized). Compare output to each competing rule. The SP + production logs are your test oracle.' },
            { label: 'Client interviews', content: 'Contact 3–5 affected clients. Ask: "Has the billing ever been wrong? Have you ever filed a dispute?" Their operational reality is the final arbiter — not the codebase.' },
            { label: 'Document the conflict', content: 'Write an Architecture Decision Record (ADR) that explicitly names all four conflicting versions and their sources. This is not a blame document — it\'s a record of the investigation.' },
            { label: 'Convene the decision meeting', content: 'Analyst + Lead Developer + Support Lead + Product Owner. Present evidence. Agree on ground truth. Product Owner gives final approval. This is not a technical decision alone.' },
            { label: 'Formalize and propagate', content: 'Update the ADR to "Approved" status. Update business rules documentation. Write regression tests using the SP as oracle. Archive the old documentation with a note explaining why it was superseded.' },
          ].map(({ label, content }, i) => (
            <Step key={i} active>
              <StepLabel><Typography sx={{ fontWeight: 700 }}>{label}</Typography></StepLabel>
              <StepContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{content}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>The ADR — Architecture Decision Record</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          This is the artifact that prevents the conflict from recurring. Every future developer who touches this rule reads the ADR first.
        </Typography>
        <CodeBlock code={ADR_TEMPLATE} language="markdown" label="ADR-042 — Billing Ground Truth Decision" />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Controls & AI Role</Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Preventing informal decisions', desc: 'No rule change is valid without an ADR. The ADR template is part of the repo. CI pipeline blocks PRs that modify billing logic without an associated ADR file.' },
            { title: 'Who approves', desc: 'Product Owner has final approval on business rules. Tech Lead approves implementation. Both signatures required. No single person decides alone.' },
            { title: 'AI can assist — not decide', desc: 'AI can analyze log patterns, summarize SP logic, and draft the ADR. It cannot determine which version is correct — that requires business context and client confirmation that no LLM has access to.' },
            { title: 'From ADR to tests', desc: 'The approved ADR\'s "Decision" section becomes the test specification. Each bullet point in the decision maps to at least one automated test case.' },
          ].map(({ title, desc }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

    </PageShell>
  )
}
