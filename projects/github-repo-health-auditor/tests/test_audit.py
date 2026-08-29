from __future__ import annotations

import httpx
import pytest

from repo_health_auditor.audit import build_report, render_json, render_markdown
from repo_health_auditor.github import (
    GitHubApiError,
    GitHubClient,
    RepoRef,
    parse_repo_input,
)


def test_parse_repo_input_accepts_slug_and_url() -> None:
    assert parse_repo_input("octocat/Hello-World") == RepoRef("octocat", "Hello-World")
    assert parse_repo_input("https://github.com/octocat/Hello-World.git") == RepoRef(
        "octocat", "Hello-World"
    )


def test_parse_repo_input_rejects_other_hosts() -> None:
    with pytest.raises(ValueError):
        parse_repo_input("https://example.com/octocat/Hello-World")


def test_build_report_full_score() -> None:
    repo = RepoRef("acme", "healthy")
    metadata = {
        "html_url": "https://github.com/acme/healthy",
        "default_branch": "main",
        "description": "Healthy repository",
        "archived": False,
        "fork": False,
        "topics": ["python"],
    }
    community = {
        "health_percentage": 100,
        "files": {
            "readme": {"url": "x"},
            "contributing": {"url": "x"},
            "license": {"url": "x"},
            "code_of_conduct": {"url": "x"},
            "issue_template": {"url": "x"},
            "pull_request_template": {"url": "x"},
        },
    }

    report = build_report(repo, metadata, community, workflow_count=2, security_policy=True)

    assert report.github_health_percentage == 100
    assert report.engineering_score == 100
    assert report.grade == "A"
    assert report.recommendations == []
    assert '"engineering_score": 100' in render_json(report)
    assert "Engineering score: **100/100 (A)**" in render_markdown(report)


def test_missing_signals_generate_recommendations() -> None:
    report = build_report(
        RepoRef("acme", "minimal"),
        {
            "html_url": "https://github.com/acme/minimal",
            "default_branch": "main",
            "description": None,
            "archived": False,
            "fork": False,
            "topics": [],
        },
        {"health_percentage": 0, "files": {}},
        workflow_count=0,
        security_policy=False,
    )

    assert report.engineering_score == 5
    assert report.grade == "E"
    assert any("README" in recommendation for recommendation in report.recommendations)
    assert any("GitHub Actions" in recommendation for recommendation in report.recommendations)


def test_client_uses_auth_header_and_reads_json() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.headers["authorization"] == "Bearer test-token"
        assert request.headers["x-github-api-version"] == "2026-03-10"
        return httpx.Response(200, json={"full_name": "acme/repo"})

    transport = httpx.MockTransport(handler)
    with GitHubClient(token="test-token", transport=transport) as client:
        payload = client.get_json("/repos/acme/repo")

    assert payload["full_name"] == "acme/repo"


def test_client_reports_rate_limit() -> None:
    transport = httpx.MockTransport(
        lambda request: httpx.Response(429, headers={"retry-after": "60"}, json={})
    )

    with GitHubClient(transport=transport) as client:
        with pytest.raises(GitHubApiError, match="retry after 60s"):
            client.get_json("/repos/acme/repo")


def test_security_policy_lookup_checks_supported_locations() -> None:
    seen: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request.url.path)
        if request.url.path.endswith("/.github/SECURITY.md"):
            return httpx.Response(200, json={"name": "SECURITY.md"})
        return httpx.Response(404, json={"message": "Not Found"})

    transport = httpx.MockTransport(handler)
    with GitHubClient(transport=transport) as client:
        found = client.security_policy_exists(RepoRef("acme", "repo"))

    assert found is True
    assert seen == [
        "/repos/acme/repo/contents/SECURITY.md",
        "/repos/acme/repo/contents/.github/SECURITY.md",
    ]
