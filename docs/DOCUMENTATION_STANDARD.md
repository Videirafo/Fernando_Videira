# Documentation Standard

## Objetivo

Manter documentação técnica pequena o suficiente para ser atualizada e completa o suficiente para reduzir risco de engenharia.

## Estrutura recomendada

```text
docs/
├── scope/
├── requirements/
├── diagrams/
│   ├── uml/
│   ├── c4/
│   ├── bpmn/
│   └── data/
├── architecture/
│   └── adr/
├── api/
├── operations/
└── traceability/
```

A estrutura deve ser adaptada ao projeto. Pastas vazias sem propósito não são um objetivo.

## Diagramas como código

Preferência:

- PlantUML para UML;
- Mermaid para documentação Markdown e fluxos simples;
- Structurizr DSL para C4;
- Astah quando uma entrega exigir `.asta`;
- ERD/modelo relacional para dados.

Sempre que possível manter:

```text
diagrama.puml
diagrama.svg
```

ou equivalente.

Isso permite revisão, diff e reconstrução do artefato visual.

## Requisitos

Identificadores sugeridos:

- `FR-###` — funcional;
- `NFR-###` — não funcional;
- `BR-###` — regra de negócio;
- `UC-###` — caso de uso;
- `API-###` — contrato;
- `EVT-###` — evento;
- `ADR-###` — decisão;
- `TEST-###` — teste.

Requisitos importantes devem ser verificáveis.

## Caso de Uso

Template:

```text
ID:
Nome:
Objetivo:
Escopo:
Ator primário:
Atores secundários:
Gatilho:
Pré-condições:
Pós-condições:
Fluxo principal:
Fluxos alternativos:
Exceções:
Regras relacionadas:
Critérios de aceitação:
Testes relacionados:
```

Ator representa um papel ou sistema **externo** ao sistema analisado.

## C4

Usar progressivamente:

1. System Context;
2. Container;
3. Component quando necessário;
4. Code apenas quando gerar valor real.

## ADR

Registrar decisões relevantes quando existirem alternativas reais ou custo significativo de reversão.

```markdown
# ADR-00X — Título

## Status

## Contexto

## Opções consideradas

## Decisão

## Consequências

## Riscos

## Rollback / migração
```

## Contratos

Para APIs HTTP, preferir OpenAPI.

Para sistemas orientados a eventos, usar AsyncAPI quando fizer sentido.

Contratos devem representar a implementação real.

## Rastreabilidade

Para funcionalidades críticas:

| Requirement | Business Rule | Use Case | API/Event | Code | Test | Status |
|---|---|---|---|---|---|---|
| FR-001 | BR-001 | UC-001 | API-001 | módulo | TEST-001 | OK |

## Regra de atualização

Quando código e documentação divergirem:

1. registrar a divergência;
2. identificar a fonte correta;
3. corrigir código ou especificação;
4. atualizar o artefato relacionado;
5. adicionar teste quando a divergência representar risco de regressão.

**Documentação desatualizada é dívida técnica.**
