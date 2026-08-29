import { readFile } from 'node:fs/promises';
import { evaluatePolicy } from './policy.mjs';
import { renderText, toAuditEvent } from './report.mjs';

function parseArgs(argv) {
  const result = { format: 'text', approved: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--approved') result.approved = true;
    else if (arg === '--policy') result.policy = argv[++i];
    else if (arg === '--request') result.request = argv[++i];
    else if (arg === '--format') result.format = argv[++i];
    else if (arg === '--audit') result.audit = true;
    else throw new Error(`Argumento desconhecido: ${arg}`);
  }
  if (!result.policy || !result.request) throw new Error('Use --policy <arquivo.json> --request <arquivo.json>.');
  if (!['text', 'json'].includes(result.format)) throw new Error('--format deve ser text ou json.');
  return result;
}

async function loadJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

try {
  const options = parseArgs(process.argv.slice(2));
  const [policy, request] = await Promise.all([loadJson(options.policy), loadJson(options.request)]);
  const result = evaluatePolicy({ policy, request, context: { approved: options.approved } });
  const output = options.audit ? toAuditEvent({ result, request }) : result;
  process.stdout.write(options.format === 'json' || options.audit ? `${JSON.stringify(output, null, 2)}\n` : `${renderText(result)}\n`);
  process.exitCode = result.allowed ? 0 : 2;
} catch (error) {
  console.error(`mcp-policy-firewall: ${error.message}`);
  process.exitCode = 1;
}
