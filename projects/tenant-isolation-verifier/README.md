# Tenant Isolation Verifier Lab

Laboratório defensivo e **localhost-only** para demonstrar como testes automatizados detectam Broken Object Level Authorization (BOLA) e vazamento cross-tenant em APIs SaaS.

> O projeto não escaneia sites externos, não enumera IDs e não usa credenciais reais. Ele executa somente contra a API fictícia local incluída no próprio repositório.

## Arquitetura

```text
Tenant alpha / Tenant beta
        ↓
Authorization test matrix
        ↓
Demo API @ 127.0.0.1
   ├── /safe/...        → valida actor tenant
   └── /vulnerable/...  → falha intencional de ensino
        ↓
Verifier
   ├── status contract
   ├── cross-tenant response check
   └── findings
```

## Por que isso importa

OWASP API1:2023 — Broken Object Level Authorization destaca que APIs que recebem identificadores de objetos precisam verificar se o usuário autenticado realmente pode operar sobre aquele objeto. Em SaaS multi-tenant, uma falha desse tipo pode virar acesso de um tenant aos dados de outro.

## Requisitos

- Node.js 24 LTS.

## Executar

Terminal 1:

```bash
cd projects/tenant-isolation-verifier
npm run demo
```

Terminal 2 — implementação segura:

```bash
npm run verify:safe
```

Resultado esperado: `PASS`, 4/4 casos.

Implementação vulnerável de ensino:

```bash
npm run verify:vulnerable
```

Resultado esperado: exit code `2`, com dois findings `cross-tenant-data-leak`.

## Matriz

| Ator | Recurso | Esperado |
|---|---|---|
| alpha | alpha | permitir |
| beta | beta | permitir |
| alpha | beta | negar |
| beta | alpha | negar |

O verifier falha também se uma resposta expuser `tenant_id` diferente do ator.

## Guardrail de segurança

A função de verificação rejeita qualquer `base-url` cujo hostname não seja `127.0.0.1`, `localhost` ou loopback IPv6. Isso mantém o projeto como laboratório defensivo reproduzível, não como scanner de terceiros.

## Testes

```bash
npm test
npm run check
```

Os testes sobem o servidor local em porta efêmera, provam que o endpoint seguro passa, provam que o endpoint vulnerável é detectado e validam a recusa de host remoto.

## VS Code

```bash
code projects/tenant-isolation-verifier
```

Há tasks para iniciar a demo API, executar a matriz segura/vulnerável e rodar testes, além de configurações Run/Debug.

## Como aplicar em um SaaS real

Em um projeto real, a mesma ideia deve ser incorporada ao test suite da aplicação com identidades de teste próprias e dados sintéticos:

```text
owner/admin/member
× tenant A/tenant B
× read/create/update/delete
× object IDs válidos e de outro tenant
```

Nunca use dados reais de clientes para esse tipo de teste automatizado.
