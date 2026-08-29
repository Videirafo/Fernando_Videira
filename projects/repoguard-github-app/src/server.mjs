import { createServer } from 'node:http';
import { getInstallationToken, listPullRequestFiles, commentOnPullRequest } from './github.mjs';
import { evaluatePullRequest, renderComment } from './policy.mjs';
import { shouldHandlePullRequest, verifyWebhookSignature } from './webhook.mjs';

const port = Number(process.env.PORT ?? 3000);
const webhookSecret = process.env.GH_WEBHOOK_SECRET;
const appId = process.env.GH_APP_ID;
const privateKeyPath = process.env.GH_PRIVATE_KEY_PATH;

function requireConfig() {
  if (!webhookSecret || !appId || !privateKeyPath) {
    throw new Error('Defina GH_WEBHOOK_SECRET, GH_APP_ID e GH_PRIVATE_KEY_PATH somente no ambiente local/servidor.');
  }
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, service: 'repoguard-github-app' }));
  }
  if (req.method !== 'POST' || req.url !== '/webhook') {
    res.writeHead(404); return res.end('not found');
  }

  try {
    requireConfig();
    const raw = await readBody(req);
    if (!verifyWebhookSignature(raw, req.headers['x-hub-signature-256'], webhookSecret)) {
      res.writeHead(401); return res.end('invalid signature');
    }
    const event = req.headers['x-github-event'];
    const payload = JSON.parse(raw.toString('utf8'));
    if (event !== 'pull_request' || !shouldHandlePullRequest(payload.action)) {
      res.writeHead(202); return res.end('ignored');
    }

    const installationId = payload.installation?.id;
    const owner = payload.repository?.owner?.login;
    const repo = payload.repository?.name;
    const pullNumber = payload.pull_request?.number;
    if (!installationId || !owner || !repo || !pullNumber) throw new Error('Webhook incompleto.');

    const token = await getInstallationToken({ appId, privateKeyPath, installationId });
    const files = await listPullRequestFiles({ owner, repo, pullNumber, token });
    const report = evaluatePullRequest({ body: payload.pull_request.body ?? '', files });
    await commentOnPullRequest({ owner, repo, pullNumber, token, body: renderComment(report) });

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, report }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'internal_error' }));
  }
});

server.listen(port, '127.0.0.1', () => console.log(`RepoGuard listening on http://127.0.0.1:${port}`));
