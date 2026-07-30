import type { FormEvent } from 'react';
import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { PageHero } from '@/components/site/ContentPage';
import { CONTACT_EMAIL, getSiteContent, normaliseLocale } from '@/content/siteStrategy';

const initialForm = { name: '', email: '', language: 'English', transition: '', useful: '', privacy: false };

export default function Contact({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const update = (event) => {
    const target = event.target;
    setForm((current) => ({ ...current, [target.name]: target.type === 'checkbox' ? target.checked : target.value }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send');
      setStatus('sent');
      setMessage(zh ? '你的申請已送出。我會以電子郵件回覆。' : 'Your request has been sent. I will reply by email.');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage(zh ? `目前無法送出表單。請直接寄信至 ${CONTACT_EMAIL}。` : `The form could not be sent. Please email ${CONTACT_EMAIL} directly.`);
    }
  }

  const label = 'block text-sm font-semibold text-slate-800';
  const field = 'mt-2 w-full rounded-xl border border-emerald-950/20 bg-white px-4 py-3 text-base text-slate-950 shadow-sm transition focus:border-emerald-800';
  return (
    <>
      <PageHero eyebrow={zh ? '聯絡' : 'CONTACT'} title={content.cta} intro={zh ? '這 20 分鐘用來確認議題是否適合 Coaching，以及雙方是否適合合作。它不是免費 Coaching，也不保證立即解決問題。' : 'These 20 minutes check whether the topic suits coaching and whether working together feels appropriate. It is not free coaching and does not promise an immediate solution.'} />
      <section className="bg-[#fcfaf5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
          <form onSubmit={submit} className="rounded-[1.5rem] bg-white p-7 shadow-[0_18px_48px_rgba(28,55,44,.09)] sm:p-10">
            <div className="grid gap-6">
              <div><label className={label} htmlFor="name">{zh ? '姓名' : 'Name'}</label><input className={field} id="name" name="name" autoComplete="name" required minLength={2} value={form.name} onChange={update} /></div>
              <div><label className={label} htmlFor="email">{zh ? '電子郵件' : 'Email'}</label><input className={field} id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} /></div>
              <div><label className={label} htmlFor="language">{zh ? '偏好語言' : 'Preferred language'}</label><select className={field} id="language" name="language" required value={form.language} onChange={update}><option>English</option><option>繁體中文</option></select></div>
              <div><label className={label} htmlFor="transition">{zh ? '你正在經歷哪一種轉換？' : 'What transition are you navigating?'}</label><select className={field} id="transition" name="transition" required value={form.transition} onChange={update}><option value="">{zh ? '請選擇' : 'Please select'}</option>{content.situations.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
              <div><label className={label} htmlFor="useful">{zh ? '什麼會讓這次對談對你有幫助？' : 'What would make this conversation useful?'}</label><textarea className={`${field} min-h-36 resize-y`} id="useful" name="useful" required minLength={20} maxLength={2000} value={form.useful} onChange={update} /></div>
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-650"><input className="mt-1 h-4 w-4" type="checkbox" name="privacy" required checked={form.privacy} onChange={update} /><span>{zh ? '我已閱讀隱私政策，並同意 SustainSage 使用這些資料回覆我的申請。' : 'I have read the privacy policy and agree that SustainSage may use this information to respond to my request.'} <Link className="font-semibold text-emerald-800 underline" href="/legal/privacy">{zh ? '隱私政策' : 'Privacy Policy'}</Link></span></label>
              <button className="ssg-primary-button justify-center disabled:cursor-wait disabled:opacity-60 sm:justify-self-start" disabled={status === 'sending'} type="submit">{status === 'sending' ? (zh ? '傳送中…' : 'Sending…') : content.cta}</button>
              <div aria-live="polite">{message ? <p className={`rounded-xl p-4 text-sm ${status === 'sent' ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'}`}>{message}</p> : null}</div>
            </div>
          </form>
          <aside className="self-start rounded-[1.5rem] bg-[#e9efe8] p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{zh ? '也可以直接來信' : 'You can also email directly'}</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 block break-all text-lg font-semibold text-emerald-900 underline underline-offset-4">{CONTACT_EMAIL}</a>
            <p className="mt-6 text-sm leading-6 text-slate-650">{zh ? '請不要在表單或電子郵件中傳送醫療紀錄、身分證件、財務資料或其他不必要的敏感資訊。' : 'Please do not send medical records, identity documents, financial details or other unnecessary sensitive information through the form or email.'}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
Contact.getLayout = (page) => <MainLayout seo={{ title: page.props.locale === 'zh-TW' ? '申請 20 分鐘適配對談' : 'Request a 20-minute fit conversation', description: page.props.locale === 'zh-TW' ? '申請免費 20 分鐘 Coaching 適配對談。' : 'Request a free 20-minute conversation to check whether coaching is a fit.' }}>{page}</MainLayout>;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
