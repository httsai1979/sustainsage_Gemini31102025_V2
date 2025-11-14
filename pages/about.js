import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import { H1 } from '@/components/ui/H';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import StepList from '@/components/ui/StepList';
import Callout from '@/components/ui/Callout';
import { orderSections } from '@/lib/orderSections';
import { loadContent } from '@/lib/loadContent';
import { dedupeBy } from '@/lib/dedupe';
import { sanitizeProps } from '@/lib/toSerializable';

const SCENARIO_ICONS = ['compass', 'target', 'calendar', 'clock', 'handshake', 'book'];

function Hero({ intro, showFallbackNotice, fallbackMessage }) {
  if (!intro) return null;
  return (
    <section className="ss-section">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          {intro.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{intro.eyebrow}</p>
          ) : null}
          {intro.title ? <H1>{intro.title}</H1> : null}
          {intro.body ? <p className="text-base leading-relaxed text-slate-700">{intro.body}</p> : null}
          {showFallbackNotice ? (
            <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
          ) : null}
        </div>
        <div className="mt-8 md:mt-0">
          {intro.image?.src ? (
            <div className="overflow-hidden rounded-card border border-sustain-cardBorder bg-white shadow-card">
              <Image
                src={intro.image.src}
                alt={intro.image.alt ?? intro.title ?? ''}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center rounded-card border border-sustain-cardBorder bg-sustain-green/5 p-10 text-center text-sustain-green">
              <p className="text-base font-medium">Coaching grounded in care, culture, and structure.</p>
            </div>
          )}
        </div>
      </div>
    </section>
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
  const members = dedupeBy(list, (member, index) => member?.name ?? member?.title ?? member?.id ?? index);
  if (!members.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        {team?.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{team.eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-semibold text-sustain-text">{team?.title}</h2>
        {team?.description ? <p className="text-base text-slate-700">{team.description}</p> : null}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.name ?? member.title} title={member.name} subtitle={member.title}>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-700">
              {member.image?.src ? (
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-sustain-cardBorder">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt ?? member.name ?? ''}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {member.languages?.join(' · ')}
                  </div>
                </div>
              ) : null}
              {member.bio ? <p>{member.bio}</p> : null}
              {member.location ? <p className="text-xs text-slate-500">{member.location}</p> : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
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
  const scenarios = dedupeBy(
    Array.isArray(data?.scenarios) ? data.scenarios.filter(Boolean) : [],
    (scenario, index) =>
      typeof scenario === 'string'
        ? scenario
        : scenario?.title ?? scenario?.description ?? index
  );
  if (!scenarios.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        {data?.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{data.eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-semibold text-sustain-text">{data?.title}</h2>
        {data?.description ? <p className="text-base text-slate-700">{data.description}</p> : null}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario, index) => {
          const normalized = typeof scenario === 'string' ? { title: scenario } : scenario;
          const iconName = normalized.icon ?? SCENARIO_ICONS[index % SCENARIO_ICONS.length];
          return (
            <Card key={normalized.title ?? normalized.description ?? index} title={normalized.title} icon={<Icon name={iconName} />}>
              {normalized.description ? <p className="text-sm text-slate-700">{normalized.description}</p> : null}
            </Card>
          );
        })}
      </div>
      {(data?.cta?.href && data?.cta?.label) || (data?.secondaryCta?.href && data?.secondaryCta?.label) ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {data?.cta?.href && data?.cta?.label ? (
            <Link href={data.cta.href} className="ss-btn-primary">
              {data.cta.label}
            </Link>
          ) : null}
          {data?.secondaryCta?.href && data?.secondaryCta?.label ? (
            <Link href={data.secondaryCta.href} className="ss-btn-secondary">
              {data.secondaryCta.label}
            </Link>
          ) : null}
        </div>
      ) : null}
      {data?.disclaimer ? <p className="mt-6 text-xs leading-5 text-slate-500">{data.disclaimer}</p> : null}
    </section>
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
  const uniqueItems = dedupeBy(
    items,
    (item, index) =>
      typeof item === 'string'
        ? item
        : item?.title ?? item?.description ?? index
  );
  if (!uniqueItems.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-semibold text-sustain-text">{title}</h2>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {uniqueItems.map((item, index) => {
          const normalized = typeof item === 'string' ? { description: item } : item;
          return (
            <Card key={normalized.title ?? normalized.description ?? index} title={normalized.title}>
              {normalized.description ? <p className="text-sm text-slate-700">{normalized.description}</p> : null}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

Principles.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};

function BoundariesSection({ boundaries }) {
  const items = dedupeBy(
    orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []),
    (item, index) => item?.question ?? item?.title ?? item?.answer ?? index
  );
  if (!items.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-semibold text-sustain-text">{boundaries?.title}</h2>
        {boundaries?.description ? <p className="text-base text-slate-700">{boundaries.description}</p> : null}
      </div>
      <div className="mt-8 rounded-card border border-sustain-cardBorder bg-white p-4 shadow-card">
        <FAQAccordion items={items} />
      </div>
    </section>
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
  const keyPointItems = dedupeBy(
    orderSections(Array.isArray(copy?.key_points?.items) ? copy.key_points.items : []),
    (item, index) => item?.title ?? item?.description ?? index
  );
  const processSteps = orderSections(Array.isArray(copy?.process?.steps) ? copy.process.steps : []);
  const callout = copy?.callout ?? {};
  const fallbackMessage =
    fallbackNotice ??
    copy?.fallbackNotice ??
    team?.fallbackNotice ??
    'Temporarily showing English content while we complete this translation.';

  return (
    <main className="ss-container">
      <Hero intro={copy?.intro} showFallbackNotice={showFallbackNotice} fallbackMessage={fallbackMessage} />
      <TeamSection team={team} />
      <ScenarioGrid data={copy?.whatIsCoaching} />
      <Principles title={copy?.key_points?.title ?? 'Guiding principles'} items={keyPointItems} />
      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-sustain-text">{copy?.process?.title}</h2>
          {copy?.process?.description ? <p className="text-base text-slate-700">{copy.process.description}</p> : null}
        </div>
        <div className="mt-8">
          <StepList steps={processSteps} className="mx-auto max-w-3xl md:mx-0" />
        </div>
      </section>
      <BoundariesSection boundaries={copy?.boundaries} />
      <section className="ss-section">
        <Callout
          title={callout?.title}
          body={callout?.body}
          actions={[
            callout?.primary,
            callout?.secondary,
          ].filter((link) => link?.href && link?.label)}
        />
      </section>
    </main>
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
