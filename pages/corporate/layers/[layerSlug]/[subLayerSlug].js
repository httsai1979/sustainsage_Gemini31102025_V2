import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import IconBadge from '@/components/corporate/IconBadge';
import ListWithDots from '@/components/corporate/ListWithDots';
import MainLayout from '@/components/layout/MainLayout';
import {
  CONTACT_EMAIL,
  FALLBACK_LOCALE,
  getAllSubLayerSlugs,
  getCorporateCopy,
  getSubLayerBySlugs,
} from '@/content/corporate';

function CorporateSubLayerPage({ layer, subLayer, heroTag, cta }) {
  const detail = subLayer.detail || {};

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
            <li>
              <Link href={`/corporate/layers/${layer.slug}`} className="text-brand-sage hover:text-brand-primaryDark">
                {layer.detail?.heroTitle ?? layer.title}
              </Link>
            </li>
            <li aria-hidden>•</li>
            <li className="text-brand-ink font-semibold">{subLayer.title}</li>
          </ol>
        </nav>

        <section className="rounded-[32px] border border-brand-primary/40 bg-white/95 p-8 shadow-sustainCard lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">{heroTag}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-brand-sage">
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 font-semibold text-brand-ink">{layer.label}</span>
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 font-semibold text-brand-ink">{subLayer.label}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-brand-ink">{subLayer.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{detail.intro}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-brand-primary/20 bg-brand-bg/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">When to use</p>
              <ListWithDots items={detail.scenarios} />
            </article>
            <article className="rounded-3xl border border-brand-primary/20 bg-brand-bg/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">How we run it</p>
              <ListWithDots items={detail.steps || subLayer.bullets} />
            </article>
            <article className="rounded-3xl border border-brand-primary/20 bg-brand-bg/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">What sponsors receive</p>
              <ListWithDots items={detail.outputs} />
            </article>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact?topic=corporate"
              className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
            >
              {detail.ctaLabel || 'Discuss this micro-layer'}
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subLayer.title)}`}
              className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
            >
              Email a quick question
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-brand-primary/30 bg-white/95 p-6 shadow-sustainCard">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Stays connected</p>
              <h2 className="text-2xl font-semibold text-brand-ink">How this micro-layer feeds back into {layer.detail?.heroTitle ?? layer.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                We loop insights into the broader layer only when confidentiality allows it, so sponsors stay informed without losing trust on site.
              </p>
            </div>
            <IconBadge icon={subLayer.icon} className="h-14 w-14 rounded-3xl bg-brand-primary/20" />
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
      </div>
    </div>
  );
}

CorporateSubLayerPage.propTypes = {
  layer: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    detail: PropTypes.object,
  }).isRequired,
  subLayer: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    detail: PropTypes.object,
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

CorporateSubLayerPage.getLayout = function getLayout(page) {
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
  const paths = getAllSubLayerSlugs().map(({ locale, layerSlug, subLayerSlug }) => ({
    params: { layerSlug, subLayerSlug },
    locale,
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const currentLocale = locale ?? FALLBACK_LOCALE;
  const copy = getCorporateCopy(currentLocale);
  const { layer, subLayer } = getSubLayerBySlugs(currentLocale, params.layerSlug, params.subLayerSlug);

  if (!layer || !subLayer) {
    return { notFound: true };
  }

  return {
    props: {
      layer,
      subLayer,
      heroTag: copy.hero.tag,
      cta: copy.cta,
      seo: {
        title: `${subLayer.title} | ${copy.meta.title}`,
        description: subLayer.detail?.intro ?? copy.meta.description,
      },
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  };
}

export default CorporateSubLayerPage;
