import Link from 'next/link';
import { useRouter } from 'next/router';
import { CONTACT_EMAIL } from '@/content/siteStrategy';

export default function ErrorPage() {
  const router = useRouter();
  const zh = router.locale === 'zh-TW';
  return (
    <main className="grid min-h-[75vh] place-items-center bg-[#f6f1e7] px-6 pt-28 text-center">
      <div>
        <p className="font-mono text-sm text-emerald-800">500</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.04em] text-slate-950">{zh ? '網站暫時無法完成這個要求' : 'The site could not complete that request'}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-650">{zh ? `請稍後再試，或寄信至 ${CONTACT_EMAIL}。` : `Please try again later or email ${CONTACT_EMAIL}.`}</p>
        <Link className="ssg-primary-button mt-8" href="/">{zh ? '回到首頁' : 'Return home'}</Link>
      </div>
    </main>
  );
}
