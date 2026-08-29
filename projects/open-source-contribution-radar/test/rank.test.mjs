import test from "node:test";
import assert from "node:assert/strict";
import { rankIssues, repositoryFromIssue, scoreIssue } from "../src/rank.mjs";

const NOW = Date.parse("2026-08-29T12:00:00Z");

function issue(overrides = {}) {
  return {
    number: 10,
    title: "Improve parser",
    html_url: "https://github.com/acme/tool/issues/10",
    repository_url: "https://api.github.com/repos/acme/tool",
    updated_at: "2026-08-27T12:00:00Z",
    comments: 2,
    assignee: null,
    assignees: [],
    labels: [{ name: "good first issue" }, { name: "help wanted" }],
    ...overrides
  };
}

test("score rewards useful contribution signals transparently", () => {
  const result = scoreIssue(issue(), { now: NOW });
  assert.equal(result.score, 95);
  assert.deepEqual(result.reasons, [
    "good first issue +30",
    "help wanted +20",
    "unassigned +15",
    "updated ≤7d +20",
    "low discussion load +10"
  ]);
});

test("repository is derived from repository_url", () => {
  assert.equal(repositoryFromIssue(issue()), "acme/tool");
});

test("rankIssues sorts score descending and respects limit", () => {
  const strong = issue({ number: 1 });
  const weak = issue({
    number: 2,
    labels: [],
    updated_at: "2026-01-01T00:00:00Z",
    comments: 50,
    assignee: { login: "maintainer" },
    assignees: [{ login: "maintainer" }]
  });

  const ranked = rankIssues([weak, strong], { now: NOW, limit: 1 });
  assert.equal(ranked.length, 1);
  assert.equal(ranked[0].number, 1);
  assert.equal(ranked[0].repository, "acme/tool");
});
