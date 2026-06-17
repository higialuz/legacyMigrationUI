'use client'
import { Box, Typography, Grid2 as Grid, Divider, Alert, Chip } from '@mui/material'
import PageShell from '@/components/PageShell'
import ArtifactCard from '@/components/ArtifactCard'
import CodeBlock from '@/components/CodeBlock'
import { useStack } from '@/context/StackContext'

const INFRA_CODE = {
  sst: `// sst.config.ts — Strangler Fig routing
export default $config({
  app(input) {
    return { name: 'erp-migration', removal: 'retain' }
  },
  async run() {
    // New module — billing (refactored)
    const billingApi = new sst.aws.Function('BillingApi', {
      handler: 'packages/billing/src/handler.handler',
      url: true,
    })

    // Feature flag — controls traffic split
    const router = new sst.aws.Router('ErpRouter', {
      routes: {
        // Refactored modules go to new Lambda
        '/api/billing/*': billingApi.url,
        // Everything else still hits legacy IIS
        '/*': process.env.LEGACY_IIS_URL,
      },
    })

    return { router: router.url }
  },
})`,
  mern: `// nginx.conf — Strangler Fig proxy (Express behind Nginx)
upstream legacy_iis {
  server 10.0.1.10:80;  # existing IIS server
}

upstream new_billing {
  server 10.0.1.20:3000;  # new Express service
}

server {
  listen 80;

  # Refactored: route to new service
  location /api/billing/ {
    proxy_pass http://new_billing;
    proxy_set_header X-Client-Id $http_x_client_id;
  }

  # Legacy: everything else to IIS
  location / {
    proxy_pass http://legacy_iis;
  }
}`,
  dotnet: `// Program.cs — .NET 9 YARP reverse proxy (Strangler Fig)
builder.Services.AddReverseProxy()
    .LoadFromMemory(new[]
    {
        new RouteConfig
        {
            RouteId = "billing-new",
            ClusterId = "new-billing",
            Match = new RouteMatch { Path = "/api/billing/{**catch-all}" }
        },
        new RouteConfig
        {
            RouteId = "legacy-fallback",
            ClusterId = "legacy-iis",
            Match = new RouteMatch { Path = "/{**catch-all}" }
        },
    }, new[]
    {
        new ClusterConfig { ClusterId = "new-billing",
            Destinations = new { d = new { Address = "http://new-service/" } } },
        new ClusterConfig { ClusterId = "legacy-iis",
            Destinations = new { d = new { Address = "http://legacy-iis/" } } },
    });`,
}

const LANG = { sst: 'typescript', mern: 'nginx', dotnet: 'csharp' }

export default function Q7() {
  const { stack } = useStack()
  return (
    <PageShell q="Q7" title="Transitional Architecture" subtitle="Legacy VB.NET + SQL Server and modern cloud-native coexisting without downtime, with rollback at every step.">

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <strong>Pattern: Strangler Fig.</strong> Named after the fig tree that grows around an existing tree, gradually replacing it.
        The legacy system runs fully in production. New modules are deployed alongside it. A routing layer directs traffic.
        At no point is there a "big bang" switch. Each module migration is individually reversible.
      </Alert>

      {/* Architecture diagram */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>High-Level Architecture — Coexistence Strategy</Typography>
        <Box sx={{ bgcolor: '#0d1628', borderRadius: 2, p: 3, border: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto' }}>
          <svg viewBox="0 0 780 460" style={{ width: '100%', maxWidth: 780, display: 'block', margin: '0 auto' }}>
            {/* Clients */}
            <rect x="10" y="190" width="120" height="80" rx="8" fill="#1a2744" stroke="#4fc3f7" strokeWidth="1.5" />
            <text x="70" y="225" textAnchor="middle" fill="#4fc3f7" fontSize="12" fontWeight="700">70+ Clients</text>
            <text x="70" y="243" textAnchor="middle" fill="#8a9bb5" fontSize="10">Browser / API</text>
            <text x="70" y="258" textAnchor="middle" fill="#8a9bb5" fontSize="10">Integrations</text>

            {/* Arrow to router */}
            <line x1="130" y1="230" x2="175" y2="230" stroke="#4fc3f7" strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Router/Proxy */}
            <rect x="175" y="165" width="130" height="130" rx="8" fill="#1a3333" stroke="#4fc3f7" strokeWidth="2" />
            <text x="240" y="195" textAnchor="middle" fill="#4fc3f7" fontSize="11" fontWeight="700">Smart Router</text>
            <text x="240" y="212" textAnchor="middle" fill="#8a9bb5" fontSize="9">CloudFront / Nginx</text>
            <text x="240" y="228" textAnchor="middle" fill="#66bb6a" fontSize="9">Feature Flags</text>
            <text x="240" y="243" textAnchor="middle" fill="#ffa726" fontSize="9">/api/billing → NEW</text>
            <text x="240" y="258" textAnchor="middle" fill="#8a9bb5" fontSize="9">/* → LEGACY</text>
            <text x="240" y="273" textAnchor="middle" fill="#8a9bb5" fontSize="9">Rollback: config only</text>

            {/* Arrow to legacy */}
            <line x1="305" y1="205" x2="380" y2="160" stroke="#8a9bb5" strokeWidth="1.5" markerEnd="url(#arrowGray)" strokeDasharray="5,3" />
            {/* Arrow to new */}
            <line x1="305" y1="260" x2="380" y2="300" stroke="#66bb6a" strokeWidth="2" markerEnd="url(#arrowGreen)" />

            {/* Legacy ERP */}
            <rect x="380" y="80" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#8a9bb5" strokeWidth="1.5" />
            <text x="460" y="108" textAnchor="middle" fill="#8a9bb5" fontSize="11" fontWeight="700">Legacy ERP</text>
            <text x="460" y="125" textAnchor="middle" fill="#8a9bb5" fontSize="9">VB.NET WebForms</text>
            <text x="460" y="140" textAnchor="middle" fill="#8a9bb5" fontSize="9">IIS + Windows Server</text>
            <rect x="400" y="152" width="120" height="24" rx="4" fill="#2a1a1a" stroke="#8a9bb5" strokeWidth="1" />
            <text x="460" y="168" textAnchor="middle" fill="#ffa726" fontSize="9">SQL Server — Shared DB</text>
            <text x="460" y="194" textAnchor="middle" fill="#8a9bb5" fontSize="9">.NET REST APIs</text>
            <text x="460" y="210" textAnchor="middle" fill="#8a9bb5" fontSize="9">Stored Procedures</text>
            <text x="460" y="226" textAnchor="middle" fill="#8a9bb5" fontSize="9">50 Integrations</text>

            {/* New Services */}
            <rect x="380" y="265" width="160" height="150" rx="8" fill="#0d2211" stroke="#66bb6a" strokeWidth="1.5" />
            <text x="460" y="292" textAnchor="middle" fill="#66bb6a" fontSize="11" fontWeight="700">New Services</text>
            <text x="460" y="309" textAnchor="middle" fill="#8a9bb5" fontSize="9">{stack.frontend}</text>
            <text x="460" y="325" textAnchor="middle" fill="#8a9bb5" fontSize="9">{stack.backend}</text>
            <text x="460" y="341" textAnchor="middle" fill="#8a9bb5" fontSize="9">{stack.infra}</text>
            <text x="460" y="358" textAnchor="middle" fill="#4fc3f7" fontSize="9">Anti-corruption Layer</text>
            <text x="460" y="374" textAnchor="middle" fill="#4fc3f7" fontSize="9">→ Adapts legacy DB calls</text>
            <text x="460" y="390" textAnchor="middle" fill="#66bb6a" fontSize="9">Read legacy DB (shared)</text>
            <text x="460" y="405" textAnchor="middle" fill="#66bb6a" fontSize="9">Dual-write during migration</text>

            {/* DB arrow from new services */}
            <line x1="460" y1="245" x2="460" y2="265" stroke="#ffa726" strokeWidth="1.5" strokeDasharray="4,3" />

            {/* Observability */}
            <rect x="570" y="165" width="130" height="110" rx="8" fill="#1a1a0d" stroke="#ffa726" strokeWidth="1.5" />
            <text x="635" y="192" textAnchor="middle" fill="#ffa726" fontSize="11" fontWeight="700">Observability</text>
            <text x="635" y="209" textAnchor="middle" fill="#8a9bb5" fontSize="9">Structured Logs</text>
            <text x="635" y="224" textAnchor="middle" fill="#8a9bb5" fontSize="9">Distributed Tracing</text>
            <text x="635" y="239" textAnchor="middle" fill="#8a9bb5" fontSize="9">Metrics + Alerts</text>
            <text x="635" y="254" textAnchor="middle" fill="#8a9bb5" fontSize="9">Support Dashboard</text>
            <text x="635" y="269" textAnchor="middle" fill="#8a9bb5" fontSize="9">AI Support Agent</text>

            {/* Arrows to observability */}
            <line x1="540" y1="200" x2="570" y2="210" stroke="#ffa726" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="540" y1="330" x2="570" y2="250" stroke="#ffa726" strokeWidth="1" strokeDasharray="3,3" />

            {/* Auth */}
            <rect x="570" y="60" width="130" height="80" rx="8" fill="#1a0d2e" stroke="#ce93d8" strokeWidth="1.5" />
            <text x="635" y="88" textAnchor="middle" fill="#ce93d8" fontSize="11" fontWeight="700">Auth Layer</text>
            <text x="635" y="105" textAnchor="middle" fill="#8a9bb5" fontSize="9">JWT / OAuth 2.0</text>
            <text x="635" y="120" textAnchor="middle" fill="#8a9bb5" fontSize="9">Multi-tenant isolation</text>
            <text x="635" y="135" textAnchor="middle" fill="#8a9bb5" fontSize="9">Client-scoped tokens</text>

            {/* Arrow markers */}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#4fc3f7" />
              </marker>
              <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#8a9bb5" />
              </marker>
              <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#66bb6a" />
              </marker>
            </defs>

            {/* Legend */}
            <rect x="10" y="400" width="340" height="50" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />
            <line x1="25" y1="420" x2="55" y2="420" stroke="#66bb6a" strokeWidth="2" />
            <text x="60" y="424" fill="#8a9bb5" fontSize="10">Refactored path</text>
            <line x1="25" y1="440" x2="55" y2="440" stroke="#8a9bb5" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="60" y="444" fill="#8a9bb5" fontSize="10">Legacy path (unchanged)</text>
            <line x1="170" y1="420" x2="200" y2="420" stroke="#ffa726" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="205" y="424" fill="#8a9bb5" fontSize="10">Shared DB (dual-write)</text>
          </svg>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Infra code */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Routing Configuration — <Box component="span" sx={{ color: 'primary.main' }}>{stack.label}</Box>
        </Typography>
        <CodeBlock code={INFRA_CODE[stack.id]} language={LANG[stack.id]} label={`Strangler Fig proxy — ${stack.label}`} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* Key decisions */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Key Architectural Decisions</Typography>
        <Grid container spacing={2}>
          {[
            { title: 'No big-bang rewrite', desc: 'Modules are migrated one at a time, behind the router. Legacy runs in production throughout. There is no "migration week" where everything is frozen.' },
            { title: 'Shared database — temporary', desc: 'New services read from the legacy SQL Server via an anti-corruption layer during migration. Dual-write ensures data consistency. New schema is introduced incrementally.' },
            { title: 'First module selection', desc: 'Pick the module with: highest pain (most bugs/support tickets), lowest coupling (fewest dependencies on other modules), and a clear business owner who will validate it.' },
            { title: 'Rollback = router config change', desc: 'To roll back any module, flip the router to send that path to legacy. No code deployment, no DB migration reversal. 30-second rollback.' },
            { title: 'Client-group deployment', desc: 'Deploy to 1 internal test client → 3 low-risk clients → remaining clients. Each group runs for 2 weeks before next group. Issues are isolated.' },
            { title: 'Success metrics', desc: 'Error rate parity with legacy (≤ legacy baseline), support ticket volume, processing time, test coverage %, and client satisfaction score.' },
          ].map(({ title, desc }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <ArtifactCard title={title}>{desc}</ArtifactCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 2, p: 2.5, borderRadius: 2, border: '1px solid rgba(79,195,247,0.3)', bgcolor: 'rgba(79,195,247,0.05)', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
          The Strangler Fig router is running live — toggle the feature flag and send requests to see traffic switch between the legacy IIS simulation and the new Lambda service.
        </Typography>
        <Box component="a" href="/demo" 
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.main', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          ▶ Try it live on AWS →
        </Box>
      </Box>

    </PageShell>
  )
}
