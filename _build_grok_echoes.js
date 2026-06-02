const fs = require('fs');
const path = require('path');

// ۱. خواندن فایل خام توییت‌ها
const tweetsPath = path.join(process.env.HOME, 'Desktop', 'ShahnamehMetaverse', 'shahnameh-metaverse-core', 'tweets@grok.md');
const raw = fs.readFileSync(tweetsPath, 'utf8');

// ۲. استخراج تمام خطوطی که با @grok شروع می‌شوند
const lines = raw.split('\n');
const threads = [];
let currentThread = [];
let currentDate = '';

for (let line of lines) {
  if (line.startsWith('@grok')) {
    // اگر قبلاً توییتی جمع‌آوری شده بود، آن را به عنوان یک thread ذخیره کن
    if (currentThread.length > 0) {
      threads.push({
        date: currentDate || 'Unknown',
        tweets: [...currentThread]
      });
    }
    // شروع یک thread جدید
    currentThread = [line];
    currentDate = '';
  } else if (currentThread.length > 0 && line.trim()) {
    // خطوط غیرخالی را به thread فعلی اضافه کن
    currentThread.push(line);
    // سعی کن تاریخ را از خطوط استخراج کنی
    const dateMatch = line.match(/Date: (.+?) ---/);
    if (dateMatch) currentDate = dateMatch[1].trim();
  } else if (line.trim() === '' || line.startsWith('---')) {
    // خط خالی یا جداکننده — پایان thread
    if (currentThread.length > 0) {
      threads.push({
        date: currentDate || 'Unknown',
        tweets: [...currentThread]
      });
      currentThread = [];
      currentDate = '';
    }
  }
}

// آخرین thread
if (currentThread.length > 0) {
  threads.push({
    date: currentDate || 'Unknown',
    tweets: [...currentThread]
  });
}

console.log('Total threads extracted: ' + threads.length);

// ۳. ساخت پوشه‌ها و فایل‌ها
const baseDir = '02_GROK_ARCHIVE';
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

threads.forEach((thread, i) => {
  // نام پوشه: Grok-001, Grok-002, ...
  const folderName = `Grok-${String(i+1).padStart(3, '0')}`;
  const folderPath = path.join(baseDir, folderName);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

  // فایل thread.md — محتوای خام
  const threadMd = thread.tweets.join('\n');
  fs.writeFileSync(path.join(folderPath, 'thread.md'), threadMd);

  // فایل metadata.json
  const metadata = {
    threadId: folderName,
    date: thread.date,
    tweetCount: thread.tweets.filter(l => l.startsWith('@grok')).length,
    extractedAt: '2026-06-02',
    source: '@AmirStarship on Twitter/X'
  };
  fs.writeFileSync(path.join(folderPath, 'metadata.json'), JSON.stringify(metadata, null, 2));
});

// ۴. ساخت README برای پوشهٔ آرشیو
let readme = `# @grok Conversation Archive

**Extracted:** June 2, 2026
**Source:** @AmirStarship on Twitter/X
**Total Threads:** ${threads.length}
**Status:** Raw, unprocessed, historical record

This directory contains the complete public conversations between @x@ (Amir Ahmadi) and @grok on Twitter/X.
Each thread is stored in its own folder with the raw text and metadata.

## Thread Index

| Thread ID | Date | Tweets |
|-----------|------|--------|
`;

threads.forEach(t => {
  const dateStr = t.date !== 'Unknown' ? t.date.slice(0, 50) : 'Unknown';
  readme += `| [${t.date.slice(0, 30) || 'Unknown'}](./${t.date.slice(0, 10) || 'Grok'}-${String(threads.indexOf(t)+1).padStart(3, '0')}/) | ${dateStr} | ${t.tweets.filter(l => l.startsWith('@grok')).length} |\n`;
});

readme += '\nAll tweets were posted publicly and timestamped by Twitter/X.\n';
readme += 'This archive seals them as an immutable bundle.\n';

fs.writeFileSync(path.join(baseDir, 'README.md'), readme);

console.log('✅ Archive built in ' + baseDir);
