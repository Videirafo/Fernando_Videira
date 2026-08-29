import path from 'node:path';

function checkPathPrefix(value, prefixes) {
  if (typeof value !== 'string') return false;
  const normalized = path.posix.normalize(value.replaceAll('\\', '/'));
  return prefixes.some((prefix) => {
    const base = path.posix.normalize(prefix);
    return normalized === base || normalized.startsWith(`${base}/`);
  });
}

function checkDomain(value, allowedDomains) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && allowedDomains.includes(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function checkAllowedValues(argumentsObject, rules) {
  return Object.entries(rules).every(([key, allowed]) => allowed.includes(argumentsObject[key]));
}

export function validateRequestEnvelope(request) {
  if (!request || request.jsonrpc !== '2.0' || request.method !== 'tools/call') {
    return { ok: false, reason: 'Somente envelopes JSON-RPC 2.0 com method=tools/call são aceitos.' };
  }
  if (!request.params || typeof request.params.name !== 'string' || typeof request.params.arguments !== 'object' || request.params.arguments === null) {
    return { ok: false, reason: 'params.name e params.arguments são obrigatórios.' };
  }
  return { ok: true };
}

export function evaluatePolicy({ policy, request, context = {} }) {
  const envelope = validateRequestEnvelope(request);
  if (!envelope.ok) {
    return decision(false, request?.params?.name ?? 'unknown', 'invalid-envelope', [{ id: 'envelope', ok: false, detail: envelope.reason }]);
  }

  const toolName = request.params.name;
  const args = request.params.arguments;
  const rule = policy?.tools?.[toolName];
  if (!rule) {
    return decision(false, toolName, 'default-deny', [{ id: 'tool-allowlist', ok: false, detail: 'Tool não possui regra explícita.' }]);
  }
  if (rule.effect !== 'allow') {
    return decision(false, toolName, 'explicit-deny', [{ id: 'tool-effect', ok: false, detail: 'Policy marcou a tool como deny.' }]);
  }

  const checks = [{ id: 'tool-allowlist', ok: true, detail: 'Tool permitida explicitamente.' }];
  const constraints = rule.constraints ?? {};

  if (constraints.pathPrefixes) {
    const ok = checkPathPrefix(args.path, constraints.pathPrefixes);
    checks.push({ id: 'path-prefix', ok, detail: ok ? 'Path dentro de prefixo permitido.' : 'Path fora dos prefixos permitidos ou inválido.' });
  }

  if (constraints.allowedDomains) {
    const ok = checkDomain(args.url, constraints.allowedDomains.map((domain) => domain.toLowerCase()));
    checks.push({ id: 'allowed-domain', ok, detail: ok ? 'Destino HTTPS permitido.' : 'URL inválida, não HTTPS ou domínio fora da allowlist.' });
  }

  if (constraints.maxAmount !== undefined) {
    const amount = Number(args.amount);
    const ok = Number.isFinite(amount) && amount >= 0 && amount <= constraints.maxAmount;
    checks.push({ id: 'max-amount', ok, detail: ok ? `Valor dentro do limite ${constraints.maxAmount}.` : `Valor excede limite ${constraints.maxAmount} ou é inválido.` });
  }

  if (constraints.argumentAllowlist) {
    const ok = checkAllowedValues(args, constraints.argumentAllowlist);
    checks.push({ id: 'argument-allowlist', ok, detail: ok ? 'Argumentos restritos estão na allowlist.' : 'Um argumento possui valor fora da allowlist.' });
  }

  if (constraints.approvalRequired) {
    const ok = context.approved === true;
    checks.push({ id: 'human-approval', ok, detail: ok ? 'Aprovação externa confirmada.' : 'Aprovação humana externa é obrigatória.' });
  }

  const ok = checks.every((check) => check.ok);
  return decision(ok, toolName, ok ? 'allowed' : 'constraint-deny', checks, {
    annotationsTrustedForAuthorization: false,
    note: 'Tool annotations e hints não alteram autorização neste lab.'
  });
}

function decision(allowed, tool, reason, checks, extra = {}) {
  return {
    allowed,
    decision: allowed ? 'allow' : 'deny',
    tool,
    reason,
    checks,
    ...extra,
  };
}
