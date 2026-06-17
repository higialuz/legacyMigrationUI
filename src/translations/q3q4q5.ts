export const q3 = {
  shell: {
    q: { en: 'Q3', pt: 'Q3' },
    title: { en: 'Refactoring a Multi-client Business Rule', pt: 'Refatorando uma Regra de Negócio Multi-cliente' },
    subtitle: { en: 'The billing rule exists in 4 variations across 70+ clients. Part is in stored procedures, part in application code. How do you model this without creating a maintenance nightmare?', pt: 'A regra de faturamento existe em 4 variações para 70+ clientes. Parte está em stored procedures, parte no código. Como modelar isso sem criar um pesadelo de manutenção?' },
  },
  alert: {
    en: '<strong>The anti-pattern to avoid:</strong> A single SP or function with <code>IF @ClientId = \'X\' THEN ... ELSE IF @ClientId = \'B\' THEN ...</code> — this is the exact problem we are solving. Every new client exception makes the condition tree deeper and more fragile.',
    pt: '<strong>O anti-padrão a evitar:</strong> Uma única SP ou função com <code>IF @ClientId = \'X\' THEN ... ELSE IF @ClientId = \'B\' THEN ...</code> — este é exatamente o problema que estamos resolvendo. Cada nova exceção de cliente torna a árvore de condições mais profunda e frágil.',
  },
  stratTitle: { en: '1. Architectural Strategy — Strategy Pattern', pt: '1. Estratégia Arquitetural — Strategy Pattern' },
  stratBody:  { en: "Each client's billing rule becomes a concrete implementation of a shared interface. A registry maps client configuration to the correct rule class. Adding a new client variant requires zero changes to existing rules.", pt: 'A regra de faturamento de cada cliente se torna uma implementação concreta de uma interface compartilhada. Um registro mapeia a configuração do cliente para a classe de regra correta. Adicionar uma nova variante de cliente requer zero mudanças nas regras existentes.' },
  clients: {
    en: [
      { client:'Client A', rule:'DefaultBillingRule', desc:'Uses standard 10% fee — no custom class needed.' },
      { client:'Client B', rule:'ClientBBillingRule', desc:'Flat fee above threshold — concrete override.' },
      { client:'Client C', rule:'ParametricBillingRule', desc:'Default rate but pulled from client config table.' },
      { client:'Client X', rule:'ClientXBillingRule', desc:'Custom exceptions — isolated, no cross-impact.' },
      { client:'New clients', rule:'DefaultBillingRule', desc:'Falls back to default unless explicitly configured.' },
    ],
    pt: [
      { client:'Cliente A', rule:'DefaultBillingRule', desc:'Usa taxa padrão de 10% — sem classe customizada.' },
      { client:'Cliente B', rule:'ClientBBillingRule', desc:'Taxa fixa acima do limite — override concreto.' },
      { client:'Cliente C', rule:'ParametricBillingRule', desc:'Taxa padrão mas obtida da tabela de configuração do cliente.' },
      { client:'Cliente X', rule:'ClientXBillingRule', desc:'Exceções customizadas — isoladas, sem impacto cruzado.' },
      { client:'Novos clientes', rule:'DefaultBillingRule', desc:'Usa padrão a menos que configurado explicitamente.' },
    ],
  },
  codeTitle: { en: '2. Class Structure', pt: '2. Estrutura de Classes' },
  codeLabels: {
    en: ['Rule hierarchy — abstract base + concrete implementations', 'Rule registry — maps client config to rule class'],
    pt: ['Hierarquia de regras — base abstrata + implementações concretas', 'Registro de regras — mapeia config do cliente à classe de regra'],
  },
  principlesTitle: { en: '3–7. Design Principles', pt: '3–7. Princípios de Design' },
  principles: {
    en: [
      { title:'When to use inheritance', desc:"Only when the child IS the parent with a genuine specialization (ParametricRule extends Default). Avoid if it's just \"similar but different\" — use composition instead." },
      { title:'Client configuration strategy', desc:'Store rule ID in a client_config table. The application looks up the rule ID at runtime — no hardcoded client checks in business logic.' },
      { title:'Versioning business rules', desc:'Each rule class is immutable once deployed. New behavior = new class + new version. Old rule stays for audit. Migration script updates client_config.' },
      { title:'Testing each variation', desc:'Each rule class has its own unit test file. Integration tests cover the registry lookup. A test matrix asserts each client gets the expected rule and result.' },
      { title:'Documenting the decision', desc:'An Architecture Decision Record (ADR) is created: context, options considered, decision, consequences. Stored in the repo alongside the code.' },
    ],
    pt: [
      { title:'Quando usar herança', desc:'Apenas quando o filho É o pai com uma especialização genuína (ParametricRule extends Default). Evite se for apenas "parecido mas diferente" — use composição.' },
      { title:'Estratégia de configuração por cliente', desc:'Armazene o ID da regra em uma tabela client_config. A aplicação busca o ID da regra em tempo de execução — sem verificações hardcoded de cliente na lógica de negócio.' },
      { title:'Versionamento de regras de negócio', desc:'Cada classe de regra é imutável após o deploy. Novo comportamento = nova classe + nova versão. A regra antiga fica para auditoria. O script de migração atualiza client_config.' },
      { title:'Testando cada variação', desc:'Cada classe de regra tem seu próprio arquivo de teste unitário. Testes de integração cobrem o lookup no registro. Uma matriz de testes verifica que cada cliente obtém a regra e o resultado esperados.' },
      { title:'Documentando a decisão', desc:'Um Architecture Decision Record (ADR) é criado: contexto, opções consideradas, decisão, consequências. Armazenado no repositório junto ao código.' },
    ],
  },
  liveText: { en: 'This billing rule engine is running live on AWS Lambda. Select a client, enter an amount, and see the Strategy Pattern resolve the rule in real time.', pt: 'Este motor de regras de faturamento está rodando ao vivo na AWS Lambda. Selecione um cliente, insira um valor e veja o Strategy Pattern resolver a regra em tempo real.' },
  liveBtn:  { en: '▶ Try it live on AWS →', pt: '▶ Experimente ao vivo na AWS →' },
}

export const q4 = {
  shell: {
    q: { en: 'Q4', pt: 'Q4' },
    title: { en: 'Technical Decision Making Under Conflicting Truth', pt: 'Tomada de Decisão Técnica com Verdades Conflitantes' },
    subtitle: { en: '4 sources, 4 different rules. Analyst, developer, stored procedure, and production all say something different. How do you find ground truth?', pt: '4 fontes, 4 regras diferentes. Analista, desenvolvedor, stored procedure e produção dizem coisas diferentes. Como encontrar a verdade?' },
  },
  alert: {
    en: "<strong>The trap:</strong> Picking the most authoritative-sounding source (the analyst doc, the most senior developer) and moving on. Ground truth is what production actually does — not what anyone thinks it does.",
    pt: '<strong>A armadilha:</strong> Escolher a fonte que parece mais autoritativa (o documento do analista, o desenvolvedor mais sênior) e seguir em frente. A verdade é o que a produção realmente faz — não o que alguém acha que ela faz.',
  },
  processTitle: { en: 'The Ground Truth Process', pt: 'O Processo de Encontrar a Verdade' },
  steps: {
    en: [
      { label:'Freeze — stop all informal decisions', content:"Call a meeting with all parties. Acknowledge the conflict explicitly. No one implements anything until ground truth is established. Informal \"let's just go with X\" decisions made under time pressure are how production incidents happen." },
      { label:'Extract technical evidence', content:'Pull 6+ months of production logs. Identify actual calculation patterns. Run the SP in a staging environment with real production data (anonymized). Compare output to each competing rule. The SP + production logs are your test oracle.' },
      { label:'Client interviews', content:'Contact 3–5 affected clients. Ask: "Has the billing ever been wrong? Have you ever filed a dispute?" Their operational reality is the final arbiter — not the codebase.' },
      { label:'Document the conflict', content:"Write an Architecture Decision Record (ADR) that explicitly names all four conflicting versions and their sources. This is not a blame document — it's a record of the investigation." },
      { label:'Convene the decision meeting', content:"Analyst + Lead Developer + Support Lead + Product Owner. Present evidence. Agree on ground truth. Product Owner gives final approval. This is not a technical decision alone." },
      { label:'Formalize and propagate', content:'Update the ADR to "Approved" status. Update business rules documentation. Write regression tests using the SP as oracle. Archive the old documentation with a note explaining why it was superseded.' },
    ],
    pt: [
      { label:'Congelar — parar todas as decisões informais', content:'Convocar uma reunião com todas as partes. Reconhecer o conflito explicitamente. Ninguém implementa nada até que a verdade seja estabelecida. Decisões informais de "vamos com X" tomadas sob pressão de tempo são como incidentes em produção acontecem.' },
      { label:'Extrair evidências técnicas', content:'Puxar 6+ meses de logs de produção. Identificar padrões de cálculo reais. Executar a SP em ambiente de homologação com dados reais de produção (anonimizados). Comparar resultado com cada regra concorrente. A SP + logs de produção são o seu oráculo de testes.' },
      { label:'Entrevistas com clientes', content:'Contatar 3–5 clientes afetados. Perguntar: "O faturamento já esteve errado? Você já abriu uma disputa?" A realidade operacional deles é o árbitro final — não o código-fonte.' },
      { label:'Documentar o conflito', content:'Escrever um Architecture Decision Record (ADR) que nomeia explicitamente as quatro versões conflitantes e suas fontes. Não é um documento de culpa — é um registro da investigação.' },
      { label:'Convocar a reunião de decisão', content:'Analista + Lead Developer + Support Lead + Product Owner. Apresentar as evidências. Concordar sobre a verdade. O Product Owner dá a aprovação final. Esta não é uma decisão apenas técnica.' },
      { label:'Formalizar e propagar', content:'Atualizar o ADR para status "Aprovado". Atualizar a documentação de regras de negócio. Escrever testes de regressão usando a SP como oráculo. Arquivar a documentação antiga com uma nota explicando por que foi substituída.' },
    ],
  },
  adrTitle: { en: 'The ADR — Architecture Decision Record', pt: 'O ADR — Architecture Decision Record' },
  adrBody:  { en: 'This is the artifact that prevents the conflict from recurring. Every future developer who touches this rule reads the ADR first.', pt: 'Este é o artefato que evita que o conflito se repita. Todo desenvolvedor futuro que tocar nessa regra lê o ADR primeiro.' },
  adrLabel: { en: 'ADR-042 — Billing Ground Truth Decision', pt: 'ADR-042 — Decisão de Verdade para Faturamento' },
  controlsTitle: { en: 'Controls & AI Role', pt: 'Controles e Papel da IA' },
  controls: {
    en: [
      { title:'Preventing informal decisions', desc:'No rule change is valid without an ADR. The ADR template is part of the repo. CI pipeline blocks PRs that modify billing logic without an associated ADR file.' },
      { title:'Who approves', desc:'Product Owner has final approval on business rules. Tech Lead approves implementation. Both signatures required. No single person decides alone.' },
      { title:'AI can assist — not decide', desc:"AI can analyze log patterns, summarize SP logic, and draft the ADR. It cannot determine which version is correct — that requires business context and client confirmation that no LLM has access to." },
      { title:'From ADR to tests', desc:"The approved ADR's \"Decision\" section becomes the test specification. Each bullet point in the decision maps to at least one automated test case." },
    ],
    pt: [
      { title:'Evitando decisões informais', desc:'Nenhuma mudança de regra é válida sem um ADR. O template de ADR faz parte do repositório. O pipeline de CI bloqueia PRs que modificam lógica de faturamento sem um arquivo ADR associado.' },
      { title:'Quem aprova', desc:'O Product Owner tem aprovação final sobre regras de negócio. O Tech Lead aprova a implementação. Ambas as assinaturas são necessárias. Nenhuma pessoa decide sozinha.' },
      { title:'IA pode auxiliar — não decidir', desc:'A IA pode analisar padrões de log, resumir a lógica de SP e rascunhar o ADR. Ela não pode determinar qual versão é correta — isso requer contexto de negócio e confirmação de clientes que nenhum LLM possui.' },
      { title:'Do ADR para os testes', desc:'A seção "Decisão" do ADR aprovado se torna a especificação de testes. Cada item da decisão é mapeado para pelo menos um caso de teste automatizado.' },
    ],
  },
}

export const q5 = {
  shell: {
    q: { en: 'Q5', pt: 'Q5' },
    title: { en: 'Responsible Use of Artificial Intelligence', pt: 'Uso Responsável de Inteligência Artificial' },
    subtitle: { en: 'AI agents can accelerate everything — or hallucinate business-critical rules. The difference is what you feed them and what guardrails you build.', pt: 'Agentes de IA podem acelerar tudo — ou alucinar regras críticas do negócio. A diferença está no que você alimenta neles e nos guardrails que você constrói.' },
  },
  alert: {
    en: '<strong>The core principle:</strong> AI is a force multiplier for humans who know the domain. It is not a replacement for domain knowledge. An agent fed bad documentation will produce confident, wrong answers faster.',
    pt: '<strong>O princípio central:</strong> IA é um multiplicador de força para humanos que conhecem o domínio. Não é um substituto para o conhecimento do domínio. Um agente alimentado com documentação ruim produzirá respostas erradas com mais confiança e velocidade.',
  },
  kbTitle: { en: '1 & 2. Knowledge Base Structure', pt: '1 e 2. Estrutura da Base de Conhecimento' },
  kb: {
    en: [
      { title:'Tier 1 — Ground Truth Docs', color:'#ef5350', items:['Approved ADRs','Validated business rules catalog','Client customization matrix','Acceptance criteria'] },
      { title:'Tier 2 — Technical Reference', color:'#ffa726', items:['Stored procedure documentation','Integration contracts','Table map','ERD'] },
      { title:'Tier 3 — Operational Guides', color:'#66bb6a', items:['Support runbooks','Deployment procedures','Rollback plans','Observability dashboards'] },
      { title:'Tier 4 — Living Context', color:'#4fc3f7', items:['Meeting notes','Open questions log','In-progress ADRs','Change history'] },
    ],
    pt: [
      { title:'Nível 1 — Documentos de Verdade', color:'#ef5350', items:['ADRs aprovados','Catálogo de regras de negócio validado','Matriz de customização por cliente','Critérios de aceitação'] },
      { title:'Nível 2 — Referência Técnica', color:'#ffa726', items:['Documentação de stored procedures','Contratos de integração','Mapa de tabelas','DER'] },
      { title:'Nível 3 — Guias Operacionais', color:'#66bb6a', items:['Runbooks de suporte','Procedimentos de deploy','Planos de rollback','Dashboards de observabilidade'] },
      { title:'Nível 4 — Contexto Vivo', color:'#4fc3f7', items:['Notas de reunião','Log de perguntas abertas','ADRs em andamento','Histórico de mudanças'] },
    ],
  },
  promptTitle: { en: '4. Agent Instructions — System Prompt Design', pt: '4. Instruções do Agente — Design do System Prompt' },
  promptBody:  { en: "The system prompt is the agent's constitution. It defines what it can do, what it must cite, and what it must never decide alone.", pt: 'O system prompt é a constituição do agente. Ele define o que pode fazer, o que deve citar e o que nunca deve decidir sozinho.' },
  promptLabel: { en: 'ERP Knowledge Agent — System Prompt', pt: 'Agente de Conhecimento ERP — System Prompt' },
  controlsTitle: { en: '5, 6 & 7. Risks, Controls, and Hard Limits', pt: '5, 6 e 7. Riscos, Controles e Limites Absolutos' },
  controls: {
    en: [
      { title:'⚠ Risk: Stale documentation', desc:"Agent answers based on outdated rules. Control: every doc update triggers a knowledge base re-index. Docs have version + last-updated timestamp. Agent cites both." },
      { title:'⚠ Risk: Confident hallucination', desc:"Agent generates plausible-sounding but incorrect SP logic. Control: agent must cite source + version. \"I don't know\" is a valid answer. Confidence scoring required." },
      { title:'⚠ Risk: Scope creep', desc:'Agent starts making recommendations beyond its role. Control: system prompt explicitly lists forbidden decision types. Monitored via output logging.' },
      { title:'🛑 Never automated', desc:'Deprecating SPs · Changing production data · Client impact assessment · Final approval on business rules · Any action with no rollback path.' },
    ],
    pt: [
      { title:'⚠ Risco: Documentação desatualizada', desc:'Agente responde com base em regras obsoletas. Controle: cada atualização de doc dispara reindexação da base de conhecimento. Docs têm versão + timestamp. Agente cita ambos.' },
      { title:'⚠ Risco: Alucinação confiante', desc:'Agente gera lógica de SP plausível mas incorreta. Controle: agente deve citar fonte + versão. "Não sei" é uma resposta válida. Score de confiança obrigatório.' },
      { title:'⚠ Risco: Expansão de escopo', desc:'Agente começa a fazer recomendações além de seu papel. Controle: system prompt lista explicitamente os tipos de decisão proibidos. Monitorado via logging de saídas.' },
      { title:'🛑 Nunca automatizado', desc:'Deprecar SPs · Alterar dados em produção · Avaliação de impacto em clientes · Aprovação final de regras de negócio · Qualquer ação sem caminho de rollback.' },
    ],
  },
  docsTitle: { en: '8. Keeping Documentation Alive', pt: '8. Mantendo a Documentação Viva' },
  docsBody:  { en: 'Dead documentation is the root cause of hallucinating agents. The process:', pt: 'Documentação morta é a causa raiz de agentes que alucinam. O processo:' },
  docsChips: {
    en: ['PR merged → doc update required','ADR approved → knowledge base re-indexed','Business rule changed → catalog version bumped','Client exception added → customization matrix updated','Monthly doc freshness review'],
    pt: ['PR mesclado → atualização de doc obrigatória','ADR aprovado → base de conhecimento reindexada','Regra de negócio alterada → versão do catálogo incrementada','Exceção de cliente adicionada → matriz de customização atualizada','Revisão mensal de atualidade da documentação'],
  },
}
