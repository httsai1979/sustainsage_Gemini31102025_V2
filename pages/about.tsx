import type { GetStaticProps } from 'next';
import { ChatCircleText, GlobeHemisphereWest, Scales, TreeStructure } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, IconCardGrid, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts } from '@/content/siteStrategy';

export default function About({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const relevance = zh
    ? ['理解總部與在地團隊沒有用相同方式說出的期待。', '能把營運現實、權責關係與個人風險放在同一張圖上。', '不把跨文化摩擦簡化為個性、國籍或溝通技巧問題。', '可用英文或中文處理細緻而敏感的對話。']
    : ['Understand expectations that headquarters and local teams do not express in the same way.', 'Hold operational reality, authority and personal risk in one view.', 'Avoid reducing cross-cultural friction to personality, nationality or communication style.', 'Work with sensitive nuance in English or Chinese.'];
  return (
    <>
      <PageHero eyebrow="ABOUT" title={zh ? '理解跨境領導責任，而不是套用文化公式' : 'Cross-border responsibility without cultural formulas'} intro={zh ? 'SustainSage 的公開 Coaching 服務由 Hao-Cheng Tsai 提供，也是你提交合作詢問後的直接聯絡人。' : 'SustainSage coaching is provided by Hao-Cheng Tsai, who personally reviews every genuine enquiry.'} cta={content.cta} meta={zh ? '不透過自動排程篩選你。' : 'No automated scheduling funnel.'} image="/images/editorial/next-chapter.webp" imageAlt={zh ? '面向英國城市的專業工作空間' : 'A professional workspace looking onto a UK city'} />
      <ContentSection title={zh ? '曾經承擔責任，因此理解問題的重量' : 'Experience of carrying the responsibility'} tone="sage">
        <div className="space-y-6 text-pretty text-lg leading-8 text-slate-750">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </ContentSection>
      <ContentSection title={zh ? '這些經驗如何進入 Coaching 工作' : 'How this experience informs the work'}>
        <IconCardGrid items={relevance.map((body, index) => ({ title: zh ? ['跨文化脈絡', '完整處境', '務實思考', '雙語細節'][index] : ['Cross-cultural context', 'The whole situation', 'Practical thinking', 'Bilingual nuance'][index], body, icon: [GlobeHemisphereWest, TreeStructure, Scales, ChatCircleText][index] }))} />
      </ContentSection>
      <ContentSection title={zh ? '清楚的專業範圍' : 'A clear professional scope'} tone="sand"><BulletList items={content.boundaries} /></ContentSection>
      <PrimaryCTA title={zh ? `把情境直接交給 ${siteFacts.coach} 閱讀` : `Put the situation directly in front of ${siteFacts.coach}`} body={zh ? '說明你的角色、組織脈絡與目前問題。不需要先預約，也不需要把故事壓縮成一段短通話。' : 'Describe the role, organisational context and current issue. No booking and no need to compress the story into a short call.'} label={content.cta} />
    </>
  );
}

About.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  return <MainLayout seo={{ title: content.about.title, description: content.about.paragraphs[0] }}>{page}</MainLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
