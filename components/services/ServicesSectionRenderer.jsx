import Link from 'next/link';
import PropTypes from 'prop-types';

import PageSection from '@/components/ui/PageSection';
import Button from '@/components/ui/Button';
import CardShell from '@/components/ui/CardShell';
import StepList from '@/components/ui/StepList';

const GRID_MAP = {
  1: 'grid grid-cols-1 gap-6',
  2: 'grid grid-cols-1 gap-6 md:grid-cols-2',
  3: 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

function normalizeParagraphs(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim().length > 0);
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return [value];
  }
  return [];
}

function CardsSection({ section }) {
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  if (!cards.length) return null;
  const columns = section?.columns && Number.isFinite(section.columns) ? section.columns : cards.length >= 4 ? 4 : cards.length;
  const safeColumns = Math.min(Math.max(Math.floor(columns || 1), 1), 4);
  const gridClass = GRID_MAP[safeColumns] ?? GRID_MAP[3];

  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title} lead={section?.lead}>
      <div className={gridClass}>
        {cards.map((card) => {
          const paragraphs = normalizeParagraphs(card?.body);
          const bullets = normalizeParagraphs(card?.bullets);
          const key = card?.id ?? card?.title ?? card?.href;
          const cardProps = card?.href ? { as: Link, href: card.href } : {};
          return (
            <CardShell
              key={key}
              {...cardProps}
              iconName={card?.iconName}
              eyebrow={card?.eyebrow}
              title={card?.title}
              meta={card?.meta}
              target={card?.target}
              rel={card?.rel}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink/70">
                  {paragraph}
                </p>
              ))}
              {bullets.length ? (
                <ul className="mt-3 space-y-2">
                  {bullets.map((item) => (
                    <li key={item} className="flex gap-2 text-base text-ink/70">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sustain-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </CardShell>
          );
        })}
      </div>
    </PageSection>
  );
}

CardsSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    columns: PropTypes.number,
    cards: PropTypes.array,
  }),
};

function ProseSection({ section }) {
  const body = normalizeParagraphs(section?.body);
  if (!body.length) return null;
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title} lead={section?.lead} prose>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </PageSection>
  );
}

ProseSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    body: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }),
};

function StepsSection({ section }) {
  const steps = Array.isArray(section?.steps)
    ? section.steps.map((step) => {
        const description = normalizeParagraphs(step?.body);
        return {
          ...step,
          title: step?.title,
          description: description.join(' '),
        };
      })
    : [];

  if (!steps.length) return null;

  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title} lead={section?.lead}>
      <StepList steps={steps} />
    </PageSection>
  );
}

StepsSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    steps: PropTypes.array,
  }),
};

function CTASection({ section }) {
  if (!section?.title) return null;
  const body = normalizeParagraphs(section?.body);
  const actions = [section?.primaryCta, section?.secondaryCta].filter((action) => action?.href && action?.label);

  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section.title} lead={body?.[0]}>
      {body.slice(1).map((paragraph) => (
        <p key={paragraph} className="mt-3 text-base leading-relaxed text-sustain-textMuted">
          {paragraph}
        </p>
      ))}
      {actions.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Button key={action.href} href={action.href} variant={index === 0 ? 'primary' : 'secondary'}>
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </PageSection>
  );
}

CTASection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    primaryCta: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    }),
    secondaryCta: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    }),
  }),
};

export default function ServicesSectionRenderer({ section }) {
  if (!section) return null;
  if (section.style === 'prose') {
    return <ProseSection section={section} />;
  }
  if (section.style === 'steps') {
    return <StepsSection section={section} />;
  }
  if (section.style === 'cta') {
    return <CTASection section={section} />;
  }
  return <CardsSection section={section} />;
}

ServicesSectionRenderer.propTypes = {
  section: PropTypes.shape({
    style: PropTypes.string,
  }),
};
