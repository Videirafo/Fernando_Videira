from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass(frozen=True)
class AuditReport:
    repository: str
    html_url: str
    default_branch: str
    description: str | None
    archived: bool
    fork: bool
    topics: list[str]
    github_health_percentage: int
    engineering_score: int
    grade: str
    workflow_count: int
    signals: dict[str, bool]
    recommendations: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
