import type { GetStaticProps } from 'next';
import { ArrowsClockwise, BatteryCharging, ChatCircleText } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, IconCardGrid, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, siteFacts, SITE_URL } from '@/content/siteStrategy';

export default function Coaching({ locale }: { locale: string }) {
  const zh = locale === 'zh-TW'; const content = getSiteContent(locale); const cta = zh ? '把情境寫給我' : 'Write to me about the situation';
  const issues = zh ? [
    { title: '一場必須由你完成的對話', body: '和總部、在地團隊、合夥人或關鍵主管談清楚責任、限制與真正需要改變的事。', icon: ChatCircleText },
    { title: '宣布了，卻沒有被採用的改變', body: '分辨阻力背後是合理風險、損失感、信任問題、權責不清，還是改變本身缺乏可行性。', icon: ArrowsClockwise },
    { title: '不能只靠意志力撐住的責任', body: '保護判斷品質、恢復能力與真實動機，避免把韌性變成要求自己和團隊繼續硬撐。', icon: BatteryCharging },
  ] : [
    { title: 'A conversation only you can have', body: 'Clarify responsibility, constraints and what genuinely needs to change with headquarters, the local team, a partner or a key leader.', icon: ChatCircleText },
    { title: 'Change announced but not adopted', body: 'Distinguish legitimate risk, perceived loss, damaged trust, unclear authority and a change that is not yet workable.', icon: ArrowsClockwise },
    { title: 'Responsibility that willpower cannot carry forever', body: 'Protect judgement, recovery and credible motivation without turning resilience into an instruction to keep enduring.', icon: BatteryCharging },
  ];
  return <>
    <PageHero image="/images/hero-v2/coaching.webp" imageAlt={zh?'一場專注而坦誠的一對一領導 Coaching 對話':'A focused and candid one-to-one leadership coaching conversation'} eyebrow={zh ? '一對一跨境領導 COACHING' : 'ONE-TO-ONE CROSS-BORDER LEADERSHIP COACHING'} title={zh ? '把不能迴避的問題，帶進誠實的對話' : 'Bring the issue you cannot avoid into an honest conversation'} intro={zh ? '這不是一般職涯建議，也不替你接管變革專案。它為需要親自作出判斷、處理關係並承擔後果的領導者而設。' : 'This is not general career advice and it does not take over a change programme. It is for leaders who must make the judgement, handle the relationships and own the consequences.'} cta={cta} meta={zh ? '可使用英文或中文。個人自費與企業贊助皆可。' : 'Available in English or Chinese, self-funded or organisation-sponsored.'} />
    <ContentSection eyebrow={zh ? '可以帶進來的工作' : 'WORK YOU CAN BRING'} title={zh ? '不是練習題，而是你下週就要面對的現實' : 'Not an exercise. The reality you face next week.'}><IconCardGrid items={issues} /></ContentSection>
    <ContentSection tone="sage" eyebrow={zh ? '方法' : 'HOW IT WORKS'} title={zh ? '先看清系統，再準備行動' : 'See the system clearly, then prepare to act'} intro={zh ? '組織變革管理、阻力理解、韌性與動機不是四套分離的模組。它們會根據你的真實情境，被用來改善判斷與下一步。' : 'Organisational change management, resistance, resilience and motivation are not separate modules. They are used in service of better judgement and a real next step.'}>
      <NumberedList items={zh ? ['釐清你真正被授權做什麼、需要保護什麼，以及結果由誰承擔。','把利害關係人、權力、文化、損失感與沒有說出口的疑慮放進同一個系統裡。','準備真實對話，測試小型改變，觀察人們是否真正採用。','建立能持續的強化方式，同時照顧領導者與團隊的承載力。'] : ['Clarify what you are genuinely authorised to do, what must be protected and who owns the outcome.','Place stakeholders, power, culture, perceived loss and unspoken concerns in the same system.','Prepare a real conversation, test a small change and notice whether people actually adopt it.','Build reinforcement that can last while protecting the capacity of the leader and team.']} />
    </ContentSection>
    <ContentSection eyebrow={zh ? '合作安排' : 'THE ENGAGEMENT'} title={content.programme.title} intro={content.programme.summary}>
      <div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-7"><BulletList items={content.programme.details} /></div><aside className="border-l-2 border-[#d9b27c] pl-7 lg:col-span-4 lg:col-start-9"><p className="text-xs font-bold tracking-[.14em] text-[#9a5d2d]">{zh ? '承諾之前' : 'BEFORE COMMITMENT'}</p><p className="mt-5 leading-7 text-[#52665e]">{content.programme.fees}</p></aside></div>
    </ContentSection>
    <ContentSection tone="sand" eyebrow={zh ? '適合與邊界' : 'FIT AND BOUNDARIES'} title={zh ? '一個清楚、保密且不混淆角色的空間' : 'A clear, confidential space without confused roles'}>
      <div className="grid gap-10 lg:grid-cols-2"><div><h3 className="mb-6 text-xl font-semibold text-[#173d2f]">{zh ? '這項工作可能適合你，如果' : 'This may suit you if'}</h3><BulletList items={content.fit.suitable} /></div><div className="border-t border-[#173d2f]/15 pt-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><h3 className="mb-6 text-xl font-semibold text-[#173d2f]">{zh ? '不屬於這項服務' : 'Outside this service'}</h3><BulletList items={content.fit.notSuitable} /></div></div>
    </ContentSection>
    <PrimaryCTA title={zh ? '先說現在真正卡住的是什麼' : 'Start with what is genuinely stuck'} body={zh ? '你不需要先選擇方案，也不用把問題壓縮成一段推銷式短通話。把情境寫下來，Hao-Cheng 會先親自閱讀。' : 'You do not need to choose a package or compress the issue into a sales call. Write about the situation and Hao-Cheng will read it personally.'} label={cta} />
  </>;
}
Coaching.getLayout = (page) => { const zh = page.props.locale === 'zh-TW'; const schema = { '@context':'https://schema.org','@type':'Service','@id':`${SITE_URL}/coaching#service`,name:zh?'英國與亞洲跨境領導 Coaching':'UK-Asia cross-border leadership coaching',provider:{'@id':`${SITE_URL}/#organisation`},availableLanguage:['English','Chinese']}; return <MainLayout seo={{ title: zh ? '跨境領導與組織變革 Coaching' : 'Cross-border leadership and organisational change coaching', description: zh ? '為連結亞洲總部與英國團隊的領導者提供一對一 Coaching。' : 'One-to-one coaching for leaders connecting Asian headquarters and UK teams.', schema }}>{page}</MainLayout>; };
export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
