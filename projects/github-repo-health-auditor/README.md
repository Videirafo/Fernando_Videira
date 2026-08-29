# GitHub Repo Health Auditor

[![Repo Health Auditor](https://github.com/Videirafo/Fernando_Videira/actions/workflows/repo-health-auditor.yml/badge.svg?branch=main)](https://github.com/Videirafo/Fernando_Videira/actions/workflows/repo-health-auditor.yml)

CLI em Python para auditar a saúde de repositórios públicos usando a **REST API oficial do GitHub**.

O projeto mantém duas métricas separadas:

1. **GitHub community health** — valor `health_percentage` retornado pelo GitHub;
2. **Engineering Score** — score transparente deste projeto, calculado a partir de sinais objetivos como CI, SECURITY, README, CONTRIBUTING, LICENSE e templates.

Nenhum token é obrigatório para auditar repositórios públicos. `GH_TOKEN` ou `GITHUB_TOKEN` pode ser usado opcionalmente para autenticação e limites de API mais adequados.

## O que ele verifica

- metadata do repositório;
- community health oficial do GitHub;
- README;
- CONTRIBUTING;
- LICENSE;
- CODE_OF_CONDUCT;
- issue template;
- pull request template;
- SECURITY.md;
- GitHub Actions workflows;
- descrição;
- topics;
- status arquivado/ativo.

## Arquitetura

```text
CLI
 ↓
GitHubClient
 ├── /repos/{owner}/{repo}
 ├── /community/profile
 ├── /actions/workflows
 └── SECURITY.md lookup
 ↓
Audit engine
 ↓
AuditReport
 ├── text
 ├── markdown
 └── json
```

As chamadas são feitas de forma simples e sequencial. O cliente trata 404 e respostas 403/429 de rate limit/policy com erro explícito.

## Requisitos

- Python 3.12+
- Git
- VS Code opcional

## Clone e execução

```bash
git clone https://github.com/Videirafo/Fernando_Videira.git
cd Fernando_Videira/projects/github-repo-health-auditor
python -m venv .venv
```

### Linux / macOS

```bash
source .venv/bin/activate
python -m pip install -e ".[dev]"
repo-health Videirafo/Fernando_Videira
```

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".[dev]"
repo-health Videirafo/Fernando_Videira
```

## VS Code

Abra diretamente a pasta do projeto:

```bash
code .
```

A pasta `.vscode/` inclui tasks de instalação, testes e auditoria, launch config e recomendações Python.

## Exemplos

```bash
repo-health Videirafo/SaaS-Engineering-Playbook
repo-health Videirafo/SaaS-Engineering-Playbook --format markdown --output report.md
repo-health https://github.com/Videirafo/AI-Agent-Production-Checklist --format json
```

## Token opcional

Para repositórios públicos o projeto funciona sem token. Para autenticar, defina a variável somente no ambiente local.

```bash
export GH_TOKEN="seu_token_local"
```

PowerShell:

```powershell
$env:GH_TOKEN="seu_token_local"
```

**Nunca coloque token real em código, README, commit ou `.env` versionado.**

## Engineering Score

| Sinal | Pontos |
|---|---:|
| README | 15 |
| CONTRIBUTING | 10 |
| LICENSE | 10 |
| CODE_OF_CONDUCT | 5 |
| Issue template | 5 |
| Pull request template | 5 |
| SECURITY | 15 |
| CI / GitHub Actions | 20 |
| Description | 5 |
| Topics | 5 |
| Repository active | 5 |

Grades: `A ≥ 90`, `B ≥ 80`, `C ≥ 70`, `D ≥ 60`, `E < 60`.

Esse score **não é uma métrica oficial do GitHub**.

## Testes

```bash
pytest
```

Os testes usam `httpx.MockTransport`, portanto não fazem chamadas reais ao GitHub durante o CI.

## Git workflow para contribuir

```bash
git switch -c feat/minha-melhoria
pytest
git add .
git commit -m "feat: minha melhoria"
git push -u origin feat/minha-melhoria
```

Depois abra um Pull Request.

## Segurança

Este projeto não deve armazenar tokens, `.env` reais, credenciais ou conteúdo privado. Para repositórios privados, use autenticação apenas em ambiente autorizado e respeite as permissões do token.
