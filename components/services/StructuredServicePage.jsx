import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function SummaryList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className="mt-8 space-y-4">
      {items.map((item, index) => (
        <li
          key={`${item.summary ?? index}-${index}`}
          className="flex gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-5 shadow-sm"
        >
          <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
          <div className="space-y-1">
            {item.summary ? (
              <strong className="block text-sm font-semibold text-slate-900">{item.summary}</strong>
            ) : null}
            {item.detail ? (
              <p className="text-sm leading-6 text-slate-700">{item.detail}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

SummaryList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.string,
      detail: PropTypes.string,
    }),
  ),
};

SummaryList.defaultProps = {
  items: undefined,
};

function StepsList({ steps }) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <ol className="mt-10 grid gap-6 md:grid-cols-2">
      {steps.map((step, index) => (
        <li
          key={`${step.summary ?? index}-${index}`}
          className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div className="space-y-2">
              {step.summary ? (
                <strong className="block text-sm font-semibold text-slate-900">{step.summary}</strong>
              ) : null}
              {step.detail ? (
                <p className="text-sm leading-6 text-slate-700">{step.detail}</p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

StepsList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.string,
      detail: PropTypes.string,
    }),
  ),
};

StepsList.defaultProps = {
  steps: undefined,
};

function FAQList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.question} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

FAQList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string,
    }),
  ),
};

FAQList.defaultProps = {
  items: undefined,
};

function Section({ title, children, background = 'white' }) {
  const backgroundClass = background === 'tint' ? 'bg-emerald-950/5' : 'bg-white';
  return (
    <section className={`${backgroundClass} py-16 sm:py-20`}>
      <div className="mx-auto max-w-6xl px-6">
        {title ? (
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  background: PropTypes.oneOf(['white', 'tint']),
};

Section.defaultProps = {
  title: undefined,
  background: 'white',
};

export default function StructuredServicePage({ serviceKey, image }) {
  const { t } = useTranslation('services');
  const service = t(serviceKey, { returnObjects: true }) ?? {};

  const seo = service.seo ?? {};
  const hero = service.hero ?? {};
  const isThisForYou = service.isThisForYou ?? {};
  const howWeWork = service.howWeWork ?? {};
  const journey = service.journey ?? {};
  const outcomes = service.outcomes ?? {};
  const boundaries = service.boundaries ?? {};
  const faq = service.faq ?? {};
  const cta = service.cta ?? {};

  return (
    <MainLayout>
      <Head>
        <title>{seo.title ?? `${hero.title ?? 'Service'} | SustainSage`}</title>
        {seo.description ? <meta name="description" content={seo.description} /> : null}
      </Head>

      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        image={image}
        imageAlt={`${hero.title ?? 'Service illustration'}`}
      >
        {hero.primaryCta && hero.primaryHref ? (
          <Link
            href={hero.primaryHref}
            className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          >
            {hero.primaryCta}
          </Link>
        ) : null}
        {hero.secondaryCta && hero.secondaryHref ? (
          <Link
            href={hero.secondaryHref}
            className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          >
            {hero.secondaryCta}
          </Link>
        ) : null}
      </Hero>

      <Section title={isThisForYou.title} background="white">
        <SummaryList items={isThisForYou.items} />
      </Section>

      <Section title={howWeWork.title} background="tint">
        <SummaryList items={howWeWork.items} />
      </Section>

      <Section title={journey.title} background="white">
        <StepsList steps={journey.steps} />
      </Section>

      <Section title={outcomes.title} background="tint">
        <SummaryList items={outcomes.items} />
      </Section>

      <Section title={boundaries.title} background="white">
        <SummaryList items={boundaries.items} />
      </Section>

      <Section title={faq.title} background="tint">
        <FAQList items={faq.items} />
      </Section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/80 px-8 py-12 text-center shadow-sm">
          {cta.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{cta.title}</h2>
          ) : null}
          {cta.body ? <p className="mt-4 text-sm leading-6 text-slate-700">{cta.body}</p> : null}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {cta.primaryCta && cta.primaryHref ? (
              <Link
                href={cta.primaryHref}
                className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
              >
                {cta.primaryCta}
              </Link>
            ) : null}
            {cta.secondaryCta && cta.secondaryHref ? (
              <Link
                href={cta.secondaryHref}
                className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
              >
                {cta.secondaryCta}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

StructuredServicePage.propTypes = {
  serviceKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
