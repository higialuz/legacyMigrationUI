'use client'
import { Box, Typography, Card, CardContent, Grid2 as Grid, Chip, Divider, Alert } from '@mui/material'
import Link from 'next/link'

const QUESTIONS = [
  { href: '/q1', q: 'Q1', title: 'Reverse Engineering', desc: 'How to analyze a 150-table billing module with no docs.' },
  { href: '/q2', q: 'Q2', title: 'Minimum Artifacts', desc: '13 artifacts that must exist before any refactoring begins.' },
  { href: '/q3', q: 'Q3', title: 'Multi-client Rules', desc: 'Strategy pattern to handle 70+ clients without spaghetti.' },
  { href: '/q4', q: 'Q4', title: 'Decision Making', desc: 'Managing conflicting truth between analyst, code, SP, and prod.' },
  { href: '/q5', q: 'Q5', title: 'AI Usage', desc: 'How to use AI agents responsibly — with guardrails.' },
  { href: '/q6', q: 'Q6', title: 'Observability', desc: 'Structured logging, tracing, and alerts for support teams.' },
  { href: '/q7', q: 'Q7', title: 'Transitional Architecture', desc: 'Strangler Fig — legacy and modern coexisting without downtime.' },
  { href: '/q8', q: 'Q8', title: 'First 90 Days', desc: 'What a senior engineer does before writing a single line.' },
  { href: '/bonus', q: '★', title: 'Bonus — Eliminatory', desc: '"We can start now — AI can generate the code." Can we?' },
]

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Hero */}
      <Box sx={{ py: 2 }}>
        <Chip label="Live Showcase" size="small" sx={{ mb: 2, bgcolor: '#4fc3f7', color: '#000', fontWeight: 700 }} />
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.1 }}>
          Legacy ERP Migration<br />
          <Box component="span" sx={{ color: 'primary.main' }}>Without Stopping Production</Box>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 660, lineHeight: 1.8 }}>
          A senior engineer's structured response to migrating a 14-year-old SaaS ERP for dental insurance providers
          — 70+ clients, VB.NET WebForms, SQL Server, scattered business rules — to a modern, stateless, cloud-native stack.
          Every answer here is a living artifact, not a slide deck.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Use the <strong>stack selector above</strong> to view all code examples, architecture diagrams, and deployment strategies
        in your preferred technology combination.
      </Alert>

      {/* Context */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>The System</Typography>
        <Grid container spacing={2}>
          {[
            ['14 years', 'of accumulated evolution'],
            ['70+ clients', 'with per-client customizations'],
            ['150 tables', 'in billing module alone'],
            ['300 SPs', 'poorly documented stored procedures'],
            ['50 integrations', 'banks, providers, files, APIs'],
            ['~0%', 'automated test coverage'],
          ].map(([val, label]) => (
            <Grid key={label} size={{ xs: 6, md: 4 }}>
              <Card elevation={0} sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>{val}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Migration philosophy */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Migration Philosophy</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          The objective is not a big-bang rewrite. It is a <strong>Strangler Fig</strong> — a gradual, module-by-module replacement
          where legacy and modern coexist behind a shared routing layer, with every step reversible.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['Strangler Fig Pattern', 'Dual-Write Strategy', 'Feature Flags', 'Rollback at Every Step', 'Zero Downtime', 'Living Documentation'].map(t => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderColor: 'rgba(79,195,247,0.4)', color: 'primary.main' }} />
          ))}
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Questions grid */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>8 Questions + Bonus</Typography>
        <Grid container spacing={2}>
          {QUESTIONS.map(({ href, q, title, desc }) => (
            <Grid key={href} size={{ xs: 12, sm: 6 }}>
              <Card
                elevation={0}
                component={Link}
                href={href}
                sx={{ display: 'block', textDecoration: 'none', transition: 'border-color .2s', '&:hover': { borderColor: 'primary.main' } }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Chip label={q} size="small" sx={{ mb: 1, fontWeight: 700, fontSize: '0.7rem', bgcolor: q === '★' ? '#ffa726' : 'rgba(79,195,247,0.15)', color: q === '★' ? '#000' : 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
