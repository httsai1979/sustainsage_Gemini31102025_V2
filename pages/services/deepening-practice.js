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

export default function DeepeningPracticePage() {
  const pageTitle = 'Deepening Practice – 8 sessions for leaders & practitioners';
  const pageDescription =
    'An eight-session coaching space for leaders and practitioners who want a rigorous, human thinking partner.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="Long-term space to refine how you think, decide, relate and lead."
        image="/images/services/confidence.svg"
        imageAlt="Illustration for deepening leadership practice"
      >
        <Link
          href="/contact?from=deepening-practice"
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
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">For who</h2>
          <BulletList
            items={[
              'People leading teams, projects or communities who already reflect, but want a more rigorous thinking partner.',
              'Coaches / helpers who want a space where they can be human, not “the professional”.',
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we focus on</h2>
          <BulletList
            items={[
              'Your real dilemmas (not case studies).',
              'How you use power, voice, and boundaries.',
              'How to stay human without over-giving.',
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">ICF & ethics</h2>
          <BulletList
            items={[
              'Clear confidentiality boundaries.',
              'Regular check-ins on whether this still serves you.',
              'Explicit encouragement to seek supervision/therapy where needed; we don’t try to be everything.',
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            Use the intro call to check fit. If a different container or supervision is more appropriate, we will say so plainly.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=deepening-practice"
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
