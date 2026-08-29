import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature?.startsWith('sha256=') || !secret) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`;
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function shouldHandlePullRequest(action) {
  return new Set(['opened', 'reopened', 'synchronize', 'edited']).has(action);
}
