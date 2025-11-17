import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';

const AUDIENCE_CARDS = [
  {
    title: 'UK-based GMs and plant leaders',
    description: 'You report to HQ, negotiate with local teams, and often carry pressure that no one else sees.',
  },
  {
    title: 'Local managers and HR in the UK',
    description: 'You translate HQ decisions for local teams and try to keep trust on both sides.',
  },
  {
    title: 'Head office leaders and HR in China',
    description: 'You care about the UK site’s stability and want fewer surprises – but you mostly see numbers, not context.',
  },
];

const CHALLENGES = [
  {
    title: 'Limited visibility beyond the numbers',
    description:
      'HQ sees KPIs and dashboards. On the ground, there are conflicts, mistrust and cultural friction that rarely make it into official reports.',
  },
  {
    title: 'Tension between Chinese and UK management styles',
    description:
      'Fast, target-driven expectations meet process-heavy, union-aware reality. Leaders feel pulled in both directions.',
  },
  {
    title: 'No safe space to think out loud',
    description:
      'Leaders cannot fully open up to HQ, local HR or peers. Sensitive topics like burnout, family pressure or doubt about strategy often stay unspoken.',
  },
];

const SUPPORT_CARDS = [
  {
    title: 'A former factory leader, not just a ‘soft skills’ coach',
    description:
      'I once managed three factories and 1,400 people. I understand what KPIs, production pressure and people issues feel like in real life – not just in theory.',
  },
  {
    title: 'Bilingual and bicultural',
    description:
      'We can speak in Mandarin about the most sensitive issues, and then translate them into realistic actions in the UK context.',
  },
  {
    title: 'A confidential space outside the company structure',
    description:
      'I am not part of your HR, and I do not send reports to HQ. Our conversations are a place to put the role down for a moment and look at the situation calmly.',
  },
  {
    title: 'Clarity and realistic options',
    description:
      'I do not promise to ‘transform your life in 30 days’. Instead, we work to see the situation clearly, define your own priorities and choose next steps you can genuinely commit to.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Short conversation with HQ or HR',
    description:
      'We clarify that the goal is not to control or monitor leaders, but to reduce people risks and improve stability.',
  },
  {
    title: '1:1 sessions with selected leaders',
    description:
      'Each leader starts with three to four one-to-one sessions, online, focused on their real situation and responsibilities.',
  },
  {
    title: 'Optional anonymous themes summary',
    description:
      'If HQ wishes, I can provide a high-level anonymous summary of common themes, without personal details or names.',
  },
  {
    title: 'Decide whether to continue',
    description:
      'After the pilot, HQ and the leaders decide whether it makes sense to continue. There is no long-term lock-in.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is this therapy, consulting or training?',
    answer:
      'It is not therapy, and it is not a big consulting project or a training programme. It is closer to having an experienced external reflection partner who uses coaching-style questions to help leaders think more clearly.',
  },
  {
    question: 'Will you report back what leaders say?',
    answer:
      'I do not report personal details. If we agree in advance, I may share very high-level themes such as ‘cross-cultural communication’ or ‘role clarity’, without naming individuals.',
  },
  {
    question: 'You are a small two-person practice. Is that a risk?',
    answer:
      'We are intentionally small. It means we do not bring political or commercial agendas into the room, and we only work with a limited number of leaders at a time.',
  },
];

const WHY_COACHING_POINTS = [
  {
    title: 'Because some truths never enter the slide deck',
    description:
      'Dashboards show capacity, margin and engagement scores. They do not show the conversations leaders have with themselves at 2am about whether this is still sustainable, or what will break first: quality, people or themselves.',
  },
  {
    title: 'Because the problem is mixed, not neatly defined',
    description:
      'EV battery capacity, steel jobs in a coastal town, R&D secrecy versus academic openness – these are not just ‘business problems’. They blend strategy, regulation, politics, family, identity and fatigue. There is no single initiative that can tidy this up.',
  },
  {
    title: 'Because they do not need more methods – they need a safe place to choose',
    description:
      'Senior leaders already know frameworks. What is missing is a protected space to put all the options on the table, confront the trade-offs and decide what they can genuinely live with. Coaching exists to hold that kind of conversation.',
  },
];

const SMALL_PRACTICE_POINTS = [
  {
    title: 'Small enough to stay out of the politics',
    description:
      'We do not arrive with a pre-packaged ‘initiative’. We do not need to justify ourselves with glossy reports. The conversations belong to the people in them, not to a project code.',
  },
  {
    title: 'Small enough to focus on a few critical people',
    description:
      'We do not aim to roll out across the whole organisation. We work with a small number of leaders whose decisions and wellbeing have disproportionate impact – GMs, site leads, HR heads, R&D directors.',
  },
  {
    title: 'Built from real factory leadership, not just theory',
    description:
      'Before coaching, I led three factories and around 1,400 people across Mainland China and Taiwan. I know how it feels when a KPI looks fine on the slide but something in the system – or in you – is close to breaking.',
  },
  {
    title: 'Intentionally independent',
    description:
      'We are a small UK-based, East Asia–rooted practice. We are not tied to any one group, government or vendor. That independence is what allows leaders to speak honestly, without worrying where their words will travel.',
  },
];

const REAL_SITUATIONS = [
  {
    title: '‘I know this target will break something’',
    description:
      'A UK-based GM in an EV battery plant knows the new capacity and cost targets look impressive in the deck – and almost impossible on the ground without pushing people or safety past their limits. In coaching, we map the three circles he lives inside: HQ expectations, UK reality and his own non-negotiables, then practise how to speak to HQ without simply exploding or withdrawing.',
  },
  {
    title: '‘My team think I betrayed them, HQ think I am too soft’',
    description:
      'A long-serving HR manager in a formerly British steelworks is now seen as ‘management’ by the union, and ‘too employee-focused’ by the new owners. Coaching gives her a place to ask the question no survey will: do I still want to be here, and if so, on what terms?',
  },
  {
    title: '‘I am torn between secrecy and openness’',
    description:
      'An R&D director sits between a China-based parent company used to tight control, and UK scientists used to open debate. The real work is not another innovation course, but exploring what kind of leader he wants to be when these two value systems clash, and where his own line is.',
  },
  {
    title: '‘I do not want to read about a resignation in an email’',
    description:
      'A Shanghai-based HRBP owns the stability of key overseas leaders but mostly sees numbers and formal updates. She uses coaching as a quiet safety net: a way for a few critical people in the UK to have an external reflection partner, and for her to hear anonymous themes before they turn into exits.',
  },
  {
    title: '‘I was promoted to be the bridge – but no one asked if I wanted to be’',
    description:
      'A local engineering manager in Scotland is promoted to site lead for a China-invested factory. Training teaches him how to influence. Coaching helps him decide whether he actually wants this role, what he is prepared to carry, and how to draw lines that protect both the site and himself.',
  },
];

export default function CorporatePage() {
  return (
    <MainLayout>
      <Head>
        <title>Coaching for China–UK Corporate Leaders in the UK | SustainSage</title>
        <meta
          name="description"
          content="Coaching for China–UK corporate leaders, HQ and HR teams who manage UK sites and factories."
        />
      </Head>
      <main className="ss-container">
        <section className="ss-section">
          <div className="rounded-3xl border border-sustain-cardBorder bg-white p-8 shadow-xl">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">China–UK support</p>
              <h1 className="text-4xl font-semibold text-sustain-text">Coaching for China–UK Corporate Leaders in the UK</h1>
              <p className="text-base text-slate-700">
                A quiet space to think clearly, away from HQ pressure and local noise.
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                I am a Taiwan-born former operations director who once led three factories and 1,400 people across Mainland China
                and Taiwan. Now based in the UK, I work with China–UK corporate leaders as a reflection partner – not to give you
                the ‘right answer’, but to help you see your options more clearly in a complex environment.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/contact" className="ss-btn-primary">
                  Talk about your situation
                </Link>
                <Link href="#" className="ss-btn-secondary">
                  Download a 1-page overview for HQ
                </Link>
              </div>
              <p className="text-sm text-slate-500">
                This PDF is coming soon. For now, please contact me directly.
              </p>
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">Who is this for?</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {AUDIENCE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md"
                >
                  <h3 className="text-xl font-semibold text-sustain-text">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">What challenges do they face?</h2>
            <div className="space-y-4 rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
              <ul className="space-y-4 text-slate-700">
                {CHALLENGES.map((challenge) => (
                  <li key={challenge.title} className="space-y-1">
                    <p className="text-lg font-semibold text-sustain-text">{challenge.title}</p>
                    <p className="text-sm leading-relaxed">{challenge.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">How I support China–UK leaders</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {SUPPORT_CARDS.map((card) => (
                <div key={card.title} className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-sustain-text">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">A simple, low-risk way to start</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.title} className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">Step {index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-sustain-text">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">Questions you might have</h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
                  <p className="text-lg font-semibold text-sustain-text">{item.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">Why coaching, not another programme?</h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Most leaders do not wake up thinking, ‘I need coaching.’ They wake up thinking about targets, union meetings,
                safety incidents, their children’s schools, and the email from HQ that arrived at midnight. By the time coaching
                appears on the radar, they are already standing between two worlds, feeling pulled from both sides.
              </p>
              <p>
                Consulting projects reshape systems. Training programmes teach models and tools. HR processes produce reports
                and metrics. All of these matter – but they rarely answer one simple question: where does the person who carries
                the responsibility put everything they cannot say in the meeting room?
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {WHY_COACHING_POINTS.map((point) => (
                <div key={point.title} className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-sustain-text">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">Why a small two-person practice?</h2>
            <p className="text-base leading-relaxed text-slate-700">
              If you want a 12-month global transformation programme with platforms, surveys and a deck for the board, you should
              work with a large consulting or coaching firm. They are designed for scale. If you want a quiet, low-risk space for
              a handful of key people to think clearly, a small practice like ours is often a better fit.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {SMALL_PRACTICE_POINTS.map((point) => (
                <div key={point.title} className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-sustain-text">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-sustain-text">Real situations where leaders choose this kind of coaching</h2>
            <p className="text-base leading-relaxed text-slate-700">
              Nobody comes to coaching because life is simple. They come when the usual tools – reports, workshops, performance
              systems – have done what they can, and something still feels stuck. Here are a few of the situations where leaders
              quietly reach out.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {REAL_SITUATIONS.map((scenario) => (
                <div key={scenario.title} className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-sustain-text">{scenario.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  const currentLocale = locale ?? 'en-GB';
  return {
    props: await serverSideTranslations(currentLocale, ['common']),
  };
}
