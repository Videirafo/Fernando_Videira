# MCP Policy Firewall Lab

Motor de políticas **default-deny** para avaliar chamadas de ferramentas em envelopes JSON-RPC no formato `tools/call` do MCP.

> Este projeto é um **policy engine/lab**, não um proxy MCP drop-in e não implementa o protocolo MCP completo. Ele não executa ferramentas; apenas decide `allow` ou `deny` e explica por quê.

## Por que é diferente

Agentes ganham poder quando recebem tools. Este lab coloca uma fronteira determinística entre intenção e execução:

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

- **default deny** para tool desconhecida;
- bloqueio explícito de tools perigosas;
- normalização de path contra traversal;
- somente HTTPS + domínio exato permitido;
- allowlist de valores de argumentos;
- limites numéricos;
- aprovação humana vem de contexto externo confiável (`--approved`), nunca de um argumento fornecido pela própria tool call;
- annotations/hints não são tratados como autorização;
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

Uma decisão manual:

```bash
node src/cli.mjs \
  --policy examples/policy.json \
  --request examples/request-allowed.json \
  --format json
```

Audit event:

```bash
node src/cli.mjs \
  --policy examples/policy.json \
  --request examples/request-denied.json \
  --audit
```

O processo retorna `0` para allow, `2` para deny e `1` para erro de configuração/parsing.

## Policy

```json
{
  "tools": {
    "http.fetch": {
      "effect": "allow",
      "constraints": {
        "allowedDomains": ["api.github.com"],
        "argumentAllowlist": { "method": ["GET", "HEAD"] }
      }
    }
  }
}
```

## MCP 2026

O MCP TypeScript SDK v2 é a linha estável que implementa a revisão `2026-07-28`. Este projeto usa o formato conceitual `tools/call` para estudar a camada de policy enforcement, mas evita fingir que implementa transport, lifecycle, auth ou todo o wire protocol.

Uma integração futura poderia colocar este motor entre um host e um servidor MCP real; essa integração deverá usar o SDK/spec oficial e terá seus próprios testes de transporte e autorização.

## VS Code

```bash
code projects/mcp-policy-firewall-lab
```

Há tasks para testes e demos, além de uma configuração Run/Debug.

## Próximas evoluções

- adapter real para MCP SDK v2;
- policy bundles assinados;
- approval broker externo;
- redaction de argumentos sensíveis no audit log;
- OpenTelemetry;
- property-based/fuzz tests;
- modo proxy apenas quando houver implementação completa e interoperabilidade testada.

## Privacidade

Não há secrets, endpoints privados, tokens nem execução de ferramentas. Os exemplos usam apenas dados fictícios e domínios públicos.
