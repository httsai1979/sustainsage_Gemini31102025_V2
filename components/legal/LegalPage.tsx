import MainLayout from '@/components/layout/MainLayout';
import { PageHero } from '@/components/site/ContentPage';
import { getSiteContent, siteFacts } from '@/content/siteStrategy';

export type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export default function LegalPage({ locale, title, summary, sections }: { locale: string; title: string; summary: string; sections: LegalSection[] }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  return (
    <>
      <PageHero eyebrow={zh ? '法律與合作資訊' : 'LEGAL AND WORKING INFORMATION'} title={title} intro={summary} />
      <article className="bg-[#fcfaf5]">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:py-28">
          <p className="mb-12 rounded-xl bg-amber-50 p-5 text-sm leading-6 text-amber-950">{zh ? '本頁提供服務資訊，不構成法律意見。正式合作前請閱讀並確認最新書面條款。' : 'This page provides service information and is not legal advice. Read and confirm the current written terms before paid work begins.'}</p>
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-[-.02em] text-slate-950">{section.title}</h2>
                <div className="mt-5 space-y-4 text-pretty leading-7 text-slate-650">{section.paragraphs?.map((item) => <p key={item}>{item}</p>)}</div>
                {section.bullets ? <ul className="mt-5 grid gap-3">{section.bullets.map((item) => <li key={item} className="flex gap-3 leading-7 text-slate-650"><span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-sm bg-emerald-700" />{item}</li>)}</ul> : null}
              </section>
            ))}
          </div>
          <div className="mt-16 border-t border-emerald-950/10 pt-8 text-sm leading-6 text-slate-600">
            <p>{siteFacts.legalName} · Company No. {siteFacts.companyNumber} · {siteFacts.jurisdiction}</p>
            <p>{siteFacts.registeredOffice}</p>
            <a className="font-semibold text-emerald-800 underline" href={`mailto:${siteFacts.email}`}>{siteFacts.email}</a>
          </div>
        </div>
      </article>
    </>
  );
}

export function legalLayout(page) {
  return <MainLayout seo={{ title: page.props.title, description: page.props.summary }}>{page}</MainLayout>;
}
