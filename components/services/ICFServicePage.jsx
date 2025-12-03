import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import SectionContainer from '@/components/Sections/SectionContainer';
import PageSection from '@/components/ui/PageSection';
import { orderSections } from '@/lib/orderSections';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function BulletList({ items = [] } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item?.summary} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <span>{typeof item === 'string' ? item : item?.summary}</span>
        </li>
      ))}
    </ul>
  );
}

BulletList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        summary: PropTypes.string,
      }),
    ]),
  ),
};

function ExampleList({ items = [] } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <div key={`${item?.title ?? index}-${index}`} className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
          {item?.title ? (
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
          ) : null}
          {item?.description ? (
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

ExampleList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};

function renderCtaBody(body) {
  if (!body) {
    return null;
  }

  if (typeof body === 'string') {
    return body;
  }

  if (Array.isArray(body)) {
    const segments = body
      .map((segment, index) => {
        if (typeof segment === 'string') {
          return <span key={index}>{segment}</span>;
        }

        if (segment?.type === 'link' && segment?.href && segment?.label) {
          return (
            <Link
              key={`${segment.href}-${index}`}
              href={segment.href}
              className="text-emerald-700 underline decoration-emerald-700/40 hover:decoration-emerald-700"
            >
              {segment.label}
            </Link>
          );
        }

        const value = segment?.value;

        if (typeof value === 'string' && value.length > 0) {
          return <span key={index}>{value}</span>;
        }

        return null;
      })
      .filter(Boolean);

    return segments.length > 0 ? segments : null;
  }

  if (typeof body === 'object' && typeof body?.value === 'string') {
    return body.value;
  }

  return null;
}

export default function ICFServicePage({ namespace, image = undefined, imageAlt = undefined } = {}) {
  const { t } = useTranslation(namespace);
  const seo = t('seo', { returnObjects: true }) ?? {};
  const hero = t('hero', { returnObjects: true }) ?? {};
  const sections = t('sections', { returnObjects: true }) ?? {};

  const who = sections.who ?? {};
  const examples = sections.examples ?? {};
  const what = sections.what ?? {};
  const how = sections.how ?? {};
  const expect = sections.expect ?? {};
  const ethics = sections.ethics ?? {};
  const cta = sections.cta ?? {};

  const heroImage = image ?? hero.image ?? '/images/services/transition.svg';
  const heroImageAlt = imageAlt ?? hero.imageAlt ?? hero.title ?? 'Service illustration';
  const ctaBody = renderCtaBody(cta?.body);
  const whoItems = Array.isArray(who?.items) ? who.items : [];
  const exampleItems = Array.isArray(examples?.items) ? examples.items : [];
  const whatItems = Array.isArray(what?.items) ? what.items : [];
  const howItems = Array.isArray(how?.items) ? how.items : [];
  const expectItems = Array.isArray(expect?.items) ? expect.items : [];

  const baseGroups = {
    who: {
      key: 'who',
      title: who?.title,
      lead: who?.description,
      items: whoItems,
      component: BulletList,
    },
    examples: {
      key: 'examples',
      title: examples?.title,
      lead: examples?.description,
      items: exampleItems,
      component: ExampleList,
    },
    what: {
      key: 'what',
      title: what?.title,
      lead: what?.description,
      items: whatItems,
      component: BulletList,
    },
    how: {
      key: 'how',
      title: how?.title,
      lead: how?.description,
      items: howItems,
      component: BulletList,
      note: how?.note,
    },
    expect: {
      key: 'expect',
      title: expect?.title,
      lead: expect?.description,
      items: expectItems,
      component: BulletList,
    },
  };

  const orderedGroups = orderSections([
    baseGroups.who,
    baseGroups.examples,
    baseGroups.what,
    baseGroups.how,
    baseGroups.expect,
  ]).filter((group) => group && (group.title || group.lead || (group.items?.length ?? 0) > 0));

  return (
    <MainLayout>
      <Head>
        <title>{seo?.title ?? `${hero?.title ?? 'Service'} | SustainSage`}</title>
        {seo?.description ? <meta name="description" content={seo.description} /> : null}
      </Head>

      <Hero
        title={hero?.title}
        subtitle={hero?.subtitle}
        image={heroImage}
        imageAlt={heroImageAlt}
      >
        {hero?.primaryCta && hero?.primaryHref ? (
          <Link
            href={hero.primaryHref}
            className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          >
            {hero.primaryCta}
          </Link>
        ) : null}
        {hero?.secondaryCta && hero?.secondaryHref ? (
          <Link
            href={hero.secondaryHref}
            className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          >
            {hero.secondaryCta}
          </Link>
        ) : null}
      </Hero>

      {/* 渲染：依 orderedGroups 輸出，並統一標題與間距樣式 */}
      {orderedGroups.map((group, idx) => {
        const Component = group.component;
        const hasItems = Array.isArray(group.items) && group.items.length > 0;
        const wrapperClass =
          Component === ExampleList ? 'mt-4' : 'mt-4 space-y-4 text-slate-800';

        return (
          <PageSection key={group.key ?? idx} title={group.title} lead={group.lead}>
            {Component && hasItems ? (
              <div className={wrapperClass}>
                <Component items={group.items} />
              </div>
            ) : null}
            {group.note ? <p className="mt-4 text-xs leading-5 text-slate-500">{group.note}</p> : null}
          </PageSection>
        );
      })}

      {(ethics?.title || ethics?.description || (ethics?.items?.length ?? 0) > 0) ? (
        <PageSection title={ethics?.title} lead={ethics?.description}>
          <div className="mt-4 space-y-4 text-slate-800">
            <BulletList items={ethics?.items} />
          </div>
        </PageSection>
      ) : null}

      {cta?.title || ctaBody ? (
        <SectionContainer variant="surface" tone="muted">
          <div className="text-center">
            {cta?.title ? <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{cta.title}</h2> : null}
            {ctaBody ? <p className="mt-4 text-base leading-7 text-slate-700">{ctaBody}</p> : null}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {cta?.primary?.label && cta?.primary?.href ? (
                <Link
                  href={cta.primary.href}
                  className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
                >
                  {cta.primary.label}
                </Link>
              ) : null}
              {cta?.secondary?.label && cta?.secondary?.href ? (
                <Link
                  href={cta.secondary.href}
                  className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
                >
                  {cta.secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </SectionContainer>
      ) : null}
    </MainLayout>
  );
}

ICFServicePage.propTypes = {
  namespace: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};

