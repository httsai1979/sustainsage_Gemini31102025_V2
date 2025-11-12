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
      eyebrow: 'Services',
      title: 'Start with the pathway that matches your moment',
      description:
        'See example scenarios first so you can confirm fit before diving into process, pricing, or agreements.',
      cards: [
        {
          title: 'Returning to work',
          description: 'A steady ramp back in 12 weeks—light structure, kind accountability.',
          href: '/services/career-return',
          linkLabel: 'See this pathway',
        },
        {
          title: 'Graduate start',
          description: 'Turn scattered efforts into a clear story and small, testable steps.',
          href: '/services/graduate-start',
          linkLabel: 'See this pathway',
        },
        {
          title: 'New to the UK job market',
          description: 'Translate overseas experience into local proof points you can show.',
          href: '/services/immigrant-job',
          linkLabel: 'See this pathway',
        },
      ],
    },
    key_points: {
      title: 'What you will notice in early sessions',
      description: 'Example-led conversations keep decisions grounded before we layer on more structure.',
      items: [
        { title: 'Calm, practical sessions—no hype, no guarantees.' },
        { title: 'Try free tools first and keep what genuinely helps.' },
        { title: 'Weekly rhythm with small experiments between sessions.' },
        { title: 'Clear boundaries and confidentiality, explained up front.' },
        { title: 'Simple pricing with space to pause between blocks.' },
      ],
    },
    process: {
      title: 'How we will work once it feels like a fit',
      description: 'We stay example-first while moving into agreements, cadence, and review points.',
      steps: [
        {
          title: 'Explore',
          description: 'What matters, why now, and what a good outcome looks like for you.',
        },
        {
          title: 'Try',
          description: 'A 20-minute conversation to sense chemistry, scope, and accessibility needs.',
        },
        {
          title: 'Align',
          description: 'Goals, boundaries, and cadence before any paid work begins.',
        },
        {
          title: 'Work',
          description: 'Weekly sessions plus short reviews and experiments between calls.',
        },
      ],
    },
    boundaries: {
      title: 'Boundaries we keep visible',
      description: 'These agreements protect pace, wellbeing, and confidentiality.',
      items: [
        {
          question: 'Is this coaching or therapy?',
          answer: 'Coaching, not therapy—we will signpost therapy when that is safer for you.',
        },
        {
          question: 'What are our time expectations?',
          answer: 'We start and end on time so you can plan around sessions with confidence.',
        },
        {
          question: 'How do you handle notes and data?',
          answer: 'We keep minimal notes and delete them on request within agreed retention windows.',
        },
        {
          question: 'Who sets the pace?',
          answer: 'You set the pace; we provide structure and accountability without pressure.',
        },
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
      eyebrow: '服務',
      title: '先看哪些方案符合你的情境',
      description: '先用情境與範例確認是否合適，再進一步了解流程、定價與協議。',
      cards: [
        {
          title: '重返職場',
          description: '12 週溫和回到節奏—輕量結構，友善督導。',
          href: '/services/career-return',
          linkLabel: '查看方案',
        },
        {
          title: '畢業起步',
          description: '把分散努力轉成清楚敘事與可測的小步驟。',
          href: '/services/graduate-start',
          linkLabel: '查看方案',
        },
        {
          title: '英國職場新起點',
          description: '把海外經驗轉成在地可信的證據點。',
          href: '/services/immigrant-job',
          linkLabel: '查看方案',
        },
      ],
    },
    key_points: {
      title: '前期會談可以期待什麼',
      description: '用情境先確認需求，再逐步建立節奏與結構。',
      items: [
        { title: '冷靜、實作導向；不誇大、不保證結果。' },
        { title: '先用免費工具，留下對你有用的。' },
        { title: '每週節奏；兩次會談間做小實驗。' },
        { title: '清楚邊界與保密，事前說明。' },
        { title: '簡單定價；套組之間可暫停。' },
      ],
    },
    process: {
      title: '確認合適後會怎麼合作',
      description: '維持情境優先，同時把節奏、協議與回顧頻率說清楚。',
      steps: [
        {
          title: '探索',
          description: '釐清現在重要的是什麼、為何是現在、期待的改變。',
        },
        {
          title: '試談',
          description: '20 分鐘對談，確認節奏、需求與可及性。',
        },
        {
          title: '對齊',
          description: '付費前先對齊目標、邊界與合作頻率。',
        },
        {
          title: '實作',
          description: '每週會談，兩次之間有短回顧與小實驗。',
        },
      ],
    },
    boundaries: {
      title: '我們會守住的邊界',
      description: '這些約定讓節奏、身心安全與保密都在掌握中。',
      items: [
        {
          question: '這是教練還是治療？',
          answer: '這裡是教練服務—若治療更安全，我們會協助轉介。',
        },
        {
          question: '時間上有什麼約定？',
          answer: '準時開始、準時結束，讓你能安排其他行程。',
        },
        {
          question: '會留下哪些紀錄？',
          answer: '只保留必要紀錄，如有需要可依約定刪除。',
        },
        {
          question: '合作節奏由誰決定？',
          answer: '節奏由你決定，我們守住結構與節拍。',
        },
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

function writeJSON(filePath) {
  const full = path.join(ROOT, filePath);
  const raw = fs.readFileSync(full, 'utf8');
  const json = JSON.parse(raw);

  const patch = payloads[filePath];
  if (!patch) {
    return;
  }

  ['services', 'key_points', 'process', 'boundaries', 'cta'].forEach((key) => {
    if (patch[key]) {
      json[key] = patch[key];
    }
  });

  fs.writeFileSync(full, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
  console.log(`Updated: ${filePath}`);
}

for (const rel of targets) {
  writeJSON(rel);
}
console.log('Home content updated (en-GB, zh-TW).');
