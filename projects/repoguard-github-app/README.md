# RepoGuard GitHub App

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

Para rodar o webhook localmente, crie **somente na sua máquina** um `.env`/variáveis de ambiente com:

```text
GH_APP_ID=<id do GitHub App>
GH_WEBHOOK_SECRET=<segredo aleatório>
GH_PRIVATE_KEY_PATH=/caminho/fora-do-git/app.private-key.pem
PORT=3000
```

`.env`, `.pem`, `.key` e private keys estão no `.gitignore`.

## Registrar o GitHub App

No GitHub, registre um GitHub App com o menor conjunto de permissões necessário:

- Metadata: read;
- Pull requests: read;
- Issues: read & write, usado apenas para comentar no PR;
- webhook event: Pull request.

Configure `/webhook` como Webhook URL e use um segredo forte. Instale inicialmente apenas na própria conta/repositórios de teste.

## VS Code

Abra esta pasta diretamente:

```bash
code projects/repoguard-github-app
```

Tasks disponíveis: testes, syntax check e start. A configuração Run/Debug lê `.env` local, que nunca deve ser commitado.

## Segurança

- valida `X-Hub-Signature-256` com comparação timing-safe;
- GitHub App JWT expira em minutos;
- installation token é obtido sob demanda;
- private key nunca é armazenada no repositório;
- mensagens de erro HTTP não expõem secrets;
- regras não executam código do PR.

## Próximo passo

Depois de registrar o app e provar um webhook real, ele se torna um candidato concreto para demonstrar uso da GitHub API no **GitHub Developer Program**.
