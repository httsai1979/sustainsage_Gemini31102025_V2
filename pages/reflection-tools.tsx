import type { GetStaticProps } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

export default function ReflectionTools({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  return (
    <>
      <PageHero eyebrow={zh ? '反思工具' : 'REFLECTION TOOLS'} title={zh ? '從停下來留意，到開始一個小行動' : 'From pausing to one small action'} intro={zh ? '七項免費、非 AI 的自我反思工具。你的輸入保留在瀏覽器內，不會傳送給 SustainSage。' : 'Seven free, non-AI self-reflection tools. Your entries remain in your browser and are not sent to SustainSage.'} />
      {content.toolStages.map((stage, index) => {
        const tools = content.tools.filter((tool) => tool.stage === index + 1);
        return (
          <ContentSection key={stage} eyebrow={`${zh ? '階段' : 'STAGE'} 0${index + 1}`} title={stage} tone={index % 2 ? 'sage' : 'paper'}>
            <div className="grid gap-5">
              {tools.map((tool) => (
                <article key={tool.slug} className="rounded-[1.25rem] bg-white p-7 shadow-[0_12px_34px_rgba(28,55,44,.07)]">
                  <h3 className="text-2xl font-semibold tracking-[-.02em] text-slate-950">{tool.title}</h3>
                  <p className="mt-3 max-w-[65ch] leading-7 text-slate-650">{tool.purpose}</p>
                  <Link href={`/tools/${tool.slug}`} className="mt-6 inline-flex font-semibold text-emerald-800 underline decoration-2 underline-offset-4 hover:text-emerald-950">{zh ? '開啟工具' : 'Open tool'} →</Link>
                </article>
              ))}
            </div>
          </ContentSection>
        );
      })}
      <ContentSection title={zh ? '工具的界線' : 'Limits of these tools'} tone="sand"><p className="text-lg leading-8 text-slate-750">{zh ? '工具只協助反思，不會診斷、治療或提供醫療、法律、財務、移民等專業意見。如有緊急安全或健康疑慮，請使用適當的專業或緊急服務。' : 'These tools support reflection. They do not diagnose, treat, or provide medical, legal, financial or immigration advice. If you have an urgent safety or health concern, use an appropriate professional or emergency service.'}</p></ContentSection>
      <PrimaryCTA title={zh ? '想把觀察帶進一段有結構的對話？' : 'Want to bring your observations into a structured conversation?'} body={zh ? '適配對談只用來確認議題與合作方式，不要求你分享工具中的私人內容。' : 'The fit conversation checks the topic and way of working. You do not have to share private tool entries.'} label={content.cta} />
    </>
  );
}
ReflectionTools.getLayout = (page) => <MainLayout seo={{ title: page.props.locale === 'zh-TW' ? '反思工具' : 'Reflection Tools', description: page.props.locale === 'zh-TW' ? '七項免費、非 AI 的職涯反思工具。' : 'Seven free, non-AI tools for career reflection and small actions.' }}>{page}</MainLayout>;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
