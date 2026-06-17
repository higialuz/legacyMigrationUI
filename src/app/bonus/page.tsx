'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'

export default function Bonus() {
  return (
    <PageShell q="★ Bonus" title="Can We Start Immediately?" subtitle={`The developer says: "We can start immediately — our AI tools can already generate the code." Do you agree?`} color="#ffa726">

      <Alert severity="error" sx={{ borderRadius: 2, border: '1px solid #ef5350' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>No. Emphatically no.</Typography>
        <Typography variant="body2">
          This statement is the most dangerous thing a developer can say on a legacy migration project.
          It conflates code generation capability with system understanding — and they are not the same thing.
          An AI tool that generates code for a system it has never seen will produce confident, compilable, wrong code.
        </Typography>
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>The Core Problem</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
          AI code generation tools are excellent at producing syntactically correct implementations of well-specified problems.
          The billing module in this scenario is not a well-specified problem.
          It is a 14-year accumulation of business rules scattered across stored procedures, code-behind, config tables, and tribal knowledge
          — with 70+ client variations and no validated documentation.
          <br /><br />
          Generating code for this system without reverse engineering it first is not acceleration. It is technical debt at machine speed.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>What Must Happen Before Development</Typography>
        <Grid container spacing={2}>
          {[
            { n: '1', title: 'Reverse engineering complete', desc: 'All 13 artifacts produced, reviewed, and signed off. If the business rules map isn\'t validated, the AI will generate code based on what the codebase looks like, not what the business actually requires.' },
            { n: '2', title: 'Ground truth established', desc: 'Every conflicting rule version (analyst doc, code, SP, production behavior) resolved into a single source of truth — via the ADR process. AI cannot resolve business ambiguity.' },
            { n: '3', title: 'Acceptance criteria written', desc: 'In Given/When/Then format, covering all client variations. These are the test oracle. AI-generated code without an oracle cannot be validated.' },
            { n: '4', title: 'Rollback plan tested', desc: 'In staging. The rollback plan must be validated before the first deployment, not designed during an incident.' },
            { n: '5', title: 'Staging environment ready', desc: 'Mirroring production structure with anonymized data. AI-generated code must be tested against realistic data volumes and client configurations.' },
          ].map(({ n, title, desc }) => (
            <Grid key={n} size={{ xs: 12, md: 6 }}>
              <ArtifactCard number={n} title={title} color="#ffa726">{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Where AI Tools Genuinely Help</Typography>
        <Grid container spacing={2}>
          {[
            { title: '✅ SP analysis', desc: 'Feed the 300 stored procedures to an AI assistant. Ask it to summarize what each one does, identify patterns, flag duplicates. This accelerates reverse engineering — it doesn\'t replace it.' },
            { title: '✅ Test generation', desc: 'Once acceptance criteria are written and validated by humans, AI can generate unit test scaffolding, test data variations, and edge case suggestions.' },
            { title: '✅ Code review', desc: 'AI reviews a human-written implementation against the business rules map and flags deviations. Catches what code review misses — not to approve, but to surface.' },
            { title: '✅ Documentation drafting', desc: 'AI drafts initial documentation from validated artifacts. Humans review and approve. Never the reverse.' },
          ].map(({ title, desc }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title} color="#66bb6a">{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Managing the Conversation</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          When a developer makes this statement, the right response is not to shut down the enthusiasm — it is to redirect it productively.
        </Typography>
        <Box sx={{ bgcolor: 'rgba(79,195,247,0.05)', borderRadius: 2, p: 3, border: '1px solid rgba(79,195,247,0.15)' }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary', lineHeight: 1.8 }}>
            "Great — the tools will save us significant time once we know what we're building.
            Let's use them right now to start analyzing the stored procedures while we complete the reverse engineering.
            That way, when we're ready to develop, the AI will have accurate context to work from
            and every line it generates will be validatable against our acceptance criteria."
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1 }}>
            — Redirects energy, preserves the process, and makes the developer a partner in the right approach.
          </Typography>
        </Box>
      </Box>

    </PageShell>
  )
}
