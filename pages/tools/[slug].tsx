import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

type Props = { locale: string; slug: string };

export default function ToolPage({ locale, slug }: Props) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const tool = content.tools.find((item) => item.slug === slug)!;
  const nextTool = content.tools.find((item) => item.slug === tool.nextSlug)!;
  const iframeSlug = slug === 'behaviour-ladder' ? 'behaviour-experiment-ladder' : slug;
  return (
    <>
      <PageHero eyebrow={`${zh ? '反思工具' : 'REFLECTION TOOL'} · ${content.toolStages[tool.stage - 1]}`} title={tool.title} intro={tool.purpose} />
      <ContentSection title={zh ? '何時適合使用' : 'When to use it'} tone="sage"><p className="text-lg leading-8 text-slate-750">{tool.whenToUse}</p></ContentSection>
      <section className="bg-[#fcfaf5] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-white shadow-[0_18px_48px_rgba(28,55,44,.09)]">
          <iframe title={tool.title} src={`/tools/${iframeSlug}.html`} className="min-h-[760px] w-full border-0" sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />
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
      <PrimaryCTA title={zh ? '想在 Coaching 中整理這些觀察？' : 'Want to work with these observations in coaching?'} body={zh ? '你不需要提交工具內容；適配對談先確認議題、邊界與合作方式。' : 'You do not need to submit your tool entries. The fit conversation first checks the topic, boundaries and way of working.'} label={content.cta} />
    </>
  );
}

ToolPage.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  const tool = content.tools.find((item) => item.slug === page.props.slug);
  return <MainLayout seo={{ title: tool?.title, description: tool?.purpose }}>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getSiteContent('en-GB').tools.map((tool) => tool.slug);
  return { paths: slugs.flatMap((slug) => [{ params: { slug }, locale: 'en-GB' }, { params: { slug }, locale: 'zh-TW' }]), fallback: false };
};
export const getStaticProps: GetStaticProps<Props> = async ({ locale, params }) => ({ props: { locale: normaliseLocale(locale), slug: String(params?.slug || '') } });
