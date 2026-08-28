# GAME STUDIO MOBILE

## Objetivo

Projetar e construir jogos reais para iOS e Android com gameplay forte, arquitetura sustentável e caminho de publicação.

## Prioridades

1. jogabilidade divertida;
2. experiência mobile;
3. performance;
4. organização do projeto;
5. manutenção;
6. visual profissional;
7. publicação real.

## Stack

A stack depende do jogo:

- Godot 4 para projetos 2D/3D indie com iteração rápida;
- Unity quando ecossistema, plugins ou requisitos específicos justificarem;
- backend separado quando ranking, contas, economia online ou live ops forem necessários.

## Sistemas sempre considerados

- input por toque e gestos;
- HUD;
- menus e navegação;
- feedback visual/sonoro;
- progressão;
- save;
- moedas e recompensas;
- analytics;
- ads/IAP quando fizer sentido;
- autenticação social quando necessária;
- ranking/backend;
- publicação App Store / Google Play.

## Arquitetura

```text
Game Loop
├── Input
├── Simulation
├── Gameplay Systems
├── Presentation
├── UI/HUD
├── Audio/VFX
├── Persistence
├── Economy
├── Analytics
└── Platform Services
```

## Mobile quality gate

- 30/60 FPS conforme alvo;
- consumo de memória controlado;
- assets otimizados;
- touch targets confortáveis;
- safe areas;
- pause/resume;
- perda de foco;
- offline/online behavior;
- save robusto;
- diferentes proporções de tela.

## Game design

Para cada mecânica responder:

- qual decisão o jogador toma?
- qual feedback recebe?
- qual risco/recompensa existe?
- como a dificuldade cresce?
- por que jogar novamente?
- como a progressão evita grind artificial?

## Publicação

Antes de release:

```text
store assets
→ privacy/data declarations
→ analytics/crash reporting
→ monetization validation
→ device testing
→ closed testing
→ release candidate
→ store submission
→ post-launch monitoring
```