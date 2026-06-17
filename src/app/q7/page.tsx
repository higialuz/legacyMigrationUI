'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'
import { useLang } from '@/context/LangContext'
import { q7 } from '@/translations/q7'

const INFRA_CODE = {
  sst: `export default $config({
  async run() {
    const billingApi = new sst.aws.Function('BillingApi', {
      handler: 'packages/billing/src/handler.handler',
      url: true,
    })
    const router = new sst.aws.Router('ErpRouter', {
      routes: {
        '/api/billing/*': billingApi.url,
        '/*': process.env.LEGACY_IIS_URL,
      },
    })
    return { router: router.url }
  },
})`,
  mern: `# nginx.conf — Strangler Fig proxy
upstream legacy_iis { server 10.0.1.10:80; }
upstream new_billing { server 10.0.1.20:3000; }
server {
  location /api/billing/ { proxy_pass http://new_billing; }
  location /                { proxy_pass http://legacy_iis; }
}`,
  dotnet: `builder.Services.AddReverseProxy()
  .LoadFromMemory(new[] {
    new RouteConfig { RouteId="billing-new", ClusterId="new-billing",
      Match = new RouteMatch { Path = "/api/billing/{**catch-all}" } },
    new RouteConfig { RouteId="legacy-fallback", ClusterId="legacy-iis",
      Match = new RouteMatch { Path = "/{**catch-all}" } },
  }, clusters);`,
}
const LANG = { sst: 'typescript', mern: 'nginx', dotnet: 'csharp' }

export default function Q7() {
  const { stack } = useStack()
  const { lang } = useLang()
  return (
    <PageShell q={q7.shell.q[lang]} title={q7.shell.title[lang]} subtitle={q7.shell.subtitle[lang]}>
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: q7.alert[lang] }} />
      </Alert>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q7.diagTitle[lang]}</Typography>
        <Box sx={{ bgcolor: '#0d1628', borderRadius: 2, p: 3, border: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto' }}>
          <svg viewBox="0 0 780 460" style={{ width: '100%', maxWidth: 780, display: 'block', margin: '0 auto' }}>
            <rect x="10" y="190" width="120" height="80" rx="8" fill="#1a2744" stroke="#4fc3f7" strokeWidth="1.5" />
            <text x="70" y="225" textAnchor="middle" fill="#4fc3f7" fontSize="12" fontWeight="700">70+ Clients</text>
            <text x="70" y="243" textAnchor="middle" fill="#8a9bb5" fontSize="10">Browser / API</text>
            <line x1="130" y1="230" x2="175" y2="230" stroke="#4fc3f7" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <rect x="175" y="165" width="130" height="130" rx="8" fill="#1a3333" stroke="#4fc3f7" strokeWidth="2" />
            <text x="240" y="195" textAnchor="middle" fill="#4fc3f7" fontSize="11" fontWeight="700">Smart Router</text>
            <text x="240" y="212" textAnchor="middle" fill="#8a9bb5" fontSize="9">CloudFront / Nginx</text>
            <text x="240" y="228" textAnchor="middle" fill="#66bb6a" fontSize="9">Feature Flags</text>
            <text x="240" y="243" textAnchor="middle" fill="#ffa726" fontSize="9">/api/billing → NEW</text>
            <text x="240" y="258" textAnchor="middle" fill="#8a9bb5" fontSize="9">/* → LEGACY</text>
            <line x1="305" y1="205" x2="380" y2="160" stroke="#8a9bb5" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowGray)" />
            <line x1="305" y1="260" x2="380" y2="300" stroke="#66bb6a" strokeWidth="2" markerEnd="url(#arrowGreen)" />
            <rect x="380" y="80" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#8a9bb5" strokeWidth="1.5" />
            <text x="460" y="108" textAnchor="middle" fill="#8a9bb5" fontSize="11" fontWeight="700">Legacy ERP</text>
            <text x="460" y="125" textAnchor="middle" fill="#8a9bb5" fontSize="9">VB.NET WebForms / IIS</text>
            <text x="460" y="140" textAnchor="middle" fill="#8a9bb5" fontSize="9">SQL Server — Shared DB</text>
            <rect x="380" y="265" width="160" height="130" rx="8" fill="#0d2211" stroke="#66bb6a" strokeWidth="1.5" />
            <text x="460" y="292" textAnchor="middle" fill="#66bb6a" fontSize="11" fontWeight="700">New Services</text>
            <text x="460" y="309" textAnchor="middle" fill="#8a9bb5" fontSize="9">{stack.frontend}</text>
            <text x="460" y="325" textAnchor="middle" fill="#8a9bb5" fontSize="9">{stack.backend}</text>
            <text x="460" y="341" textAnchor="middle" fill="#8a9bb5" fontSize="9">{stack.infra}</text>
            <text x="460" y="358" textAnchor="middle" fill="#4fc3f7" fontSize="9">Anti-corruption Layer</text>
            <text x="460" y="374" textAnchor="middle" fill="#66bb6a" fontSize="9">Dual-write during migration</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#4fc3f7" /></marker>
              <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8a9bb5" /></marker>
              <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#66bb6a" /></marker>
            </defs>
          </svg>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          {q7.codeTitle[lang]} — <Box component="span" sx={{ color: 'primary.main' }}>{stack.label}</Box>
        </Typography>
        <CodeBlock code={INFRA_CODE[stack.id]} language={LANG[stack.id]} label={`Strangler Fig — ${stack.label}`} />
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{q7.decisionsTitle[lang]}</Typography>
        <Grid container spacing={2}>
          {q7.decisions[lang].map((d: { title: string; desc: string }) => (
            <Grid key={d.title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={d.title}>{d.desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 2, p: 2.5, borderRadius: 2, border: '1px solid rgba(79,195,247,0.3)', bgcolor: 'rgba(79,195,247,0.05)', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>{q7.liveText[lang]}</Typography>
        <Box component="a" href="/demo" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.main', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {q7.liveBtn[lang]}
        </Box>
      </Box>
    </PageShell>
  )
}
