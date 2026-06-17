export const q7 = {
  shell: {
    q: { en: 'Q7', pt: 'Q7' },
    title: { en: 'Transitional Architecture', pt: 'Arquitetura Transicional' },
    subtitle: { en: 'Legacy VB.NET + SQL Server and modern cloud-native coexisting without downtime, with rollback at every step.', pt: 'VB.NET + SQL Server legado e cloud-native moderno coexistindo sem downtime, com rollback em cada etapa.' },
  },
  alert: { en: '<strong>Pattern: Strangler Fig.</strong> Named after the fig tree that grows around an existing tree, gradually replacing it. The legacy system runs fully in production. New modules are deployed alongside it. A routing layer directs traffic. At no point is there a "big bang" switch. Each module migration is individually reversible.', pt: '<strong>Padrão: Strangler Fig.</strong> Nomeado após a figueira que cresce ao redor de uma árvore existente, substituindo-a gradualmente. O sistema legado roda totalmente em produção. Novos módulos são implantados ao lado dele. Uma camada de roteamento direciona o tráfego. Em nenhum momento há uma troca "big bang". Cada migração de módulo é individualmente reversível.' },
  diagTitle: { en: 'High-Level Architecture — Coexistence Strategy', pt: 'Arquitetura de Alto Nível — Estratégia de Coexistência' },
  codeTitle: { en: 'Routing Configuration', pt: 'Configuração de Roteamento' },
  decisionsTitle: { en: 'Key Architectural Decisions', pt: 'Decisões Arquiteturais Chave' },
  decisions: {
    en: [
      { title:'No big-bang rewrite', desc:'Modules are migrated one at a time, behind the router. Legacy runs in production throughout. There is no "migration week" where everything is frozen.' },
      { title:'Shared database — temporary', desc:'New services read from the legacy SQL Server via an anti-corruption layer during migration. Dual-write ensures data consistency. New schema is introduced incrementally.' },
      { title:'First module selection', desc:'Pick the module with: highest pain (most bugs/support tickets), lowest coupling (fewest dependencies on other modules), and a clear business owner who will validate it.' },
      { title:'Rollback = router config change', desc:'To roll back any module, flip the router to send that path to legacy. No code deployment, no DB migration reversal. 30-second rollback.' },
      { title:'Client-group deployment', desc:'Deploy to 1 internal test client → 3 low-risk clients → remaining clients. Each group runs for 2 weeks before next group. Issues are isolated.' },
      { title:'Success metrics', desc:'Error rate parity with legacy (≤ legacy baseline), support ticket volume, processing time, test coverage %, and client satisfaction score.' },
    ],
    pt: [
      { title:'Sem reescrita big-bang', desc:'Módulos são migrados um de cada vez, atrás do roteador. O legado roda em produção durante todo o processo. Não há uma "semana de migração" onde tudo é congelado.' },
      { title:'Banco de dados compartilhado — temporário', desc:'Novos serviços leem do SQL Server legado via camada anti-corrupção durante a migração. Dual-write garante consistência dos dados. O novo schema é introduzido incrementalmente.' },
      { title:'Seleção do primeiro módulo', desc:'Escolha o módulo com: maior dor (mais bugs/tickets de suporte), menor acoplamento (menos dependências de outros módulos) e um dono de negócio claro que irá validá-lo.' },
      { title:'Rollback = mudança de config do roteador', desc:'Para fazer rollback de qualquer módulo, inverta o roteador para enviar aquele caminho para o legado. Sem deploy de código, sem reversão de migração de DB. Rollback em 30 segundos.' },
      { title:'Deploy por grupo de clientes', desc:'Implante para 1 cliente interno → 3 clientes de baixo risco → clientes restantes. Cada grupo roda por 2 semanas antes do próximo grupo. Problemas ficam isolados.' },
      { title:'Métricas de sucesso', desc:'Paridade de taxa de erros com o legado (≤ baseline), volume de tickets de suporte, tempo de processamento, % de cobertura de testes e score de satisfação dos clientes.' },
    ],
  },
  liveText: { en: 'The Strangler Fig router is running live — toggle the feature flag and send requests to see traffic switch between the legacy IIS simulation and the new Lambda service.', pt: 'O roteador Strangler Fig está rodando ao vivo — ative o feature flag e envie requisições para ver o tráfego alternar entre a simulação do IIS legado e o novo serviço Lambda.' },
  liveBtn:  { en: '▶ Try it live on AWS →', pt: '▶ Experimente ao vivo na AWS →' },
}
