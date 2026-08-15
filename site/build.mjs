import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const site = join(root, 'site');
const out = join(site, 'dist');
const readingDocs = [
  'INDEX.md', 'README.md', '02_TIMELINE/timeline.md',
  '02_TIMELINE/layers/case-timeline.md', '02_TIMELINE/layers/ledger-timeline.md'
];

async function collectPdfs(directory, relative = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const nextRelative = join(relative, entry.name);
    const nextAbsolute = join(directory, entry.name);
    if (entry.isDirectory()) return collectPdfs(nextAbsolute, nextRelative);
    return entry.isFile() && entry.name.toLowerCase().endsWith('.pdf') ? [nextRelative] : [];
  }));
  return files.flat();
}

function recordMetadata(path) {
  const filename = path.split('/').pop().replace(/\.pdf$/i, '');
  const date = (filename.match(/\d{4}-\d{2}-\d{2}/) || [])[0] || 'Undated';
  const echo = (path.match(/Echo[1-7]/i) || [])[0] || 'Supporting record';
  const caseId = (path.match(/500VU\w+/i) || [])[0] || null;
  return { path, date, echo: echo.replace(/^echo/i, 'Echo '), caseId, title: filename.replace(/^\d{4}-\d{2}-\d{2}[_-]*/, '').replace(/[_-]+/g, ' ') };
}

await mkdir(out, { recursive: true });
for (const file of ['index.html', 'style.css', 'ledger.css', 'app.js', 'echoes.json', 'favicon.svg', 'robots.txt', 'sitemap.xml']) {
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

const pdfs = (await Promise.all(['01_EMAIL_ARCHIVE', '03_TRANSITION_ARCHIVE', '04_LEDGER_ARCHIVE']
  .map(async (archive) => (await collectPdfs(join(root, archive))).map((file) => join(archive, file))))).flat();
const manifest = pdfs.map(recordMetadata).sort((a, b) => a.date.localeCompare(b.date) || a.path.localeCompare(b.path));
await writeFile(join(out, 'archive-ledger.json'), JSON.stringify(manifest));

console.log(`Built Evidence Room with ${readingDocs.length} text records and ${manifest.length} source PDFs.`);
