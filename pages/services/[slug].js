import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import { getServiceData, getServiceSlugs } from '@/lib/services';

function Section({ title, description, tint = false, children }) {
  const backgroundClass = tint ? 'bg-emerald-950/5' : 'bg-white';

  return (
    <section className={`${backgroundClass} py-16 sm:py-20`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="typography max-w-3xl flex flex-col gap-4">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tint: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  title: undefined,
  description: undefined,
  tint: false,
};

function BulletList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className="mt-8 space-y-4">
      {items.map((item) => (
        <li key={item.title ?? item} className="flex gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-5 shadow-sm">
          <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
          <div className="space-y-1">
            {typeof item === 'string' ? (
              <span className="text-sm leading-6 text-slate-700">{item}</span>
            ) : (
              <>
                {item.title ? <strong className="block text-sm font-semibold text-slate-900">{item.title}</strong> : null}
                {item.description ? <p className="text-sm leading-6 text-slate-700">{item.description}</p> : null}
              </>
            )}
          </div>
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
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ])
  ),
};

BulletList.defaultProps = {
  items: undefined,
};

function StepList({ steps }) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <ol className="mt-8 space-y-6">
      {steps.map((step, index) => (
        <li key={step.title ?? index} className="flex gap-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
            {step.title ? <h3 className="text-base font-semibold text-slate-900">{step.title}</h3> : null}
            {step.description ? <p className="mt-2 text-sm leading-6 text-slate-700">{step.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

StepList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

StepList.defaultProps = {
  steps: undefined,
};

function CTASection({ cta }) {
  if (!cta) {
    return null;
  }

  return (
    <section className="bg-emerald-950/5 py-16 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
        <div className="typography flex flex-col gap-4">
          {cta.title ? <h2>{cta.title}</h2> : null}
          {cta.description ? <p>{cta.description}</p> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {cta.primary?.href && cta.primary?.label ? (
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {cta.primary.label}
            </Link>
          ) : null}
          {cta.secondary?.href && cta.secondary?.label ? (
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {cta.secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

CTASection.propTypes = {
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
  }),
};

CTASection.defaultProps = {
  cta: undefined,
};

export default function ServiceDetailPage({ service }) {
  const { hero = {}, audience = {}, process = {}, boundaries = {}, faq = {}, cta = {}, title } = service;
  const pageTitle = hero.title ?? title ?? 'Service';
  const pageDescription = hero.subtitle ?? boundaries.description ?? '';

  return (
    <MainLayout title={pageTitle} desc={pageDescription}>
      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto max-w-5xl px-6">
          {hero.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{pageTitle}</h1>
          {hero.subtitle ? <p className="mt-4 text-base leading-7 text-slate-600">{hero.subtitle}</p> : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {hero.primaryCta?.href && hero.primaryCta?.label ? (
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta?.href && hero.secondaryCta?.label ? (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <Section title={audience.title} description={audience.description}>
        <BulletList items={audience.items} />
      </Section>

      <Section title={process.title} description={process.description} tint>
        <StepList steps={process.steps} />
        {process.note ? <p className="mt-6 text-xs leading-5 text-slate-500">{process.note}</p> : null}
      </Section>

      <Section title={boundaries.title} description={boundaries.description}>
        <BulletList items={boundaries.items} />
      </Section>

      <Section title={faq.title} description={faq.description} tint>
        <FAQAccordion items={faq.items} className="mt-8" />
      </Section>

      <CTASection cta={cta} />
    </MainLayout>
  );
}

ServiceDetailPage.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string,
    hero: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
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
    audience: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    }),
    process: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      steps: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        })
      ),
      note: PropTypes.string,
    }),
    boundaries: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    }),
    faq: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string,
          answer: PropTypes.string,
        })
      ),
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
    }),
    slug: PropTypes.string,
  }).isRequired,
};

export async function getStaticPaths() {
  const slugs = getServiceSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    const service = getServiceData(params.slug);

    return {
      props: {
        service,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
