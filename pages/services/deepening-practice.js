import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import PageSection from '@/components/ui/PageSection';
import { sanitizeProps } from '@/lib/toSerializable';

import nextI18NextConfig from '../../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function BulletCards({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <CardGrid>
      {items.map((item, index) => {
        const normalized =
          typeof item === 'string'
            ? { description: item }
            : { title: item?.title, description: item?.description ?? item?.summary ?? item?.value };
        const key = normalized.title ?? normalized.description ?? index;
        return <Card key={key} title={normalized.title} subtitle={normalized.description} className="h-full" />;
      })}
    </CardGrid>
  );
}

function renderSegments(segments = []) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return null;
  }

  return segments.map((segment, index) => <span key={index}>{segment?.value ?? ''}</span>);
}

export default function DeepeningPracticePage() {
  const { t } = useTranslation('services-deepening-practice');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const sections = t('sections', { returnObjects: true }) ?? {};

  const fit = sections.fit ?? {};
  const focus = sections.focus ?? {};
  const ethics = sections.ethics ?? {};
  const cta = sections.cta ?? {};

  return (
    <>
      <Head>
        <title>{seo?.title ?? 'Deepening Practice – 8 sessions for leaders & practitioners'}</title>
        <meta
          name="description"
          content={seo?.description ?? 'An eight-session coaching space for leaders and practitioners.'}
        />
      </Head>

      <Hero
        title={hero?.title ?? 'Deepening Practice – 8 sessions'}
        subtitle={hero?.subtitle ?? ''}
        image="/images/services/confidence.svg"
        imageAlt={hero?.imageAlt ?? 'Illustration for deepening leadership practice'}
      >
        <Link
          href="/contact?from=deepening-practice"
          className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
        >
          {hero?.primaryCta ?? 'Book an intro call'}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
        >
          {hero?.secondaryCta ?? 'Back to services'}
        </Link>
      </Hero>

      <PageSection title={fit?.title} lead={fit?.description} background="paper">
        <BulletCards items={fit?.items} />
      </PageSection>

      <PageSection title={focus?.title} lead={focus?.description}>
        <BulletCards items={focus?.items} />
      </PageSection>

      <PageSection title={ethics?.title} lead={ethics?.description} background="paper">
        <BulletCards items={ethics?.items} />
      </PageSection>

      <PageSection>
        <Card className="text-center" title={cta?.title} subtitle={renderSegments(cta?.body)}>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=deepening-practice"
              className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
            >
              {cta?.primaryCta ?? hero?.primaryCta ?? 'Book an intro call'}
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
            >
              {cta?.secondaryCta ?? 'Explore all services'}
            </Link>
          </div>
        </Card>
      </PageSection>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'services-deepening-practice'], nextI18NextConfig)),
  };

  return {
    props: sanitizeProps(props),
  };
}
