export function toAuditEvent({ result, request }) {
  return {
    schema: 'mcp-policy-firewall.audit.v1',
    timestamp: new Date().toISOString(),
    requestId: request?.id ?? null,
    method: request?.method ?? null,
    tool: result.tool,
    decision: result.decision,
    reason: result.reason,
    checks: result.checks,
  };
}

export function renderText(result) {
  const lines = [
    `MCP Policy Firewall: ${result.decision.toUpperCase()}`,
    `Tool: ${result.tool}`,
    `Reason: ${result.reason}`,
    '',
  ];
  for (const check of result.checks) {
    lines.push(`${check.ok ? 'PASS' : 'DENY'}  ${check.id} — ${check.detail}`);
  }
  if (result.note) lines.push('', `Note: ${result.note}`);
  return lines.join('\n');
}
