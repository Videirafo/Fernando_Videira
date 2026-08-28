# PY-BACKEND-2026

## Objetivo

Padrão reutilizável para construir, auditar e modernizar backends Python com Django/Django REST Framework ou FastAPI.

## Escolha da stack

### Django + DRF

Preferir quando o produto precisa de:

- domínio CRUD amplo;
- admin/backoffice;
- autenticação/autorização madura;
- ORM e migrations integrados;
- aplicações organizadas por domínio;
- SaaS de longa duração.

### FastAPI

Preferir quando o produto precisa de:

- APIs especializadas;
- I/O assíncrono;
- integração com IA;
- streaming/SSE;
- gateways e microserviços;
- contratos fortemente tipados.

## Arquitetura Django

```text
feature/
├── models.py
├── serializers.py
├── apis.py
├── urls.py
├── services.py
├── selectors.py
├── permissions.py
├── tasks.py
└── tests/
    ├── test_apis.py
    ├── test_serializers.py
    ├── test_services.py
    ├── test_permissions.py
    └── test_selectors.py
```

Regras:

- views finas;
- lógica de negócio em services;
- consultas complexas em selectors;
- permissões explícitas;
- isolamento de tenant testado;
- transações atômicas para invariantes.

## Arquitetura FastAPI

```text
app/
├── api/
├── core/
├── domain/
├── models/
├── schemas/
├── repositories/
├── services/
├── integrations/
├── workers/
└── main.py
```

Regras:

- routers finos;
- dependencies para autenticação, DB e contexto;
- Pydantic para contratos;
- services para regras;
- OpenAPI tratado como contrato;
- async apenas quando a cadeia realmente é async.

## Segurança

Baseline:

- hash de senha moderno;
- access/refresh tokens quando necessários;
- RBAC/ABAC;
- tenant isolation;
- rate limiting;
- validação de entrada;
- CORS restrito em produção;
- secrets fora do Git;
- audit log para operações críticas;
- dependências monitoradas.

## Testes mínimos

Para cada fluxo crítico:

1. happy path;
2. validação;
3. autenticação;
4. autorização;
5. ownership/tenant isolation;
6. not found;
7. edge cases;
8. idempotência/concorrência quando aplicável;
9. falhas de integração;
10. regressão do bug corrigido.

## CI/CD

```text
lint → typecheck → unit → integration → security scan → coverage
→ build → migration validation → artifact/container → deploy → smoke test
```

## Regra de auditoria

README é hipótese até o código confirmar. Verificar arquivos vazios, dependências, migrations, autenticação, testes, Docker, CI e deploy antes de reutilizar uma arquitetura externa.