import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

// ---- Contact translations
const CONTACT_LOCALES = ['en-GB', 'zh-TW', 'zh-CN'];
function contactPath(loc) { return path.join(ROOT, `public/locales/${loc}/contact.json`); }

const CONTACT_EN = {
  miniFaq: {
    items: [
      { q: 'Is this confidential?', a: 'Yes. Confidential by default; minimal notes; deletion on request.' },
      { q: 'What is expected between sessions?', a: 'One small experiment or short reflection (≈30–60 min/week).' },
      { q: 'Can I reschedule?', a: 'Yes with 24-hour notice; late changes count as used.' },
    ],
  },
  consent: {
    title: 'Consent & data',
    text: 'By submitting you agree to be contacted about your enquiry. We keep minimal records and respect deletion requests.',
  },
};
const CONTACT_TW = {
  miniFaq: {
    items: [
      { q: '談話會保密嗎？', a: '會。預設保密；最少必要紀錄；可要求刪除。' },
      { q: '會談之間需要做什麼？', a: '每週 1 個小實驗或短反思（約 30–60 分鐘）。' },
      { q: '可以改期嗎？', a: '可，需提前 24 小時；逾時視同使用一次會談。' },
    ],
  },
  consent: {
    title: '同意與資料',
    text: '送出代表同意我們就此詢問聯絡你。我們只保留最少必要紀錄，並尊重刪除要求。',
  },
};
const CONTACT_SC = {
  miniFaq: {
    items: [
      { q: '谈话会保密吗？', a: '会。默认保密；仅保留最少必要记录；可申请删除。' },
      { q: '两次会谈之间需要做什么？', a: '每周 1 个小实验或短反思（约 30–60 分钟）。' },
      { q: '可以改期吗？', a: '可以，需提前 24 小时；逾时视同使用一次会谈。' },
    ],
  },
  consent: {
    title: '同意与资料',
    text: '提交代表同意我们就此咨询联系你。我们仅保留最少必要记录，并尊重删除请求。',
  },
};

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function patchJSON(file, patcher) {
  const raw = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(raw);
  patcher(json);
  writeJSON(file, json);
}

for (const loc of CONTACT_LOCALES) {
  const p = contactPath(loc);
  if (!fs.existsSync(p)) continue; // 安全：若該語系尚未建立則跳過
  const payload = loc === 'en-GB' ? CONTACT_EN : (loc === 'zh-TW' ? CONTACT_TW : CONTACT_SC);
  patchJSON(p, (j) => {
    j.miniFaq = payload.miniFaq;
    j.consent = { ...(j.consent || {}), ...payload.consent };
  });
  console.log('Updated contact locale:', loc);
}

// ---- Legal: coaching-boundaries (TW/SC)
function legalPath(loc) { return path.join(ROOT, `content/legal/coaching-boundaries/${loc}.json`); }
const LEGAL_TW = {
  title: '教練邊界與資料',
  description: '本頁說明教練與治療/法律/HR 的界線、保密、資料處理與合理使用範圍。',
  sections: [
    { title: '服務範圍', paragraphs: ['本服務為教練，不是治療、法律或 HR 建議。', '如更合適，會提供轉介方向。']},
    { title: '保密', paragraphs: ['預設保密；最少必要紀錄；可要求刪除。', '品質督導可能討論匿名化模式，不含可識別資訊。']},
    { title: '資料與紀錄', paragraphs: ['僅保存執行會談與發票所需最少資料。', '可依法律限制申請調閱或刪除個資。']},
    { title: '合理使用', paragraphs: ['會談間可輕量回報；大量審稿或代做不在範圍內。', '不代為聯絡雇主或提供法律/簽證意見。']},
    { title: '改期與爭議', paragraphs: ['改期需提前 24 小時；逾時視同使用一次會談。', '爭議優先以 Email 與短通話處理，必要時暫停；原則適用英國法。']},
  ],
  scope: {
    whatYouGet: { items: ['結構與清楚度教練', '英國在地證據點建議', '輕量回饋與小實驗設計']},
    whatWeDontDo: { items: ['治療/諮商', '法律/簽證建議', '代寫或代投']},
  },
  lastUpdated: new Date().toISOString().slice(0,10),
};
const LEGAL_SC = {
  title: '教练边界与资料',
  description: '说明教练与治疗/法律/HR 的界线、保密、资料处理与合理使用范围。',
  sections: [
    { title: '服务范围', paragraphs: ['本服务为教练，不是治疗、法律或 HR 建议。', '如更合适，会提供转介方向。']},
    { title: '保密', paragraphs: ['默认保密；最少必要记录；可申请删除。', '质量督导可能讨论匿名化模式，不含可识别信息。']},
    { title: '资料与记录', paragraphs: ['仅保存执行会谈与发票所需最少资料。', '可依法律限制申请调阅或删除资料。']},
    { title: '合理使用', paragraphs: ['会谈间可轻量回报；大量审稿或代做不在范围内。', '不代为联系雇主或提供法律/签证意见。']},
    { title: '改期与争议', paragraphs: ['改期需提前 24 小时；逾时视同使用一次会谈。', '争议优先以 Email 与短通话处理，必要时暂停；原则适用英国法。']},
  ],
  scope: {
    whatYouGet: { items: ['结构与清晰度教练', '英国在地证据点建议', '轻量反馈与小实验设计']},
    whatWeDontDo: { items: ['治疗/咨询', '法律/签证建议', '代写或代投']},
  },
  lastUpdated: new Date().toISOString().slice(0,10),
};

for (const loc of ['zh-TW','zh-CN']) {
  const full = legalPath(loc);
  const payload = loc === 'zh-TW' ? LEGAL_TW : LEGAL_SC;
  writeJSON(full, payload);
  console.log('Updated legal boundaries:', full);
}
console.log('contact (EN/TW/SC) and legal (TW/SC) updated.');
