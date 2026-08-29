import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

const records = new Map([
  ['alpha-1', { id: 'alpha-1', tenant_id: 'alpha', label: 'Alpha internal record' }],
  ['beta-1', { id: 'beta-1', tenant_id: 'beta', label: 'Beta internal record' }],
]);

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

export function createDemoServer() {
  return createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') return json(res, 200, { ok: true });
    if (req.method !== 'GET') return json(res, 405, { error: 'method_not_allowed' });

    const match = req.url?.match(/^\/(safe|vulnerable)\/tenants\/([^/]+)\/records\/([^/?]+)$/);
    if (!match) return json(res, 404, { error: 'not_found' });
    const [, mode, targetTenant, recordId] = match;
    const actorTenant = req.headers['x-demo-tenant'];
    if (!actorTenant) return json(res, 401, { error: 'missing_demo_identity' });

    const record = records.get(recordId);
    if (!record || record.tenant_id !== targetTenant) return json(res, 404, { error: 'not_found' });

    if (mode === 'safe' && actorTenant !== targetTenant) {
      return json(res, 403, { error: 'forbidden' });
    }

    // Intentionally vulnerable teaching endpoint: it checks only whether the record exists.
    return json(res, 200, record);
  });
}

export async function listenDemoServer({ port = 3456 } = {}) {
  const server = createDemoServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return server;
}

const entry = process.argv[1] ? pathToFileURL(process.argv[1]).href : '';
if (import.meta.url === entry) {
  const port = Number(process.env.PORT ?? 3456);
  await listenDemoServer({ port });
  console.log(`Tenant demo API listening on http://127.0.0.1:${port}`);
  console.log('Teaching-only endpoints: /safe/... and /vulnerable/...');
}
