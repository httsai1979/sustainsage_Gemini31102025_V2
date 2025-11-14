import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import StepList from '@/components/ui/StepList';
import Callout from '@/components/ui/Callout';
import Icon from '@/components/ui/Icon';
import { orderSections } from '@/lib/orderSections';
import { loadContent } from '@/lib/loadContent';
import { dedupeBy } from '@/lib/dedupe';
import { sanitizeProps } from '@/lib/toSerializable';

const VALUE_CARD_TEMPLATES = [
  {
    key: 'authenticity',
    title: 'Authenticity',
    fallback:
      'ICF-aligned practice keeps agreements, data care, and supervision transparent so trust can grow.',
  },
  {
    key: 'gentleness',
    title: 'Gentleness',
    fallback: 'We keep a calm cadence so experimentation feels kind, slow enough, and sustainable.',
  },
  {
    key: 'structure',
    title: 'Structure',
    fallback: 'Clear agreements, review points, and data boundaries help every partnership stay grounded.',
  },
  {
    key: 'cultural-sensitivity',
    title: 'Cultural sensitivity',
    fallback: 'Lived experience across Asia-Pacific and the UK keeps multilingual nuance and policy context in view.',
  },
];

function buildValueCards(copy = {}) {
  const keyPointItems = Array.isArray(copy?.key_points?.items) ? copy.key_points.items : [];
  const valueEntries = Array.isArray(copy?.values?.items) ? copy.values.items : [];
  return VALUE_CARD_TEMPLATES.map((template, index) => {
    const source = keyPointItems[index] ?? valueEntries[index];
    const description =
      typeof source === 'string'
        ? source
        : source?.description ?? source?.body ?? source?.text ?? source?.title;
    return {
      ...template,
      description: description ?? template.fallback,
    };
  });
}

function TeamSection({ team }) {
  const list = Array.isArray(team?.members) && team.members.length > 0 ? team.members : team?.people ?? [];
  const members = dedupeBy(list, (member, index) => member?.name ?? member?.title ?? member?.id ?? index);
  if (!members.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        {team?.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{team.eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-semibold text-sustain-text">{team?.title ?? 'Meet the team'}</h2>
        {team?.description ? <p className="text-base text-slate-700">{team.description}</p> : null}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.name ?? member.title} title={member.name} subtitle={member.title}>
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              {member.image?.src ? (
                <div className="relative h-32 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt ?? member.name ?? ''}
                    fill
                    className="object-cover"
                  />
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

function ValueGrid({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">What guides my work</p>
        <h2 className="text-3xl font-semibold text-sustain-text">Values that shape every partnership</h2>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((value) => (
          <Card key={value?.key ?? value?.title} title={value?.title ?? 'Guiding principle'} icon={<Icon name="spark" />}>
            <p className="text-sm text-slate-700">{value?.description ?? value?.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

ValueGrid.propTypes = {
  items: PropTypes.array,
};

function StoryCards({ stories = [] }) {
  const successStories = dedupeBy(
    stories.filter((story) => typeof story === 'object' && story?.title),
    (story) => story.title
  ).slice(0, 3);
  if (!successStories.length) return null;
  return (
    <section className="ss-section">
      <div className="space-y-4 text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">Client success stories</p>
        <h2 className="text-3xl font-semibold text-sustain-text">Composite coaching glimpses</h2>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {successStories.map((story) => {
          const badge = story.category ?? story.segment ?? 'Coaching story';
          const duration = story.duration ?? story.timeline ?? story.length;
          return (
            <Card key={story.title} title={story.title}>
              <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-sustain-green/80">
                  <span>{badge}</span>
                  {duration ? <span className="text-slate-500 normal-case">{duration}</span> : null}
                </div>
                {story.context ? (
                  <p>
                    <span className="font-semibold text-sustain-text">Challenge: </span>
                    {story.context}
                  </p>
                ) : null}
                {story.coaching_moves ? (
                  <p>
                    <span className="font-semibold text-sustain-text">Journey: </span>
                    {story.coaching_moves}
                  </p>
                ) : null}
                {story.shift ? (
                  <p>
                    <span className="font-semibold text-sustain-text">Outcome: </span>
                    {story.shift}
                  </p>
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

StoryCards.propTypes = {
  stories: PropTypes.array,
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
      <div className="mt-8 rounded-card rounded-2xl border border-slate-100 bg-white p-4 shadow-md">
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
  const processSteps = orderSections(Array.isArray(copy?.process?.steps) ? copy.process.steps : []);
  const fallbackMessage =
    fallbackNotice ??
    copy?.fallbackNotice ??
    team?.fallbackNotice ??
    'Temporarily showing English content while we complete this translation.';

  const backgroundHighlights = dedupeBy(
    Array.isArray(copy?.approach?.pillars) ? copy.approach.pillars : [],
    (item, index) => item?.title ?? item?.description ?? index
  ).slice(0, 3);
  const heroParagraphs = [copy?.intro?.body, copy?.approach?.description].filter(Boolean);
  const valueCards = buildValueCards(copy);
  const approachDescription = copy?.process?.description ?? copy?.approach?.description;
  const personalNoteText =
    copy?.callout?.note ??
    copy?.callout?.body ??
    'Coaching is how we create steady space for bilingual, bicultural stories to be heard without urgency.';

  return (
    <main className="ss-container">
      <section className="ss-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
              {copy?.intro?.eyebrow ?? 'My journey'}
            </p>
            <h1 className="text-4xl font-semibold text-sustain-text">
              {copy?.intro?.title ?? 'Coaching for complex transitions'}
            </h1>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              {heroParagraphs.length
                ? heroParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : (
                    <p>
                      SustainSage keeps coaching steady, culturally aware, and grounded in practical experiments so you
                      can move at a humane pace.
                    </p>
                  )}
            </div>
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
          </div>
          <Card title="A personal note" subtitle="Why this work matters">
            <p className="text-sm leading-relaxed text-slate-700">{personalNoteText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {copy?.callout?.primary?.href ? (
                <Link href={copy.callout.primary.href} className="ss-btn-primary">
                  {copy.callout.primary.label}
                </Link>
              ) : null}
              {copy?.callout?.secondary?.href ? (
                <Link href={copy.callout.secondary.href} className="ss-btn-secondary">
                  {copy.callout.secondary.label}
                </Link>
              ) : null}
            </div>
          </Card>
        </div>
      </section>

      <ValueGrid items={valueCards} />

      <TeamSection team={team} />

      <StoryCards stories={copy?.approach?.cases ?? []} />

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">Professional background</p>
          <h2 className="text-3xl font-semibold text-sustain-text">Structures that keep our practice steady</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {backgroundHighlights.map((item) => (
            <Card key={item.title} title={item.title}>
              <p className="text-sm text-slate-700">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="ss-section">
        <Card title={copy?.process?.title ?? 'My coaching approach'}>
          {approachDescription ? (
            <p className="text-base leading-relaxed text-slate-700">{approachDescription}</p>
          ) : null}
          {processSteps.length ? (
            <div className="mt-8">
              <StepList steps={processSteps} />
            </div>
          ) : null}
        </Card>
      </section>

      <BoundariesSection boundaries={copy?.boundaries} />

      <section className="ss-section">
        <Callout
          title={copy?.callout?.title ?? 'Let’s have a conversation'}
          body={copy?.callout?.body ?? 'Browse our coaching services or read the full coaching boundaries we uphold.'}
          actions={[
            copy?.callout?.primary,
            copy?.callout?.secondary ?? { label: 'Explore services', href: '/services' },
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
