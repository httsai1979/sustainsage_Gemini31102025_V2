import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import { H1 } from '@/components/ui/H';
import PageSection from '@/components/ui/PageSection';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import Icon from '@/components/ui/Icon';
import StepList from '@/components/ui/StepList';
import Callout from '@/components/ui/Callout';
import { orderSections } from '@/lib/orderSections';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

const SCENARIO_ICONS = ['compass', 'target', 'calendar', 'clock', 'handshake', 'book'];

function Hero({ intro, showFallbackNotice, fallbackMessage }) {
  if (!intro) return null;
  return (
    <PageSection background="paper">
      <div className="max-w-3xl space-y-6">
        {intro.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">{intro.eyebrow}</p>
        ) : null}
        {intro.title ? <H1>{intro.title}</H1> : null}
        {intro.body ? (
          <p className="text-base leading-7 text-slate-600">{intro.body}</p>
        ) : null}
        {showFallbackNotice ? (
          <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
        ) : null}
      </div>
    </PageSection>
  );
}

Hero.propTypes = {
  intro: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackMessage: PropTypes.string,
};

function TeamSection({ team }) {
  const list = Array.isArray(team?.members) && team.members.length > 0 ? team.members : team?.people ?? [];
  if (!list.length) return null;
  return (
    <PageSection title={team?.title} lead={team?.description} eyebrow={team?.eyebrow}>
      <CardGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {list.map((member) => (
          <Card
            key={member.name ?? member.title}
            title={member.name}
            subtitle={member.title}
          >
            <div className="flex items-start gap-4">
              {member.image?.src ? (
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-slate-200">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt ?? member.name ?? ''}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="space-y-2 text-sm text-slate-600">
                {member.bio ? <p>{member.bio}</p> : null}
                {member.languages?.length ? (
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {member.languages.join(' · ')}
                  </p>
                ) : null}
                {member.location ? <p className="text-xs text-slate-500">{member.location}</p> : null}
              </div>
            </div>
          </Card>
        ))}
      </CardGrid>
    </PageSection>
  );
}

TeamSection.propTypes = {
  team: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.array,
    people: PropTypes.array,
  }),
};

function ScenarioGrid({ data }) {
  const scenarios = Array.isArray(data?.scenarios) ? data.scenarios.filter(Boolean) : [];
  if (!scenarios.length) return null;
  return (
    <PageSection eyebrow={data?.eyebrow} title={data?.title} lead={data?.description}>
      <CardGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {scenarios.map((scenario, index) => {
          const normalized = typeof scenario === 'string' ? { title: scenario } : scenario;
          const iconName = normalized.icon ?? SCENARIO_ICONS[index % SCENARIO_ICONS.length];
          return (
            <Card
              key={normalized.title ?? normalized.description ?? index}
              title={normalized.title}
              icon={<Icon name={iconName} />}
              prose
            >
              {normalized.description ? <p className="text-sm text-slate-600">{normalized.description}</p> : null}
            </Card>
          );
        })}
      </CardGrid>
      {(data?.cta?.href && data?.cta?.label) || (data?.secondaryCta?.href && data?.secondaryCta?.label) ? (
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          {data?.cta?.href && data?.cta?.label ? (
            <Link
              href={data.cta.href}
              className="inline-flex items-center justify-center rounded-full bg-sage px-5 py-3 text-white"
            >
              {data.cta.label}
            </Link>
          ) : null}
          {data?.secondaryCta?.href && data?.secondaryCta?.label ? (
            <Link
              href={data.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-sage/40 px-5 py-3 text-sage"
            >
              {data.secondaryCta.label}
            </Link>
          ) : null}
        </div>
      ) : null}
      {data?.disclaimer ? (
        <p className="mt-6 text-xs leading-5 text-slate-500">{data.disclaimer}</p>
      ) : null}
    </PageSection>
  );
}

ScenarioGrid.propTypes = {
  data: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    scenarios: PropTypes.array,
    cta: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    }),
    secondaryCta: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    }),
    disclaimer: PropTypes.string,
  }),
};

function Principles({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <PageSection title={title}>
      <CardGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {items.map((item, index) => {
          const normalized = typeof item === 'string' ? { description: item } : item;
          return (
            <Card
              key={normalized.title ?? normalized.description ?? index}
              title={normalized.title}
              prose
            >
              {normalized.description ? <p className="text-sm text-slate-600">{normalized.description}</p> : null}
            </Card>
          );
        })}
      </CardGrid>
    </PageSection>
  );
}

Principles.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};

function BoundariesSection({ boundaries }) {
  const items = orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []);
  if (!items.length) return null;
  return (
    <PageSection title={boundaries?.title} lead={boundaries?.description}>
      <FAQAccordion items={items} className="mt-6" />
    </PageSection>
  );
}

BoundariesSection.propTypes = {
  boundaries: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
  }),
};

export default function AboutPage({
  copy = {},
  team = undefined,
  showFallbackNotice = false,
  fallbackNotice = undefined,
} = {}) {
  const keyPointItems = orderSections(Array.isArray(copy?.key_points?.items) ? copy.key_points.items : []);
  const processSteps = orderSections(Array.isArray(copy?.process?.steps) ? copy.process.steps : []);
  const callout = copy?.callout ?? {};
  const fallbackMessage =
    fallbackNotice ??
    copy?.fallbackNotice ??
    team?.fallbackNotice ??
    'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <Hero intro={copy?.intro} showFallbackNotice={showFallbackNotice} fallbackMessage={fallbackMessage} />
      <TeamSection team={team} />
      <ScenarioGrid data={copy?.whatIsCoaching} />
      <Principles title={copy?.key_points?.title ?? 'Guiding principles'} items={keyPointItems} />
      <PageSection title={copy?.process?.title} lead={copy?.process?.description}>
        <StepList steps={processSteps} />
      </PageSection>
      <BoundariesSection boundaries={copy?.boundaries} />
      <PageSection>
        <Callout
          title={callout?.title}
          body={callout?.body}
          actions={[
            callout?.primary,
            callout?.secondary,
          ].filter((link) => link?.href && link?.label)}
        />
      </PageSection>
    </>
  );
}

AboutPage.propTypes = {
  copy: PropTypes.object,
  team: PropTypes.object,
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
    showFallbackNotice,
    fallbackNotice,
    ...(await serverSideTranslations(currentLocale, ['common'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
