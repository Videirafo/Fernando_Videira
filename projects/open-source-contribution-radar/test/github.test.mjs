import test from "node:test";
import assert from "node:assert/strict";
import { GitHubApiError, GitHubClient, buildSearchQuery } from "../src/github.mjs";

test("buildSearchQuery includes issue/open filters, repo, labels and date", () => {
  const query = buildSearchQuery({
    terms: "language:typescript",
    repo: "acme/tool",
    labels: ["good first issue"],
    days: 30
  });

  assert.match(query, /^is:issue is:open/);
  assert.match(query, /repo:acme\/tool/);
  assert.match(query, /label:"good first issue"/);
  assert.match(query, /updated:>=\d{4}-\d{2}-\d{2}/);
  assert.match(query, /language:typescript$/);
});

test("searchIssues uses current GitHub API version and optional bearer token", async () => {
  let seenUrl;
  let seenHeaders;
  const client = new GitHubClient({
    token: "test-token-not-real",
    fetchImpl: async (url, options) => {
      seenUrl = String(url);
      seenHeaders = options.headers;
      return new Response(JSON.stringify({
        total_count: 2,
        incomplete_results: false,
        items: [
          { number: 1, title: "Issue", html_url: "https://github.com/acme/tool/issues/1" },
          { number: 2, title: "PR", pull_request: {}, html_url: "https://github.com/acme/tool/pull/2" }
        ]
      }), { status: 200, headers: { "content-type": "application/json" } });
    }
  });

  const result = await client.searchIssues({ query: "is:issue is:open", perPage: 20 });
  assert.match(seenUrl, /search\/issues/);
  assert.equal(seenHeaders["X-GitHub-Api-Version"], "2026-03-10");
  assert.equal(seenHeaders.Authorization, "Bearer test-token-not-real");
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].number, 1);
});

test("searchIssues surfaces rate-limit guidance", async () => {
  const client = new GitHubClient({
    fetchImpl: async () => new Response("{}", {
      status: 429,
      headers: {
        "retry-after": "60",
        "x-ratelimit-reset": "1788024000"
      }
    })
  });

  await assert.rejects(
    () => client.searchIssues({ query: "is:issue is:open" }),
    (error) => {
      assert.ok(error instanceof GitHubApiError);
      assert.equal(error.status, 429);
      assert.equal(error.retryAfter, "60");
      assert.match(error.resetAt, /^2026-/);
      return true;
    }
  );
});
