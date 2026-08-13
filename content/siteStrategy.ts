export const SITE_URL = 'https://sustainsage-group.com';
export const CONTACT_EMAIL = 'hc.tsai@sustainsage-group.com';
export const PRIMARY_CTA_PATH = '/contact';

export type SupportedLocale = 'en-GB' | 'zh-TW';

type Situation = {
  id: 'hq-local-expectations' | 'cross-border-role' | 'difficult-conversation' | 'assignment-transition';
  title: string;
  summary: string;
};

type Tool = {
  slug: string;
  title: string;
  stage: 1 | 2 | 3 | 4;
  purpose: string;
  whenToUse: string;
  limits: string;
  data: string;
  nextSlug: string;
};

export const siteFacts = {
  brand: 'SustainSage',
  legalName: 'SUSTAINSAGE GROUP LTD',
  companyNumber: '15220734',
  jurisdiction: 'Registered in England and Wales',
  registeredOffice: '148 Prince Albert Road, Southsea, PO4 8EL',
  coach: 'Hao-Cheng Tsai',
  email: CONTACT_EMAIL,
  domain: SITE_URL,
  serviceLanguages: ['English', '繁體中文'],
  sessionCount: 6,
  sessionMinutes: 60,
  programmeWeeks: '12-16',
} as const;

const enSituations: Situation[] = [
  {
    id: 'hq-local-expectations',
    title: 'Headquarters and local expectations',
    summary: 'You are accountable to an Asian headquarters while building trust, clarity and momentum with a UK team.',
  },
  {
    id: 'cross-border-role',
    title: 'A new cross-border leadership role',
    summary: 'You have taken on a country, functional or general management role where familiar leadership signals no longer travel cleanly.',
  },
  {
    id: 'difficult-conversation',
    title: 'A conversation with consequences',
    summary: 'You need to address performance, authority, alignment or conflict across hierarchy and culture without damaging the relationship.',
  },
  {
    id: 'assignment-transition',
    title: 'Assignment, return or role transition',
    summary: 'You are preparing for an international assignment, returning from one, or deciding what the next role should be.',
  },
];

const zhSituations: Situation[] = [
  {
    id: 'hq-local-expectations',
    title: '總部與在地團隊的期待落差',
    summary: '你需要對亞洲總部負責，同時在英國團隊中建立信任、清楚度與推進節奏。',
  },
  {
    id: 'cross-border-role',
    title: '新的跨境領導角色',
    summary: '你剛接下國家、功能或整體營運責任，原本熟悉的領導訊號在新文化中不再能直接沿用。',
  },
  {
    id: 'difficult-conversation',
    title: '一場後果重大的對話',
    summary: '你需要跨越階級與文化，處理績效、權責、共識或衝突，同時不破壞工作關係。',
  },
  {
    id: 'assignment-transition',
    title: '外派、回任或角色轉換',
    summary: '你正準備開始或結束一段國際任務，或需要決定下一個角色應該是什麼。',
  },
];

const enTools: Tool[] = [
  {
    slug: 'emotion-triangle',
    title: 'Emotion Triangle',
    stage: 1,
    purpose: 'Notice how feelings, body signals and protective responses may be connected.',
    whenToUse: 'Use it when a situation feels emotionally charged and you need language before deciding what to do.',
    limits: 'It is a reflection aid, not a diagnostic tool or a substitute for mental health care.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'thought-log',
  },
  {
    slug: 'thought-log',
    title: 'Thought Log',
    stage: 1,
    purpose: 'Separate an event from the interpretation and response that followed it.',
    whenToUse: 'Use it after a recurring worry, difficult interaction or decision loop.',
    limits: 'It cannot assess or treat a mental health condition.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'self-talk-reframe',
  },
  {
    slug: 'self-talk-reframe',
    title: 'Self-talk Reframe',
    stage: 2,
    purpose: 'Turn harsh internal language into wording that is accurate, useful and humane.',
    whenToUse: 'Use it when self-criticism is making a choice or action harder.',
    limits: 'It does not replace therapy, crisis support or clinical care.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'values-map',
  },
  {
    slug: 'values-map',
    title: 'Values Map',
    stage: 2,
    purpose: 'Identify the values you want a work decision to respect.',
    whenToUse: 'Use it when several reasonable options pull you in different directions.',
    limits: 'It does not decide for you or provide financial, legal or immigration advice.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'role-separation',
  },
  {
    slug: 'role-separation',
    title: 'Role Separation',
    stage: 2,
    purpose: 'Distinguish what different roles ask of you, and where expectations conflict.',
    whenToUse: 'Use it when work, family, migration and identity responsibilities feel tangled together.',
    limits: 'It cannot resolve safeguarding, employment-law or relationship concerns.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'choice-clarifier',
  },
  {
    slug: 'choice-clarifier',
    title: 'Choice Clarifier',
    stage: 3,
    purpose: 'Compare choices using criteria that matter in your actual circumstances.',
    whenToUse: 'Use it when you have options but no stable way to judge them.',
    limits: 'It does not make decisions or provide regulated professional advice.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'behaviour-ladder',
  },
  {
    slug: 'behaviour-ladder',
    title: 'Behaviour Ladder',
    stage: 4,
    purpose: 'Turn a large, uncertain move into a small and observable experiment.',
    whenToUse: 'Use it when you know the direction but the first step feels too risky or vague.',
    limits: 'It cannot guarantee an outcome or remove the risks of a career decision.',
    data: 'Your entries stay in your browser and are not sent to SustainSage.',
    nextSlug: 'emotion-triangle',
  },
];

const zhToolOverrides: Record<string, Partial<Tool>> = {
  'emotion-triangle': {
    title: '情緒三角',
    purpose: '留意感受、身體訊號與保護反應之間可能的關聯。',
    whenToUse: '當情境帶來強烈情緒，而你想先找到語言再決定行動時使用。',
  },
  'thought-log': {
    title: '想法紀錄',
    purpose: '把事件、詮釋與後續反應分開來看。',
    whenToUse: '在反覆擔心、困難互動或決策迴圈之後使用。',
  },
  'self-talk-reframe': {
    title: '自我對話重整',
    purpose: '把苛刻的內在語言，改寫成準確、有用且有人性的說法。',
    whenToUse: '當自我批評讓選擇或行動變得更困難時使用。',
  },
  'values-map': {
    title: '價值地圖',
    purpose: '找出你希望職涯決定尊重的核心價值。',
    whenToUse: '當幾個合理選項把你拉向不同方向時使用。',
  },
  'role-separation': {
    title: '角色分離',
    purpose: '分辨不同角色對你的要求，以及期待衝突發生在哪裡。',
    whenToUse: '當工作、家庭、移居與身分責任纏在一起時使用。',
  },
  'choice-clarifier': {
    title: '選擇釐清器',
    purpose: '用符合真實處境的條件比較選項。',
    whenToUse: '當你有選項，卻缺乏穩定判斷方式時使用。',
  },
  'behaviour-ladder': {
    title: '行為階梯',
    purpose: '把龐大而不確定的改變，拆成小型、可觀察的實驗。',
    whenToUse: '當方向大致清楚，但第一步仍太冒險或模糊時使用。',
  },
};

const zhTools: Tool[] = enTools.map((tool) => ({
  ...tool,
  ...zhToolOverrides[tool.slug],
  limits: '這是反思工具，不能取代心理治療、醫療、法律、財務或移民等專業服務。',
  data: '你的輸入只留在瀏覽器內，不會傳送給 SustainSage。',
}));

const sharedBoundaries = {
  en: [
    'Coaching is not therapy or crisis support.',
    'It is not medical, legal, financial or immigration advice.',
    'It is not recruitment, CV writing or job-placement representation.',
    'You remain responsible for your decisions and actions.',
  ],
  zh: [
    'Coaching 不是心理治療或危機支援。',
    '不提供醫療、法律、財務或移民建議。',
    '不提供招聘仲介、代寫 CV 或代投履歷。',
    '你仍對自己的決定與行動負責。',
  ],
};

export const siteContent = {
  'en-GB': {
    localeLabel: 'English',
    nav: {
      home: 'Home',
      coaching: 'Coaching',
      companies: 'For Companies',
      about: 'About',
      tools: 'Resources',
      contact: 'Contact',
    },
    cta: 'Send a confidential enquiry',
    positioning: 'Cross-cultural leadership coaching for SME founders, managers and assignees working between the UK and Asia.',
    supporting: 'For leaders handling headquarters-local expectations, role transitions, difficult conversations and international assignments.',
    situations: enSituations,
    canHelp: [
      'Clarify the role, mandate and expectations around you.',
      'Map stakeholders, decision rights and cultural assumptions.',
      'Prepare for difficult conversations across hierarchy and culture.',
      'Turn a high-stakes issue into a workable next action.',
    ],
    steps: [
      'Send a confidential enquiry describing the role and situation.',
      'If the work appears suitable, agree scope, confidentiality and success measures in writing.',
      'Work through six focused sessions with decisions and field experiments between them.',
    ],
    programme: {
      title: 'UK-Asia Cross-Border Leadership Coaching Programme',
      summary: 'Six one-to-one online coaching sessions, each 60 minutes, normally completed over 12-16 weeks. Available for self-funded and organisation-sponsored work.',
      details: [
        'Clarify the mandate, current system and useful signs of progress.',
        'Map stakeholders, expectations and decision rights across locations.',
        'Prepare real conversations and test small actions between sessions.',
        'Close with a practical transition plan and unresolved risks made explicit.',
      ],
      fees: 'After reviewing your enquiry, SustainSage will confirm whether the work is suitable and provide the scope, fee and written terms before any commitment.',
    },
    fit: {
      suitable: [
        'You are a founder, country manager, functional leader, assignee or sponsor responsible for a cross-border situation.',
        'Your work connects the UK with China, Taiwan or wider Asia, often inside an SME or a lean local operation.',
        'You retain decision authority and want a confidential space to think, prepare and act.',
      ],
      notSuitable: [
        'You need therapy, crisis support or regulated professional advice.',
        'You want recruitment, CV writing, job placement or someone to make the decision for you.',
        'You are looking for graduate or early-career coaching.',
      ],
    },
    about: {
      title: 'Familiar with the responsibility behind cross-border work',
      paragraphs: [
        'Hao-Cheng Tsai has carried operational, commercial and people responsibilities across Asian and UK contexts, including work with manufacturing operations and cross-cultural teams.',
        'He understands what it can mean to answer to headquarters, earn trust locally and make decisions when cultural expectations are not stated in the same way.',
        'Sessions can be held in English or Chinese. The work does not impose a cultural formula. It examines the specific organisation, relationships, responsibilities and risks around each client.',
      ],
    },
    tools: enTools,
    toolStages: ['Pause and notice', 'Understand yourself', 'Clarify a choice', 'Start a small action'],
    boundaries: sharedBoundaries.en,
  },
  'zh-TW': {
    localeLabel: '繁體中文',
    nav: {
      home: '首頁',
      coaching: 'Coaching',
      companies: '企業合作',
      about: '關於',
      tools: '資源',
      contact: '聯絡',
    },
    cta: '提交保密合作詢問',
    positioning: '為在英國與亞洲之間承擔管理責任的 SME 創辦人、主管與外派人才，提供跨文化領導 Coaching。',
    supporting: '協助處理總部與在地團隊期待、角色轉換、困難對話與國際外派任務。',
    situations: zhSituations,
    canHelp: [
      '釐清你的角色、授權與周圍期待。',
      '整理利害關係人、決策權與文化假設。',
      '準備跨越階級與文化的困難對話。',
      '把高風險問題轉成可以實際推進的下一步。',
    ],
    steps: [
      '提交保密合作詢問，說明你的角色與目前情境。',
      '若議題適合，再以書面確認範圍、保密方式與成功標準。',
      '進入六次聚焦會談，並在會談之間執行決策與小型實驗。',
    ],
    programme: {
      title: '英國與亞洲跨境領導 Coaching 計畫',
      summary: '六次一對一線上 Coaching，每次 60 分鐘，通常在 12-16 週內完成。可由個人自費或企業贊助。',
      details: [
        '釐清授權範圍、目前系統與有意義的進展指標。',
        '整理跨地點的利害關係人、期待與決策權。',
        '準備真實對話，並在會談之間測試小型行動。',
        '以可執行的轉換計畫收尾，同時說清楚尚未解決的風險。',
      ],
      fees: '閱讀你的詢問後，SustainSage 會先確認議題是否適合，再於任何承諾之前提供合作範圍、費用與書面條款。',
    },
    fit: {
      suitable: [
        '你是創辦人、Country Manager、功能主管、外派者或企業 Sponsor，並對跨境情境負有責任。',
        '你的工作連結英國與中國、台灣或其他亞洲市場，常見於 SME 或精簡的在地營運單位。',
        '你保有決策責任，並需要一個保密空間來思考、準備與行動。',
      ],
      notSuitable: [
        '你需要心理治療、危機支援或受規管的專業意見。',
        '你需要招聘、代寫 CV、代找職缺，或希望有人替你作決定。',
        '你正在尋找畢業生或職涯初期 Coaching。',
      ],
    },
    about: {
      title: '理解跨境工作背後的真實責任',
      paragraphs: [
        'Hao-Cheng Tsai 曾在亞洲與英國脈絡中承擔營運、商業與團隊責任，包括製造營運與跨文化團隊合作。',
        '他理解一個人如何同時對總部負責、取得在地團隊信任，並在文化期待沒有被用相同方式說明時作出決定。',
        '會談可使用英文或中文。這項工作不套用單一文化公式，而是具體檢視每位客戶所處的組織、關係、責任與風險。',
      ],
    },
    tools: zhTools,
    toolStages: ['停下來並留意', '理解自己', '釐清選擇', '開始一個小行動'],
    boundaries: sharedBoundaries.zh,
  },
} as const;

export function normaliseLocale(locale?: string): SupportedLocale {
  return locale === 'zh-TW' ? 'zh-TW' : 'en-GB';
}

export function getSiteContent(locale?: string) {
  return siteContent[normaliseLocale(locale)];
}

export const primaryNavigation = [
  { key: 'home', href: '/' },
  { key: 'coaching', href: '/coaching' },
  { key: 'companies', href: '/for-companies' },
  { key: 'about', href: '/about' },
  { key: 'tools', href: '/reflection-tools' },
  { key: 'contact', href: '/contact' },
] as const;

export const legalNavigation = [
  { key: 'Privacy Policy', href: '/legal/privacy' },
  { key: 'Cookie Policy', href: '/legal/cookie-policy' },
  { key: 'Coaching Terms', href: '/legal/coaching-terms' },
  { key: 'Coaching Boundaries', href: '/legal/coaching-boundaries' },
] as const;
