import type { GetStaticProps } from 'next';
import { ArrowCounterClockwise, Briefcase, GlobeHemisphereWest, UserSwitch } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, EditorialMedia, IconCardGrid, MediaSplit, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts, SITE_URL } from '@/content/siteStrategy';

export default function Home({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const icons = [Briefcase, ArrowCounterClockwise, GlobeHemisphereWest, UserSwitch];
  return (
    <>
      <PageHero
        eyebrow={zh ? '跨文化職涯轉換 COACHING' : 'CROSS-CULTURAL CAREER COACHING'}
        title={zh ? '在英國，走向更清楚的職涯下一步' : 'Build your next chapter in the UK'}
        intro={zh ? '為華語中生代專業人士提供有結構的職涯轉換 Coaching。' : 'Structured career transition coaching for Chinese-speaking professionals navigating change, return, leadership or cross-cultural work.'}
        cta={zh ? '預約 20 分鐘適配對談' : 'Request a fit conversation'}
        meta={zh ? '先確認議題與合作方式是否適合。這不是免費 Coaching。' : 'First check the topic and working relationship. This is not a free coaching session.'}
        imageAlt={zh ? '一位專業人士在英國城市窗邊思考下一步' : 'A professional reflecting beside a window in a UK city'}
      />

      <ContentSection title={zh ? '轉換不只是一個職稱的改變' : 'A transition changes more than a job title'} intro={zh ? '同一套 Coaching 服務，可以從四種常見情境開始。' : 'One coaching programme can begin from four common situations.'}>
        <IconCardGrid items={content.situations.map((item, index) => ({ id: item.id, title: item.title, body: item.summary, icon: icons[index] }))} />
      </ContentSection>

      <ContentSection tone="sage" title={zh ? '把模糊問題，轉成可驗證的下一步' : 'Turn uncertainty into a testable next step'}>
        <MediaSplit
          reverse
          media={<EditorialMedia src="/images/editorial/coaching-conversation.webp" alt={zh ? '一對一 Coaching 對話與開啟的筆記本' : 'A focused one-to-one coaching conversation with an open notebook'} />}
        >
          <BulletList items={content.canHelp} />
        </MediaSplit>
      </ContentSection>

      <ContentSection title={zh ? '合作方式清楚，也保留你的決定權' : 'A clear process that keeps decisions with you'} intro={zh ? '先確認適配，再進入有目標、有回顧的六次會談。' : 'Check the fit first, then work through six purposeful sessions with review built in.'}>
        <NumberedList items={content.steps} />
      </ContentSection>

      <ContentSection tone="sand" title={content.about.title}>
        <MediaSplit
          media={<EditorialMedia src="/images/editorial/next-chapter.webp" alt={zh ? '一個面向英國城市、準備展開下一章的工作空間' : 'A workspace facing a UK city, prepared for a new chapter'} />}
        >
          <div className="space-y-5 text-pretty text-lg leading-8 text-[#40554c]">
            {content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </MediaSplit>
      </ContentSection>

      <ContentSection title={zh ? '適合與不適合，都先說清楚' : 'Clear about fit, and clear about limits'}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7 sm:p-9">
            <h3 className="mb-6 text-2xl font-medium tracking-[-.02em] text-[#173d2f]">{zh ? '可能適合' : 'May be a fit'}</h3>
            <BulletList items={content.fit.suitable} />
          </div>
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-[#f0f2ef] p-7 sm:p-9">
            <h3 className="mb-6 text-2xl font-medium tracking-[-.02em] text-[#31483f]">{zh ? '目前不是合適服務' : 'Not the right service'}</h3>
            <BulletList items={content.fit.notSuitable} />
          </div>
        </div>
      </ContentSection>

      <PrimaryCTA title={zh ? '先用 20 分鐘確認是否適合合作' : 'Use 20 minutes to check whether working together makes sense'} body={zh ? '不承諾在對談中解決問題。我們只確認議題、邊界與雙方適配度。' : 'The conversation does not promise to solve the issue. It checks the topic, boundaries and mutual fit.'} label={content.cta} />
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
