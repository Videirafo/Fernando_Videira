# Contributing

Contribuições são bem-vindas quando melhoram clareza, precisão técnica, exemplos, segurança ou reutilização desta base de conhecimento.

## Antes de contribuir

1. verifique se já existe uma Issue relacionada;
2. para mudança relevante, abra uma Issue descrevendo problema, motivação e resultado esperado;
3. não publique credenciais, dados privados, infraestrutura sensível ou código proprietário;
4. prefira mudanças pequenas, verificáveis e fáceis de revisar.

## Fluxo

```text
Issue → branch → change → validation → Pull Request → review → merge
```

## Branches

Exemplos:

```text
feat/<issue>-descricao
fix/<issue>-descricao
docs/<issue>-descricao
chore/<issue>-descricao
```

## Pull Requests

Um PR deve explicar:

- problema ou objetivo;
- o que foi alterado;
- como foi validado;
- riscos/limitações;
- impacto em segurança/privacidade;
- Issue relacionada.

## Coautoria

Quando duas ou mais pessoas realmente contribuírem para o mesmo commit, registrar a coautoria com o trailer Git apropriado:

```text
Co-authored-by: Nome <email-associado-ao-github>
```

Não adicionar coautores fictícios apenas para achievements.

## Conteúdo técnico

Ao propor atualização de tecnologia, framework ou prática:

- preferir documentação oficial;
- informar quando uma afirmação depender de versão;
- distinguir fato, recomendação e hipótese;
- evitar copiar conteúdo proprietário de terceiros.

## Segurança

Nunca incluir:

- senhas;
- tokens;
- API keys;
- `.env` real;
- private keys;
- IPs/hosts internos sensíveis;
- dumps de banco;
- dados pessoais/clientes;
- código de repositórios privados sem autorização explícita.

## Definition of Done

Uma mudança é considerada pronta quando:

- objetivo está claro;
- documentação está coerente;
- links relevantes funcionam;
- nenhum secret foi introduzido;
- checks/CI aplicáveis passaram;
- PR descreve evidência real do que foi validado.
