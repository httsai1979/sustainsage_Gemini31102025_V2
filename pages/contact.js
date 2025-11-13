import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@/components/Sections/ContactForm';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import { orderSections } from '@/lib/content/normalize';
import { toSerializable } from '@/lib/toSerializable';

function BulletHighlights({ items, title, description }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="ssg-card">
      {title ? <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{title}</p> : null}
      {description ? <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p> : null}
      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function JourneyCard({ item, index }) {
  return (
    <div className="ssg-card flex flex-col gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
        {index + 1}
      </div>
      <div className="space-y-2 text-sm leading-6 text-ink/80">
        <h3 className="text-base font-semibold text-ink">{item.summary}</h3>
        {item.detail ? <p>{item.detail}</p> : null}
      </div>
    </div>
  );
}

function FAQItem({ item }) {
  return (
    <div className="ssg-card">
      <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/80">{item.answer}</p>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation('contact');
  const [hasBoundaryConsent, setHasBoundaryConsent] = useState(false);

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const journey = t('journey', { returnObjects: true });
  const miniFaq = t('miniFaq', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });
  const whatYouGet = t('what_you_get', { returnObjects: true });
  const whatWeDontDo = t('what_we_dont_do', { returnObjects: true });
  const consent = t('consent', { returnObjects: true });
  const journeyItems = orderSections(Array.isArray(journey?.items) ? journey.items : []);
  const miniFaqItems = orderSections(Array.isArray(miniFaq?.items) ? miniFaq.items : []);
  const whatYouGetItems = orderSections(Array.isArray(whatYouGet?.items) ? whatYouGet.items : []);
  const whatWeDontDoItems = orderSections(Array.isArray(whatWeDontDo?.items) ? whatWeDontDo.items : []);
  const heroBullets = orderSections(Array.isArray(hero?.bullets) ? hero.bullets : []);

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
      </Head>

      <PageSection background="paper">
        <div className="typography mx-auto flex max-w-3xl flex-col gap-4 text-center md:text-left">
          <h1>{hero?.title}</h1>
          {hero?.body ? <p>{hero.body}</p> : null}
        </div>
      </PageSection>

      <PageSection>
        <div className="typography flex flex-col gap-4">
          <h2>{journey?.title}</h2>
          {journey?.intro ? <p>{journey.intro}</p> : null}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journeyItems.map((item, index) => (
            <JourneyCard key={item.summary} item={item} index={index} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            {whatYouGetItems.length || whatWeDontDoItems.length ? (
              <div className="space-y-6">
                <BulletHighlights items={whatYouGetItems} title={whatYouGet?.title} description={whatYouGet?.description} />
                <BulletHighlights
                  items={whatWeDontDoItems}
                  title={whatWeDontDo?.title}
                  description={whatWeDontDo?.description}
                />
              </div>
            ) : null}
            <BulletHighlights items={heroBullets} title={hero?.bulletsTitle} />
            <div className="ssg-card">
              <div className="flex items-start gap-3">
                <input
                  id="coaching-consent"
                  name="coaching-consent"
                  type="checkbox"
                  checked={hasBoundaryConsent}
                  onChange={(event) => setHasBoundaryConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="coaching-consent" className="text-sm leading-6 text-ink/80">
                  <Trans
                    t={t}
                    i18nKey="consent.label"
                    components={{
                      Link: (
                        <Link
                          href="/legal/coaching-boundaries"
                          className="font-semibold text-primary underline-offset-2 hover:underline"
                        />
                      ),
                    }}
                  />
                </label>
              </div>
              {consent?.helper ? (
                <p className="mt-3 text-xs leading-6 text-ink/60">{consent.helper}</p>
              ) : null}
            </div>
          </div>
          <div className="ssg-card">
            <ContactForm hasBoundaryConsent={hasBoundaryConsent} />
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="typography mx-auto flex max-w-3xl flex-col gap-4">
          <h2>{miniFaq?.title}</h2>
          {miniFaq?.intro ? <p>{miniFaq.intro}</p> : null}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {miniFaqItems.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>
      </PageSection>

      {faqLink?.label ? (
        <PageSection background="paper">
          <div className="flex flex-col items-center gap-2 text-center text-sm leading-6 text-ink/80">
            <p>{faqLink?.text}</p>
            <Link href={faqLink.href} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              {faqLink.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageSection>
      ) : null}

      <PageSection>
        <ICFNotice id="icf" className="mx-auto max-w-3xl" />
      </PageSection>
    </>
  );
}

ContactPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  });
}
