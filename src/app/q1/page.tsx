'use client'
import { Box, Typography, Grid2 as Grid, Chip, Divider, Alert, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'
import { useLang } from '@/context/LangContext'
import { q1 } from '@/translations/q1q2'

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
SELECT ROUTINE_NAME, ROUTINE_TYPE, CREATED, LAST_ALTERED
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = 'erp_db'
  AND ROUTINE_NAME LIKE '%billing%';`,
  dotnet: `-- Map stored procedure dependencies (SQL Server)
SELECT o.name AS procedure_name, d.referenced_entity_name AS depends_on
FROM sys.objects o
JOIN sys.sql_expression_dependencies d ON d.referencing_id = o.object_id
WHERE o.type = 'P' AND o.name LIKE '%Billing%'
ORDER BY o.name;`,
}

export default function Q1() {
  const { stack } = useStack()
  const { lang } = useLang()

  return (
    <PageShell q={q1.shell.q[lang]} title={q1.shell.title[lang]} subtitle={q1.shell.subtitle[lang]}>
      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q1.alert[lang] }} />
      </Alert>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q1.step1Title[lang]}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{q1.step1Body[lang]}</Typography>
        <Grid container spacing={2}>
          {q1.gather[lang].map((item) => (
            <Grid key={item.order} size={{ xs: 12, md: 6 }}>
              <ArtifactCard number={item.order} title={item.title} who={item.who}>{item.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q1.step2Title[lang]}</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              {q1.tableHeaders[lang].map((h: string) => (
                <TableCell key={h} sx={{ fontWeight: 700, color: h === q1.tableHeaders[lang][0] ? 'primary.main' : 'inherit' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {q1.artifacts[lang].map(([order, artifact, purpose, validator]: string[]) => (
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

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {q1.toolsTitle[lang]} — <Box component="span" sx={{ color: 'primary.main' }}>{stack.label}</Box>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{TOOLS[stack.id]}</Typography>
        <CodeBlock code={QUERY_SAMPLE[stack.id]} language="sql" label={q1.toolsLabel[lang]} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q1.aiTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q1.ai[lang].map((item: { title: string; items: string[] }) => (
            <Grid key={item.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={item.title}>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {item.items.map((i: string) => <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>{i}</Typography>)}
                </Box>
              </ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageShell>
  )
}
