# Open Source Targets — agosto de 2026

Objetivo: construir reputação técnica pública através de contribuições reais em projetos relacionados à stack usada e estudada.

## Critério de seleção

Um alvo entra na lista quando atende a pelo menos três condições:

- relação direta com a stack;
- projeto ativo e relevante;
- contribuição pública verificável;
- documentação de contribuição clara;
- issues/discussions onde seja possível ajudar com contexto real;
- possibilidade de começar por docs, reprodução, teste ou correção pequena.

## 1. Next.js

Repositório:

- https://github.com/vercel/next.js
- https://github.com/vercel/next.js/contribute

Estado observado em 28/08/2026:

- existe página oficial `Contribute` com issues `good first issue`;
- várias issues listadas são antigas, então o primeiro passo é verificar relevância antes de começar;
- discussão recente de agosto/2026 recomenda procurar issues recentes, avisar que está investigando e priorizar reprodução clara, docs, bugs pequenos, mensagens de erro e testes de regressão.

Primeiros tipos de contribuição:

```text
documentação
→ reprodução mínima
→ teste de regressão
→ erro/mensagem enganosa
→ TypeScript/lint pequeno
```

Referência recente:

- https://github.com/vercel/next.js/discussions/97764

## 2. Supabase

Repositório:

- https://github.com/supabase/supabase
- https://github.com/supabase/supabase/contribute

Estado observado:

- há ao menos um `good first issue` exposto na página Contribute;
- o CONTRIBUTING orienta verificar PRs existentes, vincular Issue, discutir features antes do PR e rodar build/format antes de enviar.

Áreas de maior aderência:

- Auth;
- PostgreSQL;
- RLS;
- Dashboard;
- docs;
- self-hosting;
- examples;
- segurança de configuração.

Referência:

- https://github.com/supabase/supabase/blob/master/CONTRIBUTING.md

## 3. FastAPI

Repositório:

- https://github.com/fastapi/fastapi
- https://github.com/fastapi/fastapi/contribute

Estado observado:

- a página Contribute não exibe `good first issues` atualmente;
- o projeto possui labels `good first issue`, `help wanted`, `docs` e outras;
- contribuição útil pode começar respondendo perguntas, investigando comportamento ou melhorando documentação/testes.

Áreas de aderência:

- Pydantic;
- autenticação;
- OpenAPI;
- async;
- exemplos;
- testes;
- documentação.

## 4. Django

Repositório:

- https://github.com/django/django

Django usa um processo de contribuição próprio e orienta novos contribuidores a procurar tickets `easy pickings` no Trac.

Referências:

- https://github.com/django/django/blob/main/docs/intro/contributing.txt
- https://github.com/django/django/blob/main/docs/internals/contributing/triaging-tickets.txt

Contribuições adequadas:

- documentação;
- testes faltantes;
- reprodução de regressão;
- triagem;
- pequenas correções `easy pickings`.

## 5. n8n

Repositório:

- https://github.com/n8n-io/n8n
- https://github.com/n8n-io/n8n/contribute

Estado observado:

- o repositório possui labels `Good First Issue` e `Help Wanted`;
- a página Contribute não apresenta um `good first issue` disponível neste momento;
- portanto, melhor estratégia é acompanhar issues recentes de automação, integrações, execução e docs em vez de pegar issue antiga só pelo label.

Áreas de aderência:

- workflows;
- nodes/integrations;
- webhooks;
- credentials/config;
- docs;
- bugs reproduzíveis de execução.

## Ordem recomendada

### Faixa A — começar agora

1. Next.js: docs/reprodução/teste de regressão em issue recente.
2. Supabase: docs, Auth/RLS/self-hosting ou issue pequena após validar que não há PR concorrente.

### Faixa B — construir presença

3. FastAPI: ajudar em Discussions/issues antes de tentar mudança maior.
4. Django: `easy pickings`, docs ou teste.
5. n8n: issue recente e bem reproduzível ligada a workflows/integrações.

## Checklist antes de comentar ou abrir PR externo

```text
[ ] li CONTRIBUTING
[ ] confirmei que a issue ainda é válida
[ ] procurei PR aberto concorrente
[ ] reproduzi o problema
[ ] sei qual teste prova a correção
[ ] mudança é pequena e específica
[ ] não vou misturar refactor não relacionado
[ ] não há dados privados/secrets no material de reprodução
```

## Meta inicial

Não perseguir volume.

Meta profissional:

```text
1 contribuição externa mergeada
→ 3 contribuições úteis em projetos diferentes
→ 1 colaboração recorrente
→ 1 projeto próprio atraindo usuários/contribuidores
```

Esse histórico vale mais para reputação do que dezenas de PRs artificiais em repositórios próprios.