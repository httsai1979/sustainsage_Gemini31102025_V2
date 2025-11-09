import Head from 'next/head';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function SessionItem({ number, title, description }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-emerald-800">{`Session ${number}`} – {title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
    </div>
  );
}

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

const SESSION_CONTENT = [
  {
    number: 1,
    title: 'Mapping your reality',
    description:
      'Clarify what has changed, what’s at stake, and what “good enough for now” looks like.',
  },
  {
    number: 2,
    title: 'Values & non-negotiables',
    description: 'Identify what must stay true for you (health, care work, finances, identity).',
  },
  {
    number: 3,
    title: 'Options & small experiments',
    description: 'Turn vague ideas (“better job”, “better balance”) into 2–3 testable moves.',
  },
  {
    number: 4,
    title: 'Boundaries & conversations',
    description: 'Prepare key conversations (manager, partner, family, self) in a grounded way.',
  },
  {
    number: 5,
    title: 'Adjust & deepen',
    description: 'Review experiments, refine your focus, and widen options if needed.',
  },
  {
    number: 6,
    title: 'Integrate & future-proof',
    description:
      'Capture what you’ve learned, decide what support you still want, and how you’ll notice if you’re drifting.',
  },
];

export default function TransitionCoachingPage() {
  const pageTitle = 'Transition Coaching – 6 sessions for relocation & role change';
  const pageDescription =
    'A structured yet gentle coaching space to clarify your move to the UK, stabilise change, and shape work that fits your real life.';

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title={pageTitle}
        subtitle="A structured yet gentle space to think clearly, stabilise your move, and shape work that fits your real life in the UK."
        image="/images/services/transition.svg"
        imageAlt="Illustration representing transition coaching support"
      >
        <Link
          href="/contact?from=transition-coaching"
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
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Is this for you?</h2>
          <BulletList
            items={[
              'You’ve recently moved (or are about to move) to the UK and feel pulled between practical tasks, cultural differences, and expectations from home.',
              'You’re stepping into a new role or sector and want to design how you show up, rather than “winging it” until burnout.',
              'You’re tired of advice that doesn’t get your context. You want a calm partner to think with, not someone to tell you who to be.',
              'You’d like a clear frame: what to focus on in the next 3–6 months, without pretending everything can be fixed at once.',
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we do together (6 sessions)</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Each session builds on what you notice and need. You lead the agenda; we support with reflection, questions, and structure.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SESSION_CONTENT.map((session) => (
              <SessionItem key={session.number} {...session} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How we work (ICF aligned)</h2>
          <BulletList
            items={[
              'You lead the agenda. We bring questions, reflection and structure.',
              'We do not diagnose, fix you, or promise outcomes.',
              'If therapy, legal or immigration advice is more appropriate, we will name it and signpost where we can.',
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">A real-world example</h2>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-sm">
            <p className="text-base leading-7 text-slate-700">
              “A mid-30s professional moved to the UK with their partner. No local network, unsure whether to restart in the same industry. Over 6 sessions we mapped constraints, clarified financial & family needs, tested two role directions, and set boundaries with an employer who kept “stretching” expectations. They left with a concrete 3–6 month plan and language to explain their choices at home and at work.”
            </p>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            Every coaching journey is different. The example above is anonymised and shared with permission to illustrate how we work.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            Use the intro call to sense whether this frame feels useful. If not, we won’t convince you otherwise.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=transition-coaching"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              Book an intro call
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
            >
              Explore all services
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
