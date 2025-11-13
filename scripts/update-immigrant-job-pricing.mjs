import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const files = [
  'content/services/immigrant-job.en-GB.json',
  'content/services/immigrant-job.zh-TW.json',
];

const payload = {
  'content/services/immigrant-job.en-GB.json': {
    pricing: {
      packages: [
        {
          name: 'Starter — 3 sessions',
          duration: '3 × 50-min over 4–6 weeks',
          scope: 'One micro-experiment between sessions; CV/LinkedIn quick pass for UK norms.',
          price_note: 'Fees on request; invoiced in GBP.',
        },
        {
          name: 'Focus — 6 sessions',
          duration: '6 × 50-min over 8–12 weeks',
          scope: 'Portfolio/CV reframing with visible proof points; interview rehearsal for clarity and fit.',
          price_note: 'Fees on request; invoiced in GBP.',
        },
        {
          name: 'Extended — 12 sessions',
          duration: '12 × 50-min over 3–6 months',
          scope: 'Deep practice on culture fit and manager conversations; tailored projects with rhythm reviews.',
          price_note: 'Fees on request; invoiced in GBP.',
        },
      ],
      policies: [
        {
          title: 'Rescheduling',
          body: '24 hours’ notice; late changes count as used.',
        },
        {
          title: 'Cadence',
          body: 'Cadence agreed in the first session; pause allowed between blocks.',
        },
        {
          title: 'Confidentiality',
          body: 'Confidential by default; minimal notes; deletion on request.',
        },
        {
          title: 'Scope',
          body: 'Coaching, not therapy — signposting if therapy is safer.',
        },
        {
          title: 'Logistics',
          body: 'UK hours (online); invoicing in GBP.',
        },
      ],
    },
  },
  'content/services/immigrant-job.zh-TW.json': {
    pricing: {
      packages: [
        {
          name: '入門 — 3 次會談',
          duration: '3 × 50 分鐘／4–6 週內完成',
          scope: '每次會談之間 1 個小實驗；CV／LinkedIn 以英國常見格式快速校正。',
          price_note: '費用以 GBP 計價。',
        },
        {
          name: '聚焦 — 6 次會談',
          duration: '6 × 50 分鐘／8–12 週',
          scope: '作品集／履歷重構，強化可見的證據點；面試演練聚焦清楚與適配。',
          price_note: '費用以 GBP 計價。',
        },
        {
          name: '延伸 — 12 次會談',
          duration: '12 × 50 分鐘／3–6 個月',
          scope: '深度練習文化適配與主管對話；客製練習題與節奏回顧。',
          price_note: '費用以 GBP 計價。',
        },
      ],
      policies: [
        {
          title: '改期',
          body: '需提前 24 小時；逾時視同使用一次會談。',
        },
        {
          title: '頻率',
          body: '第一堂確立節奏；套組之間可暫停。',
        },
        {
          title: '保密',
          body: '預設保密；最少必要紀錄；可要求刪除。',
        },
        {
          title: '範圍',
          body: '教練而非治療；若有需要會提供轉介資訊。',
        },
        {
          title: '時差與費用',
          body: '線上時段以英國時間為主；帳款以 GBP 計價。',
        },
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

  const next = {
    ...(data.pricing || {}),
    ...(patch.pricing || {}),
  };

  data.pricing = next;

  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  console.log(
    'Updated:',
    rel,
    '| packages:',
    Array.isArray(next.packages) ? next.packages.length : 0,
    '| policies:',
    Array.isArray(next.policies) ? next.policies.length : 0
  );
}

console.log('immigrant-job/pricing updated (en-GB, zh-TW).');
