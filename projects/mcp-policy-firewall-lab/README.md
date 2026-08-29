# MCP Policy Firewall Lab

[![MCP Policy Firewall Lab](https://github.com/Videirafo/Fernando_Videira/actions/workflows/mcp-policy-firewall.yml/badge.svg?branch=main)](https://github.com/Videirafo/Fernando_Videira/actions/workflows/mcp-policy-firewall.yml)

Motor de políticas **default-deny** para avaliar chamadas de ferramentas em envelopes JSON-RPC no formato `tools/call` do MCP.

> Este projeto é um **policy engine/lab**, não um proxy MCP drop-in e não implementa o protocolo MCP completo. Ele não executa ferramentas; apenas decide `allow` ou `deny` e explica por quê.

## Por que é diferente

```text
Agent / Host
   ↓ tools/call
Policy Firewall
   ├── tool allowlist
   ├── path constraints
   ├── domain allowlist
   ├── argument allowlist
   ├── numeric limits
   └── trusted human approval
   ↓
ALLOW / DENY + audit evidence
```

## Segurança demonstrada

- default deny para tool desconhecida;
- bloqueio explícito de tools perigosas;
- normalização de path contra traversal;
- somente HTTPS + domínio exato permitido;
- allowlist de valores de argumentos;
- limites numéricos;
- aprovação humana vem de contexto externo confiável (`--approved`), nunca de um argumento da própria tool call;
- annotations/hints não são autorização;
- nenhuma tool real é executada.

## Requisitos

- Node.js 24 LTS.

## Executar

```bash
cd projects/mcp-policy-firewall-lab
npm test
npm run demo:allow
npm run demo:deny
npm run demo:approval
```

```bash
node src/cli.mjs --policy examples/policy.json --request examples/request-allowed.json --format json
node src/cli.mjs --policy examples/policy.json --request examples/request-denied.json --audit
```

O processo retorna `0` para allow, `2` para deny e `1` para erro.

## MCP 2026

O MCP TypeScript SDK v2 é a linha estável que implementa a revisão `2026-07-28`. Este projeto usa o formato conceitual `tools/call` para estudar policy enforcement sem fingir implementar transport, lifecycle, auth ou o wire protocol completo.

## VS Code

```bash
code projects/mcp-policy-firewall-lab
```

Há tasks para testes e demos, além de Run/Debug.

## Próximas evoluções

- adapter real para MCP SDK v2;
- policy bundles assinados;
- approval broker externo;
- redaction de argumentos sensíveis no audit log;
- OpenTelemetry;
- property-based/fuzz tests;
- modo proxy somente com interoperabilidade completa testada.

## Privacidade

Não há secrets, endpoints privados, tokens nem execução de ferramentas. Os exemplos usam dados fictícios e domínios públicos.
