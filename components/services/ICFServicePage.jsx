import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function BulletList({ items }) {
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

BulletList.defaultProps = {
  items: undefined,
};

function ExampleList({ items }) {
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

ExampleList.defaultProps = {
  items: undefined,
};

export default function ICFServicePage({ namespace, image, imageAlt }) {
  const { t } = useTranslation(namespace);
  const seo = t('seo', { returnObjects: true }) ?? {};
  const hero = t('hero', { returnObjects: true }) ?? {};
  const sections = t('sections', { returnObjects: true }) ?? {};

  const who = sections.who ?? {};
  const what = sections.what ?? {};
  const how = sections.how ?? {};
  const examples = sections.examples ?? {};
  const expect = sections.expect ?? {};
  const ethics = sections.ethics ?? {};
  const cta = sections.cta ?? {};

  const heroImage = image ?? hero.image ?? '/images/services/transition.svg';
  const heroImageAlt = imageAlt ?? hero.imageAlt ?? hero.title ?? 'Service illustration';

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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            {who?.title ? (
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{who.title}</h2>
            ) : null}
            {who?.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">{who.description}</p>
            ) : null}
            <BulletList items={who?.items} />
          </div>
          <div>
            {what?.title ? (
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{what.title}</h2>
            ) : null}
            {what?.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">{what.description}</p>
            ) : null}
            <BulletList items={what?.items} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          {how?.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{how.title}</h2>
          ) : null}
          {how?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{how.description}</p>
          ) : null}
          <BulletList items={how?.items} />
          {how?.note ? (
            <p className="mt-6 text-xs leading-5 text-slate-500">{how.note}</p>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {examples?.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{examples.title}</h2>
          ) : null}
          {examples?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{examples.description}</p>
          ) : null}
          <ExampleList items={examples?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            {expect?.title ? (
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{expect.title}</h2>
            ) : null}
            {expect?.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">{expect.description}</p>
            ) : null}
            <BulletList items={expect?.items} />
          </div>
          <div>
            {ethics?.title ? (
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{ethics.title}</h2>
            ) : null}
            {ethics?.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">{ethics.description}</p>
            ) : null}
            <BulletList items={ethics?.items} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/80 px-8 py-12 text-center shadow-sm">
          {cta?.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{cta.title}</h2>
          ) : null}
          {cta?.body ? (
            <p className="mt-4 text-base leading-7 text-slate-700">{cta.body}</p>
          ) : null}
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
      </section>
    </MainLayout>
  );
}

ICFServicePage.propTypes = {
  namespace: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};

ICFServicePage.defaultProps = {
  image: undefined,
  imageAlt: undefined,
};
