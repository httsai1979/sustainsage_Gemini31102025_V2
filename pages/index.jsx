import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Testimonials from '@/components/Testimonials';
import MainLayout from '@/components/layout/MainLayout';
import { loadJSON } from '@/lib/content';

const BUTTON_PRIMARY =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800';
const BUTTON_SECONDARY =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100';

function ForWhomCard({ card, learnMoreLabel }) {
  return (
    <Link
      href={card.href}
      className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-emerald-50">
            <Image src={card.icon} alt="" fill sizes="48px" className="object-contain p-3" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{card.target}</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">{card.title}</h3>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-600">{card.scenario}</p>
        <ul className="space-y-2 text-sm leading-6 text-slate-700">
          {card.questions.map((question) => (
            <li key={question} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{question}</span>
            </li>
          ))}
        </ul>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {learnMoreLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

function HowStep({ step }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{step.description}</p>
    </div>
  );
}

function FaqItem({ item }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
    </div>
  );
}

export default function Home({ testimonials }) {
  const { t } = useTranslation('home');

  const hero = t('hero', { returnObjects: true });
  const forWhom = t('forWhom', { returnObjects: true });
  const recognise = t('recognise', { returnObjects: true });
  const how = t('how', { returnObjects: true });
  const faq = t('faq', { returnObjects: true });

  return (
    <MainLayout>
      <section className="mx-auto mt-12 grid max-w-6xl items-center gap-10 px-5 md:mt-20 md:grid-cols-2 md:px-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero.headline}</h1>
          <p className="text-base leading-7 text-slate-600">{hero.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={BUTTON_PRIMARY}>
              {hero.primaryCta}
            </Link>
            <Link href="/services" className={BUTTON_SECONDARY}>
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100">
          <Image
            src="/images/hero/main.jpg"
            alt={hero.imageAlt}
            width={1600}
            height={900}
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{forWhom.title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{forWhom.description}</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {forWhom.cards.map((card) => (
            <ForWhomCard key={card.href} card={card} learnMoreLabel={forWhom.learnMore} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-6 py-12 md:px-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{recognise.title}</h2>
        <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
          {recognise.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{how.title}</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {how.steps.map((step) => (
            <HowStep key={step.title} step={step} />
          ))}
        </div>
        <div className="mt-8">
          <Link href={how.moreLinkHref} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
            {how.moreLinkLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{faq.title}</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {faq.items.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 text-sm leading-6 text-slate-700 md:flex-row md:items-center md:justify-between">
          <p>{faq.footer.text}</p>
          <Link
            href={faq.footer.linkHref}
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:underline"
          >
            {faq.footer.linkLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <Testimonials items={testimonials} />
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  const testimonials = loadJSON('testimonials', locale);

  return {
    props: {
      testimonials,
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}
