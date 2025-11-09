import Head from 'next/head';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function Card({ title, items }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResetSprintPage() {
  const pageTitle = 'Reset Sprint – 3 sessions to pause, sort and choose your next steps';
  const pageDescription =
    'A short coaching sprint for when life is a bit much and you want a neutral partner to help you choose your next steps.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="For when life is “a bit much”, but you don’t want a 6-month programme."
        image="/images/services/check-in.svg"
        imageAlt="Illustration of pausing and choosing next steps"
      >
        <Link
          href="/contact?from=reset-sprint"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          Book an intro call
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
        >
          Back to services
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Is this for you?</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {[
              'You’re not in crisis, but your current way of working or living feels unsustainable.',
              'You’re circling the same questions in your head and would like a neutral, trained sounding board.',
              'You want clarity on 1–2 key decisions in the next 4–8 weeks.',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we do (3 sessions)</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The sprint is paced but spacious. You set the focus; we help you listen to yourself and test options within your real-world constraints.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              'Session 1 – Lay everything on the table.',
              'Session 2 – Test options with honest constraints.',
              'Session 3 – Commit to 1–3 realistic moves + how you’ll self-check.',
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-emerald-100 bg-white/90 p-6 text-sm leading-6 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <Card
            title="What you leave with"
            items={[
              'A one-page summary of what matters now, what you’re saying yes/no to.',
              '1–3 small, doable experiments instead of 20 open tabs in your head.',
            ]}
          />
          <Card
            title="What this is not"
            items={[
              'Not crisis counselling or emergency support.',
              'Not career coaching in a “fix your CV in 60 minutes” sense.',
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            Use the intro call to see whether a short sprint is the right container. If another type of support fits better, we’ll say so.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=reset-sprint"
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
