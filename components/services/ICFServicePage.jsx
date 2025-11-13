import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import PageSection from '@/components/ui/PageSection';
import SectionContainer from '@/components/sections/SectionContainer';
import { orderSections } from '@/lib/orderSections';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function BulletList({ items = [] } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <CardGrid>
      {items.map((item) => (
        <Card key={typeof item === 'string' ? item : item?.summary} title={item?.summary ?? item} className="h-full" />
      ))}
    </CardGrid>
  );
}

BulletList.propTypes = {
  items: PropTypes.array,
};

function ExampleList({ items = [] } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <CardGrid>
      {items.map((item, index) => (
        <Card key={`${item?.title ?? index}-${index}`} title={item?.title} subtitle={item?.description} className="h-full" />
      ))}
    </CardGrid>
  );
}

ExampleList.propTypes = {
  items: PropTypes.array,
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
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              {segment.label}
            </Link>
          );
        }

        if (typeof segment?.value === 'string') {
          return <span key={index}>{segment.value}</span>;
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
    <>
      <Head>
        <title>{seo?.title ?? `${hero?.title ?? 'Service'} | SustainSage`}</title>
        {seo?.description ? <meta name="description" content={seo.description} /> : null}
      </Head>

      <Hero title={hero?.title} subtitle={hero?.subtitle} image={heroImage} imageAlt={heroImageAlt}>
        {hero?.primaryCta && hero?.primaryHref ? (
          <Link
            href={hero.primaryHref}
            className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
          >
            {hero.primaryCta}
          </Link>
        ) : null}
        {hero?.secondaryCta && hero?.secondaryHref ? (
          <Link
            href={hero.secondaryHref}
            className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
          >
            {hero.secondaryCta}
          </Link>
        ) : null}
      </Hero>

      {orderedGroups.map((group, idx) => {
        const Component = group.component;
        const hasItems = Array.isArray(group.items) && group.items.length > 0;

        return (
          <PageSection key={group.key ?? idx} title={group.title} lead={group.lead}>
            {Component && hasItems ? <Component items={group.items} /> : null}
            {group.note ? <p className="mt-4 text-xs leading-5 text-ink/60">{group.note}</p> : null}
          </PageSection>
        );
      })}

      {(ethics?.title || ethics?.description || (ethics?.items?.length ?? 0) > 0) ? (
        <PageSection title={ethics?.title} lead={ethics?.description} background="paper">
          <BulletList items={ethics?.items} />
        </PageSection>
      ) : null}

      {cta?.title || ctaBody ? (
        <SectionContainer variant="surface" tone="muted">
          <div className="text-center">
            {cta?.title ? <h2 className="text-2xl font-semibold tracking-tight text-ink">{cta.title}</h2> : null}
            {ctaBody ? <p className="mt-4 text-base leading-7 text-ink/80">{ctaBody}</p> : null}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {cta?.primary?.label && cta?.primary?.href ? (
                <Link
                  href={cta.primary.href}
                  className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
                >
                  {cta.primary.label}
                </Link>
              ) : null}
              {cta?.secondary?.label && cta?.secondary?.href ? (
                <Link
                  href={cta.secondary.href}
                  className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
                >
                  {cta.secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </SectionContainer>
      ) : null}
    </>
  );
}

ICFServicePage.propTypes = {
  namespace: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};
