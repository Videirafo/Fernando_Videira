const ISSUE_LINK = /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?|refs?)\s+#\d+/i;
const SENSITIVE = [
  /^\.env(?:\.|$)/i,
  /(^|\/)id_(?:rsa|ed25519)$/i,
  /\.pem$/i,
  /private[-_]?key/i,
  /credentials?\.json$/i,
];

export function evaluatePullRequest({ body = '', files = [], maxFiles = 40 }) {
  const checks = [];
  checks.push({
    id: 'linked-issue',
    ok: ISSUE_LINK.test(body),
    message: ISSUE_LINK.test(body) ? 'Issue vinculada encontrada.' : 'Adicione Closes #N, Fixes #N ou Refs #N ao PR.',
  });
  checks.push({
    id: 'pr-size',
    ok: files.length <= maxFiles,
    message: files.length <= maxFiles ? `${files.length} arquivo(s) alterado(s).` : `PR altera ${files.length} arquivos; limite recomendado: ${maxFiles}.`,
  });
  const risky = files.filter((file) => SENSITIVE.some((pattern) => pattern.test(file.filename)));
  checks.push({
    id: 'sensitive-files',
    ok: risky.length === 0,
    message: risky.length === 0 ? 'Nenhum caminho sensível detectado.' : `Revisão obrigatória: ${risky.map((f) => f.filename).join(', ')}`,
  });
  const passed = checks.filter((check) => check.ok).length;
  return { passed, total: checks.length, ok: passed === checks.length, checks };
}

export function renderComment(report) {
  const rows = report.checks.map((check) => `| ${check.ok ? 'PASS' : 'REVIEW'} | ${check.id} | ${check.message} |`).join('\n');
  return `## RepoGuard\n\n**${report.passed}/${report.total} checks passaram.**\n\n| Status | Check | Resultado |\n|---|---|---|\n${rows}\n\n> RepoGuard usa regras determinísticas e não substitui code review humano.`;
}
