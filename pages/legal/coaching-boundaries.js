import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

function BulletHighlights({ block }) {
  if (!block?.items?.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      {block.title ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{block.title}</p>
      ) : null}
      {block.description ? <p className="mt-2 text-sm leading-6 text-slate-700">{block.description}</p> : null}
      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

BulletHighlights.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
};

BulletHighlights.defaultProps = {
  block: null,
};

function Section({ section }) {
  if (!section) return null;

  return (
    <section className="border-t border-emerald-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="typography flex flex-col gap-4">
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {Array.isArray(section.items) && section.items.length > 0 ? (
          <dl className="mt-8 space-y-5 text-sm leading-6 text-slate-700">
            {section.items.map((item) => (
              <div key={item.title ?? item.description}>
                {item.title ? (
                  <dt className="font-semibold text-emerald-800">{item.title}</dt>
                ) : null}
                {item.description ? <dd className="mt-1">{item.description}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

Section.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  }),
};

Section.defaultProps = {
  section: null,
};

export default function CoachingBoundariesPage({ content }) {
  const scope = content?.scope ?? {};
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <MainLayout title={content?.title} desc={content?.description}>
      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="typography flex flex-col gap-4">
            <h1>{content?.title}</h1>
            {content?.description ? <p>{content.description}</p> : null}
            {content?.lastUpdated ? (
              <p className="text-sm font-medium uppercase tracking-wide text-emerald-800">{content.lastUpdated}</p>
            ) : null}
          </div>
        </div>
      </section>

      {scope?.whatYouGet?.items?.length || scope?.whatWeDontDo?.items?.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <BulletHighlights block={scope?.whatYouGet} />
              <BulletHighlights block={scope?.whatWeDontDo} />
            </div>
          </div>
        </section>
      ) : null}

      {sections.map((section) => (
        <Section key={section.title ?? section.paragraphs?.[0]} section={section} />
      ))}
    </MainLayout>
  );
}

CoachingBoundariesPage.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    lastUpdated: PropTypes.string,
    scope: PropTypes.shape({
      whatYouGet: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      }),
      whatWeDontDo: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        paragraphs: PropTypes.arrayOf(PropTypes.string),
        items: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
};

CoachingBoundariesPage.defaultProps = {
  content: null,
};

export async function getStaticProps({ locale }) {
  const content = loadJSON('legal/coaching-boundaries', locale);

  return toSerializable({
    props: {
      content,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
