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
