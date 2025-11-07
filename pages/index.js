import Image from 'next/image';
import Link from 'next/link';

import StickyCTA from '@/components/StickyCTA';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'SustainSage Coaching',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SustainSage Group Ltd.',
    url: SITE_URL,
  },
];

function HomePage() {
  const { t } = useTranslation('home');
  const whoWeHelp = t('whoWeHelp.items', { returnObjects: true });
  const howCoachingWorks = t('howCoachingWorks.items', { returnObjects: true });
  const whySustainSage = t('whySustainSage.items', { returnObjects: true });
  const faqs = t('faqs', { returnObjects: true });
  const founders = t('founders.people', { returnObjects: true });
  const whoWeHelpIntro = t('whoWeHelp.intro');
  const howCoachingWorksIntro = t('howCoachingWorks.intro');
  const whySustainSageIntro = t('whySustainSage.intro');
  const faqIntro = t('faqIntro');

  return (
    <>
      <Hero
        image="/hero/home.svg"
        priority
        align="left"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        eyebrow={t('hero.eyebrow')}
      >
        <Link
          href="/contact"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 focus-visible:ring-white"
        >
          {t('hero.primaryCta')}
        </Link>
        <a
          href="#how-coaching-works"
          className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
        >
          {t('hero.secondaryCta')}
        </a>
      </Hero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('whoWeHelp.title')}
            </h2>
          </Reveal>
          {whoWeHelpIntro && (
            <Reveal className="reveal-1">
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {whoWeHelpIntro}
              </p>
            </Reveal>
          )}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whoWeHelp.map((item) => (
              <HoverLift key={item.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section id="how-coaching-works" className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('howCoachingWorks.title')}
            </h2>
          </Reveal>
          {howCoachingWorksIntro && (
            <Reveal className="reveal-1">
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {howCoachingWorksIntro}
              </p>
            </Reveal>
          )}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {howCoachingWorks.map((step) => (
              <HoverLift key={step.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('whySustainSage.title')}
            </h2>
          </Reveal>
          {whySustainSageIntro && (
            <Reveal className="reveal-1">
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {whySustainSageIntro}
              </p>
            </Reveal>
          )}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {whySustainSage.map((item) => (
              <HoverLift key={item.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('faqTitle')}
            </h2>
          </Reveal>
          {faqIntro && (
            <Reveal className="reveal-1">
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {faqIntro}
              </p>
            </Reveal>
          )}
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-12 text-emerald-50 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t('founders.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-100 sm:text-base">
              {t('founders.subtitle')}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {founders.map((person) => (
              <HoverLift key={person.name} className="h-full">
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-emerald-500/40 bg-emerald-800/60 p-6 shadow-xl shadow-black/20">
                  <div className="flex items-center gap-4">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={80}
                      height={80}
                      className="h-16 w-16 rounded-full border border-emerald-300/40 bg-emerald-700 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                      <p className="text-sm text-emerald-200">{person.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-emerald-100">{person.bio}</p>
                </article>
              </HoverLift>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 focus-visible:ring-white"
            >
              {t('founders.cta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>

      <StickyCTA />
    </>
  );
}

HomePage.layoutProps = (pageProps) => {
  const locale = pageProps?._nextI18Next?.initialLocale;
  const store = pageProps?._nextI18Next?.initialI18nStore?.[locale]?.home;

  return {
    title: store?.seo?.title ?? 'SustainSage | Coaching',
    desc: store?.seo?.description ?? 'Calm, bilingual coaching for UK transitions, aligned with ICF ethics.',
    jsonLd: HOME_JSON_LD,
  };
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)),
    },
  };
}

export default HomePage;
