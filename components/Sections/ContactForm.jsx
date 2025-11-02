// components/Sections/ContactForm.jsx
// 這是【前端 UI 組件】
// 它包含所有的表單邏輯和 HTML

import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function ContactForm() {
  const { t } = useTranslation('common');

  // 狀態使用 fullName, email, topic, message
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    topic: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  handleSubmit 邏輯
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    if (!formData.fullName || !formData.email || !formData.message || !formData.topic) {
      setSubmitStatus('error');
      setSubmitMessage(t('contact.error.missingFields'));
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
        setSubmitMessage(t('contact.success.message'));
        setFormData({ fullName: '', email: '', topic: '', message: '' }); // 清空表單
      } else {
        setSubmitStatus('error');
        // 顯示後端返回的錯誤訊息或預設訊息
        setSubmitMessage(result.error || t('contact.error.general'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(t('contact.error.network'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const topicOptions = [
    { value: 'ESG_CONSULTING', labelKey: 'contact.topic.ESG_CONSULTING' },
    { value: 'CARBON_MANAGEMENT', labelKey: 'contact.topic.CARBON_MANAGEMENT' },
    { value: 'TRAINING', labelKey: 'contact.topic.TRAINING' },
    { value: 'PARTNERSHIP', labelKey: 'contact.topic.PARTNERSHIP' },
    { value: 'GENERAL_INQUIRY', labelKey: 'contact.topic.GENERAL_INQUIRY' },
  ];

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* 表單區塊 */}
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            
            {/* 標題與描述 */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              <span>{t('contact.form.title')}</span>
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              <span>{t('contact.form.subtitle')}</span>
            </p>

            {/* 提交狀態訊息 */}
            {submitStatus && (
              <div 
                className={`
                  mt-8 p-4 rounded-md flex items-center
                  ${submitStatus === 'success' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                  }
                `}
              >
                {submitStatus === 'success' 
                  ? <CheckCircleIcon className="h-5 w-5 mr-2" /> 
                  : <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                }
                <p className="text-sm font-medium">{submitMessage}</p>
              </div>
            )}

            {/* 聯絡表單 */}
            <form onSubmit={handleSubmit} className="mt-16">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* 姓名 */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold leading-6 text-gray-900">
                    <span>{t('contact.form.fullName')}</span>
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
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* 電子郵件 */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    <span>{t('contact.form.email')}</span>
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
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* 主題 (下拉選單) */}
                <div className="sm:col-span-2">
                  <label htmlFor="topic" className="block text-sm font-semibold leading-6 text-gray-900">
                    <span>{t('contact.form.topic')}</span>
                  </label>
                  <div className="relative mt-2.5">
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleChange}
                      className="block w-full appearance-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>
                        {t('contact.form.selectTopic')}
                      </option>
                      {topicOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {t(option.labelKey)}
                        </option>
                      ))}
                    </select>
                    {/* 下拉箭頭圖標 */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* 訊息 */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                    <span>{t('contact.form.message')}</span>
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* 提交按鈕 */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
                >
                  {isSubmitting 
                    ? <span>{t('contact.form.sending')}...</span> 
                    : <span>{t('contact.form.submitButton')}</span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 聯繫資訊區塊 */}
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              <span>{t('contact.contactInfo.title')}</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              <span>{t('contact.contactInfo.subtitle')}</span>
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <svg className="h-7 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-1.5-12h-17.75c-.966 0-1.75-.784-1.75-1.75V3.75c0-.966.784-1.75 1.75-1.75h17.75c.966 0 1.75.784 1.75 1.75v5.5c0 .966-.784 1.75-1.75 1.75zM12 11.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM7.5 18.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM16.5 18.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 18.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" /></svg>
                </dt>
                <dd>Southsea, England</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <svg className="h-7 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-7.5 7.5-7.5-7.5" /></svg>
                </dt>
                <dd>
                  <a className="hover:text-white" href="mailto:hc.tsai@sustainsage-group.com">
                    hc.tsai@sustainsage-group.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <svg className="h-7 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.992-.55-1.35l-3.45-3.45a2.25 2.25 0 00-3.182 0L8.749 15.688a2.25 2.25 0 01-2.488 0l-4.27-4.27a2.25 2.25 0 010-2.488l1.664-1.664a2.25 2.25 0 000-3.182L5.602 3.829a2.25 2.25 0 00-3.182 0L2.25 6.75z" /></svg>
                </dt>
                <dd>+44-7510-317-505</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}