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

export default function ForCareerReturnersPage() {
  const pageTitle = 'Coaching for career returners';
  const pageDescription =
    'Support for experienced professionals re-entering the workforce after relocation, sabbatical, or care responsibilities.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="Rebuild momentum after a break without pretending the last chapter did not happen."
        image="/images/services/transition.svg"
        imageAlt="Illustration symbolising a fresh chapter"
      >
        <Link
          href="/contact?from=for-career-returners"
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
                title: 'Story gaps on your CV',
                description: 'Wondering how to speak about a break without shrinking experience or oversharing personal reasons.',
              },
              {
                title: 'Confidence wobble',
                description: 'Old strengths are still there, yet interviews or networking feel sharper than expected.',
              },
              {
                title: 'Changed priorities',
                description: 'You want to re-enter with purpose, not slide into the first offer that arrives.',
              },
              {
                title: 'Logistics plus emotions',
                description: 'Balancing job search tasks with family care, health needs, or new city admin.',
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
                title: 'Integrate your break into a coherent narrative',
                description: 'Clarify what you learned, how it shapes your work now, and how you choose to share it.',
              },
              {
                title: 'Practice grounded conversations',
                description: 'Rehearse interviews, networking, or boundary-setting chats so you can show up steady and curious.',
              },
              {
                title: 'Design a humane pace',
                description: 'Break the return into experiments and agreements that respect your capacity and financial realities.',
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
              “R” had managed teams across Asia before pausing work to relocate and care for an elder. Two years later she wanted
              to re-enter consulting but worried the gap would eclipse her track record. Coaching helped her surface the skills
              she used while caregiving, map what kind of firm would respect her boundaries, and practice a narrative that felt
              honest. Within four sessions she chose a consultancy that welcomed her portfolio of community work as part of her
              leadership story.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Which package fits?</h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Most returners choose the{' '}
              <Link href="/services/transition" className="font-semibold text-emerald-700 hover:underline">
                Transition package
              </Link>{' '}
              to map their new chapter, practice conversations, and design a paced comeback.
            </p>
            <p>
              If you need a shorter container while juggling care, the{' '}
              <Link href="/services/reset" className="font-semibold text-emerald-700 hover:underline">
                Reset package
              </Link>{' '}
              holds four sessions to steady confidence and set sustainable rhythms.
            </p>
            <p>
              Not sure where to start? Explore the{' '}
              <Link href="/services/how-coaching-works" className="font-semibold text-emerald-700 hover:underline">
                coaching process
              </Link>{' '}
              or book a call to see if coaching matches your stage.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
