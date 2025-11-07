import { useState } from 'react';
import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

function DetailList({ title, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <h4 className="text-sm font-semibold text-emerald-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PackageCard({ icon, pkg, detail, labels, isOpen, onToggle }) {
  const contentId = `services-package-${pkg.key}`;

  return (
    <article className={`${CARD_BASE_CLASS} flex h-full flex-col`}>
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{pkg.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{pkg.description}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{pkg.details}</p>
      {detail?.anchorLabel && detail?.anchorHref ? (
        <Link
          href={detail.anchorHref}
          className="mt-4 inline-flex text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          {detail.anchorLabel}
        </Link>
      ) : null}

      {detail ? (
        <div className="mt-6 border-t border-emerald-100 pt-4">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className="flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span>{isOpen ? labels.close : labels.view}</span>
            <span
              aria-hidden="true"
              className={`inline-block transform text-base transition-transform duration-200 motion-reduce:transition-none ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              ▾
            </span>
          </button>

          {isOpen && (
            <Reveal className="reveal-1">
              <div
                id={contentId}
                className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left shadow-sm"
              >
                <DetailList title={labels.for} items={detail.for} />
                <DetailList title={labels.includes} items={detail.includes} />
                <DetailList title={labels.outcomes} items={detail.outcomes} />
                <DetailList title={labels.not} items={detail.not} />
                <DetailList title={labels.notes} items={detail.notes} />
              </div>
            </Reveal>
          )}
        </div>
      ) : null}
    </article>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const packages = t('individual.packages', { returnObjects: true });
  const packagesDetail = t('packagesDetail', { returnObjects: true });
  const detailLabels = t('detailLabels', { returnObjects: true });
  const organisation = t('organisation', { returnObjects: true });
  const practical = t('practical', { returnObjects: true });
  const faqSnippet = t('faqSnippet.items', { returnObjects: true });
  const anchorSections = t('anchorSections', { returnObjects: true });
  const howSteps = t('howItWorks.steps', { returnObjects: true });
  const [openKey, setOpenKey] = useState(null);

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Coaching services illustration' })}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('hero.primaryCtaAria')}>
          {t('hero.primaryCta')}
        </Link>
        <Link href="/contact" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="individual-services">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('individual.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('individual.intro')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg, index) => {
              const iconSet = ['🌱', '🧭', '🌿', '💡'];
              const detail = packagesDetail[pkg.key];
              const isOpen = openKey === pkg.key;

              return (
                <PackageCard
                  key={pkg.title}
                  icon={iconSet[index % iconSet.length]}
                  pkg={pkg}
                  detail={detail}
                  labels={detailLabels}
                  isOpen={isOpen}
                  onToggle={() => setOpenKey((previous) => (previous === pkg.key ? null : pkg.key))}
                />
              );
            })}
          </div>
        </div>
      </section>

      {anchorSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`${index % 2 === 0 ? 'bg-emerald-50/60' : 'bg-white'} py-16 sm:py-20`}
        >
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {section.eyebrow}
              </p>
            </Reveal>
            <Reveal className="reveal-1">
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {section.title}
              </h2>
            </Reveal>
            <Reveal className="reveal-2">
              <p className="mt-4 text-base leading-7 text-slate-600">{section.intro}</p>
            </Reveal>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <Reveal className="reveal-3">
                <div className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                    {section.labels.suitable}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {section.suitable.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-emerald-800">
                    {section.labels.conversation}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {section.conversation.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal className="reveal-4">
                <div className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                    {section.labels.structure}
                  </h3>
                  <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {section.structure.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-1.5 h-5 w-5 rounded-full bg-emerald-100 text-center text-xs font-semibold text-emerald-700">
                          {item.split(':')[0]}
                        </span>
                        <span>{item.split(':').slice(1).join(':').trim()}</span>
                      </li>
                    ))}
                  </ol>
                  <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-emerald-800">
                    {section.labels.not}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {section.not.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <Reveal className="reveal-5">
              <Link
                href={section.ctaHref}
                className="mt-10 inline-flex items-center rounded-full border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                {section.cta}
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="organisation">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('organisation.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-900">{organisation.intro}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {organisation.points.map((point) => (
              <article key={point} className={CARD_BASE_CLASS}>
                <p className="text-sm leading-6 text-slate-600">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="how-it-works">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('howItWorks.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('howItWorks.intro')}</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {howSteps.map((step, index) => (
              <Reveal key={step.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <p className="text-sm font-semibold text-emerald-700">{`${index + 1}. ${step.title}`}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="practical-info">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('practical.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{practical.intro}</p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
            {practical.items.map((item) => (
              <li key={item} className={CARD_BASE_CLASS}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="faq">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('faqSnippet.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-900">{t('faqSnippet.intro')}</p>
          <dl className="mt-10 space-y-6">
            {faqSnippet.map((item) => (
              <div key={item.question} className={CARD_BASE_CLASS}>
                <dt className="text-lg font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-emerald-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary" aria-label={t('cta.primaryAria')}>
              {t('cta.primaryCta')}
            </Link>
            <Link href="/contact" className="btn-secondary" aria-label={t('cta.secondaryAria')}>
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 pb-20">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
