export const q1 = {
  shell: {
    q:        { en: 'Q1', pt: 'Q1' },
    title:    { en: 'Reverse Engineering a Legacy Module', pt: 'Engenharia Reversa de um Módulo Legado' },
    subtitle: {
      en: 'The billing module: 150 tables, 300 stored procedures, 50 integrations, no updated documentation. Where do you start?',
      pt: 'O módulo de faturamento: 150 tabelas, 300 stored procedures, 50 integrações, sem documentação atualizada. Por onde começa?',
    },
  },
  alert: {
    en: '<strong>Key principle:</strong> You never touch the code first. You build a map of what exists, then validate it against real behavior. Documentation that doesn\'t match production is worse than no documentation.',
    pt: '<strong>Princípio central:</strong> Você nunca toca no código primeiro. Você constrói um mapa do que existe e depois valida contra o comportamento real. Documentação que não bate com a produção é pior do que nenhuma documentação.',
  },
  step1Title: { en: '1. What to Gather First', pt: '1. O Que Coletar Primeiro' },
  step1Body:  {
    en: 'Before reading a single line of code, gather context. The order matters — start with people, then process, then data, then code.',
    pt: 'Antes de ler uma linha de código, colete contexto. A ordem importa — comece com pessoas, depois processo, depois dados, depois código.',
  },
  gather: {
    en: [
      { order:'1', title:'Tribal knowledge sessions', desc:'Interview developers, support, and analysts. Ask: "What breaks most often? What are you afraid to touch? Which clients are the most different?"', who:'Dev + Support + Analyst' },
      { order:'2', title:'Production database schema', desc:'Export all table definitions, indexes, FKs, and constraints. Count rows per table — high-volume tables are usually core business entities.', who:'DBA + Dev' },
      { order:'3', title:'All stored procedures', desc:'Extract full text of all 300 SPs. Sort by execution frequency using DMVs. The top 20 most-called SPs are your critical path.', who:'DBA' },
      { order:'4', title:'Client configuration tables', desc:'Find tables that contain per-client flags, rules, or parameters. These define where the customization lives.', who:'Dev + Analyst' },
      { order:'5', title:'Integration endpoints', desc:'Catalog all outbound/inbound connections: HTTP endpoints, file paths, FTP targets, SFTP, bank APIs. Map direction and owner.', who:'Dev + Ops' },
      { order:'6', title:'WebForms screen inventory', desc:'List all .aspx screens in the billing module. Group by functional area. Identify which screens have code-behind logic vs. pure display.', who:'Dev' },
    ],
    pt: [
      { order:'1', title:'Sessões de conhecimento tribal', desc:'Entreviste desenvolvedores, suporte e analistas. Pergunte: "O que quebra com mais frequência? O que você tem medo de tocar? Quais clientes são mais diferentes?"', who:'Dev + Suporte + Analista' },
      { order:'2', title:'Schema do banco de produção', desc:'Exporte todas as definições de tabelas, índices, FKs e constraints. Conte linhas por tabela — tabelas de alto volume geralmente são entidades centrais do negócio.', who:'DBA + Dev' },
      { order:'3', title:'Todas as stored procedures', desc:'Extraia o texto completo das 300 SPs. Ordene por frequência de execução via DMVs. As 20 SPs mais chamadas são seu caminho crítico.', who:'DBA' },
      { order:'4', title:'Tabelas de configuração por cliente', desc:'Encontre tabelas que contêm flags, regras ou parâmetros por cliente. Elas definem onde a customização vive.', who:'Dev + Analista' },
      { order:'5', title:'Endpoints de integração', desc:'Catalogue todas as conexões de entrada/saída: endpoints HTTP, caminhos de arquivo, FTP, SFTP, APIs bancárias. Mapeie direção e responsável.', who:'Dev + Ops' },
      { order:'6', title:'Inventário de telas WebForms', desc:'Liste todas as telas .aspx do módulo de faturamento. Agrupe por área funcional. Identifique quais têm lógica no code-behind vs. exibição pura.', who:'Dev' },
    ],
  },
  step2Title: { en: '2. Technical & Functional Artifacts — Creation Order', pt: '2. Artefatos Técnicos e Funcionais — Ordem de Criação' },
  artifacts: {
    en: [
      ['1','Entity Relationship Diagram (ERD)','Visual map of 150 tables and their relationships','DBA + Dev'],
      ['2','SP Dependency Graph','Which SPs call which tables and other SPs','Dev'],
      ['3','Process Flow Diagram','Step-by-step billing lifecycle from trigger to output','Analyst + Business'],
      ['4','Business Rules Catalog','Each rule, its source (SP/code/table), and client variants','Analyst + Dev + Support'],
      ['5','Integration Map','All 50 integrations with direction, protocol, and owner','Dev + Ops'],
      ['6','Client Customization Matrix','Per-client exceptions mapped to rules and tables','Analyst + Business'],
      ['7','Data Flow Diagram (DFD)','Where data enters, transforms, and exits the module','Dev + DBA'],
      ['8','Screen Inventory','All WebForms with code-behind logic annotated','Dev'],
    ],
    pt: [
      ['1','Diagrama Entidade-Relacionamento (DER)','Mapa visual das 150 tabelas e seus relacionamentos','DBA + Dev'],
      ['2','Grafo de Dependência de SPs','Quais SPs chamam quais tabelas e outras SPs','Dev'],
      ['3','Diagrama de Fluxo de Processo','Ciclo de vida do faturamento do gatilho ao resultado','Analista + Negócio'],
      ['4','Catálogo de Regras de Negócio','Cada regra, sua origem (SP/código/tabela) e variantes por cliente','Analista + Dev + Suporte'],
      ['5','Mapa de Integrações','Todas as 50 integrações com direção, protocolo e responsável','Dev + Ops'],
      ['6','Matriz de Customização por Cliente','Exceções por cliente mapeadas a regras e tabelas','Analista + Negócio'],
      ['7','Diagrama de Fluxo de Dados (DFD)','Onde os dados entram, se transformam e saem do módulo','Dev + DBA'],
      ['8','Inventário de Telas','Todos os WebForms com lógica de code-behind anotada','Dev'],
    ],
  },
  tableHeaders: {
    en: ['Order','Artifact','Purpose','Validated by'],
    pt: ['Ordem','Artefato','Objetivo','Validado por'],
  },
  toolsTitle: { en: '4. Tools', pt: '4. Ferramentas' },
  toolsLabel: { en: 'SP Dependency Query — identifies which stored procedures call which objects', pt: 'Query de Dependência de SP — identifica quais stored procedures chamam quais objetos' },
  aiTitle: { en: '6 & 7. AI Assistance — With Guardrails', pt: '6 e 7. Assistência de IA — Com Guardrails' },
  ai: {
    en: [
      { title:'✅ AI can do', items:['Summarize stored procedure logic into plain English','Generate ERD drafts from schema DDL','Suggest business rule categories from SP names','Flag duplicate logic across SPs','Draft initial documentation from code comments'] },
      { title:'🛑 AI must NOT do', items:['Confirm business rules without human validation','Decide which SPs are safe to deprecate','Interpret client-specific exceptions from code alone','Replace interviews with tribal knowledge holders','Auto-generate migration scripts without review'] },
    ],
    pt: [
      { title:'✅ IA pode fazer', items:['Resumir a lógica de stored procedures em linguagem simples','Gerar rascunhos de DER a partir do DDL do schema','Sugerir categorias de regras de negócio a partir de nomes de SPs','Sinalizar lógica duplicada entre SPs','Rascunhar documentação inicial a partir de comentários de código'] },
      { title:'🛑 IA NÃO deve fazer', items:['Confirmar regras de negócio sem validação humana','Decidir quais SPs são seguras para deprecar','Interpretar exceções por cliente só a partir do código','Substituir entrevistas com detentores de conhecimento tribal','Gerar scripts de migração automaticamente sem revisão'] },
    ],
  },
}

export const q2 = {
  shell: {
    q:        { en: 'Q2', pt: 'Q2' },
    title:    { en: 'Minimum Artifacts Before Refactoring', pt: 'Artefatos Mínimos Antes da Refatoração' },
    subtitle: { en: '13 artifacts that must exist before any development begins. Each one prevents a specific category of failure.', pt: '13 artefatos que devem existir antes de qualquer desenvolvimento. Cada um previne uma categoria específica de falha.' },
  },
  alert: {
    en: '<strong>Non-negotiable gate:</strong> If any of these 13 artifacts is missing or unvalidated, development authorization should not be granted. Refactoring without them is not engineering — it is gambling with production.',
    pt: '<strong>Portão inegociável:</strong> Se qualquer um desses 13 artefatos estiver ausente ou não validado, a autorização de desenvolvimento não deve ser concedida. Refatorar sem eles não é engenharia — é apostar com a produção.',
  },
  intro: {
    en: 'Each artifact has a clear objective, a named risk if absent, and a validation owner. The artifacts are ordered by dependency — you cannot produce artifact N+1 without artifact N being validated.',
    pt: 'Cada artefato tem um objetivo claro, um risco nomeado se ausente e um responsável pela validação. Os artefatos são ordenados por dependência — você não pode produzir o artefato N+1 sem que o artefato N esteja validado.',
  },
  artifacts: {
    en: [
      { n:'01', title:'Process Map', risk:'Missing = wrong scope', who:'Analyst + Business', desc:'End-to-end billing lifecycle diagram. Every step, every decision point, every actor. This is the contract between business and engineering. Without it, developers will implement their interpretation, not the business one.' },
      { n:'02', title:'Business Rules Map', risk:'Missing = broken clients', who:'Analyst + Dev + Support', desc:'Every rule extracted from code, SPs, and config tables. Each rule has: source (where it lives today), owner (who defined it), client scope (all / specific / parametric), and test condition.' },
      { n:'03', title:'Table Map', risk:'Missing = data corruption', who:'DBA + Dev', desc:'All 150 tables with: purpose, volume, critical flag, FK dependencies, write frequency, and which SPs touch them. Prevents refactoring a table that 12 other modules depend on.' },
      { n:'04', title:'Stored Procedure Map', risk:'Missing = silent breakage', who:'DBA + Dev', desc:'All 300 SPs with: purpose, calling context (screen / scheduler / integration), execution frequency, and complexity score. Prioritizes which must be refactored vs. which can be kept as anti-corruption adapters.' },
      { n:'05', title:'Integration Map', risk:'Missing = broken contracts', who:'Dev + Ops', desc:'50 integrations mapped with: direction, protocol, auth method, SLA, owner contact, and whether they are synchronous or asynchronous. Prevents deploying without notifying downstream systems.' },
      { n:'06', title:'Matrix of Impacted Clients', risk:'Missing = client incident', who:'Analyst + Business + Support', desc:'Which of the 70+ clients use this module and in which configuration. Determines the testing surface and deployment order. Some clients may need to be notified before go-live.' },
      { n:'07', title:'Customization Matrix', risk:'Missing = regression', who:'Analyst + Dev', desc:'Per-client rule exceptions mapped to source code locations. This is where "Client X does it differently" is formalized. Without this, a fix for Client A silently breaks Client X.' },
      { n:'08', title:'Acceptance Criteria', risk:'Missing = no definition of done', who:'Analyst + QA + Business', desc:'Precise, testable conditions that define when the refactored module is correct. Written in Given/When/Then format. Must cover standard flow AND all known client exceptions.' },
      { n:'09', title:'Test Plan', risk:'Missing = production surprise', who:'QA + Dev + Analyst', desc:'Covers: unit tests for each business rule, integration tests for each of the 50 integrations, regression suite for all 70+ clients, performance baseline, and manual UAT checklist.' },
      { n:'10', title:'Rollback Plan', risk:'Missing = unrecoverable incident', who:'Dev + Ops + DBA', desc:'Step-by-step rollback for every deployment step. Includes: DB migration reversal scripts, feature flag kill switches, proxy routing revert, and data reconciliation procedure if dual-write was active.' },
      { n:'11', title:'Staging / Homologation Strategy', risk:'Missing = testing in production', who:'Dev + Ops + QA', desc:'Defines how staging mirrors production data (anonymized), which clients participate in UAT, how long homologation runs, and what approval gates exist before production deploy.' },
      { n:'12', title:'Support Documentation', risk:'Missing = helpdesk escalations', who:'Dev + Support', desc:'How-to guide for support teams: what logs to check, what queries to run, what errors mean, escalation path. Must exist before go-live — not after the first incident.' },
      { n:'13', title:'Documentation for Internal Agents', risk:'Missing = hallucinating AI', who:'Dev + Analyst', desc:'Structured knowledge base that feeds AI assistants: business rules in plain English, integration contracts, client exceptions, known edge cases. Without this, agents will hallucinate business logic.' },
    ],
    pt: [
      { n:'01', title:'Mapa de Processo', risk:'Ausente = escopo errado', who:'Analista + Negócio', desc:'Diagrama do ciclo de vida do faturamento de ponta a ponta. Cada etapa, cada ponto de decisão, cada ator. Este é o contrato entre negócio e engenharia. Sem ele, os desenvolvedores implementam a interpretação deles, não a do negócio.' },
      { n:'02', title:'Mapa de Regras de Negócio', risk:'Ausente = clientes quebrados', who:'Analista + Dev + Suporte', desc:'Cada regra extraída do código, SPs e tabelas de configuração. Cada regra tem: origem (onde vive hoje), responsável (quem definiu), escopo de cliente (todos / específico / paramétrico) e condição de teste.' },
      { n:'03', title:'Mapa de Tabelas', risk:'Ausente = corrupção de dados', who:'DBA + Dev', desc:'Todas as 150 tabelas com: objetivo, volume, flag de criticidade, dependências de FK, frequência de escrita e quais SPs as acessam. Evita refatorar uma tabela da qual 12 outros módulos dependem.' },
      { n:'04', title:'Mapa de Stored Procedures', risk:'Ausente = quebra silenciosa', who:'DBA + Dev', desc:'Todas as 300 SPs com: objetivo, contexto de chamada (tela / agendador / integração), frequência de execução e score de complexidade. Prioriza quais devem ser refatoradas vs. mantidas como adaptadores anti-corrupção.' },
      { n:'05', title:'Mapa de Integrações', risk:'Ausente = contratos quebrados', who:'Dev + Ops', desc:'50 integrações mapeadas com: direção, protocolo, método de auth, SLA, contato do responsável e se são síncronas ou assíncronas. Evita deploy sem notificar sistemas downstream.' },
      { n:'06', title:'Matriz de Clientes Impactados', risk:'Ausente = incidente em cliente', who:'Analista + Negócio + Suporte', desc:'Quais dos 70+ clientes usam este módulo e em qual configuração. Determina a superfície de testes e a ordem de deploy. Alguns clientes podem precisar ser notificados antes do go-live.' },
      { n:'07', title:'Matriz de Customizações', risk:'Ausente = regressão', who:'Analista + Dev', desc:'Exceções de regras por cliente mapeadas a localizações no código-fonte. É aqui que "o Cliente X faz diferente" é formalizado. Sem isso, uma correção para o Cliente A quebra silenciosamente o Cliente X.' },
      { n:'08', title:'Critérios de Aceitação', risk:'Ausente = sem definição de pronto', who:'Analista + QA + Negócio', desc:'Condições precisas e testáveis que definem quando o módulo refatorado está correto. Escritos em formato Dado/Quando/Então. Devem cobrir o fluxo padrão E todas as exceções conhecidas por cliente.' },
      { n:'09', title:'Plano de Testes', risk:'Ausente = surpresa em produção', who:'QA + Dev + Analista', desc:'Cobre: testes unitários para cada regra de negócio, testes de integração para cada uma das 50 integrações, suíte de regressão para todos os 70+ clientes, baseline de performance e checklist de UAT manual.' },
      { n:'10', title:'Plano de Rollback', risk:'Ausente = incidente irrecuperável', who:'Dev + Ops + DBA', desc:'Rollback passo a passo para cada etapa de deploy. Inclui: scripts de reversão de migração de DB, kill switches de feature flag, reversão de roteamento de proxy e procedimento de reconciliação de dados se dual-write estava ativo.' },
      { n:'11', title:'Estratégia de Homologação', risk:'Ausente = testar em produção', who:'Dev + Ops + QA', desc:'Define como o ambiente de homologação espelha os dados de produção (anonimizados), quais clientes participam do UAT, por quanto tempo a homologação roda e quais aprovações existem antes do deploy em produção.' },
      { n:'12', title:'Documentação de Suporte', risk:'Ausente = escalações no helpdesk', who:'Dev + Suporte', desc:'Guia para a equipe de suporte: quais logs verificar, quais queries executar, o que cada erro significa, caminho de escalação. Deve existir antes do go-live — não após o primeiro incidente.' },
      { n:'13', title:'Documentação para Agentes Internos', risk:'Ausente = IA alucinando', who:'Dev + Analista', desc:'Base de conhecimento estruturada que alimenta assistentes de IA: regras de negócio em linguagem simples, contratos de integração, exceções por cliente, casos extremos conhecidos. Sem isso, agentes vão alucinar lógica de negócio.' },
    ],
  },
  validTitle: { en: 'Validation Principle', pt: 'Princípio de Validação' },
  validBody:  {
    en: "Each artifact must be reviewed and signed off by its named owner — not just produced. A document that exists but hasn't been validated by the people who operate the system is a liability. It creates false confidence and can lead to refactoring based on incorrect assumptions.",
    pt: 'Cada artefato deve ser revisado e aprovado pelo responsável nomeado — não apenas produzido. Um documento que existe mas não foi validado pelas pessoas que operam o sistema é um passivo. Ele cria falsa confiança e pode levar a refatorações baseadas em premissas incorretas.',
  },
  validChips: {
    en: ['Analyst sign-off','DBA sign-off','Business owner approval','Support review','QA acceptance','Tech lead gate'],
    pt: ['Aprovação do analista','Aprovação do DBA','Aprovação do dono do negócio','Revisão do suporte','Aceite do QA','Gate do tech lead'],
  },
}
