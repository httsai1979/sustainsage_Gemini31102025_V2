import type { GetStaticProps } from 'next';
import { ChatCircleText, GlobeHemisphereWest, Scales, TreeStructure } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, IconCardGrid, PageHero, PrimaryCTA, QuotePanel } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';

export default function About({ locale }: { locale: string }) {
  const zh=locale==='zh-TW'; const content=getSiteContent(locale); const cta=zh?'把情境寫給我':'Write to me about the situation'; const icons=[ChatCircleText,Scales,TreeStructure,GlobeHemisphereWest];
  return <>
    <PageHero image="/images/hero-v2/about.webp" imageAlt={zh?'一張放有工作筆記、眼鏡與文件的創辦人書桌':'A founder workspace with working notes, glasses and documents'} eyebrow={zh?'關於 HAO-CHENG TSAI':'ABOUT HAO-CHENG TSAI'} title={zh?'不替你選邊，陪你看清如何承擔':'Not choosing a side for you. Helping you see what is yours to carry.'} intro={zh?'Hao-Cheng 直接陪伴同時對總部、在地團隊、文化關係與業務結果負責的領導者。':'Hao-Cheng works directly with leaders accountable to headquarters, local teams, cultural relationships and business outcomes at the same time.'} cta={cta} meta={zh?'SustainSage 是由創辦人直接提供服務的專業實務。':'SustainSage is a founder-led professional practice.'} />
    <ContentSection eyebrow={zh?'資歷真正有用的地方':'WHAT EXPERIENCE IS FOR'} title={zh?'不是證明我比你懂，而是讓你不必從頭解釋每一層現實':'Not to prove I know more than you. To help you avoid explaining every layer from the beginning.'}>
      <div className="grid gap-12 lg:grid-cols-12"><div className="space-y-6 text-lg leading-8 text-[#40554c] lg:col-span-7">{content.about.paragraphs.map(p=><p key={p}>{p}</p>)}</div><div className="lg:col-span-4 lg:col-start-9"><QuotePanel quote={content.about.perspective} attribution="Hao-Cheng Tsai" /></div></div>
    </ContentSection>
    <ContentSection tone="sage" eyebrow={zh?'與我對話時':'IN CONVERSATION'} title={zh?'你可以帶來那個還沒有整理好的版本':'Bring the version that is not yet tidy'}><IconCardGrid items={content.about.relationship.map((item,index)=>({...item,icon:icons[index]}))} /></ContentSection>
    <ContentSection tone="sand" eyebrow={zh?'專業界線':'PROFESSIONAL SCOPE'} title={zh?'有人味不代表模糊界線':'Human does not mean unclear'} intro={zh?'Coaching 可以處理判斷、關係、領導行為與組織脈絡，但不會假裝能取代其他專業。':'Coaching can work with judgement, relationships, leadership behaviour and organisational context without pretending to replace other professions.'}><BulletList items={content.boundaries} /></ContentSection>
    <PrimaryCTA title={zh?'你寫下的情境，會直接由 Hao-Cheng 閱讀':'What you write will be read directly by Hao-Cheng'} body={zh?'不需要先把故事整理成完美摘要，也不用預約一段制式短通話。先說現在最難處理的是什麼。':'You do not need a perfect summary or a formulaic short call. Start with what feels hardest to handle now.'} label={cta} />
  </>;
}
About.getLayout=(page)=>{const c=getSiteContent(page.props.locale);return <MainLayout seo={{title:c.about.title,description:c.about.summary}}>{page}</MainLayout>};
export const getStaticProps:GetStaticProps=async({locale})=>({props:{locale:normaliseLocale(locale)}});
