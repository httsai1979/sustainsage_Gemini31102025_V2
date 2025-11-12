import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function BulletList({ items = [] } = {}) {
  if (!items || items.length === 0) {
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

BulletList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

function PackageRecommendation({ item = undefined } = {}) {
  if (!item?.href) {
    return null;
  }

  return (
    <Link
      href={item.href}
      className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        {item.icon && (
          <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-emerald-50">
            <Image src={item.icon} alt="" fill sizes="56px" className="object-contain p-3" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          {item.summary && <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>}
        </div>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {item.cta || 'View package'}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

PackageRecommendation.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    icon: PropTypes.string,
    cta: PropTypes.string,
  }),
};

export default function ForAudiencePage({ pageKey }) {
  const { t } = useTranslation('forPages');
  const page = t(pageKey, { returnObjects: true });
  const titles = t('sectionTitles', { returnObjects: true });

  if (!page?.hero) {
    return null;
  }

  const challenges = safeArray(page.challenges);
  const topics = safeArray(page.topics);
  const partnershipItems = safeArray(page.partnership?.items);
  const boundaries = safeArray(page.boundaries?.items || page.boundaries);
  const caseStudy = page.case || {};
  const seoTitle = page.seo?.title || `${page.hero.title} | SustainSage`;
  const seoDesc = page.seo?.description || page.hero.subtitle || '';

  return (
    <MainLayout title={seoTitle} desc={seoDesc}>
      <Hero
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        image={page.hero.image || '/hero/services.svg'}
        imageAlt={page.hero.imageAlt || page.hero.title}
      >
        <Link
          href="/contact?from=for-page"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {page.cta?.primary || 'Book an intro call'}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
        >
          {page.cta?.secondary || 'Compare packages'}
        </Link>
      </Hero>

      {challenges.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{titles.challenges}</h2>
            <BulletList items={challenges} />
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section className="bg-emerald-950/5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{titles.topics}</h2>
            <BulletList items={topics} />
          </div>
        </section>
      )}

      {partnershipItems.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{page.partnership?.title || titles.partnership}</h2>
              {page.partnership?.description && (
                <p className="mt-4 text-base leading-7 text-slate-600">{page.partnership.description}</p>
              )}
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {partnershipItems.map((item) => (
                <PackageRecommendation key={item.href} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {(page.boundaries?.title || boundaries.length > 0) && (
        <section className="bg-emerald-950/5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{page.boundaries?.title || titles.boundaries}</h2>
            {page.boundaries?.intro && (
              <p className="mt-4 text-base leading-7 text-slate-600">{page.boundaries.intro}</p>
            )}
            <BulletList items={boundaries} />
          </div>
        </section>
      )}

      {(caseStudy.title || caseStudy.summary) && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
              {caseStudy.title && <h2 className="text-xl font-semibold text-slate-900">{caseStudy.title}</h2>}
              {caseStudy.summary && <p className="mt-3 text-sm leading-6 text-slate-700">{caseStudy.summary}</p>}
            </div>
          </div>
        </section>
      )}

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          {page.cta?.body && <p className="text-base leading-7 text-slate-700">{page.cta.body}</p>}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=for-page"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {page.cta?.primary || 'Book an intro call'}
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              {page.cta?.secondary || 'Compare packages'}
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

ForAudiencePage.propTypes = {
  pageKey: PropTypes.string.isRequired,
};
