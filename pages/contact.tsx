import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React, { useMemo, useState } from 'react';
import { z } from 'zod';

import ContentHero from '@/components/content/ContentHero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import CardShell from '@/components/ui/CardShell';
import PageSection from '@/components/ui/PageSection';
import { getContactPageContent } from '@/lib/contactContent';
import { loadNamespace } from '@/lib/server/loadNamespace';
import { toSerializable } from '@/lib/toSerializable';

const INPUT_CLASSNAME =
  'w-full rounded-2xl border border-sustain-cardBorder bg-white px-4 py-3 text-base text-sustain-textMain placeholder:text-sustain-textMuted focus:outline-none focus:ring-2 focus:ring-sustain-primary/40';
const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

const contactHeroSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    intro: z.array(z.string()).optional(),
    chips: z.array(z.string()).optional(),
  })
  .partial();

const contactFormSchema = z.object({
  title: z.string().optional(),
  description: z.array(z.string()).optional(),
  responseNote: z.string().optional(),
  fields: z
    .object({
      name: z.object({ label: z.string().optional(), placeholder: z.string().optional() }).optional(),
      email: z.object({ label: z.string().optional(), placeholder: z.string().optional() }).optional(),
      howFound: z.object({ label: z.string().optional(), placeholder: z.string().optional() }).optional(),
      message: z.object({ label: z.string().optional(), placeholder: z.string().optional() }).optional(),
    })
    .optional(),
  consent: z
    .object({
      labelBeforeLink: z.string().optional(),
      linkLabel: z.string().optional(),
      labelAfterLink: z.string().optional(),
      helper: z.string().optional(),
    })
    .optional(),
  submitLabel: z.string().optional(),
  submittingLabel: z.string().optional(),
  successMessage: z.string().optional(),
  errorMessage: z.string().optional(),
  errorRequired: z.string().optional(),
});

const contactDirectSchema = z.object({
  title: z.string().optional(),
  body: z.array(z.string()).optional(),
  emailLabel: z.string().optional(),
  email: z.string().optional(),
  phoneLabel: z.string().optional(),
  phone: z.string().optional(),
  note: z.string().optional(),
  iconName: z.string().optional(),
});

const contactPageSchema = z.object({
  fallbackNotice: z.string().optional(),
  hero: contactHeroSchema.optional(),
  form: contactFormSchema.optional(),
  directContact: contactDirectSchema.optional(),
  seo: z.record(z.unknown()).optional(),
});

type ContactPageContent = z.infer<typeof contactPageSchema>;

type ContactPageProps = {
  content: ContactPageContent;
  showFallbackNotice: boolean;
  fallbackNotice: string;
};

type FormData = {
  name: string;
  email: string;
  howFound: string;
  message: string;
  consent: boolean;
};

type SubmissionStatus = 'success' | 'error' | null;

function normalizeParagraphs(value?: string[] | string | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim().length > 0);
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return [value];
  }
  return [];
}

const ContactPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
  showFallbackNotice,
  fallbackNotice,
}) => {
  const { t } = useTranslation('contact');
  const hero = content?.hero ?? {};
  const formContent = content?.form ?? {};
  const formFields = formContent?.fields ?? {};
  const directContact = content?.directContact ?? {};

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    howFound: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translationFallbacks = useMemo(
    () => ({
      nameLabel: t('form.name', { defaultValue: 'Name' }),
      namePlaceholder: t('form.nameHint', { defaultValue: '' }),
      emailLabel: t('form.email', { defaultValue: 'Email' }),
      emailPlaceholder: t('form.emailHint', { defaultValue: '' }),
      howFoundLabel: t('form.referral', { defaultValue: 'How did you find this site?' }),
      howFoundPlaceholder: t('form.referralHint', { defaultValue: '' }),
      messageLabel: t('form.help', { defaultValue: 'What would you like to talk about?' }),
      messagePlaceholder: t('form.helpHint', { defaultValue: '' }),
      consentLinkLabel: t('form.boundariesLinkLabel', { defaultValue: 'Coaching Boundaries' }),
      submitLabel: t('form.submit', { defaultValue: 'Send message' }),
      submittingLabel: t('form.status.submitting', { defaultValue: 'Sending…' }),
      successMessage: t('form.status.success', { defaultValue: 'Thank you for reaching out.' }),
      errorMessage: t('form.status.error', { defaultValue: 'Something went wrong. Please try again later.' }),
      errorRequired: t('form.status.errorRequired', { defaultValue: 'Please complete the required fields.' }),
      responseNote: t('form.responseNote', { defaultValue: '' }),
    }),
    [t]
  );

  const descriptionParagraphs = normalizeParagraphs(formContent?.description);
  const directBody = normalizeParagraphs(directContact?.body);

  const contactMethods = [
    directContact?.email
      ? {
          key: 'email',
          label: directContact?.emailLabel ?? t('form.email', { defaultValue: 'Email' }),
          value: directContact.email,
          href: `mailto:${directContact.email}`,
        }
      : null,
    directContact?.phone
      ? {
          key: 'phone',
          label: directContact?.phoneLabel ?? t('contactMethods.phone', { defaultValue: 'Phone' }),
          value: directContact.phone,
          href: `tel:${directContact.phone.replace(/\(0\)/g, '').replace(/[^+\d]/g, '')}`,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    value: string;
    href: string;
  }>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setStatusMessage('');

    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      setStatus('error');
      setStatusMessage(formContent?.errorRequired ?? translationFallbacks.errorRequired);
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
      setStatusMessage(formContent?.successMessage ?? translationFallbacks.successMessage);
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
      setStatusMessage(formContent?.errorMessage ?? translationFallbacks.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const consent = formContent?.consent ?? {};
  const hasDirectContact = Boolean(directBody.length || contactMethods.length);

  return (
    <>
      <ContentHero hero={hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />

      <PageSection id="contact-form" title={formContent?.title} lead={translationFallbacks.responseNote}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-card md:p-8">
            {descriptionParagraphs.length ? (
              <div className="space-y-3 text-base leading-relaxed text-ink/70">
                {descriptionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {formContent?.responseNote ?? translationFallbacks.responseNote ? (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-sustain-textMuted">
                {formContent?.responseNote ?? translationFallbacks.responseNote}
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
                  {formFields?.name?.label ?? translationFallbacks.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={formFields?.name?.placeholder ?? translationFallbacks.namePlaceholder}
                  className={INPUT_CLASSNAME}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.email?.label ?? translationFallbacks.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={formFields?.email?.placeholder ?? translationFallbacks.emailPlaceholder}
                  className={INPUT_CLASSNAME}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="howFound" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.howFound?.label ?? translationFallbacks.howFoundLabel}
                </label>
                <input
                  id="howFound"
                  name="howFound"
                  type="text"
                  placeholder={formFields?.howFound?.placeholder ?? translationFallbacks.howFoundPlaceholder}
                  className={INPUT_CLASSNAME}
                  value={formData.howFound}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-sustain-textMain">
                  {formFields?.message?.label ?? translationFallbacks.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder={formFields?.message?.placeholder ?? translationFallbacks.messagePlaceholder}
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
                      {consent?.linkLabel ?? translationFallbacks.consentLinkLabel}
                    </Link>
                    {consent?.labelAfterLink ? ` ${consent.labelAfterLink}` : null}
                  </p>
                  {consent?.helper ? <p className="text-xs text-sustain-textMuted/80">{consent.helper}</p> : null}
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full justify-center md:w-auto">
                {isSubmitting ? formContent?.submittingLabel ?? translationFallbacks.submittingLabel : formContent?.submitLabel ?? translationFallbacks.submitLabel}
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
              {directContact?.note ? <p className="text-sm text-ink/60">{directContact.note}</p> : null}
            </CardShell>
          ) : null}
        </div>
      </PageSection>

      <PageSection id="icf-notice">
        <ICFNotice className="mx-auto max-w-3xl" />
      </PageSection>
    </>
  );
};

ContactPage.getLayout = function getLayout(page) {
  const seo = (page as React.ReactElement<{ props?: { content?: ContactPageContent } }>).props?.content?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: (seo as { title?: string })?.title ?? 'Contact',
        description: (seo as { description?: string })?.description ?? null,
      }}
    >
      <main>{page}</main>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async ({ locale = 'en-GB' }) => {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getContactPageContent(resolvedLocale);
  const parsedContent = contactPageSchema.safeParse(content);

  if (!parsedContent.success) {
    console.error('[contact] Content validation failed', parsedContent.error.flatten());
  }

  const validatedContent = parsedContent.success
    ? parsedContent.data
    : contactPageSchema.parse(getContactPageContent('en-GB').content);
  const commonNamespace = loadNamespace(resolvedLocale, 'common');
  const fallbackNotice =
    validatedContent?.fallbackNotice ?? commonNamespace?.fallbackNotice ?? DEFAULT_NOTICE;

  return toSerializable({
    props: {
      content: validatedContent,
      showFallbackNotice: isFallback,
      fallbackNotice,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav', 'contact'])),
    },
  });
};

export default ContactPage;
