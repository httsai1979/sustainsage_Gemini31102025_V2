import PropTypes from 'prop-types';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import SectionContainer from '@/components/sections/SectionContainer';
import TeamGrid from '@/components/about/TeamGrid';
import WhatIsCoaching from '@/components/about/WhatIsCoaching';
import { orderSections } from '@/lib/content/normalize';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

function Eyebrow({ children = null } = {}) {
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

function BulletList({ items = [] } = {}) {
  if (!items?.length) return null;
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li
          key={item.title ?? item}
          className="flex gap-3 rounded-2xl border border-emerald-100 bg-white p-5"
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

function StepList({ steps = [] } = {}) {
  if (!steps?.length) return null;

  return (
    <ol className="mt-8 space-y-6">
      {steps.map((step, index) => (
        <li key={step.title ?? index} className="flex gap-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div className="rounded-2xl border border-emerald-100 bg-white p-5">
            {step.title ? <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3> : null}
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

function Callout({ title, body, primary, secondary } = {}) {
  if (!title && !body) return null;

  const hasPrimary = primary?.href && primary?.label;
  const hasSecondary = secondary?.href && secondary?.label;

  return (
    <section className="bg-emerald-900 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 text-white">
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

export default function AboutPage({
  copy = {},
  team = undefined,
  coaching = undefined,
  showFallbackNotice = false,
  fallbackNotice = undefined,
} = {}) {
  const {
    intro = {},
    key_points: keyPoints = {},
    process = {},
    boundaries = {},
    callout = {},
    whatIsCoaching: whatIsCoachingFromCopy = {},
  } = copy ?? {};

  const whatIsCoaching = coaching ?? whatIsCoachingFromCopy;
  const keyPointItems = orderSections(Array.isArray(keyPoints?.items) ? keyPoints.items : []);
  const processSteps = orderSections(Array.isArray(process?.steps) ? process.steps : []);
  const boundaryItems = orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []);
  const fallbackMessage =
    fallbackNotice ??
    copy?.fallbackNotice ??
    team?.fallbackNotice ??
    'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <SectionContainer wide className="bg-white">
        <div className="mx-auto max-w-3xl space-y-6">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          {intro.title ? (
            <h1 className="scroll-mt-28 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{intro.title}</h1>
          ) : null}
          {intro.body ? <p className="text-base leading-7 text-slate-700">{intro.body}</p> : null}
          {showFallbackNotice ? (
            <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
          ) : null}
        </div>
      </SectionContainer>

      <TeamGrid data={team} />

      <WhatIsCoaching data={whatIsCoaching} />

      {keyPointItems.length ? (
        <SectionContainer wide className="bg-emerald-50/70">
          <div className="mx-auto max-w-3xl">
            {keyPoints.title ? (
              <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{keyPoints.title}</h2>
            ) : null}
            <BulletList items={keyPointItems} />
          </div>
        </SectionContainer>
      ) : null}

      {processSteps.length ? (
        <SectionContainer wide className="bg-white">
          <div className="mx-auto max-w-3xl">
            {process.title ? (
              <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{process.title}</h2>
            ) : null}
            {process.description ? (
              <p className="mt-3 text-sm leading-6 text-slate-700">{process.description}</p>
            ) : null}
            <StepList steps={processSteps} />
          </div>
        </SectionContainer>
      ) : null}

      <Callout {...callout} />

      {boundaryItems.length ? (
        <SectionContainer wide className="bg-emerald-50/70">
          <div className="mx-auto max-w-3xl">
            {boundaries.title ? (
              <h2 className="scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{boundaries.title}</h2>
            ) : null}
            {boundaries.description ? (
              <p className="mt-3 text-sm leading-6 text-slate-700">{boundaries.description}</p>
            ) : null}
            <FAQAccordion items={boundaryItems} className="mt-6" />
          </div>
        </SectionContainer>
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
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};


AboutPage.getLayout = function getLayout(page) {
  const seo = page.props?.copy?.seo ?? {};
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
  const currentLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
  const aboutContent = loadContent('content/about/{locale}.json', currentLocale);
  const teamContent = loadContent('content/team/{locale}.json', currentLocale);

  const copy = aboutContent.data ?? {};
  const team = teamContent.data ?? undefined;
  const whatIsCoaching = copy?.whatIsCoaching;
  const showFallbackNotice = Boolean(
    (aboutContent.locale && aboutContent.locale !== currentLocale) ||
      (teamContent.locale && teamContent.locale !== currentLocale)
  );
  const fallbackNotice =
    copy?.fallbackNotice ??
    team?.fallbackNotice ??
    'Temporarily showing English content while we complete this translation.';

  const props = {
    copy,
    team,
    coaching: whatIsCoaching,
    showFallbackNotice,
    fallbackNotice,
    ...(await serverSideTranslations(currentLocale, ['common'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
