# SYSTEM-MODELING-2026

## Objetivo

Transformar ideias, regras de negócio e sistemas existentes em especificações claras, visuais, rastreáveis e implementáveis.

## Abrange

- Engenharia de Requisitos
- Casos de Uso
- UML
- BPMN
- C4 Model
- modelagem conceitual, lógica e física de dados
- ERD
- OpenAPI
- AsyncAPI
- ADRs
- rastreabilidade requisito → código → teste
- diagramas como código

## Identificadores

```text
FR-###   requisito funcional
NFR-###  requisito não funcional
BR-###   regra de negócio
UC-###   caso de uso
API-###  contrato/API
EVT-###  evento
ADR-###  decisão arquitetural
TEST-### cenário/teste
```

## Pipeline

```text
DISCOVER
→ REQUIREMENTS
→ BUSINESS RULES
→ USE CASES
→ UML/BPMN/C4
→ DATA MODEL
→ CONTRACTS
→ ADR
→ TRACEABILITY
→ IMPLEMENTATION
→ TESTS
→ DOC SYNC
```

## Matriz de escolha de diagrama

| Pergunta | Diagrama |
|---|---|
| Quem usa e para quê? | UML Use Case |
| Como o processo atravessa áreas? | BPMN |
| Qual o fluxo lógico? | UML Activity |
| Quem chama quem e em qual ordem? | UML Sequence |
| Quais estados uma entidade possui? | UML State Machine |
| Quais conceitos e relações existem? | UML Class / ERD |
| Como o sistema se encaixa no ecossistema? | C4 Context |
| Quais apps, serviços e datastores compõem o sistema? | C4 Container |
| Quais módulos internos importam? | C4 Component |
| Onde executa? | C4/UML Deployment |

## Caso de Uso

Um ator representa um papel **externo** ao sistema sob análise. Sistemas terceiros devem ser nomeados explicitamente.

Use `<<include>>` para comportamento obrigatório reutilizado e `<<extend>>` para comportamento opcional/condicional.

Especificação recomendada:

```text
ID
Nome
Objetivo
Escopo
Ator primário
Atores secundários
Gatilho
Pré-condições
Pós-condições
Fluxo principal
Fluxos alternativos
Exceções
Regras relacionadas
Requisitos relacionados
Dados
APIs/Eventos
Critérios de aceitação
Testes
```

## Diagramas como código

- PlantUML: UML completo
- Mermaid: documentação Markdown e diagramas simples
- Structurizr DSL: C4
- Astah: quando `.asta`/entrega acadêmica for requisito

Sempre que possível manter **fonte editável + render + implementação**.

## Regra principal

Uma documentação bonita e divergente do código é pior que nenhuma documentação. Em sistemas existentes, modelar o AS-IS a partir de evidência antes de definir o TO-BE.