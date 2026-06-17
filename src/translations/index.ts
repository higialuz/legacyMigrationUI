export type Lang = 'en' | 'pt'

export const t = {
  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    title:    { en: 'ERP Migration',              pt: 'Migração ERP' },
    subtitle: { en: 'Legacy → Modern · Live Showcase', pt: 'Legado → Moderno · Demo ao Vivo' },
    nav: {
      overview: { en: 'Migration Plan',     pt: 'Plano de Migração' },
      q1:       { en: 'Reverse Engineering', pt: 'Eng. Reversa' },
      q2:       { en: 'Minimum Artifacts',   pt: 'Artefatos Mínimos' },
      q3:       { en: 'Multi-client Rules',  pt: 'Regras Multi-cliente' },
      q4:       { en: 'Decision Making',     pt: 'Tomada de Decisão' },
      q5:       { en: 'AI Usage',            pt: 'Uso de IA' },
      q6:       { en: 'Observability',       pt: 'Observabilidade' },
      q7:       { en: 'Architecture',        pt: 'Arquitetura' },
      q8:       { en: 'First 90 Days',       pt: 'Primeiros 90 Dias' },
      bonus:    { en: 'Eliminatory',         pt: 'Eliminatória' },
    },
    lightMode: { en: 'Light mode', pt: 'Modo claro' },
    darkMode:  { en: 'Dark mode',  pt: 'Modo escuro' },
  },

  // ── Homepage ──────────────────────────────────────────────────────────────
  home: {
    chip:     { en: 'Live Showcase',    pt: 'Demo ao Vivo' },
    h2a:      { en: 'Legacy ERP Migration', pt: 'Migração de ERP Legado' },
    h2b:      { en: 'Without Stopping Production', pt: 'Sem Parar a Produção' },
    intro:    {
      en: "A senior engineer's structured response to migrating a 14-year-old SaaS ERP for dental insurance providers — 70+ clients, VB.NET WebForms, SQL Server, scattered business rules — to a modern, stateless, cloud-native stack. Every answer here is a living artifact, not a slide deck.",
      pt: 'Uma resposta estruturada de um engenheiro sênior para migrar um ERP SaaS de 14 anos para operadoras de planos odontológicos — 70+ clientes, VB.NET WebForms, SQL Server, regras de negócio dispersas — para uma stack moderna, stateless e cloud-native. Cada resposta aqui é um artefato vivo, não uma apresentação.',
    },
    liveTitle: { en: 'These patterns are running on AWS right now', pt: 'Esses padrões estão rodando na AWS agora' },
    liveBtn:   { en: '▶ Try it live →', pt: '▶ Experimente ao vivo →' },
    liveItems: {
      en: ['🔀 Strangler Fig Router — live feature flag', '🧮 Billing Rules — Strategy Pattern in Lambda', '🔍 Observability — real audit log stream'],
      pt: ['🔀 Strangler Fig Router — feature flag ao vivo', '🧮 Regras de Cobrança — Strategy Pattern em Lambda', '🔍 Observabilidade — stream de log de auditoria real'],
    },
    alertInfo: {
      en: 'Use the <strong>stack selector above</strong> to view all code examples, architecture diagrams, and deployment strategies in your preferred technology combination.',
      pt: 'Use o <strong>seletor de stack acima</strong> para visualizar todos os exemplos de código, diagramas de arquitetura e estratégias de deploy na sua combinação de tecnologias preferida.',
    },
    systemTitle: { en: 'The System', pt: 'O Sistema' },
    systemStats: {
      en: [['14 years','of accumulated evolution'],['70+ clients','with per-client customizations'],['150 tables','in billing module alone'],['300 SPs','poorly documented stored procedures'],['50 integrations','banks, providers, files, APIs'],['~0%','automated test coverage']],
      pt: [['14 anos','de evolução acumulada'],['70+ clientes','com customizações por cliente'],['150 tabelas','só no módulo de faturamento'],['300 SPs','stored procedures mal documentadas'],['50 integrações','bancos, operadoras, arquivos, APIs'],['~0%','cobertura de testes automatizados']],
    },
    philTitle: { en: 'Migration Philosophy', pt: 'Filosofia de Migração' },
    philBody:  {
      en: 'The objective is not a big-bang rewrite. It is a <strong>Strangler Fig</strong> — a gradual, module-by-module replacement where legacy and modern coexist behind a shared routing layer, with every step reversible.',
      pt: 'O objetivo não é uma reescrita big-bang. É um <strong>Strangler Fig</strong> — uma substituição gradual, módulo por módulo, onde legado e moderno coexistem atrás de uma camada de roteamento compartilhada, com cada etapa reversível.',
    },
    philChips: {
      en: ['Strangler Fig Pattern','Dual-Write Strategy','Feature Flags','Rollback at Every Step','Zero Downtime','Living Documentation'],
      pt: ['Padrão Strangler Fig','Estratégia Dual-Write','Feature Flags','Rollback em Cada Etapa','Zero Downtime','Documentação Viva'],
    },
    questionsTitle: { en: '8 Questions + Bonus', pt: '8 Perguntas + Bônus' },
    questions: {
      en: [
        { href: '/q1', q: 'Q1', title: 'Reverse Engineering',       desc: 'How to analyze a 150-table billing module with no docs.' },
        { href: '/q2', q: 'Q2', title: 'Minimum Artifacts',         desc: '13 artifacts that must exist before any refactoring begins.' },
        { href: '/q3', q: 'Q3', title: 'Multi-client Rules',        desc: 'Strategy pattern to handle 70+ clients without spaghetti.' },
        { href: '/q4', q: 'Q4', title: 'Decision Making',           desc: 'Managing conflicting truth between analyst, code, SP, and prod.' },
        { href: '/q5', q: 'Q5', title: 'AI Usage',                  desc: 'How to use AI agents responsibly — with guardrails.' },
        { href: '/q6', q: 'Q6', title: 'Observability',             desc: 'Structured logging, tracing, and alerts for support teams.' },
        { href: '/q7', q: 'Q7', title: 'Transitional Architecture', desc: 'Strangler Fig — legacy and modern coexisting without downtime.' },
        { href: '/q8', q: 'Q8', title: 'First 90 Days',             desc: 'What a senior engineer does before writing a single line.' },
        { href: '/bonus', q: '★', title: 'Bonus — Eliminatory',    desc: '"We can start now — AI can generate the code." Can we?' },
      ],
      pt: [
        { href: '/q1', q: 'Q1', title: 'Engenharia Reversa',        desc: 'Como analisar um módulo de faturamento com 150 tabelas e sem docs.' },
        { href: '/q2', q: 'Q2', title: 'Artefatos Mínimos',         desc: '13 artefatos que devem existir antes de qualquer refatoração.' },
        { href: '/q3', q: 'Q3', title: 'Regras Multi-cliente',      desc: 'Strategy Pattern para 70+ clientes sem código espaguete.' },
        { href: '/q4', q: 'Q4', title: 'Tomada de Decisão',         desc: 'Gerenciando verdades conflitantes entre analista, código, SP e prod.' },
        { href: '/q5', q: 'Q5', title: 'Uso de IA',                 desc: 'Como usar agentes de IA com responsabilidade — com guardrails.' },
        { href: '/q6', q: 'Q6', title: 'Observabilidade',           desc: 'Logs estruturados, rastreamento e alertas para equipes de suporte.' },
        { href: '/q7', q: 'Q7', title: 'Arquitetura Transicional',  desc: 'Strangler Fig — legado e moderno coexistindo sem downtime.' },
        { href: '/q8', q: 'Q8', title: 'Primeiros 90 Dias',         desc: 'O que um engenheiro sênior faz antes de escrever uma linha.' },
        { href: '/bonus', q: '★', title: 'Bônus — Eliminatória',   desc: '"Podemos começar agora — a IA gera o código." Podemos?' },
      ],
    },
  },
} as const
