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

export default function ForNewcomersToUkPage() {
  const pageTitle = 'Coaching for newcomers to the UK';
  const pageDescription =
    'Scenario-based coaching support for people settling into UK work and life rhythms without having to translate everything from scratch.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="Make sense of work, culture, and expectations—without having to translate your whole story from scratch."
        image="/images/services/new-to-uk.svg"
        imageAlt="Illustration representing newcomers to the UK"
      >
        <Link
          href="/contact?from=for-newcomers-to-uk"
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
                title: '想留／想走的拉扯',
                description: 'A constant scan of visas, timelines, and whether staying supports your goals and relationships.',
              },
              {
                title: '語言與職場文化不對齊',
                description: 'You can do the job, yet spoken or unwritten rules still feel like a test you did not study for.',
              },
              {
                title: '家人在不同國家、照顧責任',
                description: 'Coordinating family care, remittances, and time zones while trying to settle yourself.',
              },
              {
                title: 'Belonging while staying grounded',
                description: 'Wanting to build community without losing the parts of you that made the move possible.',
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
                title: 'Name what you want without pressure to decide today',
                description: 'We map options, boundaries, and risks so your decisions honour visas, values, and energy.',
              },
              {
                title: 'Translate cultural signals into clear choices',
                description: 'Slow down workplace dynamics, decode feedback, and plan consent-based conversations.',
              },
              {
                title: 'Design support systems across borders',
                description: 'Clarify who is in your corner, what you can ask for, and how to stay resourced while settling in.',
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
              “L” moved from Taipei to London on a partner visa. Her previous leadership role carried weight back home, yet in the
              UK she felt reduced to “the new one who speaks great English”. Coaching sessions gave her a weekly space to name the
              grief of starting over, rehearse cross-cultural conversations with her manager, and design check-ins with family in
              Taiwan so the distance felt less punishing. Within three months she negotiated clearer responsibilities and chose a
              community project that made the city feel more livable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Which package fits?</h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Most newcomers start with the{' '}
              <Link href="/services/transition" className="font-semibold text-emerald-700 hover:underline">
                Transition package
              </Link>{' '}
              to land gently and keep agency during the first 3–6 months in the UK.
            </p>
            <p>
              If you are already here but feel depleted, the{' '}
              <Link href="/services/reset" className="font-semibold text-emerald-700 hover:underline">
                Reset package
              </Link>{' '}
              creates a short, contained space to reorient and make sustainable agreements.
            </p>
            <p>
              Still unsure? Browse the{' '}
              <Link href="/faq" className="font-semibold text-emerald-700 hover:underline">
                FAQ
              </Link>{' '}
              or book an intro call to see if coaching is the right container right now.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
