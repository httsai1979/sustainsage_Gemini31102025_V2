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
        <li key={item.title ?? item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <div>
            {item.title ? (
              <>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-slate-700">{item.description}</p>
              </>
            ) : (
              <span>{item}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ApproachPage() {
  const pageTitle = 'Our coaching approach | SustainSage';
  const pageDescription =
    'Understand the ICF-aligned principles, feel, ethics, and standards that ground SustainSage coaching sessions.';

  const groundingPrinciples = [
    {
      title: 'ICF Code of Ethics in practice',
      description:
        'We contract clearly, hold confidentiality with agreed limits, and keep the partnership client-led, as outlined by the ICF core competencies.',
    },
    {
      title: 'Trauma-aware, not trauma-therapy',
      description:
        'We recognise how nervous systems react under pressure, slowing down or pausing when needed, and we refer out when therapeutic care is the safer fit.',
    },
    {
      title: 'Multilingual and intersectional sensitivity',
      description:
        'Sessions can move between English, Mandarin, or mixed registers. We actively name power dynamics and design choices that respect culture, identities, and access.',
    },
  ];

  const sessionFeel = [
    'Unhurried conversations—silence and pacing are welcome, and we do not rush decisions or force breakthroughs.',
    'Structure with freedom—you set the focus while we offer frameworks, reflections, and experiments to work with.',
    'Genuine curiosity—we regularly ask “Does this actually serve you?” and adapt based on what you say.',
    'Grounded encouragement—no toxic positivity, just honest acknowledgement of effort, context, and limits.',
  ];

  const ethicsBoundaries = [
    {
      title: 'Coaching only',
      description: 'We do not diagnose, treat trauma, or offer legal, immigration, or medical advice.',
    },
    {
      title: 'Clear agreements',
      description: 'Every package includes written contracting on goals, logistics, data handling, and fees.',
    },
    {
      title: 'Safeguarding first',
      description: 'If risks surface beyond coaching scope, we pause and point you to specialised resources.',
    },
  ];

  const standards = [
    {
      title: 'Ongoing supervision and CPD',
      description: 'We meet regularly with ICF-accredited supervisors and invest in annual training to stay sharp.',
    },
    {
      title: 'Reflective practice',
      description: 'We debrief themes, bias, and systemic impact after sessions to keep learning.',
    },
    {
      title: 'Honest referrals',
      description: 'When coaching is not the right container, we name it early and connect you with alternative supports instead of holding you to a package.',
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Hero
        title="Our coaching approach"
        subtitle="Grounded in ICF principles, held with cultural sensitivity, and paced so you stay in choice."
        image="/hero/about.svg"
        imageAlt="Illustration representing our coaching approach"
      >
        <Link
          href="/services/how-coaching-works"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          See the full journey
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
        >
          Explore services
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What grounds our practice</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            SustainSage coaches are credentialed with the International Coaching Federation (ICF). We translate its ethics and
            core competencies into daily habits that protect your agency and context.
          </p>
          <BulletList items={groundingPrinciples} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How sessions feel</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Expect a collaborative, reflective space. Each session begins with what matters most to you, and we co-create the
            pace, tools, and accountability that match your capacity.
          </p>
          <BulletList items={sessionFeel} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Ethics &amp; boundaries</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Boundaries keep coaching purposeful and safe. We align every decision with the ICF ethical framework and our
            commitment to do no harm.
          </p>
          <BulletList
            items={[
              ...ethicsBoundaries,
              {
                title: 'Informed navigation',
                description: (
                  <>
                    Review how we work end-to-end in our detailed guide to the process via the{' '}
                    <Link href="/services/how-coaching-works" className="font-semibold text-emerald-700 hover:text-emerald-800">
                      How coaching works
                    </Link>{' '}
                    page.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How we keep standards</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Coaching is a profession, not a side gig. We invest in the structures that keep our practice accountable to you and
            to the wider coaching community.
          </p>
          <BulletList
            items={[
              ...standards,
              {
                title: 'Transparent questions',
                description: (
                  <>
                    Our{' '}
                    <Link href="/faq" className="font-semibold text-emerald-700 hover:text-emerald-800">
                      FAQ
                    </Link>{' '}
                    covers fees, rescheduling, languages, and more—explore it anytime or ask us directly.
                  </>
                ),
              },
            ]}
          />
          <div className="mt-10 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Next steps</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Ready to sense how this approach could support you? Browse our{' '}
              <Link href="/services" className="font-semibold text-emerald-700 hover:text-emerald-800">
                coaching services
              </Link>{' '}
              or schedule an intro call from the{' '}
              <Link href="/services/how-coaching-works" className="font-semibold text-emerald-700 hover:text-emerald-800">
                How coaching works
              </Link>{' '}
              guide.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
