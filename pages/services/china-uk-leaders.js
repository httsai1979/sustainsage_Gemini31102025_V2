import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { sanitizeProps } from '@/lib/toSerializable';

import nextI18NextConfig from '../../next-i18next.config.js';

const cardBase = 'rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm';

const audiences = [
  {
    title: 'UK-based GMs and plant leaders',
    body: 'You report to HQ, negotiate with local teams, and often carry pressure that no one else sees.',
  },
  {
    title: 'Local managers and HR in the UK',
    body: 'You translate HQ decisions for local teams and try to keep trust on both sides.',
  },
  {
    title: 'Head office leaders and HR in China',
    body: 'You care about the UK site’s stability and want fewer surprises – but you mostly see numbers, not context.',
  },
];

const challenges = [
  {
    title: 'Limited visibility beyond the numbers',
    body:
      'HQ sees KPIs and dashboards. On the ground, there are conflicts, mistrust and cultural friction that rarely make it into official reports.',
  },
  {
    title: 'Tension between Chinese and UK management styles',
    body: 'Fast, target-driven expectations meet process-heavy, union-aware reality. Leaders feel pulled in both directions.',
  },
  {
    title: 'No safe space to think out loud',
    body:
      'Leaders cannot fully open up to HQ, local HR or peers. Sensitive topics like burnout, family pressure or doubt about strategy often stay unspoken.',
  },
];

const supportCards = [
  {
    title: 'A former factory leader, not just a “soft skills” coach',
    body:
      'I once managed three factories and around 1,400 people. I understand production pressure, people issues and head office demands from the inside – not just from theory.',
  },
  {
    title: 'Bilingual and bicultural',
    body:
      'We can speak in Mandarin about the most sensitive issues, and then translate them into realistic actions in the UK context.',
  },
  {
    title: 'A confidential space outside the company structure',
    body:
      'I am not part of your HR, and I do not send reports to HQ. Our conversations are a place to put the role down for a moment and look at the situation calmly.',
  },
  {
    title: 'Clarity and realistic options',
    body:
      'I do not promise to “transform your life in 30 days”. Instead, we work to see the situation clearly, define your own priorities and choose next steps you can genuinely commit to.',
  },
];

const whyCoachingPoints = [
  {
    title: 'Beyond the numbers',
    body: 'Reports show performance, not the leader’s doubt and fatigue.',
  },
  {
    title: 'No one-size-fits-all answer',
    body:
      'Cross-cultural situations between China and the UK are messy; frameworks help, but they cannot decide someone’s personal limits.',
  },
  {
    title: 'Fewer blind spots, fewer regretted decisions',
    body: 'Coaching reduces blind spots so key people make fewer “I wish I hadn’t done that” decisions.',
  },
];

const whySmallPractice = [
  {
    title: 'Low political risk',
    body: 'A two-person practice with no stake in internal politics. High confidentiality, low noise.',
  },
  {
    title: 'Real operations experience',
    body: 'Taiwan-born former operations director who led three factories and 1,400 people across Mainland China and Taiwan.',
  },
  {
    title: 'Bilingual and bicultural',
    body: 'Mandarin and English, China/Taiwan and UK context – bridging nuance in both languages.',
  },
  {
    title: 'Small by design',
    body: 'We work with a handful of leaders at a time. No push for large, long-term contracts.',
  },
];

const pilotSteps = [
  {
    title: 'Short conversation with HQ or HR',
    body: 'Clarify goals, success measures and confidentiality boundaries before we begin.',
  },
  {
    title: '1:1 sessions with selected leaders',
    body: 'Three to four online sessions per person, grounded in their real responsibilities.',
  },
  {
    title: 'Optional anonymous themes summary',
    body: 'Only if agreed in advance. High-level themes without personal details or quotes.',
  },
  {
    title: 'Decide whether to continue',
    body: 'No long-term lock-in. Continue only if it genuinely helps the leaders and HQ.',
  },
];

const faqs = [
  {
    question: 'Is this therapy, consulting or training?',
    answer:
      'It is coaching. We look at the leader’s real responsibilities, relationships and choices. When necessary I can suggest consultants or therapists, but this space is for reflection and practical decisions.',
  },
  {
    question: 'Will you report back what leaders say?',
    answer:
      'Only if we have agreed specific boundaries beforehand. Otherwise, conversations stay confidential and no detailed notes are shared with HQ or HR.',
  },
  {
    question: 'You are a small two-person practice. Is that a risk?',
    answer:
      'It keeps things lean and discreet. If we feel additional expertise is needed, I will say so and introduce trusted partners rather than taking on work we cannot support well.',
  },
];

function Section({ children, className = '' }) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">{children}</div>
    </section>
  );
}

export default function ChinaUkLeadersPage() {
  return (
    <>
      <Head>
        <title>Coaching for China–UK corporate leaders in the UK | SustainSage Group Ltd</title>
        <meta
          name="description"
          content="A calm, confidential coaching space for China–UK corporate leaders working in the UK."
        />
      </Head>

      <main className="bg-[#f7f8f5] text-slate-900">
        <Section className="pb-20 pt-14 sm:pt-16 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4A6C56]/80">
                SustainSage Group Ltd
              </p>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Coaching for China–UK corporate leaders in the UK
                </h1>
                <p className="mt-4 text-xl text-slate-700">
                  A quiet space to think clearly, away from HQ pressure and local noise.
                </p>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-slate-700">
                <p>
                  I am a Taiwan-born former operations director who once led three factories and around 1,400 people across
                  Mainland China and Taiwan. Now based in the UK, I work as a reflection partner for China–UK leaders navigating
                  sensitive situations far from head office.
                </p>
                <p>
                  Sessions are calm, honest and discreet. We look at what is really happening, not just the KPI deck.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#4A6C56] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#3d5a47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6C56] sm:w-auto"
                  >
                    Talk about your situation
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#4A6C56]/30 bg-white px-6 py-3 text-base font-semibold text-[#4A6C56] shadow-sm transition hover:border-[#4A6C56]/60 hover:bg-[#f7f8f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6C56] sm:w-auto"
                  >
                    Download a 1-page overview for HQ
                  </Link>
                </div>
                <p className="text-sm text-slate-500">
                  This PDF is coming soon. For now, please contact me directly.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[28px] border border-slate-200 bg-white/70 p-4 shadow-lg">
                <Image
                  src="/images/placeholder-hero.jpg"
                  alt="Calm meeting room with natural light and two chairs"
                  width={960}
                  height={960}
                  className="h-full w-full rounded-[20px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Scope</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Who is this for?</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <div key={audience.title} className={`${cardBase} h-full text-left`}>
                <h3 className="text-lg font-semibold text-slate-900">{audience.title}</h3>
                <p className="mt-3 text-base text-slate-700">{audience.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Reality on the ground</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">What challenges do they face?</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <div key={challenge.title} className={`${cardBase} h-full`}>
                <div className="flex gap-4">
                  <span aria-hidden="true" className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-[#4A6C56]" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{challenge.title}</h3>
                    <p className="mt-3 text-base text-slate-700">{challenge.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Support</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">How I support China–UK leaders</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {supportCards.map((card) => (
              <div key={card.title} className={`${cardBase} h-full`}>
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-base text-slate-700">{card.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Why coaching</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Why coaching – and not just another programme or report?
            </h2>
            <p className="mt-4 text-base text-slate-700">
              Most China–UK leaders are not “shopping for coaching”. They already have reports, consultants and training. What
              is missing is a confidential space to think.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyCoachingPoints.map((point) => (
              <div key={point.title} className={`${cardBase} h-full`}>
                <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-3 text-base text-slate-700">{point.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Why us</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Why work with a small practice like ours?</h2>
            <p className="mt-4 text-base text-slate-700">
              Quiet, discreet, operations-informed coaching for leaders who cannot afford noise.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whySmallPractice.map((reason) => (
              <div key={reason.title} className={`${cardBase} h-full`}>
                <h3 className="text-lg font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-3 text-base text-slate-700">{reason.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Pilot</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">A simple, low-risk way to start</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pilotSteps.map((step, index) => (
              <div key={step.title} className="relative pl-6">
                <div className="absolute left-0 top-1 text-sm font-semibold text-[#4A6C56]">0{index + 1}</div>
                <div className={`${cardBase} h-full bg-white/80`}> 
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-base text-slate-700">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Questions you might have</h2>
          </div>
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className={`${cardBase}`}>
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-3 text-base text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-[#4A6C56]/20 bg-white/90 p-8 text-center shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4A6C56]/70">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Ready to explore a small pilot?</h2>
            <p className="mt-4 text-base text-slate-700">
              Let’s have a low-pressure conversation about supporting one or two key leaders in the UK. No sales script, no
              commitment required.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#4A6C56] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#3d5a47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6C56]"
              >
                Talk about your situation
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  };

  return {
    props: sanitizeProps(props),
  };
}
