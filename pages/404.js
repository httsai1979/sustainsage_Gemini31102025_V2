import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSiteContent } from '@/content/siteStrategy';

export default function NotFound() {
  const router = useRouter();
  const content = getSiteContent(router.locale);
  const zh = router.locale === 'zh-TW';
  return (
    <main className="grid min-h-[75vh] place-items-center bg-[#f6f1e7] px-6 pt-28 text-center">
      <div>
        <p className="font-mono text-sm text-emerald-800">404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.04em] text-slate-950">{zh ? '找不到這個頁面' : 'This page could not be found'}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-650">{zh ? '它可能已整合到新的 Coaching 架構，或網址已變更。' : 'It may have been consolidated into the new coaching structure, or its address may have changed.'}</p>
        <Link className="ssg-primary-button mt-8" href="/">{content.nav.home}</Link>
      </div>
    </main>
  );
}
