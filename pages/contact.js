import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import CardShell from '@/components/ui/CardShell';
import PageSection from '@/components/ui/PageSection';
import { getContactPageContent } from '@/lib/contactContent';
import { toSerializable } from '@/lib/toSerializable';

const INPUT_CLASSNAME =
  'w-full rounded-2xl border border-sustain-cardBorder bg-white px-4 py-3 text-base text-sustain-textMain placeholder:text-sustain-textMuted focus:outline-none focus:ring-2 focus:ring-sustain-primary/40';
const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

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

function ContactPage({ content, showFallbackNotice, fallbackNotice }) {
  const hero = content?.hero ?? {};
  const formContent = content?.form ?? {};
  const formFields = formContent?.fields ?? {};
  const directContact = content?.directContact ?? {};

  const [formData, setFormData] = useState({ name: '', email: '', howFound: '', message: '', consent: false });
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const descriptionParagraphs = normalizeParagraphs(formContent?.description);
  const directBody = normalizeParagraphs(directContact?.body);

  const contactMethods = [
    directContact?.email
      ? {
          key: 'email',
          label: directContact?.emailLabel ?? 'Email',
          value: directContact.email,
          href: `mailto:${directContact.email}`,
        }
      : null,
    directContact?.phone
      ? {
          key: 'phone',
          label: directContact?.phoneLabel ?? 'Phone',
          value: directContact.phone,
          href: `tel:${directContact.phone.replace(/\(0\)/g, '').replace(/[^+\d]/g, '')}`,
        }
      : null,
  ].filter(Boolean);

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
      setStatusMessage(formContent?.errorRequired ?? 'Please complete the required fields.');
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
          topic: formData.howFound || 'General enquiry',
          message: formData.message,
          consent: formData.consent,
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      setFormData({ name: '', email: '', howFound: '', message: '', consent: false });
      setStatus('success');
      setStatusMessage(formContent?.successMessage ?? 'Thank you for reaching out.');
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
      setStatusMessage(formContent?.errorMessage ?? 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const consent = formContent?.consent ?? {};
  const hasDirectContact = Boolean(directBody.length || contactMethods.length);

  return (
    <>
      <ContentHero hero={hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />

      <PageSection id="contact-form" title={formContent?.title}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-card md:p-8">
            {descriptionParagraphs.length ? (
              <div className="space-y-3 text-base leading-relaxed text-ink/70">
                {descriptionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {formContent?.responseNote ? (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-sustain-textMuted">
                {formContent.responseNote}
              </p>
            ) : null}

            {status && statusMessage ? (
              <div
                role="status"
                aria-live="polite"
                className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
                  status === 'success' ? 'bg-sustain-primary/10 text-sustain-primary' : 'bg-red-50 text-red-700'
                }`}
              >
                {statusMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.name?.label ?? 'Name'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={formFields?.name?.placeholder ?? ''}
                  className={INPUT_CLASSNAME}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.email?.label ?? 'Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={formFields?.email?.placeholder ?? ''}
                  className={INPUT_CLASSNAME}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="howFound" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.howFound?.label ?? 'How did you find this site?'}
                </label>
                <input
                  id="howFound"
                  name="howFound"
                  type="text"
                  placeholder={formFields?.howFound?.placeholder ?? ''}
                  className={INPUT_CLASSNAME}
                  value={formData.howFound}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.message?.label ?? 'What would you like to talk about?'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder={formFields?.message?.placeholder ?? ''}
                  className={`${INPUT_CLASSNAME} min-h-[160px] resize-vertical`}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-sustain-cardBorder text-sustain-primary focus:ring-sustain-primary"
                />
                <div className="space-y-1 text-sm leading-relaxed text-sustain-textMuted">
                  <p>
                    {consent?.labelBeforeLink ? `${consent.labelBeforeLink} ` : null}
                    <Link href="/legal/coaching-boundaries" className="font-semibold text-sustain-primary underline-offset-2 hover:underline">
                      {consent?.linkLabel ?? 'Coaching Boundaries'}
                    </Link>
                    {consent?.labelAfterLink ? ` ${consent.labelAfterLink}` : null}
                  </p>
                  {consent?.helper ? <p className="text-xs text-sustain-textMuted/80">{consent.helper}</p> : null}
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full justify-center md:w-auto">
                {isSubmitting ? formContent?.submittingLabel ?? 'Sending…' : formContent?.submitLabel ?? 'Send message'}
              </Button>
            </form>
          </div>

          {hasDirectContact ? (
            <CardShell
              iconName={directContact?.iconName ?? 'chat'}
              title={directContact?.title}
              bodyClassName="space-y-4 text-base leading-relaxed text-ink/70"
            >
              {directBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {contactMethods.length ? (
                <dl className="space-y-3 text-base text-ink/80">
                  {contactMethods.map((method) => (
                    <div key={method.key}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">{method.label}</dt>
                      <dd className="text-lg font-semibold text-ink">
                        <a href={method.href} className="text-sustain-primary underline-offset-2 hover:underline">
                          {method.value}
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {directContact?.note ? (
                <p className="text-sm text-ink/60">{directContact.note}</p>
              ) : null}
            </CardShell>
          ) : null}
        </div>
      </PageSection>

      <PageSection id="icf-notice">
        <ICFNotice className="mx-auto max-w-3xl" />
      </PageSection>
    </>
  );
}

ContactPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    form: PropTypes.object,
    directContact: PropTypes.object,
    seo: PropTypes.object,
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

ContactPage.getLayout = function getLayout(page) {
  const seo = page.props?.content?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo?.title ?? 'Contact',
        description: seo?.description ?? null,
      }}
    >
      <main>{page}</main>
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en-GB' }) {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getContactPageContent(resolvedLocale);
  const fallbackNotice = content?.fallbackNotice ?? DEFAULT_NOTICE;

  return toSerializable({
    props: {
      content,
      showFallbackNotice: isFallback,
      fallbackNotice,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav'])),
    },
  });
}

export default ContactPage;
