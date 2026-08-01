import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { ArrowRight, Brain, ChatCircleText, Compass, Heart, Scales, Steps, UsersThree } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

const toolIcons = [Heart, Brain, ChatCircleText, Compass, UsersThree, Scales, Steps];

export default function ReflectionTools({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  return (
    <>
      <PageHero
        eyebrow={zh ? '反思工具' : 'REFLECTION TOOLS'}
        title={zh ? '從停下來留意，到開始一個小行動' : 'From pausing to one small action'}
        intro={zh ? '七項免費、非 AI 的自我反思工具。你的輸入保留在瀏覽器內，不會傳送給 SustainSage。' : 'Seven free, non-AI self-reflection tools. Your entries remain in your browser and are not sent to SustainSage.'}
        image="/images/editorial/reflection-tools.webp"
        imageAlt={zh ? '筆記本、指南針與反思工具' : 'A notebook, compass and tactile reflection tools'}
      />

      <ContentSection title={zh ? '依照你現在的位置選擇工具' : 'Choose a tool for where you are now'} intro={zh ? '不必照順序完成，也不需要建立帳號。' : 'You do not need to complete them in order or create an account.'}>
        <div className="space-y-14">
          {content.toolStages.map((stage, stageIndex) => {
            const stageTools = content.tools.filter((tool) => tool.stage === stageIndex + 1);
            return (
              <section key={stage} aria-labelledby={`tool-stage-${stageIndex}`}>
                <div className="mb-6 flex items-center gap-4">
                  <span aria-hidden className="h-px w-9 bg-[#d98b42]" />
                  <h2 id={`tool-stage-${stageIndex}`} className="text-2xl font-medium tracking-[-.025em] text-[#173d2f]">{stage}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-12">
                  {stageTools.map((tool, toolIndex) => {
                    const globalIndex = content.tools.findIndex((candidate) => candidate.slug === tool.slug);
                    const Icon = toolIcons[globalIndex];
                    const span = stageTools.length === 1 ? 'md:col-span-12' : toolIndex % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5';
                    return (
                      <article key={tool.slug} className={`group rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7 shadow-[0_16px_48px_rgba(16,37,29,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(16,37,29,.11)] ${span}`}>
                        <div className="flex items-start justify-between gap-6">
                          <span className="grid h-12 w-12 place-items-center rounded-[.9rem] bg-[#e3ece6] text-[#27634e]"><Icon className="h-6 w-6" /></span>
                          <span className="rounded-[.65rem] bg-[#f3eee6] px-3 py-1 text-xs font-bold text-[#8b572c]">{zh ? '本機儲存' : 'Browser only'}</span>
                        </div>
                        <h3 className="mt-8 text-2xl font-medium tracking-[-.025em] text-[#10251d]">{tool.title}</h3>
                        <p className="mt-3 max-w-[65ch] leading-7 text-[#53675f]">{tool.purpose}</p>
                        <Link href={`/tools/${tool.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-[#27634e] hover:text-[#173d2f]">
                          {zh ? '開啟工具' : 'Open tool'}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" />
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection title={zh ? '工具的界線' : 'Limits of these tools'} tone="sand"><p className="max-w-3xl text-lg leading-8 text-[#40554c]">{zh ? '工具只協助反思，不會診斷、治療或提供醫療、法律、財務、移民等專業意見。如有緊急安全或健康疑慮，請使用適當的專業或緊急服務。' : 'These tools support reflection. They do not diagnose, treat, or provide medical, legal, financial or immigration advice. If you have an urgent safety or health concern, use an appropriate professional or emergency service.'}</p></ContentSection>
      <PrimaryCTA title={zh ? '想把觀察帶進一段有結構的對話？' : 'Want to bring your observations into a structured conversation?'} body={zh ? '適配對談只用來確認議題與合作方式，不要求你分享工具中的私人內容。' : 'The fit conversation checks the topic and way of working. You do not have to share private tool entries.'} label={content.cta} />
    </>
  );
}
ReflectionTools.getLayout = (page) => <MainLayout seo={{ title: page.props.locale === 'zh-TW' ? '反思工具' : 'Reflection Tools', description: page.props.locale === 'zh-TW' ? '七項免費、非 AI 的職涯反思工具。' : 'Seven free, non-AI tools for career reflection and small actions.' }}>{page}</MainLayout>;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
