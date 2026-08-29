import { createSign } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const API = 'https://api.github.com';
const API_VERSION = '2026-03-10';

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

export async function createAppJwt(appId, privateKeyPath, now = Math.floor(Date.now() / 1000)) {
  const key = await readFile(privateKeyPath, 'utf8');
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({ iat: now - 30, exp: now + 8 * 60, iss: appId }));
  const unsigned = `${header}.${payload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  return `${unsigned}.${signer.sign(key, 'base64url')}`;
}

async function api(path, { token, method = 'GET', body, fetchImpl = fetch } = {}) {
  const response = await fetchImpl(`${API}${path}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': API_VERSION,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`GitHub API ${method} ${path}: ${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}

export async function getInstallationToken({ appId, privateKeyPath, installationId, fetchImpl = fetch }) {
  const jwt = await createAppJwt(appId, privateKeyPath);
  const result = await api(`/app/installations/${installationId}/access_tokens`, { token: jwt, method: 'POST', fetchImpl });
  return result.token;
}

export async function listPullRequestFiles({ owner, repo, pullNumber, token, fetchImpl = fetch }) {
  return api(`/repos/${owner}/${repo}/pulls/${pullNumber}/files?per_page=100`, { token, fetchImpl });
}

export async function commentOnPullRequest({ owner, repo, pullNumber, token, body, fetchImpl = fetch }) {
  return api(`/repos/${owner}/${repo}/issues/${pullNumber}/comments`, { token, method: 'POST', body: { body }, fetchImpl });
}
