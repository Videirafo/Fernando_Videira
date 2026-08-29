from __future__ import annotations

import argparse
from pathlib import Path

from .audit import audit_repository, render_json, render_markdown, render_text
from .github import GitHubApiError, GitHubClient


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="repo-health",
        description="Audit GitHub repository health using the official REST API.",
    )
    parser.add_argument(
        "repository",
        help="Repository as owner/repo or https://github.com/owner/repo",
    )
    parser.add_argument(
        "--format",
        choices=("text", "markdown", "json"),
        default="text",
        help="Output format (default: text)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Optional file path to save the report",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()

    try:
        with GitHubClient() as client:
            report = audit_repository(client, args.repository)
    except (GitHubApiError, ValueError) as exc:
        print(f"error: {exc}")
        return 2

    renderer = {
        "text": render_text,
        "markdown": render_markdown,
        "json": render_json,
    }[args.format]
    output = renderer(report)

    if args.output:
        args.output.write_text(output + ("" if output.endswith("\n") else "\n"), encoding="utf-8")
        print(f"Report saved to {args.output}")
    else:
        print(output)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
