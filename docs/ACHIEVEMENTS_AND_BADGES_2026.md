# GitHub Achievements & Badges — estado em agosto de 2026

Este documento separa **Achievements** de **badges de programas oficiais** e evita perseguir conquistas experimentais, removidas ou baseadas em farming artificial.

## 1. Achievements atualmente úteis como meta

| Achievement | Critério conhecido | Estratégia correta |
|---|---|---|
| Pull Shark | PRs mergeados | continuar melhorias reais via Issue → branch → PR → CI |
| Quickdraw | fechar Issue/PR em até poucos minutos após abrir | apenas quando ocorrer uma correção real e imediata |
| YOLO | merge sem review | não perseguir; review tem prioridade quando agrega segurança |
| Pair Extraordinaire | coautoria real em PR mergeado | trabalhar com colaborador real e preservar autoria corretamente |
| Galaxy Brain | respostas aceitas em GitHub Discussions | responder problemas técnicos reais com evidência e reprodução |
| Starstruck | repo próprio alcança stars suficientes | criar projeto público útil e divulgável |
| Public Sponsor | patrocínio público | somente se houver decisão real de apoiar open source |

### Tiers comunitariamente observados

```text
Pull Shark:          2 → 16 → 128 → 1024 PRs mergeados
Pair Extraordinaire: 1 → 10 → 24 → 48 PRs coautorados mergeados
Galaxy Brain:        2 → 8 → 16 → 32 respostas aceitas
Starstruck:          16 → 128 → 512 → 4096 stars
```

> O GitHub não expõe uma API pública confiável com o contador exato de progresso de cada Achievement. Os thresholds acima devem ser tratados como referências observadas e revistos periodicamente.

## 2. Achievements experimentais que NÃO entram no plano

### Open Sourcerer
### Heart On Your Sleeve

Em março de 2026 os dois apareceram temporariamente em perfis, mas o próprio GitHub informou na Community que isso ocorreu por engano: eram parte de um rollout experimental e foram removidos novamente.

Por isso:

- não criar atividade para persegui-los;
- não contar com eles no roadmap;
- reavaliar somente se GitHub anunciar disponibilidade oficial futura.

Referências públicas:

- https://github.com/orgs/community/discussions/190842
- https://github.com/orgs/community/discussions/44972

## 3. Badges oficiais de programas GitHub

Além dos Achievements, o GitHub exibe badges quando a pessoa participa de determinados programas.

### Developer Program Member

Caminho alinhado ao portfólio técnico:

1. construir uma integração real usando GitHub REST ou GraphQL API;
2. manter um canal de suporte/contato;
3. registrar-se no GitHub Developer Program.

A documentação oficial informa que o programa é aberto a desenvolvedores e empresas com uma integração em produção ou desenvolvimento usando a GitHub API.

Referências:

- https://docs.github.com/en/integrations/concepts/github-developer-program
- https://docs.github.com/en/account-and-profile/reference/profile-reference

### Pro

O badge PRO aparece para usuários do GitHub Pro. É um benefício de plano, não uma evidência de engenharia, portanto não deve substituir qualidade de repositório ou contribuição.

### Security Bug Bounty Hunter

Pode aparecer para quem ajuda a encontrar vulnerabilidades dentro do programa de segurança do GitHub. Não é algo para “caçar badge”; somente vulnerabilidades reais, responsáveis e dentro das regras do programa devem ser reportadas.

### Security advisory credit

Se uma contribuição/advisory enviada ao GitHub Advisory Database for aceita, o perfil pode receber crédito de advisory de segurança. É um caminho técnico forte quando houver descoberta legítima e bem documentada.

### GitHub Campus Expert

É um badge de programa, não achievement. A candidatura exige critérios específicos de elegibilidade acadêmica e participação no programa Campus Experts.

Referência oficial:

- https://docs.github.com/en/account-and-profile/reference/profile-reference

## 4. Prioridade prática

```text
ALTA
1. Perfil README real
2. 3–5 projetos públicos fortes e fixados
3. Pull Shark por PRs úteis
4. primeiro projeto open source próprio
5. primeira contribuição externa mergeada
6. Starstruck por stars orgânicas
7. Developer Program Member via integração real

MÉDIA
8. Pair Extraordinaire via colaboração legítima
9. Galaxy Brain via respostas técnicas aceitas
10. Security advisory credit quando surgir oportunidade real

NÃO PERSEGUIR
- farming de Quickdraw/YOLO
- PRs vazios
- commits artificiais
- coautoria falsa
- achievements experimentais removidos
```

## 5. Regra de reputação

Um badge só melhora o perfil quando é compatível com o histórico que o visitante vê.

O objetivo é que cada achievement tenha uma evidência por trás:

```text
achievement
  ↓
PR / discussão / projeto / integração real
  ↓
README e documentação
  ↓
testes / CI / release
  ↓
valor público verificável
```
