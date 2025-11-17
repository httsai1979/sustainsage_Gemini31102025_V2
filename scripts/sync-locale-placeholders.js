#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');
const excludedRoots = new Set(['blog', 'resources']);

const fallbackMessages = {
  'en-GB': 'Temporarily showing English content while we complete this translation.',
  'zh-TW': '目前暫以英文內容呈現，完整翻譯即將補上。',
  'zh-CN': '目前暂以英文内容呈现，完整翻译即将补上。',
};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(contentDir, absolutePath);
    const [rootSegment] = relativePath.split(path.sep);

    if (excludedRoots.has(rootSegment)) {
      continue;
    }

    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!/en-GB\.json$/.test(entry.name)) {
      continue;
    }

    processLocaleFile(absolutePath);
  }
}

function writeJSON(filePath, data) {
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  fs.writeFileSync(filePath, serialized, 'utf8');
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function processLocaleFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    data.fallbackNotice = fallbackMessages['en-GB'];
  }

  writeJSON(filePath, data);

  for (const locale of ['zh-TW', 'zh-CN']) {
    const targetPath = filePath.replace('en-GB', locale);
    const localized = cloneData(data);

    if (localized && typeof localized === 'object' && !Array.isArray(localized)) {
      localized.fallbackNotice = fallbackMessages[locale];
    }

    writeJSON(targetPath, localized);
  }
}

walk(contentDir);
