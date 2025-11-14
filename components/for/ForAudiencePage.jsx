import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import SectionContainer from '@/components/sections/SectionContainer';
import PageSection from '@/components/ui/PageSection';
import { orderSections } from '@/lib/orderSections';

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

  const toBlock = (key, { title, lead, items, component, children }) => ({
    key,
    title,
    lead,
    items,
    component,
    children,
  });

  const leadBlocks = orderSections(
    [
      page.who?.items?.length
        ? toBlock('who', {
            title: page.who?.title,
            lead: page.who?.description,
            items: safeArray(page.who?.items),
            component: BulletList,
          })
        : null,
      page.scenarios?.items?.length
        ? toBlock('scenarios', {
            title: page.scenarios?.title,
            lead: page.scenarios?.description,
            items: safeArray(page.scenarios?.items),
            component: BulletList,
          })
        : null,
      page.examples?.items?.length
        ? toBlock('examples', {
            title: page.examples?.title,
            lead: page.examples?.description,
            items: safeArray(page.examples?.items),
            component: BulletList,
          })
        : null,
    ].filter(Boolean)
  );

  const restBlocks = [
    challenges.length
      ? toBlock('challenges', {
          title: titles.challenges,
          items: challenges,
          component: BulletList,
        })
      : null,
    topics.length
      ? toBlock('topics', {
          title: titles.topics,
          items: topics,
          component: BulletList,
        })
      : null,
    partnershipItems.length
      ? toBlock('partnership', {
          title: page.partnership?.title || titles.partnership,
          lead: page.partnership?.description,
          children: (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {partnershipItems.map((item) => (
                <PackageRecommendation key={item.href} item={item} />
              ))}
            </div>
          ),
        })
      : null,
    (page.boundaries?.title || boundaries.length)
      ? toBlock('boundaries', {
          title: page.boundaries?.title || titles.boundaries,
          lead: page.boundaries?.intro,
          items: boundaries,
          component: BulletList,
        })
      : null,
  ].filter(Boolean);

  const renderBlock = (block, idx) => {
    const Component = block.component;
    const hasItems = Array.isArray(block.items) && block.items.length > 0;

    return (
      <div
        key={block.key ?? idx}
        className="border-t border-emerald-100 py-6 first:border-t-0 first:pt-0"
      >
        {block.title ? <h2 className="text-xl font-semibold text-emerald-900">{block.title}</h2> : null}
        {block.lead ? <p className="mt-2 text-base leading-7 text-slate-600">{block.lead}</p> : null}
        {Component && hasItems ? (
          <div className="mt-4">
            {/* 保持原樣式子元件 */}
            <Component items={block.items} />
          </div>
        ) : null}
        {block.children ? <div className="mt-4">{block.children}</div> : null}
      </div>
    );
  };

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
          {page.cta?.primary || 'Book a 20-minute chat'}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
        >
          {page.cta?.secondary || 'Compare packages'}
        </Link>
      </Hero>

      {(caseStudy.title || caseStudy.summary) && (
        <SectionContainer variant="surface" tone="muted" title={caseStudy.title} lead={caseStudy.summary} />
      )}

      {leadBlocks.length ? (
        <PageSection>
          {leadBlocks.map((block, idx) => renderBlock(block, idx))}
        </PageSection>
      ) : null}

      {restBlocks.length ? (
        <PageSection>
          {restBlocks.map((block, idx) => renderBlock(block, idx))}
        </PageSection>
      ) : null}

      <SectionContainer variant="surface" tone="muted">
        {page.cta?.body && <p className="text-base leading-7 text-slate-700">{page.cta.body}</p>}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/contact?from=for-page"
            className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          >
            {page.cta?.primary || 'Book a 20-minute chat'}
          </Link>
          <Link
            href="/services"
            className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          >
            {page.cta?.secondary || 'Compare packages'}
          </Link>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}

ForAudiencePage.propTypes = {
  pageKey: PropTypes.string.isRequired,
};
