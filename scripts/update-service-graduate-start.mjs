import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const targets = [
  'content/services/graduate-start.en-GB.json',
  'content/services/graduate-start.zh-TW.json',
];

const payload = {
  'content/services/graduate-start.en-GB.json': {
    key_points: [
      'Turn scattered efforts into a coherent story with visible evidence.',
      'Weekly cadence; micro-experiments between sessions (coffee chats, mini-projects).',
      'Portfolio/CV that shows outcomes and proof, not just course lists.',
      'Interview rehearsal for clarity and fit—no scripts, no hacks.',
      'Simple pricing; pause between blocks; confidentiality by default.',
    ],
    cases: [
      'New grad → CV reframed; two callbacks in the next cycle.',
      '“No experience” → 2-week mini-project with alumni mentor; first showcase in 3 weeks.',
      'Overseas degree → translate to UK examples; first panel interview scheduled.',
    ],
  },
  'content/services/graduate-start.zh-TW.json': {
    key_points: [
      '把分散的努力整合成一條清楚的故事，並且有可見的證據。',
      '每週固定節奏；兩次會談之間做小實驗（咖啡聊、迷你專案）。',
      'CV／作品集以「成果與證據」為主，而不是只列課程。',
      '面試演練追求清楚與適配——不教話術、不背模板。',
      '簡單定價；套組之間可暫停；預設保密。',
    ],
    cases: [
      '新鮮人 → 重整履歷敘事；下一輪應徵週期獲得 2 次回撥。',
      '「沒有經驗」 → 2 週迷你專案＋學長姊協作；3 週內完成第一版展示。',
      '海外學歷 → 轉譯為英國在地的實例；安排到第一場 panel 面試。',
    ],
  },
};

function loadJson(p) {
  const full = path.join(ROOT, p);
  const raw = fs.readFileSync(full, 'utf8');
  return { full, data: JSON.parse(raw) };
}

function uniquePrepend(arr, items) {
  const set = new Set(arr.map(String));
  const toAdd = items.filter(s => !set.has(String(s)));
  return [...toAdd, ...arr];
}

function tryWriteStringArray(obj, pathKeys, items) {
  let ref = obj;
  for (let i = 0; i < pathKeys.length - 1; i++) {
    const k = pathKeys[i];
    if (!ref[k] || typeof ref[k] !== 'object') {
      if (ref[k] === undefined) {
        ref[k] = {};
      } else {
        return false;
      }
    }
    ref = ref[k];
  }
  const last = pathKeys[pathKeys.length - 1];
  if (!Array.isArray(ref[last])) {
    if (ref[last] === undefined) {
      ref[last] = [];
    } else {
      return false;
    }
  }
  if (ref[last].length && typeof ref[last][0] !== 'string') return false;
  ref[last] = uniquePrepend(ref[last], items);
  return true;
}

for (const rel of targets) {
  const { full, data } = loadJson(rel);
  const add = payload[rel];
  if (!add) continue;

  const wroteKP = tryWriteStringArray(data, ['key_points','items'], add.key_points);
  const wroteCases = tryWriteStringArray(data, ['cases','items'], add.cases);

  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated: ${rel} | key_points: ${wroteKP ? 'ok' : 'skip'} | cases: ${wroteCases ? 'ok' : 'skip'}`);
}
console.log('graduate-start overview content updated (en-GB, zh-TW).');
