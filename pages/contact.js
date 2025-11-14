import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import StepList from '@/components/ui/StepList';
import { orderSections } from '@/lib/content/normalize';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

const INPUT_CLASSNAME =
  'w-full rounded-card border border-sustain-cardBorder bg-white px-4 py-3 text-sustain-text placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sustain-green/40';

function BulletCard({ title, description, items }) {
  if (!items?.length) return null;
  return (
    <Card title={title} subtitle={description}>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sustain-green" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function ContactPage() {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({ name: '', email: '', topic: '', message: '', consent: false });
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const journey = t('journey', { returnObjects: true });
  const whatYouGet = t('what_you_get', { returnObjects: true });
  const whatWeDontDo = t('what_we_dont_do', { returnObjects: true });
  const sidebar = t('sidebar', { returnObjects: true });
  const miniFaq = t('miniFaq', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });
  const journeyItems = dedupeBy(
    orderSections(Array.isArray(journey?.items) ? journey.items : []),
    (item, index) => item?.summary ?? item?.q ?? index
  );
  const whatYouGetItems = dedupeBy(
    orderSections(Array.isArray(whatYouGet?.items) ? whatYouGet.items : []),
    (item, index) => item ?? item?.summary ?? index
  );
  const whatWeDontDoItems = dedupeBy(
    orderSections(Array.isArray(whatWeDontDo?.items) ? whatWeDontDo.items : []),
    (item, index) => item ?? item?.summary ?? index
  );
  const miniFaqItems = dedupeBy(
    orderSections(Array.isArray(miniFaq?.items) ? miniFaq.items : []),
    (item, index) => item?.q ?? item?.question ?? index
  );

  const journeySteps = journeyItems.map((item) => ({ title: item.summary ?? item.q, description: item.detail ?? item.a }));

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setStatusMessage('');

    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      setStatus('error');
      setStatusMessage(t('form.status.errorRequired'));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          topic: formData.topic || 'General enquiry',
          message: formData.message,
          consent: formData.consent,
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      setFormData({ name: '', email: '', topic: '', message: '', consent: false });
      setStatus('success');
      setStatusMessage(t('form.status.success'));
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
      setStatusMessage(t('form.status.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="ss-container">
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
      </Head>

      <section className="ss-section">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-sustain-text">{hero?.title}</h1>
          <p className="text-base leading-relaxed text-slate-700">{hero?.body}</p>
          {hero?.bullets?.length ? (
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{hero?.bulletsTitle}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {hero.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sustain-green" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{journey?.title}</p>
          {journey?.intro ? <p className="text-base text-slate-700">{journey.intro}</p> : null}
        </div>
        <div className="mt-8">
          <StepList steps={journeySteps} className="mx-auto max-w-3xl md:mx-0" />
        </div>
      </section>

      <section className="ss-section">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Card title={t('form.title')} subtitle={t('form.subtitle')}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-sustain-text">
                    {t('form.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={INPUT_CLASSNAME}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-sustain-text">
                    {t('form.email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={INPUT_CLASSNAME}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="topic" className="block text-sm font-semibold text-sustain-text">
                    How did you find us?
                  </label>
                  <input
                    id="topic"
                    name="topic"
                    type="text"
                    className={INPUT_CLASSNAME}
                    placeholder="e.g. referral, LinkedIn, workshop"
                    value={formData.topic}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-sustain-text">
                    {t('form.help')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={INPUT_CLASSNAME}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('form.helpHint')}
                    required
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-sustain-cardBorder text-sustain-green focus:ring-sustain-green"
                    required
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed text-slate-700">
                    <Trans
                      t={t}
                      i18nKey="consent.label"
                      components={{
                        0: (
                          <Link
                            href="/legal/coaching-boundaries"
                            className="font-semibold text-sustain-green underline-offset-2 hover:underline"
                          />
                        ),
                      }}
                    />
                  </label>
                </div>
                {status ? (
                  <div
                    className={`rounded-card px-4 py-3 text-sm ${
                      status === 'success'
                        ? 'bg-sustain-green/10 text-sustain-green'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {statusMessage}
                  </div>
                ) : null}
                <button type="submit" className="ss-btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? t('form.status.submitting') : t('form.submit')}
                </button>
              </form>
            </Card>
            <div className="mt-6 rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-sustain-text">{sidebar?.responseTitle}</p>
              <p className="mt-2 text-sm text-slate-700">{sidebar?.responseCopy}</p>
              <p className="mt-4 text-sm font-semibold text-sustain-text">Reply within 2–3 UK working days.</p>
              <p className="mt-1 text-sm text-slate-700">contact@sustainsage.com · +44 (0)20 8638 7870</p>
            </div>
          </div>
          <div className="space-y-6">
            <BulletCard title={whatYouGet?.title} description={whatYouGet?.description} items={whatYouGetItems} />
            <BulletCard title={whatWeDontDo?.title} description={whatWeDontDo?.description} items={whatWeDontDoItems} />
          </div>
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-sustain-text">Quick answers</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {miniFaqItems.map((item) => (
            <Card key={item.q ?? item.question} title={item.q ?? item.question}>
              <p className="text-sm text-slate-700">{item.a ?? item.answer}</p>
            </Card>
          ))}
        </div>
        {faqLink?.label ? (
          <div className="mt-6">
            <Link href={faqLink.href} className="ss-btn-secondary">
              {faqLink.label}
            </Link>
          </div>
        ) : null}
      </section>

      <section className="ss-section">
        <ICFNotice id="icf" className="mx-auto max-w-3xl" />
      </section>
    </main>
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
