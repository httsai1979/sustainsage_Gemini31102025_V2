import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import IconBadge from '@/components/corporate/IconBadge';
import ListWithDots from '@/components/corporate/ListWithDots';
import FitChecklistSection from '@/components/common/FitChecklistSection';
import MainLayout from '@/components/layout/MainLayout';
import { CONTACT_EMAIL, FALLBACK_LOCALE, getCorporateCopy } from '@/content/corporate';
import cn from '@/lib/cn';

export default function CorporatePage({ copy }) {
  return (
    <div className="bg-brand-bg text-brand-ink">
      <div className="ss-container space-y-16 py-12 lg:py-16">
          <section className="rounded-[32px] border border-brand-primary/40 bg-gradient-to-br from-brand-bg via-white to-white/90 p-8 shadow-sustainCard lg:p-12">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">{copy.hero.tag}</p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-brand-ink lg:text-5xl">{copy.hero.title}</h1>
                <p className="text-lg text-brand-ink/80">{copy.hero.subtitle}</p>
                <p className="text-base leading-relaxed text-slate-700">{copy.hero.description}</p>
              </div>
              <ul className="space-y-3">
                {copy.hero.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-base text-slate-700">
                    <IconBadge icon="arrow" className="mt-0.5 h-8 w-8 rounded-full bg-brand-primary/30 text-brand-ink" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={copy.hero.primaryHref}
                  className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
                >
                  {copy.hero.primaryCta}
                </Link>
                <Link
                  href={copy.hero.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
                >
                  {copy.hero.secondaryCta}
                </Link>
              </div>
              <p className="text-sm text-slate-600">{copy.hero.note}</p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Co-operate</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.audiencesHeading}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.audiences.map((audience) => (
                <article key={audience.title} className="rounded-3xl border border-brand-primary/30 bg-white/90 p-6 shadow-sustainCard">
                  <IconBadge icon={audience.icon} />
                  <h3 className="mt-4 text-xl font-semibold text-brand-ink">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{audience.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Pressure map</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.pressuresHeading}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {copy.pressures.map((pressure) => (
                <article key={pressure.title} className="rounded-3xl border border-brand-primary/30 bg-brand-bg/70 p-6">
                  <IconBadge icon={pressure.icon} className="bg-white" />
                  <h3 className="mt-4 text-xl font-semibold text-brand-ink">{pressure.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{pressure.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="layers" className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Co-operate</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.layersHeading}</h2>
            </div>
            <div className="space-y-8">
              {copy.layers.map((layer) => (
                <article key={layer.label} className="rounded-3xl border border-brand-primary/30 bg-white/95 p-6 shadow-sustainCard lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">{layer.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-brand-ink">{layer.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">{layer.description}</p>
                  {layer.slug ? (
                    <div className="mt-4">
                      <Link
                        href={`/corporate/layers/${layer.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
                      >
                        {layer.detail?.ctaLabel ?? copy.hero.secondaryCta}
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  ) : null}
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {layer.subLayers.map((subLayer) => (
                      <div key={subLayer.title} className="rounded-2xl border border-brand-primary/20 bg-brand-bg/70 p-5">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand-sage/70">
                          {subLayer.label}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <IconBadge icon={subLayer.icon} className="bg-white text-brand-sage" />
                          <p className="text-lg font-semibold text-brand-ink">{subLayer.title}</p>
                        </div>
                        <ListWithDots items={subLayer.bullets} />
                        {layer.slug && subLayer.slug ? (
                          <div className="mt-4">
                            <Link
                              href={`/corporate/layers/${layer.slug}/${subLayer.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-sage hover:text-brand-primaryDark"
                            >
                              {subLayer.detail?.ctaLabel ?? copy.hero.secondaryCta}
                              <span aria-hidden>↗</span>
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Process</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.processHeading}</h2>
              <p className="text-base leading-relaxed text-slate-700">{copy.processIntro}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {copy.process.map((step) => (
                <article key={step.title} className="rounded-3xl border border-brand-primary/30 bg-white/90 p-5 shadow-soft">
                  <IconBadge icon={step.icon} className="bg-white text-brand-sage" />
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <FitChecklistSection />

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 rounded-3xl border border-brand-primary/40 bg-white/95 p-6 shadow-sustainCard lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-sage/80">Next step</p>
              <h2 className="text-3xl font-semibold text-brand-ink">{copy.cta.title}</h2>
              <p className="text-base leading-relaxed text-slate-700">{copy.cta.description}</p>
              <ListWithDots items={copy.cta.points} />
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={copy.cta.primaryHref}
                  className="inline-flex items-center justify-center rounded-full bg-brand-sage px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-primaryDark"
                >
                  {copy.cta.primaryLabel}
                </Link>
                <a
                  href={copy.cta.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-brand-primary/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-sage"
                >
                  {copy.cta.secondaryLabel}
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-brand-primary/30 bg-brand-bg/80 p-6">
              <h3 className="text-xl font-semibold text-brand-ink">{copy.cta.sidebar.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {copy.cta.sidebar.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <IconBadge icon="consent" className="h-8 w-8 rounded-full bg-white text-brand-sage" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-600">
                <span className="font-semibold">Email:</span> {CONTACT_EMAIL}
              </p>
            </div>
          </section>
      </div>
    </div>
  );
}

CorporatePage.propTypes = {
  copy: PropTypes.shape({
    meta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    hero: PropTypes.object,
    audiencesHeading: PropTypes.string,
    audiences: PropTypes.arrayOf(PropTypes.object),
    pressuresHeading: PropTypes.string,
    pressures: PropTypes.arrayOf(PropTypes.object),
    layersHeading: PropTypes.string,
    layers: PropTypes.arrayOf(PropTypes.object),
    processHeading: PropTypes.string,
    processIntro: PropTypes.string,
    process: PropTypes.arrayOf(PropTypes.object),
    cta: PropTypes.object,
  }).isRequired,
};

CorporatePage.getLayout = function getLayout(page) {
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

export async function getStaticProps({ locale }) {
  const currentLocale = locale ?? FALLBACK_LOCALE;
  const copy = getCorporateCopy(currentLocale);

  return {
    props: {
      copy,
      seo: {
        title: copy.meta.title,
        description: copy.meta.description,
      },
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  };
}
