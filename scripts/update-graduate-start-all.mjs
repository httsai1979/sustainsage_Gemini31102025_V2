import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();
const FILES = [
  'content/services/graduate-start.en-GB.json',
  'content/services/graduate-start.zh-TW.json',
];

const EN = {
  process: {
    steps: [
      'Map strengths → small proof: skills, projects, outcomes.',
      'UK CV/LinkedIn alignment: clear bullets, concrete verbs, results.',
      'Portfolio or samples: one page, one story, one link.',
      'Outreach scripts + light interview rehearsal.',
      'Track → review → adjust: keep steps small and visible.',
    ],
  },
  readiness: {
    checklist: [
      '50–60 minutes available online; UK hours workable.',
      'A target role or field (even if rough).',
      'Okay with coaching scope (not placement/therapy/legal).',
      'Willing to run one micro-experiment between sessions.',
      'Latest CV/LinkedIn link ready to share.',
    ],
    what_to_prepare: [
      'Your LinkedIn URL or recent CV (PDF).',
      'Two class/work projects you can explain in 60–90 seconds.',
      'Short list of target roles/companies or constraints.',
      'Top 3 questions you want answered in the first two sessions.',
    ],
    signals: [
      'You value clear, UK-relevant guidance over hype.',
      'You prefer tiny steps that build confidence and proof.',
      'You can keep a weekly cadence with short reviews.',
    ],
  },
  faq: {
    items: [
      { q: 'Do you place graduates into jobs?', a: 'No. Coaching is not placement. We help you produce UK-relevant proof and clear stories; you apply and track.' },
      { q: 'Will you write my CV/LinkedIn?', a: 'You remain the author. We coach structure, clarity, and UK norms; we co-edit in Google Docs.' },
      { q: 'What if I have no “real experience”?', a: 'We turn coursework, volunteering, and small projects into evidence with outcomes and links.' },
      { q: 'How much work between sessions?', a: 'Usually 30–60 minutes weekly (one micro-experiment or edit pass). Keep it small and visible.' },
      { q: 'Is it confidential?', a: 'Yes. Confidential by default; minimal notes; deletion on request. See boundaries.' },
      { q: 'Do you contact employers for me?', a: 'No. We help with outreach scripts and confidence; you contact directly.' },
      { q: 'Rescheduling/refunds?', a: '24-hour notice to reschedule; late changes count as used. Delivered sessions are non-refundable.' },
    ],
  },
  agreement: {
    sections: [
      { title: 'Scope & Fit', paragraphs: [
        'This is coaching, not placement, therapy, or legal advice.',
        'We focus on proof points, story clarity, preparation, and cadence.',
      ]},
      { title: 'Confidentiality', paragraphs: [
        'Confidential by default; minimal notes; deletion on request.',
        'Quality supervision may use anonymised patterns without identifiers.',
      ]},
      { title: 'Scheduling & Rescheduling', paragraphs: [
        '≈50-minute sessions online within UK hours.',
        '24 hours’ notice to reschedule; late changes count as used.',
      ]},
      { title: 'Fees & Invoicing', paragraphs: [
        'Fees in GBP; invoiced per block or as agreed.',
        'Delivered sessions are non-refundable.',
      ]},
      { title: 'Data & Records', paragraphs: [
        'Minimum data kept for sessions and invoices.',
        'Copy/deletion requests respected within legal limits.',
      ]},
      { title: 'Fair Use & Boundaries', paragraphs: [
        'Light check-ins are fine; heavy review/done-for-you is out of scope.',
        'We do not contact employers on your behalf.',
      ]},
    ],
  },
};

const TW = {
  process: {
    steps: [
      '盤點強項 → 小證據：技能、專案、可見成果。',
      '對齊英國 CV/LinkedIn：清楚條列、動詞精準、結果可見。',
      '作品集或樣本：一頁一故事一連結。',
      '主動聯繫腳本＋輕量面試演練。',
      '追蹤 → 回顧 → 調整：保持小步且可見。',
    ],
  },
  readiness: {
    checklist: [
      '可安排 50–60 分鐘線上會談，能配合英國時段。',
      '有大致方向（角色或產業）。',
      '理解教練服務範圍（非就業媒合／治療／法律）。',
      '願意在會談間完成一個小實驗。',
      '準備好最新 CV 或 LinkedIn 連結。',
    ],
    what_to_prepare: [
      '你的 LinkedIn 連結或最近期的 CV（PDF）。',
      '兩個課堂／工作專案，能在 60–90 秒說清楚。',
      '目標職缺／公司清單或限制條件。',
      '前兩次會談想釐清的三個問題。',
    ],
    signals: [
      '偏好英國在地、務實而不誇大的指引。',
      '喜歡小步走、用可見證據累積信心。',
      '能維持每週節奏並做短回顧。',
    ],
  },
  faq: {
    items: [
      { q: '你們會直接幫我找到工作嗎？', a: '不會。教練不是媒合。我們協助你產出英國看得懂的證據與清楚敘事；由你投遞並追蹤。' },
      { q: '你會代寫我的 CV/LinkedIn 嗎？', a: '不代寫；你仍是作者。我們協助結構與清楚度，並在 Google Docs 共同修訂。' },
      { q: '我幾乎沒有實務經驗怎麼辦？', a: '把課程、志工、小專案轉成證據：說清楚貢獻與結果，最好能附連結。' },
      { q: '兩次會談間要投入多少時間？', a: '通常每週 30–60 分鐘，完成 1 個小實驗或一輪修訂；保持小而可見。' },
      { q: '談話會保密嗎？', a: '預設保密；最少必要紀錄；可要求刪除。詳見邊界頁。' },
      { q: '你會代我聯絡雇主嗎？', a: '不會。我們協助你準備聯繫腳本與信心；由你親自發送。' },
      { q: '改期與退費怎麼處理？', a: '改期需提前 24 小時；逾時視同使用一次會談。已完成會談不退費。' },
    ],
  },
  agreement: {
    sections: [
      { title: '服務範圍與適配', paragraphs: [
        '本服務為教練，不是就業媒合、治療或法律建議。',
        '聚焦證據點、敘事清晰、準備與節奏。',
      ]},
      { title: '保密', paragraphs: [
        '預設保密；最少必要紀錄；可要求刪除。',
        '品質督導可能討論匿名化模式，不含可識別資訊。',
      ]},
      { title: '時程與改期', paragraphs: [
        '單次約 50 分鐘，線上、以英國時段為主。',
        '改期需提前 24 小時；逾時視同使用一次會談。',
      ]},
      { title: '費用與發票', paragraphs: [
        '以英鎊 (GBP) 計價；依套組或約定開立發票。',
        '已完成會談不退費。',
      ]},
      { title: '個資與紀錄', paragraphs: [
        '僅保存執行會談與開立發票所需的最少資料。',
        '你可在法律許可範圍內申請調閱或刪除個資。',
      ]},
      { title: '合理使用與界線', paragraphs: [
        '會談間可輕量回報；大量審稿／代做不在範圍內。',
        '不代為聯絡雇主。',
      ]},
    ],
  },
};

function patch(rel, data) {
  const full = path.join(ROOT, rel);
  const raw = fs.readFileSync(full, 'utf8');
  const json = JSON.parse(raw);
  json.process = { ...(json.process || {}), ...(data.process || {}) };
  json.readiness = { ...(json.readiness || {}), ...(data.readiness || {}) };
  json.faq = { ...(json.faq || {}), ...(data.faq || {}) };
  json.agreement = { ...(json.agreement || {}), ...(data.agreement || {}) };
  fs.writeFileSync(full, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated: ${rel} | steps=${json.process?.steps?.length ?? 0} | checklist=${json.readiness?.checklist?.length ?? 0} | faq=${json.faq?.items?.length ?? 0} | sections=${json.agreement?.sections?.length ?? 0}`);
}

for (const rel of FILES) {
  if (rel.endsWith('en-GB.json')) patch(rel, EN);
  if (rel.endsWith('zh-TW.json')) patch(rel, TW);
}
console.log('graduate-start: process/readiness/faq/agreement updated (en-GB, zh-TW).');
