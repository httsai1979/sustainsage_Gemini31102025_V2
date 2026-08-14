import type { GetStaticProps } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BatteryCharging,
  Brain,
  ChatCircleText,
  Compass,
  GitBranch,
  Heart,
  MapTrifold,
  Megaphone,
  Path,
  Scales,
  Steps,
  Target,
  UsersThree,
} from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

const changeIcons = [MapTrifold, UsersThree, Megaphone, GitBranch, ChatCircleText, Steps, BatteryCharging, Target];
const reflectionIcons = [Heart, Brain, ChatCircleText, Compass, UsersThree, Scales, Path];

export default function ReflectionTools({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  return (
    <>
      <PageHero
        eyebrow={zh ? '變革領導工具' : 'CHANGE LEADERSHIP TOOLKIT'}
        title={zh ? '讓跨境變革更容易被理解、採用並持續' : 'Make cross-border change easier to adopt and sustain'}
        intro={zh ? '四個階段、八份非 AI 工作表，協助主管把抽象變革轉成可以實際推進的領導工作。' : 'Eight non-AI worksheets across four stages, built for leaders turning change into practical adoption.'}
        image="/images/editorial/reflection-tools.webp"
        imageAlt={zh ? '筆記本、指南針與變革規劃工具' : 'A notebook, compass and practical change planning tools'}
      />

      <ContentSection
        title={zh ? '從你現在需要推進的工作開始' : 'Start with the work that needs to move'}
        intro={zh ? '這不是線性方法論。你可以直接選擇目前最有用的階段，內容只儲存在自己的瀏覽器。' : 'This is not a linear methodology. Start at the most useful stage. Entries stay in your browser.'}
      >
        <div className="space-y-16">
          {content.changeToolStages.map((stage, stageIndex) => {
            const stageTools = content.changeTools.filter((tool) => tool.stage === stageIndex + 1);
            return (
              <section key={stage} aria-labelledby={`change-stage-${stageIndex}`} className="grid gap-7 lg:grid-cols-[minmax(190px,.34fr)_minmax(0,1fr)] lg:gap-12">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#b06d31]">{zh ? `階段 ${stageIndex + 1}` : `STAGE ${stageIndex + 1}`}</p>
                  <h2 id={`change-stage-${stageIndex}`} className="mt-3 text-2xl font-medium tracking-[-.03em] text-[#173d2f]">{stage}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {stageTools.map((tool) => {
                    const globalIndex = content.changeTools.findIndex((candidate) => candidate.slug === tool.slug);
                    const Icon = changeIcons[globalIndex];
                    return (
                      <article key={tool.slug} className="group flex min-h-full flex-col rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7 shadow-[0_16px_48px_rgba(16,37,29,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(16,37,29,.11)]">
                        <div className="flex items-start justify-between gap-6">
                          <span className="grid h-12 w-12 place-items-center rounded-[.9rem] bg-[#e3ece6] text-[#27634e]"><Icon className="h-6 w-6" /></span>
                          <span className="rounded-[.65rem] bg-[#f3eee6] px-3 py-1 text-xs font-bold text-[#8b572c]">{zh ? '瀏覽器儲存' : 'Browser only'}</span>
                        </div>
                        <h3 className="mt-7 text-2xl font-medium tracking-[-.025em] text-[#10251d]">{tool.title}</h3>
                        <p className="mt-3 flex-1 leading-7 text-[#53675f]">{tool.purpose}</p>
                        <Link href={`/tools/${tool.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-[#27634e] hover:text-[#173d2f]">
                          {zh ? '開啟工作表' : 'Open worksheet'}
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

      <ContentSection
        tone="sage"
        title={zh ? '何時使用工具，何時需要 Coaching' : 'When a tool helps, and when coaching adds value'}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-white/75 p-7 sm:p-9">
            <h3 className="text-2xl font-medium text-[#173d2f]">{zh ? '工具適合整理已知資訊' : 'Use a tool to organise what is known'}</h3>
            <p className="mt-4 leading-7 text-[#53675f]">{zh ? '當你需要把情境、假設、利害關係人與下一步放在同一頁上，工作表可以提供清楚結構。' : 'A worksheet helps when the situation, assumptions, stakeholders and next action need one clear structure.'}</p>
          </div>
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-[#173d2f] p-7 text-white sm:p-9">
            <h3 className="text-2xl font-medium">{zh ? 'Coaching 適合處理盲點與真實互動' : 'Use coaching for blind spots and live dynamics'}</h3>
            <p className="mt-4 leading-7 text-[#d7e3dc]">{zh ? '當權力、文化、關係或自身反應讓你難以獨自判斷時，對話、挑戰與預演比再填一張表更有價值。' : 'When power, culture, relationships or your own reactions make judgement difficult, dialogue, challenge and rehearsal add more than another form.'}</p>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        tone="sand"
        title={zh ? '個人反思資料庫' : 'Personal reflection library'}
        intro={zh ? '這七項既有工具保留作為次要資源，適合整理情緒、思考、價值與個人選擇。' : 'These seven existing tools remain as a secondary library for emotions, thinking, values and personal choices.'}
      >
        <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
          {content.tools.map((tool, index) => {
            const Icon = reflectionIcons[index];
            return (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group flex items-center gap-4 rounded-[1rem] border border-transparent px-4 py-5 hover:border-[#173d2f]/10 hover:bg-white/70">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[.8rem] bg-white text-[#27634e]"><Icon className="h-5 w-5" /></span>
                <span className="flex-1">
                  <span className="block font-semibold text-[#173d2f]">{tool.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#62736c]">{tool.purpose}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-[#b06d31] transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection title={zh ? '工具的界線' : 'Limits of these tools'}><p className="max-w-3xl text-lg leading-8 text-[#40554c]">{zh ? '工具協助整理思考，不會診斷、治療、替代員工諮詢程序，或提供醫療、法律、財務與移民意見。若有緊急安全或健康疑慮，請使用適當的專業或緊急服務。' : 'These tools support structured reflection. They do not diagnose, treat, replace employee consultation, or provide medical, legal, financial or immigration advice. Use appropriate professional or emergency services for urgent safety or health concerns.'}</p></ContentSection>
      <PrimaryCTA title={zh ? '需要處理的是一個真實的跨境變革情境？' : 'Is there a real cross-border change situation behind the worksheet?'} body={zh ? '你不需要分享工作表中的私人內容。只需說明角色、組織脈絡、變革責任與目前卡住的地方。' : 'You do not need to share private entries. Describe the role, organisational context, change responsibility and where progress is stuck.'} label={content.cta} />
    </>
  );
}

ReflectionTools.getLayout = (page) => <MainLayout seo={{
  title: page.props.locale === 'zh-TW' ? '跨境變革領導工具' : 'Cross-border change leadership tools',
  description: page.props.locale === 'zh-TW' ? '八項非 AI 變革領導工作表，協助主管理解阻力、推進採用並維持改變。' : 'Eight non-AI change leadership worksheets for understanding resistance, moving adoption and sustaining change.',
}}>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
