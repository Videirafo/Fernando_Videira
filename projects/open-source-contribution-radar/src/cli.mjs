#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { GitHubClient, GitHubApiError, buildSearchQuery } from "./github.mjs";
import { rankIssues } from "./rank.mjs";
import { formatJson, formatMarkdown, formatText } from "./format.mjs";

function usage() {
  return `Open Source Contribution Radar

Usage:
  node src/cli.mjs [options]

Options:
  --query <terms>       GitHub search terms, e.g. language:typescript
  --repo <owner/name>   Restrict to one repository
  --label <name>        Require a label; can be repeated
  --days <n>            Only Issues updated in the last n days (default: 30)
  --limit <n>           Number of ranked results (default: 15, max search page: 100)
  --format <type>       text | markdown | json (default: text)
  --output <path>       Write output to a file
  --help                Show this help

If no query, repo or label is supplied, the radar defaults to label:"good first issue".
`;
}

function parseArgs(argv) {
  const args = {
    terms: "",
    repo: "",
    labels: [],
    days: 30,
    limit: 15,
    format: "text",
    output: ""
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[++i];
      if (value === undefined) throw new Error(`${arg} requires a value`);
      return value;
    };

    if (arg === "--query") args.terms = next();
    else if (arg === "--repo") args.repo = next();
    else if (arg === "--label") args.labels.push(next());
    else if (arg === "--days") args.days = Number(next());
    else if (arg === "--limit") args.limit = Number(next());
    else if (arg === "--format") args.format = next();
    else if (arg === "--output") args.output = next();
    else if (arg === "--help" || arg === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isFinite(args.days) || args.days < 1 || args.days > 3650) {
    throw new Error("--days must be between 1 and 3650");
  }
  if (!Number.isFinite(args.limit) || args.limit < 1 || args.limit > 100) {
    throw new Error("--limit must be between 1 and 100");
  }
  if (!["text", "markdown", "json"].includes(args.format)) {
    throw new Error("--format must be text, markdown or json");
  }

  if (!args.terms && !args.repo && args.labels.length === 0) {
    args.labels.push("good first issue");
  }

  return args;
}

function render(items, meta, format) {
  if (format === "json") return formatJson(items, meta);
  if (format === "markdown") return formatMarkdown(items, meta);
  return formatText(items, meta);
}

export async function main(argv = process.argv.slice(2), { client = new GitHubClient() } = {}) {
  const args = parseArgs(argv);
  if (args.help) {
    process.stdout.write(usage());
    return 0;
  }

  const query = buildSearchQuery({
    terms: args.terms,
    days: args.days,
    repo: args.repo,
    labels: args.labels
  });

  const result = await client.searchIssues({
    query,
    perPage: Math.min(Math.max(args.limit * 3, 30), 100)
  });

  const items = rankIssues(result.items, { limit: args.limit });
  const meta = {
    query,
    totalCount: result.totalCount,
    incompleteResults: result.incompleteResults,
    generatedAt: new Date().toISOString()
  };
  const output = render(items, meta, args.format);

  if (args.output) {
    await writeFile(args.output, `${output}\n`, "utf8");
    process.stdout.write(`Wrote ${args.output}\n`);
  } else {
    process.stdout.write(`${output}\n`);
  }

  return 0;
}

const isDirectExecution = process.argv[1]
  ? import.meta.url === pathToFileURL(process.argv[1]).href
  : false;

if (isDirectExecution) {
  main().then(
    (code) => { process.exitCode = code; },
    (error) => {
      if (error instanceof GitHubApiError) {
        const hints = [];
        if (error.retryAfter) hints.push(`retry-after=${error.retryAfter}`);
        if (error.resetAt) hints.push(`reset-at=${error.resetAt}`);
        console.error(`${error.message}${hints.length ? ` (${hints.join(", ")})` : ""}`);
      } else {
        console.error(error instanceof Error ? error.message : String(error));
      }
      process.exitCode = 1;
    }
  );
}
