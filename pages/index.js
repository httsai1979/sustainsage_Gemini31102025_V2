import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Testimonials from '@/components/Testimonials';
import MainLayout from '@/components/layout/MainLayout';
import { loadJSON } from '@/lib/content';

const BUTTON_PRIMARY =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800';
const BUTTON_SECONDARY =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100';

function ServiceCard({ card }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
        <p className="text-sm leading-6 text-slate-700">{card.description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {card.linkLabel ?? 'Explore service'}
        <span aria-hidden className="transition group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

ServiceCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    href: PropTypes.string,
    linkLabel: PropTypes.string,
  }).isRequired,
};

export default function Home({ content, testimonials }) {
  const hero = content?.hero ?? {};
  const services = content?.services ?? {};
  const faqTeaser = content?.faqTeaser ?? {};

  return (
    <>
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-12 pt-10 md:flex-row md:items-center md:justify-between md:pt-16">
        <div className="max-w-xl space-y-6">
          {hero?.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.eyebrow}</p>
          ) : null}
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero?.title}</h1>
          {hero?.description ? <p className="text-base leading-7 text-slate-700">{hero.description}</p> : null}
          <div className="flex flex-wrap gap-3">
            {hero?.primaryCta?.href ? (
              <Link href={hero.primaryCta.href} className={BUTTON_PRIMARY}>
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero?.secondaryCta?.href ? (
              <Link href={hero.secondaryCta.href} className={BUTTON_SECONDARY}>
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        {hero?.image?.src ? (
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-emerald-100 shadow-sm md:max-w-md">
            <Image
              src={hero.image.src}
              alt={hero.image.alt ?? ''}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <div className="max-w-2xl space-y-4">
          {services?.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{services.eyebrow}</p>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{services?.title}</h2>
          {services?.description ? <p className="text-sm leading-6 text-slate-700">{services.description}</p> : null}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(services?.cards ?? []).slice(0, 3).map((card) => (
            <ServiceCard key={card.href} card={card} />
          ))}
        </div>
      </section>

      {faqTeaser?.title ? (
        <section className="mx-auto max-w-5xl px-5 pb-12 md:px-8">
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm md:p-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">{faqTeaser.title}</h2>
              {faqTeaser?.body ? <p className="text-sm leading-6 text-slate-700">{faqTeaser.body}</p> : null}
              {faqTeaser?.cta?.href ? (
                <Link
                  href={faqTeaser.cta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  {faqTeaser.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <Testimonials items={testimonials ?? []} />
      </section>
    </>
  );
}

Home.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    services: PropTypes.object,
    faqTeaser: PropTypes.object,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      attribution: PropTypes.string,
    })
  ),
};

Home.defaultProps = {
  content: {},
  testimonials: [],
};

Home.getLayout = function getLayout(page) {
  const seo = page.props?.content?.seo ?? {};
  return (
    <MainLayout title={seo.title} desc={seo.description}>
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en-GB' }) {
  const content = loadJSON('home', locale);
  const testimonials = loadJSON('testimonials', locale);

  return {
    props: {
      content,
      testimonials,
      ...(await serverSideTranslations(locale, ['common', 'home', 'faq'])),
    },
  };
}
