import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILES = [
  'content/services/immigrant-job.en-GB.json',
  'content/services/immigrant-job.zh-TW.json',
];

const EN_ITEMS = [
  {
    q: 'Do you guarantee a job or interview?',
    a: 'No. Coaching is not placement. We help you create UK-relevant proof points and clearer stories, then you apply and track results.',
  },
  {
    q: 'What language are sessions delivered in?',
    a: 'English. We can slow down, clarify, and write together. If needed, we can switch briefly to Chinese for tricky concepts.',
  },
  {
    q: 'Can you advise on visas or immigration law?',
    a: 'No legal advice. We work with your constraints and signpost official resources where appropriate.',
  },
  {
    q: 'Will you write my CV or LinkedIn for me?',
    a: 'You own the words. We coach the structure, clarity, and UK norms; we can suggest edits together on Google Docs.',
  },
  {
    q: 'Will you contact employers or recruiters on my behalf?',
    a: 'No. We help you build outreach scripts and confidence, but you contact people directly.',
  },
  {
    q: 'How much between-session work is expected?',
    a: 'Usually 30–60 minutes a week (one micro-experiment: info chat, trial task, volunteering taster). Keep it small and visible.',
  },
  {
    q: 'Is our conversation confidential?',
    a: 'Yes. Confidential by default; minimal notes; deletion on request. See boundaries page for details.',
  },
  {
    q: 'What is your reschedule/refund policy?',
    a: '24-hour notice for rescheduling; late changes count as used. No refunds for delivered sessions; blocks can pause between sessions.',
  },
];

const TW_ITEMS = [
  {
    q: '你們保證工作或面試嗎？',
    a: '不保證。教練服務不是仲介。我們協助你建立「在英國看得懂」的證據點與清楚敘事，接著由你投遞並追蹤結果。',
  },
  {
    q: '會談使用哪種語言？',
    a: '英文。需要時可放慢、釐清、共同寫作；對較難表達的概念可短暫切換中文輔助。',
  },
  {
    q: '你們提供簽證或移民法規的建議嗎？',
    a: '不提供法律意見。我們在你的限制條件下工作，必要時提供官方資訊的方向。',
  },
  {
    q: '你們會幫我寫 CV 或 LinkedIn 嗎？',
    a: '內容仍由你擁有。我們協助結構、清楚度與英國常見格式，可在 Google Docs 共同編修。',
  },
  {
    q: '你們會代我聯絡雇主或獵頭嗎？',
    a: '不會。我們協助你準備聯絡腳本並提升信心，但由你親自發送。',
  },
  {
    q: '兩次會談之間需要花多少時間？',
    a: '通常每週 30–60 分鐘（1 個小實驗：資訊性聊天、試做任務、志工嘗試）。保持小步、可見。',
  },
  {
    q: '談話是保密的嗎？',
    a: '預設保密；最少必要紀錄；可要求刪除。詳見邊界與政策頁。',
  },
  {
    q: '改期與退費怎麼處理？',
    a: '改期需提前 24 小時；逾時視同使用一次會談。已完成會談不退費；套組可在會談間暫停。',
  },
];

function loadJSON(rel) {
  const full = path.join(ROOT, rel);
  const raw = fs.readFileSync(full, 'utf8');
  return { full, data: JSON.parse(raw) };
}

function overwriteFaqItems(data, items) {
  data.faq = data.faq || {};
  const existingArray = Array.isArray(data.faq.items) ? data.faq.items : [];
  let shape = 'qa';
  if (existingArray.length > 0 && typeof existingArray[0] === 'object') {
    const keys = Object.keys(existingArray[0]);
    if (keys.includes('question') && keys.includes('answer')) {
      shape = 'questionAnswer';
    } else if (keys.includes('q') && keys.includes('a')) {
      shape = 'qa';
    }
  }

  const normalized = items.map((it) =>
    shape === 'questionAnswer'
      ? { question: it.q, answer: it.a }
      : { q: it.q, a: it.a }
  );

  data.faq.items = normalized;
}

for (const rel of FILES) {
  const { data } = loadJSON(rel);
  if (rel.endsWith('en-GB.json')) {
    overwriteFaqItems(data, EN_ITEMS);
  } else {
    overwriteFaqItems(data, TW_ITEMS);
  }
  fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated FAQ:', rel, '| items:', data.faq?.items?.length ?? 0);
}

console.log('immigrant-job/faq updated (en-GB, zh-TW).');
