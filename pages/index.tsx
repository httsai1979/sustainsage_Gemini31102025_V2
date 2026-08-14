import type { GetStaticProps } from 'next';
import { AirplaneTilt, ArrowsClockwise, BatteryCharging, Buildings, ChatCircleText, Path, ShieldChevron } from '@phosphor-icons/react';
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

      <ContentSection
        tone="sand"
        eyebrow={zh ? '變革領導' : 'CHANGE LEADERSHIP'}
        title={zh ? '不是宣布改變，而是讓改變能被採用' : 'Change only matters when it is adopted'}
        intro={zh ? '這項 Coaching 支持負責變革結果的主管，而不是替組織代做轉型專案。' : 'This coaching supports the leader accountable for change. It does not take over the transformation programme.'}
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <article className="rounded-[1.25rem] bg-[#173d2f] p-8 text-white lg:col-span-7 lg:p-10">
            <ArrowsClockwise className="h-8 w-8 text-[#e5a05a]" />
            <h3 className="mt-10 max-w-[18ch] text-3xl font-medium tracking-[-.035em]">{zh ? '組織變革與持續採用' : 'Organisational change and sustained adoption'}</h3>
            <p className="mt-4 max-w-[55ch] text-lg leading-8 text-[#d7e3dc]">{zh ? '把策略意圖轉譯成清楚的角色、對話、試驗與強化機制，讓 UK-Asia 團隊能真正改變日常做法。' : 'Translate strategic intent into clear roles, conversations, experiments and reinforcement so UK-Asia teams can change daily practice.'}</p>
          </article>
          <div className="grid gap-4 lg:col-span-5">
            <article className="rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7">
              <ShieldChevron className="h-7 w-7 text-[#27634e]" />
              <h3 className="mt-6 text-2xl font-medium tracking-[-.025em] text-[#173d2f]">{zh ? '理解並處理阻力' : 'Work with resistance'}</h3>
              <p className="mt-3 leading-7 text-[#53675f]">{zh ? '分辨阻力背後是合理風險、損失感、信任問題，還是結構性障礙，再選擇適合的回應。' : 'Distinguish legitimate risk, perceived loss, trust concerns and structural friction before choosing a response.'}</p>
            </article>
            <article className="rounded-[1.25rem] border border-[#173d2f]/10 bg-[#e7eee9] p-7">
              <BatteryCharging className="h-7 w-7 text-[#27634e]" />
              <h3 className="mt-6 text-2xl font-medium tracking-[-.025em] text-[#173d2f]">{zh ? '韌性、動機與承載力' : 'Resilience, motivation and capacity'}</h3>
              <p className="mt-3 leading-7 text-[#53675f]">{zh ? '不是要求自己或團隊更努力，而是保護判斷品質、恢復能力、真實自主與持續承諾。' : 'Not asking people to try harder. Protect judgement, recovery, credible agency and commitment through sustained change.'}</p>
            </article>
          </div>
        </div>
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
