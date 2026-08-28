# VPS & PRODUCTION ENGINEERING

## Objetivo

Operar aplicações em Linux/VPS com deploy reproduzível, observabilidade, backup e rollback.

## Abrange

- Linux
- systemd / process management
- Docker / Compose
- Nginx / reverse proxy
- TLS
- PostgreSQL / Redis
- migrations
- secrets e environment
- logs e métricas
- backup e restore
- CI/CD
- smoke tests
- rollback

## Regra de ouro

Antes de alterar produção:

```text
AUDIT → BACKUP → CHANGE PLAN → APPLY → VERIFY → OBSERVE → ROLLBACK IF NEEDED
```

## Auditoria mínima

- processo em execução;
- portas;
- versão/commit atual;
- env necessário;
- proxy;
- banco/migrations;
- espaço em disco;
- memória;
- logs recentes;
- health checks;
- backup disponível.

## Deploy

Preferir release identificável por commit/tag e não editar arquivos diretamente no servidor sem rastreabilidade.

```text
build
→ test
→ artifact/release
→ migration plan
→ deploy
→ health check
→ smoke test
→ metrics/log review
```

## Segurança

- menor privilégio;
- secrets fora do Git;
- SSH protegido;
- firewall;
- TLS;
- serviços internos não expostos sem necessidade;
- dependências atualizadas;
- logs sem dados sensíveis;
- backup criptografado quando necessário.

## Rollback

Toda alteração relevante precisa responder antes do deploy:

- qual versão anterior?
- como voltar?
- banco é compatível?
- migration é reversível?
- quanto tempo leva?
- quais sinais indicam rollback?

## Observabilidade

Mínimo operacional:

- health/readiness;
- logs estruturados;
- error tracking;
- uso de CPU/memória/disco;
- latência;
- taxa de erro;
- eventos de deploy;
- alertas acionáveis.