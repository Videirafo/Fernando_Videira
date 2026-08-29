function assertLoopback(baseUrl) {
  const url = new URL(baseUrl);
  const allowed = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);
  if (!allowed.has(url.hostname)) {
    throw new Error('Este lab é localhost-only e recusa hosts remotos.');
  }
  return url.origin;
}

async function getJson({ baseUrl, path, actorTenant, fetchImpl = fetch }) {
  const response = await fetchImpl(`${baseUrl}${path}`, {
    headers: { 'x-demo-tenant': actorTenant, accept: 'application/json' },
  });
  let body = null;
  try { body = await response.json(); } catch { body = null; }
  return { status: response.status, body };
}

function leakedForeignTenant(body, actorTenant) {
  return Boolean(body && typeof body === 'object' && typeof body.tenant_id === 'string' && body.tenant_id !== actorTenant);
}

export async function verifyTenantIsolation({ baseUrl = 'http://127.0.0.1:3456', target = 'safe', fetchImpl = fetch } = {}) {
  const origin = assertLoopback(baseUrl);
  if (!['safe', 'vulnerable'].includes(target)) throw new Error('target deve ser safe ou vulnerable.');

  const matrix = [
    { id: 'alpha-own', actor: 'alpha', targetTenant: 'alpha', recordId: 'alpha-1', shouldAllow: true },
    { id: 'beta-own', actor: 'beta', targetTenant: 'beta', recordId: 'beta-1', shouldAllow: true },
    { id: 'alpha-to-beta', actor: 'alpha', targetTenant: 'beta', recordId: 'beta-1', shouldAllow: false },
    { id: 'beta-to-alpha', actor: 'beta', targetTenant: 'alpha', recordId: 'alpha-1', shouldAllow: false },
  ];

  const cases = [];
  for (const item of matrix) {
    const path = `/${target}/tenants/${item.targetTenant}/records/${item.recordId}`;
    const response = await getJson({ baseUrl: origin, path, actorTenant: item.actor, fetchImpl });
    const accessGranted = response.status >= 200 && response.status < 300;
    const leaked = leakedForeignTenant(response.body, item.actor);
    const ok = item.shouldAllow ? accessGranted && !leaked : !accessGranted && !leaked;
    cases.push({
      ...item,
      path,
      status: response.status,
      accessGranted,
      leakedForeignTenant: leaked,
      ok,
    });
  }

  const failed = cases.filter((item) => !item.ok);
  return {
    target,
    passed: cases.length - failed.length,
    total: cases.length,
    secure: failed.length === 0,
    cases,
    findings: failed.map((item) => ({
      case: item.id,
      severity: item.leakedForeignTenant ? 'high' : 'medium',
      type: item.leakedForeignTenant ? 'cross-tenant-data-leak' : 'authorization-contract-failure',
      detail: `${item.actor} -> ${item.targetTenant} retornou HTTP ${item.status}`,
    })),
  };
}

export function renderText(report) {
  const lines = [
    `Tenant Isolation Verifier: ${report.secure ? 'PASS' : 'FAIL'}`,
    `Target: ${report.target}`,
    `Matrix: ${report.passed}/${report.total}`,
    '',
  ];
  for (const item of report.cases) {
    lines.push(`${item.ok ? 'PASS' : 'FAIL'}  ${item.id}  HTTP ${item.status}${item.leakedForeignTenant ? '  CROSS-TENANT LEAK' : ''}`);
  }
  if (report.findings.length) {
    lines.push('', 'Findings:');
    for (const finding of report.findings) lines.push(`- ${finding.severity.toUpperCase()} ${finding.type}: ${finding.detail}`);
  }
  return lines.join('\n');
}
