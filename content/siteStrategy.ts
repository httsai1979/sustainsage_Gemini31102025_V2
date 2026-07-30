export const SITE_URL = 'https://sustainsage-group.com';
export const CONTACT_EMAIL = 'hc.tsai@sustainsage-group.com';
export const PRIMARY_CTA_PATH = '/contact';

export type SupportedLocale = 'en-GB' | 'zh-TW';

type Situation = {
  id: 'career-change' | 'returning-to-work' | 'new-to-uk' | 'leadership-transition';
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
  programmeWeeks: '12–16',
  fitConversationMinutes: 20,
} as const;

const enSituations: Situation[] = [
  {
    id: 'career-change',
    title: 'Career change',
    summary: 'You have experience, but your current direction no longer fits your priorities, identity or life in the UK.',
  },
  {
    id: 'returning-to-work',
    title: 'Returning to work',
    summary: 'You are rebuilding confidence and choices after caring, health, relocation or another substantial break.',
  },
  {
    id: 'new-to-uk',
    title: 'Building a career in the UK',
    summary: 'Your experience is real, but UK workplace signals, language and expectations do not always translate cleanly.',
  },
  {
    id: 'leadership-transition',
    title: 'Leadership transition',
    summary: 'A new level, role or context has changed what is expected of you and how you want to lead.',
  },
];

const zhSituations: Situation[] = [
  {
    id: 'career-change',
    title: '職涯轉換',
    summary: '你已有紮實經驗，但目前方向已不再符合你的優先順序、身分認同或在英國的生活。',
  },
  {
    id: 'returning-to-work',
    title: '重返職場',
    summary: '在照顧、健康、移居或一段重要空窗後，你正重新建立信心與可行選擇。',
  },
  {
    id: 'new-to-uk',
    title: '在英國建立職涯',
    summary: '你的經驗確實存在，但英國職場的訊號、語言與期待，不一定能直接對應。',
  },
  {
    id: 'leadership-transition',
    title: '領導角色轉換',
    summary: '新的層級、角色或環境，改變了別人對你的期待，也讓你重新思考如何領導。',
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
      about: 'About',
      tools: 'Reflection Tools',
      contact: 'Contact',
    },
    cta: 'Request a free 20-minute fit conversation',
    positioning: 'Career transition coaching for Chinese-speaking professionals building their next chapter in the UK.',
    supporting: 'A structured thinking partnership for career change, returning to work, cross-cultural adjustment and leadership transitions.',
    situations: enSituations,
    canHelp: [
      'Put a vague problem into clearer words.',
      'Distinguish the conditions that genuinely matter in a choice.',
      'Prepare for difficult conversations and boundaries.',
      'Turn an idea into a lower-risk, testable action.',
    ],
    steps: [
      'Start with a free 20-minute fit conversation.',
      'Agree a coaching goal, ways of working and success measures.',
      'Work through a six-session Career Transition Coaching Programme.',
    ],
    programme: {
      title: 'Career Transition Coaching Programme',
      summary: 'Six one-to-one online coaching sessions, each 60 minutes, normally completed over 12–16 weeks.',
      details: [
        'Session one clarifies the goal, current situation and useful signs of progress.',
        'Middle sessions work with real decisions, difficult conversations, boundaries or barriers to action.',
        'You choose one small, workable experiment after each session.',
        'The final session reviews progress, unresolved questions and what comes next.',
      ],
      fees: 'Programme details and fees are discussed during the fit conversation.',
    },
    fit: {
      suitable: [
        'You have roughly eight or more years of work experience.',
        'You are living or working in the UK, or preparing to enter the UK workplace.',
        'You can make your own decisions but feel stuck between options, duties, risks or emotions.',
      ],
      notSuitable: [
        'You need therapy, crisis support or regulated professional advice.',
        'You want someone to write your CV, find roles or decide for you.',
        'You are looking for graduate or early-career coaching.',
      ],
    },
    about: {
      title: 'Experience across cultures, operations and career change',
      paragraphs: [
        'Hao-Cheng Tsai brings more than 15 years of international management, leadership and B2B experience, including responsibility for a manufacturing operation in China and cross-cultural teams.',
        'After relocating from Asia to the UK, he also experienced the work of repositioning a career, identity and contribution in a different cultural context.',
        'Sessions can be held in English or Chinese. His role is not to present a perfect formula, but to understand how work, family, migration, identity and practical risk affect one another.',
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
      about: '關於',
      tools: '反思工具',
      contact: '聯絡',
    },
    cta: '申請免費 20 分鐘適配對談',
    positioning: '協助正在英國生活或工作的華語中生代專業人士，在職涯、身分與跨文化轉換中釐清方向，作出可執行的下一步。',
    supporting: '一段有結構的思考夥伴關係，陪你處理職涯轉換、重返職場、跨文化適應與領導角色改變。',
    situations: zhSituations,
    canHelp: [
      '把模糊問題說清楚。',
      '分辨選擇中真正重要的條件。',
      '準備困難對話與界線。',
      '把想法轉成低風險、可驗證的行動。',
    ],
    steps: [
      '先進行免費 20 分鐘適配對談。',
      '確認 Coaching 目標、合作方式與成功標準。',
      '進入六次職涯轉換 Coaching 計畫。',
    ],
    programme: {
      title: '職涯轉換 Coaching 計畫',
      summary: '六次一對一線上 Coaching，每次 60 分鐘，通常在 12–16 週內完成。',
      details: [
        '第一次釐清目標、現況與有意義的進展指標。',
        '中間會談處理真實決定、困難對話、界線或行動障礙。',
        '每次由你選擇一項小型、可行的實驗。',
        '最後一次整理進展、未解問題與後續計畫。',
      ],
      fees: '計畫細節與費用會在適配對談中說明。',
    },
    fit: {
      suitable: [
        '你約有八年以上工作經驗。',
        '你正在英國生活或工作，或準備進入英國職場。',
        '你能自行決定，但被選項、責任、風險或情緒卡住。',
      ],
      notSuitable: [
        '你需要心理治療、危機支援或受規管的專業意見。',
        '你希望有人代寫 CV、代找職缺或替你決定。',
        '你正在尋找畢業生或職涯初期 Coaching。',
      ],
    },
    about: {
      title: '跨文化、營運與職涯轉換的真實經驗',
      paragraphs: [
        'Hao-Cheng Tsai 擁有超過 15 年跨國管理、領導與 B2B 經驗，曾負責中國製造據點與跨文化團隊。',
        '從亞洲移居英國後，他也親身經歷如何在不同文化脈絡中重新定位職涯、身分與貢獻。',
        '會談可使用英文或中文。他的角色不是提供完美公式，而是理解工作、家庭、移居、身分與現實風險如何彼此影響。',
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
