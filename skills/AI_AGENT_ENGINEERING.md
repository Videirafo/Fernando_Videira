# AI AGENT ENGINEERING

## Objetivo

Projetar agentes de IA para produção com comportamento verificável, integração segura com ferramentas e capacidade de handoff humano.

## Arquitetura mental

```text
User / Channel
   ↓
Conversation Gateway
   ↓
Agent Orchestrator
   ├── policy / guardrails
   ├── memory
   ├── retrieval
   ├── tools
   ├── workflow engine
   └── human handoff
   ↓
Business Systems / APIs
```

## Componentes

- LLM orchestration
- RAG e GraphRAG
- tool calling
- MCP / A2A e interoperabilidade
- memória de curto e longo prazo
- guardrails
- permissões por ferramenta
- human-in-the-loop
- CRM / Chatwoot handoff
- avaliação e datasets
- logs, traces e métricas
- prompt injection defenses
- isolamento multi-tenant

## Regras

1. Não dar ao agente mais permissão do que precisa.
2. Distinguir conhecimento recuperado de instrução executável.
3. Validar argumentos antes de chamar ferramentas.
4. Registrar ações importantes em audit log.
5. Criar fallback humano para casos de baixa confiança ou alto impacto.
6. Testar prompt injection, autorização e vazamento entre tenants.
7. Medir sucesso do fluxo, não apenas qualidade textual.
8. Não acoplar regras críticas exclusivamente ao prompt.

## RAG

Pipeline recomendado:

```text
ingest → normalize → chunk → metadata → index → retrieve → rerank
→ context policy → generation → citation/evidence → evaluation
```

## Avaliação

Cobrir:

- task success;
- precisão de recuperação;
- groundedness;
- ferramenta correta;
- argumentos corretos;
- taxa de handoff;
- segurança;
- latência;
- custo;
- regressões.

## Produção

O agente deve ser observável como qualquer serviço:

```text
request_id
conversation_id
tenant_id
tool_calls
retrieval_hits
latency
token/cost usage
policy decisions
handoff reason
final outcome
```