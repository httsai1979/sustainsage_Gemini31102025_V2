import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const targets = [
  'content/services/immigrant-job.en-GB.json',
  'content/services/immigrant-job.zh-TW.json',
];

const payload = {
  'content/services/immigrant-job.en-GB.json': {
    key_points: [
      'Translate overseas experience into UK-relevant examples and terms.',
      'Weekly cadence; micro-experiments between sessions (info chats, trial tasks, volunteering taster).',
      'CV/LinkedIn adapted to UK norms; show recent proof points.',
      'Interview rehearsal for culture/fit—clear stories without scripts or hacks.',
      'Simple pricing; pause between blocks; confidentiality by default.',
    ],
    cases: [
      'Overseas PM → reframed achievements; first UK on-site interview in 4 weeks.',
      'Retail supervisor → local referees + shift trial; part-time offer accepted.',
      'Junior developer → GitHub mini-project for a UK problem; first paid task in 3 weeks.',
    ],
  },
  'content/services/immigrant-job.zh-TW.json': {
    key_points: [
      '把海外經驗轉譯為英國職場能理解的例子與語彙。',
      '每週節奏；兩次會談間做小實驗（資訊性聊天、試做任務、志工嘗試）。',
      'CV／LinkedIn 調整為英國常見格式與期待；展示最近的證據點。',
      '面試演練聚焦文化與適配；不教話術、不背模板。',
      '簡單定價；套組之間可暫停；預設保密。',
    ],
    cases: [
      '海外專案經理 → 轉寫成可驗證的成就；4 週內拿到第一次現場面試。',
      '零售帶班 → 補在地推薦人＋排班試做；接受兼職 Offer。',
      '初階工程師 → 針對英國情境做 GitHub 迷你專案；3 週內接到第一個有酬任務。',
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
  const existingObjects = existing.map(toKeyPointObject).filter(Boolean);

  const seen = new Set(
    existingObjects.map((item) => (item.title || item.description || '').toLowerCase())
  );

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
  console.log(
    `Updated: ${rel} | key_points: ${
      mergedKeyPoints.length > existingKeyPoints.length ? 'ok' : 'skip'
    } | cases: ${casesStatus}`
  );
}
console.log('immigrant-job overview content updated (en-GB, zh-TW).');
