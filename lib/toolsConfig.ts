export type LocalizedField = {
  default: string;
  [locale: string]: string;
};

export type ToolConfig = {
  slug: string;
  title: LocalizedField;
  description: LocalizedField;
  category: LocalizedField;
  iframeSrc: string;
};

export type LocalizedTool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  iframeSrc: string;
};

const localizedField = (defaultValue: string, overrides: Partial<Record<string, string>> = {}): LocalizedField => ({
  default: defaultValue,
  ...overrides,
});

const resolveField = (field: LocalizedField, locale = 'en-GB'): string => {
  if (!field) return '';
  if (field[locale]) {
    return field[locale];
  }

  const baseLocale = locale?.split('-')[0];
  if (baseLocale && field[baseLocale]) {
    return field[baseLocale];
  }

  return field.default;
};

const INTERACTIVE_CATEGORY = localizedField('Interactive tool', {
  'zh-TW': '互動工具',
  'zh-CN': '互动工具',
});

export const toolsConfig: ToolConfig[] = [
  {
    slug: 'self-talk-reframe',
    title: localizedField('Self-talk Reframe Cards', {
      'zh-TW': '自我對話重塑卡',
      'zh-CN': '自我对话重塑卡',
    }),
    description: localizedField('Swap harsh inner scripts with grounded, kinder language you can use in the moment.', {
      'zh-TW': '把嚴苛的內在對話換成更穩定、溫柔的提醒。',
      'zh-CN': '把苛刻的內在對话换成更稳妥、温柔的提醒。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/self-talk-reframe.html',
  },
  {
    slug: 'behaviour-ladder',
    title: localizedField('Behaviour Experiment Ladder', {
      'zh-TW': '行為實驗階梯',
      'zh-CN': '行为实验阶梯',
    }),
    description: localizedField('Design a gentle experiment to test new behaviours without overwhelming yourself.', {
      'zh-TW': '循序規劃一個小型實驗，溫柔測試新的行為。',
      'zh-CN': '按步骤规划一个小实验，温和测试新的行为。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/behaviour-ladder.html',
  },
  {
    slug: 'values-map',
    title: localizedField('Values Map', {
      'zh-TW': '自我價值地圖',
      'zh-CN': '自我价值地图',
    }),
    description: localizedField('Plot the anchors that steady you so decisions align with what matters most.', {
      'zh-TW': '標記支撐你的價值與訊號，讓決策對齊真正的重心。',
      'zh-CN': '标记支撑你的价值与信号，让决策对齐真正的重心。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/values-map.html',
  },
  {
    slug: 'emotion-triangle',
    title: localizedField('Emotion Triangle Cards', {
      'zh-TW': '情緒三角卡',
      'zh-CN': '情绪三角卡',
    }),
    description: localizedField('Notice the feeling, clarify the need, and choose one small next step.', {
      'zh-TW': '說出感受、看見需求，再想一個可行的小步。',
      'zh-CN': '说出感受、看见需要，再想一个可行的小步。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/emotion-triangle.html',
  },
  {
    slug: 'thought-log',
    title: localizedField('Thought Log', {
      'zh-TW': '思維紀錄儀',
      'zh-CN': '思维记录仪',
    }),
    description: localizedField('Capture looping thoughts, look for patterns, and practice a more balanced response.', {
      'zh-TW': '記錄反覆出現的念頭、蒐集證據，練習較平衡的回應。',
      'zh-CN': '记录反复出现的念头、收集证据，练习更平衡的回应。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/thought-log.html',
  },
  {
    slug: 'role-separation',
    title: localizedField('Role Separation Exercise', {
      'zh-TW': '角色分化練習',
      'zh-CN': '角色分化练习',
    }),
    description: localizedField('Untangle competing responsibilities so you can decide what to hold or delegate.', {
      'zh-TW': '釐清不同角色與責任，決定自己要拿著或交棒。',
      'zh-CN': '厘清不同角色与责任，决定自己要握着或交棒。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/role-separation.html',
  },
  {
    slug: 'choice-clarifier',
    title: localizedField('Decision Clarity Helper', {
      'zh-TW': '選擇困境釐清器',
      'zh-CN': '选择困境厘清器',
    }),
    description: localizedField('Lay out the trade-offs, boundaries, and needs before committing to a path.', {
      'zh-TW': '在做決定前列出取捨、界線與需要。',
      'zh-CN': '在做决定前列出取舍、界限与需要。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/choice-clarifier.html',
  },
];

export const resolveToolCopy = (tool: ToolConfig, locale = 'en-GB'): LocalizedTool => ({
  slug: tool.slug,
  iframeSrc: tool.iframeSrc,
  title: resolveField(tool.title, locale),
  description: resolveField(tool.description, locale),
  category: resolveField(tool.category, locale),
});
