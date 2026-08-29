import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePullRequest, renderComment } from '../src/policy.mjs';

test('passes a focused PR with linked issue', () => {
  const report = evaluatePullRequest({ body: 'Closes #42', files: [{ filename: 'src/app.mjs' }] });
  assert.equal(report.ok, true);
  assert.match(renderComment(report), /3\/3/);
});

test('flags sensitive filenames and missing issue', () => {
  const report = evaluatePullRequest({ body: 'update', files: [{ filename: '.env.production' }] });
  assert.equal(report.ok, false);
  assert.equal(report.checks.find((c) => c.id === 'sensitive-files').ok, false);
});

test('flags oversized pull requests', () => {
  const files = Array.from({ length: 41 }, (_, i) => ({ filename: `src/${i}.mjs` }));
  const report = evaluatePullRequest({ body: 'Refs #1', files, maxFiles: 40 });
  assert.equal(report.checks.find((c) => c.id === 'pr-size').ok, false);
});
