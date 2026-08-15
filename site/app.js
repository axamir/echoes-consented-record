const dialog = document.querySelector('dialog');
const reader = dialog.querySelector('article');
const sourceRoot = 'https://github.com/axamir/echoes-consented-record/blob/main/';

const escapeHtml = (value) => value.replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char]);
const markdown = (text) => escapeHtml(text)
  .replace(/^### (.*)$/gm, '<h3>$1</h3>')
  .replace(/^## (.*)$/gm, '<h2>$1</h2>')
  .replace(/^# (.*)$/gm, '<h1>$1</h1>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\n\n/g, '</p><p>')
  .replace(/^- (.*)$/gm, '<li>$1</li>');

async function openRecord(path) {
  dialog.showModal();
  reader.innerHTML = '<p class="loading">Loading the original record…</p>';
  if (path.toLowerCase().endsWith('.pdf')) {
    reader.innerHTML = `<div class="reader-head"><p>PRIMARY PDF</p><a href="${sourceRoot}${path}" target="_blank" rel="noreferrer">Open source in GitHub ↗</a></div><iframe class="pdf-reader" title="${escapeHtml(path)}" src="record/${encodeURI(path)}#view=FitH"></iframe>`;
    return;
  }
  try {
    const response = await fetch(`record/${encodeURI(path)}`);
    if (!response.ok) throw new Error('not found');
    reader.innerHTML = `<div class="reader-head"><p>TEXT RECORD</p><a href="${sourceRoot}${path}" target="_blank" rel="noreferrer">Open source in GitHub ↗</a></div><div class="prose"><p>${markdown(await response.text())}</p></div>`;
  } catch {
    reader.innerHTML = `<p>That record could not be loaded here.</p><a href="${sourceRoot}${path}" target="_blank" rel="noreferrer">Open the original document in GitHub ↗</a>`;
  }
}

function createEchoStream(echoes) {
  const section = document.createElement('section');
  section.className = 'echo-stream';
  section.id = 'echo-stream';
  section.innerHTML = `<div class="stream-intro"><p>DOCUMENTED SEQUENCE · JUL–AUG 2025</p><h2>Read the record in the order it unfolded.</h2><div><p>Each panel opens its original PDF here. The chronology describes archival placement; it does not settle the meaning, intent, or status of any correspondence.</p><a href="#verify">Read the verification boundary ↓</a></div></div><div class="stream-list"></div>`;
  const list = section.querySelector('.stream-list');
  echoes.forEach((entry, index) => {
    const card = document.createElement('article');
    const caseLine = entry.caseId ? `<p class="case-id">CASE / ${entry.caseId}</p>` : '<p class="case-id">CORRESPONDENCE RECORD</p>';
    const firstRecord = index === 0 ? `<div class="inline-record"><div><p>BEGIN WITH THE PRIMARY THREAD</p><span>The complete Echo 1 correspondence is placed directly in the reading sequence.</span></div><iframe loading="lazy" title="Echo 1 — Initial Support Correspondence" src="record/${encodeURI(entry.path)}#view=FitH"></iframe></div>` : '';
    card.innerHTML = `<div class="echo-number">${String(index + 1).padStart(2, '0')}</div><div><p class="echo-meta">${entry.echo} · ${entry.date}</p><h3>${entry.title}</h3><p>${entry.summary}</p>${caseLine}${firstRecord}</div><div class="echo-actions"><button>Read original PDF <b>↗</b></button><a href="${sourceRoot}${entry.path}" target="_blank" rel="noreferrer">Source path ↗</a></div>`;
    card.querySelector('button').addEventListener('click', () => openRecord(entry.path));
    list.append(card);
  });
  document.querySelector('.boundary').before(section);
}

document.querySelectorAll('[data-doc]').forEach((button) => button.addEventListener('click', () => openRecord(button.dataset.doc)));
document.querySelector('.open').addEventListener('click', () => openRecord('INDEX.md'));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
fetch('echoes.json').then((response) => response.json()).then(createEchoStream).catch(() => {});
