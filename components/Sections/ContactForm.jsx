// components/Sections/ContactForm.jsx
// 表單元件，處理 UI 與送出邏輯

import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function ContactForm() {
  const { t } = useTranslation('contact');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    topic: '',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    if (!formData.fullName || !formData.email || !formData.message || !formData.topic || !formData.consent) {
      setSubmitStatus('error');
      setSubmitMessage(t('form.status.errorRequired'));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(t('form.status.success'));
        setFormData({ fullName: '', email: '', topic: '', message: '', consent: false });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || t('form.status.error'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(t('form.status.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const topicOptions = t('form.topics', { returnObjects: true });

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t('form.title')}</h2>
            <p className="mt-2 text-lg leading-8 text-slate-600">{t('form.subtitle')}</p>

            {submitStatus && (
              <div
                className={`mt-8 flex items-center rounded-xl p-4 text-sm ${
                  submitStatus === 'success'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {submitStatus === 'success' ? (
                  <CheckCircleIcon className="mr-2 h-5 w-5" />
                ) : (
                  <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
                )}
                <p>{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-16">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold leading-6 text-slate-900">
                    {t('form.name')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                    {t('form.email')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="topic" className="block text-sm font-semibold leading-6 text-slate-900">
                    {t('form.topicLabel')}
                  </label>
                  <div className="relative mt-2.5">
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleChange}
                      className="block w-full appearance-none rounded-xl border border-slate-200 px-3.5 py-2 text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="" disabled>
                        {t('form.topicPlaceholder')}
                      </option>
                      {topicOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">
                    {t('form.message')}
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <span>{t('form.consent')}</span>
                  </label>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? t('form.status.submitting') : t('form.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-t-3xl bg-emerald-900 px-6 py-16 text-emerald-50 lg:rounded-l-3xl">
          <div className="mx-auto flex h-full max-w-xl flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold">{t('sidebar.title')}</h3>
              <p className="mt-4 text-sm leading-6">{t('sidebar.description')}</p>
            </div>
            <div className="mt-10 space-y-6 text-sm">
              <div>
                <p className="font-semibold uppercase tracking-wide text-emerald-200">{t('sidebar.responseTitle')}</p>
                <p className="mt-1 text-emerald-100">{t('sidebar.responseCopy')}</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wide text-emerald-200">{t('sidebar.privacyTitle')}</p>
                <p className="mt-1 text-emerald-100">{t('sidebar.privacyCopy')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
