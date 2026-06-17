'use client'
import { Box, Typography, Grid2 as Grid, Chip, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useLang } from '@/context/LangContext'
import { q5 } from '@/translations/q3q4q5'

const PROMPT_EN = `# ERP Knowledge Agent — System Prompt
You are a technical assistant for the dental insurance ERP billing module.

## Rules:
1. NEVER confirm a business rule without citing its source document and version
2. ALWAYS flag client-specific exceptions
3. NEVER generate migration scripts — surface the relevant SP, let the engineer decide
4. State confidence: HIGH / MEDIUM / LOW
5. LOW confidence = escalate to engineering team

## Never decide alone:
- Whether a SP is safe to deprecate
- Which client will be impacted by a rule change
- Whether a code change is backward compatible`

const PROMPT_PT = `# Agente de Conhecimento ERP — System Prompt
Você é um assistente técnico para o módulo de faturamento do ERP odontológico.

## Regras:
1. NUNCA confirme uma regra de negócio sem citar o documento fonte e versão
2. SEMPRE sinalize exceções por cliente
3. NUNCA gere scripts de migração — apresente a SP relevante, deixe o engenheiro decidir
4. Informe confiança: ALTA / MÉDIA / BAIXA
5. Confiança BAIXA = escale para a equipe de engenharia

## Nunca decida sozinho:
- Se uma SP é segura para deprecar
- Qual cliente será impactado por uma mudança de regra
- Se uma mudança de código é retrocompatível`

export default function Q5() {
  const { lang } = useLang()
  return (
    <PageShell q={q5.shell.q[lang]} title={q5.shell.title[lang]} subtitle={q5.shell.subtitle[lang]}>
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q5.alert[lang] }} />
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q5.kbTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q5.kb[lang].map((tier: { title: string; color: string; items: string[] }) => (
            <Grid key={tier.title} size={{ xs: 12, sm: 6 }}>
              <ArtifactCard title={tier.title} color={tier.color}>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {tier.items.map((i: string) => <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary', mb: 0.3 }}>{i}</Typography>)}
                </Box>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{q5.promptTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q5.promptBody[lang]}</Typography>
        <CodeBlock code={lang === 'en' ? PROMPT_EN : PROMPT_PT} language="markdown" label={q5.promptLabel[lang]} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q5.controlsTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q5.controls[lang].map((c: { title: string; desc: string }) => (
            <Grid key={c.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={c.title}>{c.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{q5.docsTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q5.docsBody[lang]}</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {(q5.docsChips[lang] as string[]).map((step: string, i: number) => (
            <Chip key={step} label={`${i + 1}. ${step}`} variant="outlined" sx={{ borderColor: 'rgba(79,195,247,0.3)', color: 'primary.main' }} />
          ))}
        </Box>
      </Box>
    </PageShell>
  )
}
