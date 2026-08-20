import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { ArrowRight, BatteryCharging, MapTrifold, UsersThree } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

export default function ReflectionTools({locale}:{locale:string}){
  const zh=locale==='zh-TW';const content=getSiteContent(locale);const cta=zh?'把情境寫給我':'Write to me about the situation';
  const featuredSlugs=['change-context-map','stakeholder-resistance-map','resilience-capacity-check'];
  const featured=featuredSlugs.map(slug=>content.changeTools.find(t=>t.slug===slug)).filter(Boolean);
  const icons=[MapTrifold,UsersThree,BatteryCharging];
  return <>
    <PageHero image="/images/hero-v2/resources.webp" imageAlt={zh?'以紙張與筆記共同整理利害關係人及變革關係':'Hands arranging stakeholder and change relationships with paper and notes'} eyebrow={zh?'SUSTAINSAGE 工作工具':'SUSTAINSAGE WORKING TOOLS'} title={zh?'工具整理資訊，對話看見盲點':'A tool can organise what is known. It cannot see every blind spot.'} intro={zh?'這些工作表展示 Hao-Cheng 如何協助領導者放慢速度、看見系統並準備下一步。輸入內容只留在你的瀏覽器。':'These worksheets show how Hao-Cheng helps leaders slow down, see the system and prepare a next step. Entries remain in your browser.'} />
    <ContentSection eyebrow={zh?'三項核心工具':'THREE CORE TOOLS'} title={zh?'從現在真正需要推進的工作開始':'Start with the work that needs to move'} intro={zh?'不需要依序完成，也不需要把填寫內容交給 SustainSage。':'There is no required order and you do not need to share entries with SustainSage.'}>
      <div className="divide-y divide-[#173d2f]/15 border-y border-[#173d2f]/15">{featured.map((tool:any,index)=><article key={tool.slug} className="grid gap-6 py-9 md:grid-cols-[64px_1fr_1.2fr_auto] md:items-start">{(()=>{const Icon=icons[index];return <Icon className="h-7 w-7 text-[#2b6a53]" />})()}<h3 className="text-xl font-semibold text-[#173d2f]">{tool.title}</h3><p className="leading-7 text-[#52665e]">{tool.purpose}</p><Link href={`/tools/${tool.slug}`} className="inline-flex items-center font-bold text-[#27634e]">{zh?'開啟':'Open'}<ArrowRight className="ml-2 h-4 w-4" /></Link></article>)}</div>
    </ContentSection>
    <ContentSection tone="sage" eyebrow={zh?'工具的角色':'THE ROLE OF A TOOL'} title={zh?'工作表不是服務本身':'The worksheet is not the service'}>
      <div className="grid gap-px bg-[#173d2f]/15 lg:grid-cols-2"><article className="bg-[#e9efea] p-8 sm:p-10"><h3 className="text-2xl font-semibold text-[#173d2f]">{zh?'獨自使用工具':'Using a tool alone'}</h3><p className="mt-5 text-lg leading-8 text-[#52665e]">{zh?'適合把情境、假設、利害關係人與下一步放在同一頁上，讓已知資訊更清楚。':'Useful for placing a situation, assumptions, stakeholders and a next step on one page so known information becomes clearer.'}</p></article><article className="bg-[#173d2f] p-8 text-white sm:p-10"><h3 className="text-2xl font-semibold text-white">{zh?'進入 Coaching 對話':'Working in coaching'}</h3><p className="mt-5 text-lg leading-8 text-[#d7e3dc]">{zh?'當權力、文化、關係或自己的反應影響判斷時，另一個人的傾聽、挑戰與預演才會帶來工具做不到的價值。':'When power, culture, relationships or your own reactions affect judgement, another person’s listening, challenge and rehearsal provide what a worksheet cannot.'}</p></article></div>
    </ContentSection>
    <ContentSection tone="sand" eyebrow={zh?'完整資料庫':'FULL LIBRARY'} title={zh?'需要更細的工作表時':'When a more specific worksheet helps'} intro={zh?'其餘變革與個人反思工具保留在次級資料庫，不會取代專業支援、組織程序或你的判斷。':'The remaining change and personal reflection tools sit in this secondary library. They do not replace professional support, organisational process or your judgement.'}>
      <div className="grid gap-x-10 border-y border-[#173d2f]/15 md:grid-cols-2">{[...content.changeTools.filter(t=>!featuredSlugs.includes(t.slug)),...content.tools].map((tool:any)=><Link key={tool.slug} href={`/tools/${tool.slug}`} className="group flex justify-between gap-5 border-b border-[#173d2f]/10 py-5"><span><span className="font-semibold text-[#173d2f]">{tool.title}</span><span className="mt-1 block text-sm leading-6 text-[#62736c]">{tool.purpose}</span></span><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#9a5d2d] transition-transform group-hover:translate-x-1" /></Link>)}</div>
    </ContentSection>
    <PrimaryCTA title={zh?'工作表背後，是一個你無法獨自整理的情境嗎？':'Is there a situation behind the worksheet that is hard to untangle alone?'} body={zh?'你不需要分享工作表內容。只要寫下角色、兩邊的期待，以及目前最難推進的地方。':'You do not need to share worksheet entries. Write about the role, expectations on both sides and where progress feels most difficult.'} label={cta} />
  </>;
}
ReflectionTools.getLayout=(page)=><MainLayout seo={{title:page.props.locale==='zh-TW'?'跨境領導工作工具':'Cross-border leadership working tools',description:page.props.locale==='zh-TW'?'協助領導者理解變革、阻力、利害關係人與下一步的工作工具。':'Working tools for understanding change, resistance, stakeholders and next steps.'}}>{page}</MainLayout>;
export const getStaticProps:GetStaticProps=async({locale})=>({props:{locale:normaliseLocale(locale)}});
