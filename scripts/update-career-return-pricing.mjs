import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

const files = [
  'content/services/career-return.en-GB.json',
  'content/services/career-return.zh-TW.json',
];

const payload = {
  'content/services/career-return.en-GB.json': {
    pricing: {
      packages: [
        {
          title: 'Restart — 3 sessions',
          highlights: [
            '3 × 50-min over 4–6 weeks',
            'Confidence reset and story refresh after a gap',
            'Recent proof points plan (mini-project / references)',
          ],
        },
        {
          title: 'Momentum — 6 sessions',
          highlights: [
            '6 × 50-min over 8–12 weeks',
            'Portfolio/CV reframing with gap-bridge evidence',
            'Interview rehearsal for return-to-work scenarios',
          ],
        },
        {
          title: 'Sustain — 12 sessions',
          highlights: [
            '12 × 50-min over 3–6 months',
            'Cadence for balancing care duties and work',
            'Tailored experiments + rhythm reviews',
          ],
        },
      ],
      policies: [
        'Rescheduling: 24 hours’ notice; late changes count as used.',
        'Blocks may pause between sessions by mutual agreement.',
        'Confidential by default; minimal notes; deletion on request.',
        'Coaching, not therapy; signposting if therapy/legal advice is safer.',
        'Online within UK hours; invoicing in GBP.',
      ],
    },
  },
  'content/services/career-return.zh-TW.json': {
    pricing: {
      packages: [
        {
          title: '重新啟動 — 3 次會談',
          highlights: [
            '3 × 50 分鐘／4–6 週內完成',
            '中斷後的信心重整與敘事更新',
            '近期證據點計畫（迷你專案／推薦人）',
          ],
        },
        {
          title: '推進動能 — 6 次會談',
          highlights: [
            '6 × 50 分鐘／8–12 週',
            '履歷／作品集重構：補上空窗期的橋接證據',
            '面試演練：重返職場情境與溝通',
          ],
        },
        {
          title: '穩定維持 — 12 次會談',
          highlights: [
            '12 × 50 分鐘／3–6 個月',
            '兼顧照護與工作的節奏設計',
            '客製化實驗＋週期性回顧',
          ],
        },
      ],
      policies: [
        '改期需提前 24 小時；逾時視同使用一次會談。',
        '套組可在會談間暫停，需雙方同意。',
        '預設保密；最少必要紀錄；可要求刪除。',
        '教練而非治療／法律；必要時提供轉介資訊。',
        '線上、以英國時段為主；以英鎊（GBP）開立發票。',
      ],
    },
  },
};

function loadJSON(rel) {
  const full = path.join(ROOT, rel);
  const raw = fs.readFileSync(full, 'utf8');
  return { full, data: JSON.parse(raw) };
}

for (const rel of files) {
  const { full, data } = loadJSON(rel);
  const patch = payload[rel];
  if (!patch) continue;
  data.pricing = { ...(data.pricing || {}), ...(patch.pricing || {}) };
  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated:', rel, '| packages:', data.pricing.packages?.length ?? 0, '| policies:', data.pricing.policies?.length ?? 0);
}
console.log('career-return/pricing updated (en-GB, zh-TW).');
