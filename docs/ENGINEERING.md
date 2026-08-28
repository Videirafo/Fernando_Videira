# Engineering Operating Model

Este documento descreve o modelo de execução usado como referência nos projetos apresentados neste portfólio.

## Ciclo principal

```text
RECALL
→ CLASSIFY
→ DISCOVER
→ GROUND
→ SPECIFY
→ DESIGN
→ PLAN
→ ISSUE / BRANCH
→ BUILD
→ TEST
→ REVIEW
→ SHIP
→ OBSERVE
→ LEARN
→ REMEMBER
```

## 1. Descoberta

Antes de alterar um sistema existente:

- identificar o problema real;
- inspecionar o repositório;
- localizar entrypoints;
- entender arquitetura e dependências;
- revisar banco e migrations;
- verificar autenticação/autorização;
- levantar riscos;
- conferir documentação e testes;
- distinguir fato de hipótese.

## 2. Especificação

Quando necessário, transformar a demanda em:

- requisito funcional (`FR`);
- requisito não funcional (`NFR`);
- regra de negócio (`BR`);
- caso de uso (`UC`);
- contrato de API/evento;
- critério de aceitação;
- teste.

## 3. Modelagem

Escolher o menor conjunto de modelos que realmente reduza ambiguidade.

| Pergunta | Modelo |
|---|---|
| Quem usa o sistema e para quê? | UML Use Case |
| Como o processo atravessa papéis/áreas? | BPMN |
| Qual é o fluxo interno? | Activity Diagram |
| Quem chama quem e em qual ordem? | Sequence Diagram |
| Quais estados uma entidade possui? | State Machine |
| Quais conceitos compõem o domínio? | Class Diagram / ERD |
| Como o sistema se encaixa no ecossistema? | C4 Context |
| Quais apps/serviços/datastores existem? | C4 Container |
| Por que uma decisão técnica foi tomada? | ADR |

## 4. Implementação

Princípios:

- menor mudança reversível;
- responsabilidades explícitas;
- fronteiras claras;
- evitar abstração sem necessidade;
- manter contratos estáveis;
- validar entradas;
- autorização próxima da regra protegida;
- migrations controladas;
- logs úteis;
- erros acionáveis.

## 5. GitHub Flow

```text
Issue
→ branch
→ implementação
→ testes
→ Pull Request
→ CI
→ revisão
→ merge
→ deploy
→ observação
```

Commits e PRs devem explicar **por que** a alteração existe, não apenas quais arquivos mudaram.

## 6. Qualidade

### Testes críticos

Cobrir quando aplicável:

1. happy path;
2. validação;
3. autenticação;
4. autorização;
5. tenant/ownership isolation;
6. not found;
7. edge cases;
8. idempotência;
9. falhas de integração;
10. regressão.

### Segurança

- secrets fora do Git;
- princípio do menor privilégio;
- CORS restrito em produção;
- rate limiting quando necessário;
- auditoria de operações críticas;
- dependências revisadas;
- dados sensíveis classificados;
- rollback conhecido.

### Observabilidade

- logs estruturados;
- métricas relevantes;
- rastreamento de erros;
- health checks;
- alertas acionáveis;
- correlação de requests/jobs quando necessário.

## 7. Deploy

Antes de mudanças de produção:

```text
AUDIT → BACKUP → CHANGE → TEST → DEPLOY → VERIFY → OBSERVE
```

Rollback não deve ser improvisado depois de um incidente.

## 8. Documentação

Documentação útil deve responder perguntas operacionais:

- o que é o sistema;
- por que ele existe;
- como executar;
- como testar;
- como implantar;
- como recuperar;
- onde ficam decisões e contratos;
- quais riscos são conhecidos.

Uma documentação bonita porém divergente do código é considerada defeito.
