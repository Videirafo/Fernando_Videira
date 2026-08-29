from __future__ import annotations

import os
from dataclasses import dataclass
from urllib.parse import urlparse

import httpx


API_VERSION = "2026-03-10"


class GitHubApiError(RuntimeError):
    """Raised when GitHub returns an unexpected API response."""


class GitHubNotFoundError(GitHubApiError):
    """Raised when a repository or resource does not exist."""


@dataclass(frozen=True)
class RepoRef:
    owner: str
    name: str

    @property
    def full_name(self) -> str:
        return f"{self.owner}/{self.name}"


def parse_repo_input(value: str) -> RepoRef:
    raw = value.strip()
    if not raw:
        raise ValueError("Repository cannot be empty")

    if raw.startswith(("http://", "https://")):
        parsed = urlparse(raw)
        if parsed.netloc.lower() not in {"github.com", "www.github.com"}:
            raise ValueError("Only github.com repository URLs are supported")
        parts = [part for part in parsed.path.split("/") if part]
    else:
        parts = [part for part in raw.split("/") if part]

    if len(parts) < 2:
        raise ValueError("Use owner/repo or https://github.com/owner/repo")

    owner = parts[0]
    name = parts[1]
    if name.endswith(".git"):
        name = name[:-4]

    if not owner or not name:
        raise ValueError("Invalid GitHub repository reference")

    return RepoRef(owner=owner, name=name)


class GitHubClient:
    def __init__(
        self,
        token: str | None = None,
        *,
        transport: httpx.BaseTransport | None = None,
    ) -> None:
        token = token or os.getenv("GH_TOKEN") or os.getenv("GITHUB_TOKEN")
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": API_VERSION,
            "User-Agent": "github-repo-health-auditor/0.1.0",
        }
        if token:
            headers["Authorization"] = f"Bearer {token}"

        self._client = httpx.Client(
            base_url="https://api.github.com",
            headers=headers,
            timeout=15.0,
            follow_redirects=True,
            transport=transport,
        )

    def close(self) -> None:
        self._client.close()

    def __enter__(self) -> "GitHubClient":
        return self

    def __exit__(self, exc_type, exc, tb) -> None:  # type: ignore[no-untyped-def]
        self.close()

    def _request(self, path: str) -> httpx.Response:
        response = self._client.get(path)

        if response.status_code == 404:
            raise GitHubNotFoundError(f"GitHub resource not found: {path}")

        if response.status_code in {403, 429}:
            retry_after = response.headers.get("retry-after")
            reset = response.headers.get("x-ratelimit-reset")
            detail = "GitHub API rate limit or policy limit reached"
            if retry_after:
                detail += f"; retry after {retry_after}s"
            elif reset:
                detail += f"; reset epoch {reset}"
            raise GitHubApiError(detail)

        try:
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise GitHubApiError(
                f"GitHub API returned HTTP {response.status_code} for {path}"
            ) from exc

        return response

    def get_json(self, path: str) -> dict:
        response = self._request(path)
        payload = response.json()
        if not isinstance(payload, dict):
            raise GitHubApiError(f"Unexpected GitHub response for {path}")
        return payload

    def exists(self, path: str) -> bool:
        response = self._client.get(path)
        if response.status_code == 404:
            return False
        if response.status_code in {403, 429}:
            retry_after = response.headers.get("retry-after")
            detail = "GitHub API rate limit or policy limit reached"
            if retry_after:
                detail += f"; retry after {retry_after}s"
            raise GitHubApiError(detail)
        try:
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise GitHubApiError(
                f"GitHub API returned HTTP {response.status_code} for {path}"
            ) from exc
        return True

    def repo_metadata(self, repo: RepoRef) -> dict:
        return self.get_json(f"/repos/{repo.full_name}")

    def community_profile(self, repo: RepoRef) -> dict:
        try:
            return self.get_json(f"/repos/{repo.full_name}/community/profile")
        except GitHubNotFoundError:
            return {"health_percentage": 0, "files": {}}

    def workflow_count(self, repo: RepoRef) -> int:
        payload = self.get_json(f"/repos/{repo.full_name}/actions/workflows?per_page=1")
        return int(payload.get("total_count", 0) or 0)

    def security_policy_exists(self, repo: RepoRef) -> bool:
        for path in ("SECURITY.md", ".github/SECURITY.md", "docs/SECURITY.md"):
            if self.exists(f"/repos/{repo.full_name}/contents/{path}"):
                return True
        return False
