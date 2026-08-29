# RepoGuard GitHub App

[![RepoGuard GitHub App](https://github.com/Videirafo/Fernando_Videira/actions/workflows/repoguard-github-app.yml/badge.svg?branch=main)](https://github.com/Videirafo/Fernando_Videira/actions/workflows/repoguard-github-app.yml)

GitHub App funcional que recebe webhooks de Pull Request, aplica regras determinísticas e publica um resumo diretamente no PR.

## Por que existe

Demonstrar integração real com GitHub Apps sem transformar qualidade em um prompt de IA. As regras são explícitas, testáveis e auditáveis.

## O que verifica

- PR referencia uma Issue (`Closes #N`, `Fixes #N` ou `Refs #N`);
- tamanho do PR permanece dentro de um limite configurável;
- caminhos potencialmente sensíveis (`.env`, private keys, credentials) exigem revisão.

## Arquitetura

```text
GitHub Pull Request
      ↓ webhook
HMAC SHA-256 verification
      ↓
GitHub App installation token
      ↓
GET changed files
      ↓
Deterministic policy engine
      ↓
POST PR comment
```

## Stack

- Node.js 24 LTS;
- `node:http`, `node:crypto` e `fetch` nativos;
- zero dependências de runtime;
- `node:test`;
- GitHub REST API.

## Executar

```bash
cd projects/repoguard-github-app
npm test
npm run check
```

Para rodar o webhook localmente, defina **somente na sua máquina/servidor autorizado**:

```text
GH_APP_ID=<id do GitHub App>
GH_WEBHOOK_SECRET=<segredo aleatório>
GH_PRIVATE_KEY_PATH=/caminho/fora-do-git/app.private-key.pem
PORT=3000
```

`.env`, `.pem`, `.key` e private keys estão no `.gitignore`.

## Registrar o GitHub App

Use o menor conjunto de permissões necessário:

- Metadata: read;
- Pull requests: read;
- Issues: read & write, usado apenas para comentar no PR;
- webhook event: Pull request.

Configure `/webhook` como Webhook URL, use um segredo forte e instale inicialmente apenas na própria conta/repositórios de teste.

## VS Code

```bash
code projects/repoguard-github-app
```

Tasks: testes, syntax check e start. A configuração Run/Debug lê `.env` local, que nunca deve ser commitado.

## Segurança

- valida `X-Hub-Signature-256` com comparação timing-safe;
- GitHub App JWT expira em minutos;
- installation token é obtido sob demanda;
- private key nunca é armazenada no repositório;
- mensagens de erro HTTP não expõem secrets;
- regras não executam código do PR.

## Próximo passo

Depois de registrar o app e provar um webhook real, ele se torna evidência concreta de uma integração usando a GitHub API para o **GitHub Developer Program**.
