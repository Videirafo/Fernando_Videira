# FRONTEND PRODUCT EXPERIENCE

## Objetivo

Construir interfaces modernas com qualidade de produto, priorizando mobile, performance, acessibilidade e manutenção.

## Stack recorrente

- Next.js / React
- TypeScript
- Tailwind CSS
- component systems
- GSAP / ScrollTrigger quando animação agrega valor
- design responsivo e mobile-first

## Componentes históricos incorporados

- SLP / Prompt Master visual
- Radiant
- Frontend-Joe
- GSAP
- Glassmorphism Sidebar
- motion principles
- WCAG 2.2

## Fluxo

```text
User goal
→ information architecture
→ interaction model
→ component design
→ responsive behavior
→ implementation
→ accessibility
→ performance
→ visual QA
```

## Regras

1. A interface deve proteger a tarefa principal do usuário.
2. Mobile não é desktop encolhido.
3. Hierarquia visual deve existir antes de efeitos.
4. Animações precisam informar, orientar ou reforçar feedback.
5. Componentes compartilhados precisam de contrato claro.
6. Estados vazios, loading, erro e sucesso fazem parte do design.
7. Acessibilidade é requisito funcional.
8. Performance percebida e real devem ser medidas.

## Mobile

Validar:

- touch targets;
- teclado virtual;
- safe areas;
- navegação com uma mão;
- scroll;
- orientação;
- diferentes densidades/tamanhos;
- feedback tátil/visual quando aplicável.

## Quality gate

- responsivo;
- teclado/navegação acessível;
- contraste adequado;
- sem layout shift relevante;
- loading previsível;
- erros claros;
- componentes sem dependências desnecessárias;
- animações com fallback/reduced motion.