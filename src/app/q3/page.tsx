'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'
import { useLang } from '@/context/LangContext'
import { q3 } from '@/translations/q3q4q5'

const CODE = {
  sst: {
    strategy: `// billing/rules/BillingRule.ts
export abstract class BillingRule {
  abstract calculate(ctx: BillingContext): number
  abstract ruleId(): string
}
export class DefaultBillingRule extends BillingRule {
  ruleId() { return 'DEFAULT' }
  calculate({ invoiceAmount }: BillingContext) { return invoiceAmount * 0.1 }
}
export class ClientBBillingRule extends BillingRule {
  ruleId() { return 'CLIENT_B' }
  calculate({ invoiceAmount }: BillingContext) {
    return invoiceAmount > 10000 ? 800 : invoiceAmount * 0.09
  }
}`,
    registry: `// billing/rules/RuleRegistry.ts
const REGISTRY: Record<string, () => BillingRule> = {
  DEFAULT:    () => new DefaultBillingRule(),
  CLIENT_B:   () => new ClientBBillingRule(),
  PARAMETRIC: () => new ParametricBillingRule(),
}
export function getRuleForClient(ruleId: string): BillingRule {
  return (REGISTRY[ruleId] ?? REGISTRY['DEFAULT'])()
}`,
  },
  mern: {
    strategy: `class DefaultBillingRule { calculate({ invoiceAmount }) { return invoiceAmount * 0.1 } }
class ClientBBillingRule { calculate({ invoiceAmount }) { return invoiceAmount > 10000 ? 800 : invoiceAmount * 0.09 } }`,
    registry: `const REGISTRY = { DEFAULT: () => new DefaultBillingRule(), CLIENT_B: () => new ClientBBillingRule() }
function getRuleForClient(ruleId) { return (REGISTRY[ruleId] ?? REGISTRY['DEFAULT'])() }`,
  },
  dotnet: {
    strategy: `public abstract class BillingRule {
  public abstract string RuleId { get; }
  public abstract decimal Calculate(BillingContext ctx);
}
public class ClientBBillingRule : BillingRule {
  public override string RuleId => "CLIENT_B";
  public override decimal Calculate(BillingContext ctx)
    => ctx.InvoiceAmount > 10000m ? 800m : ctx.InvoiceAmount * 0.09m;
}`,
    registry: `private readonly Dictionary<string, Func<BillingRule>> _rules = new()
{
  ["DEFAULT"]  = () => new DefaultBillingRule(),
  ["CLIENT_B"] = () => new ClientBBillingRule(),
};
public BillingRule GetRule(string id) => (_rules.TryGetValue(id, out var f) ? f : _rules["DEFAULT"])();`,
  },
}
const LANG = { sst: 'typescript', mern: 'javascript', dotnet: 'csharp' }

export default function Q3() {
  const { stack } = useStack()
  const { lang } = useLang()
  const code = CODE[stack.id]

  return (
    <PageShell q={q3.shell.q[lang]} title={q3.shell.title[lang]} subtitle={q3.shell.subtitle[lang]}>
      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q3.alert[lang] }} />
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q3.stratTitle[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q3.stratBody[lang]}</Typography>
        <Grid container spacing={2}>
          {q3.clients[lang].map((c: { client: string; rule: string; desc: string }) => (
            <Grid key={c.client} size={{ xs: 12, sm: 6 }}>
              <ArtifactCard title={c.client} color="#ce93d8">
                <Typography variant="body2" sx={{ color: 'primary.main', fontFamily: 'monospace', mb: 0.5 }}>{c.rule}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.desc}</Typography>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          {q3.codeTitle[lang]} — <Box component="span" sx={{ color: 'primary.main' }}>{stack.label}</Box>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CodeBlock code={code.strategy} language={LANG[stack.id]} label={q3.codeLabels[lang][0]} />
          <CodeBlock code={code.registry} language={LANG[stack.id]} label={q3.codeLabels[lang][1]} />
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q3.principlesTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q3.principles[lang].map((p: { title: string; desc: string }) => (
            <Grid key={p.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={p.title}>{p.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 2, p: 2.5, borderRadius: 2, border: '1px solid rgba(79,195,247,0.3)', bgcolor: 'rgba(79,195,247,0.05)', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>{q3.liveText[lang]}</Typography>
        <Box component="a" href="/demo" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.main', color: '#fff', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {q3.liveBtn[lang]}
        </Box>
      </Box>
    </PageShell>
  )
}
