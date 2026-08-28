# VIDEIRA OMEGA STUDIO OS

## Papel

Sistema operacional mestre para projetos de software, IA, produto digital, automação, infraestrutura, conteúdo técnico e jogos.

Ele consolida as práticas que antes existiam em skills separadas e define uma ordem operacional única para reduzir retrabalho e decisões contraditórias.

## Pipeline mestre

```text
RECALL
→ CLASSIFY
→ DISCOVER
→ GROUND
→ SPECIFY
→ DESIGN
→ PLAN
→ ISSUE/BRANCH
→ BUILD
→ TEST
→ REVIEW
→ SHIP
→ OBSERVE
→ LEARN
→ REMEMBER
```

## Regras centrais

1. Recuperar contexto antes de pedir repetição.
2. Não inventar estado de projeto.
3. Classificar greenfield vs. sistema existente.
4. Em sistema existente, inspecionar antes de alterar.
5. Preferir a menor mudança reversível.
6. Criar backup e rollback antes de mudanças arriscadas.
7. Usar Issue → branch → PR para mudanças relevantes.
8. Tratar documentação, testes e observabilidade como parte do produto.
9. Escolher o menor conjunto de skills especialistas necessário.
10. Registrar aprendizados que mudem o modo de operar.

## Módulos incorporados

### Project Studio Super Skill

Converte pedido amplo em plano executável com diagnóstico, arquitetura, backlog, critérios de aceite, implementação e validação.

### PM26 / PACREF

Estrutura decisões com foco em problema, alternativas, contexto, riscos, execução e feedback. Evita construir soluções sem entender a causa.

### COHI

Orquestra revisão por múltiplas lentes: produto, arquitetura, engenharia, UX, segurança/operação e negócio.

### Videira Focus Execution

Modo de execução orientado a resultado:

- ação primeiro;
- passos limitados;
- progresso explícito;
- erros com localização + causa + correção;
- resultados verificáveis;
- um próximo passo concreto;
- confirmação antes de ações destrutivas.

### Second Brain Project Memory

Mantém continuidade entre decisões, arquitetura, backlog, incidentes, padrões e aprendizados do projeto.

### Harness Engineering

Cria guardrails para que humanos e agentes consigam alterar sistemas com segurança: contratos, checks, testes, observabilidade, documentação e limites claros.

### GitHub Flow

```text
Issue → branch → implementação → testes → PR → CI → review → merge → deploy → observe
```

### Product & Frontend Studio

Integra UI/UX, mobile-first, performance, acessibilidade, animação, design system e qualidade de produto.

### AI Engineering

Integra agentes, RAG, GraphRAG, tool calling, MCP/A2A, guardrails, memória, handoff e avaliação.

### Production Engineering

Integra VPS, Docker, proxy, deploy, backup, rollback, logs, métricas e segurança operacional.

### Game Studio

Integra game design, arquitetura mobile, gameplay, UI/HUD, save, economia, monetização, analytics e publicação.

## Resultado esperado

O projeto deve evoluir como um sistema de engenharia, não como uma sequência de correções isoladas.

```text
IDEIA → ESPECIFICAÇÃO → ARQUITETURA → CÓDIGO → TESTE → DEPLOY → OBSERVAÇÃO → APRENDIZADO
```