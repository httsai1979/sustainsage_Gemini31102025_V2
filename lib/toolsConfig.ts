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
      'zh-CN': '自我对话重构卡',
    }),
    description: localizedField('Swap harsh inner scripts with grounded, kinder language you can use in the moment.', {
      'zh-TW': '溫和地覺察那些對自己過於苛責的內心對話，練習換成更有同理與支持感的說法。',
      'zh-CN': '温和地留意那些对自己过于苛责的内心独白，练习换成更有同理心、能支持自己的说法。',
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
      'zh-TW': '用小步驟、低風險的實驗來測試新的行為，而不是一次把自己推到極限。',
      'zh-CN': '通过小步、低风险的实验来尝试新行为，而不是一次把自己逼到极限。',
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
      'zh-TW': '整理對你真正重要的事情，對照現在的選擇是否與核心價值一致。',
      'zh-CN': '梳理对你真正重要的事情，看看现在的选择是否与核心价值保持一致。',
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
      'zh-TW': '連結事件、情緒與行動，慢慢看見自己還有其他可能的反應方式。',
      'zh-CN': '连结事件、情绪和行动，慢慢发现自己其实还有其他可能的反应方式。',
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
      'zh-TW': '記錄觸發情緒的情境、想法與感受，幫助你看見反覆出現的模式。',
      'zh-CN': '记录触发情绪的情境、想法与感受，帮助你看见反复出现的模式。',
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
      'zh-TW': '區分「我是怎樣的人」和「我在這個角色裡的表現」，讓批評不再等於否定整個自己。',
      'zh-CN': '区分「我是怎样的人」和「我在这个角色里的表现」，让批评不再等于否定整个人。',
    }),
    category: INTERACTIVE_CATEGORY,
    iframeSrc: '/tools/role-separation.html',
  },
  {
    slug: 'choice-clarifier',
    title: localizedField('Decision Clarity Helper', {
      'zh-TW': '選擇困境釐清器',
      'zh-CN': '选择困境澄清器',
    }),
    description: localizedField('Lay out the trade-offs, boundaries, and needs before committing to a path.', {
      'zh-TW': '把不同選項、成本與需要攤開來看，讓決定不再只是腦海裡一團霧。',
      'zh-CN': '把不同选项、成本和需求摊开来看，让决策不再只是一团混乱。',
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
