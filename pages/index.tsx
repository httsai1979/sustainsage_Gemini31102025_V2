import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { ArrowRight, ChatCircleText, Path, UsersThree } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { ContentSection, CrossBorderMap, NumberedList, PageHero, PrimaryCTA, QuotePanel } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts, SITE_URL } from '@/content/siteStrategy';

export default function Home({ locale }: { locale: string }) {
  const zh = locale === 'zh-TW';
  const cta = zh ? '把情境寫給我' : 'Write to me about the situation';
  const moments = zh ? [
    ['總部說方向已經很清楚', '英國團隊感受到的，卻是重要決定早已在別處完成。'],
    ['每個人都說支持改變', '會議結束後，承諾沒有變成新的行為與工作方式。'],
    ['你一直替兩邊翻譯', '最後卻成為唯一需要解釋延誤、摩擦與失去信任的人。'],
  ] : [
    ['Headquarters believes the direction is clear', 'The UK team experiences the same decision as something completed elsewhere.'],
    ['Everyone says they support the change', 'After the meeting, agreement does not become different behaviour or practice.'],
    ['You keep translating for both sides', 'You become the person expected to explain delay, friction and lost trust.'],
  ];
  const scenarios = zh ? [
    { label: '綜合情境 01', title: '被要求加快，卻沒有真正的授權', body: '亞洲總部希望英國營運更快落地。當地主管被要求承擔結果，關鍵批准權卻仍留在總部。他需要的不是更多壓力，而是看清可以改變的決策結構與下一場對話。' },
    { label: '綜合情境 02', title: '表面同意，實際沒有採用', body: '一項新流程在會議中獲得支持，日常工作卻沒有改變。與其把它稱為抗拒，需要先理解人們可能失去什麼、哪些風險沒有被處理，以及領導者自己傳遞了什麼訊號。' },
  ] : [
    { label: 'COMPOSITE SITUATION 01', title: 'Asked to move faster without real authority', body: 'Asian headquarters wants UK operations to deliver faster. The local leader owns the outcome while key approvals remain at headquarters. More pressure is not the answer. The decision system and the next conversation need to become clearer.' },
    { label: 'COMPOSITE SITUATION 02', title: 'Agreement without adoption', body: 'A new process receives support in the meeting, yet daily practice does not change. Before calling it resistance, the leader needs to understand perceived loss, unresolved risk and the signals their own behaviour is sending.' },
  ];
  return <>
    <PageHero image="/images/hero-v2/home.webp" imageAlt={zh?'一位跨境主管在英國 SME 辦公室整理會議筆記':'A cross-border leader reviewing meeting notes in a UK SME office'} eyebrow={zh ? '英國與亞洲跨境領導 COACHING' : 'UK-ASIA CROSS-BORDER LEADERSHIP COACHING'} title={zh ? '同時對兩邊負責，卻不被任何一邊真正理解' : 'Accountable to both sides. Fully understood by neither.'} intro={zh ? '為連結亞洲總部與英國團隊的 SME 創辦人、主管與外派領導者而設。看清真正的問題，準備不能迴避的對話，讓改變能被人們真正採用。' : 'For SME founders, managers and assignees connecting Asian headquarters with UK teams. See the real issue, prepare the conversation that cannot be avoided and make change possible to adopt.'} cta={cta} meta={zh ? '沒有預約連結。每一則訊息都由 Hao-Cheng 本人閱讀。' : 'No booking link. Every message is read personally by Hao-Cheng.'} />

    <ContentSection eyebrow={zh ? '你可能正在經歷' : 'YOU MAY RECOGNISE THIS'} title={zh ? '真正困難的，通常不是文化差異本身' : 'The difficult part is rarely culture alone'} intro={zh ? '它發生在權責、關係、速度與沒有說出口的顧慮交會之處。' : 'It sits where authority, relationships, speed and unspoken concerns meet.'}>
      <div className="divide-y divide-[#173d2f]/15 border-y border-[#173d2f]/15">{moments.map(([title, body], index) => <article key={title} className="grid gap-4 py-9 md:grid-cols-[72px_1fr_1.25fr]"><span className="font-mono text-sm text-[#9a5d2d]">0{index + 1}</span><h3 className="text-xl font-semibold text-[#173d2f]">{title}</h3><p className="text-lg leading-8 text-[#52665e]">{body}</p></article>)}</div>
    </ContentSection>

    <ContentSection tone="sage" eyebrow={zh ? '一個不急著選邊的空間' : 'A SPACE THAT DOES NOT RUSH TO TAKE SIDES'} title={zh ? '總部不一定錯，在地團隊也不只是抗拒' : 'Headquarters may not be wrong. The local team may not simply be resistant.'}>
      <div className="grid items-center gap-12 lg:grid-cols-12"><div className="lg:col-span-6"><CrossBorderMap locale={locale} /></div><div className="lg:col-span-5 lg:col-start-8"><QuotePanel quote={zh ? '我想先理解每一方正在保護什麼、你真正要對什麼負責，以及在組織現實中，哪些改變是真的可行。' : 'I want to understand what each side is protecting, what you are truly accountable for and what change is genuinely possible within the organisation.'} attribution="Hao-Cheng Tsai · Founder, SustainSage" /><Link href="/about" className="mt-8 inline-flex items-center font-bold text-[#27634e]">{zh ? '認識 Hao-Cheng 的工作方式' : 'How Hao-Cheng works'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div></div>
    </ContentSection>

    <ContentSection eyebrow={zh ? '不是客戶見證，而是你可能熟悉的現實' : 'NOT TESTIMONIALS, BUT REALITIES YOU MAY RECOGNISE'} title={zh ? '把抽象的跨境摩擦，放回真實工作裡' : 'Put cross-border friction back into real work'} intro={zh ? '以下為綜合情境，用來說明這項工作處理的張力，不代表特定客戶。' : 'These are composite situations showing the tensions this work addresses. They do not represent named clients.'}>
      <div className="grid gap-px bg-[#173d2f]/15 lg:grid-cols-2">{scenarios.map((item) => <article key={item.title} className="bg-[#fbfaf6] p-8 sm:p-10"><p className="text-xs font-bold tracking-[.14em] text-[#9a5d2d]">{item.label}</p><h3 className="mt-6 max-w-[20ch] text-2xl font-medium tracking-[-.025em] text-[#173d2f] sm:text-3xl">{item.title}</h3><p className="mt-5 text-lg leading-8 text-[#52665e]">{item.body}</p></article>)}</div>
    </ContentSection>

    <ContentSection tone="sand" eyebrow={zh ? '一起工作的方式' : 'WHAT THE WORK FEELS LIKE'} title={zh ? '理解你，但不只是認同你' : 'Understood, without being simply agreed with'}>
      <NumberedList items={zh ? ['你可以帶來還沒有整理好的版本，包括矛盾、猶豫，以及不能在公司裡完整說出的部分。','我們一起辨認權力、文化、關係與組織系統如何影響你的判斷，不把問題簡化成個人態度。','把洞察轉成你能親自完成的對話、決定與小型實驗。決定仍然屬於你。'] : ['Bring the unfinished version, including contradiction, uncertainty and what cannot be said safely inside the organisation.','Examine how power, culture, relationships and the organisational system shape your judgement without reducing the issue to attitude.','Turn insight into a conversation, decision or small experiment you can carry out. The decision remains yours.']} />
      <div className="mt-12 grid gap-8 border-t border-[#173d2f]/15 pt-10 sm:grid-cols-3">{[[ChatCircleText, zh ? '英文或中文' : 'English or Chinese'],[UsersThree, zh ? '個人或企業贊助' : 'Self or organisation funded'],[Path, zh ? '線上一對一' : 'Online one-to-one']].map(([Icon, text]: any) => <div key={text} className="flex items-center gap-4"><Icon className="h-6 w-6 text-[#2b6a53]" /><span className="font-semibold text-[#31483f]">{text}</span></div>)}</div>
    </ContentSection>
    <PrimaryCTA title={zh ? '你不需要先把事情說得很完整' : 'You do not need a polished version of the story'} body={zh ? '寫下你正在承擔的角色、兩邊的期待，以及現在最難處理的那件事。Hao-Cheng 會先親自閱讀，再用電子郵件回覆合適的下一步。' : 'Write about the role you are carrying, the expectations on both sides and what feels hardest to handle now. Hao-Cheng will read it personally and reply by email with a suitable next step.'} label={cta} />
  </>;
}

Home.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  const organisation = { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organisation`, name: siteFacts.legalName, url: SITE_URL, email: siteFacts.email, identifier: siteFacts.companyNumber };
  const person = { '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/#hao-cheng-tsai`, name: siteFacts.coach, worksFor: { '@id': `${SITE_URL}/#organisation` }, knowsLanguage: ['English', 'Chinese'] };
  return <MainLayout seo={{ title: page.props.locale === 'zh-TW' ? '英國與亞洲跨境領導 Coaching' : 'UK-Asia cross-border leadership coaching', description: `${content.positioning} ${content.supporting}`, schema: [organisation, person] }}>{page}</MainLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
