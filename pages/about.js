import PropTypes from 'prop-types';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import { loadJSON } from '@/lib/content';

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

function Paragraphs({ items }) {
  if (!items?.length) return null;
  return items.map((paragraph, index) => (
    <p key={`${paragraph}-${index}`} className="text-base leading-7 text-slate-700">
      {paragraph}
    </p>
  ));
}

Paragraphs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

Paragraphs.defaultProps = {
  items: undefined,
};

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-3 text-base leading-7 text-slate-700">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

BulletList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

BulletList.defaultProps = {
  items: undefined,
};

function Callout({ title, body, primary, secondary }) {
  if (!title && !body) return null;

  const hasPrimary = primary?.href && primary?.label;
  const hasSecondary = secondary?.href && secondary?.label;

  return (
    <section className="bg-emerald-900 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 text-white">
        {title ? (
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
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

export default function AboutPage({ copy }) {
  const { story = {}, approach = {}, clients = {}, boundaries = {}, callout = {} } = copy ?? {};

  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          {story.title ? (
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{story.title}</h1>
          ) : null}
          <Paragraphs items={story.paragraphs} />
          <BulletList items={story.bullets} />
        </div>
      </section>

      <section className="bg-emerald-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          {approach.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{approach.title}</h2>
          ) : null}
          <Paragraphs items={approach.paragraphs} />
          <BulletList items={approach.bullets} />
        </div>
      </section>

      <Callout {...callout} />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          <Eyebrow>{clients.eyebrow}</Eyebrow>
          {clients.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{clients.title}</h2>
          ) : null}
          <Paragraphs items={clients.paragraphs} />
          <BulletList items={clients.bullets} />
        </div>
      </section>

      <section className="bg-emerald-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          <Eyebrow>{boundaries.eyebrow}</Eyebrow>
          {boundaries.title ? (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{boundaries.title}</h2>
          ) : null}
          <Paragraphs items={boundaries.paragraphs} />
          <BulletList items={boundaries.bullets} />
        </div>
      </section>
    </>
  );
}

AboutPage.propTypes = {
  copy: PropTypes.shape({
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    story: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
      paragraphs: PropTypes.arrayOf(PropTypes.string),
      bullets: PropTypes.arrayOf(PropTypes.string),
    }),
    approach: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
      paragraphs: PropTypes.arrayOf(PropTypes.string),
      bullets: PropTypes.arrayOf(PropTypes.string),
    }),
    clients: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
      paragraphs: PropTypes.arrayOf(PropTypes.string),
      bullets: PropTypes.arrayOf(PropTypes.string),
    }),
    boundaries: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
      paragraphs: PropTypes.arrayOf(PropTypes.string),
      bullets: PropTypes.arrayOf(PropTypes.string),
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
  }),
};

AboutPage.defaultProps = {
  copy: {},
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

  return {
    props: {
      copy,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
