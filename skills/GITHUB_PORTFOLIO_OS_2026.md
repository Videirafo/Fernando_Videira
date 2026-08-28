# GITHUB-PRO-2026

## Objetivo

Transformar o GitHub em portfólio técnico profissional e evidência verificável de engenharia.

## Perfil

A página deve responder rapidamente:

1. quem é Fernando Videira;
2. o que ele constrói;
3. quais tecnologias usa;
4. quais problemas resolve;
5. onde estão as evidências;
6. quais projetos vale abrir.

## README de perfil

Estrutura recomendada:

```text
Hero
About
Current Focus
Engineering Stack
What I Build
Architecture & Quality
Selected Work
Knowledge & Skills
GitHub Stats
Contact
```

## README de projeto

```text
Título + proposta de valor
Status / badges úteis
Demo / screenshots
Problema
Solução
Features
Arquitetura
Stack
Estrutura
Setup
Environment
Tests
API
Security
Deploy
Roadmap
Contributing
License
```

## Baseline de repositório

```text
.github/
├── ISSUE_TEMPLATE/
├── workflows/
└── pull_request_template.md

docs/
├── architecture/
├── requirements/
├── diagrams/
├── adr/
├── api/
└── operations/

README.md
ARCHITECTURE.md
SECURITY.md
CONTRIBUTING.md
CHANGELOG.md
LICENSE
```

## GitHub Flow

```text
Issue → branch → implementation → tests → PR → CI → review → merge → deploy → observe
```

## Regras

- não fabricar histórico de atividade;
- não listar skills sem evidência ou estudo real;
- não expor projetos privados;
- evitar excesso de GIFs e badges;
- preferir screenshots, arquitetura, testes e decisões técnicas;
- revisar links e cards periodicamente;
- usar 3–6 repositórios fixados que contem histórias diferentes.

## Privacidade

Projetos privados podem aparecer como case studies sanitizados, contendo problema, stack, arquitetura, decisões e resultados, mas sem código, segredos, infraestrutura sensível, endpoints internos ou dados de clientes.