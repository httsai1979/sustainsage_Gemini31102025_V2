import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import BulletHighlights from '@/components/Sections/BulletHighlights';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const FALLBACK_TITLES = {
  who: 'Who this is for',
  topics: 'What we work on',
  how: 'How it works',
  approach: 'Our coaching approach',
  boundaries: 'Our boundaries',
  not: 'What this is not',
  reflection: 'Questions to reflect on',
  suitable: 'Who this is for',
  process: 'How this flows',
  icf: 'Boundaries & ethics',
  cases: 'Composite cases',
};

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function ListCard({ title, items = [] } = {}) {
  if (!title || !items || items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListCard.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
};

function ReflectionCard({ title, items = [] } = {}) {
  if (!title || !items || items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className="mt-0.5 font-semibold text-emerald-700">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

ReflectionCard.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
};

function CaseCard({ title, body } = {}) {
  if (!title && !body) {
    return null;
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
      {body && <p className="mt-4 text-sm leading-6 text-slate-700">{body}</p>}
    </div>
  );
}

CaseCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};


export default function ServiceDetailPage({ serviceKey, heroImage, heroAlt }) {
  const { t } = useTranslation('serviceDetails');
  const sectionTitles = { ...FALLBACK_TITLES, ...t('sectionTitles', { returnObjects: true }) };
  const detail = t(serviceKey, { returnObjects: true }) || {};
  const hasDetail = detail && Object.keys(detail).length > 0;

  if (!hasDetail) {
    const fallbackTitle = t('missing.title', { defaultValue: 'Service not available right now' });
    const fallbackDescription = t('missing.description', {
      defaultValue:
        'We could not load this service detail. Please return to the overview or contact us to find the right support.',
    });

    return (
      <MainLayout title="SustainSage coaching service" desc={fallbackDescription}>
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{fallbackTitle}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{fallbackDescription}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/services"
                className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
              >
                {t('backToOverview', { defaultValue: 'Back to all services' })}
              </Link>
              <Link
                href="/contact"
                className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
              >
                {t('missing.contact', { defaultValue: 'Contact us directly' })}
              </Link>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  const who = safeArray(detail.who);
  const topics = safeArray(detail.topics);
  const how = safeArray(detail.how);
  const approach = safeArray(detail.approach);
  const boundaries = safeArray(detail.boundaries);
  const notIncluded = safeArray(detail.notIncluded);
  const notItems = [...safeArray(detail.not), ...notIncluded];
  const reflection = safeArray(detail.reflection);
  const slug = detail.slug || serviceKey;
  const pageTitle = detail.title ? `${detail.title} | SustainSage` : 'SustainSage coaching service';
  const description = detail.tagline || detail.summary || '';
  const heroSubtitle = detail.tagline || detail.summary || '';
  const buttonLabel = detail.ctaButton || t('defaultCta', { defaultValue: 'Book a 20-minute chat' });

  const modernSuitable = safeArray(detail?.suitable?.bullets);
  const modernProcess = safeArray(detail?.process?.steps || detail?.process);
  const modernProcessLabel = detail?.process?.title || sectionTitles.process;
  const modernBoundariesIntro = detail?.icf?.intro || detail?.boundariesIntro;
  const modernBoundaries = safeArray(detail?.icf?.bullets || detail?.icf);
  const modernCases = safeArray(detail?.cases).map((item) => ({
    title: item?.title,
    body: item?.body || item?.description,
  }));
  const modernSummary = safeArray(detail?.summaryPoints);
  const hasModernLayout =
    Boolean(detail?.suitable || detail?.process || detail?.icf || detail?.cases) && detail?.version !== 'classic';

  if (hasModernLayout) {
    const suitableTitle = detail?.suitable?.title || sectionTitles.suitable;
    const casesTitle = detail?.casesTitle || sectionTitles.cases;
    const boundariesTitle = detail?.icf?.title || sectionTitles.icf;

    const ctaCopy = detail?.cta?.body || detail?.cta;
    const primaryCtaLabel = detail?.cta?.primary || buttonLabel;
    const secondaryCtaLabel = detail?.cta?.secondary || t('backToOverview', { defaultValue: 'Back to all services' });

    return (
      <MainLayout title={pageTitle} desc={description}>
        <Hero title={detail.title} subtitle={heroSubtitle} image={heroImage} imageAlt={heroAlt}>
          <Link
            href={`/contact?package=${slug}`}
            className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          >
            {primaryCtaLabel}
          </Link>
          <Link
            href="/services"
            className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          >
            {secondaryCtaLabel}
          </Link>
        </Hero>

        {(detail.summary || modernSummary.length > 0) && (
          <section className="bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-3xl px-6">
              <div className="space-y-5 rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-10 text-base leading-7 text-slate-700 shadow-sm">
                {detail.summary && <p>{detail.summary}</p>}
                {modernSummary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {modernSuitable.length > 0 && (
          <section className="bg-emerald-950/5 py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <BulletHighlights
                block={{
                  title: suitableTitle,
                  items: modernSuitable.slice(0, 5)
                }}
              />
            </div>
          </section>
        )}

        {modernProcess.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-8">{modernProcessLabel}</h2>
              <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
                {modernProcess.slice(0, 5).map((item, index) => (
                  <li key={item} className="flex gap-4 rounded-2xl border border-emerald-50 bg-emerald-50/30 p-6 transition-all hover:bg-emerald-50">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-200">
                      {index + 1}
                    </span>
                    <span className="font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {(modernBoundariesIntro || modernBoundaries.length > 0) && (
          <section className="bg-emerald-950/5 py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{boundariesTitle}</h2>
              {modernBoundariesIntro && (
                <p className="mt-4 text-base leading-7 text-slate-600">{modernBoundariesIntro}</p>
              )}
              {modernBoundaries.length > 0 && (
                <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                  {modernBoundaries.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {modernCases.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{casesTitle}</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {modernCases.map((item) => (
                  <CaseCard key={`${item.title}-${item.body}`} title={item.title} body={item.body} />
                ))}
              </div>
            </div>
          </section>
        )}

        {ctaCopy && (
          <section className="bg-emerald-950/5 py-16 sm:py-20">
            <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
              <p className="text-base leading-7 text-slate-700">{ctaCopy}</p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href={`/contact?package=${slug}`}
                  className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
                >
                  {primaryCtaLabel}
                </Link>
                <Link
                  href="/services"
                  className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
                >
                  {secondaryCtaLabel}
                </Link>
              </div>
            </div>
          </section>
        )}
      </MainLayout>
    );
  }

  const hasCoreSections = who.length || topics.length || how.length || approach.length;
  const hasBoundarySections = boundaries.length || notItems.length;
  const hasReflection = reflection.length > 0;
  const hasAdditionalCta = Boolean(detail.cta || detail.ctaButton);

  return (
    <MainLayout title={pageTitle} desc={description}>
      <Hero title={detail.title} subtitle={heroSubtitle} image={heroImage} imageAlt={heroAlt}>
        <Link
          href={`/contact?package=${slug}`}
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {buttonLabel}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
        >
          {t('backToOverview', { defaultValue: 'Back to all services' })}
        </Link>
      </Hero>

      {detail.summary && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-10 text-base leading-7 text-slate-700 shadow-sm">
              {detail.summary}
            </div>
          </div>
        </section>
      )}

      {hasCoreSections && (
        <section className="bg-emerald-950/5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {who.length > 0 && <BulletHighlights block={{ title: sectionTitles.who, items: who.slice(0, 5) }} />}
              {topics.length > 0 && <BulletHighlights block={{ title: sectionTitles.topics, items: topics.slice(0, 5) }} />}
              {how.length > 0 && <BulletHighlights block={{ title: sectionTitles.how, items: how.slice(0, 5) }} />}
              {approach.length > 0 && <BulletHighlights block={{ title: sectionTitles.approach, items: approach.slice(0, 5) }} />}
            </div>
          </div>
        </section>
      )}

      {hasBoundarySections && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <ListCard title={sectionTitles.boundaries} items={boundaries} />
              <ListCard title={sectionTitles.not} items={notItems} />
            </div>
          </div>
        </section>
      )}

      {hasReflection && (
        <section className="bg-emerald-950/5 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <ReflectionCard title={sectionTitles.reflection} items={reflection} />
          </div>
        </section>
      )}

      {hasAdditionalCta && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
            {detail.cta && <p className="text-base leading-7 text-slate-700">{detail.cta}</p>}
            <Link
              href={`/contact?package=${slug}`}
              className={`${BUTTON_BASE} mt-6 bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {buttonLabel}
            </Link>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

ServiceDetailPage.propTypes = {
  serviceKey: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
  heroAlt: PropTypes.string.isRequired,
};
