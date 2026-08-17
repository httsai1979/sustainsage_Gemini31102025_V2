import type { GetStaticProps } from 'next';
import { ChatCircleText, GlobeHemisphereWest, Scales, TreeStructure } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts } from '@/content/siteStrategy';

export default function About({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const relationshipIcons = [ChatCircleText, Scales, TreeStructure, GlobeHemisphereWest];
  return (
    <>
      <PageHero eyebrow="ABOUT" title={zh ? '不必把真正的難處簡化掉' : 'Bring the whole context'} intro={content.about.summary} cta={content.cta} image="/images/editorial/next-chapter.webp" imageAlt={zh ? '面向英國城市的專業工作空間' : 'A professional workspace looking onto a UK city'} />
      <ContentSection title={zh ? '這些經歷在對話中有什麼意義' : 'Why this experience matters in the conversation'} tone="sage">
        <div className="max-w-[78ch] space-y-6 text-pretty text-lg leading-8 text-slate-750">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </ContentSection>
      <section className="bg-[#173d2f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold !text-[#e5a05a]">{zh ? 'Hao-Cheng 想先讓你知道' : 'A note from Hao-Cheng'}</p>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.036em] !text-white sm:text-5xl">{zh ? '先理解人，再處理問題' : 'Understand the person before solving the problem'}</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-pretty text-2xl font-medium leading-10 tracking-[-.02em] !text-[#edf4ef]">{content.about.perspective}</p>
            <p className="mt-7 text-sm font-semibold !text-[#bed1c7]">Hao-Cheng Tsai</p>
          </div>
        </div>
      </section>
      <ContentSection title={zh ? '與 Hao-Cheng 對話時，你可以期待什麼' : 'What you can expect in conversation with Hao-Cheng'}>
        <div className="grid gap-x-12 lg:grid-cols-2">
          {content.about.relationship.map((item, index) => {
            const Icon = relationshipIcons[index];
            const divider = index === 0 ? '' : index === 1 ? 'border-t border-[#173d2f]/15 lg:border-t-0' : 'border-t border-[#173d2f]/15';
            return (
              <article key={item.title} className={`grid grid-cols-[auto_1fr] gap-5 py-8 ${divider}`}>
                <span className="grid h-11 w-11 place-items-center rounded-[.8rem] bg-[#e3ece6] text-[#27634e]"><Icon aria-hidden className="h-6 w-6" /></span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-.02em] text-[#173d2f]">{item.title}</h3>
                  <p className="mt-3 text-pretty leading-7 text-[#53675f]">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </ContentSection>
      <ContentSection title={zh ? '清楚的專業範圍' : 'A clear professional scope'} tone="sand"><BulletList items={content.boundaries} /></ContentSection>
      <PrimaryCTA title={zh ? `把情境直接交給 ${siteFacts.coach} 閱讀` : `Put the situation directly in front of ${siteFacts.coach}`} body={zh ? '說明你的角色、組織脈絡與目前問題。不需要先預約，也不需要把故事壓縮成一段短通話。' : 'Describe the role, organisational context and current issue. No booking and no need to compress the story into a short call.'} label={content.cta} />
    </>
  );
}

About.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  return <MainLayout seo={{ title: content.about.title, description: content.about.summary }}>{page}</MainLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
