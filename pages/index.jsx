import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { loadJSON } from '@/lib/content';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import Testimonials from '@/components/Testimonials';

export default function Home({ testimonials }) {
  const faq = [
    { id: 'faq-1', q: 'What happens in the first call?', a: 'A calm 20-minute chat to understand your context and next step.' },
    { id: 'faq-2', q: 'Do you coach in Chinese?', a: 'Yes. English (UK) and Traditional Chinese.' },
  ];

  return (
    <>
      <section className="mx-auto mt-10 grid max-w-6xl items-stretch gap-6 px-5 md:mt-16 md:grid-cols-2 md:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <p className="text-xs font-semibold uppercase text-emerald-700">Coaching that respects your reality</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            Calm, practical support for people in transition.
          </h1>
          <p className="mt-3 text-slate-600">
            Pragmatic 1:1 and small-group coaching for mid-career returners, UK newcomers, and graduates.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white"
            >
              Book a 20-min chat
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center rounded-xl border border-emerald-700 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              Browse free tools
            </Link>
          </div>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-slate-200">
          <Image src="/images/hero/main.jpg" alt="Calm workspace" width={1600} height={900} priority />
        </figure>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-5 md:px-8">
        <h2 className="text-xl font-bold text-slate-900">Simple, focused programmes</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card title="Return-to-Work Sprint" desc="4 sessions in 4 weeks to rebuild momentum." href="/services#return" cta="Learn more" />
          <Card title="UK Job-Ready" desc="Understand local hiring rhythms and present clearly." href="/services#uk" cta="Learn more" />
          <Card title="Confidence Reset" desc="Short cycle to quiet the inner critic." href="/services#confidence" cta="Learn more" />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-5 md:px-8">
        <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
        <div className="mt-4">
          <Accordion items={faq} />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
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
