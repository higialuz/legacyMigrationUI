export const q8 = {
  shell: {
    q: { en: 'Q8', pt: 'Q8' },
    title: { en: 'First 90 Days', pt: 'Primeiros 90 Dias' },
    subtitle: { en: 'The board wants progress. Production cannot be at risk. Here is exactly what a senior engineer does — and what they explicitly do not do.', pt: 'O board quer progresso. A produção não pode estar em risco. Aqui está exatamente o que um engenheiro sênior faz — e o que explicitamente não faz.' },
  },
  alert: { en: '<strong>The biggest mistake:</strong> Starting to code in week 1. The first 30 days produce zero code and deliver the highest value — because they prevent 6 months of rework.', pt: '<strong>O maior erro:</strong> Começar a codificar na semana 1. Os primeiros 30 dias produzem zero código e entregam o maior valor — porque evitam 6 meses de retrabalho.' },
  phases: {
    en: [
      {
        phase: 'Days 1–30', title: 'Listen, Map, and Diagnose', color: '#4fc3f7',
        items: [
          { title:'Shadow the team', desc:'Attend stand-ups, support calls, and deployment meetings. Learn what breaks most often and who gets called at 2am.' },
          { title:'Interview everyone', desc:'Dev team, support, business analyst, product owner, DBA. Ask: "What are you most afraid of? What would you never touch?"' },
          { title:'Map the system', desc:'Produce ERD, SP dependency graph, integration map. Not to refactor — to understand. No code changes in month 1.' },
          { title:'Assess test coverage', desc:'Run coverage report. Map which critical paths have zero test coverage. This is the risk map.' },
          { title:'Deliver: Technical Diagnostic Report', desc:'A document summarizing what was found: top 5 risks, highest-pain modules, dependency map, coverage gaps. Shared with leadership.' },
        ],
      },
      {
        phase: 'Days 31–60', title: 'Design the Migration Framework', color: '#66bb6a',
        items: [
          { title:'Select pilot module', desc:'Criteria: high support ticket volume + low coupling + willing business owner. NOT the most complex module. The goal is to prove the process, not show heroics.' },
          { title:'Produce all 13 artifacts for pilot', desc:'Process map, business rules map, table map, SP map, integration map, client matrix, customization matrix, acceptance criteria, test plan, rollback plan, staging strategy, support docs, agent docs.' },
          { title:'Set up infrastructure', desc:'CI/CD pipeline, staging environment mirroring production structure (anonymized data), observability stack, feature flag service.' },
          { title:'Establish ADR process', desc:'Every architectural decision gets an ADR. Template in repo. Pipeline enforces it for billing-related PRs.' },
          { title:'Deliver: Migration Playbook v1', desc:'The repeatable process for every subsequent module. Includes checklist, artifact templates, deployment runbook, and rollback procedure.' },
        ],
      },
      {
        phase: 'Days 61–90', title: 'Execute Pilot — Prove the Process', color: '#ce93d8',
        items: [
          { title:'Develop pilot module', desc:"Using the 13 validated artifacts as spec. Every business rule has a test. Every integration has a contract test. No \"we'll add tests later.\"" },
          { title:'Deploy to internal test client', desc:'Strangler Fig in place. Legacy still runs for all other clients. 2 weeks of parallel running — compare outputs.' },
          { title:'Expand to 3 low-risk clients', desc:'With explicit client consent and support team briefed. Monitor for 2 weeks.' },
          { title:'Post-pilot retrospective', desc:"What worked, what didn't, what needs to change in the playbook before wave 2." },
          { title:'Deliver: Wave 1 Report + Wave 2 Plan', desc:'Metrics: error rate, test coverage, support ticket reduction, deployment time. Proposed next 2 modules for wave 2.' },
        ],
      },
    ],
    pt: [
      {
        phase: 'Dias 1–30', title: 'Ouvir, Mapear e Diagnosticar', color: '#4fc3f7',
        items: [
          { title:'Acompanhar a equipe', desc:'Participar de stand-ups, chamadas de suporte e reuniões de deploy. Aprender o que quebra com mais frequência e quem é chamado às 2h da manhã.' },
          { title:'Entrevistar todos', desc:'Equipe de dev, suporte, analista de negócio, product owner, DBA. Perguntar: "O que você mais teme? O que você nunca tocaria?"' },
          { title:'Mapear o sistema', desc:'Produzir DER, grafo de dependência de SPs, mapa de integrações. Não para refatorar — para entender. Sem mudanças de código no mês 1.' },
          { title:'Avaliar cobertura de testes', desc:'Rodar relatório de cobertura. Mapear quais caminhos críticos têm zero cobertura. Este é o mapa de risco.' },
          { title:'Entregar: Relatório de Diagnóstico Técnico', desc:'Documento resumindo o que foi encontrado: top 5 riscos, módulos mais problemáticos, mapa de dependências, lacunas de cobertura. Compartilhado com a liderança.' },
        ],
      },
      {
        phase: 'Dias 31–60', title: 'Desenhar o Framework de Migração', color: '#66bb6a',
        items: [
          { title:'Selecionar módulo piloto', desc:'Critérios: alto volume de tickets de suporte + baixo acoplamento + dono de negócio disponível. NÃO o módulo mais complexo. O objetivo é provar o processo, não mostrar heroísmo.' },
          { title:'Produzir os 13 artefatos para o piloto', desc:'Mapa de processo, mapa de regras, mapa de tabelas, mapa de SPs, mapa de integrações, matriz de clientes, matriz de customizações, critérios de aceitação, plano de testes, plano de rollback, estratégia de homologação, docs de suporte, docs de agentes.' },
          { title:'Configurar infraestrutura', desc:'Pipeline de CI/CD, ambiente de homologação espelhando estrutura de produção (dados anonimizados), stack de observabilidade, serviço de feature flags.' },
          { title:'Estabelecer processo de ADR', desc:'Toda decisão arquitetural recebe um ADR. Template no repositório. Pipeline o exige para PRs relacionados ao faturamento.' },
          { title:'Entregar: Migration Playbook v1', desc:'O processo repetível para cada módulo subsequente. Inclui checklist, templates de artefatos, runbook de deploy e procedimento de rollback.' },
        ],
      },
      {
        phase: 'Dias 61–90', title: 'Executar Piloto — Provar o Processo', color: '#ce93d8',
        items: [
          { title:'Desenvolver módulo piloto', desc:'Usando os 13 artefatos validados como spec. Cada regra de negócio tem um teste. Cada integração tem um teste de contrato. Sem "vamos adicionar testes depois".' },
          { title:'Implantar em cliente interno de teste', desc:'Strangler Fig no lugar. Legado ainda roda para todos os outros clientes. 2 semanas de execução paralela — comparar resultados.' },
          { title:'Expandir para 3 clientes de baixo risco', desc:'Com consentimento explícito do cliente e equipe de suporte informada. Monitorar por 2 semanas.' },
          { title:'Retrospectiva pós-piloto', desc:'O que funcionou, o que não funcionou, o que precisa mudar no playbook antes da onda 2.' },
          { title:'Entregar: Relatório da Onda 1 + Plano da Onda 2', desc:'Métricas: taxa de erros, cobertura de testes, redução de tickets de suporte, tempo de deploy. Próximos 2 módulos propostos para a onda 2.' },
        ],
      },
    ],
  },
  notTitle: { en: 'What I Would NOT Do in 90 Days', pt: 'O Que eu NÃO Faria em 90 Dias' },
  notBody:  { en: 'Restraint is a senior engineering skill. These are explicit non-actions.', pt: 'Contenção é uma habilidade de engenheiro sênior. Estas são não-ações explícitas.' },
  notItems: {
    en: ['Refactor anything without the 13 artifacts completed and validated','Touch production without a tested rollback plan','Start module 2 before module 1 is stable','Make architectural decisions without an ADR','Promise a rewrite timeline to management','Allow AI to generate migration scripts without human review','Deprioritize test coverage in favor of speed','Work in isolation — every decision involves analyst + support'],
    pt: ['Refatorar qualquer coisa sem os 13 artefatos concluídos e validados','Tocar em produção sem um plano de rollback testado','Começar o módulo 2 antes do módulo 1 estar estável','Tomar decisões arquiteturais sem um ADR','Prometer um cronograma de reescrita para a gestão','Permitir que IA gere scripts de migração sem revisão humana','Despriorizar cobertura de testes em favor da velocidade','Trabalhar em isolamento — cada decisão envolve analista + suporte'],
  },
  commsTitle: { en: 'Communication Cadence', pt: 'Cadência de Comunicação' },
  comms: {
    en: [
      { audience:'Engineering team',    cadence:'Daily stand-up + async ADR reviews', content:'Technical decisions, blockers, artifact progress' },
      { audience:'Product & Analyst',   cadence:'Weekly sync', content:'Business rule validations, acceptance criteria review' },
      { audience:'Management / Board',  cadence:'Bi-weekly written update', content:'Progress metrics, risks, decisions made, next 2 weeks plan' },
      { audience:'Support',             cadence:'Before every deployment', content:'What changed, what to watch for, how to escalate' },
    ],
    pt: [
      { audience:'Equipe de engenharia', cadence:'Stand-up diário + revisões assíncronas de ADR', content:'Decisões técnicas, bloqueadores, progresso dos artefatos' },
      { audience:'Produto e Analista',   cadence:'Sync semanal', content:'Validações de regras de negócio, revisão de critérios de aceitação' },
      { audience:'Gestão / Board',       cadence:'Atualização escrita quinzenal', content:'Métricas de progresso, riscos, decisões tomadas, plano das próximas 2 semanas' },
      { audience:'Suporte',             cadence:'Antes de cada deploy', content:'O que mudou, o que monitorar, como escalar' },
    ],
  },
}
