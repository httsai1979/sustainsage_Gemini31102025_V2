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

export default function ForParentsReturningPage() {
  const pageTitle = 'Coaching for parents returning to work';
  const pageDescription =
    'Support for parents designing sustainable agreements at home and at work while re-entering or recalibrating roles.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="Return to work in ways that honour care roles, ambition, and rest."
        image="/images/services/returning.svg"
        imageAlt="Illustration of balancing caregiving and work"
      >
        <Link
          href="/contact?from=for-parents-returning"
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
                title: 'Multiple calendars to juggle',
                description: 'Nursery schedules, partner shifts, elder care, and your energy levels all needing space.',
              },
              {
                title: 'Guilt from all directions',
                description: 'Feeling like work is taking from family or vice versa, no matter what choice you make.',
              },
              {
                title: 'Shifts in identity',
                description: 'Wanting colleagues to see your expertise beyond the “new parent” label.',
              },
              {
                title: 'Boundaries questioned',
                description: 'Well-meaning advice or assumptions from family, managers, or your own internal voice.',
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
                title: 'Co-design rhythms with your support system',
                description: 'Map responsibilities, renegotiate agreements, and plan how to revisit them when life shifts.',
              },
              {
                title: 'Stay connected to what matters',
                description: 'Name your anchors—rest, presence, financial security—and choose actions aligned with them.',
              },
              {
                title: 'Build confidence in conversations',
                description: 'Practice boundary-setting with managers, partners, or family so you can advocate without apology.',
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
              “D” returned to her policy role after parental leave and found every meeting scheduled past nursery pick-up. Coaching
              offered space to explore the frustration without judgement, clarify her boundaries, and prepare a collaborative
              conversation with her team. She left with a revised schedule, a shared childcare rota at home, and a personal
              check-in ritual that keeps burnout signals visible.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Which package fits?</h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Many parents return with the{' '}
              <Link href="/services/reset" className="font-semibold text-emerald-700 hover:underline">
                Reset package
              </Link>{' '}
              to rebuild routines and confidence over four sessions.
            </p>
            <p>
              For bigger career pivots or role redesign, the{' '}
              <Link href="/services/transition" className="font-semibold text-emerald-700 hover:underline">
                Transition package
              </Link>{' '}
              offers deeper exploration across six sessions.
            </p>
            <p>
              If you are already settled but want to sharpen leadership presence, consider the{' '}
              <Link href="/services/deepening" className="font-semibold text-emerald-700 hover:underline">
                Deepening package
              </Link>{' '}
              or reach out via the{' '}
              <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">
                contact page
              </Link>{' '}
              to talk through options.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
