import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const FIELD_CLASSNAME =
  'block w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500';

export default function ContactForm({ hasBoundaryConsent }) {
  const { t } = useTranslation('contact');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    help: '',
    focusArea: '',
    language: '',
    timezone: '',
    consent: false,
    boundariesConsent: hasBoundaryConsent,
    scopeAcknowledgement: false,
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const focusAreaOptions = t('form.focusAreaOptions', { returnObjects: true });
  const nameHint = t('form.nameHint');
  const emailHint = t('form.emailHint');
  const languageHint = t('form.languageHint');
  const timezoneHint = t('form.timezoneHint');
  const formHighlight = t('form.highlight');

  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      boundariesConsent: hasBoundaryConsent,
    }));
  }, [hasBoundaryConsent]);

  useEffect(() => {
    const focusParam = router.query.package ?? router.query.topic;
    if (typeof focusParam === 'string') {
      const isValid = focusAreaOptions.some((option) => option.value === focusParam);
      if (isValid) {
        setFormData((previous) => (previous.focusArea ? previous : { ...previous, focusArea: focusParam }));
      }
    }
  }, [focusAreaOptions, router.query.package, router.query.topic]);

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
    setMessage('');

    const isValid =
      formData.name &&
      formData.email &&
      formData.help &&
      formData.language &&
      formData.timezone &&
      formData.consent &&
      formData.boundariesConsent &&
      formData.scopeAcknowledgement;

    if (!isValid) {
      setStatus('error');
      setMessage(t('form.status.errorRequired'));
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
          message: formData.help,
          preferredLanguage: formData.language,
          focusArea: formData.focusArea,
          preferredTimeWindow: formData.timezone,
          consent: formData.consent,
          boundariesConsent: formData.boundariesConsent,
          scopeAcknowledgement: formData.scopeAcknowledgement,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setMessage(t('form.status.success'));
      setFormData({
        name: '',
        email: '',
        help: '',
        focusArea: '',
        language: '',
        timezone: '',
        consent: false,
        boundariesConsent: hasBoundaryConsent,
        scopeAcknowledgement: false,
      });
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
      setMessage(t('form.status.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-white/90 p-8 shadow-sm">
          <div className="typography flex flex-col gap-4">
            <h2>{t('form.title')}</h2>
            {formHighlight && formHighlight !== 'form.highlight' ? (
              <p>
                <strong>{formHighlight}</strong>
                {t('form.subtitle')}
              </p>
            ) : (
              <p>{t('form.subtitle')}</p>
            )}
          </div>

          {status && (
            <div
              role="alert"
              className={`mt-6 rounded-xl p-4 text-sm ${
                status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900">
                {t('form.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={FIELD_CLASSNAME}
              />
              {nameHint && nameHint !== 'form.nameHint' ? (
                <p className="mt-2 text-xs text-slate-500">{nameHint}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                {t('form.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={FIELD_CLASSNAME}
              />
              {emailHint && emailHint !== 'form.emailHint' ? (
                <p className="mt-2 text-xs text-slate-500">{emailHint}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="help" className="block text-sm font-semibold leading-6 text-slate-900">
                {t('form.help')}
              </label>
              <textarea
                id="help"
                name="help"
                rows={5}
                required
                value={formData.help}
                onChange={handleChange}
                className={FIELD_CLASSNAME}
                aria-describedby="help-hint"
              />
              <p id="help-hint" className="mt-2 text-xs text-slate-500">
                {t('form.helpHint')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="focusArea" className="block text-sm font-semibold leading-6 text-slate-900">
                  {t('form.focusArea')}
                </label>
                <select
                  id="focusArea"
                  name="focusArea"
                  value={formData.focusArea}
                  onChange={handleChange}
                  className={FIELD_CLASSNAME}
                >
                  <option value="">{t('form.focusAreaPlaceholder')}</option>
                  {focusAreaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">{t('form.focusHint')}</p>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-semibold leading-6 text-slate-900">
                  {t('form.language')}
                </label>
                <select
                  id="language"
                  name="language"
                  required
                  value={formData.language}
                  onChange={handleChange}
                  className={FIELD_CLASSNAME}
                >
                  <option value="" disabled>
                    {t('form.languagePlaceholder')}
                  </option>
                  {t('form.languageOptions', { returnObjects: true }).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {languageHint && languageHint !== 'form.languageHint' ? (
                  <p className="mt-2 text-xs text-slate-500">{languageHint}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-semibold leading-6 text-slate-900">
                  {t('form.timezone')}
                </label>
                <input
                  id="timezone"
                  name="timezone"
                  type="text"
                  placeholder={t('form.timezonePlaceholder')}
                  required
                  value={formData.timezone}
                  onChange={handleChange}
                  className={FIELD_CLASSNAME}
                />
                {timezoneHint && timezoneHint !== 'form.timezoneHint' ? (
                  <p className="mt-2 text-xs text-slate-500">{timezoneHint}</p>
                ) : null}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
              />
              <label htmlFor="consent" className="text-sm leading-6 text-slate-700">
                {t('form.consent')}
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="scopeAcknowledgement"
                name="scopeAcknowledgement"
                type="checkbox"
                required
                checked={formData.scopeAcknowledgement}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
              />
              <label htmlFor="scopeAcknowledgement" className="text-sm leading-6 text-slate-700">
                {t('form.scopeAcknowledgement')}
              </label>
            </div>

            <p className="text-xs leading-6 text-slate-500" id="privacy-note">
              {t('form.privacyNote')}
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
              aria-describedby="privacy-note"
            >
              {isSubmitting ? t('form.status.submitting') : t('form.submit')}
            </button>
          </form>
        </div>

        <aside className="rounded-3xl border border-emerald-100 bg-white/70 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t('sidebar.title')}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{t('sidebar.description')}</p>

          <dl className="mt-8 space-y-5 text-sm leading-6 text-slate-600">
            <div>
              <dt className="font-semibold text-emerald-800">{t('sidebar.responseTitle')}</dt>
              <dd className="mt-1">{t('sidebar.responseCopy')}</dd>
            </div>
            <div>
              <dt className="font-semibold text-emerald-800">{t('sidebar.privacyTitle')}</dt>
              <dd className="mt-1">{t('sidebar.privacyCopy')}</dd>
            </div>
            <div>
              <dt className="font-semibold text-emerald-800">{t('sidebar.nextTitle')}</dt>
              <dd className="mt-1">{t('sidebar.nextCopy')}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

ContactForm.propTypes = {
  hasBoundaryConsent: PropTypes.bool,
};

ContactForm.defaultProps = {
  hasBoundaryConsent: false,
};
