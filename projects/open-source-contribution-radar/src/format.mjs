function escapeMarkdown(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function formatText(items, { query = "" } = {}) {
  const lines = [];
  lines.push("Open Source Contribution Radar");
  if (query) lines.push(`Query: ${query}`);
  lines.push("");

  if (items.length === 0) {
    lines.push("Nenhuma Issue encontrada para os filtros atuais.");
    return lines.join("\n");
  }

  items.forEach((item, index) => {
    lines.push(`${index + 1}. [${item.score}] ${item.repository}#${item.number} — ${item.title}`);
    lines.push(`   ${item.url}`);
    lines.push(`   ${item.reasons.join(" · ") || "sem bônus de ranking"}`);
  });

  return lines.join("\n");
}

export function formatMarkdown(items, { query = "" } = {}) {
  const lines = ["# Open Source Contribution Radar", ""];
  if (query) lines.push(`**Query:** \`${escapeMarkdown(query)}\``, "");
  lines.push("| Score | Repositório | Issue | Atualizada | Motivos |", "|---:|---|---|---|---|");

  for (const item of items) {
    lines.push(`| ${item.score} | ${escapeMarkdown(item.repository)} | [#${item.number} — ${escapeMarkdown(item.title)}](${item.url}) | ${escapeMarkdown(item.updatedAt || "-")} | ${escapeMarkdown(item.reasons.join("; "))} |`);
  }

  if (items.length === 0) {
    lines.push("| - | - | Nenhuma Issue encontrada | - | - |");
  }

  lines.push(
    "",
    "> O score é uma heurística local e transparente deste projeto. Antes de contribuir, leia a Issue, reproduza o problema, confira CONTRIBUTING e procure PRs existentes."
  );

  return lines.join("\n");
}

export function formatJson(items, meta = {}) {
  return JSON.stringify({ ...meta, items }, null, 2);
}
