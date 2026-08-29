function labelNames(issue) {
  return (issue.labels || [])
    .map((label) => typeof label === "string" ? label : label?.name)
    .filter(Boolean)
    .map((name) => String(name).toLowerCase());
}

function ageDays(updatedAt, now) {
  const value = Date.parse(updatedAt);
  if (!Number.isFinite(value)) return Infinity;
  return Math.max(0, (now - value) / 86_400_000);
}

export function scoreIssue(issue, { now = Date.now() } = {}) {
  let score = 0;
  const reasons = [];
  const labels = labelNames(issue);
  const daysOld = ageDays(issue.updated_at, now);

  if (labels.includes("good first issue")) {
    score += 30;
    reasons.push("good first issue +30");
  }

  if (labels.includes("help wanted")) {
    score += 20;
    reasons.push("help wanted +20");
  }

  const assignees = Array.isArray(issue.assignees) ? issue.assignees : [];
  if (!issue.assignee && assignees.length === 0) {
    score += 15;
    reasons.push("unassigned +15");
  }

  if (daysOld <= 7) {
    score += 20;
    reasons.push("updated ≤7d +20");
  } else if (daysOld <= 30) {
    score += 12;
    reasons.push("updated ≤30d +12");
  } else if (daysOld <= 90) {
    score += 5;
    reasons.push("updated ≤90d +5");
  }

  const comments = Number(issue.comments) || 0;
  if (comments <= 3) {
    score += 10;
    reasons.push("low discussion load +10");
  } else if (comments <= 10) {
    score += 5;
    reasons.push("moderate discussion load +5");
  }

  return { score, reasons };
}

export function repositoryFromIssue(issue) {
  if (typeof issue.repository_url === "string") {
    const match = issue.repository_url.match(/\/repos\/([^/]+)\/([^/]+)$/);
    if (match) return `${match[1]}/${match[2]}`;
  }

  if (typeof issue.html_url === "string") {
    try {
      const url = new URL(issue.html_url);
      const [owner, repo] = url.pathname.split("/").filter(Boolean);
      if (owner && repo) return `${owner}/${repo}`;
    } catch {
      // Keep unknown repository if the URL is malformed.
    }
  }

  return "unknown/unknown";
}

export function rankIssues(items, { now = Date.now(), limit = 20 } = {}) {
  const ranked = items.map((issue) => {
    const ranking = scoreIssue(issue, { now });
    return {
      repository: repositoryFromIssue(issue),
      number: issue.number,
      title: issue.title,
      url: issue.html_url,
      updatedAt: issue.updated_at,
      comments: Number(issue.comments) || 0,
      labels: labelNames(issue),
      assignees: (issue.assignees || []).map((item) => item?.login).filter(Boolean),
      score: ranking.score,
      reasons: ranking.reasons
    };
  });

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Date.parse(b.updatedAt || 0) - Date.parse(a.updatedAt || 0);
  });

  return ranked.slice(0, Math.max(1, Number(limit) || 20));
}
