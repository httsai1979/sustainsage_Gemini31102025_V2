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

const ICON_CLASS = 'h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700';

function Capsule({ text }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow-sm ring-1 ring-inset ring-emerald-200">
      {text}
    </span>
  );
}

const whoIconMap = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 6.2 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-6.2-3.8-9s1.3-6.2 3.8-9z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14l2-6 2 6-6-2 6-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  balance: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <path d="M12 5v15M7 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 7l-3 5 3 2.5 3-2.5-3-5zm12 0l-3 5 3 2.5 3-2.5-3-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <path d="M5 18h2m3 0h2m3 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 18V9m5 9V6m5 12V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function WhoCard({ card, linkLabel }) {
  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        {whoIconMap[card.icon] ?? whoIconMap.globe}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{card.audience}</p>
          <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-700">{card.description}</p>
      <Link href={card.href} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
        {linkLabel}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function HowStep({ step, index }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700">
        {index + 1}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
        <p className="text-sm leading-6 text-slate-700">{step.summary}</p>
      </div>
    </div>
  );
}

function RealLifeItem({ item }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <p className="text-sm leading-6 text-slate-700">{item.quote}</p>
    </div>
  );
}

export default function Home({ testimonials }) {
  const { t } = useTranslation('home');

  const hero = t('hero', { returnObjects: true });
  const forWhom = t('forWhom', { returnObjects: true });
  const recognise = t('recognise', { returnObjects: true });
  const how = t('how', { returnObjects: true });
  const realLife = t('realLife', { returnObjects: true });
  const faqSection = t('faqSection', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });

  return (
    <MainLayout>
      <section className="mx-auto mt-12 grid max-w-6xl items-center gap-10 px-5 md:mt-20 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="typography flex flex-col gap-6">
          <h1>{hero.headline}</h1>
          {hero?.highlights?.length ? (
            <div className="flex flex-wrap gap-3">
              {hero.highlights.map((item) => (
                <Capsule key={item} text={item} />
              ))}
            </div>
          ) : null}
          <p>{hero.subheadline}</p>
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
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="typography max-w-3xl flex flex-col gap-4">
          <h2>{forWhom.title}</h2>
          <p>{forWhom.intro}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {forWhom.cards.map((card) => (
            <WhoCard key={card.href} card={card} linkLabel={forWhom.linkLabel} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-6 py-12 md:px-10">
        <div className="typography">
          <h2>{recognise.title}</h2>
        </div>
        <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
          {recognise.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="typography max-w-3xl flex flex-col gap-4">
          <h2>{how.title}</h2>
          {how?.intro ? <p>{how.intro}</p> : null}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {how.steps.map((step, index) => (
            <HowStep key={step.title} step={step} index={index} />
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-700">{how.ownership}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-emerald-700">
          <Link href={how.ctaHref} className="inline-flex items-center gap-2 hover:underline">
            {how.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
          {faqLink?.label ? (
            <Link href={faqLink.href} className="inline-flex items-center gap-2 hover:underline">
              {faqLink.label}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="typography max-w-3xl flex flex-col gap-4">
          <h2>{realLife.title}</h2>
          <p>{realLife.intro}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {realLife.items.map((item) => (
            <RealLifeItem key={item.quote} item={item} />
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-600">{realLife.disclaimer}</p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{faqSection.title}</h2>
            <p className="text-base leading-7 text-slate-600">{faqSection.body}</p>
            <ul className="space-y-2 text-sm leading-6 text-slate-700">
              {faqSection.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl bg-emerald-50/70 p-6 text-sm leading-6 text-slate-700">
            <p>{faqSection.summary}</p>
            <Link href={faqSection.ctaHref} className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:underline">
              {faqSection.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
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
