import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const targets = [
  'content/home/en-GB.json',
  'content/home/zh-TW.json',
];

const payloads = {
  'content/home/en-GB.json': {
    services: {
      cards: [
        {
          slug: 'career-return',
          title: 'Returning to work',
          teaser: 'A steady ramp back in 12 weeks—light structure, kind accountability.',
          cta_label: 'See this pathway',
        },
        {
          slug: 'graduate-start',
          title: 'Graduate start',
          teaser: 'Turn scattered efforts into a clear story and small, testable steps.',
          cta_label: 'See this pathway',
        },
        {
          slug: 'immigrant-job',
          title: 'New to the UK job market',
          teaser: 'Translate overseas experience into local proof points you can show.',
          cta_label: 'See this pathway',
        },
      ],
    },
    key_points: {
      items: [
        'Calm, practical sessions; no hype, no guarantees.',
        'Try free tools first—keep what helps.',
        'Weekly rhythm with small experiments between sessions.',
        'Clear boundaries and confidentiality.',
        'Simple pricing; pause anytime between blocks.',
      ],
    },
    process: {
      steps: [
        'Explore — what matters and why now',
        'Try — a 20-min conversation',
        'Align — goals, boundaries, cadence',
        'Work — weekly sessions + short reviews',
      ],
    },
    boundaries: {
      items: [
        'Coaching, not therapy—signposting if therapy is safer.',
        'Time boundaries: start on time, end on time.',
        'Minimal notes—deletion on request.',
        'Your pace, our structure.',
      ],
    },
    cta: {
      primary_label: 'Try free tools',
      primary_href: '/#tools',
      secondary_label: 'Book a 20-min conversation',
      secondary_href: '/contact',
    },
  },
  'content/home/zh-TW.json': {
    services: {
      cards: [
        {
          slug: 'career-return',
          title: '重返職場',
          teaser: '12 週溫和回到節奏—輕量結構，友善督導。',
          cta_label: '查看方案',
        },
        {
          slug: 'graduate-start',
          title: '畢業起步',
          teaser: '把分散努力轉成清楚敘事與可測的小步驟。',
          cta_label: '查看方案',
        },
        {
          slug: 'immigrant-job',
          title: '英國職場新起點',
          teaser: '把海外經驗轉成在地可信的證據點。',
          cta_label: '查看方案',
        },
      ],
    },
    key_points: {
      items: [
        '冷靜、實作導向；不誇大、不保證結果。',
        '先用免費工具—留下對你有用的。',
        '每週節奏；兩次會談間做小實驗。',
        '清楚邊界與保密。',
        '簡單定價；套組之間可暫停。',
      ],
    },
    process: {
      steps: [
        '探索：重要的是什麼、為何是現在',
        '試談：20 分鐘',
        '對齊：目標、邊界、頻率',
        '實作：每週對話＋短回顧',
      ],
    },
    boundaries: {
      items: [
        '教練而非治療—若需要會建議轉介。',
        '時間邊界：準時開始、準時結束。',
        '最少必要紀錄—可要求刪除。',
        '你的節奏，我們守住結構。',
      ],
    },
    cta: {
      primary_label: '先試用免費工具',
      primary_href: '/#tools',
      secondary_label: '預約 20 分鐘對談',
      secondary_href: '/contact',
    },
  },
};

function writeJSON(filePath, data) {
  const full = path.join(ROOT, filePath);
  const raw = fs.readFileSync(full, 'utf8');
  const json = JSON.parse(raw);

  const patch = payloads[filePath];
  ['services', 'key_points', 'process', 'boundaries', 'cta'].forEach((k) => {
    if (patch[k]) json[k] = patch[k];
  });

  fs.writeFileSync(full, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
  console.log(`Updated: ${filePath}`);
}

for (const rel of targets) {
  writeJSON(rel, payloads[rel]);
}
console.log('Home content updated (en-GB, zh-TW).');
