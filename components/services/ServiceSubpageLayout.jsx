import Link from 'next/link';
import PropTypes from 'prop-types';

import MainLayout from '@/components/layout/MainLayout';

function resolveCta(service, override) {
  const serviceCta = service?.cta ?? {};
  const hero = service?.hero ?? {};

  const primary = override?.primary ?? serviceCta.primary ?? hero.primaryCta ?? null;
  const secondary = override?.secondary ?? serviceCta.secondary ?? hero.secondaryCta ?? null;

  return {
    title:
      override?.title ??
      serviceCta.title ??
      'Book a chemistry chat',
    description:
      override?.description ??
      serviceCta.description ??
      'Share a little context and we will schedule a first conversation.',
    primary,
    secondary,
    note: override?.note ?? serviceCta.note ?? null,
  };
}

export default function ServiceSubpageLayout({ service, title, intro = undefined, children, cta = undefined } = {}) {
  const backHref = `/services/${service.slug}`;
  const resolvedCta = resolveCta(service, cta);
  const pageTitle = `${title} — ${service.title}`;
  const pageDescription = intro ?? service.hero?.subtitle ?? '';

  return (
    <MainLayout title={pageTitle} desc={pageDescription}>
      <div className="bg-emerald-50/60 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
          >
            <span aria-hidden="true">←</span>
            <span>Back to {service.title}</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{title}</h1>
          {intro ? <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{intro}</p> : null}
        </div>
      </div>
      <section className="py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full lg:max-w-3xl">{children}</div>
          <aside className="w-full lg:max-w-sm lg:self-stretch">
            <div className="lg:sticky lg:top-32">
              <div className="rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{resolvedCta.title}</p>
                {resolvedCta.description ? (
                  <p className="mt-3 text-sm leading-6 text-slate-700">{resolvedCta.description}</p>
                ) : null}
                <div className="mt-6 flex flex-col gap-3">
                  {resolvedCta.primary?.href && resolvedCta.primary?.label ? (
                    <Link
                      href={resolvedCta.primary.href}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    >
                      {resolvedCta.primary.label}
                    </Link>
                  ) : null}
                  {resolvedCta.secondary?.href && resolvedCta.secondary?.label ? (
                    <Link
                      href={resolvedCta.secondary.href}
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    >
                      {resolvedCta.secondary.label}
                    </Link>
                  ) : null}
                </div>
                {resolvedCta.note ? (
                  <p className="mt-6 text-xs leading-5 text-slate-500">{resolvedCta.note}</p>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </MainLayout>
  );
}

ServiceSubpageLayout.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hero: PropTypes.shape({
      subtitle: PropTypes.string,
      primaryCta: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
      secondaryCta: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
    }),
    cta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      primary: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
      secondary: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
      note: PropTypes.string,
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
  intro: PropTypes.string,
  children: PropTypes.node.isRequired,
  cta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    primary: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
    secondary: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
    note: PropTypes.string,
  }),
};
