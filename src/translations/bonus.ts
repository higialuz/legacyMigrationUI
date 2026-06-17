export const bonus = {
  shell: {
    q: { en: '★ Bonus', pt: '★ Bônus' },
    title:    { en: 'Can We Start Immediately?', pt: 'Podemos Começar Imediatamente?' },
    subtitle: { en: 'The developer says: "We can start immediately — our AI tools can already generate the code." Do you agree?', pt: 'O desenvolvedor diz: "Podemos começar imediatamente — nossas ferramentas de IA já conseguem gerar o código." Você concorda?' },
  },
  alertTitle: { en: 'No. Emphatically no.', pt: 'Não. Enfaticamente não.' },
  alertBody:  {
    en: 'This statement is the most dangerous thing a developer can say on a legacy migration project. It conflates code generation capability with system understanding — and they are not the same thing. An AI tool that generates code for a system it has never seen will produce confident, compilable, wrong code.',
    pt: 'Esta afirmação é a coisa mais perigosa que um desenvolvedor pode dizer em um projeto de migração legada. Ela confunde capacidade de geração de código com compreensão do sistema — e elas não são a mesma coisa. Uma ferramenta de IA que gera código para um sistema que nunca viu produzirá código confiante, compilável e errado.',
  },
  coreTitle: { en: 'The Core Problem', pt: 'O Problema Central' },
  coreBody:  {
    en: "AI code generation tools are excellent at producing syntactically correct implementations of well-specified problems. The billing module in this scenario is not a well-specified problem. It is a 14-year accumulation of business rules scattered across stored procedures, code-behind, config tables, and tribal knowledge — with 70+ client variations and no validated documentation.\n\nGenerating code for this system without reverse engineering it first is not acceleration. It is technical debt at machine speed.",
    pt: 'Ferramentas de geração de código por IA são excelentes para produzir implementações sintaticamente corretas de problemas bem especificados. O módulo de faturamento neste cenário não é um problema bem especificado. É um acúmulo de 14 anos de regras de negócio dispersas em stored procedures, code-behind, tabelas de configuração e conhecimento tribal — com 70+ variações por cliente e sem documentação validada.\n\nGerar código para este sistema sem fazer engenharia reversa primeiro não é aceleração. É dívida técnica em velocidade de máquina.',
  },
  prereqTitle: { en: 'What Must Happen Before Development', pt: 'O Que Deve Acontecer Antes do Desenvolvimento' },
  prereqs: {
    en: [
      { n:'1', title:'Reverse engineering complete', desc:"All 13 artifacts produced, reviewed, and signed off. If the business rules map isn't validated, the AI will generate code based on what the codebase looks like, not what the business actually requires." },
      { n:'2', title:'Ground truth established', desc:'Every conflicting rule version (analyst doc, code, SP, production behavior) resolved into a single source of truth — via the ADR process. AI cannot resolve business ambiguity.' },
      { n:'3', title:'Acceptance criteria written', desc:"In Given/When/Then format, covering all client variations. These are the test oracle. AI-generated code without an oracle cannot be validated." },
      { n:'4', title:'Rollback plan tested', desc:'In staging. The rollback plan must be validated before the first deployment, not designed during an incident.' },
      { n:'5', title:'Staging environment ready', desc:'Mirroring production structure with anonymized data. AI-generated code must be tested against realistic data volumes and client configurations.' },
    ],
    pt: [
      { n:'1', title:'Engenharia reversa completa', desc:'Todos os 13 artefatos produzidos, revisados e aprovados. Se o mapa de regras de negócio não estiver validado, a IA gerará código baseado em como o código-fonte parece, não no que o negócio realmente requer.' },
      { n:'2', title:'Verdade estabelecida', desc:'Cada versão conflitante de regra (documento do analista, código, SP, comportamento em produção) resolvida em uma única fonte de verdade — via processo de ADR. A IA não pode resolver ambiguidade de negócio.' },
      { n:'3', title:'Critérios de aceitação escritos', desc:'No formato Dado/Quando/Então, cobrindo todas as variações de clientes. Estes são o oráculo de testes. Código gerado por IA sem oráculo não pode ser validado.' },
      { n:'4', title:'Plano de rollback testado', desc:'Em homologação. O plano de rollback deve ser validado antes do primeiro deploy, não projetado durante um incidente.' },
      { n:'5', title:'Ambiente de homologação pronto', desc:'Espelhando a estrutura de produção com dados anonimizados. O código gerado por IA deve ser testado contra volumes de dados e configurações de clientes realistas.' },
    ],
  },
  goodTitle: { en: 'Where AI Tools Genuinely Help', pt: 'Onde as Ferramentas de IA Genuinamente Ajudam' },
  good: {
    en: [
      { title:'✅ SP analysis', desc:"Feed the 300 stored procedures to an AI assistant. Ask it to summarize what each one does, identify patterns, flag duplicates. This accelerates reverse engineering — it doesn't replace it." },
      { title:'✅ Test generation', desc:'Once acceptance criteria are written and validated by humans, AI can generate unit test scaffolding, test data variations, and edge case suggestions.' },
      { title:'✅ Code review', desc:"AI reviews a human-written implementation against the business rules map and flags deviations. Catches what code review misses — not to approve, but to surface." },
      { title:'✅ Documentation drafting', desc:'AI drafts initial documentation from validated artifacts. Humans review and approve. Never the reverse.' },
    ],
    pt: [
      { title:'✅ Análise de SPs', desc:'Alimente as 300 stored procedures para um assistente de IA. Peça que ele resuma o que cada uma faz, identifique padrões e sinalize duplicatas. Isso acelera a engenharia reversa — não a substitui.' },
      { title:'✅ Geração de testes', desc:'Uma vez que os critérios de aceitação estejam escritos e validados por humanos, a IA pode gerar scaffolding de testes unitários, variações de dados de teste e sugestões de casos extremos.' },
      { title:'✅ Revisão de código', desc:'A IA revisa uma implementação escrita por humanos contra o mapa de regras de negócio e sinaliza desvios. Captura o que a revisão de código perde — não para aprovar, mas para evidenciar.' },
      { title:'✅ Rascunho de documentação', desc:'A IA rascunha documentação inicial a partir de artefatos validados. Humanos revisam e aprovam. Nunca o contrário.' },
    ],
  },
  convTitle: { en: 'Managing the Conversation', pt: 'Gerenciando a Conversa' },
  convBody:  { en: 'When a developer makes this statement, the right response is not to shut down the enthusiasm — it is to redirect it productively.', pt: 'Quando um desenvolvedor faz essa afirmação, a resposta certa não é sufocar o entusiasmo — é redirecioná-lo produtivamente.' },
  convQuote: {
    en: '"Great — the tools will save us significant time once we know what we\'re building. Let\'s use them right now to start analyzing the stored procedures while we complete the reverse engineering. That way, when we\'re ready to develop, the AI will have accurate context to work from and every line it generates will be validatable against our acceptance criteria."',
    pt: '"Ótimo — as ferramentas nos pouparão tempo significativo quando soubermos o que estamos construindo. Vamos usá-las agora para começar a analisar as stored procedures enquanto completamos a engenharia reversa. Assim, quando estivermos prontos para desenvolver, a IA terá contexto preciso para trabalhar e cada linha que ela gerar será validável contra nossos critérios de aceitação."',
  },
  convCaption: {
    en: '— Redirects energy, preserves the process, and makes the developer a partner in the right approach.',
    pt: '— Redireciona a energia, preserva o processo e torna o desenvolvedor um parceiro na abordagem correta.',
  },
}
