import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

const files = [
  'content/services/index.en-GB.json',
  'content/services/index.zh-TW.json',
];

const payload = {
  'content/services/index.en-GB.json': {
    hero: {
      title: 'Find your path by real cases, not slogans.',
      subtitle: 'Three steady pathways. Start from examples; add structure when ready.',
    },
    pathways_intro: 'Choose a pathway that matches your situation.',
    pathways: [
      {
        slug: 'career-return',
        title: 'Returning to work',
        teaser: '12-week ramp back: kinder structure, small experiments, honest boundaries.',
        cta_label: 'See plan',
      },
      {
        slug: 'graduate-start',
        title: 'Graduate start',
        teaser: 'Shape a clear story and turn it into testable, visible actions.',
        cta_label: 'See plan',
      },
      {
        slug: 'immigrant-job',
        title: 'New to the UK job market',
        teaser: 'Translate overseas work into local proof points you can show.',
        cta_label: 'See plan',
      },
    ],
    cta: {
      primary_label: 'Try free tools',
      primary_href: '/#tools',
      secondary_label: 'Book a 20-min conversation',
      secondary_href: '/contact',
    },
  },
  'content/services/index.zh-TW.json': {
    hero: {
      title: '先看案例，再談方法與結構。',
      subtitle: '三條穩定路徑。從你的情境出發，準備好再加上節奏與框架。',
    },
    pathways_intro: '依照你的處境選擇路徑：',
    pathways: [
      {
        slug: 'career-return',
        title: '重返職場',
        teaser: '12 週回到節奏：友善結構、小實驗、清楚邊界。',
        cta_label: '查看方案',
      },
      {
        slug: 'graduate-start',
        title: '畢業起步',
        teaser: '把清楚故事變成可被看見、可被驗證的行動。',
        cta_label: '查看方案',
      },
      {
        slug: 'immigrant-job',
        title: '英國職場新起點',
        teaser: '將海外經驗轉成在地可信的證據點。',
        cta_label: '查看方案',
      },
    ],
    cta: {
      primary_label: '先試用免費工具',
      primary_href: '/#tools',
      secondary_label: '預約 20 分鐘對談',
      secondary_href: '/contact',
    },
  },
};

function loadJSON(p) {
  const full = path.join(ROOT, p);
  const raw = fs.readFileSync(full, 'utf8');
  return { full, data: JSON.parse(raw) };
}

for (const f of files) {
  const { full, data } = loadJSON(f);
  const patch = payload[f];
  if (!patch) continue;

  // 盡量不動 schema：只寫入已有或常見鍵；缺少時才新增
  data.hero = { ...(data.hero || {}), ...(patch.hero || {}) };
  if (patch.pathways_intro) data.pathways_intro = patch.pathways_intro;

  // 兼容不同資料結構：
  if (Array.isArray(data.pathways)) {
    data.pathways = patch.pathways;
  } else if (data.pathways && Array.isArray(data.pathways.cards)) {
    data.pathways.cards = patch.pathways;
  } else {
    data.pathways = patch.pathways;
  }

  data.cta = { ...(data.cta || {}), ...(patch.cta || {}) };

  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated:', f);
}
console.log('Services index content updated.');
