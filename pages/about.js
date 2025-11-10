import PropTypes from 'prop-types';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import TeamGrid from '@/components/about/TeamGrid';
import WhatIsCoaching from '@/components/about/WhatIsCoaching';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

function Eyebrow({ children }) {
  if (!children) return null;
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
      {children}
    </p>
  );
}

Eyebrow.propTypes = {
  children: PropTypes.node,
};

Eyebrow.defaultProps = {
  children: null,
};

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li
          key={item.title ?? item}
          className="flex gap-3 rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm"
        >
          <span aria-hidden className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
          <div className="space-y-1">
            {typeof item === 'string' ? (
              <span className="text-sm leading-6 text-slate-700">{item}</span>
            ) : (
              <>
                {item.title ? (
                  <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                ) : null}
                {item.description ? (
                  <p className="text-sm leading-6 text-slate-700">{item.description}</p>
                ) : null}
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
  if (!steps?.length) return null;

  return (
    <ol className="mt-8 space-y-6">
      {steps.map((step, index) => (
        <li key={step.title ?? index} className="flex gap-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
            {step.title ? <h3 className="text-base font-semibold text-slate-900">{step.title}</h3> : null}
            {step.description ? (
              <p className="mt-2 text-sm leading-6 text-slate-700">{step.description}</p>
            ) : null}
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

function Callout({ title, body, primary, secondary }) {
  if (!title && !body) return null;

  const hasPrimary = primary?.href && primary?.label;
  const hasSecondary = secondary?.href && secondary?.label;

  return (
    <section className="bg-emerald-900 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 text-white">
        {title ? (
          <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        ) : null}
        {body ? (
          <p className="mt-4 text-base leading-7 text-emerald-100">{body}</p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {hasPrimary ? (
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {primary.label}
            </Link>
          ) : null}
          {hasSecondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

Callout.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  primary: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  }),
  secondary: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  }),
};

Callout.defaultProps = {
  title: undefined,
  body: undefined,
  primary: undefined,
  secondary: undefined,
};

export default function AboutPage({ copy, team, coaching }) {
  const {
    intro = {},
    key_points: keyPoints = {},
    process = {},
    boundaries = {},
    callout = {},
    whatIsCoaching: whatIsCoachingFromCopy = {},
  } = copy ?? {};

  const whatIsCoaching = coaching ?? whatIsCoachingFromCopy;

  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          {intro.title ? (
            <h1 className="scroll-mt-28 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{intro.title}</h1>
          ) : null}
          {intro.body ? <p className="text-base leading-7 text-slate-700">{intro.body}</p> : null}
        </div>
      </section>

      <TeamGrid data={team} />

      <WhatIsCoaching data={whatIsCoaching} />

      {keyPoints?.items?.length ? (
        <section className="bg-emerald-50/70 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            {keyPoints.title ? (
              <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{keyPoints.title}</h2>
            ) : null}
            <BulletList items={keyPoints.items} />
          </div>
        </section>
      ) : null}

      {process?.steps?.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            {process.title ? (
              <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{process.title}</h2>
            ) : null}
            {process.description ? (
              <p className="mt-3 text-sm leading-6 text-slate-700">{process.description}</p>
            ) : null}
            <StepList steps={process.steps} />
          </div>
        </section>
      ) : null}

      <Callout {...callout} />

      {boundaries?.items?.length ? (
        <section className="bg-emerald-50/70 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            {boundaries.title ? (
              <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{boundaries.title}</h2>
            ) : null}
            {boundaries.description ? (
              <p className="mt-3 text-sm leading-6 text-slate-700">{boundaries.description}</p>
            ) : null}
            <FAQAccordion items={boundaries.items} className="mt-6" />
          </div>
        </section>
      ) : null}
    </>
  );
}

const teamMemberPropType = PropTypes.shape({
  name: PropTypes.string,
  title: PropTypes.string,
  bio: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
});

const teamDataPropType = PropTypes.shape({
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  members: PropTypes.arrayOf(teamMemberPropType),
  people: PropTypes.arrayOf(teamMemberPropType),
});

const whatIsCoachingPropType = PropTypes.shape({
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  scenarios: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  disclaimer: PropTypes.string,
});

AboutPage.propTypes = {
  copy: PropTypes.shape({
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    intro: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
    }),
    key_points: PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
          }),
        ])
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
    }),
    boundaries: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string,
          answer: PropTypes.string,
        })
      ),
    }),
    callout: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      primary: PropTypes.shape({
        href: PropTypes.string,
        label: PropTypes.string,
      }),
      secondary: PropTypes.shape({
        href: PropTypes.string,
        label: PropTypes.string,
      }),
    }),
    whatIsCoaching: whatIsCoachingPropType,
  }),
  team: teamDataPropType,
  coaching: whatIsCoachingPropType,
};

AboutPage.defaultProps = {
  copy: {},
  team: undefined,
  coaching: undefined,
};

AboutPage.getLayout = function getLayout(page) {
  const seo = page.props?.copy?.seo ?? {};
  return (
    <MainLayout title={seo.title} desc={seo.description}>
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  const contentLocale = locale === 'en' ? 'en-GB' : locale;
  const copy = loadJSON('about', contentLocale);
  const team = loadJSON('team', contentLocale);
  const whatIsCoaching = copy?.whatIsCoaching;

  return toSerializable({
    props: {
      copy,
      team,
      coaching: whatIsCoaching,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
