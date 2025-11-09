import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Testimonials from '@/components/Testimonials';
import { loadJSON } from '@/lib/content';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const cards = {
  audiences: [
    {
      href: '/for/mid-career-returners',
      title: 'Mid-career returners',
      summary: 'Rebuild momentum after a break or relocation without ignoring family realities.',
      icon: '/images/services/transition.svg',
    },
    {
      href: '/for/newcomers-to-uk',
      title: 'Newcomers to the UK',
      summary: 'Navigate visas, work culture and belonging with someone who understands nuance.',
      icon: '/images/services/new-to-uk.svg',
    },
    {
      href: '/for/parents-returning-to-work',
      title: 'Parents returning to work',
      summary: 'Design agreements and rhythms that honour care roles and leadership goals.',
      icon: '/images/services/returning.svg',
    },
  ],
  services: [
    {
      href: '/services/transition',
      title: 'Transition package',
      summary: 'Six sessions to land gently in a new chapter.',
      icon: '/images/services/transition.svg',
    },
    {
      href: '/services/reset',
      title: 'Reset package',
      summary: 'Four sessions to rebuild routines after depletion.',
      icon: '/images/services/returning.svg',
    },
    {
      href: '/services/deepening',
      title: 'Deepening package',
      summary: 'Eight sessions to deepen leadership presence and ethics.',
      icon: '/images/services/experiments.svg',
    },
  ],
};

function IconCard({ item }) {
  return (
    <Link
      href={item.href}
      className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-emerald-50">
          <Image src={item.icon} alt="" fill sizes="56px" className="object-contain p-3" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
        </div>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        Learn more
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default function Home({ testimonials }) {
  const faq = [
    {
      id: 'faq-1',
      q: 'What happens in the first call?',
      a: 'A calm 20-minute chat to understand your context, confirm fit and outline next steps—no pressure to say yes.',
    },
    {
      id: 'faq-2',
      q: 'Do you coach in Chinese?',
      a: 'Yes. We coach in English (UK) and Mandarin, switching languages when it helps you express nuance.',
    },
    {
      id: 'faq-3',
      q: 'Where can I read more?',
      a: 'Explore the full FAQ for ethics, practicalities and how coaching differs from mentoring or therapy.',
      link: { href: '/faq', label: 'Read all FAQ' },
    },
  ];

  return (
    <>
      <section className="mx-auto mt-10 grid max-w-6xl items-stretch gap-6 px-5 md:mt-16 md:grid-cols-2 md:px-8">
        <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Coaching that honours complexity</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            Thoughtful support for people moving through change.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            We partner with mid-career returners, newcomers to the UK and leaders who carry care or community responsibilities. Sessions stay practical and honest, always within ICF coaching ethics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}>
              Book a 20-min intro call
            </Link>
            <Link
              href="/services/how-coaching-works"
              className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              How coaching works
            </Link>
          </div>
          <p className="mt-3 text-sm text-emerald-700">
            Questions?{' '}
            <Link href="/faq" className="font-semibold hover:underline">
              See FAQ
            </Link>
          </p>
        </div>
        <figure className="overflow-hidden rounded-3xl border border-emerald-100">
          <Image src="/images/hero/main.jpg" alt="Calm workspace" width={1600} height={900} priority />
        </figure>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Who we support</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Explore pages tailored to your context. Each one shares common scenarios, coaching topics and boundaries so you can sense the fit before we speak.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.audiences.map((item) => (
            <IconCard key={item.href} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Coaching pathways</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Our three packages share clear agreements, confidentiality and honest conversation. Choose the focus that matches your season; we’ll customise pace and language together.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.services.map((item) => (
            <IconCard key={item.href} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-6 py-12 md:px-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What sessions feel like</h2>
        <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>We start by naming what is most alive—logistics, emotions or both—without rushing to fix.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>Together we map systems, options and consent-based experiments you can test between sessions.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>You leave with choices that respect your pace. We check in about support needs and boundaries as we go.</span>
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/services/how-coaching-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
          >
            Learn more about how coaching works
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 md:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Quick answers</h2>
        <div className="mt-6 space-y-6">
          {faq.map((item) => (
            <div key={item.id} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.a}</p>
              {item.link && (
                <Link href={item.link.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline">
                  {item.link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <Testimonials items={testimonials} />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const testimonials = loadJSON('testimonials', locale);
  return {
    props: {
      testimonials,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
