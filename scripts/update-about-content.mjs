import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const targets = [
  'content/about/en-GB.json',
  'content/about/zh-TW.json',
];

const additions = {
  'content/about/en-GB.json': {
    scenarios: [
      { title: "You’re returning to work after a break and want a kinder ramp back." },
      { title: "You’ve applied widely but struggle to turn interviews into offers." },
      { title: "You got an offer but aren’t sure it fits your real priorities." },
      { title: "You’re switching fields and feel you’re starting from zero." },
      { title: "You’re in the UK with overseas experience and need local proof points." },
      { title: "You lead a small team and want steadier 1:1 conversations." },
    ],
    cases: [
      { title: "Graduate → clearer story, 2 callbacks within one cycle." },
      { title: "Returner → 3-month ramp plan, part-time to full-time." },
      { title: "Switcher → portfolio reframing, first project in 6 weeks." },
    ],
  },
  'content/about/zh-TW.json': {
    scenarios: [
      { title: "中斷一段時間準備重返職場，需要一個友善的回到軌道方式。" },
      { title: "投遞很多履歷，但面試很難轉成錄取或下一步。" },
      { title: "拿到 Offer，卻不確定是否符合真正的優先順序。" },
      { title: "準備跨領域轉職，覺得自己像從零開始。" },
      { title: "人在英國、經歷在海外，需要建立在地可信的證據點。" },
      { title: "帶領小團隊，希望 1:1 對話更穩定、更有節奏。" },
    ],
    cases: [
      { title: "應屆畢業生 → 故事線更清楚，同梯次獲得 2 次回撥。" },
      { title: "重返職場者 → 3 個月漸進計畫，從兼職到全職。" },
      { title: "轉職者 → 作品集重構，6 週內拿到第一個專案。" },
    ],
  },
};

function loadJson(p) {
  const full = path.join(ROOT, p);
  const raw = fs.readFileSync(full, 'utf8');
  return { full, data: JSON.parse(raw) };
}

function toJSONKey(value) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return String(value);
  }
}

function ensureObject(value, wrapKey) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }

  if (value == null) return {};

  return { [wrapKey]: String(value) };
}

function uniquePrepend(arr, items) {
  const set = new Set(arr.map(toJSONKey));
  const next = [];

  for (const item of items) {
    const key = toJSONKey(item);
    if (!set.has(key)) {
      next.push(item);
      set.add(key);
    }
  }

  return [...next, ...arr];
}

for (const rel of targets) {
  const { full, data } = loadJson(rel);
  const add = additions[rel];
  if (!add) continue;

  // whatIsCoaching.scenarios[] → 例子優先：把新增情境插到前面
  if (data?.whatIsCoaching?.scenarios && Array.isArray(data.whatIsCoaching.scenarios)) {
    const existing = data.whatIsCoaching.scenarios.map(item => ensureObject(item, 'title'));
    const incoming = add.scenarios.map(item => ensureObject(item, 'title'));
    data.whatIsCoaching.scenarios = uniquePrepend(existing, incoming);
  }

  // approach.cases[] → 若存在就補 2–3 條極短案例；沒有就跳過
  if (data?.approach?.cases && Array.isArray(data.approach.cases)) {
    const existing = data.approach.cases.map(item => ensureObject(item, 'title'));
    const incoming = add.cases.map(item => ensureObject(item, 'title'));
    data.approach.cases = uniquePrepend(existing, incoming);
  }

  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated: ${rel}`);
}
console.log('Done.');
