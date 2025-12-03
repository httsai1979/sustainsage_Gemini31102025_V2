import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import IconBadge from '@/components/corporate/IconBadge';
import ListWithDots from '@/components/corporate/ListWithDots';
import FitChecklistSection from '@/components/common/FitChecklistSection';
import MainLayout from '@/components/layout/MainLayout';
import {
  CONTACT_EMAIL,
  FALLBACK_LOCALE,
  getAllLayerSlugs,
  getCorporateCopy,
  getLayerBySlug,
} from '@/content/corporate';

function CorporateLayerPage({ layer, heroTag, cta }) {
  const detail = layer.detail || {};

  return (
    <div className="bg-brand-bg text-brand-ink">
      <div className="ss-container space-y-14 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/corporate" className="text-brand-sage hover:text-brand-primaryDark">
                Co-operate
              </Link>
            </li>
            <li aria-hidden>•</li>
            <li className="text-brand-ink font-semibold">{detail.heroTitle ?? layer.title}</li>
          </ol>
        </nav>

        <section className="rounded-[32px] border border-brand-primary/40 bg-white/95 p-8 shadow-sustainCard lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">{heroTag}</p>
          <h1 className="mt-3 text-4xl font-semibold text-brand-ink">{detail.heroTitle ?? layer.title}</h1>
          <p className="mt-2 text-lg text-brand-ink/80">{detail.heroSubtitle}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{detail.intro || layer.description}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Signals</p>
              <ListWithDots items={detail.signals} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Outcomes</p>
              <ListWithDots items={detail.outcomes} />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact?topic=corporate"
              className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
            >
              {detail.ctaLabel || 'Talk about this layer'}
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Co-operate%20Layer`}
              className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
            >
              Email the sponsor brief
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Micro-layers</p>
            <h2 className="text-3xl font-semibold text-brand-ink">What sits inside {detail.heroTitle ?? layer.title}</h2>
            <p className="text-base text-slate-700">
              Each micro-layer below opens into its own brief so sponsors and leaders know exactly what to expect.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {layer.subLayers.map((subLayer) => (
              <article key={subLayer.slug} className="rounded-3xl border border-brand-primary/30 bg-white/95 p-6 shadow-sustainCard">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand-sage/70">{subLayer.label}</p>
                <div className="mt-3 flex items-center gap-3">
                  <IconBadge icon={subLayer.icon} className="bg-white text-brand-sage" />
                  <p className="text-xl font-semibold text-brand-ink">{subLayer.title}</p>
                </div>
                <ListWithDots items={subLayer.bullets} />
                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/corporate/layers/${layer.slug}/${subLayer.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-sage hover:text-brand-primaryDark"
                  >
                    {subLayer.detail?.ctaLabel || 'Open micro-layer'}
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 rounded-3xl border border-brand-primary/40 bg-white/95 p-6 shadow-sustainCard lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Next step</p>
            <h2 className="text-3xl font-semibold text-brand-ink">{cta.title}</h2>
            <p className="text-base leading-relaxed text-slate-700">{cta.description}</p>
            <ListWithDots items={cta.points} />
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={cta.primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
              >
                {cta.primaryLabel}
              </Link>
              <a
                href={cta.secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
              >
                {cta.secondaryLabel}
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-brand-primary/30 bg-brand-bg/80 p-6">
            <h3 className="text-xl font-semibold text-brand-ink">{cta.sidebar.title}</h3>
            <ListWithDots items={cta.sidebar.items} className="mt-4" />
            <p className="mt-6 text-sm text-slate-600">
              <span className="font-semibold">Email:</span> {CONTACT_EMAIL}
            </p>
          </div>
        </section>

        <FitChecklistSection />
      </div>
    </div>
  );
}

CorporateLayerPage.propTypes = {
  layer: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    detail: PropTypes.object,
    subLayers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  heroTag: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.string),
    primaryHref: PropTypes.string,
    primaryLabel: PropTypes.string,
    secondaryHref: PropTypes.string,
    secondaryLabel: PropTypes.string,
    sidebar: PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

CorporateLayerPage.getLayout = function getLayout(page) {
  const seo = page.props?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo.title,
        description: seo.description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const paths = getAllLayerSlugs().map(({ locale, layerSlug }) => ({
    params: { layerSlug },
    locale,
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const currentLocale = locale ?? FALLBACK_LOCALE;
  const copy = getCorporateCopy(currentLocale);
  const layer = getLayerBySlug(currentLocale, params.layerSlug);

  if (!layer) {
    return { notFound: true };
  }

  return {
    props: {
      layer,
      heroTag: copy.hero.tag,
      cta: copy.cta,
      seo: {
        title: `${layer.detail?.heroTitle ?? layer.title} | ${copy.meta.title}`,
        description: layer.detail?.intro ?? copy.meta.description,
      },
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  };
}

export default CorporateLayerPage;
