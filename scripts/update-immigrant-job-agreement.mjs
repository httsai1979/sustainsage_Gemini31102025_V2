import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

const files = [
  'content/services/immigrant-job.en-GB.json',
  'content/services/immigrant-job.zh-TW.json',
];

const EN_SECTIONS = [
  {
    title: 'Scope & Fit',
    paragraphs: [
      'This is coaching, not therapy, counselling, immigration or legal advice.',
      'We work on UK-relevant proof points, clear stories, preparation and cadence.',
      'If therapy or legal advice is safer, we will signpost appropriate services.',
    ],
  },
  {
    title: 'Confidentiality',
    paragraphs: [
      'Sessions are confidential by default.',
      'Only minimal notes are kept; you may request deletion at any time.',
      'We may discuss anonymised patterns in supervision for quality, without identifying details.',
    ],
  },
  {
    title: 'Scheduling & Rescheduling',
    paragraphs: [
      'Standard session length is ~50 minutes, online, within UK hours.',
      '24 hours’ notice is required to reschedule; late changes count as used.',
      'Blocks may pause between sessions by mutual agreement to protect cadence and rest.',
    ],
  },
  {
    title: 'Fees & Invoicing',
    paragraphs: [
      'Fees are in GBP. Invoices are issued for each block or as agreed.',
      'Delivered sessions are non-refundable. Unused sessions in a block can be paused.',
      'Any bank or platform charges are borne by the client unless otherwise agreed.',
    ],
  },
  {
    title: 'Data & Records',
    paragraphs: [
      'We keep the minimum necessary data to run sessions and invoices.',
      'You can request a copy or deletion of personal data subject to legal limits.',
      'We use common tools (e.g., Google Docs/Sheets, email, video platforms) with reasonable care.',
    ],
  },
  {
    title: 'Fair Use & Boundaries',
    paragraphs: [
      'Between sessions, light check-ins are fine; heavy review or done-for-you work is out of scope.',
      'We do not contact employers on your behalf, nor provide visa/legal advice.',
      'If there is risk of harm, confidentiality may be lifted to keep people safe.',
    ],
  },
  {
    title: 'Disputes',
    paragraphs: [
      'We aim to resolve issues early via email and a short call.',
      'If unresolved, we will propose a simple written plan and a pause if needed.',
      'UK law and forums apply unless otherwise required by mandatory local law.',
    ],
  },
];

const TW_SECTIONS = [
  {
    title: '服務範圍與適配',
    paragraphs: [
      '本服務為教練，不是心理治療、諮商、移民或法律建議。',
      '我們專注於英國在地可被看見的證據點、清楚敘事、準備與節奏。',
      '若治療或法律諮詢更合適，將協助指引至合適資源。',
    ],
  },
  {
    title: '保密',
    paragraphs: [
      '會談預設保密。',
      '僅保留最少必要紀錄；你可隨時要求刪除。',
      '為品質目的可能於督導中討論匿名化的模式，不含可識別資訊。',
    ],
  },
  {
    title: '時程與改期',
    paragraphs: [
      '單次約 50 分鐘，線上進行，以英國時段為主。',
      '改期需提前 24 小時；逾時視同使用一次會談。',
      '為保護節奏與休息，雙方同意下可在會談間暫停套組。',
    ],
  },
  {
    title: '費用與發票',
    paragraphs: [
      '費用以英鎊 (GBP) 計價；依套組或雙方約定開立發票。',
      '已完成之會談不退費；未使用之會談可暫停保留。',
      '如有匯款或平台手續費，除另有約定，原則上由客戶負擔。',
    ],
  },
  {
    title: '個資與紀錄',
    paragraphs: [
      '僅保存執行會談與開立發票所需的最少資料。',
      '你可依法律限制範圍，申請調閱或刪除個人資料。',
      '常用工具（如 Google Docs/Sheets、Email、視訊平台）將以合理注意使用。',
    ],
  },
  {
    title: '合理使用與界線',
    paragraphs: [
      '會談之間可輕量回報；大量審稿或代做內容不在服務範圍內。',
      '不代為聯絡雇主，也不提供簽證／法律建議。',
      '若出現危害風險，為保護安全，保密義務可能被解除。',
    ],
  },
  {
    title: '爭議處理',
    paragraphs: [
      '若有爭議，優先透過 Email 與短通話及早處理。',
      '仍無法解決者，將提出簡要書面方案，必要時暫停服務。',
      '除法律另有強制規定外，原則適用英國法與司法管轄。',
    ],
  },
];

function writeSections(filePath, sections) {
  const full = path.join(ROOT, filePath);
  const raw = fs.readFileSync(full, 'utf8');
  const json = JSON.parse(raw);
  json.agreement = json.agreement || {};
  json.agreement.sections = sections;
  fs.writeFileSync(full, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated: ${filePath} | sections=${json.agreement.sections?.length ?? 0}`);
}

writeSections(files[0], EN_SECTIONS);
writeSections(files[1], TW_SECTIONS);
console.log('immigrant-job/agreement updated (en-GB, zh-TW).');
