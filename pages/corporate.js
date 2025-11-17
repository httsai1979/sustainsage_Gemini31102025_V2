import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import cn from '@/lib/cn';
import { getIconComponent } from '@/components/icons/map';

const FALLBACK_LOCALE = 'en-GB';
const CONTACT_EMAIL = 'hc.tsai@sustainsage-group.com';

const CORPORATE_CONTENT = {
  'en-GB': {
    meta: {
      title: 'Co-operate Coaching for China–UK Corporate Leaders | SustainSage',
      description:
        'Bilingual corporate coaching that keeps UK sites aligned with China HQ. Stabilise leaders, align sponsors, and decide the right next steps.',
    },
    hero: {
      tag: 'Co-operate program',
      title: 'Lead between China HQ and the UK site with steadiness',
      subtitle: 'Bilingual leadership partner for China-invested factories and labs in the UK.',
      description:
        'I led three factories and 1,400 people across Mainland China and Taiwan before moving to the UK. Now I work beside China–UK corporate leaders as an external reflection partner so that decisions stay human, not just theoretical.',
      bullets: [
        'Confidential 1:1 coaching for GMs, HRDs and bridge roles',
        'Structured, optional synthesis for HQ sponsors without gossip',
        'Grounded understanding of both Chinese and UK industrial realities',
      ],
      primaryCta: 'Share your situation',
      primaryHref: '/contact?topic=corporate',
      secondaryCta: 'Review the co-operate layers',
      secondaryHref: '#layers',
      note: 'Detailed PDF is being finalised — contact me to preview it in Mandarin or English.',
    },
    audiencesHeading: 'Who uses the co-operate program?',
    audiences: [
      {
        icon: 'handshake',
        title: 'HQ sponsors & HR directors',
        description:
          'People who hold the China-side P&L or people risks and need a discreet partner who understands both Mandarin nuance and UK compliance.',
      },
      {
        icon: 'target',
        title: 'UK-based GMs and plant leaders',
        description:
          'Site heads who report to China, negotiate with unions, and cannot afford another initiative that ignores reality on the ground.',
      },
      {
        icon: 'book',
        title: 'Bridge roles in operations & people',
        description:
          'HRBPs, programme leads and bilingual managers who explain HQ decisions locally and translate local signals back to HQ.',
      },
    ],
    pressuresHeading: 'Where co-operate reduces friction',
    pressures: [
      {
        icon: 'target',
        title: 'Targets versus limits',
        description:
          'Slides show bold KPIs. On site, leaders know what will break first: quality, retention or their own energy.',
      },
      {
        icon: 'clock',
        title: 'Invisible fatigue',
        description:
          'Bridge roles cannot vent to HQ or local HR. Sensitive doubts stay unspoken until someone resigns.',
      },
      {
        icon: 'compass',
        title: 'Language & trust gaps',
        description:
          'Mandarin, English and local dialects carry different expectations. Mis-heard intent becomes “resistance”.',
      },
    ],
    layersHeading: 'Three partnership layers to keep China–UK sites stable',
    layers: [
      {
        label: 'Layer 01 · Stabilise people',
        title: 'Hold space for the leaders carrying both HQ and site pressure.',
        description:
          'This layer keeps the people who run the UK site steady enough to make decisions and stay.',
        subLayers: [
          {
            label: 'Sub-layer A',
            icon: 'note',
            title: 'Deep bilingual 1:1 coaching',
            bullets: [
              '3–4 focused sessions per leader with space for Mandarin or English processing.',
              'We map HQ expectations, UK constraints and the leader’s own non-negotiables.',
            ],
          },
          {
            label: 'Sub-layer B',
            icon: 'clock',
            title: 'Energy & risk signals',
            bullets: [
              'Optional sentiment cues shared with the sponsor only when anonymity can be protected.',
              'Highlights brewing risks so HQ hears them before they surface as turnover.',
            ],
          },
        ],
      },
      {
        label: 'Layer 02 · Align stories',
        title: 'Reconnect HQ, HR and UK reality without forced reporting.',
        description:
          'We surface what can be shared and translate it into options HQ can actually hear and act on.',
        subLayers: [
          {
            label: 'Sub-layer C',
            icon: 'book',
            title: 'Structured synthesis notes',
            bullets: [
              'Short bilingual notes capture themes, not gossip or individual confessions.',
              'Gives HQ context so they can support rather than micromanage.',
            ],
          },
          {
            label: 'Sub-layer D',
            icon: 'calendar',
            title: 'Decision rehearsal labs',
            bullets: [
              'We role-play high-stakes conversations before they reach the boardroom.',
              'Leaders practise how to ask for adjustments without escalating conflict.',
            ],
          },
        ],
      },
      {
        label: 'Layer 03 · Expand impact',
        title: 'Keep the co-operate rhythm only if it is still useful.',
        description:
          'After the pilot we co-design whether to continue, pause or close the engagement.',
        subLayers: [
          {
            label: 'Sub-layer E',
            icon: 'handshake',
            title: 'Working agreements',
            bullets: [
              'Clarify what stays confidential, what can be shared, and how fast.',
              'Align on cadence, scope and who else may benefit from the space.',
            ],
          },
          {
            label: 'Sub-layer F',
            icon: 'consent',
            title: 'Sponsor retros & next steps',
            bullets: [
              'Sponsors receive a short recommendation: continue, scale or conclude.',
              'We decide together if additional leaders or teams should join.',
            ],
          },
        ],
      },
    ],
    processHeading: 'How we begin the co-operate engagement',
    processIntro:
      'A lightweight pilot lets HQ, HR and the UK site feel how the partnership works before committing long term.',
    process: [
      {
        icon: 'calendar',
        title: '15-minute sponsor brief',
        description: 'Clarify goals, confidentiality boundaries and success signals.',
      },
      {
        icon: 'phone',
        title: 'Select leaders quietly',
        description: 'Invite 2–4 key leaders who carry both China and UK expectations.',
      },
      {
        icon: 'note',
        title: 'Coaching sprint',
        description: 'Each leader receives three to four sessions plus optional notes.',
      },
      {
        icon: 'mail',
        title: 'Synthesis + decision',
        description: 'Share themes (only if agreed) and decide whether to continue.',
      },
    ],
    cta: {
      title: 'Ready to co-operate on steadier leadership?',
      description:
        'Send one real situation. I will respond with what support makes sense, in Mandarin or English.',
      points: [
        'ICF-certified coach with 15+ years of factory and programme leadership.',
        'Based in the UK with time zones that work for HQ and site leaders.',
        'Trusted by China–UK sponsors who need discretion more than slides.',
      ],
      primaryLabel: 'Book a chemistry call',
      primaryHref: '/contact?topic=corporate',
      secondaryLabel: 'Email the co-operate brief',
      secondaryHref: `mailto:${CONTACT_EMAIL}?subject=Co-operate%20brief`,
      sidebar: {
        title: 'What sponsors receive',
        items: [
          'Private onboarding for each leader and optional Mandarin support.',
          'Anonymous pulse after the sprint so risks surface early.',
          'A clear recommendation on whether to continue or close the program.',
        ],
      },
    },
  },
  'zh-TW': {
    meta: {
      title: 'Co-operate 中英企業教練｜SustainSage',
      description:
        '以雙語教練穩定英國據點與中國總部的協作，守住關鍵領導人、讓贊助人掌握真實情況，並共同決定下一步。',
    },
    hero: {
      tag: 'Co-operate 企業計畫',
      title: '讓總部與英國據點的協作更穩定',
      subtitle: '為中國投資的英國工廠與研發團隊提供雙語教練夥伴。',
      description:
        '我曾在中國與台灣領導三座工廠、1,400 位員工，如今在英國以外部反思夥伴身分，陪伴中英跨國企業的總經理與 HR。',
      bullets: [
        '為總經理、HR 與橋梁角色提供保密式 1:1 教練',
        '若贊助人需要，可提供精簡而無八卦的雙語摘要',
        '熟悉中國與英國產業現場，討論聚焦真實場景',
      ],
      primaryCta: '討論您的情境',
      primaryHref: '/contact?topic=corporate',
      secondaryCta: '了解三層 Co-operate 架構',
      secondaryHref: '#layers',
      note: '完整 PDF 正在排版，可直接與我聯絡索取中英文版本。',
    },
    audiencesHeading: '誰適合使用 Co-operate？',
    audiences: [
      {
        icon: 'handshake',
        title: '總部贊助人與 HR',
        description: '掌握中國端 P&L 或人力風險，需要懂中文細節又熟悉英國制度的夥伴。',
      },
      {
        icon: 'target',
        title: '駐英國的總經理與廠區負責人',
        description: '同時回報中國、面對工會與團隊，無法再接受一個忽略現場的專案。',
      },
      {
        icon: 'book',
        title: '站在中英之間的營運／人資橋梁',
        description: 'HRBP、專案經理或雙語主管，負責將總部決策轉為在地做法並回報真實訊號。',
      },
    ],
    pressuresHeading: 'Co-operate 解決的斷層',
    pressures: [
      {
        icon: 'target',
        title: 'KPI 與現場極限的落差',
        description: '簡報上的目標漂亮，但現場知道什麼會先崩——品質、人員或領導者本身。',
      },
      {
        icon: 'clock',
        title: '無法說出口的疲勞',
        description: '橋梁角色無法對總部或當地 HR 傾訴，疑惑壓抑到有人離職才浮出。',
      },
      {
        icon: 'compass',
        title: '語言與信任雙重落差',
        description: '中文、英文與地方語言帶來不同期待，善意容易被解讀成阻力。',
      },
    ],
    layersHeading: '三層架構，守住中英據點的穩定',
    layers: [
      {
        label: '次層 01 · 穩住關鍵人員',
        title: '為同時承受總部與現場壓力的領導人留一個安全空間。',
        description: '先讓真正運作據點的人能清楚思考、願意留下。',
        subLayers: [
          {
            label: '次次層 A',
            icon: 'note',
            title: '雙語深度 1:1 教練',
            bullets: ['每位領導人 3-4 場次，可用中文或英文整理思緒。', '盤點總部期待、英國限制與個人底線。'],
          },
          {
            label: '次次層 B',
            icon: 'clock',
            title: '能量與風險訊號',
            bullets: ['僅在保有匿名的條件下，向贊助人分享情緒趨勢。', '讓總部提早知道潛在風險，而非等到離職信。'],
          },
        ],
      },
      {
        label: '次層 02 · 對齊敘事',
        title: '不用硬性的報表，也能讓總部聽懂英國現場。',
        description: '把可以分享的部分翻成總部聽得懂、做得到的選項。',
        subLayers: [
          {
            label: '次次層 C',
            icon: 'book',
            title: '結構化雙語摘要',
            bullets: ['簡短筆記聚焦主題，不談八卦與個人告白。', '讓總部帶著脈絡支援，不是介入或監控。'],
          },
          {
            label: '次次層 D',
            icon: 'calendar',
            title: '決策彩排',
            bullets: ['在進董事會前先演練重要對話。', '練習如何提出調整，而非衝突或沉默。'],
          },
        ],
      },
      {
        label: '次層 03 · 延伸影響力',
        title: '只在有價值時延續 Co-operate 節奏。',
        description: '試行後共同討論是否繼續、暫停或結束。',
        subLayers: [
          {
            label: '次次層 E',
            icon: 'handshake',
            title: '合作規則',
            bullets: ['釐清哪些內容保密、哪些可以分享，以及速度。', '確認節奏、範圍與下一批受惠對象。'],
          },
          {
            label: '次次層 F',
            icon: 'consent',
            title: '贊助人檢視與決策',
            bullets: ['提供清楚建議：續行、擴大或結束。', '一起決定是否邀請更多領導人加入。'],
          },
        ],
      },
    ],
    processHeading: 'Co-operate 如何啟動',
    processIntro: '以輕量試行開始，讓總部、HR 與英國據點先感受合作方式，再決定是否延伸。',
    process: [
      {
        icon: 'calendar',
        title: '15 分鐘贊助人簡報',
        description: '釐清目標、保密範圍與成功指標。',
      },
      {
        icon: 'phone',
        title: '安靜邀請 2-4 位領導人',
        description: '挑選同時扛住中英期待的關鍵角色。',
      },
      {
        icon: 'note',
        title: '教練短衝',
        description: '每位領導人 3-4 場次，可選擇是否要摘要。',
      },
      {
        icon: 'mail',
        title: '回饋與是否續行',
        description: '若事前同意，分享主題並決定下一步。',
      },
    ],
    cta: {
      title: '想讓協作更平穩？',
      description: '寫下您目前遇到的一個情境，我會用中文或英文回覆建議的支援方式。',
      points: [
        'ICF 認證教練，曾任中國／台灣工廠營運主管 15+ 年。',
        '現居英國，時區可同時照顧總部與據點。',
        '贊助人看重的是真實與保密，而非華麗簡報。',
      ],
      primaryLabel: '預約 Chemistry Call',
      primaryHref: '/contact?topic=corporate',
      secondaryLabel: '來信索取簡報',
      secondaryHref: `mailto:${CONTACT_EMAIL}?subject=Co-operate%20%E7%B0%A1%E4%BB%8B`,
      sidebar: {
        title: '贊助人可獲得',
        items: ['每位領導人的私密 onboarding，可使用中文。', '教練短衝後的匿名脈動，提早看見風險。', '是否續行的清楚建議與下一步。'],
      },
    },
  },
  'zh-CN': {
    meta: {
      title: 'Co-operate 中英企业教练｜SustainSage',
      description: '以双语教练稳定英国据点与中国总部的协作，守住关键领导人与真实资讯，并一起决定下一步。',
    },
    hero: {
      tag: 'Co-operate 企业计划',
      title: '让总部与英国据点的协作更稳',
      subtitle: '为中国投资的英国工厂与研发团队提供双语教练伙伴。',
      description: '我曾在中国与台湾领导三座工厂、1,400 位员工，如今在英国以外部反思伙伴身份，陪伴中英跨国企业的总经理与 HR。',
      bullets: [
        '为总经理、HR 与桥梁角色提供保密式 1:1 教练',
        '若赞助人需要，可提供精简且无八卦的双语摘要',
        '熟悉中国与英国产业现场，讨论聚焦真实情境',
      ],
      primaryCta: '讨论您的情境',
      primaryHref: '/contact?topic=corporate',
      secondaryCta: '了解三层 Co-operate 架构',
      secondaryHref: '#layers',
      note: '完整 PDF 正在排版，可直接与我联系索取中英文版本。',
    },
    audiencesHeading: '谁适合使用 Co-operate？',
    audiences: [
      {
        icon: 'handshake',
        title: '总部赞助人与 HR',
        description: '掌握中国端 P&L 或人力风险，需要懂中文细节又熟悉英国制度的伙伴。',
      },
      {
        icon: 'target',
        title: '驻英国的总经理与厂区负责人',
        description: '同时回报中国、面对工会与团队，无法再接受一个忽略现场的专案。',
      },
      {
        icon: 'book',
        title: '站在中英之间的营运／人资桥梁',
        description: 'HRBP、专案经理或双语主管，负责把总部决策转成在地做法并回报真实讯号。',
      },
    ],
    pressuresHeading: 'Co-operate 解决的断层',
    pressures: [
      {
        icon: 'target',
        title: 'KPI 与现场极限的落差',
        description: '简报上的目标漂亮，但现场知道什么会先崩——品质、人力或领导者本身。',
      },
      {
        icon: 'clock',
        title: '无法说出口的疲劳',
        description: '桥梁角色无法对总部或当地 HR 倾诉，疑惑压抑到有人离职才浮现。',
      },
      {
        icon: 'compass',
        title: '语言与信任的落差',
        description: '中文、英文与地方语言带来不同期待，善意容易被视为阻力。',
      },
    ],
    layersHeading: '三层架构，守住中英据点的稳定',
    layers: [
      {
        label: '次层 01 · 稳住关键人员',
        title: '为同时承受总部与现场压力的领导人留一个安全空间。',
        description: '先让真正运作据点的人能清楚思考、愿意留下。',
        subLayers: [
          {
            label: '次次层 A',
            icon: 'note',
            title: '双语深度 1:1 教练',
            bullets: ['每位领导人 3-4 场次，可用中文或英文整理思绪。', '盘点总部期待、英国限制与个人底线。'],
          },
          {
            label: '次次层 B',
            icon: 'clock',
            title: '能量与风险讯号',
            bullets: ['仅在保有匿名的条件下，向赞助人分享情绪趋势。', '让总部提早知道潜在风险，而不是等到离职信。'],
          },
        ],
      },
      {
        label: '次层 02 · 对齐叙事',
        title: '不用僵硬报表，也能让总部听懂英国现场。',
        description: '把可以分享的部分转换为总部听得懂、做得到的选项。',
        subLayers: [
          {
            label: '次次层 C',
            icon: 'book',
            title: '结构化双语摘要',
            bullets: ['简短笔记聚焦主题，不谈八卦与个人告白。', '让总部带着脉络支援，而不是介入或监控。'],
          },
          {
            label: '次次层 D',
            icon: 'calendar',
            title: '决策彩排',
            bullets: ['在进董事会前先演练重要对话。', '练习如何提出调整，而不是冲突或沉默。'],
          },
        ],
      },
      {
        label: '次层 03 · 延伸影响力',
        title: '只在有价值时延续 Co-operate 节奏。',
        description: '试行后共同讨论是否继续、暂停或结束。',
        subLayers: [
          {
            label: '次次层 E',
            icon: 'handshake',
            title: '合作规则',
            bullets: ['厘清哪些内容保密、哪些可以分享，以及速度。', '确认节奏、范围与下一批受惠对象。'],
          },
          {
            label: '次次层 F',
            icon: 'consent',
            title: '赞助人检视与决策',
            bullets: ['提供清楚建议：续行、扩大或结束。', '一起决定是否邀请更多领导人加入。'],
          },
        ],
      },
    ],
    processHeading: 'Co-operate 如何启动',
    processIntro: '以轻量试行开始，让总部、HR 与英国据点先感受合作方式，再决定是否延伸。',
    process: [
      {
        icon: 'calendar',
        title: '15 分钟赞助人简报',
        description: '厘清目标、保密范围与成功指标。',
      },
      {
        icon: 'phone',
        title: '安静邀请 2-4 位领导人',
        description: '挑选同时扛住中英期待的关键角色。',
      },
      {
        icon: 'note',
        title: '教练短冲',
        description: '每位领导人 3-4 场次，可选择是否要摘要。',
      },
      {
        icon: 'mail',
        title: '回馈与是否续行',
        description: '若事前同意，分享主题并决定下一步。',
      },
    ],
    cta: {
      title: '想让协作更平稳？',
      description: '写下您目前遇到的一个情境，我会用中文或英文回复建议的支援方式。',
      points: [
        'ICF 认证教练，曾任中国／台湾工厂营运主管 15+ 年。',
        '现居英国，时区可同时照顾总部与据点。',
        '赞助人看重的是真实与保密，而非华丽简报。',
      ],
      primaryLabel: '预约 Chemistry Call',
      primaryHref: '/contact?topic=corporate',
      secondaryLabel: '来信索取简报',
      secondaryHref: `mailto:${CONTACT_EMAIL}?subject=Co-operate%20%E7%AE%80%E4%BB%8B`,
      sidebar: {
        title: '赞助人可获得',
        items: ['每位领导人的私密 onboarding，可使用中文。', '教练短冲后的匿名脉动，提早看见风险。', '是否续行的清楚建议与下一步。'],
      },
    },
  },
};
function resolveLocale(locale) {
  if (!locale) {
    return FALLBACK_LOCALE;
  }

  const normalized = locale.toLowerCase();

  if (normalized.startsWith('zh-cn') || normalized === 'zh' || normalized.includes('hans')) {
    return 'zh-CN';
  }

  if (normalized.startsWith('zh-tw') || normalized.includes('hant')) {
    return 'zh-TW';
  }

  return 'en-GB';
}

function getCorporateCopy(locale) {
  const key = resolveLocale(locale);
  return CORPORATE_CONTENT[key] ?? CORPORATE_CONTENT[FALLBACK_LOCALE];
}

function IconBadge({ icon, className }) {
  const Icon = getIconComponent(icon);

  if (!Icon) {
    return null;
  }

  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary/20 text-brand-sage shadow-soft',
        className
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

function ListWithDots({ items }) {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CorporatePage({ copy }) {
  return (
    <div className="bg-brand-bg text-brand-ink">
      <div className="ss-container space-y-16 py-12 lg:py-16">
          <section className="rounded-[32px] border border-brand-primary/40 bg-gradient-to-br from-brand-bg via-white to-white/90 p-8 shadow-sustainCard lg:p-12">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">{copy.hero.tag}</p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-brand-ink lg:text-5xl">{copy.hero.title}</h1>
                <p className="text-lg text-brand-ink/80">{copy.hero.subtitle}</p>
                <p className="text-base leading-relaxed text-slate-700">{copy.hero.description}</p>
              </div>
              <ul className="space-y-3">
                {copy.hero.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-base text-slate-700">
                    <IconBadge icon="arrow" className="mt-0.5 h-8 w-8 rounded-full bg-brand-primary/30 text-brand-ink" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={copy.hero.primaryHref}
                  className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
                >
                  {copy.hero.primaryCta}
                </Link>
                <Link
                  href={copy.hero.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
                >
                  {copy.hero.secondaryCta}
                </Link>
              </div>
              <p className="text-sm text-slate-600">{copy.hero.note}</p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Co-operate</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.audiencesHeading}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.audiences.map((audience) => (
                <article key={audience.title} className="rounded-3xl border border-brand-primary/30 bg-white/90 p-6 shadow-sustainCard">
                  <IconBadge icon={audience.icon} />
                  <h3 className="mt-4 text-xl font-semibold text-brand-ink">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{audience.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Pressure map</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.pressuresHeading}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {copy.pressures.map((pressure) => (
                <article key={pressure.title} className="rounded-3xl border border-brand-primary/30 bg-brand-bg/70 p-6">
                  <IconBadge icon={pressure.icon} className="bg-white" />
                  <h3 className="mt-4 text-xl font-semibold text-brand-ink">{pressure.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{pressure.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="layers" className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Co-operate</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.layersHeading}</h2>
            </div>
            <div className="space-y-8">
              {copy.layers.map((layer) => (
                <article key={layer.label} className="rounded-3xl border border-brand-primary/30 bg-white/95 p-6 shadow-sustainCard lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">{layer.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-brand-ink">{layer.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">{layer.description}</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {layer.subLayers.map((subLayer) => (
                      <div key={subLayer.title} className="rounded-2xl border border-brand-primary/20 bg-brand-bg/70 p-5">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand-sage/70">
                          {subLayer.label}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <IconBadge icon={subLayer.icon} className="bg-white text-brand-sage" />
                          <p className="text-lg font-semibold text-brand-ink">{subLayer.title}</p>
                        </div>
                        <ListWithDots items={subLayer.bullets} />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Process</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.processHeading}</h2>
              <p className="text-base leading-relaxed text-slate-700">{copy.processIntro}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {copy.process.map((step) => (
                <article key={step.title} className="rounded-3xl border border-brand-primary/30 bg-white/90 p-5 shadow-soft">
                  <IconBadge icon={step.icon} className="bg-white text-brand-sage" />
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 rounded-3xl border border-brand-primary/40 bg-white/95 p-6 shadow-sustainCard lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Next step</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.cta.title}</h2>
              <p className="text-base leading-relaxed text-slate-700">{copy.cta.description}</p>
              <ListWithDots items={copy.cta.points} />
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={copy.cta.primaryHref}
                  className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
                >
                  {copy.cta.primaryLabel}
                </Link>
                <a
                  href={copy.cta.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
                >
                  {copy.cta.secondaryLabel}
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-brand-primary/30 bg-brand-bg/80 p-6">
              <h3 className="text-xl font-semibold text-brand-ink">{copy.cta.sidebar.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {copy.cta.sidebar.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <IconBadge icon="consent" className="h-8 w-8 rounded-full bg-white text-brand-sage" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-600">
                <span className="font-semibold">Email:</span> {CONTACT_EMAIL}
              </p>
            </div>
          </section>
      </div>
    </div>
  );
}

CorporatePage.propTypes = {
  copy: PropTypes.shape({
    meta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    hero: PropTypes.object,
    audiencesHeading: PropTypes.string,
    audiences: PropTypes.arrayOf(PropTypes.object),
    pressuresHeading: PropTypes.string,
    pressures: PropTypes.arrayOf(PropTypes.object),
    layersHeading: PropTypes.string,
    layers: PropTypes.arrayOf(PropTypes.object),
    processHeading: PropTypes.string,
    processIntro: PropTypes.string,
    process: PropTypes.arrayOf(PropTypes.object),
    cta: PropTypes.object,
  }).isRequired,
};

CorporatePage.getLayout = function getLayout(page) {
  const seo = page.props?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo.title,
        description: seo.description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  const currentLocale = locale ?? FALLBACK_LOCALE;
  const copy = getCorporateCopy(currentLocale);

  return {
    props: {
      copy,
      seo: {
        title: copy.meta.title,
        description: copy.meta.description,
      },
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  };
}
