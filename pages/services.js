import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';

function PathwayCard({ card, viewDetails }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-emerald-50">
            <Image src={card.icon} alt="" fill sizes="48px" className="object-contain p-3" />
          </div>
          <div className="space-y-1">
            {card?.target ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{card.target}</p>
            ) : null}
            <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
          </div>
        </div>
        {card?.audience ? (
          <p className="text-sm leading-6 text-slate-600">{card.audience}</p>
        ) : null}
        {Array.isArray(card?.benefits) && card.benefits.length > 0 ? (
          <ul className="space-y-2 text-sm leading-6 text-slate-700">
            {card.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <Link
        href={`/services/${card.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
      >
        {viewDetails}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const pathways = t('pathways', { returnObjects: true });
  const cta = t('cta', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 md:flex-row md:items-center">
          <div className="typography flex flex-col gap-4 md:flex-1">
            <h1>{hero.title}</h1>
            {hero?.highlight ? (
              <p>
                <strong>{hero.highlight}</strong>
              </p>
            ) : null}
            {hero?.subtitle ? <p>{hero.subtitle}</p> : null}
            {faqLink?.label ? (
              <Link href={faqLink.href} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
                {faqLink.label}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 text-sm leading-6 text-slate-700 md:w-80">
            <p>{pathways.sidebar ?? pathways.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="typography max-w-3xl flex flex-col gap-4">
            <h2>{pathways.title}</h2>
            {pathways?.highlight ? (
              <p>
                <strong>{pathways.highlight}</strong>
              </p>
            ) : null}
            <p>{pathways.description}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pathways.cards.map((card) => (
              <PathwayCard key={card.slug} card={card} viewDetails={pathways.viewDetails} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <div className="typography flex flex-col gap-4">
            <h2>{cta.title}</h2>
            {cta?.highlight ? (
              <p>
                <strong>{cta.highlight}</strong>
              </p>
            ) : null}
            <p>{cta.body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={cta.primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {cta.primaryCta}
            </Link>
            <Link
              href={cta.secondaryHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {cta.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

ServicesPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  };
}

export default ServicesPage;
