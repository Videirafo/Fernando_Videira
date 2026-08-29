import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePolicy, validateRequestEnvelope } from '../src/policy.mjs';

const policy = {
  tools: {
    'files.read': { effect: 'allow', constraints: { pathPrefixes: ['/workspace/docs'] } },
    'http.fetch': { effect: 'allow', constraints: { allowedDomains: ['api.github.com'], argumentAllowlist: { method: ['GET'] } } },
    'payments.create': { effect: 'allow', constraints: { maxAmount: 100, approvalRequired: true } },
    'shell.exec': { effect: 'deny' },
  },
};

function request(name, args = {}) {
  return { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } };
}

test('default deny for unknown tools', () => {
  assert.equal(evaluatePolicy({ policy, request: request('unknown.tool') }).allowed, false);
});

test('blocks explicit deny', () => {
  assert.equal(evaluatePolicy({ policy, request: request('shell.exec', { command: 'echo hi' }) }).reason, 'explicit-deny');
});

test('allows normalized path inside prefix and blocks traversal', () => {
  assert.equal(evaluatePolicy({ policy, request: request('files.read', { path: '/workspace/docs/guide.md' }) }).allowed, true);
  assert.equal(evaluatePolicy({ policy, request: request('files.read', { path: '/workspace/docs/../../etc/passwd' }) }).allowed, false);
});

test('requires HTTPS and exact allowed domain', () => {
  assert.equal(evaluatePolicy({ policy, request: request('http.fetch', { url: 'https://api.github.com/repos/x/y', method: 'GET' }) }).allowed, true);
  assert.equal(evaluatePolicy({ policy, request: request('http.fetch', { url: 'https://api.github.com.evil.example/x', method: 'GET' }) }).allowed, false);
  assert.equal(evaluatePolicy({ policy, request: request('http.fetch', { url: 'http://api.github.com/x', method: 'GET' }) }).allowed, false);
});

test('checks allowed argument values', () => {
  assert.equal(evaluatePolicy({ policy, request: request('http.fetch', { url: 'https://api.github.com/x', method: 'POST' }) }).allowed, false);
});

test('approval comes from trusted context, not request arguments', () => {
  const req = request('payments.create', { amount: 50, approved: true });
  assert.equal(evaluatePolicy({ policy, request: req }).allowed, false);
  assert.equal(evaluatePolicy({ policy, request: req, context: { approved: true } }).allowed, true);
});

test('blocks amounts over policy limit', () => {
  assert.equal(evaluatePolicy({ policy, request: request('payments.create', { amount: 101 }), context: { approved: true } }).allowed, false);
});

test('rejects non tools/call envelope', () => {
  assert.equal(validateRequestEnvelope({ jsonrpc: '2.0', method: 'resources/read', params: {} }).ok, false);
});
