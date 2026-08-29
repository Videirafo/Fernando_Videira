from __future__ import annotations

import json

from .github import GitHubClient, RepoRef, parse_repo_input
from .models import AuditReport


WEIGHTS = {
    "readme": 15,
    "contributing": 10,
    "license": 10,
    "code_of_conduct": 5,
    "issue_template": 5,
    "pull_request_template": 5,
    "security": 15,
    "ci": 20,
    "description": 5,
    "topics": 5,
    "active": 5,
}


def _present(files: dict, key: str) -> bool:
    return bool(files.get(key))


def _grade(score: int) -> str:
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "E"


def build_report(
    repo: RepoRef,
    metadata: dict,
    community: dict,
    workflow_count: int,
    security_policy: bool,
) -> AuditReport:
    files = community.get("files") or {}
    topics = list(metadata.get("topics") or [])

    signals = {
        "readme": _present(files, "readme"),
        "contributing": _present(files, "contributing"),
        "license": _present(files, "license"),
        "code_of_conduct": _present(files, "code_of_conduct_file")
        or _present(files, "code_of_conduct"),
        "issue_template": _present(files, "issue_template"),
        "pull_request_template": _present(files, "pull_request_template"),
        "security": security_policy,
        "ci": workflow_count > 0,
        "description": bool(metadata.get("description")),
        "topics": bool(topics),
        "active": not bool(metadata.get("archived")),
    }

    engineering_score = sum(
        weight for key, weight in WEIGHTS.items() if signals.get(key, False)
    )

    recommendations: list[str] = []
    advice = {
        "readme": "Adicione um README claro com propósito, setup, uso e validação.",
        "contributing": "Adicione CONTRIBUTING.md com fluxo de contribuição e comandos de teste.",
        "license": "Escolha e adicione uma licença explícita ao repositório.",
        "code_of_conduct": "Adicione CODE_OF_CONDUCT.md para projetos que aceitam colaboração externa.",
        "issue_template": "Adicione issue templates para padronizar bugs e evoluções.",
        "pull_request_template": "Adicione um pull request template com objetivo, risco e validação.",
        "security": "Adicione SECURITY.md com um canal seguro de reporte de vulnerabilidades.",
        "ci": "Adicione GitHub Actions para executar testes, lint ou build automaticamente.",
        "description": "Preencha a descrição curta do repositório no GitHub.",
        "topics": "Adicione topics relevantes para melhorar descoberta e contexto técnico.",
        "active": "O repositório está arquivado; confirme se isso representa o status desejado.",
    }
    for key in WEIGHTS:
        if not signals[key]:
            recommendations.append(advice[key])

    health = int(community.get("health_percentage", 0) or 0)

    return AuditReport(
        repository=repo.full_name,
        html_url=str(metadata.get("html_url") or f"https://github.com/{repo.full_name}"),
        default_branch=str(metadata.get("default_branch") or ""),
        description=metadata.get("description"),
        archived=bool(metadata.get("archived")),
        fork=bool(metadata.get("fork")),
        topics=topics,
        github_health_percentage=health,
        engineering_score=engineering_score,
        grade=_grade(engineering_score),
        workflow_count=workflow_count,
        signals=signals,
        recommendations=recommendations,
    )


def audit_repository(client: GitHubClient, value: str) -> AuditReport:
    repo = parse_repo_input(value)
    metadata = client.repo_metadata(repo)
    community = client.community_profile(repo)
    workflows = client.workflow_count(repo)
    security = client.security_policy_exists(repo)
    return build_report(repo, metadata, community, workflows, security)


def render_text(report: AuditReport) -> str:
    signal_lines = "\n".join(
        f"  {'OK' if value else '--'}  {key}"
        for key, value in report.signals.items()
    )
    recs = "\n".join(f"  - {item}" for item in report.recommendations)
    if not recs:
        recs = "  - Nenhuma recomendação crítica neste conjunto de sinais."

    return (
        f"Repository: {report.repository}\n"
        f"GitHub community health: {report.github_health_percentage}%\n"
        f"Engineering score: {report.engineering_score}/100 ({report.grade})\n"
        f"Workflows: {report.workflow_count}\n"
        f"Default branch: {report.default_branch}\n\n"
        f"Signals\n{signal_lines}\n\n"
        f"Recommendations\n{recs}\n"
    )


def render_markdown(report: AuditReport) -> str:
    rows = "\n".join(
        f"| {key} | {'✅' if value else '❌'} |"
        for key, value in report.signals.items()
    )
    recs = "\n".join(f"- {item}" for item in report.recommendations)
    if not recs:
        recs = "- Nenhuma recomendação crítica neste conjunto de sinais."

    return f"""# Repository Health Report — {report.repository}

- GitHub community health: **{report.github_health_percentage}%**
- Engineering score: **{report.engineering_score}/100 ({report.grade})**
- GitHub Actions workflows: **{report.workflow_count}**
- Default branch: **{report.default_branch or 'n/a'}**
- Archived: **{'yes' if report.archived else 'no'}**
- Fork: **{'yes' if report.fork else 'no'}**

## Signals

| Signal | Present |
|---|---|
{rows}

## Recommendations

{recs}

> The GitHub community health percentage comes from GitHub's official community profile endpoint. The Engineering Score is this project's own transparent weighted score.
"""


def render_json(report: AuditReport) -> str:
    return json.dumps(report.to_dict(), indent=2, ensure_ascii=False)
