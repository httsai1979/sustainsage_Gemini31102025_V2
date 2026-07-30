import type { GetStaticProps } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts } from '@/content/siteStrategy';

export default function About({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const relevance = zh
    ? ['理解跨文化職場裡未被明說的期待。', '能把營運現實、家庭責任與身分轉換放在同一張圖上。', '不把複雜轉換簡化成信心或正向思考問題。', '可用英文或中文進行細緻對話。']
    : ['Understand the unspoken expectations inside cross-cultural workplaces.', 'Hold operational reality, family responsibility and identity transition in one view.', 'Avoid reducing a complex transition to confidence or positive thinking.', 'Work with nuance in English or Chinese.'];
  return (
    <>
      <PageHero eyebrow="ABOUT" title={content.about.title} intro={zh ? 'SustainSage 的公開 Coaching 服務由 Hao-Cheng Tsai 提供；他也是唯一的公開聯絡窗口。' : 'SustainSage’s public coaching service is provided by Hao-Cheng Tsai, who is also the sole public point of contact.'} />
      <ContentSection title={zh ? '從跨國營運到英國職涯重整' : 'From international operations to rebuilding a career in the UK'} tone="sage">
        <div className="space-y-6 text-pretty text-lg leading-8 text-slate-750">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </ContentSection>
      <ContentSection title={zh ? '這些經驗為何與你有關' : 'Why this experience may matter to you'}><BulletList items={relevance} /></ContentSection>
      <ContentSection title={zh ? '清楚的專業範圍' : 'A clear professional scope'} tone="sand"><BulletList items={content.boundaries} /></ContentSection>
      <PrimaryCTA title={zh ? `與 ${siteFacts.coach} 確認合作是否合適` : `Check the fit with ${siteFacts.coach}`} body={zh ? '先談你的轉換情境、希望對談有何幫助，以及 Coaching 是否是合適的支持。' : 'Discuss your transition, what would make a conversation useful, and whether coaching is the right kind of support.'} label={content.cta} />
    </>
  );
}

About.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  return <MainLayout seo={{ title: content.about.title, description: content.about.paragraphs[0] }}>{page}</MainLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
