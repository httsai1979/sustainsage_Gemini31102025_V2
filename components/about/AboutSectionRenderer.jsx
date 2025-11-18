import Link from 'next/link';
import PropTypes from 'prop-types';

import PageSection from '@/components/ui/PageSection';
import CardShell from '@/components/ui/CardShell';

const GRID_MAP = {
  1: 'grid grid-cols-1 gap-4',
  2: 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6',
  3: 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3',
  4: 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4',
};

function CardBody({ body = [], bullets = [] }) {
  const paragraphs = body.filter((paragraph) => typeof paragraph === 'string' && paragraph.length > 0);
  const bulletItems = bullets.filter((item) => typeof item === 'string' && item.length > 0);
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {bulletItems.length ? (
        <ul className="mt-3 space-y-2">
          {bulletItems.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-sustain-textMuted">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sustain-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

CardBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.string),
  bullets: PropTypes.arrayOf(PropTypes.string),
};

function CardsSection({ section }) {
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  if (!cards.length) return null;
  const columns = section?.columns && Number.isFinite(section.columns) ? section.columns : 3;
  const safeColumns = Math.min(Math.max(Math.floor(columns), 1), 4);
  const gridClass = GRID_MAP[safeColumns] ?? GRID_MAP[3];

  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title} lead={section?.lead}>
      <div className={gridClass}>
        {cards.map((card) => {
          const paragraphs = Array.isArray(card?.body)
            ? card.body
            : card?.body
              ? [card.body]
              : [];
          const bullets = Array.isArray(card?.bullets) ? card.bullets : [];
          const key = card?.id ?? card?.title ?? card?.href;
          const cardProps = card?.href
            ? { as: Link, href: card.href }
            : {};
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
              <CardBody body={paragraphs} bullets={bullets} />
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
  const body = Array.isArray(section?.body)
    ? section.body
    : section?.body
      ? [section.body]
      : [];
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

export default function AboutSectionRenderer({ section }) {
  if (!section) return null;
  if (section.style === 'prose') {
    return <ProseSection section={section} />;
  }
  return <CardsSection section={section} />;
}

AboutSectionRenderer.propTypes = {
  section: PropTypes.shape({
    style: PropTypes.string,
  }),
};
