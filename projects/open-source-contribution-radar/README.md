# Open Source Contribution Radar

CLI em Node.js para localizar e priorizar **Issues públicas reais** onde uma contribuição open source pode fazer sentido.

> O objetivo não é automatizar comentários, stars ou Pull Requests. O radar encontra oportunidades; a contribuição continua exigindo leitura, reprodução, comunicação e trabalho técnico real.

## O que ele faz

```text
GitHub Search API
      ↓
Issues abertas e recentes
      ↓
Filtros explícitos
      ↓
Ranking transparente
      ├── good first issue
      ├── help wanted
      ├── sem assignee
      ├── recência
      └── carga de discussão
      ↓
Terminal / Markdown / JSON
```

## Stack

- Node.js 24 LTS;
- `fetch` nativo;
- GitHub REST API `2026-03-10`;
- zero dependências de runtime;
- `node:test`;
- VS Code Tasks + Run/Debug;
- GitHub Actions + CodeQL pelo repositório principal.

## Clone e execução

```bash
git clone https://github.com/Videirafo/Fernando_Videira.git
cd Fernando_Videira/projects/open-source-contribution-radar
code .
npm test
npm run check
```

### Busca padrão

Sem filtros, o radar procura `good first issue` atualizadas nos últimos 30 dias:

```bash
node src/cli.mjs
```

### TypeScript + help wanted

```bash
node src/cli.mjs \
  --query "language:typescript" \
  --label "help wanted" \
  --days 30 \
  --limit 15
```

### Um repositório específico

```bash
node src/cli.mjs \
  --repo fastapi/fastapi \
  --label "help wanted" \
  --days 90
```

### Relatório Markdown

```bash
node src/cli.mjs \
  --query "language:python" \
  --days 30 \
  --limit 20 \
  --format markdown \
  --output report.md
```

### JSON para automações

```bash
node src/cli.mjs --query "language:typescript" --format json
```

## Token opcional

Para buscas públicas, o projeto pode funcionar sem autenticação. Para limites de API mais adequados, use um token **somente no ambiente local**:

Linux/macOS:

```bash
export GH_TOKEN="seu_token_local"
```

PowerShell:

```powershell
$env:GH_TOKEN="seu_token_local"
```

Nunca salve token em código, commit, README ou `.env` versionado.

## Ranking

O score é uma **heurística deste projeto**, não uma métrica do GitHub:

| Sinal | Pontos |
|---|---:|
| `good first issue` | +30 |
| `help wanted` | +20 |
| sem assignee | +15 |
| atualizada em até 7 dias | +20 |
| atualizada em até 30 dias | +12 |
| atualizada em até 90 dias | +5 |
| até 3 comentários | +10 |
| até 10 comentários | +5 |

Cada resultado inclui os motivos que formaram o score.

O ranking **não mede dificuldade, qualidade do mantenedor nem probabilidade de merge**. Ele apenas ajuda a organizar uma fila inicial de leitura.

## Fluxo correto de contribuição

Antes de tocar em código:

```text
1. Ler a Issue inteira
2. Conferir CONTRIBUTING / DEVELOPMENT / CODE_OF_CONDUCT
3. Procurar PRs e Issues duplicadas
4. Reproduzir o problema ou validar a necessidade
5. Entender testes e arquitetura do projeto
6. Comunicar intenção quando o projeto pedir isso
7. Criar mudança pequena e verificável
8. Rodar os testes exigidos pelo upstream
9. Abrir PR com contexto, evidência e escopo claro
10. Responder ao review e aceitar correções
```

Não use o radar para:

- comentar automaticamente em dezenas de Issues;
- abrir PR vazio;
- pedir stars;
- fabricar coautoria;
- tentar achievements sem contribuição real;
- competir por uma Issue que já tem trabalho ativo sem conversar com os mantenedores.

## Rate limits

O cliente trata respostas `403` e `429` explicitamente e mostra, quando disponíveis:

- `Retry-After`;
- `X-RateLimit-Reset`.

A busca é sequencial e usa uma única página por execução para evitar carga desnecessária.

## VS Code

Abra esta pasta diretamente:

```bash
code projects/open-source-contribution-radar
```

Tasks disponíveis:

- `Radar: tests`;
- `Radar: syntax check`;
- `Radar: good first issues`;
- `Radar: TypeScript help wanted`.

Também existe `Debug Contribution Radar` em **Run and Debug**.

## Testes

```bash
npm test
npm run check
```

Os testes do cliente injetam um `fetch` falso e não fazem chamadas reais ao GitHub.

## Referências oficiais

- GitHub REST API — Search issues and pull requests;
- GitHub REST API — API versioning;
- GitHub REST API — best practices;
- GitHub REST API — rate limits.

## Privacidade

O projeto pesquisa apenas metadados públicos retornados pela API. Não armazene nele credenciais, conteúdo de repositórios privados, dados de clientes, dumps, endpoints internos ou informações pessoais sensíveis.
