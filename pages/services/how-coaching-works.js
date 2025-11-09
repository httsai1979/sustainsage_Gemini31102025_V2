import Head from 'next/head';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function BulletList({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StepList({ steps }) {
  if (!steps?.length) {
    return null;
  }

  return (
    <ol className="mt-8 grid gap-6 md:grid-cols-2">
      {steps.map((step) => (
        <li key={step.title} className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

const STEP_ITEMS = [
  {
    title: 'Free 20-min intro',
    description: 'Fit, expectations, boundaries, package / no package. No obligation to continue.',
  },
  {
    title: 'Contracting',
    description: 'Topic, frequency, number of sessions, language, fees. We document what we agree.',
  },
  {
    title: 'Sessions',
    description: '50–60 mins, online, with simple reflection prompts. You set the focus each time.',
  },
  {
    title: 'Between sessions',
    description: 'Optional light check-ins when agreed. No surprise homework or pressure.',
  },
];

const SELF_CHECK_QUESTIONS = [
  'Am I dealing with immediate safety, legal, or medical risks that need specialised support?',
  'Do I have the bandwidth to reflect and experiment between sessions, even in small ways?',
  'Would I benefit more right now from therapy, supervision, or another resource focused on healing?',
  'Do I want a space to make decisions I own, rather than someone telling me what to do?',
];

const PACKAGE_LINKS = [
  {
    title: 'Transition Coaching – 6 sessions',
    description: 'Structured space to stabilise relocation or role change in the UK.',
    href: '/services/transition-coaching',
  },
  {
    title: 'Reset Sprint – 3 sessions',
    description: 'Short, focused container to pause, sort and choose next steps.',
    href: '/services/reset-sprint',
  },
  {
    title: 'Deepening Practice – 8 sessions',
    description: 'Longer-term partnership for leaders and practitioners refining their practice.',
    href: '/services/deepening-practice',
  },
];

export default function HowCoachingWorksPage() {
  const pageTitle = 'How coaching works with SustainSage';
  const pageDescription =
    'Understand our ICF-aligned coaching approach, boundaries, ethics, and how to decide if coaching fits your current needs.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title="How coaching works"
        subtitle="ICF-aligned, client-led coaching. No promises we can’t keep—just honest partnership and clear boundaries."
        image="/hero/services.svg"
        imageAlt="Illustration describing how coaching works"
      >
        <Link
          href="/contact?from=how-coaching-works"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          Book an intro call
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
        >
          View all services
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we mean by “coaching”</h2>
          <BulletList
            items={[
              'Non-directive, future-oriented, client-led.',
              'We work with your thinking, patterns, choices; you own decisions and action.',
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How a typical journey flows</h2>
          <StepList steps={STEP_ITEMS} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we will not do</h2>
            <BulletList
              items={[
                'No diagnosis, no making decisions for you, no guarantees of results.',
                'No legal, immigration, or medical advice.',
                'We name risk signals and encourage you to seek appropriate support when needed.',
              ]}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How we hold ethics</h2>
            <BulletList
              items={[
                'Based on the ICF Code of Ethics.',
                'Confidentiality with clear exceptions (legal / safety).',
                'In multilingual, multicultural contexts we acknowledge power dynamics and systemic pressure.',
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Is coaching right for me now?</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A quick self-check before you book. If several answers point to high distress or risk, please reach out to therapeutic or crisis resources first.
          </p>
          <BulletList items={SELF_CHECK_QUESTIONS} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Which package fits?</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Each package keeps the same coaching principles and boundaries. Choose based on how much structure and time you want.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PACKAGE_LINKS.map((pkg) => (
              <Link
                key={pkg.href}
                href={pkg.href}
                className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <span className="text-base font-semibold text-slate-900">{pkg.title}</span>
                <span className="mt-3 text-sm leading-6 text-slate-700">{pkg.description}</span>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-700">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            Ready to explore? The intro call is a chance to sense fit together—no pressure to commit.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=how-coaching-works"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              Book an intro call
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              Explore all services
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
