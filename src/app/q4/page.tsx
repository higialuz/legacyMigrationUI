'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert, Stepper, Step, StepLabel, StepContent } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useLang } from '@/context/LangContext'
import { q4 } from '@/translations/q3q4q5'

const ADR_EN = `# ADR-042: Billing Fee Calculation — Ground Truth
**Date:** 2025-01-15  **Status:** Approved  **Approver:** Head of Product + Tech Lead

## Context
Four conflicting versions of the billing fee rule were found:
- Analyst doc: flat 10% on gross amount
- Application code: 10% on net after deductions
- Stored procedure sp_CalcBilling: tiered rate based on volume
- Production observation: tiered, but with a floor of R$50

## Decision
**Ground truth is the stored procedure behavior as observed in production.**
Rationale: production has been running for 7 years without client complaints.

## Evidence
- 6 months of production logs analyzed (2024-07-01 to 2024-12-31)
- 3 clients interviewed — all confirmed tiered behavior

## Consequences
- Analyst documentation will be updated to reflect SP behavior
- New implementation must produce identical output to sp_CalcBilling`

const ADR_PT = `# ADR-042: Cálculo de Taxa de Faturamento — Verdade
**Data:** 2025-01-15  **Status:** Aprovado  **Aprovador:** Head de Produto + Tech Lead

## Contexto
Quatro versões conflitantes da regra de taxa de faturamento foram encontradas:
- Doc do analista: 10% fixo sobre o valor bruto
- Código da aplicação: 10% sobre o valor líquido após deduções
- Stored procedure sp_CalcBilling: taxa escalonada por volume
- Observação em produção: escalonada, mas com mínimo de R$50

## Decisão
**A verdade é o comportamento da stored procedure observado em produção.**
Justificativa: a produção roda há 7 anos sem reclamações de clientes.

## Evidências
- 6 meses de logs de produção analisados (2024-07-01 a 2024-12-31)
- 3 clientes entrevistados — todos confirmaram comportamento escalonado

## Consequências
- A documentação do analista será atualizada para refletir o comportamento da SP
- A nova implementação deve produzir resultado idêntico ao sp_CalcBilling`

export default function Q4() {
  const { lang } = useLang()
  return (
    <PageShell q={q4.shell.q[lang]} title={q4.shell.title[lang]} subtitle={q4.shell.subtitle[lang]}>
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q4.alert[lang] }} />
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>{q4.processTitle[lang]}</Typography>
        <Stepper orientation="vertical">
          {q4.steps[lang].map((s: { label: string; content: string }, i: number) => (
            <Step key={i} active>
              <StepLabel><Typography sx={{ fontWeight: 700 }}>{s.label}</Typography></StepLabel>
              <StepContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{s.content}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q4.adrTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q4.adrBody[lang]}</Typography>
        <CodeBlock code={lang === 'en' ? ADR_EN : ADR_PT} language="markdown" label={q4.adrLabel[lang]} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q4.controlsTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q4.controls[lang].map((c: { title: string; desc: string }) => (
            <Grid key={c.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={c.title}>{c.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageShell>
  )
}
