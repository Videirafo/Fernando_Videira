# Em desenvolvimento

Esta área registra projetos, estudos aplicados e linhas de engenharia em evolução.

O objetivo não é publicar código privado: é documentar **problemas, arquitetura, decisões, tecnologias, aprendizados e progresso verificável**.

## Estado

| Projeto / frente | Categoria | Estado | Foco |
|---|---|---:|---|
| **MarcaIA** | SaaS / AI | Ativo | agenda, CRM, atendimento e agentes de IA |
| **AI Agents & Automation Lab** | IA / integração | Contínuo | RAG, tools, workflows, handoff e observabilidade |
| **System Modeling 2026** | Arquitetura | Ativo | requisitos, UML, BPMN, C4, contratos e ADR |
| **Python Backend 2026** | Backend | Em evolução | Django/DRF, FastAPI, APIs, testes e ASGI |
| **Platform & VPS Engineering** | DevOps | Contínuo | Linux, Nginx, deploy, rollback, logs e CI/CD |

---

## MarcaIA

### Problema

Pequenos negócios costumam operar agenda, mensagens, clientes e atendimento em ferramentas desconectadas.

### Direção

Construção de uma plataforma SaaS multi-tenant que centraliza:

- agenda e marcação;
- serviços e profissionais;
- CRM simples;
- WhatsApp e Instagram;
- automações;
- agentes de IA;
- histórico e auditoria.

### Stack de referência

```text
Next.js / TypeScript
PostgreSQL
Supabase
Tailwind
Node.js
Linux / VPS
Nginx
GitHub Flow
```

### Critérios técnicos

- isolamento multi-tenant;
- autorização por contexto;
- experiência mobile;
- observabilidade;
- rollback;
- documentação sincronizada;
- testes para fluxos críticos.

---

## AI Agents & Automation Lab

Pesquisa aplicada para agentes conversacionais que possam operar em ambientes reais.

### Assuntos

- LLM orchestration;
- RAG / GraphRAG;
- tool calling;
- MCP e interoperabilidade;
- memória de conversa;
- guardrails;
- avaliação;
- handoff humano;
- Chatwoot/CRM;
- workflows;
- APIs oficiais de mensageria;
- logs e auditoria.

### Princípio

Um agente não é considerado pronto apenas porque responde bem em uma demonstração.

Para produção, o sistema precisa considerar:

```text
qualidade
+ segurança
+ contexto
+ permissões
+ latência
+ custo
+ fallback
+ logs
+ avaliação
+ intervenção humana
```

---

## System Modeling 2026

Estrutura para conectar análise e implementação:

```text
Problema
  ↓
Requisitos
  ↓
Regras de negócio
  ↓
Casos de uso
  ↓
UML / BPMN / C4
  ↓
Dados e contratos
  ↓
Implementação
  ↓
Testes
```

### Artefatos

- FR / NFR / BR;
- Use Cases;
- Sequence Diagram;
- State Machine;
- Class Diagram;
- BPMN;
- C4;
- ERD;
- OpenAPI;
- AsyncAPI;
- ADR;
- matriz de rastreabilidade.

---

## Python Backend 2026

Estudo e aplicação de padrões modernos para backends Python.

### Django / DRF

Foco em:

- aplicações por domínio;
- models;
- serializers;
- services;
- selectors;
- permissions;
- migrations;
- testes;
- PostgreSQL;
- APIs documentadas.

### FastAPI

Foco em:

- APIs tipadas;
- Pydantic;
- dependency injection;
- autenticação;
- service layer;
- integrações de IA;
- workloads I/O-heavy;
- OpenAPI;
- deploy ASGI.

---

## Platform & VPS Engineering

### Operação

- Linux;
- Nginx;
- Docker;
- processos e serviços;
- variáveis de ambiente;
- health checks;
- backups;
- deploy reversível;
- monitoramento;
- incident response.

### Regra operacional

```text
AUDIT → BACKUP → CHANGE → TEST → DEPLOY → VERIFY → OBSERVE → ROLLBACK IF NEEDED
```

---

## Como esta área evolui

Cada frente pode ganhar futuramente:

- case study;
- ADRs;
- diagramas;
- screenshots sem dados sensíveis;
- métricas técnicas;
- postmortems sanitizados;
- exemplos isolados e reproduzíveis;
- links para projetos públicos relacionados.

O histórico deve representar trabalho real, sem commits artificiais apenas para aumentar atividade no perfil.
