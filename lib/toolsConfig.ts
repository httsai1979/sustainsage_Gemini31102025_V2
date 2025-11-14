export type ToolConfig = {
  slug: string;
  title: string;
  description: string;
  category: string;
  iframeSrc: string;
};

export const toolsConfig: ToolConfig[] = [
  {
    slug: 'self-talk-reframe',
    title: 'Self-talk Reframe Cards',
    description: 'Swap harsh inner scripts with grounded, kinder language you can use in the moment.',
    category: 'Interactive tool',
    iframeSrc: '/tools/self-talk-reframe.html',
  },
  {
    slug: 'behaviour-experiment-ladder',
    title: 'Behaviour Experiment Ladder',
    description: 'Design a gentle experiment to test new behaviours without overwhelming yourself.',
    category: 'Interactive tool',
    iframeSrc: '/tools/behaviour-experiment-ladder.html',
  },
  {
    slug: 'values-map',
    title: 'Values Map',
    description: 'Plot the anchors that steady you so decisions align with what matters most.',
    category: 'Interactive tool',
    iframeSrc: '/tools/values-map.html',
  },
  {
    slug: 'emotion-triangle',
    title: 'Emotion Triangle Cards',
    description: 'Notice the feeling, clarify the need, and choose one small next step.',
    category: 'Interactive tool',
    iframeSrc: '/tools/emotion-triangle.html',
  },
  {
    slug: 'thought-log',
    title: 'Thought Log',
    description: 'Capture looping thoughts, look for patterns, and practice a more balanced response.',
    category: 'Interactive tool',
    iframeSrc: '/tools/thought-log.html',
  },
  {
    slug: 'role-separation',
    title: 'Role Separation Exercise',
    description: 'Untangle competing responsibilities so you can decide what to hold or delegate.',
    category: 'Interactive tool',
    iframeSrc: '/tools/role-separation.html',
  },
  {
    slug: 'decision-clarity-helper',
    title: 'Decision Clarity Helper',
    description: 'Lay out the trade-offs, boundaries, and needs before committing to a path.',
    category: 'Interactive tool',
    iframeSrc: '/tools/decision-clarity-helper.html',
  },
];
