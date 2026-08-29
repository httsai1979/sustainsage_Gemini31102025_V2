import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import GuidedWorksheet from '@/components/tools/GuidedWorksheet';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

type Props = { locale: string; slug: string };

export default function ToolPage({ locale, slug }: Props) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const allTools = [...content.changeTools, ...content.tools];
  const guidedTool = content.changeTools.find((item) => item.slug === slug);
  const tool = allTools.find((item) => item.slug === slug)!;
  const nextTool = allTools.find((item) => item.slug === tool.nextSlug)!;
  const iframeSlug = slug === 'behaviour-ladder' ? 'behaviour-experiment-ladder' : slug;
  const stage = guidedTool ? content.changeToolStages[tool.stage - 1] : content.toolStages[tool.stage - 1];
  return (
    <>
      <PageHero eyebrow={`${guidedTool ? (zh ? '變革領導工具' : 'CHANGE LEADERSHIP TOOL') : (zh ? '個人反思工具' : 'PERSONAL REFLECTION TOOL')} · ${stage}`} title={tool.title} intro={tool.purpose} />
      <ContentSection title={zh ? '何時適合使用' : 'When to use it'} tone="sage"><p className="text-lg leading-8 text-slate-750">{tool.whenToUse}</p></ContentSection>
      <section className="bg-[#fcfaf5] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          {guidedTool ? <GuidedWorksheet tool={guidedTool} locale={locale} /> : (
            <div className="overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-white shadow-[0_18px_48px_rgba(28,55,44,.09)]">
              <iframe title={tool.title} src={`/embedded-tools/${iframeSlug}.html`} className="min-h-[760px] w-full border-0" sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />
            </div>
          )}
        </div>
      </section>
      <ContentSection title={zh ? '界線與資料' : 'Limits and data handling'} tone="sand">
        <div className="grid gap-7 md:grid-cols-2">
          <div><h3 className="text-lg font-semibold text-slate-950">{zh ? '不能取代什麼' : 'What it cannot replace'}</h3><p className="mt-3 leading-7 text-slate-650">{tool.limits}</p></div>
          <div><h3 className="text-lg font-semibold text-slate-950">{zh ? '資料如何處理' : 'How your data is handled'}</h3><p className="mt-3 leading-7 text-slate-650">{tool.data}</p></div>
        </div>
      </ContentSection>
      <ContentSection title={zh ? '下一個相關工具' : 'A related next tool'}>
        <Link className="inline-flex text-xl font-semibold text-emerald-800 underline decoration-2 underline-offset-4 hover:text-emerald-950" href={`/tools/${nextTool.slug}`}>{nextTool.title} →</Link>
      </ContentSection>
      <PrimaryCTA title={zh ? '這些觀察是否連結到跨境領導問題？' : 'Do these observations connect to a cross-border leadership issue?'} body={zh ? '你不需要提交工具內容。只需說明角色、組織脈絡與希望處理的問題。' : 'You do not need to submit your tool entries. Describe only the role, organisational context and issue you want to address.'} label={content.cta} />
    </>
  );
}

ToolPage.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  const tool = [...content.changeTools, ...content.tools].find((item) => item.slug === page.props.slug);
  return <MainLayout seo={{ title: tool?.title, description: tool?.purpose }}>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const content = getSiteContent('en-GB');
  const slugs = [...content.changeTools, ...content.tools].map((tool) => tool.slug);
  return { paths: slugs.flatMap((slug) => [{ params: { slug }, locale: 'en-GB' }, { params: { slug }, locale: 'zh-TW' }]), fallback: false };
};
export const getStaticProps: GetStaticProps<Props> = async ({ locale, params }) => ({ props: { locale: normaliseLocale(locale), slug: String(params?.slug || '') } });
