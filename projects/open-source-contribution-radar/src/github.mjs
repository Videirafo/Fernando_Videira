const API_ROOT = "https://api.github.com";
const API_VERSION = "2026-03-10";

export class GitHubApiError extends Error {
  constructor(message, { status, retryAfter = null, resetAt = null } = {}) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
    this.retryAfter = retryAfter;
    this.resetAt = resetAt;
  }
}

function rateLimitDetails(response) {
  const retryAfter = response.headers.get("retry-after");
  const reset = response.headers.get("x-ratelimit-reset");
  const resetAt = reset && /^\d+$/.test(reset)
    ? new Date(Number(reset) * 1000).toISOString()
    : null;

  return { retryAfter, resetAt };
}

export class GitHubClient {
  constructor({ token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "", fetchImpl = globalThis.fetch } = {}) {
    if (typeof fetchImpl !== "function") {
      throw new TypeError("fetchImpl must be a function");
    }
    this.token = token;
    this.fetchImpl = fetchImpl;
  }

  headers() {
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "Videirafo-Open-Source-Contribution-Radar"
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  async searchIssues({ query, perPage = 30, page = 1 } = {}) {
    if (!query || typeof query !== "string") {
      throw new TypeError("query is required");
    }

    const safePerPage = Math.min(Math.max(Number(perPage) || 30, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const url = new URL("/search/issues", API_ROOT);
    url.searchParams.set("q", query);
    url.searchParams.set("sort", "updated");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", String(safePerPage));
    url.searchParams.set("page", String(safePage));

    const response = await this.fetchImpl(url, {
      method: "GET",
      headers: this.headers()
    });

    if (response.status === 403 || response.status === 429) {
      const details = rateLimitDetails(response);
      throw new GitHubApiError(
        `GitHub API rate/policy limit (${response.status})`,
        { status: response.status, ...details }
      );
    }

    if (!response.ok) {
      throw new GitHubApiError(`GitHub API request failed (${response.status})`, {
        status: response.status
      });
    }

    const data = await response.json();
    const items = Array.isArray(data.items)
      ? data.items.filter((item) => !item.pull_request)
      : [];

    return {
      totalCount: Number(data.total_count) || 0,
      incompleteResults: Boolean(data.incomplete_results),
      items
    };
  }
}

export function buildSearchQuery({ terms = "", days = 30, repo = "", labels = [] } = {}) {
  const parts = ["is:issue", "is:open"];

  if (repo) {
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
      throw new Error("repo must use owner/name format");
    }
    parts.push(`repo:${repo}`);
  }

  for (const label of labels) {
    const normalized = String(label).trim();
    if (normalized) parts.push(`label:${JSON.stringify(normalized)}`);
  }

  const safeDays = Math.min(Math.max(Number(days) || 30, 1), 3650);
  const since = new Date(Date.now() - safeDays * 86_400_000)
    .toISOString()
    .slice(0, 10);
  parts.push(`updated:>=${since}`);

  if (terms.trim()) parts.push(terms.trim());
  return parts.join(" ");
}
