import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

const FILES = [
  'content/services/career-return.en-GB.json',
  'content/services/career-return.zh-TW.json',
];

const EN = {
  process: {
    steps: [
      'Reset & boundaries — aims, constraints, what sits outside coaching.',
      'Rebuild signal — one visible proof point (mini-project, reference, refresher).',
      'Story & CV — bridge the gap without apologising; clear “why now”.',
      'Interview fit — return-to-work scenarios, timing, breaks, care duties.',
      'Apply & review — track, 20-min retro, adjust the next small step.',
    ],
  },
  readiness: {
    checklist: [
      '50–60 minutes available online, UK hours workable.',
      'A gap to bridge (parenting, health, study, care) and a target domain.',
      'Okay with coaching scope (not therapy/legal).',
      'Willing to try one micro-experiment between sessions.',
      'Recent CV or LinkedIn link ready to share.',
      'Able to use Google Docs/Sheets and Zoom/Meet.',
      'Consent to minimal notes and data handling.',
    ],
    what_to_prepare: [
      'Your LinkedIn URL or a recent CV (PDF).',
      'Two short examples from before/after the gap.',
      'Constraints list (hours, location, care duties).',
      'Rough weekly rhythm you can keep.',
      'Top 3 questions for the first two sessions.',
    ],
    signals: [
      'You want calm, honest, UK-relevant guidance.',
      'You prefer small steps that produce visible proof.',
      'You can commit to a weekly cadence with short reviews.',
      'You are comfortable with “coaching, not therapy”.',
    ],
  },
  faq: {
    items: [
      { q: 'Can you explain my employment gap for me?', a: 'We co-craft your story, but you own the words. We focus on what changed and what you can evidence now.' },
      { q: 'Will you guarantee a return-to-work role?', a: 'No. Coaching is not placement. We help you create proof points and clearer stories; you apply and track results.' },
      { q: 'Do you write my CV/LinkedIn?', a: 'We coach structure and clarity to UK norms, and suggest edits together in Google Docs. You remain the author.' },
      { q: 'How much time between sessions?', a: 'Usually 30–60 minutes weekly for one micro-experiment or edit pass. Keep it small and visible.' },
      { q: 'Is it confidential?', a: 'Yes. Confidential by default; minimal notes; deletion on request. See the boundaries page for details.' },
      { q: 'What about childcare/limited hours?', a: 'We plan rhythm around constraints and target roles that match your workable hours.' },
      { q: 'Can you speak to my manager or HR?', a: 'No. We help you plan the conversation; you speak for yourself when ready.' },
      { q: 'Reschedule/Refunds?', a: '24-hour notice required to reschedule; late changes count as used. Delivered sessions are non-refundable.' },
    ],
  },
  agreement: {
    sections: [
      {
        title: 'Scope & Fit',
        paragraphs: [
          'This is coaching, not therapy, counselling, HR, or legal advice.',
          'We work on UK-relevant proof points, story clarity, preparation, and cadence.',
          'If therapy/legal support is safer, we will signpost appropriate services.',
        ],
      },
      {
        title: 'Confidentiality',
        paragraphs: [
          'Sessions are confidential by default.',
          'Only minimal notes are kept; you may request deletion at any time.',
          'Quality supervision may use anonymised patterns without identifying details.',
        ],
      },
      {
        title: 'Scheduling & Rescheduling',
        paragraphs: [
          '≈50-minute sessions online within UK hours.',
          '24 hours’ notice to reschedule; late changes count as used.',
          'Blocks may pause between sessions by mutual agreement.',
        ],
      },
      {
        title: 'Fees & Invoicing',
        paragraphs: [
          'Fees in GBP, invoiced per block or as agreed.',
          'Delivered sessions are non-refundable; unused sessions in a block may pause.',
          'Bank/platform charges are borne by the client unless otherwise agreed.',
        ],
      },
      {
        title: 'Data & Records',
        paragraphs: [
          'We keep the minimum data needed to run sessions and invoices.',
          'You can request copy or deletion of personal data subject to legal limits.',
          'We use common tools (Google Docs/Sheets, email, video) with reasonable care.',
        ],
      },
      {
        title: 'Fair Use & Boundaries',
        paragraphs: [
          'Light check-ins are fine; heavy review or done-for-you work is out of scope.',
          'We do not contact employers or HR on your behalf.',
          'If there is risk of harm, confidentiality may be lifted to keep people safe.',
        ],
      },
      {
        title: 'Disputes',
        paragraphs: [
          'Aim to resolve early via email and a short call.',
          'If unresolved, we propose a simple written plan and pause if needed.',
          'UK law and forums apply unless mandatory local law requires otherwise.',
        ],
      },
    ],
  },
};

const TW = {
  process: {
    steps: [
      '重整與界線：目標、限制，哪些主題較適合留在教練之外。',
      '重建訊號：一個可被看見的證據點（迷你專案／推薦人／復習練習）。',
      '故事與履歷：不道歉地橋接空窗，說清楚「為什麼現在」。',
      '面試適配：重返職場情境、節奏、照護安排與溝通。',
      '投遞與回顧：追蹤、20 分鐘復盤，調整下一小步。',
    ],
  },
  readiness: {
    checklist: [
      '可安排 50–60 分鐘線上會談，能配合英國時段。',
      '有需要橋接的空窗（育兒、健康、進修、照護）與目標領域。',
      '理解教練服務範圍（非治療／法律）。',
      '願意在會談間完成 1 個小實驗。',
      '準備好最新 CV 或 LinkedIn 連結。',
      '可使用 Google Docs/Sheets 與 Zoom/Meet。',
      '同意最少必要紀錄與資料處理。',
    ],
    what_to_prepare: [
      '你的 LinkedIn 連結或最近期的 CV（PDF）。',
      '兩個來自空窗前／後的短實例。',
      '限制清單（時數、地點、照護）。',
      '你可行的每週節奏（粗略即可）。',
      '前兩次會談最想釐清的三個問題。',
    ],
    signals: [
      '偏好冷靜、誠實、符合英國在地的引導。',
      '喜歡小步走、能產出可見證據的方式。',
      '能維持每週節奏並做短回顧。',
      '能接受「教練而非治療」的範圍界線。',
    ],
  },
  faq: {
    items: [
      { q: '你可以幫我解釋空窗期嗎？', a: '我們一起打磨敘事，但內容屬於你。重點是改變了什麼、現在能拿出哪些證據。' },
      { q: '你們保證我能重返職場嗎？', a: '不保證。教練不是仲介。我們協助你建立證據點與清楚敘事；由你投遞並追蹤成果。' },
      { q: '你會代寫我的 CV/LinkedIn 嗎？', a: '不代寫。我們協助結構與清楚度，對齊英國常見格式，並在 Google Docs 共同修訂。' },
      { q: '兩次會談間需要投入多少時間？', a: '通常每週 30–60 分鐘，完成 1 個小實驗或一輪修訂；保持「小而可見」。' },
      { q: '談話是保密的嗎？', a: '預設保密；最少必要紀錄；可要求刪除。詳見邊界與政策頁。' },
      { q: '若我有照護與時段限制怎麼辦？', a: '我們會以限制為基準設計節奏，並挑選相符的職位或型態。' },
      { q: '可以代為與雇主或 HR 溝通嗎？', a: '不代替你聯絡。我們協助你準備對話並在你準備好時親自表達。' },
      { q: '改期與退費如何處理？', a: '改期需提前 24 小時；逾時視同使用一次會談。已完成會談不退費。' },
    ],
  },
  agreement: {
    sections: [
      {
        title: '服務範圍與適配',
        paragraphs: [
          '本服務為教練，不是治療、諮商、HR 或法律建議。',
          '專注英國在地證據點、敘事清晰、準備與節奏。',
          '若治療／法律更合適，將提供指引資訊。',
        ],
      },
      {
        title: '保密',
        paragraphs: [
          '會談預設保密。',
          '僅保留最少必要紀錄；你可隨時要求刪除。',
          '品質督導可能討論匿名化模式，不含可識別資訊。',
        ],
      },
      {
        title: '時程與改期',
        paragraphs: [
          '單次約 50 分鐘，線上、以英國時段為主。',
          '改期需提前 24 小時；逾時視同使用一次會談。',
          '套組可在會談間暫停，需雙方同意。',
        ],
      },
      {
        title: '費用與發票',
        paragraphs: [
          '以英鎊 (GBP) 計價，依套組或約定開立發票。',
          '已完成會談不退費；未使用會談可暫停保留。',
          '匯款／平台手續費除另有約定，原則由客戶負擔。',
        ],
      },
      {
        title: '個資與紀錄',
        paragraphs: [
          '僅保存執行會談與開立發票所需的最少資料。',
          '你可在法律許可範圍內申請調閱或刪除個資。',
          '常用工具（Google Docs/Sheets、Email、視訊）將以合理注意使用。',
        ],
      },
      {
        title: '合理使用與界線',
        paragraphs: [
          '會談間可輕量回報；大量審稿或代做內容不在範圍內。',
          '不代為聯絡雇主或 HR。',
          '若出現危害風險，為保護安全，保密可能被解除。',
        ],
      },
      {
        title: '爭議處理',
        paragraphs: [
          '優先以 Email 與短通話及早處理。',
          '若未解決，將提出簡要書面方案；必要時暫停服務。',
          '除法律強制規定外，原則適用英國法與司法管轄。',
        ],
      },
    ],
  },
};

function patchFile(rel, patch) {
  const full = path.join(ROOT, rel);
  const raw = fs.readFileSync(full, 'utf8');
  const json = JSON.parse(raw);
  json.process = { ...(json.process || {}), ...(patch.process || {}) };
  json.readiness = { ...(json.readiness || {}), ...(patch.readiness || {}) };
  json.faq = { ...(json.faq || {}), ...(patch.faq || {}) };
  json.agreement = { ...(json.agreement || {}), ...(patch.agreement || {}) };
  fs.writeFileSync(full, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated: ${rel} | steps=${json.process?.steps?.length ?? 0} | checklist=${json.readiness?.checklist?.length ?? 0} | faq=${json.faq?.items?.length ?? 0} | sections=${json.agreement?.sections?.length ?? 0}`);
}

for (const rel of FILES) {
  if (rel.endsWith('en-GB.json')) patchFile(rel, EN);
  if (rel.endsWith('zh-TW.json')) patchFile(rel, TW);
}
console.log('career-return: process/readiness/faq/agreement updated (en-GB, zh-TW).');
