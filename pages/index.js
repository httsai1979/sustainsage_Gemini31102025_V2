import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/layout/Hero';
import ICFNotice from '../components/legal/ICFNotice';
import StickyCTA from '../components/StickyCTA';
import { Reveal, HoverLift } from '../components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const audiences = [
  { title: 'Mid-career returners', description: 'Co-create a realistic plan to re-enter with confidence.' },
  { title: 'Newcomers to the UK', description: 'Reflect on norms, choices and practical moves in context.' },
  { title: 'Graduates', description: 'Turn uncertainty into small, testable next steps.' },
  { title: 'Parents back to work', description: 'Rebuild rhythm with gentle structure and accountability.' },
];

const steps = [
  { title: 'Intro chat', description: 'We clarify aims, boundaries, and fit. You choose the topic; we agree how we’ll work.' },
  { title: 'Focused sessions', description: 'Typically 4–6 × 50–60 mins. You lead; we partner to evoke awareness and options.' },
  { title: 'Review & next steps', description: 'We reflect on learning, adjust the plan, and agree what support you want next.' },
];

const faqs = [
  {
    question: 'Is coaching the same as therapy or counselling?',
    answer:
      'No. Coaching is future-focused and client-led. We do not assess, diagnose or treat. If therapy seems more appropriate, we will signpost respectfully.',
  },
  {
    question: 'Do you give advice?',
    answer: 'We are non-directive. We may offer observations or frameworks with your permission, but you choose what to do.',
  },
  {
    question: 'Is it confidential?',
    answer: 'Yes, within legal and safeguarding limits. We explain confidentiality and data handling in our agreement.',
  },
  {
    question: 'How many sessions will I need?',
    answer: 'Many people start with 4–6. We review together and you decide what is useful.',
  },
  {
    question: 'Can sessions be recorded?',
    answer: 'Only with your explicit consent and for a clear purpose. Otherwise, we do not record.',
  },
  {
    question: 'Do you follow a code of ethics?',
    answer: 'Yes. We work to the ICF Code of Ethics and core competencies.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.sustainsage-group.com',
    name: 'SustainSage Coaching',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SustainSage Group Ltd.',
    url: 'https://www.sustainsage-group.com',
  },
];

function HomePage() {
  return (
    <MainLayout
      title="SustainSage | Coaching"
      desc="Calm, client-led coaching grounded in ICF ethics."
      jsonLd={jsonLd}
    >
      <Hero
        image="/hero/home.svg"
        priority
        align="left"
        title="Calm, client-led coaching for real-life change"
        subtitle="A steady, non-directive space to think clearly, choose next steps, and move at your pace—without hype."
      >
        <Link href="/contact" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm">
          Book a 20-minute chat
        </Link>
        <a href="#how-it-works" className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white">
          See how it works
        </a>
      </Hero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Who we help</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((item) => (
              <HoverLift key={item.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How it works</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <HoverLift key={step.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Frequently asked questions</h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-slate-900">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>

      <StickyCTA />
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default HomePage;
