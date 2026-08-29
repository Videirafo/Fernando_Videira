# Tenant Isolation Verifier Lab

[![Tenant Isolation Verifier](https://github.com/Videirafo/Fernando_Videira/actions/workflows/tenant-isolation-verifier.yml/badge.svg?branch=main)](https://github.com/Videirafo/Fernando_Videira/actions/workflows/tenant-isolation-verifier.yml)

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

Terminal 2:

```bash
npm run verify:safe
npm run verify:vulnerable
```

A implementação segura deve retornar `PASS`, 4/4. A vulnerável de ensino deve sair com código `2` e findings `cross-tenant-data-leak`.

## Matriz

| Ator | Recurso | Esperado |
|---|---|---|
| alpha | alpha | permitir |
| beta | beta | permitir |
| alpha | beta | negar |
| beta | alpha | negar |

## Guardrail de segurança

A verificação rejeita qualquer `base-url` cujo hostname não seja loopback. O projeto é um laboratório defensivo reproduzível, não um scanner de terceiros.

## Testes

```bash
npm test
npm run check
```

Os testes sobem o servidor local em porta efêmera, provam a implementação segura, detectam a vulnerável e validam a recusa de host remoto.

## VS Code

```bash
code projects/tenant-isolation-verifier
```

Há tasks para iniciar a demo API, executar as matrizes e rodar testes, além de Run/Debug.

## Aplicação em SaaS real

Use identidades e dados sintéticos para testar:

```text
owner/admin/member
× tenant A/tenant B
× read/create/update/delete
× object IDs próprios e de outro tenant
```

Nunca use dados reais de clientes nesse tipo de teste automatizado.
