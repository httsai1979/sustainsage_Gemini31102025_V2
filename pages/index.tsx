import type { GetStaticProps } from 'next';
import { AirplaneTilt, Buildings, ChatCircleText, Path } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, EditorialMedia, IconCardGrid, MediaSplit, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts, SITE_URL } from '@/content/siteStrategy';

export default function Home({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const icons = [Buildings, Path, ChatCircleText, AirplaneTilt];
  return (
    <>
      <PageHero
        eyebrow={zh ? '英國與亞洲跨境領導 COACHING' : 'UK-ASIA CROSS-BORDER LEADERSHIP COACHING'}
        title={zh ? '在總部與在地之間，清楚承擔領導責任' : 'Lead clearly across the UK and Asia'}
        intro={zh ? '為在英國與亞洲之間承擔管理責任的 SME 創辦人、主管與外派人才而設。' : 'For SME founders, managers and assignees carrying leadership responsibility between the UK and Asia.'}
        cta={content.cta}
        meta={zh ? '不需要預約短通話。你的情境會先被完整閱讀，再決定合適的下一步。' : 'No short-call booking. Your situation is read before any suitable next step is proposed.'}
        imageAlt={zh ? '一位跨境主管在英國城市窗邊整理決策' : 'A cross-border leader considering a decision beside a UK city window'}
      />

      <ContentSection title={zh ? '這不是一般職涯 Coaching' : 'This is not general career coaching'} intro={zh ? '它處理的是當文化、權責與商業現實同時影響一個決定時，領導者真正需要面對的問題。' : 'It is for decisions shaped by culture, authority, business reality and relationships at the same time.'}>
        <IconCardGrid items={content.situations.map((item, index) => ({ id: item.id, title: item.title, body: item.summary, icon: icons[index] }))} />
      </ContentSection>

      <ContentSection tone="sage" title={zh ? '把跨境摩擦轉成可處理的工作' : 'Make cross-border friction workable'}>
        <MediaSplit
          reverse
          media={<EditorialMedia src="/images/editorial/coaching-conversation.webp" alt={zh ? '一對一 Coaching 對話與開啟的筆記本' : 'A focused one-to-one coaching conversation with an open notebook'} />}
        >
          <BulletList items={content.canHelp} />
        </MediaSplit>
      </ContentSection>

      <ContentSection title={zh ? '先理解情境，再決定是否合作' : 'Understand the situation before proposing work'} intro={zh ? '沒有行事曆連結，也不要求你在短時間內證明自己適合。' : 'There is no calendar link and no requirement to prove fit inside a short call.'}>
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

      <ContentSection title={zh ? '適合誰，也清楚說明不適合誰' : 'Clear about who this is for'}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7 sm:p-9">
            <h3 className="mb-6 text-2xl font-medium tracking-[-.02em] text-[#173d2f]">{zh ? '可能適合' : 'May be suitable'}</h3>
            <BulletList items={content.fit.suitable} />
          </div>
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-[#f0f2ef] p-7 sm:p-9">
            <h3 className="mb-6 text-2xl font-medium tracking-[-.02em] text-[#31483f]">{zh ? '不是這項服務的範圍' : 'Outside this service'}</h3>
            <BulletList items={content.fit.notSuitable} />
          </div>
        </div>
      </ContentSection>

      <PrimaryCTA title={zh ? '先把真正的情境說清楚' : 'Start with the situation that matters'} body={zh ? '提交你的角色、組織脈絡與目前需要處理的問題。SustainSage 會先閱讀，再以電子郵件提出合適的下一步。' : 'Describe your role, organisational context and the issue at stake. SustainSage will review it before proposing a suitable next step by email.'} label={content.cta} />
    </>
  );
}

Home.getLayout = (page) => {
  const locale = page.props.locale;
  const content = getSiteContent(locale);
  const organisation = { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organisation`, name: siteFacts.legalName, url: SITE_URL, email: siteFacts.email, identifier: siteFacts.companyNumber };
  const person = { '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/#hao-cheng-tsai`, name: siteFacts.coach, worksFor: { '@id': `${SITE_URL}/#organisation` }, knowsLanguage: ['English', 'Chinese'] };
  return <MainLayout seo={{ title: locale === 'zh-TW' ? '英國與亞洲跨境領導 Coaching' : 'UK-Asia cross-border leadership coaching', description: `${content.positioning} ${content.supporting}`, schema: [organisation, person] }}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
