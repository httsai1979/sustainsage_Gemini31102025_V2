import Head from 'next/head';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function BulletList({ items }) {
  return (
    <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item.title} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <div>
            <p className="font-medium text-slate-900">{item.title}</p>
            {item.description && <p className="mt-1 text-slate-700">{item.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ForYoungProfessionalsPage() {
  const pageTitle = 'Coaching for young professionals';
  const pageDescription =
    'Coaching designed for early-career professionals navigating rapid growth, shifting expectations, and self-leadership.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="Grow into leadership while staying values-led and resourced."
        image="/images/services/experiments.svg"
        imageAlt="Illustration of a young professional exploring options"
      >
        <Link
          href="/contact?from=for-young-professionals"
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
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What tends to show up</h2>
          <BulletList
            items={[
              {
                title: 'First-time leadership stretch',
                description: 'Being promoted faster than expected and wanting support without looking like you cannot handle it.',
              },
              {
                title: 'Managing up and across',
                description: 'Navigating stakeholders with competing priorities while still learning the basics of your role.',
              },
              {
                title: 'Self-doubt and comparison',
                description: 'Wondering if you earned your seat at the table or just happened to be there when the door opened.',
              },
              {
                title: 'Life logistics catching up',
                description: 'Visa renewals, housing, family expectations, or health routines needing attention alongside work goals.',
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How coaching can help</h2>
          <BulletList
            items={[
              {
                title: 'Clarify the leadership you want to practice',
                description: 'Articulate your values, non-negotiables, and what “good” looks like in your context.',
              },
              {
                title: 'Build conversational courage',
                description: 'Plan and rehearse feedback, expectation-setting, or boundary conversations with curiosity and respect.',
              },
              {
                title: 'Sustain pace without burnout',
                description: 'Design rituals and accountability that fit a busy schedule and honour your wellbeing.',
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">A short vignette</h2>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/90 p-6 text-sm leading-6 text-slate-700 shadow-sm">
            <p>
              “M” entered a fintech graduate scheme and quickly became the go-to person for urgent projects. She wanted to keep
              learning yet felt close to burning out. In coaching she mapped what energized her, practiced requesting clearer
              priorities from senior leaders, and built weekly rituals that protected recovery time. Six months later she was
              still delivering strong results without the Sunday-night dread.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Which package fits?</h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Many young professionals start with the{' '}
              <Link href="/services/reset" className="font-semibold text-emerald-700 hover:underline">
                Reset package
              </Link>{' '}
              to stabilise routines and strengthen self-leadership.
            </p>
            <p>
              When stepping into a new role or planning a promotion, the{' '}
              <Link href="/services/transition" className="font-semibold text-emerald-700 hover:underline">
                Transition package
              </Link>{' '}
              offers six sessions to explore identity, expectations, and support systems.
            </p>
            <p>
              For ongoing development, consider the{' '}
              <Link href="/services/deepening" className="font-semibold text-emerald-700 hover:underline">
                Deepening package
              </Link>{' '}
              to strengthen leadership presence over eight sessions.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
