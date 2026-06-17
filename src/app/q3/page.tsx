'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'

const CODE = {
  sst: {
    strategy: `// billing/rules/BillingRule.ts
export interface BillingContext {
  clientId: string
  invoiceAmount: number
  params: Record<string, unknown>
}

export abstract class BillingRule {
  abstract calculate(ctx: BillingContext): number
  abstract ruleId(): string
}

// Default rule — used by most clients
export class DefaultBillingRule extends BillingRule {
  ruleId() { return 'DEFAULT' }
  calculate({ invoiceAmount }: BillingContext) {
    return invoiceAmount * 0.1 // 10% standard fee
  }
}

// Client B — flat fee above threshold
export class ClientBBillingRule extends BillingRule {
  ruleId() { return 'CLIENT_B' }
  calculate({ invoiceAmount }: BillingContext) {
    return invoiceAmount > 10000 ? 800 : invoiceAmount * 0.09
  }
}

// Client C — default with a config parameter
export class ParametricBillingRule extends DefaultBillingRule {
  ruleId() { return 'PARAMETRIC' }
  calculate(ctx: BillingContext) {
    const rate = (ctx.params.feeRate as number) ?? 0.1
    return ctx.invoiceAmount * rate
  }
}`,
    registry: `// billing/rules/RuleRegistry.ts
import { BillingRule, DefaultBillingRule, ClientBBillingRule, ParametricBillingRule } from './BillingRule'

const REGISTRY: Record<string, () => BillingRule> = {
  DEFAULT:     () => new DefaultBillingRule(),
  CLIENT_B:    () => new ClientBBillingRule(),
  PARAMETRIC:  () => new ParametricBillingRule(),
}

export function getRuleForClient(ruleId: string): BillingRule {
  const factory = REGISTRY[ruleId] ?? REGISTRY['DEFAULT']
  return factory()
}`,
  },
  mern: {
    strategy: `// billing/rules/billingRule.js
class BillingRule {
  ruleId() { return 'BASE' }
  calculate(context) { throw new Error('Not implemented') }
}

class DefaultBillingRule extends BillingRule {
  ruleId() { return 'DEFAULT' }
  calculate({ invoiceAmount }) {
    return invoiceAmount * 0.1
  }
}

class ClientBBillingRule extends BillingRule {
  ruleId() { return 'CLIENT_B' }
  calculate({ invoiceAmount }) {
    return invoiceAmount > 10000 ? 800 : invoiceAmount * 0.09
  }
}

class ParametricBillingRule extends DefaultBillingRule {
  ruleId() { return 'PARAMETRIC' }
  calculate(ctx) {
    const rate = ctx.params?.feeRate ?? 0.1
    return ctx.invoiceAmount * rate
  }
}

module.exports = { DefaultBillingRule, ClientBBillingRule, ParametricBillingRule }`,
    registry: `// billing/rules/ruleRegistry.js
const { DefaultBillingRule, ClientBBillingRule, ParametricBillingRule } = require('./billingRule')

const REGISTRY = {
  DEFAULT:    () => new DefaultBillingRule(),
  CLIENT_B:   () => new ClientBBillingRule(),
  PARAMETRIC: () => new ParametricBillingRule(),
}

function getRuleForClient(ruleId) {
  return (REGISTRY[ruleId] ?? REGISTRY['DEFAULT'])()
}

module.exports = { getRuleForClient }`,
  },
  dotnet: {
    strategy: `// Billing/Rules/BillingRule.cs
public abstract class BillingRule
{
    public abstract string RuleId { get; }
    public abstract decimal Calculate(BillingContext ctx);
}

public class DefaultBillingRule : BillingRule
{
    public override string RuleId => "DEFAULT";
    public override decimal Calculate(BillingContext ctx)
        => ctx.InvoiceAmount * 0.1m;
}

public class ClientBBillingRule : BillingRule
{
    public override string RuleId => "CLIENT_B";
    public override decimal Calculate(BillingContext ctx)
        => ctx.InvoiceAmount > 10000m ? 800m : ctx.InvoiceAmount * 0.09m;
}

public class ParametricBillingRule : DefaultBillingRule
{
    public override string RuleId => "PARAMETRIC";
    public override decimal Calculate(BillingContext ctx)
    {
        var rate = ctx.Params.TryGetValue("feeRate", out var r) ? (decimal)r : 0.1m;
        return ctx.InvoiceAmount * rate;
    }
}`,
    registry: `// Billing/Rules/RuleRegistry.cs
public class RuleRegistry
{
    private readonly Dictionary<string, Func<BillingRule>> _rules = new()
    {
        ["DEFAULT"]    = () => new DefaultBillingRule(),
        ["CLIENT_B"]   = () => new ClientBBillingRule(),
        ["PARAMETRIC"] = () => new ParametricBillingRule(),
    };

    public BillingRule GetRuleForClient(string ruleId)
        => (_rules.TryGetValue(ruleId, out var factory)
            ? factory
            : _rules["DEFAULT"])();
}`,
  },
}

const LANG = { sst: 'typescript', mern: 'javascript', dotnet: 'csharp' }

export default function Q3() {
  const { stack } = useStack()
  const code = CODE[stack.id]
  const lang = LANG[stack.id]

  return (
    <PageShell q="Q3" title="Refactoring a Multi-client Business Rule" subtitle="The billing rule exists in 4 variations across 70+ clients. Part is in stored procedures, part in application code. How do you model this without creating a maintenance nightmare?">

      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <strong>The anti-pattern to avoid:</strong> A single SP or function with <code>IF @ClientId = 'X' THEN ... ELSE IF @ClientId = 'B' THEN ...</code> — this is the exact problem we are solving. Every new client exception makes the condition tree deeper and more fragile.
      </Alert>

      {/* Strategy */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Architectural Strategy — Strategy Pattern</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Each client's billing rule becomes a concrete implementation of a shared interface. A registry maps client configuration to the correct rule class.
          Adding a new client variant requires zero changes to existing rules.
        </Typography>
        <Grid container spacing={2}>
          {[
            { client: 'Client A', rule: 'DefaultBillingRule', desc: 'Uses standard 10% fee — no custom class needed.' },
            { client: 'Client B', rule: 'ClientBBillingRule', desc: 'Flat fee above threshold — concrete override.' },
            { client: 'Client C', rule: 'ParametricBillingRule', desc: 'Default rate but pulled from client config table.' },
            { client: 'Client X', rule: 'ClientXBillingRule', desc: 'Custom exceptions — isolated, no cross-impact.' },
            { client: 'New clients', rule: 'DefaultBillingRule', desc: 'Falls back to default unless explicitly configured.' },
          ].map(({ client, rule, desc }) => (
            <Grid key={client} size={{ xs: 12, sm: 6 }}>
              <ArtifactCard title={client} color="#ce93d8">
                <Typography variant="body2" sx={{ color: 'primary.main', fontFamily: 'monospace', mb: 0.5 }}>{rule}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{desc}</Typography>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Code */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          2. Class Structure — <Box component="span" sx={{ color: 'primary.main' }}>{stack.label}</Box>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CodeBlock code={code.strategy} language={lang} label="Rule hierarchy — abstract base + concrete implementations" />
          <CodeBlock code={code.registry} language={lang} label="Rule registry — maps client config to rule class" />
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Principles */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3–7. Design Principles</Typography>
        <Grid container spacing={2}>
          {[
            { title: 'When to use inheritance', desc: 'Only when the child IS the parent with a genuine specialization (ParametricRule extends Default). Avoid if it\'s just "similar but different" — use composition instead.' },
            { title: 'Client configuration strategy', desc: 'Store rule ID in a client_config table. The application looks up the rule ID at runtime — no hardcoded client checks in business logic.' },
            { title: 'Versioning business rules', desc: 'Each rule class is immutable once deployed. New behavior = new class + new version. Old rule stays for audit. Migration script updates client_config.' },
            { title: 'Testing each variation', desc: 'Each rule class has its own unit test file. Integration tests cover the registry lookup. A test matrix asserts each client gets the expected rule and result.' },
            { title: 'Documenting the decision', desc: 'An Architecture Decision Record (ADR) is created: context, options considered, decision, consequences. Stored in the repo alongside the code.' },
          ].map(({ title, desc }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 2, p: 2.5, borderRadius: 2, border: '1px solid rgba(79,195,247,0.3)', bgcolor: 'rgba(79,195,247,0.05)', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
          This billing rule engine is running live on AWS Lambda. Select a client, enter an amount, and see the Strategy Pattern resolve the rule in real time.
        </Typography>
        <Box component="a" href="/demo" 
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.main', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          ▶ Try it live on AWS →
        </Box>
      </Box>

    </PageShell>
  )
}
