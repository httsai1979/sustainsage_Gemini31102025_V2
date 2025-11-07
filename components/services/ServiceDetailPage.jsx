import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

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
};

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function ListCard({ title, items }) {
  if (!items || items.length === 0) {
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
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function ReflectionCard({ title, items }) {
  if (!items || items.length === 0) {
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
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function ServiceDetailPage({ serviceKey, heroImage, heroAlt }) {
  const { t } = useTranslation('serviceDetails');
  const sectionTitles = { ...FALLBACK_TITLES, ...t('sectionTitles', { returnObjects: true }) };
  const detail = t(serviceKey, { returnObjects: true }) || {};

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

  return (
    <MainLayout title={pageTitle} desc={description}>
      <Hero
        title={detail.title || sectionTitles.title}
        subtitle={detail.tagline || detail.summary || ''}
        image={heroImage}
        imageAlt={heroAlt}
      >
        <Link
          href={`/contact?package=${slug}`}
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {detail.ctaButton || 'Book a 20-min intro call'}
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

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <ListCard title={sectionTitles.who} items={who} />
            <ListCard title={sectionTitles.topics} items={topics} />
            <ListCard title={sectionTitles.how} items={how} />
            <ListCard title={sectionTitles.approach} items={approach} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <ListCard title={sectionTitles.boundaries} items={boundaries} />
            <ListCard title={sectionTitles.not} items={notItems} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <ReflectionCard title={sectionTitles.reflection} items={reflection} />
        </div>
      </section>

      {(detail.cta || detail.ctaButton) && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
            {detail.cta && <p className="text-base leading-7 text-slate-700">{detail.cta}</p>}
            <Link
              href={`/contact?package=${slug}`}
              className={`${BUTTON_BASE} mt-6 bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {detail.ctaButton || 'Book a 20-min intro call'}
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
