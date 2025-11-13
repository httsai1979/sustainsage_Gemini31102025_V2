import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import PageSection from '@/components/ui/PageSection';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function normaliseSummaryItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (!item) {
        return null;
      }

      if (typeof item === 'string') {
        return { summary: item };
      }

      return item;
    })
    .filter(Boolean);
}

function SummaryGrid({ items = [] }) {
  const normalisedItems = normaliseSummaryItems(items);

  if (!normalisedItems.length) {
    return null;
  }

  return (
    <CardGrid>
      {normalisedItems.map((item, index) => (
        <Card
          key={`${item.summary ?? index}-${index}`}
          title={item.summary ?? item.title}
          subtitle={item.detail ?? item.description}
          className="h-full"
        />
      ))}
    </CardGrid>
  );
}

SummaryGrid.propTypes = {
  items: PropTypes.array,
};

function FAQGrid({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <CardGrid>
      {items.map((item) => (
        <Card key={item.question} title={item.question} subtitle={item.answer} className="h-full" />
      ))}
    </CardGrid>
  );
}

FAQGrid.propTypes = {
  items: PropTypes.array,
};

export default function StructuredServicePage({ serviceKey, image }) {
  const { t } = useTranslation('services');
  const serviceDetail = t('serviceDetail', { returnObjects: true }) ?? {};
  const service = serviceDetail?.[serviceKey] ?? {};

  const seo = service.seo ?? {};
  const hero = service.hero ?? {};
  const who = service.who ?? {};
  const topics = service.topics ?? {};
  const howWeWork = service.howWeWork ?? {};
  const expect = service.expect ?? {};
  const boundaries = service.boundaries ?? {};
  const faq = service.faq ?? {};
  const cta = service.cta ?? {};

  return (
    <>
      <Head>
        <title>{seo.title ?? `${hero.title ?? 'Service'} | SustainSage`}</title>
        {seo.description ? <meta name="description" content={seo.description} /> : null}
      </Head>

      <Hero title={hero.title} subtitle={hero.subtitle} note={hero.note} image={image} imageAlt={hero.title ?? 'Service illustration'}>
        {hero.primaryCta && hero.primaryHref ? (
          <Link
            href={hero.primaryHref}
            className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
          >
            {hero.primaryCta}
          </Link>
        ) : null}
        {hero.secondaryCta && hero.secondaryHref ? (
          <Link
            href={hero.secondaryHref}
            className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
          >
            {hero.secondaryCta}
          </Link>
        ) : null}
      </Hero>

      <PageSection title={who.title} lead={who.description} background="paper">
        <SummaryGrid items={who.items} />
      </PageSection>

      <PageSection title={topics.title} lead={topics.description}>
        <SummaryGrid items={topics.items} />
      </PageSection>

      <PageSection title={howWeWork.title} lead={howWeWork.description}>
        <SummaryGrid items={howWeWork.items} />
        {howWeWork.note ? <p className="mt-6 text-xs leading-6 text-ink/60">{howWeWork.note}</p> : null}
      </PageSection>

      <PageSection title={expect.title} lead={expect.description} background="paper">
        <SummaryGrid items={expect.items} />
      </PageSection>

      <PageSection title={boundaries.title} lead={boundaries.description}>
        <SummaryGrid items={boundaries.items} />
      </PageSection>

      <PageSection title={faq.title} lead={faq.description} background="paper">
        <FAQGrid items={faq.items} />
        {faq.note ? <p className="mt-6 text-xs leading-6 text-ink/60">{faq.note}</p> : null}
      </PageSection>

      {(cta.title || cta.body) && (
        <PageSection background="paper">
          <Card className="text-center" title={cta.title} subtitle={cta.body}>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {cta.primaryCta && cta.primaryHref ? (
                <Link
                  href={cta.primaryHref}
                  className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
                >
                  {cta.primaryCta}
                </Link>
              ) : null}
              {cta.secondaryCta && cta.secondaryHref ? (
                <Link
                  href={cta.secondaryHref}
                  className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
                >
                  {cta.secondaryCta}
                </Link>
              ) : null}
            </div>
          </Card>
        </PageSection>
      )}
    </>
  );
}

StructuredServicePage.propTypes = {
  serviceKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
