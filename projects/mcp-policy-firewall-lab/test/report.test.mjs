import test from 'node:test';
import assert from 'node:assert/strict';
import { renderText, toAuditEvent } from '../src/report.mjs';

test('renders auditable decision without tool execution', () => {
  const result = { decision: 'deny', tool: 'shell.exec', reason: 'explicit-deny', checks: [{ id: 'tool-effect', ok: false, detail: 'blocked' }] };
  assert.match(renderText(result), /DENY/);
  const event = toAuditEvent({ result, request: { id: 7, method: 'tools/call' } });
  assert.equal(event.requestId, 7);
  assert.equal(event.decision, 'deny');
});
