import type { GetStaticProps } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts, SITE_URL } from '@/content/siteStrategy';

export default function Home({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  return (
    <>
      <PageHero
        eyebrow={zh ? '跨文化職涯轉換 COACHING' : 'CROSS-CULTURAL CAREER TRANSITION COACHING'}
        title={content.positioning}
        intro={content.supporting}
        cta={content.cta}
        meta={zh ? '先確認議題與合作方式是否適合；這不是免費 Coaching。' : 'First check whether the topic and working relationship are a fit. This is not a free coaching session.'}
      />
      <ContentSection eyebrow={zh ? '常見情境' : 'COMMON SITUATIONS'} title={zh ? '不同處境，同一套有結構的服務' : 'Different situations, one structured service'} intro={zh ? '這四種情境不是四項產品，而是同一個 Coaching 計畫可能處理的入口。' : 'These are not four products. They are four ways the same coaching programme may become relevant.'}>
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-emerald-950/10 sm:grid-cols-2">
          {content.situations.map((item, index) => (
            <article key={item.id} className={`bg-white/85 p-7 ${index === 0 ? 'sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-10' : ''}`}>
              <p className="font-mono text-xs text-emerald-800">0{index + 1}</p>
              <div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-.02em] text-slate-950">{item.title}</h3>
                <p className="mt-3 max-w-[55ch] text-pretty leading-7 text-slate-650">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>
      <ContentSection tone="sage" eyebrow={zh ? '能協助什麼' : 'WHAT COACHING CAN SUPPORT'} title={zh ? '從模糊，走到一個可驗證的下一步' : 'From uncertainty to a testable next step'}>
        <BulletList items={content.canHelp} />
      </ContentSection>
      <ContentSection eyebrow={zh ? '合作流程' : 'HOW IT WORKS'} title={zh ? '三個清楚步驟' : 'Three clear steps'}>
        <NumberedList items={content.steps} />
      </ContentSection>
      <ContentSection tone="sand" eyebrow={zh ? '為什麼是 HAO-CHENG' : 'WHY HAO-CHENG'} title={content.about.title}>
        <div className="space-y-5 text-pretty text-lg leading-8 text-slate-750">
          {content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </ContentSection>
      <ContentSection eyebrow={zh ? '適配範圍' : 'FIT'} title={zh ? '適合與不適合' : 'Who this is—and is not—for'}>
        <div className="grid gap-10 md:grid-cols-2">
          <div><h3 className="mb-5 text-xl font-semibold text-emerald-900">{zh ? '可能適合' : 'May be a fit'}</h3><BulletList items={content.fit.suitable} /></div>
          <div><h3 className="mb-5 text-xl font-semibold text-slate-700">{zh ? '目前不適合' : 'Not the right service'}</h3><BulletList items={content.fit.notSuitable} /></div>
        </div>
      </ContentSection>
      <PrimaryCTA title={zh ? '先用 20 分鐘確認是否適合合作' : 'Use 20 minutes to check whether working together makes sense'} body={zh ? '不承諾在對談中解決問題；我們只確認議題、邊界與雙方適配度。' : 'The conversation does not promise to solve the issue. It checks the topic, boundaries and mutual fit.'} label={content.cta} />
    </>
  );
}

Home.getLayout = (page) => {
  const locale = page.props.locale;
  const content = getSiteContent(locale);
  const organisation = { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organisation`, name: siteFacts.legalName, url: SITE_URL, email: siteFacts.email, identifier: siteFacts.companyNumber };
  const person = { '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/#hao-cheng-tsai`, name: siteFacts.coach, worksFor: { '@id': `${SITE_URL}/#organisation` }, knowsLanguage: ['English', 'Chinese'] };
  return <MainLayout seo={{ title: content.positioning, description: content.supporting, schema: [organisation, person] }}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
