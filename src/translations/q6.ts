export const q6 = {
  shell: {
    q: { en: 'Q6', pt: 'Q6' },
    title: { en: 'Observability & Support', pt: 'Observabilidade e Suporte' },
    subtitle: { en: 'Client reports: "The payment batch was not generated." Today this requires manual DB queries and developer intervention. It shouldn\'t.', pt: 'O cliente reporta: "O lote de pagamento não foi gerado." Hoje isso exige consultas manuais ao DB e intervenção de desenvolvedor. Não deveria.' },
  },
  alert: { en: '<strong>Design goal:</strong> Support must be able to answer — what happened, where, when, which client, which user, which rule, which integration, and what type of error — without developer intervention and without accessing sensitive data.', pt: '<strong>Objetivo de design:</strong> O suporte deve conseguir responder — o que aconteceu, onde, quando, qual cliente, qual usuário, qual regra, qual integração e que tipo de erro — sem intervenção de desenvolvedor e sem acessar dados sensíveis.' },
  logTitle: { en: '1. Logging Strategy — Structured Events', pt: '1. Estratégia de Logs — Eventos Estruturados' },
  logBody:  { en: 'Every business action emits a structured log event with a trace ID, client ID, rule ID, and error classification. No free-text logs. No printf debugging. Every field is queryable.', pt: 'Cada ação de negócio emite um evento de log estruturado com trace ID, client ID, rule ID e classificação de erro. Sem logs de texto livre. Sem debugging com printf. Cada campo é consultável.' },
  errTitle: { en: 'Error Classification — 3 Types', pt: 'Classificação de Erros — 3 Tipos' },
  errors: {
    en: [
      { type:'TECH_ERROR',   color:'#ef5350', desc:'Infrastructure failure — DB timeout, network error, Lambda cold start. Support escalates to DevOps. No business impact implied.' },
      { type:'RULE_ERROR',   color:'#ffa726', desc:'Business rule produced unexpected result — validation failed, calculation out of range. Support escalates to Analyst. Requires ADR investigation.' },
      { type:'CONFIG_ERROR', color:'#ce93d8', desc:'Missing or invalid client configuration — rule ID not found, parameter null. Support can fix directly in client_config table with audit trail.' },
    ],
    pt: [
      { type:'TECH_ERROR',   color:'#ef5350', desc:'Falha de infraestrutura — timeout de DB, erro de rede, cold start de Lambda. Suporte escala para DevOps. Sem impacto de negócio implícito.' },
      { type:'RULE_ERROR',   color:'#ffa726', desc:'Regra de negócio produziu resultado inesperado — validação falhou, cálculo fora do intervalo. Suporte escala para o Analista. Requer investigação de ADR.' },
      { type:'CONFIG_ERROR', color:'#ce93d8', desc:'Configuração de cliente ausente ou inválida — rule ID não encontrado, parâmetro nulo. Suporte pode corrigir diretamente na tabela client_config com trilha de auditoria.' },
    ],
  },
  stackTitle: { en: '2–8. Full Observability Stack', pt: '2–8. Stack Completa de Observabilidade' },
  stack: {
    en: [
      { title:'Metrics', desc:'Batch success rate per client, average processing time, error rate by type, integration latency. Dashboards in CloudWatch / Grafana. SLA alerts when client error rate > 2%.' },
      { title:'Tracing', desc:'Distributed trace spans the full request lifecycle: HTTP entry → rule evaluation → SP execution → integration call → response. Trace ID correlates all log lines from one operation.' },
      { title:'Functional Audit', desc:'Immutable audit trail: who ran what, when, for which client, with which result. Not for debugging — for compliance. Stored in a write-once append log, not the main DB.' },
      { title:'Dashboards', desc:'Support dashboard shows: last 100 batch runs per client, error breakdown, integration status, last successful run per client. No raw DB access required.' },
      { title:'Alerts', desc:'PagerDuty/SNS alert when: batch fails for any client, error rate spikes, integration unreachable for > 5 min, processing time exceeds 2× baseline.' },
      { title:'Support AI Assistant', desc:'Agent with access to structured logs and runbooks. Support types "Client X batch failed" and gets: last run time, error type, rule that was applied, suggested action. No code required.' },
    ],
    pt: [
      { title:'Métricas', desc:'Taxa de sucesso de lote por cliente, tempo médio de processamento, taxa de erro por tipo, latência de integração. Dashboards no CloudWatch / Grafana. Alertas de SLA quando taxa de erro > 2%.' },
      { title:'Rastreamento', desc:'Trace distribuído abrange todo o ciclo de vida: entrada HTTP → avaliação de regra → execução de SP → chamada de integração → resposta. O Trace ID correlaciona todas as linhas de log de uma operação.' },
      { title:'Auditoria Funcional', desc:'Trilha de auditoria imutável: quem executou o quê, quando, para qual cliente, com qual resultado. Não é para debug — é para conformidade. Armazenado em log append-only, não no DB principal.' },
      { title:'Dashboards', desc:'Dashboard de suporte mostra: últimas 100 execuções de lote por cliente, breakdown de erros, status de integrações, última execução bem-sucedida por cliente. Sem acesso direto ao DB.' },
      { title:'Alertas', desc:'Alerta PagerDuty/SNS quando: lote falha para qualquer cliente, taxa de erros dispara, integração inacessível por > 5 min, tempo de processamento ultrapassa 2× a baseline.' },
      { title:'Assistente de IA para Suporte', desc:'Agente com acesso a logs estruturados e runbooks. Suporte digita "Lote do Cliente X falhou" e recebe: último horário de execução, tipo de erro, regra aplicada, ação sugerida. Sem código.' },
    ],
  },
  lgpdTitle: { en: '10. LGPD — What Support Cannot See', pt: '10. LGPD — O Que o Suporte Não Pode Ver' },
  lgpd: {
    en: [
      { title:'🔒 Hidden from support', items:['CPF / CNPJ','Patient names','Raw financial values','Bank account numbers','Personal contact data'] },
      { title:'✅ Visible to support', items:['Client ID + name','Error code + type','Timestamp + duration','Rule ID applied','Integration that failed'] },
    ],
    pt: [
      { title:'🔒 Oculto do suporte', items:['CPF / CNPJ','Nomes de pacientes','Valores financeiros brutos','Números de conta bancária','Dados de contato pessoal'] },
      { title:'✅ Visível para o suporte', items:['ID + nome do cliente','Código + tipo do erro','Timestamp + duração','Rule ID aplicado','Integração que falhou'] },
    ],
  },
  liveText: { en: 'Watch a live structured audit trace stream in real time — pick a scenario (success, config error, rule error) and see exactly what support would see in the dashboard.', pt: 'Veja um stream de trace de auditoria estruturado ao vivo — escolha um cenário (sucesso, erro de config, erro de regra) e veja exatamente o que o suporte veria no dashboard.' },
  liveBtn:  { en: '▶ Try it live on AWS →', pt: '▶ Experimente ao vivo na AWS →' },
}
