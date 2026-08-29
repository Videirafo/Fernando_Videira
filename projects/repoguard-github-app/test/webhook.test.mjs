import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyWebhookSignature, shouldHandlePullRequest } from '../src/webhook.mjs';

test('validates GitHub HMAC signature', () => {
  const body = Buffer.from('{"ok":true}');
  const secret = 'local-test-secret';
  const signature = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
  assert.equal(verifyWebhookSignature(body, signature, secret), true);
  assert.equal(verifyWebhookSignature(body, 'sha256=deadbeef', secret), false);
});

test('only handles meaningful PR actions', () => {
  assert.equal(shouldHandlePullRequest('opened'), true);
  assert.equal(shouldHandlePullRequest('closed'), false);
});
