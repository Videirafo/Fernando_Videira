import test from 'node:test';
import assert from 'node:assert/strict';
import { createDemoServer } from '../src/demo-server.mjs';
import { verifyTenantIsolation } from '../src/verifier.mjs';

async function withServer(callback) {
  const server = createDemoServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  try {
    await callback(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('safe endpoint passes the tenant matrix', async () => {
  await withServer(async (baseUrl) => {
    const report = await verifyTenantIsolation({ baseUrl, target: 'safe' });
    assert.equal(report.secure, true);
    assert.equal(report.passed, 4);
  });
});

test('vulnerable endpoint is detected as cross-tenant leakage', async () => {
  await withServer(async (baseUrl) => {
    const report = await verifyTenantIsolation({ baseUrl, target: 'vulnerable' });
    assert.equal(report.secure, false);
    assert.equal(report.findings.filter((item) => item.type === 'cross-tenant-data-leak').length, 2);
  });
});

test('refuses remote hosts', async () => {
  await assert.rejects(() => verifyTenantIsolation({ baseUrl: 'https://example.com', target: 'safe' }), /localhost-only/);
});
