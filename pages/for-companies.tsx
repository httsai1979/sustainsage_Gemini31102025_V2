import type { GetStaticProps } from 'next';
import { Buildings, LockKey, UserFocus } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, IconCardGrid, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { normaliseLocale, SITE_URL } from '@/content/siteStrategy';

export default function ForCompanies({ locale }: { locale: string }) {
  const zh = locale === 'zh-TW'; const cta = zh ? '說明你希望支持的主管' : 'Tell me about the leader you want to support';
  const reasons = zh ? [
    { title:'角色比授權更大', body:'主管被要求對英國營運或變革結果負責，實際決策權與總部期待卻沒有對齊。',icon:Buildings },
    { title:'關鍵關係正在失去信任',body:'總部與在地團隊都需要這位主管，但他正在成為雙方摩擦的承載點。',icon:UserFocus },
    { title:'內部空間不夠安全',body:'主管需要在不被評估、不被要求向 Sponsor 回報談話內容的情況下，誠實檢視自己的判斷。',icon:LockKey },
  ] : [
    { title:'The role is larger than the authority',body:'A leader owns UK operations or change outcomes while decision rights and headquarters expectations remain misaligned.',icon:Buildings },
    { title:'A critical relationship is losing trust',body:'Both headquarters and the local team need this leader, yet the leader is becoming the place where their friction accumulates.',icon:UserFocus },
    { title:'The internal space is not safe enough',body:'The leader needs to examine their judgement without being assessed or required to report coaching conversations to the sponsor.',icon:LockKey },
  ];
  return <>
    <PageHero eyebrow={zh?'企業贊助的跨境領導 COACHING':'ORGANISATION-SPONSORED CROSS-BORDER COACHING'} title={zh?'支持那位正在替組織承擔兩邊壓力的主管':'Support the leader carrying pressure from both sides'} intro={zh?'為亞洲總部、英國 SME 與精簡在地營運單位提供。協助關鍵主管在保密邊界內改善判斷、關係與變革採用。':'For Asian headquarters, UK SMEs and lean local operations. Help a key leader improve judgement, relationships and change adoption within a clear confidential boundary.'} cta={cta} meta={zh?'企業可支付費用，但不會因此取得 Coaching 對話內容。':'The organisation may fund the work without gaining access to coaching conversations.'} />
    <ContentSection eyebrow={zh?'為什麼是現在':'WHY NOW'} title={zh?'企業通常不是缺少另一份變革計畫':'The organisation rarely needs another change plan'} intro={zh?'更常見的是，一位關鍵主管需要在壓力變成離職、失去信任或變革停滯之前，重新取得清楚的判斷空間。':'More often, a key leader needs room for clear judgement before pressure becomes departure, damaged trust or stalled change.'}><IconCardGrid items={reasons} /></ContentSection>
    <ContentSection tone="sage" eyebrow={zh?'三方關係':'THE THREE-WAY RELATIONSHIP'} title={zh?'Sponsor、Coaching 客戶與 Coach 的責任必須分開':'Sponsor, coaching client and coach need distinct responsibilities'}>
      <div className="grid gap-px bg-[#173d2f]/15 lg:grid-cols-3">{(zh?[
        ['Sponsor','說明組織脈絡與希望支持的結果，不指定 Coaching 對話內容。'],
        ['Coaching 客戶','同意目標與任何回顧安排，並保有對話內容的保密權。'],
        ['Hao-Cheng','對合作適切性、保密邊界與專業範圍保持清楚。'],
      ]:[
        ['Sponsor','Explains organisational context and desired outcomes without directing the content of coaching conversations.'],
        ['Coaching client','Agrees objectives and any review arrangement while retaining confidentiality over conversation content.'],
        ['Hao-Cheng','Maintains clarity about suitability, confidentiality and professional scope.'],
      ]).map(([title,body],i)=><article key={title} className="bg-[#e9efea] p-8"><span className="font-mono text-sm text-[#9a5d2d]">0{i+1}</span><h3 className="mt-6 text-2xl font-semibold text-[#173d2f]">{title}</h3><p className="mt-4 leading-7 text-[#52665e]">{body}</p></article>)}</div>
    </ContentSection>
    <ContentSection eyebrow={zh?'合作開始方式':'HOW WORK BEGINS'} title={zh?'先確認這是不是正確的介入方式':'First establish whether coaching is the right intervention'}><NumberedList items={zh?['提供主管角色、UK-Asia 組織關係、目前壓力與為什麼是現在。請不要先傳送績效或醫療資料。','Hao-Cheng 分別釐清 Sponsor 與 Coaching 客戶的期待、保密範圍與不可混淆的角色。','所有人在承諾前，以書面確認目標、合作範圍、費用、回顧方式與終止安排。','若問題需要顧問專案、HR 程序、法律意見或醫療支援，會直接說明 Coaching 並不適合。']:['Share the leader’s role, the UK-Asia relationship, current pressure and why support matters now. Do not send performance or medical files.','Hao-Cheng clarifies sponsor and coaching-client expectations, confidentiality and roles that must not be confused.','Before commitment, everyone agrees objectives, scope, fee, review arrangements and ending terms in writing.','If the issue calls for consulting, an HR process, legal advice or health support, coaching will be identified as the wrong intervention.']} /></ContentSection>
    <PrimaryCTA title={zh?'說明你希望支持哪一位主管，以及為什麼是現在':'Describe who you want to support and why now'} body={zh?'不需要先安排簡短銷售通話。寫下組織脈絡、主管角色與目前風險，Hao-Cheng 會先親自閱讀。':'No short sales call is required. Write about the organisational context, the leader’s role and the current risk. Hao-Cheng will read it personally.'} label={cta} />
  </>;
}
ForCompanies.getLayout=(page)=>{const zh=page.props.locale==='zh-TW';const schema={'@context':'https://schema.org','@type':'Service','@id':`${SITE_URL}/for-companies#service`,name:zh?'企業贊助跨境領導 Coaching':'Organisation-sponsored cross-border leadership coaching',provider:{'@id':`${SITE_URL}/#organisation`},availableLanguage:['English','Chinese']};return <MainLayout seo={{title:zh?'企業贊助跨境領導 Coaching':'Organisation-sponsored cross-border leadership coaching',description:zh?'支持連結亞洲總部與英國團隊的關鍵主管。':'Support key leaders connecting Asian headquarters and UK teams.',schema}}>{page}</MainLayout>};
export const getStaticProps:GetStaticProps=async({locale})=>({props:{locale:normaliseLocale(locale)}});
