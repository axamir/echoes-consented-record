import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const site = join(root, 'site');
const out = join(site, 'dist');
const readingDocs = [
  'INDEX.md', 'README.md', '02_TIMELINE/timeline.md',
  '02_TIMELINE/layers/case-timeline.md', '02_TIMELINE/layers/ledger-timeline.md'
];

await mkdir(out, { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'echoes.json']) {
  await cp(join(site, file), join(out, file));
}
await cp(join(root, 'assets'), join(out, 'assets'), { recursive: true });

for (const doc of readingDocs) {
  const target = join(out, 'record', doc);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await readFile(join(root, doc)));
}

// Keep every published PDF available, but load each only when a reader asks for it.
for (const archive of ['01_EMAIL_ARCHIVE', '03_TRANSITION_ARCHIVE', '04_LEDGER_ARCHIVE']) {
  await cp(join(root, archive), join(out, 'record', archive), { recursive: true });
}

console.log(`Built Evidence Room with ${readingDocs.length} text records and complete PDF archive.`);
