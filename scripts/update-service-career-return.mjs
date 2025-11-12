import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const targets = [
  'content/services/career-return.en-GB.json',
  'content/services/career-return.zh-TW.json',
];

const payload = {
  'content/services/career-return.en-GB.json': {
    key_points: [
      'Gentle 12-week ramp back with light structure and honest boundaries.',
      'Weekly cadence; small experiments between sessions to build momentum.',
      'Interview rehearsal that sharpens stories and fit—no hacks, no scripts.',
      'CV/portfolio reframing to show recent proof of progress.',
      'Simple pricing; pause between blocks; confidentiality by default.',
    ],
    cases: [
      'Returner → 3-month plan from part-time to full-time, with weekly check-ins.',
      'Career break → rebuild narrative; two callbacks in the next application cycle.',
      'Switcher → portfolio refresh; first paid project in 6 weeks.',
    ],
  },
  'content/services/career-return.zh-TW.json': {
    key_points: [
      '12 週溫和回到節奏：輕量結構、清楚邊界。',
      '每週固定節奏；兩次會談之間做小實驗，累積動能。',
      '面試演練聚焦「故事與適配」——不教話術、不背模板。',
      'CV／作品集重構，讓近期進展被看見。',
      '簡單定價；套組之間可暫停；預設保密。',
    ],
    cases: [
      '重返職場 → 3 個月計畫，由兼職穩定走向全職，每週有短回顧。',
      '職涯中斷 → 重建敘事；下一輪應徵週期拿到 2 次回撥。',
      '跨領域 → 作品集更新；6 週內接到第一個有酬專案。',
    ],
  },
};

function loadJson(p) {
  const full = path.join(ROOT, p);
  const raw = fs.readFileSync(full, 'utf8');
  return { full, data: JSON.parse(raw) };
}

function toKeyPointObject(value) {
  if (!value) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? { title: trimmed } : null;
  }

  if (typeof value === 'object') {
    const title = typeof value.title === 'string' ? value.title.trim() : '';
    const description = typeof value.description === 'string' ? value.description.trim() : '';

    if (!title && !description) {
      return null;
    }

    return {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    };
  }

  return null;
}

function mergeKeyPoints(existing = [], additions = []) {
  const existingObjects = existing
    .map(toKeyPointObject)
    .filter(Boolean);

  const seen = new Set(existingObjects.map((item) => (item.title || item.description || '').toLowerCase()));

  const incomingObjects = additions
    .map(toKeyPointObject)
    .filter((item) => item && !seen.has((item.title || item.description || '').toLowerCase()));

  return [...incomingObjects, ...existingObjects];
}

function uniquePrependStrings(arr, items) {
  const existing = Array.isArray(arr) ? arr.map(String) : [];
  const set = new Set(existing);
  const toAdd = items.map(String).filter((s) => !set.has(s));
  return [...toAdd, ...existing];
}

for (const rel of targets) {
  const { full, data } = loadJson(rel);
  const add = payload[rel];
  if (!add) continue;

  const existingKeyPoints = Array.isArray(data?.key_points?.items)
    ? data.key_points.items
    : [];

  const mergedKeyPoints = mergeKeyPoints(existingKeyPoints, add.key_points);

  if (mergedKeyPoints.length > 0) {
    data.key_points = {
      ...(data.key_points || {}),
      items: mergedKeyPoints,
    };
  }

  let casesStatus = 'skip';
  if (Array.isArray(data?.cases?.items) && data.cases.items.every((item) => typeof item === 'string')) {
    data.cases.items = uniquePrependStrings(data.cases.items, add.cases);
    casesStatus = 'ok';
  }

  fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated: ${rel} | key_points: ${mergedKeyPoints.length > existingKeyPoints.length ? 'ok' : 'skip'} | cases: ${casesStatus}`);
}
console.log('career-return overview content updated (en-GB, zh-TW).');
