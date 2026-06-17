'use client'
import { Box, Typography, Grid2 as Grid, Chip, Divider, Alert, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'

const TOOLS = {
  sst: 'SQL Server Management Studio · Azure Data Studio · SchemaSpy · Mermaid.js · GitHub Copilot · Claude · Cursor',
  mern: 'MySQL Workbench · DBeaver · SchemaSpy · Mermaid.js · GitHub Copilot · ChatGPT',
  dotnet: 'SQL Server Management Studio · EF Core reverse scaffold · ReSharper · dotnet-doc · GitHub Copilot',
}

const QUERY_SAMPLE = {
  sst: `-- Map stored procedure dependencies
SELECT
  OBJECT_NAME(referencing_id) AS caller,
  OBJECT_NAME(referenced_id)  AS callee,
  type_desc
FROM sys.sql_expression_dependencies
WHERE OBJECT_NAME(referencing_id) LIKE '%billing%'
ORDER BY caller;`,
  mern: `-- Map stored procedure dependencies (MySQL)
SELECT
  ROUTINE_NAME,
  ROUTINE_TYPE,
  CREATED,
  LAST_ALTERED
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = 'erp_db'
  AND ROUTINE_NAME LIKE '%billing%';`,
  dotnet: `-- Map stored procedure dependencies (SQL Server)
SELECT
  o.name AS procedure_name,
  d.referenced_entity_name AS depends_on,
  d.referenced_class_desc
FROM sys.objects o
JOIN sys.sql_expression_dependencies d ON d.referencing_id = o.object_id
WHERE o.type = 'P' AND o.name LIKE '%Billing%'
ORDER BY o.name;`,
}

export default function Q1() {
  const { stack } = useStack()
  return (
    <PageShell q="Q1" title="Reverse Engineering a Legacy Module" subtitle="The billing module: 150 tables, 300 stored procedures, 50 integrations, no updated documentation. Where do you start?">

      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <strong>Key principle:</strong> You never touch the code first. You build a map of what exists, then validate it against real behavior. Documentation that doesn't match production is worse than no documentation.
      </Alert>

      {/* Step 1 — What to gather first */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. What to Gather First</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Before reading a single line of code, gather context. The order matters — start with people, then process, then data, then code.
        </Typography>
        <Grid container spacing={2}>
          {[
            { order: '1', title: 'Tribal knowledge sessions', desc: 'Interview developers, support, and analysts. Ask: "What breaks most often? What are you afraid to touch? Which clients are the most different?"', who: 'Dev + Support + Analyst' },
            { order: '2', title: 'Production database schema', desc: 'Export all table definitions, indexes, FKs, and constraints. Count rows per table — high-volume tables are usually core business entities.', who: 'DBA + Dev' },
            { order: '3', title: 'All stored procedures', desc: 'Extract full text of all 300 SPs. Sort by execution frequency using DMVs. The top 20 most-called SPs are your critical path.', who: 'DBA' },
            { order: '4', title: 'Client configuration tables', desc: 'Find tables that contain per-client flags, rules, or parameters. These define where the customization lives.', who: 'Dev + Analyst' },
            { order: '5', title: 'Integration endpoints', desc: 'Catalog all outbound/inbound connections: HTTP endpoints, file paths, FTP targets, SFTP, bank APIs. Map direction and owner.', who: 'Dev + Ops' },
            { order: '6', title: 'WebForms screen inventory', desc: 'List all .aspx screens in the billing module. Group by functional area. Identify which screens have code-behind logic vs. pure display.', who: 'Dev' },
          ].map(item => (
            <Grid key={item.order} size={{ xs: 12, md: 6 }}>
              <ArtifactCard number={item.order} title={item.title} who={item.who}>{item.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Step 2 — Artifacts */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Technical & Functional Artifacts — Creation Order</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Order</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Artifact</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Purpose</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Validated by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ['1', 'Entity Relationship Diagram (ERD)', 'Visual map of 150 tables and their relationships', 'DBA + Dev'],
              ['2', 'SP Dependency Graph', 'Which SPs call which tables and other SPs', 'Dev'],
              ['3', 'Process Flow Diagram', 'Step-by-step billing lifecycle from trigger to output', 'Analyst + Business'],
              ['4', 'Business Rules Catalog', 'Each rule, its source (SP/code/table), and client variants', 'Analyst + Dev + Support'],
              ['5', 'Integration Map', 'All 50 integrations with direction, protocol, and owner', 'Dev + Ops'],
              ['6', 'Client Customization Matrix', 'Per-client exceptions mapped to rules and tables', 'Analyst + Business'],
              ['7', 'Data Flow Diagram (DFD)', 'Where data enters, transforms, and exits the module', 'Dev + DBA'],
              ['8', 'Screen Inventory', 'All WebForms with code-behind logic annotated', 'Dev'],
            ].map(([order, artifact, purpose, validator]) => (
              <TableRow key={order} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                <TableCell><Chip label={order} size="small" sx={{ bgcolor: 'rgba(79,195,247,0.1)', color: 'primary.main', fontWeight: 700 }} /></TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{artifact}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>{purpose}</TableCell>
                <TableCell><Chip label={validator} size="small" variant="outlined" sx={{ fontSize: '0.72rem' }} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Tools */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          4. Tools — <Box component="span" sx={{ color: 'primary.main' }}>{stack.label}</Box>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{TOOLS[stack.id]}</Typography>

        <CodeBlock
          code={QUERY_SAMPLE[stack.id]}
          language="sql"
          label="SP Dependency Query — identifies which stored procedures call which objects"
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* AI Role */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>6 & 7. AI Assistance — With Guardrails</Typography>
        <Grid container spacing={2}>
          {[
            { title: '✅ AI can do', items: ['Summarize stored procedure logic into plain English', 'Generate ERD drafts from schema DDL', 'Suggest business rule categories from SP names', 'Flag duplicate logic across SPs', 'Draft initial documentation from code comments'] },
            { title: '🛑 AI must NOT do', items: ['Confirm business rules without human validation', 'Decide which SPs are safe to deprecate', 'Interpret client-specific exceptions from code alone', 'Replace interviews with tribal knowledge holders', 'Auto-generate migration scripts without review'] },
          ].map(({ title, items }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {items.map(i => <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>{i}</Typography>)}
                </Box>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

    </PageShell>
  )
}
