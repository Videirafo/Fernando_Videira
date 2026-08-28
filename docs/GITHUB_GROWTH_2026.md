# GitHub Growth & Achievements Roadmap — 2026

## Objetivo

Melhorar reputação técnica, apresentação pública e contribuição open source. Achievements devem ser consequência de trabalho verificável — não de spam de commits, issues artificiais ou automações criadas apenas para inflar atividade.

> Pesquisa revisada em 28/08/2026. O GitHub não expõe uma API pública confiável com o contador exato de cada achievement e o sistema continua em public preview. Critérios comunitários devem ser tratados como referência e validados periodicamente.

## O que o GitHub recomenda para um perfil profissional

A documentação oficial orienta:

- bio curta e profissional;
- Profile README no topo do perfil;
- contexto sobre habilidades e melhores projetos;
- **3–5 projetos fixados**;
- README útil em cada projeto;
- descrição, website/demo e topics no repositório;
- código compreensível e consistente;
- testes;
- dependências mantidas e automação de updates quando apropriado.

Referências:

- https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume
- https://docs.github.com/en/account-and-profile/reference/profile-reference

## Gap público atual

A auditoria da conta conectada mostrou apenas dois repositórios públicos próprios disponíveis para visitantes:

- `Fernando_Videira`;
- `Whazing-SaaS`.

Não alterar visibilidade de repositórios privados apenas para melhorar apresentação. A solução correta é criar novos projetos públicos projetados desde o início para compartilhamento.

Meta de apresentação:

```text
3–5 pins públicos fortes
+ Profile README
+ 1 projeto autoral com demo/release
+ 1 projeto de conhecimento reutilizável
+ contribuições externas verificáveis
```

## Achievements priorizados

| Achievement | Critério conhecido | Estratégia profissional |
|---|---|---|
| Pull Shark | PRs mergeados; tiers aumentam com volume | continuar Issue → branch → PR → CI em melhorias reais |
| Quickdraw | fechar Issue ou PR em até 5 minutos | não farmar; só aproveitar situações reais |
| YOLO | merge de PR sem review | não perseguir; qualidade e review têm prioridade |
| Pair Extraordinaire | coautoria em PR mergeado | colaborar de verdade e usar `Co-authored-by` corretamente |
| Galaxy Brain | respostas aceitas em GitHub Discussions | responder dúvidas técnicas com evidência e reprodução |
| Starstruck | repositório próprio com stars | publicar ferramenta/documentação útil com release e manutenção |
| Public Sponsor | patrocínio público via GitHub Sponsors | somente por decisão real de apoiar open source |

## Tiers comunitariamente documentados

### Pull Shark

```text
base:    2 PRs mergeados
bronze: 16
silver: 128
gold:   1024
```

### Pair Extraordinaire

```text
base:    1 PR coautorado mergeado
bronze: 10
silver: 24
gold:   48
```

### Galaxy Brain

```text
base:    2 respostas aceitas
bronze:  8
silver: 16
gold:   32
```

### Starstruck

```text
base:    16 stars em um repositório próprio
bronze: 128
silver: 512
gold:   4096
```

## Achievements experimentais removidos

`Open Sourcerer` e `Heart On Your Sleeve` **não fazem parte do roadmap atual**.

Em março de 2026 eles foram reativados brevemente, mas o próprio GitHub informou que isso ocorreu por engano e que os achievements eram parte de um rollout experimental não destinado à disponibilidade ampla.

Referências:

- https://github.com/orgs/community/discussions/190842
- https://github.com/orgs/community/discussions/44972

## Badges oficiais além dos Achievements

### Developer Program Member — prioridade alta

O GitHub informa que desenvolvedores com uma integração em produção ou desenvolvimento usando GitHub API podem ingressar no Developer Program. O perfil pode exibir o badge correspondente.

Plano legítimo:

```text
integração pública pequena
→ GitHub REST/GraphQL API
→ README + demo
→ suporte/contato
→ Developer Program
```

Referência:

- https://docs.github.com/en/integrations/concepts/github-developer-program

### Security advisory credit

Pode ser obtido quando uma contribuição válida ao GitHub Advisory Database é aceita. Só perseguir através de pesquisa responsável e informação real.

### Security Bug Bounty Hunter

Badge ligado à participação legítima no programa de segurança. Nunca fabricar vulnerabilidade, exagerar finding ou testar fora das regras do programa.

### GitHub Campus Expert

Badge de programa para pessoas elegíveis ao Campus Experts. Tratar como oportunidade separada, dependente dos critérios oficiais de candidatura.

### Pro

É badge de plano GitHub Pro e não deve ser tratado como evidência técnica.

## Plano de execução

### Fase 1 — Perfil

- criar `Videirafo/Videirafo` para o Profile README oficial;
- usar bio profissional curta;
- fixar 3–5 projetos públicos quando existirem;
- deixar os projetos principais compreensíveis em menos de um minuto.

### Fase 2 — Novos projetos públicos

Prioridade:

1. `SaaS-Engineering-Playbook`;
2. `AI-Agent-Production-Checklist`;
3. `System-Modeling-Starter`;
4. um projeto funcional público com demo.

Detalhes em [`PUBLIC_PROJECT_STRATEGY.md`](./PUBLIC_PROJECT_STRATEGY.md).

### Fase 3 — Pull Shark por engenharia real

Toda mudança relevante segue:

```text
Issue → branch → implementação → testes → PR → CI → review/merge
```

Não dividir uma única mudança artificialmente em dezenas de PRs apenas para subir contador.

### Fase 4 — Open source externo

Alvos atuais:

- Next.js;
- Supabase;
- FastAPI;
- Django;
- n8n.

Detalhes e estado observado em [`OPEN_SOURCE_TARGETS_2026-08.md`](./OPEN_SOURCE_TARGETS_2026-08.md).

Ordem de contribuição:

```text
docs
→ reprodução de bug
→ teste de regressão
→ pequena correção
→ issue maior somente depois de conhecer o projeto
```

### Fase 5 — Galaxy Brain

Responder Discussions onde exista experiência prática. Uma resposta de qualidade deve conter:

1. contexto;
2. causa provável;
3. passos reproduzíveis;
4. solução;
5. limitações;
6. referência oficial quando necessária.

### Fase 6 — Pair Extraordinaire

Somente colaboração real. O trailer `Co-authored-by:` deve refletir contribuição verdadeira e conta/e-mail válidos.

### Fase 7 — Starstruck

Criar ativos que pessoas realmente queiram salvar e reutilizar.

Requisitos antes de divulgar:

```text
README excelente
LICENSE escolhida conscientemente
quick start
examples/
docs/
release inicial
CI verde
screenshots/demo quando aplicável
issues reais para contribuição
roadmap claro
```

### Fase 8 — Developer Program Member

Construir uma ferramenta pequena e pública sobre GitHub API. Candidatos:

- dashboard read-only de saúde de repositórios;
- auditor de README/CI/security baseline;
- gerador de relatório de PRs/issues;
- visualizador de evolução de engenharia por repositório.

Não coletar tokens dos usuários sem necessidade. Preferir GitHub App/OAuth com permissões mínimas quando autenticação for necessária.

## Métricas que importam mais que medalhas

- PRs mergeados com contexto e testes;
- issues bem escritas;
- contribuições em repositórios de terceiros;
- stars orgânicas;
- forks e usuários reais;
- releases;
- documentação acessível;
- tempo de resposta a issues;
- CI consistente;
- ausência de secrets e incidentes evitáveis.

## Regra anti-farming

Não usar scripts para criar/fechar dezenas de issues ou PRs vazios. Não criar segunda conta para fabricar review, star, coautoria ou discussão aceita.

## Próximos gates

```text
Gate A — criar Profile README oficial em Videirafo/Videirafo
Gate B — criar 1º projeto público autoral
Gate C — obter 1ª contribuição externa mergeada
Gate D — lançar v0.1.0 do projeto público
Gate E — construir integração GitHub API para Developer Program
Gate F — colaboração real para Pair Extraordinaire
Gate G — respostas técnicas aceitas para Galaxy Brain
```

## Documentos relacionados

- [`ACHIEVEMENTS_AND_BADGES_2026.md`](./ACHIEVEMENTS_AND_BADGES_2026.md)
- [`OPEN_SOURCE_TARGETS_2026-08.md`](./OPEN_SOURCE_TARGETS_2026-08.md)
- [`PUBLIC_PROJECT_STRATEGY.md`](./PUBLIC_PROJECT_STRATEGY.md)
