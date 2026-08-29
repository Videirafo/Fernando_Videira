import { renderText, verifyTenantIsolation } from './verifier.mjs';

function parseArgs(argv) {
  const options = { baseUrl: 'http://127.0.0.1:3456', target: 'safe', format: 'text' };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--base-url') options.baseUrl = argv[++i];
    else if (argv[i] === '--target') options.target = argv[++i];
    else if (argv[i] === '--format') options.format = argv[++i];
    else throw new Error(`Argumento desconhecido: ${argv[i]}`);
  }
  if (!['text', 'json'].includes(options.format)) throw new Error('--format deve ser text ou json.');
  return options;
}

try {
  const options = parseArgs(process.argv.slice(2));
  const report = await verifyTenantIsolation(options);
  process.stdout.write(options.format === 'json' ? `${JSON.stringify(report, null, 2)}\n` : `${renderText(report)}\n`);
  process.exitCode = report.secure ? 0 : 2;
} catch (error) {
  console.error(`tenant-isolation-verifier: ${error.message}`);
  process.exitCode = 1;
}
