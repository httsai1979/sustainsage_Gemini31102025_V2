import type { FormEvent } from 'react';
import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { EnvelopeSimple, ShieldCheck } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHero } from '@/components/site/ContentPage';
import { CONTACT_EMAIL, getSiteContent, normaliseLocale } from '@/content/siteStrategy';

const initialForm = { name: '', email: '', language: 'English', role: '', organisation: '', context: '', payer: '', useful: '', privacy: false };

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
  const field = 'mt-2 w-full rounded-[.85rem] border border-[#173d2f]/20 bg-white px-4 py-3 text-base text-[#10251d] shadow-sm transition focus:border-[#27634e]';
  return (
    <>
      <PageHero eyebrow={zh ? '保密合作詢問' : 'CONFIDENTIAL ENQUIRY'} title={zh ? '先讓我理解你正在處理的情境' : 'Start with the situation you need to handle'} intro={zh ? '沒有預約連結。請說明角色、組織脈絡與目前最重要的問題。' : 'There is no booking link. Describe the role, organisational context and issue that matters now.'} image="/images/editorial/coaching-conversation.webp" imageAlt={zh ? '專注的一對一專業對話' : 'A focused professional one-to-one conversation'} />
      <section className="bg-[#fcfaf5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
          <form onSubmit={submit} className="rounded-[1.5rem] bg-white p-7 shadow-[0_18px_48px_rgba(28,55,44,.09)] sm:p-10">
            <div className="grid gap-6">
              <div><label className={label} htmlFor="name">{zh ? '姓名' : 'Name'}</label><input className={field} id="name" name="name" autoComplete="name" required minLength={2} value={form.name} onChange={update} /></div>
              <div><label className={label} htmlFor="email">{zh ? '電子郵件' : 'Email'}</label><input className={field} id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} /></div>
              <div><label className={label} htmlFor="language">{zh ? '偏好語言' : 'Preferred language'}</label><select className={field} id="language" name="language" required value={form.language} onChange={update}><option>English</option><option>繁體中文</option></select></div>
              <div><label className={label} htmlFor="role">{zh ? '你的角色' : 'Your role'}</label><select className={field} id="role" name="role" required value={form.role} onChange={update}><option value="">{zh ? '請選擇' : 'Please select'}</option><option value="founder-owner">{zh ? '創辦人或企業負責人' : 'Founder or owner'}</option><option value="country-general-manager">Country Manager / General Manager</option><option value="functional-leader">{zh ? '功能主管或資深經理人' : 'Functional leader or senior manager'}</option><option value="assignee">{zh ? '外派或跨境任務負責人' : 'International assignee'}</option><option value="hr-sponsor">HR / Sponsor</option><option value="referral-partner">{zh ? '轉介或合作夥伴' : 'Referral or professional partner'}</option></select></div>
              <div><label className={label} htmlFor="organisation">{zh ? '公司或組織名稱' : 'Company or organisation'}</label><input className={field} id="organisation" name="organisation" autoComplete="organization" required minLength={2} maxLength={160} value={form.organisation} onChange={update} /></div>
              <div><label className={label} htmlFor="context">{zh ? '目前最接近哪一種情境？' : 'Which context is closest?'}</label><select className={field} id="context" name="context" required value={form.context} onChange={update}><option value="">{zh ? '請選擇' : 'Please select'}</option>{content.situations.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
              <div><label className={label} htmlFor="payer">{zh ? '預計由誰支付？' : 'Who is likely to fund the work?'}</label><select className={field} id="payer" name="payer" required value={form.payer} onChange={update}><option value="">{zh ? '請選擇' : 'Please select'}</option><option value="organisation">{zh ? '公司或組織' : 'Company or organisation'}</option><option value="self-funded">{zh ? '個人自費' : 'Self-funded'}</option><option value="undecided">{zh ? '尚未決定' : 'Not yet decided'}</option></select></div>
              <div><label className={label} htmlFor="useful">{zh ? '目前需要處理的決定、對話或風險是什麼？' : 'What decision, conversation or risk needs attention?'}</label><p className="mt-2 text-sm leading-6 text-[#62736c]">{zh ? '請避免提供醫療、證件、財務帳號或其他不必要的敏感資料。' : 'Do not include medical records, identity documents, account details or other unnecessary sensitive data.'}</p><textarea className={`${field} min-h-40 resize-y`} id="useful" name="useful" required minLength={40} maxLength={3000} value={form.useful} onChange={update} /></div>
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-650"><input className="mt-1 h-4 w-4" type="checkbox" name="privacy" required checked={form.privacy} onChange={update} /><span>{zh ? '我已閱讀隱私政策，並同意 SustainSage 使用這些資料回覆我的申請。' : 'I have read the privacy policy and agree that SustainSage may use this information to respond to my request.'} <Link className="font-semibold text-emerald-800 underline" href="/legal/privacy">{zh ? '隱私政策' : 'Privacy Policy'}</Link></span></label>
              <button className="ssg-primary-button justify-center disabled:cursor-wait disabled:opacity-60 sm:justify-self-start" disabled={status === 'sending'} type="submit">{status === 'sending' ? (zh ? '傳送中…' : 'Sending…') : content.cta}</button>
              <div aria-live="polite">{message ? <p className={`rounded-xl p-4 text-sm ${status === 'sent' ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'}`}>{message}</p> : null}</div>
            </div>
          </form>
          <aside className="self-start rounded-[1.25rem] border border-[#173d2f]/10 bg-[#e6ede8] p-8">
            <span className="grid h-12 w-12 place-items-center rounded-[.9rem] bg-white text-[#27634e]"><EnvelopeSimple className="h-6 w-6" /></span>
            <h2 className="mt-7 text-2xl font-medium tracking-[-.02em] text-[#10251d]">{zh ? '你也可以直接來信' : 'You can also email directly'}</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 block break-all text-lg font-semibold text-emerald-900 underline underline-offset-4">{CONTACT_EMAIL}</a>
            <p className="mt-6 text-sm leading-6 text-[#53675f]">{zh ? '每一則真實合作詢問都會先被閱讀。若議題不屬於 SustainSage 的專業範圍，也會直接說明。' : 'Every genuine enquiry is read before a next step is suggested. If the issue falls outside SustainSage’s scope, that will be stated plainly.'}</p>
            <div className="mt-7 flex gap-3 border-t border-[#173d2f]/10 pt-6 text-sm leading-6 text-[#53675f]"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#27634e]" /><p>{zh ? '請不要在表單或電子郵件中傳送醫療紀錄、身分證件、財務資料或其他不必要的敏感資訊。' : 'Please do not send medical records, identity documents, financial details or other unnecessary sensitive information through the form or email.'}</p></div>
          </aside>
        </div>
      </section>
    </>
  );
}
Contact.getLayout = (page) => <MainLayout seo={{ title: page.props.locale === 'zh-TW' ? '提交保密合作詢問' : 'Send a confidential coaching enquiry', description: page.props.locale === 'zh-TW' ? '說明你的跨境領導角色、組織脈絡與目前問題。' : 'Describe your cross-border leadership role, organisational context and current issue.' }}>{page}</MainLayout>;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
